import { Inject, Injectable, Optional } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { LsnCrossTabMessage } from './models/lsnCrossTabMessage';
import { LSN_CROSS_TAB_CONFIG, LsnCrossTabConfig } from './models/lsnCrossTabConfig';
import { LsnCookieService } from '../lsn-cookie/lsn-cookie.service';
import * as i0 from "@angular/core";
import * as i1 from "../lsn-cookie/lsn-cookie.service";
import * as i2 from "./models/lsnCrossTabConfig";
export class LsnCrossTabService {
    get crossTabCookieName() {
        return this.crossTabConfig.crossTabCookieName;
    }
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
            if (!(key === 'attrs' && (value === null))) {
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
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: LsnCrossTabService, deps: [{ token: i1.LsnCookieService }, { token: LSN_CROSS_TAB_CONFIG, optional: true }], target: i0.ɵɵFactoryTarget.Injectable }); }
    /** @nocollapse */ static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: LsnCrossTabService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: LsnCrossTabService, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNuLWNyb3NzLXRhYi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbHNuLWxpYnMvc3JjL2xpYi9zZXJ2aWNlcy9sc24tY3Jvc3MtdGFiL2xzbi1jcm9zcy10YWIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBYSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdEUsT0FBTyxFQUFDLFFBQVEsRUFBYyxPQUFPLEVBQWUsTUFBTSxNQUFNLENBQUM7QUFDakUsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDL0QsT0FBTyxFQUFDLG9CQUFvQixFQUFFLGlCQUFpQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDbkYsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sa0NBQWtDLENBQUM7Ozs7QUFLbEUsTUFBTSxPQUFPLGtCQUFrQjtJQVM3QixJQUFZLGtCQUFrQjtRQUM1QixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUM7SUFDaEQsQ0FBQztJQUVELFlBQW9CLGdCQUFrQyxFQUNBLGNBQWlDO1FBRG5FLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUEwRHREOztXQUVHO1FBQ0ssbUJBQWMsR0FBRyxDQUFDLEdBQXVCLEVBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUV4RyxpQkFBWSxHQUFHLENBQUMsT0FBMkIsRUFBVSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFFdkcseUJBQW9CLEdBQUcsQ0FBQyxHQUF1QixFQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFD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Q0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsS0FBSyxHQUFHLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDM0g7U0FDRjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7T0FFRztJQUNLLGlCQUFpQixDQUFDLFNBQWlCLEVBQUUsTUFBYztRQUN6RCxPQUFPLENBQUMsYUFBaUMsRUFBRSxFQUFFLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDO0lBQzVGLENBQUM7aUlBek1VLGtCQUFrQixrREFjRyxvQkFBb0I7cUlBZHpDLGtCQUFrQixjQUZqQixNQUFNOzsyRkFFUCxrQkFBa0I7a0JBSDlCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzswQkFlYyxRQUFROzswQkFBSSxNQUFNOzJCQUFDLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlLCBPbkRlc3Ryb3ksIE9wdGlvbmFsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7aW50ZXJ2YWwsIE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0xzbkNyb3NzVGFiTWVzc2FnZX0gZnJvbSAnLi9tb2RlbHMvbHNuQ3Jvc3NUYWJNZXNzYWdlJztcbmltcG9ydCB7TFNOX0NST1NTX1RBQl9DT05GSUcsIExzbkNyb3NzVGFiQ29uZmlnfSBmcm9tICcuL21vZGVscy9sc25Dcm9zc1RhYkNvbmZpZyc7XG5pbXBvcnQge0xzbkNvb2tpZVNlcnZpY2V9IGZyb20gJy4uL2xzbi1jb29raWUvbHNuLWNvb2tpZS5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTHNuQ3Jvc3NUYWJTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSByZWFkb25seSBtZXNzYWdlU3ViamVjdDogU3ViamVjdDxMc25Dcm9zc1RhYk1lc3NhZ2U+O1xuICByZWFkb25seSB0YWJJZDogc3RyaW5nO1xuICBwcml2YXRlIHJlYWRvbmx5IG1lc3NhZ2VzUmVhZFNldDogU2V0PHN0cmluZz47XG4gIHByaXZhdGUgcmVhZG9ubHkgdGFiT3BlblRpbWU6IG51bWJlcjtcbiAgcHJpdmF0ZSBjb29raWVSZWFkU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgY29va2llQ2xlYW5TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBjcm9zc1RhYkNvbmZpZzogTHNuQ3Jvc3NUYWJDb25maWc7XG5cbiAgcHJpdmF0ZSBnZXQgY3Jvc3NUYWJDb29raWVOYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY3Jvc3NUYWJDb25maWcuY3Jvc3NUYWJDb29raWVOYW1lO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBsc25Db29raWVTZXJ2aWNlOiBMc25Db29raWVTZXJ2aWNlLFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KExTTl9DUk9TU19UQUJfQ09ORklHKSBjcm9zc1RhYkNvbmZpZzogTHNuQ3Jvc3NUYWJDb25maWcpIHtcbiAgICB0aGlzLmNyb3NzVGFiQ29uZmlnID0gY3Jvc3NUYWJDb25maWcgfHwgbmV3IExzbkNyb3NzVGFiQ29uZmlnKCk7XG4gICAgdGhpcy5tZXNzYWdlU3ViamVjdCA9IG5ldyBTdWJqZWN0PExzbkNyb3NzVGFiTWVzc2FnZT4oKTtcbiAgICB0aGlzLnRhYklkID0gTWF0aC5yYW5kb20oKSArICcnO1xuICAgIHRoaXMubWVzc2FnZXNSZWFkU2V0ID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgdGhpcy50YWJPcGVuVGltZSA9IERhdGUubm93KCk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiBzZXRzIHVwIHN1YnNjcmlwdGlvbnMgZm9yIHJlYWRpbmcgYW5kIGNsZWFuaW5nIGNyb3NzIHRhYiBjb29raWVcbiAgICovXG4gIHJ1bigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuY29va2llUmVhZFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5jb29raWVSZWFkU3Vic2NyaXB0aW9uID0gaW50ZXJ2YWwodGhpcy5jcm9zc1RhYkNvbmZpZy5jb29raWVSZWFkRnJlcSlcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLnJlYWRNZXNzYWdlcygpKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmNvb2tpZUNsZWFuU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmNvb2tpZUNsZWFuU3Vic2NyaXB0aW9uID0gaW50ZXJ2YWwodGhpcy5jcm9zc1RhYkNvbmZpZy5jb29raWVDbGVhbkZyZXEpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbGVhbkNvb2tpZSgpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBPYnNlcnZhYmxlIGVtaXRzIG1lc3NhZ2VzIHRoYXQgd2VyZSBzZW50IGJ5IG90aGVyIHRhYnNcbiAgICovXG4gIGdldCBtZXNzYWdlcyQoKTogT2JzZXJ2YWJsZTxMc25Dcm9zc1RhYk1lc3NhZ2U+IHtcbiAgICByZXR1cm4gdGhpcy5tZXNzYWdlU3ViamVjdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYW51YWxseSBzZXQgY3Jvc3MgdGFiIGNvbmZpZywgZm9yIGV4YW1wbGUgd2hlbiBjb25maWcgbXVzdCBiZSBwcm92aWRlZCBhc3luY2hyb25vdXNseSBhbmQgbm90IHdpdGggSW5qZWN0aW9uVG9rZW5cbiAgICovXG4gIHNldENyb3NzVGFiQ29uZmlnKGNvbmZpZzogTHNuQ3Jvc3NUYWJDb25maWcpIHtcbiAgICB0aGlzLmNyb3NzVGFiQ29uZmlnID0gY29uZmlnO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbmRzIG1lc3NhZ2UgdG8gb3RoZXIgdGFicyBieSBhZGRpbmcgdGhpcyBtZXNzYWdlIHRvIGNyb3NzIHRhYiBjb29raWVcbiAgICovXG4gIHNlbmRNZXNzYWdlKGRhdGE6IChzdHJpbmcgfCBMc25Dcm9zc1RhYk1lc3NhZ2UgfCBvYmplY3QpKSB7XG4gICAgbGV0IG1lc3NhZ2U7XG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgbWVzc2FnZSA9IG5ldyBMc25Dcm9zc1RhYk1lc3NhZ2Uoe2NvZGU6IGRhdGF9KTtcbiAgICB9IGVsc2UgaWYgKGRhdGEgaW5zdGFuY2VvZiBMc25Dcm9zc1RhYk1lc3NhZ2UpIHtcbiAgICAgIG1lc3NhZ2UgPSBkYXRhO1xuICAgIH0gZWxzZSBpZiAoISFkYXRhICYmIHR5cGVvZiBkYXRhID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgICAgbWVzc2FnZSA9IG5ldyBMc25Dcm9zc1RhYk1lc3NhZ2Uoey4uLmRhdGF9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBwcmV2aW91cyBpbXBsZW1lbnRhdGlvbiwgbWVzc2FnZS5jcmVhdGVkIGlzIGFsd2F5cyBvdmVycmlkZGVuXG4gICAgbWVzc2FnZS5jcmVhdGVkID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgbWVzc2FnZS50YWJJZCA9IHRoaXMudGFiSWQ7XG4gICAgdGhpcy5tZXNzYWdlc1JlYWRTZXQuYWRkKHRoaXMuZ2V0TWVzc2FnZUlkKG1lc3NhZ2UpKTtcbiAgICB0aGlzLnVwZGF0ZUNvb2tpZSh0aGlzLm1lc3NhZ2VUb1BsYWluT2JqZWN0KG1lc3NhZ2UpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgbWVzc2FnZSB3aXRoIGdpdmVuIGlkIHdhcyBhbHJlYWR5IHJlYWRcbiAgICovXG4gIHByaXZhdGUgbWVzc2FnZVdhc1JlYWQgPSAobXNnOiBMc25Dcm9zc1RhYk1lc3NhZ2UpOiBib29sZWFuID0+IHRoaXMubWVzc2FnZXNSZWFkU2V0Lmhhcyh0aGlzLmdldE1lc3NhZ2VJZChtc2cpKTtcblxuICBwcml2YXRlIGdldE1lc3NhZ2VJZCA9IChtZXNzYWdlOiBMc25Dcm9zc1RhYk1lc3NhZ2UpOiBzdHJpbmcgPT4gbWVzc2FnZS50YWJJZCArIG1lc3NhZ2UuY3JlYXRlZCArIG1lc3NhZ2UuY29kZTtcblxuICBwcml2YXRlIG1lc3NhZ2VUb1BsYWluT2JqZWN0ID0gKG1zZzogTHNuQ3Jvc3NUYWJNZXNzYWdlKTogb2JqZWN0ID0+IE9iamVjdC5rZXlzKG1zZylcbiAgICAucmVkdWNlKChtaW5pZmllZE9iaiwga2V5KSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IG1zZ1trZXldO1xuICAgICAgaWYgKCEoa2V5ID09PSAnYXR0cnMnICYmICh2YWx1ZSA9PT0gbnVsbCkpKSB7XG4gICAgICAgIG1pbmlmaWVkT2JqW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIG1pbmlmaWVkT2JqO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG1pbmlmaWVkT2JqO1xuICAgICAgfSAvLyB0c2xpbnQ6ZGlzYWJsZVxuICAgIH0sIHt9KTsgLy8gdHNsaW50OmVuYWJsZVxuXG4gIC8qKlxuICAgKiBBcHBlbmRzIGdpdmVuIG1lc3NhZ2UgdG8gY3Jvc3MgdGFiIGNvb2tpZSB2YWx1ZVxuICAgKi9cbiAgcHJpdmF0ZSB1cGRhdGVDb29raWUobXNnOiBvYmplY3QpIHtcbiAgICBjb25zdCBjb29raWVEYXRhOiBBcnJheTxMc25Dcm9zc1RhYk1lc3NhZ2U+ID0gdGhpcy5jb29raWU7XG4gICAgY29va2llRGF0YS5wdXNoKG1zZyk7XG4gICAgdGhpcy5jb29raWUgPSBjb29raWVEYXRhO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgY29va2llKCkge1xuICAgIHJldHVybiB0aGlzLmxzbkNvb2tpZVNlcnZpY2UuZ2V0KHRoaXMuY3Jvc3NUYWJDb25maWcuY3Jvc3NUYWJDb29raWVOYW1lKSB8fCBbXTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0IGNvb2tpZShjb29raWVEYXRhOiBBcnJheTxMc25Dcm9zc1RhYk1lc3NhZ2U+KSB7XG4gICAgdGhpcy5sc25Db29raWVTZXJ2aWNlLnNldCh0aGlzLmNyb3NzVGFiQ29va2llTmFtZSwgY29va2llRGF0YSwge1xuICAgICAgZG9tYWluOiB0aGlzLmNyb3NzVGFiQ29uZmlnLnJvb3REb21haW4sXG4gICAgICBwYXRoOiAnLydcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIG1lc3NhZ2VzIGZyb20gY3Jvc3MgdGFiIGNvb2tpZSB0aGF0IGFyZSBvbGRlciB0aGFuIHN1cHBsaWVkIGNvbmZpZy5tc2dUdGwgdGltZVxuICAgKi9cbiAgcHJpdmF0ZSBjbGVhbkNvb2tpZSgpIHtcbiAgICBjb25zdCBjdXJyZW50Q29va2llID0gdGhpcy5jb29raWU7XG4gICAgaWYgKGN1cnJlbnRDb29raWUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICBjb25zdCBjbGVhbmVkQ29va2llID0gY3VycmVudENvb2tpZS5maWx0ZXIodGhpcy5jbGVhbkNvb2tpZUZpbHRlcih0aW1lc3RhbXAsIHRoaXMuY3Jvc3NUYWJDb25maWcubXNnVHRsKSk7XG4gICAgLy8gcHJldmlvdXMgaW1wbGVtZW50YXRpb24sIGNvb2tpZSBtaWdodCBoYXZlIGJlZW4gbW9kaWZpZWQgaW4gdGhlIG90aGVyIHRhYj9cbiAgICBpZiAoIXRoaXMuYXJlQ29va2llc0VxdWFsKGN1cnJlbnRDb29raWUsIHRoaXMuY29va2llKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuY29va2llID0gY2xlYW5lZENvb2tpZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBpbnZva2VkIGFmdGVyIGV2ZXJ5IGNvb2tpZSByZWFkIGludGVydmFsXG4gICAqL1xuICBwcml2YXRlIHJlYWRNZXNzYWdlcygpIHtcbiAgICBpZiAodGhpcy5jb29raWUpIHtcbiAgICAgIHRoaXMuY29va2llLmZvckVhY2goKG1zZ0RhdGE6IExzbkNyb3NzVGFiTWVzc2FnZSkgPT4ge1xuICAgICAgICBpZiAobXNnRGF0YS5jcmVhdGVkID4gdGhpcy50YWJPcGVuVGltZSkge1xuICAgICAgICAgIGNvbnN0IG1zZ0NvcHkgPSB7Li4ubXNnRGF0YX07XG4gICAgICAgICAgaWYgKCF0aGlzLm1lc3NhZ2VXYXNSZWFkKG1zZ0NvcHkpKSB7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VzUmVhZFNldC5hZGQodGhpcy5nZXRNZXNzYWdlSWQobXNnQ29weSkpO1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlU3ViamVjdC5uZXh0KG1zZ0NvcHkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0Q29va2llID0gKCkgPT4gdGhpcy5jb29raWU7XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIHN1YnNjcmlwdGlvbnMgdGhhdCB0aGlzIHNlcnZpY2UgaXMgc3Vic2NyaWJlIHRvIChpbnRlcnZhbHMgYXJlIGNsZWFyZWQpXG4gICAqL1xuICB1bnN1YnNjcmliZSgpIHtcbiAgICB0aGlzLmNvb2tpZVJlYWRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLmNvb2tpZUNsZWFuU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKipcbiAgICogU29ydHMgdHdvIGNvb2tpZSBhcnJheXMgYW5kIGNvbXBhcmVzIGVhY2ggZWxlbWVudFxuICAgKi9cbiAgcHJpdmF0ZSBhcmVDb29raWVzRXF1YWwoZmlyc3RDb29raWU6IEFycmF5PExzbkNyb3NzVGFiTWVzc2FnZT4sIHNlY29uZENvb2tpZTogQXJyYXk8THNuQ3Jvc3NUYWJNZXNzYWdlPikge1xuICAgIGlmIChmaXJzdENvb2tpZS5sZW5ndGggIT09IHNlY29uZENvb2tpZS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKGZpcnN0Q29va2llLmxlbmd0aCA9PT0gMCAmJiBzZWNvbmRDb29raWUubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZmlyc3RDb29raWUuc29ydCh0aGlzLm1lc3NhZ2VDb21wYXJlcik7XG4gICAgc2Vjb25kQ29va2llLnNvcnQodGhpcy5tZXNzYWdlQ29tcGFyZXIpO1xuICAgIGxldCBpbmRleCA9IDA7XG4gICAgbGV0IGFyZUNvb2tpZXNFcXVhbCA9IHRydWU7XG4gICAgZm9yIChjb25zdCBtZXNzYWdlIG9mIGZpcnN0Q29va2llKSB7XG4gICAgICBpZiAoTHNuQ3Jvc3NUYWJNZXNzYWdlLmNvbXBhcmUobWVzc2FnZSwgc2Vjb25kQ29va2llW2luZGV4XSkpIHtcbiAgICAgICAgYXJlQ29va2llc0VxdWFsID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICArK2luZGV4O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJlQ29va2llc0VxdWFsO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXBhcmVzIHR3byBtZXNzYWdlcyBieSBwcm9wZXJ0aWVzIGluIG9yZGVyOiAnY3JlYXRlZCcsICdjb2RlJywgJ3RhYklkJztcbiAgICovXG4gIHByaXZhdGUgbWVzc2FnZUNvbXBhcmVyKGZpcnN0Q29va2llVmFsdWU6IExzbkNyb3NzVGFiTWVzc2FnZSwgc2Vjb25kQ29va2llVmFsdWU6IExzbkNyb3NzVGFiTWVzc2FnZSkge1xuICAgIGxldCByZXN1bHQgPSBmaXJzdENvb2tpZVZhbHVlLmNyZWF0ZWQgPCBzZWNvbmRDb29raWVWYWx1ZS5jcmVhdGVkID8gLTEgOiBzZWNvbmRDb29raWVWYWx1ZS5jcmVhdGVkIDwgZmlyc3RDb29raWVWYWx1ZS5jcmVhdGVkID8gMSA6IDA7XG4gICAgaWYgKHJlc3VsdCA9PT0gMCkge1xuICAgICAgcmVzdWx0ID0gZmlyc3RDb29raWVWYWx1ZS5jb2RlIDwgc2Vjb25kQ29va2llVmFsdWUuY29kZSA/IC0xIDogc2Vjb25kQ29va2llVmFsdWUuY29kZSA8IGZpcnN0Q29va2llVmFsdWUuY29kZSA/IDEgOiAwO1xuICAgICAgaWYgKHJlc3VsdCA9PT0gMCkge1xuICAgICAgICByZXN1bHQgPSBmaXJzdENvb2tpZVZhbHVlLnRhYklkIDwgc2Vjb25kQ29va2llVmFsdWUudGFiSWQgPyAtMSA6IHNlY29uZENvb2tpZVZhbHVlLnRhYklkIDwgZmlyc3RDb29raWVWYWx1ZS50YWJJZCA/IDEgOiAwO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIGRldGVybWluZXMgd2hldGhlciBnaXZlbiBtZXNzYWdlIGlzIHRvIGJlIHJlbW92ZWQgZnJvbSB0aGUgY3Jvc3MgdGFiIGNvb2tpZVxuICAgKi9cbiAgcHJpdmF0ZSBjbGVhbkNvb2tpZUZpbHRlcih0aW1lc3RhbXA6IG51bWJlciwgbXNnVHRsOiBudW1iZXIpIHtcbiAgICByZXR1cm4gKGNvb2tpZU1lc3NhZ2U6IExzbkNyb3NzVGFiTWVzc2FnZSkgPT4gdGltZXN0YW1wIC0gY29va2llTWVzc2FnZS5jcmVhdGVkIDw9IG1zZ1R0bDtcbiAgfVxuXG59XG4iXX0=