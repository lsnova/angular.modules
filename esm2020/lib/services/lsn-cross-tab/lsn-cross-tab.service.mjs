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
/** @nocollapse */ LsnCrossTabService.ɵfac = function LsnCrossTabService_Factory(t) { return new (t || LsnCrossTabService)(i0.ɵɵinject(i1.LsnCookieService), i0.ɵɵinject(LSN_CROSS_TAB_CONFIG, 8)); };
/** @nocollapse */ LsnCrossTabService.ɵprov = /** @pureOrBreakMyCode */ i0.ɵɵdefineInjectable({ token: LsnCrossTabService, factory: LsnCrossTabService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LsnCrossTabService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.LsnCookieService }, { type: i2.LsnCrossTabConfig, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [LSN_CROSS_TAB_CONFIG]
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNuLWNyb3NzLXRhYi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbHNuLWxpYnMvc3JjL2xpYi9zZXJ2aWNlcy9sc24tY3Jvc3MtdGFiL2xzbi1jcm9zcy10YWIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBYSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdEUsT0FBTyxFQUFDLFFBQVEsRUFBYyxPQUFPLEVBQWUsTUFBTSxNQUFNLENBQUM7QUFDakUsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDL0QsT0FBTyxFQUFDLG9CQUFvQixFQUFFLGlCQUFpQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDbkYsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sa0NBQWtDLENBQUM7Ozs7QUFLbEUsTUFBTSxPQUFPLGtCQUFrQjtJQWE3QixZQUFvQixnQkFBa0MsRUFDQSxjQUFpQztRQURuRSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBMER0RDs7V0FFRztRQUNLLG1CQUFjLEdBQUcsQ0FBQyxHQUF1QixFQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFeEcsaUJBQVksR0FBRyxDQUFDLE9BQTJCLEVBQVUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBRXZHLHlCQUFvQixHQUFHLENBQUMsR0FBdUIsRUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7YUFDakYsTUFBTSxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQzNCLE1BQU0sS0FB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Q0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMzSDtTQUNGO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVEOztPQUVHO0lBQ0ssaUJBQWlCLENBQUMsU0FBaUIsRUFBRSxNQUFjO1FBQ3pELE9BQU8sQ0FBQyxhQUFpQyxFQUFFLEVBQUUsQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDLE9BQU8sSUFBSSxNQUFNLENBQUM7SUFDNUYsQ0FBQzs7dUdBek1VLGtCQUFrQixnREFjRyxvQkFBb0I7dUdBZHpDLGtCQUFrQixXQUFsQixrQkFBa0IsbUJBRmpCLE1BQU07dUZBRVAsa0JBQWtCO2NBSDlCLFVBQVU7ZUFBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7c0JBZWMsUUFBUTs7c0JBQUksTUFBTTt1QkFBQyxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgT25EZXN0cm95LCBPcHRpb25hbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2ludGVydmFsLCBPYnNlcnZhYmxlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtMc25Dcm9zc1RhYk1lc3NhZ2V9IGZyb20gJy4vbW9kZWxzL2xzbkNyb3NzVGFiTWVzc2FnZSc7XG5pbXBvcnQge0xTTl9DUk9TU19UQUJfQ09ORklHLCBMc25Dcm9zc1RhYkNvbmZpZ30gZnJvbSAnLi9tb2RlbHMvbHNuQ3Jvc3NUYWJDb25maWcnO1xuaW1wb3J0IHtMc25Db29raWVTZXJ2aWNlfSBmcm9tICcuLi9sc24tY29va2llL2xzbi1jb29raWUuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIExzbkNyb3NzVGFiU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgbWVzc2FnZVN1YmplY3Q6IFN1YmplY3Q8THNuQ3Jvc3NUYWJNZXNzYWdlPjtcbiAgcmVhZG9ubHkgdGFiSWQ6IHN0cmluZztcbiAgcHJpdmF0ZSByZWFkb25seSBtZXNzYWdlc1JlYWRTZXQ6IFNldDxzdHJpbmc+O1xuICBwcml2YXRlIHJlYWRvbmx5IHRhYk9wZW5UaW1lOiBudW1iZXI7XG4gIHByaXZhdGUgY29va2llUmVhZFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIGNvb2tpZUNsZWFuU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgY3Jvc3NUYWJDb25maWc6IExzbkNyb3NzVGFiQ29uZmlnO1xuXG4gIHByaXZhdGUgZ2V0IGNyb3NzVGFiQ29va2llTmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNyb3NzVGFiQ29uZmlnLmNyb3NzVGFiQ29va2llTmFtZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbHNuQ29va2llU2VydmljZTogTHNuQ29va2llU2VydmljZSxcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChMU05fQ1JPU1NfVEFCX0NPTkZJRykgY3Jvc3NUYWJDb25maWc6IExzbkNyb3NzVGFiQ29uZmlnKSB7XG4gICAgdGhpcy5jcm9zc1RhYkNvbmZpZyA9IGNyb3NzVGFiQ29uZmlnIHx8IG5ldyBMc25Dcm9zc1RhYkNvbmZpZygpO1xuICAgIHRoaXMubWVzc2FnZVN1YmplY3QgPSBuZXcgU3ViamVjdDxMc25Dcm9zc1RhYk1lc3NhZ2U+KCk7XG4gICAgdGhpcy50YWJJZCA9IE1hdGgucmFuZG9tKCkgKyAnJztcbiAgICB0aGlzLm1lc3NhZ2VzUmVhZFNldCA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgIHRoaXMudGFiT3BlblRpbWUgPSBEYXRlLm5vdygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgZnVuY3Rpb24gc2V0cyB1cCBzdWJzY3JpcHRpb25zIGZvciByZWFkaW5nIGFuZCBjbGVhbmluZyBjcm9zcyB0YWIgY29va2llXG4gICAqL1xuICBydW4oKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmNvb2tpZVJlYWRTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuY29va2llUmVhZFN1YnNjcmlwdGlvbiA9IGludGVydmFsKHRoaXMuY3Jvc3NUYWJDb25maWcuY29va2llUmVhZEZyZXEpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5yZWFkTWVzc2FnZXMoKSk7XG4gICAgfVxuICAgIGlmICghdGhpcy5jb29raWVDbGVhblN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5jb29raWVDbGVhblN1YnNjcmlwdGlvbiA9IGludGVydmFsKHRoaXMuY3Jvc3NUYWJDb25maWcuY29va2llQ2xlYW5GcmVxKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xlYW5Db29raWUoKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgT2JzZXJ2YWJsZSBlbWl0cyBtZXNzYWdlcyB0aGF0IHdlcmUgc2VudCBieSBvdGhlciB0YWJzXG4gICAqL1xuICBnZXQgbWVzc2FnZXMkKCk6IE9ic2VydmFibGU8THNuQ3Jvc3NUYWJNZXNzYWdlPiB7XG4gICAgcmV0dXJuIHRoaXMubWVzc2FnZVN1YmplY3Q7XG4gIH1cblxuICAvKipcbiAgICogTWFudWFsbHkgc2V0IGNyb3NzIHRhYiBjb25maWcsIGZvciBleGFtcGxlIHdoZW4gY29uZmlnIG11c3QgYmUgcHJvdmlkZWQgYXN5bmNocm9ub3VzbHkgYW5kIG5vdCB3aXRoIEluamVjdGlvblRva2VuXG4gICAqL1xuICBzZXRDcm9zc1RhYkNvbmZpZyhjb25maWc6IExzbkNyb3NzVGFiQ29uZmlnKSB7XG4gICAgdGhpcy5jcm9zc1RhYkNvbmZpZyA9IGNvbmZpZztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kcyBtZXNzYWdlIHRvIG90aGVyIHRhYnMgYnkgYWRkaW5nIHRoaXMgbWVzc2FnZSB0byBjcm9zcyB0YWIgY29va2llXG4gICAqL1xuICBzZW5kTWVzc2FnZShkYXRhOiAoc3RyaW5nIHwgTHNuQ3Jvc3NUYWJNZXNzYWdlIHwgb2JqZWN0KSkge1xuICAgIGxldCBtZXNzYWdlO1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIG1lc3NhZ2UgPSBuZXcgTHNuQ3Jvc3NUYWJNZXNzYWdlKHtjb2RlOiBkYXRhfSk7XG4gICAgfSBlbHNlIGlmIChkYXRhIGluc3RhbmNlb2YgTHNuQ3Jvc3NUYWJNZXNzYWdlKSB7XG4gICAgICBtZXNzYWdlID0gZGF0YTtcbiAgICB9IGVsc2UgaWYgKCEhZGF0YSAmJiB0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgIG1lc3NhZ2UgPSBuZXcgTHNuQ3Jvc3NUYWJNZXNzYWdlKHsuLi5kYXRhfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gcHJldmlvdXMgaW1wbGVtZW50YXRpb24sIG1lc3NhZ2UuY3JlYXRlZCBpcyBhbHdheXMgb3ZlcnJpZGRlblxuICAgIG1lc3NhZ2UuY3JlYXRlZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIG1lc3NhZ2UudGFiSWQgPSB0aGlzLnRhYklkO1xuICAgIHRoaXMubWVzc2FnZXNSZWFkU2V0LmFkZCh0aGlzLmdldE1lc3NhZ2VJZChtZXNzYWdlKSk7XG4gICAgdGhpcy51cGRhdGVDb29raWUodGhpcy5tZXNzYWdlVG9QbGFpbk9iamVjdChtZXNzYWdlKSk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIG1lc3NhZ2Ugd2l0aCBnaXZlbiBpZCB3YXMgYWxyZWFkeSByZWFkXG4gICAqL1xuICBwcml2YXRlIG1lc3NhZ2VXYXNSZWFkID0gKG1zZzogTHNuQ3Jvc3NUYWJNZXNzYWdlKTogYm9vbGVhbiA9PiB0aGlzLm1lc3NhZ2VzUmVhZFNldC5oYXModGhpcy5nZXRNZXNzYWdlSWQobXNnKSk7XG5cbiAgcHJpdmF0ZSBnZXRNZXNzYWdlSWQgPSAobWVzc2FnZTogTHNuQ3Jvc3NUYWJNZXNzYWdlKTogc3RyaW5nID0+IG1lc3NhZ2UudGFiSWQgKyBtZXNzYWdlLmNyZWF0ZWQgKyBtZXNzYWdlLmNvZGU7XG5cbiAgcHJpdmF0ZSBtZXNzYWdlVG9QbGFpbk9iamVjdCA9IChtc2c6IExzbkNyb3NzVGFiTWVzc2FnZSk6IG9iamVjdCA9PiBPYmplY3Qua2V5cyhtc2cpXG4gICAgLnJlZHVjZSgobWluaWZpZWRPYmosIGtleSkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSBtc2dba2V5XTtcbiAgICAgIGlmICghKGtleSA9PT0gJ2F0dHJzJyAmJiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHt9KSkpIHtcbiAgICAgICAgbWluaWZpZWRPYmpba2V5XSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gbWluaWZpZWRPYmo7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbWluaWZpZWRPYmo7XG4gICAgICB9IC8vIHRzbGludDpkaXNhYmxlXG4gICAgfSwge30pOyAvLyB0c2xpbnQ6ZW5hYmxlXG5cbiAgLyoqXG4gICAqIEFwcGVuZHMgZ2l2ZW4gbWVzc2FnZSB0byBjcm9zcyB0YWIgY29va2llIHZhbHVlXG4gICAqL1xuICBwcml2YXRlIHVwZGF0ZUNvb2tpZShtc2c6IG9iamVjdCkge1xuICAgIGNvbnN0IGNvb2tpZURhdGE6IEFycmF5PExzbkNyb3NzVGFiTWVzc2FnZT4gPSB0aGlzLmNvb2tpZTtcbiAgICBjb29raWVEYXRhLnB1c2gobXNnKTtcbiAgICB0aGlzLmNvb2tpZSA9IGNvb2tpZURhdGE7XG4gIH1cblxuICBwcml2YXRlIGdldCBjb29raWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubHNuQ29va2llU2VydmljZS5nZXQodGhpcy5jcm9zc1RhYkNvbmZpZy5jcm9zc1RhYkNvb2tpZU5hbWUpIHx8IFtdO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXQgY29va2llKGNvb2tpZURhdGE6IEFycmF5PExzbkNyb3NzVGFiTWVzc2FnZT4pIHtcbiAgICB0aGlzLmxzbkNvb2tpZVNlcnZpY2Uuc2V0KHRoaXMuY3Jvc3NUYWJDb29raWVOYW1lLCBjb29raWVEYXRhLCB7XG4gICAgICBkb21haW46IHRoaXMuY3Jvc3NUYWJDb25maWcucm9vdERvbWFpbixcbiAgICAgIHBhdGg6ICcvJ1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgbWVzc2FnZXMgZnJvbSBjcm9zcyB0YWIgY29va2llIHRoYXQgYXJlIG9sZGVyIHRoYW4gc3VwcGxpZWQgY29uZmlnLm1zZ1R0bCB0aW1lXG4gICAqL1xuICBwcml2YXRlIGNsZWFuQ29va2llKCkge1xuICAgIGNvbnN0IGN1cnJlbnRDb29raWUgPSB0aGlzLmNvb2tpZTtcbiAgICBpZiAoY3VycmVudENvb2tpZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHRpbWVzdGFtcCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIGNvbnN0IGNsZWFuZWRDb29raWUgPSBjdXJyZW50Q29va2llLmZpbHRlcih0aGlzLmNsZWFuQ29va2llRmlsdGVyKHRpbWVzdGFtcCwgdGhpcy5jcm9zc1RhYkNvbmZpZy5tc2dUdGwpKTtcbiAgICAvLyBwcmV2aW91cyBpbXBsZW1lbnRhdGlvbiwgY29va2llIG1pZ2h0IGhhdmUgYmVlbiBtb2RpZmllZCBpbiB0aGUgb3RoZXIgdGFiP1xuICAgIGlmICghdGhpcy5hcmVDb29raWVzRXF1YWwoY3VycmVudENvb2tpZSwgdGhpcy5jb29raWUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5jb29raWUgPSBjbGVhbmVkQ29va2llO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGludm9rZWQgYWZ0ZXIgZXZlcnkgY29va2llIHJlYWQgaW50ZXJ2YWxcbiAgICovXG4gIHByaXZhdGUgcmVhZE1lc3NhZ2VzKCkge1xuICAgIGlmICh0aGlzLmNvb2tpZSkge1xuICAgICAgdGhpcy5jb29raWUuZm9yRWFjaCgobXNnRGF0YTogTHNuQ3Jvc3NUYWJNZXNzYWdlKSA9PiB7XG4gICAgICAgIGlmIChtc2dEYXRhLmNyZWF0ZWQgPiB0aGlzLnRhYk9wZW5UaW1lKSB7XG4gICAgICAgICAgY29uc3QgbXNnQ29weSA9IHsuLi5tc2dEYXRhfTtcbiAgICAgICAgICBpZiAoIXRoaXMubWVzc2FnZVdhc1JlYWQobXNnQ29weSkpIHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZXNSZWFkU2V0LmFkZCh0aGlzLmdldE1lc3NhZ2VJZChtc2dDb3B5KSk7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VTdWJqZWN0Lm5leHQobXNnQ29weSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBnZXRDb29raWUgPSAoKSA9PiB0aGlzLmNvb2tpZTtcblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgc3Vic2NyaXB0aW9ucyB0aGF0IHRoaXMgc2VydmljZSBpcyBzdWJzY3JpYmUgdG8gKGludGVydmFscyBhcmUgY2xlYXJlZClcbiAgICovXG4gIHVuc3Vic2NyaWJlKCkge1xuICAgIHRoaXMuY29va2llUmVhZFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuY29va2llQ2xlYW5TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTb3J0cyB0d28gY29va2llIGFycmF5cyBhbmQgY29tcGFyZXMgZWFjaCBlbGVtZW50XG4gICAqL1xuICBwcml2YXRlIGFyZUNvb2tpZXNFcXVhbChmaXJzdENvb2tpZTogQXJyYXk8THNuQ3Jvc3NUYWJNZXNzYWdlPiwgc2Vjb25kQ29va2llOiBBcnJheTxMc25Dcm9zc1RhYk1lc3NhZ2U+KSB7XG4gICAgaWYgKGZpcnN0Q29va2llLmxlbmd0aCAhPT0gc2Vjb25kQ29va2llLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoZmlyc3RDb29raWUubGVuZ3RoID09PSAwICYmIHNlY29uZENvb2tpZS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBmaXJzdENvb2tpZS5zb3J0KHRoaXMubWVzc2FnZUNvbXBhcmVyKTtcbiAgICBzZWNvbmRDb29raWUuc29ydCh0aGlzLm1lc3NhZ2VDb21wYXJlcik7XG4gICAgbGV0IGluZGV4ID0gMDtcbiAgICBsZXQgYXJlQ29va2llc0VxdWFsID0gdHJ1ZTtcbiAgICBmb3IgKGNvbnN0IG1lc3NhZ2Ugb2YgZmlyc3RDb29raWUpIHtcbiAgICAgIGlmIChMc25Dcm9zc1RhYk1lc3NhZ2UuY29tcGFyZShtZXNzYWdlLCBzZWNvbmRDb29raWVbaW5kZXhdKSkge1xuICAgICAgICBhcmVDb29raWVzRXF1YWwgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICsraW5kZXg7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcmVDb29raWVzRXF1YWw7XG4gIH1cblxuICAvKipcbiAgICogQ29tcGFyZXMgdHdvIG1lc3NhZ2VzIGJ5IHByb3BlcnRpZXMgaW4gb3JkZXI6ICdjcmVhdGVkJywgJ2NvZGUnLCAndGFiSWQnO1xuICAgKi9cbiAgcHJpdmF0ZSBtZXNzYWdlQ29tcGFyZXIoZmlyc3RDb29raWVWYWx1ZTogTHNuQ3Jvc3NUYWJNZXNzYWdlLCBzZWNvbmRDb29raWVWYWx1ZTogTHNuQ3Jvc3NUYWJNZXNzYWdlKSB7XG4gICAgbGV0IHJlc3VsdCA9IGZpcnN0Q29va2llVmFsdWUuY3JlYXRlZCA8IHNlY29uZENvb2tpZVZhbHVlLmNyZWF0ZWQgPyAtMSA6IHNlY29uZENvb2tpZVZhbHVlLmNyZWF0ZWQgPCBmaXJzdENvb2tpZVZhbHVlLmNyZWF0ZWQgPyAxIDogMDtcbiAgICBpZiAocmVzdWx0ID09PSAwKSB7XG4gICAgICByZXN1bHQgPSBmaXJzdENvb2tpZVZhbHVlLmNvZGUgPCBzZWNvbmRDb29raWVWYWx1ZS5jb2RlID8gLTEgOiBzZWNvbmRDb29raWVWYWx1ZS5jb2RlIDwgZmlyc3RDb29raWVWYWx1ZS5jb2RlID8gMSA6IDA7XG4gICAgICBpZiAocmVzdWx0ID09PSAwKSB7XG4gICAgICAgIHJlc3VsdCA9IGZpcnN0Q29va2llVmFsdWUudGFiSWQgPCBzZWNvbmRDb29raWVWYWx1ZS50YWJJZCA/IC0xIDogc2Vjb25kQ29va2llVmFsdWUudGFiSWQgPCBmaXJzdENvb2tpZVZhbHVlLnRhYklkID8gMSA6IDA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogRnVuY3Rpb24gZGV0ZXJtaW5lcyB3aGV0aGVyIGdpdmVuIG1lc3NhZ2UgaXMgdG8gYmUgcmVtb3ZlZCBmcm9tIHRoZSBjcm9zcyB0YWIgY29va2llXG4gICAqL1xuICBwcml2YXRlIGNsZWFuQ29va2llRmlsdGVyKHRpbWVzdGFtcDogbnVtYmVyLCBtc2dUdGw6IG51bWJlcikge1xuICAgIHJldHVybiAoY29va2llTWVzc2FnZTogTHNuQ3Jvc3NUYWJNZXNzYWdlKSA9PiB0aW1lc3RhbXAgLSBjb29raWVNZXNzYWdlLmNyZWF0ZWQgPD0gbXNnVHRsO1xuICB9XG5cbn1cbiJdfQ==