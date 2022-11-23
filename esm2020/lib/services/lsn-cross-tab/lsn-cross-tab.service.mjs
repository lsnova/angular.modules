import { Inject, Injectable, Optional } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { LsnCrossTabMessage } from './models/lsnCrossTabMessage';
import { LSN_CROSS_TAB_CONFIG, LsnCrossTabConfig } from './models/lsnCrossTabConfig';
import { LsnCookieService } from '../lsn-cookie/lsn-cookie.service';
import * as i0 from "@angular/core";
import * as i1 from "../lsn-cookie/lsn-cookie.service";
import * as i2 from "./models/lsnCrossTabConfig";
export class LsnCrossTabService {
    constructor(lsnCookieService, crossTabConfig) {
        this.lsnCookieService = lsnCookieService;
        /**
         * Checks if message with given id was already read
         */
        this.messageWasRead = (msg) => this.messagesReadSet.has(this.getMessageId(msg));
        this.getMessageId = (message) => message.tabId + message.created + message.code;
        this.messageToPlainObject = (msg) => Object.keys(msg)
            .reduce((minifiedObj, key) => {
            const value = msg[key];
            if (!(key === 'attrs' && (value === null || value === {}))) {
                minifiedObj[key] = value;
                return minifiedObj;
            }
            else {
                return minifiedObj;
            } // tslint:disable
        }, {}); // tslint:enable
        this.getCookie = () => this.cookie;
        this.crossTabConfig = crossTabConfig || new LsnCrossTabConfig();
        this.messageSubject = new Subject();
        this.tabId = Math.random() + '';
        this.messagesReadSet = new Set();
        this.tabOpenTime = Date.now();
    }
    get crossTabCookieName() {
        return this.crossTabConfig.crossTabCookieName;
    }
    /**
     * This function sets up subscriptions for reading and cleaning cross tab cookie
     */
    run() {
        if (!this.cookieReadSubscription) {
            this.cookieReadSubscription = interval(this.crossTabConfig.cookieReadFreq)
                .subscribe(() => this.readMessages());
        }
        if (!this.cookieCleanSubscription) {
            this.cookieCleanSubscription = interval(this.crossTabConfig.cookieCleanFreq)
                .subscribe(() => this.cleanCookie());
        }
    }
    /**
     * This Observable emits messages that were sent by other tabs
     */
    get messages$() {
        return this.messageSubject;
    }
    /**
     * Manually set cross tab config, for example when config must be provided asynchronously and not with InjectionToken
     */
    setCrossTabConfig(config) {
        this.crossTabConfig = config;
    }
    /**
     * Sends message to other tabs by adding this message to cross tab cookie
     */
    sendMessage(data) {
        let message;
        if (typeof data === 'string') {
            message = new LsnCrossTabMessage({ code: data });
        }
        else if (data instanceof LsnCrossTabMessage) {
            message = data;
        }
        else if (!!data && typeof data === 'object' && !Array.isArray(data)) {
            message = new LsnCrossTabMessage({ ...data });
        }
        else {
            return;
        }
        // previous implementation, message.created is always overridden
        message.created = new Date().getTime();
        message.tabId = this.tabId;
        this.messagesReadSet.add(this.getMessageId(message));
        this.updateCookie(this.messageToPlainObject(message));
    }
    /**
     * Appends given message to cross tab cookie value
     */
    updateCookie(msg) {
        const cookieData = this.cookie;
        cookieData.push(msg);
        this.cookie = cookieData;
    }
    get cookie() {
        return this.lsnCookieService.get(this.crossTabConfig.crossTabCookieName) || [];
    }
    set cookie(cookieData) {
        this.lsnCookieService.set(this.crossTabCookieName, cookieData, {
            domain: this.crossTabConfig.rootDomain,
            path: '/'
        });
    }
    /**
     * Removes messages from cross tab cookie that are older than supplied config.msgTtl time
     */
    cleanCookie() {
        const currentCookie = this.cookie;
        if (currentCookie === null) {
            return;
        }
        const timestamp = new Date().getTime();
        const cleanedCookie = currentCookie.filter(this.cleanCookieFilter(timestamp, this.crossTabConfig.msgTtl));
        // previous implementation, cookie might have been modified in the other tab?
        if (!this.areCookiesEqual(currentCookie, this.cookie)) {
            return;
        }
        this.cookie = cleanedCookie;
    }
    /**
     * Callback invoked after every cookie read interval
     */
    readMessages() {
        if (this.cookie) {
            this.cookie.forEach((msgData) => {
                if (msgData.created > this.tabOpenTime) {
                    const msgCopy = { ...msgData };
                    if (!this.messageWasRead(msgCopy)) {
                        this.messagesReadSet.add(this.getMessageId(msgCopy));
                        this.messageSubject.next(msgCopy);
                    }
                }
            });
        }
    }
    /**
     * Removes all subscriptions that this service is subscribe to (intervals are cleared)
     */
    unsubscribe() {
        this.cookieReadSubscription.unsubscribe();
        this.cookieCleanSubscription.unsubscribe();
    }
    ngOnDestroy() {
        this.unsubscribe();
    }
    /**
     * Sorts two cookie arrays and compares each element
     */
    areCookiesEqual(firstCookie, secondCookie) {
        if (firstCookie.length !== secondCookie.length) {
            return false;
        }
        else if (firstCookie.length === 0 && secondCookie.length === 0) {
            return true;
        }
        firstCookie.sort(this.messageComparer);
        secondCookie.sort(this.messageComparer);
        let index = 0;
        let areCookiesEqual = true;
        for (const message of firstCookie) {
            if (LsnCrossTabMessage.compare(message, secondCookie[index])) {
                areCookiesEqual = false;
            }
            else {
                ++index;
            }
        }
        return areCookiesEqual;
    }
    /**
     * Compares two messages by properties in order: 'created', 'code', 'tabId';
     */
    messageComparer(firstCookieValue, secondCookieValue) {
        let result = firstCookieValue.created < secondCookieValue.created ? -1 : secondCookieValue.created < firstCookieValue.created ? 1 : 0;
        if (result === 0) {
            result = firstCookieValue.code < secondCookieValue.code ? -1 : secondCookieValue.code < firstCookieValue.code ? 1 : 0;
            if (result === 0) {
                result = firstCookieValue.tabId < secondCookieValue.tabId ? -1 : secondCookieValue.tabId < firstCookieValue.tabId ? 1 : 0;
            }
        }
        return result;
    }
    /**
     * Function determines whether given message is to be removed from the cross tab cookie
     */
    cleanCookieFilter(timestamp, msgTtl) {
        return (cookieMessage) => timestamp - cookieMessage.created <= msgTtl;
    }
}
/** @nocollapse */ LsnCrossTabService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: LsnCrossTabService, deps: [{ token: i1.LsnCookieService }, { token: LSN_CROSS_TAB_CONFIG, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ LsnCrossTabService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: LsnCrossTabService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: LsnCrossTabService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.LsnCookieService }, { type: i2.LsnCrossTabConfig, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [LSN_CROSS_TAB_CONFIG]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNuLWNyb3NzLXRhYi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbHNuLWxpYnMvc3JjL2xpYi9zZXJ2aWNlcy9sc24tY3Jvc3MtdGFiL2xzbi1jcm9zcy10YWIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBYSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdEUsT0FBTyxFQUFDLFFBQVEsRUFBYyxPQUFPLEVBQWUsTUFBTSxNQUFNLENBQUM7QUFDakUsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDL0QsT0FBTyxFQUFDLG9CQUFvQixFQUFFLGlCQUFpQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDbkYsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sa0NBQWtDLENBQUM7Ozs7QUFLbEUsTUFBTSxPQUFPLGtCQUFrQjtJQWE3QixZQUFvQixnQkFBa0MsRUFDQSxjQUFpQztRQURuRSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBMER0RDs7V0FFRztRQUNLLG1CQUFjLEdBQUcsQ0FBQyxHQUF1QixFQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFeEcsaUJBQVksR0FBRyxDQUFDLE9BQTJCLEVBQVUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBRXZHLHlCQUFvQixHQUFHLENBQUMsR0FBdUIsRUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7YUFDakYsTUFBTSxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQzNCLE1BQU0sS0FB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Q0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMzSDtTQUNGO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVEOztPQUVHO0lBQ0ssaUJBQWlCLENBQUMsU0FBaUIsRUFBRSxNQUFjO1FBQ3pELE9BQU8sQ0FBQyxhQUFpQyxFQUFFLEVBQUUsQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDLE9BQU8sSUFBSSxNQUFNLENBQUM7SUFDNUYsQ0FBQzs7bUlBek1VLGtCQUFrQixrREFjRyxvQkFBb0I7dUlBZHpDLGtCQUFrQixjQUZqQixNQUFNOzRGQUVQLGtCQUFrQjtrQkFIOUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OzBCQWVjLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIE9uRGVzdHJveSwgT3B0aW9uYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtpbnRlcnZhbCwgT2JzZXJ2YWJsZSwgU3ViamVjdCwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7THNuQ3Jvc3NUYWJNZXNzYWdlfSBmcm9tICcuL21vZGVscy9sc25Dcm9zc1RhYk1lc3NhZ2UnO1xuaW1wb3J0IHtMU05fQ1JPU1NfVEFCX0NPTkZJRywgTHNuQ3Jvc3NUYWJDb25maWd9IGZyb20gJy4vbW9kZWxzL2xzbkNyb3NzVGFiQ29uZmlnJztcbmltcG9ydCB7THNuQ29va2llU2VydmljZX0gZnJvbSAnLi4vbHNuLWNvb2tpZS9sc24tY29va2llLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBMc25Dcm9zc1RhYlNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHJlYWRvbmx5IG1lc3NhZ2VTdWJqZWN0OiBTdWJqZWN0PExzbkNyb3NzVGFiTWVzc2FnZT47XG4gIHJlYWRvbmx5IHRhYklkOiBzdHJpbmc7XG4gIHByaXZhdGUgcmVhZG9ubHkgbWVzc2FnZXNSZWFkU2V0OiBTZXQ8c3RyaW5nPjtcbiAgcHJpdmF0ZSByZWFkb25seSB0YWJPcGVuVGltZTogbnVtYmVyO1xuICBwcml2YXRlIGNvb2tpZVJlYWRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBjb29raWVDbGVhblN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIGNyb3NzVGFiQ29uZmlnOiBMc25Dcm9zc1RhYkNvbmZpZztcblxuICBwcml2YXRlIGdldCBjcm9zc1RhYkNvb2tpZU5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jcm9zc1RhYkNvbmZpZy5jcm9zc1RhYkNvb2tpZU5hbWU7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxzbkNvb2tpZVNlcnZpY2U6IExzbkNvb2tpZVNlcnZpY2UsXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTFNOX0NST1NTX1RBQl9DT05GSUcpIGNyb3NzVGFiQ29uZmlnOiBMc25Dcm9zc1RhYkNvbmZpZykge1xuICAgIHRoaXMuY3Jvc3NUYWJDb25maWcgPSBjcm9zc1RhYkNvbmZpZyB8fCBuZXcgTHNuQ3Jvc3NUYWJDb25maWcoKTtcbiAgICB0aGlzLm1lc3NhZ2VTdWJqZWN0ID0gbmV3IFN1YmplY3Q8THNuQ3Jvc3NUYWJNZXNzYWdlPigpO1xuICAgIHRoaXMudGFiSWQgPSBNYXRoLnJhbmRvbSgpICsgJyc7XG4gICAgdGhpcy5tZXNzYWdlc1JlYWRTZXQgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgICB0aGlzLnRhYk9wZW5UaW1lID0gRGF0ZS5ub3coKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGZ1bmN0aW9uIHNldHMgdXAgc3Vic2NyaXB0aW9ucyBmb3IgcmVhZGluZyBhbmQgY2xlYW5pbmcgY3Jvc3MgdGFiIGNvb2tpZVxuICAgKi9cbiAgcnVuKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5jb29raWVSZWFkU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmNvb2tpZVJlYWRTdWJzY3JpcHRpb24gPSBpbnRlcnZhbCh0aGlzLmNyb3NzVGFiQ29uZmlnLmNvb2tpZVJlYWRGcmVxKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMucmVhZE1lc3NhZ2VzKCkpO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuY29va2llQ2xlYW5TdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuY29va2llQ2xlYW5TdWJzY3JpcHRpb24gPSBpbnRlcnZhbCh0aGlzLmNyb3NzVGFiQ29uZmlnLmNvb2tpZUNsZWFuRnJlcSlcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNsZWFuQ29va2llKCkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIE9ic2VydmFibGUgZW1pdHMgbWVzc2FnZXMgdGhhdCB3ZXJlIHNlbnQgYnkgb3RoZXIgdGFic1xuICAgKi9cbiAgZ2V0IG1lc3NhZ2VzJCgpOiBPYnNlcnZhYmxlPExzbkNyb3NzVGFiTWVzc2FnZT4ge1xuICAgIHJldHVybiB0aGlzLm1lc3NhZ2VTdWJqZWN0O1xuICB9XG5cbiAgLyoqXG4gICAqIE1hbnVhbGx5IHNldCBjcm9zcyB0YWIgY29uZmlnLCBmb3IgZXhhbXBsZSB3aGVuIGNvbmZpZyBtdXN0IGJlIHByb3ZpZGVkIGFzeW5jaHJvbm91c2x5IGFuZCBub3Qgd2l0aCBJbmplY3Rpb25Ub2tlblxuICAgKi9cbiAgc2V0Q3Jvc3NUYWJDb25maWcoY29uZmlnOiBMc25Dcm9zc1RhYkNvbmZpZykge1xuICAgIHRoaXMuY3Jvc3NUYWJDb25maWcgPSBjb25maWc7XG4gIH1cblxuICAvKipcbiAgICogU2VuZHMgbWVzc2FnZSB0byBvdGhlciB0YWJzIGJ5IGFkZGluZyB0aGlzIG1lc3NhZ2UgdG8gY3Jvc3MgdGFiIGNvb2tpZVxuICAgKi9cbiAgc2VuZE1lc3NhZ2UoZGF0YTogKHN0cmluZyB8IExzbkNyb3NzVGFiTWVzc2FnZSB8IG9iamVjdCkpIHtcbiAgICBsZXQgbWVzc2FnZTtcbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICBtZXNzYWdlID0gbmV3IExzbkNyb3NzVGFiTWVzc2FnZSh7Y29kZTogZGF0YX0pO1xuICAgIH0gZWxzZSBpZiAoZGF0YSBpbnN0YW5jZW9mIExzbkNyb3NzVGFiTWVzc2FnZSkge1xuICAgICAgbWVzc2FnZSA9IGRhdGE7XG4gICAgfSBlbHNlIGlmICghIWRhdGEgJiYgdHlwZW9mIGRhdGEgPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICBtZXNzYWdlID0gbmV3IExzbkNyb3NzVGFiTWVzc2FnZSh7Li4uZGF0YX0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIHByZXZpb3VzIGltcGxlbWVudGF0aW9uLCBtZXNzYWdlLmNyZWF0ZWQgaXMgYWx3YXlzIG92ZXJyaWRkZW5cbiAgICBtZXNzYWdlLmNyZWF0ZWQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICBtZXNzYWdlLnRhYklkID0gdGhpcy50YWJJZDtcbiAgICB0aGlzLm1lc3NhZ2VzUmVhZFNldC5hZGQodGhpcy5nZXRNZXNzYWdlSWQobWVzc2FnZSkpO1xuICAgIHRoaXMudXBkYXRlQ29va2llKHRoaXMubWVzc2FnZVRvUGxhaW5PYmplY3QobWVzc2FnZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBtZXNzYWdlIHdpdGggZ2l2ZW4gaWQgd2FzIGFscmVhZHkgcmVhZFxuICAgKi9cbiAgcHJpdmF0ZSBtZXNzYWdlV2FzUmVhZCA9IChtc2c6IExzbkNyb3NzVGFiTWVzc2FnZSk6IGJvb2xlYW4gPT4gdGhpcy5tZXNzYWdlc1JlYWRTZXQuaGFzKHRoaXMuZ2V0TWVzc2FnZUlkKG1zZykpO1xuXG4gIHByaXZhdGUgZ2V0TWVzc2FnZUlkID0gKG1lc3NhZ2U6IExzbkNyb3NzVGFiTWVzc2FnZSk6IHN0cmluZyA9PiBtZXNzYWdlLnRhYklkICsgbWVzc2FnZS5jcmVhdGVkICsgbWVzc2FnZS5jb2RlO1xuXG4gIHByaXZhdGUgbWVzc2FnZVRvUGxhaW5PYmplY3QgPSAobXNnOiBMc25Dcm9zc1RhYk1lc3NhZ2UpOiBvYmplY3QgPT4gT2JqZWN0LmtleXMobXNnKVxuICAgIC5yZWR1Y2UoKG1pbmlmaWVkT2JqLCBrZXkpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gbXNnW2tleV07XG4gICAgICBpZiAoIShrZXkgPT09ICdhdHRycycgJiYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB7fSkpKSB7XG4gICAgICAgIG1pbmlmaWVkT2JqW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIG1pbmlmaWVkT2JqO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG1pbmlmaWVkT2JqO1xuICAgICAgfSAvLyB0c2xpbnQ6ZGlzYWJsZVxuICAgIH0sIHt9KTsgLy8gdHNsaW50OmVuYWJsZVxuXG4gIC8qKlxuICAgKiBBcHBlbmRzIGdpdmVuIG1lc3NhZ2UgdG8gY3Jvc3MgdGFiIGNvb2tpZSB2YWx1ZVxuICAgKi9cbiAgcHJpdmF0ZSB1cGRhdGVDb29raWUobXNnOiBvYmplY3QpIHtcbiAgICBjb25zdCBjb29raWVEYXRhOiBBcnJheTxMc25Dcm9zc1RhYk1lc3NhZ2U+ID0gdGhpcy5jb29raWU7XG4gICAgY29va2llRGF0YS5wdXNoKG1zZyk7XG4gICAgdGhpcy5jb29raWUgPSBjb29raWVEYXRhO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgY29va2llKCkge1xuICAgIHJldHVybiB0aGlzLmxzbkNvb2tpZVNlcnZpY2UuZ2V0KHRoaXMuY3Jvc3NUYWJDb25maWcuY3Jvc3NUYWJDb29raWVOYW1lKSB8fCBbXTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0IGNvb2tpZShjb29raWVEYXRhOiBBcnJheTxMc25Dcm9zc1RhYk1lc3NhZ2U+KSB7XG4gICAgdGhpcy5sc25Db29raWVTZXJ2aWNlLnNldCh0aGlzLmNyb3NzVGFiQ29va2llTmFtZSwgY29va2llRGF0YSwge1xuICAgICAgZG9tYWluOiB0aGlzLmNyb3NzVGFiQ29uZmlnLnJvb3REb21haW4sXG4gICAgICBwYXRoOiAnLydcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIG1lc3NhZ2VzIGZyb20gY3Jvc3MgdGFiIGNvb2tpZSB0aGF0IGFyZSBvbGRlciB0aGFuIHN1cHBsaWVkIGNvbmZpZy5tc2dUdGwgdGltZVxuICAgKi9cbiAgcHJpdmF0ZSBjbGVhbkNvb2tpZSgpIHtcbiAgICBjb25zdCBjdXJyZW50Q29va2llID0gdGhpcy5jb29raWU7XG4gICAgaWYgKGN1cnJlbnRDb29raWUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICBjb25zdCBjbGVhbmVkQ29va2llID0gY3VycmVudENvb2tpZS5maWx0ZXIodGhpcy5jbGVhbkNvb2tpZUZpbHRlcih0aW1lc3RhbXAsIHRoaXMuY3Jvc3NUYWJDb25maWcubXNnVHRsKSk7XG4gICAgLy8gcHJldmlvdXMgaW1wbGVtZW50YXRpb24sIGNvb2tpZSBtaWdodCBoYXZlIGJlZW4gbW9kaWZpZWQgaW4gdGhlIG90aGVyIHRhYj9cbiAgICBpZiAoIXRoaXMuYXJlQ29va2llc0VxdWFsKGN1cnJlbnRDb29raWUsIHRoaXMuY29va2llKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuY29va2llID0gY2xlYW5lZENvb2tpZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBpbnZva2VkIGFmdGVyIGV2ZXJ5IGNvb2tpZSByZWFkIGludGVydmFsXG4gICAqL1xuICBwcml2YXRlIHJlYWRNZXNzYWdlcygpIHtcbiAgICBpZiAodGhpcy5jb29raWUpIHtcbiAgICAgIHRoaXMuY29va2llLmZvckVhY2goKG1zZ0RhdGE6IExzbkNyb3NzVGFiTWVzc2FnZSkgPT4ge1xuICAgICAgICBpZiAobXNnRGF0YS5jcmVhdGVkID4gdGhpcy50YWJPcGVuVGltZSkge1xuICAgICAgICAgIGNvbnN0IG1zZ0NvcHkgPSB7Li4ubXNnRGF0YX07XG4gICAgICAgICAgaWYgKCF0aGlzLm1lc3NhZ2VXYXNSZWFkKG1zZ0NvcHkpKSB7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VzUmVhZFNldC5hZGQodGhpcy5nZXRNZXNzYWdlSWQobXNnQ29weSkpO1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlU3ViamVjdC5uZXh0KG1zZ0NvcHkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0Q29va2llID0gKCkgPT4gdGhpcy5jb29raWU7XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIHN1YnNjcmlwdGlvbnMgdGhhdCB0aGlzIHNlcnZpY2UgaXMgc3Vic2NyaWJlIHRvIChpbnRlcnZhbHMgYXJlIGNsZWFyZWQpXG4gICAqL1xuICB1bnN1YnNjcmliZSgpIHtcbiAgICB0aGlzLmNvb2tpZVJlYWRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLmNvb2tpZUNsZWFuU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKipcbiAgICogU29ydHMgdHdvIGNvb2tpZSBhcnJheXMgYW5kIGNvbXBhcmVzIGVhY2ggZWxlbWVudFxuICAgKi9cbiAgcHJpdmF0ZSBhcmVDb29raWVzRXF1YWwoZmlyc3RDb29raWU6IEFycmF5PExzbkNyb3NzVGFiTWVzc2FnZT4sIHNlY29uZENvb2tpZTogQXJyYXk8THNuQ3Jvc3NUYWJNZXNzYWdlPikge1xuICAgIGlmIChmaXJzdENvb2tpZS5sZW5ndGggIT09IHNlY29uZENvb2tpZS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKGZpcnN0Q29va2llLmxlbmd0aCA9PT0gMCAmJiBzZWNvbmRDb29raWUubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZmlyc3RDb29raWUuc29ydCh0aGlzLm1lc3NhZ2VDb21wYXJlcik7XG4gICAgc2Vjb25kQ29va2llLnNvcnQodGhpcy5tZXNzYWdlQ29tcGFyZXIpO1xuICAgIGxldCBpbmRleCA9IDA7XG4gICAgbGV0IGFyZUNvb2tpZXNFcXVhbCA9IHRydWU7XG4gICAgZm9yIChjb25zdCBtZXNzYWdlIG9mIGZpcnN0Q29va2llKSB7XG4gICAgICBpZiAoTHNuQ3Jvc3NUYWJNZXNzYWdlLmNvbXBhcmUobWVzc2FnZSwgc2Vjb25kQ29va2llW2luZGV4XSkpIHtcbiAgICAgICAgYXJlQ29va2llc0VxdWFsID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICArK2luZGV4O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJlQ29va2llc0VxdWFsO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXBhcmVzIHR3byBtZXNzYWdlcyBieSBwcm9wZXJ0aWVzIGluIG9yZGVyOiAnY3JlYXRlZCcsICdjb2RlJywgJ3RhYklkJztcbiAgICovXG4gIHByaXZhdGUgbWVzc2FnZUNvbXBhcmVyKGZpcnN0Q29va2llVmFsdWU6IExzbkNyb3NzVGFiTWVzc2FnZSwgc2Vjb25kQ29va2llVmFsdWU6IExzbkNyb3NzVGFiTWVzc2FnZSkge1xuICAgIGxldCByZXN1bHQgPSBmaXJzdENvb2tpZVZhbHVlLmNyZWF0ZWQgPCBzZWNvbmRDb29raWVWYWx1ZS5jcmVhdGVkID8gLTEgOiBzZWNvbmRDb29raWVWYWx1ZS5jcmVhdGVkIDwgZmlyc3RDb29raWVWYWx1ZS5jcmVhdGVkID8gMSA6IDA7XG4gICAgaWYgKHJlc3VsdCA9PT0gMCkge1xuICAgICAgcmVzdWx0ID0gZmlyc3RDb29raWVWYWx1ZS5jb2RlIDwgc2Vjb25kQ29va2llVmFsdWUuY29kZSA/IC0xIDogc2Vjb25kQ29va2llVmFsdWUuY29kZSA8IGZpcnN0Q29va2llVmFsdWUuY29kZSA/IDEgOiAwO1xuICAgICAgaWYgKHJlc3VsdCA9PT0gMCkge1xuICAgICAgICByZXN1bHQgPSBmaXJzdENvb2tpZVZhbHVlLnRhYklkIDwgc2Vjb25kQ29va2llVmFsdWUudGFiSWQgPyAtMSA6IHNlY29uZENvb2tpZVZhbHVlLnRhYklkIDwgZmlyc3RDb29raWVWYWx1ZS50YWJJZCA/IDEgOiAwO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIGRldGVybWluZXMgd2hldGhlciBnaXZlbiBtZXNzYWdlIGlzIHRvIGJlIHJlbW92ZWQgZnJvbSB0aGUgY3Jvc3MgdGFiIGNvb2tpZVxuICAgKi9cbiAgcHJpdmF0ZSBjbGVhbkNvb2tpZUZpbHRlcih0aW1lc3RhbXA6IG51bWJlciwgbXNnVHRsOiBudW1iZXIpIHtcbiAgICByZXR1cm4gKGNvb2tpZU1lc3NhZ2U6IExzbkNyb3NzVGFiTWVzc2FnZSkgPT4gdGltZXN0YW1wIC0gY29va2llTWVzc2FnZS5jcmVhdGVkIDw9IG1zZ1R0bDtcbiAgfVxuXG59XG4iXX0=