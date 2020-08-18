/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/lsn-cross-tab/lsn-cross-tab.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable, Optional } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { LsnCrossTabMessage } from './models/lsnCrossTabMessage';
import { LSN_CROSS_TAB_CONFIG, LsnCrossTabConfig } from './models/lsnCrossTabConfig';
import { LsnCookieService } from '../lsn-cookie/lsn-cookie.service';
import * as i0 from "@angular/core";
import * as i1 from "../lsn-cookie/lsn-cookie.service";
import * as i2 from "./models/lsnCrossTabConfig";
export class LsnCrossTabService {
    /**
     * @param {?} lsnCookieService
     * @param {?} crossTabConfig
     */
    constructor(lsnCookieService, crossTabConfig) {
        this.lsnCookieService = lsnCookieService;
        /**
         * Checks if message with given id was already read
         */
        this.messageWasRead = (/**
         * @param {?} msg
         * @return {?}
         */
        (msg) => this.messagesReadSet.has(this.getMessageId(msg)));
        this.getMessageId = (/**
         * @param {?} message
         * @return {?}
         */
        (message) => message.tabId + message.created + message.code);
        this.messageToPlainObject = (/**
         * @param {?} msg
         * @return {?}
         */
        (msg) => Object.keys(msg)
            .reduce((/**
         * @param {?} minifiedObj
         * @param {?} key
         * @return {?}
         */
        (minifiedObj, key) => {
            /** @type {?} */
            const value = msg[key];
            if (!(key === 'attrs' && (value === null || value === {}))) {
                minifiedObj[key] = value;
                return minifiedObj;
            }
            else {
                return minifiedObj;
            } // tslint:disable
        }), {})); // tslint:enable
        this.getCookie = (/**
         * @return {?}
         */
        () => this.cookie);
        this.crossTabConfig = crossTabConfig || new LsnCrossTabConfig();
        this.messageSubject = new Subject();
        this.tabId = Math.random() + '';
        this.messagesReadSet = new Set();
        this.tabOpenTime = Date.now();
    }
    /**
     * @private
     * @return {?}
     */
    get crossTabCookieName() {
        return this.crossTabConfig.crossTabCookieName;
    }
    /**
     * This function sets up subscriptions for reading and cleaning cross tab cookie
     * @return {?}
     */
    run() {
        if (!this.cookieReadSubscription) {
            this.cookieReadSubscription = interval(this.crossTabConfig.cookieReadFreq)
                .subscribe((/**
             * @return {?}
             */
            () => this.readMessages()));
        }
        if (!this.cookieCleanSubscription) {
            this.cookieCleanSubscription = interval(this.crossTabConfig.cookieCleanFreq)
                .subscribe((/**
             * @return {?}
             */
            () => this.cleanCookie()));
        }
    }
    /**
     * This Observable emits messages that were sent by other tabs
     * @return {?}
     */
    get messages$() {
        return this.messageSubject;
    }
    /**
     * Manually set cross tab config, for example when config must be provided asynchronously and not with InjectionToken
     * @param {?} config
     * @return {?}
     */
    setCrossTabConfig(config) {
        this.crossTabConfig = config;
    }
    /**
     * Sends message to other tabs by adding this message to cross tab cookie
     * @param {?} data
     * @return {?}
     */
    sendMessage(data) {
        /** @type {?} */
        let message;
        if (typeof data === 'string') {
            message = new LsnCrossTabMessage({ code: data });
        }
        else if (data instanceof LsnCrossTabMessage) {
            message = data;
        }
        else if (!!data && typeof data === 'object' && !Array.isArray(data)) {
            message = new LsnCrossTabMessage(Object.assign({}, data));
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
    // tslint:enable
    /**
     * Appends given message to cross tab cookie value
     * @private
     * @param {?} msg
     * @return {?}
     */
    updateCookie(msg) {
        /** @type {?} */
        const cookieData = this.cookie;
        cookieData.push(msg);
        this.cookie = cookieData;
    }
    /**
     * @private
     * @return {?}
     */
    get cookie() {
        return this.lsnCookieService.get(this.crossTabConfig.crossTabCookieName) || [];
    }
    /**
     * @private
     * @param {?} cookieData
     * @return {?}
     */
    set cookie(cookieData) {
        this.lsnCookieService.set(this.crossTabCookieName, cookieData, {
            domain: this.crossTabConfig.rootDomain,
            path: '/'
        });
    }
    /**
     * Removes messages from cross tab cookie that are older than supplied config.msgTtl time
     * @private
     * @return {?}
     */
    cleanCookie() {
        /** @type {?} */
        const currentCookie = this.cookie;
        if (currentCookie === null) {
            return;
        }
        /** @type {?} */
        const timestamp = new Date().getTime();
        /** @type {?} */
        const cleanedCookie = currentCookie.filter(this.cleanCookieFilter(timestamp, this.crossTabConfig.msgTtl));
        // previous implementation, cookie might have been modified in the other tab?
        if (!this.areCookiesEqual(currentCookie, this.cookie)) {
            return;
        }
        this.cookie = cleanedCookie;
    }
    /**
     * Callback invoked after every cookie read interval
     * @private
     * @return {?}
     */
    readMessages() {
        if (this.cookie) {
            this.cookie.forEach((/**
             * @param {?} msgData
             * @return {?}
             */
            (msgData) => {
                if (msgData.created > this.tabOpenTime) {
                    /** @type {?} */
                    const msgCopy = Object.assign({}, msgData);
                    if (!this.messageWasRead(msgCopy)) {
                        this.messagesReadSet.add(this.getMessageId(msgCopy));
                        this.messageSubject.next(msgCopy);
                    }
                }
            }));
        }
    }
    /**
     * Removes all subscriptions that this service is subscribe to (intervals are cleared)
     * @return {?}
     */
    unsubscribe() {
        this.cookieReadSubscription.unsubscribe();
        this.cookieCleanSubscription.unsubscribe();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.unsubscribe();
    }
    /**
     * Sorts two cookie arrays and compares each element
     * @private
     * @param {?} firstCookie
     * @param {?} secondCookie
     * @return {?}
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
        /** @type {?} */
        let index = 0;
        /** @type {?} */
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
     * @private
     * @param {?} firstCookieValue
     * @param {?} secondCookieValue
     * @return {?}
     */
    messageComparer(firstCookieValue, secondCookieValue) {
        /** @type {?} */
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
     * @private
     * @param {?} timestamp
     * @param {?} msgTtl
     * @return {?}
     */
    cleanCookieFilter(timestamp, msgTtl) {
        return (/**
         * @param {?} cookieMessage
         * @return {?}
         */
        (cookieMessage) => timestamp - cookieMessage.created <= msgTtl);
    }
}
LsnCrossTabService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
LsnCrossTabService.ctorParameters = () => [
    { type: LsnCookieService },
    { type: LsnCrossTabConfig, decorators: [{ type: Optional }, { type: Inject, args: [LSN_CROSS_TAB_CONFIG,] }] }
];
/** @nocollapse */ LsnCrossTabService.ɵprov = i0.ɵɵdefineInjectable({ factory: function LsnCrossTabService_Factory() { return new LsnCrossTabService(i0.ɵɵinject(i1.LsnCookieService), i0.ɵɵinject(i2.LSN_CROSS_TAB_CONFIG, 8)); }, token: LsnCrossTabService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    LsnCrossTabService.prototype.messageSubject;
    /** @type {?} */
    LsnCrossTabService.prototype.tabId;
    /**
     * @type {?}
     * @private
     */
    LsnCrossTabService.prototype.messagesReadSet;
    /**
     * @type {?}
     * @private
     */
    LsnCrossTabService.prototype.tabOpenTime;
    /**
     * @type {?}
     * @private
     */
    LsnCrossTabService.prototype.cookieReadSubscription;
    /**
     * @type {?}
     * @private
     */
    LsnCrossTabService.prototype.cookieCleanSubscription;
    /**
     * @type {?}
     * @private
     */
    LsnCrossTabService.prototype.crossTabConfig;
    /**
     * Checks if message with given id was already read
     * @type {?}
     * @private
     */
    LsnCrossTabService.prototype.messageWasRead;
    /**
     * @type {?}
     * @private
     */
    LsnCrossTabService.prototype.getMessageId;
    /**
     * @type {?}
     * @private
     */
    LsnCrossTabService.prototype.messageToPlainObject;
    /** @type {?} */
    LsnCrossTabService.prototype.getCookie;
    /**
     * @type {?}
     * @private
     */
    LsnCrossTabService.prototype.lsnCookieService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNuLWNyb3NzLXRhYi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9sc24tY3Jvc3MtdGFiL2xzbi1jcm9zcy10YWIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFhLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN0RSxPQUFPLEVBQUMsUUFBUSxFQUFjLE9BQU8sRUFBZSxNQUFNLE1BQU0sQ0FBQztBQUNqRSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUMvRCxPQUFPLEVBQUMsb0JBQW9CLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUNuRixPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQzs7OztBQUtsRSxNQUFNLE9BQU8sa0JBQWtCOzs7OztJQWE3QixZQUFvQixnQkFBa0MsRUFDQSxjQUFpQztRQURuRSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCOzs7O1FBNkQ5QyxtQkFBYzs7OztRQUFHLENBQUMsR0FBdUIsRUFBVyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFDO1FBRXhHLGlCQUFZOzs7O1FBQUcsQ0FBQyxPQUEyQixFQUFVLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksRUFBQztRQUV2Ryx5QkFBb0I7Ozs7UUFBRyxDQUFDLEdBQXVCLEVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2FBQ2pGLE1BQU07Ozs7O1FBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFLEVBQUU7O2tCQUNyQixLQUFL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TSxDQUFDO0lBQ2hCLENBQUM7Ozs7Ozs7O0lBS08saUJBQWlCLENBQUMsU0FBaUIsRUFBRSxNQUFjO1FBQ3pEOzs7O1FBQU8sQ0FBQyxhQUFpQyxFQUFFLEVBQUUsQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDLE9BQU8sSUFBSSxNQUFNLEVBQUM7SUFDNUYsQ0FBQzs7O1lBNU1GLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQUpPLGdCQUFnQjtZQURNLGlCQUFpQix1QkFvQmhDLFFBQVEsWUFBSSxNQUFNLFNBQUMsb0JBQW9COzs7Ozs7OztJQWJwRCw0Q0FBNkQ7O0lBQzdELG1DQUF1Qjs7Ozs7SUFDdkIsNkNBQThDOzs7OztJQUM5Qyx5Q0FBcUM7Ozs7O0lBQ3JDLG9EQUE2Qzs7Ozs7SUFDN0MscURBQThDOzs7OztJQUM5Qyw0Q0FBMEM7Ozs7OztJQW1FMUMsNENBQWdIOzs7OztJQUVoSCwwQ0FBK0c7Ozs7O0lBRS9HLGtEQVNTOztJQTBEVCx1Q0FBOEI7Ozs7O0lBcElsQiw4Q0FBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgT25EZXN0cm95LCBPcHRpb25hbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2ludGVydmFsLCBPYnNlcnZhYmxlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtMc25Dcm9zc1RhYk1lc3NhZ2V9IGZyb20gJy4vbW9kZWxzL2xzbkNyb3NzVGFiTWVzc2FnZSc7XG5pbXBvcnQge0xTTl9DUk9TU19UQUJfQ09ORklHLCBMc25Dcm9zc1RhYkNvbmZpZ30gZnJvbSAnLi9tb2RlbHMvbHNuQ3Jvc3NUYWJDb25maWcnO1xuaW1wb3J0IHtMc25Db29raWVTZXJ2aWNlfSBmcm9tICcuLi9sc24tY29va2llL2xzbi1jb29raWUuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIExzbkNyb3NzVGFiU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgbWVzc2FnZVN1YmplY3Q6IFN1YmplY3Q8THNuQ3Jvc3NUYWJNZXNzYWdlPjtcbiAgcmVhZG9ubHkgdGFiSWQ6IHN0cmluZztcbiAgcHJpdmF0ZSByZWFkb25seSBtZXNzYWdlc1JlYWRTZXQ6IFNldDxzdHJpbmc+O1xuICBwcml2YXRlIHJlYWRvbmx5IHRhYk9wZW5UaW1lOiBudW1iZXI7XG4gIHByaXZhdGUgY29va2llUmVhZFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIGNvb2tpZUNsZWFuU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgY3Jvc3NUYWJDb25maWc6IExzbkNyb3NzVGFiQ29uZmlnO1xuXG4gIHByaXZhdGUgZ2V0IGNyb3NzVGFiQ29va2llTmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNyb3NzVGFiQ29uZmlnLmNyb3NzVGFiQ29va2llTmFtZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbHNuQ29va2llU2VydmljZTogTHNuQ29va2llU2VydmljZSxcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChMU05fQ1JPU1NfVEFCX0NPTkZJRykgY3Jvc3NUYWJDb25maWc6IExzbkNyb3NzVGFiQ29uZmlnKSB7XG4gICAgdGhpcy5jcm9zc1RhYkNvbmZpZyA9IGNyb3NzVGFiQ29uZmlnIHx8IG5ldyBMc25Dcm9zc1RhYkNvbmZpZygpO1xuICAgIHRoaXMubWVzc2FnZVN1YmplY3QgPSBuZXcgU3ViamVjdDxMc25Dcm9zc1RhYk1lc3NhZ2U+KCk7XG4gICAgdGhpcy50YWJJZCA9IE1hdGgucmFuZG9tKCkgKyAnJztcbiAgICB0aGlzLm1lc3NhZ2VzUmVhZFNldCA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgIHRoaXMudGFiT3BlblRpbWUgPSBEYXRlLm5vdygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgZnVuY3Rpb24gc2V0cyB1cCBzdWJzY3JpcHRpb25zIGZvciByZWFkaW5nIGFuZCBjbGVhbmluZyBjcm9zcyB0YWIgY29va2llXG4gICAqL1xuICBydW4oKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmNvb2tpZVJlYWRTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuY29va2llUmVhZFN1YnNjcmlwdGlvbiA9IGludGVydmFsKHRoaXMuY3Jvc3NUYWJDb25maWcuY29va2llUmVhZEZyZXEpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5yZWFkTWVzc2FnZXMoKSk7XG4gICAgfVxuICAgIGlmICghdGhpcy5jb29raWVDbGVhblN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5jb29raWVDbGVhblN1YnNjcmlwdGlvbiA9IGludGVydmFsKHRoaXMuY3Jvc3NUYWJDb25maWcuY29va2llQ2xlYW5GcmVxKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xlYW5Db29raWUoKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgT2JzZXJ2YWJsZSBlbWl0cyBtZXNzYWdlcyB0aGF0IHdlcmUgc2VudCBieSBvdGhlciB0YWJzXG4gICAqL1xuICBnZXQgbWVzc2FnZXMkKCk6IE9ic2VydmFibGU8THNuQ3Jvc3NUYWJNZXNzYWdlPiB7XG4gICAgcmV0dXJuIHRoaXMubWVzc2FnZVN1YmplY3Q7XG4gIH1cblxuICAvKipcbiAgICogTWFudWFsbHkgc2V0IGNyb3NzIHRhYiBjb25maWcsIGZvciBleGFtcGxlIHdoZW4gY29uZmlnIG11c3QgYmUgcHJvdmlkZWQgYXN5bmNocm9ub3VzbHkgYW5kIG5vdCB3aXRoIEluamVjdGlvblRva2VuXG4gICAqL1xuICBzZXRDcm9zc1RhYkNvbmZpZyhjb25maWc6IExzbkNyb3NzVGFiQ29uZmlnKSB7XG4gICAgdGhpcy5jcm9zc1RhYkNvbmZpZyA9IGNvbmZpZztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kcyBtZXNzYWdlIHRvIG90aGVyIHRhYnMgYnkgYWRkaW5nIHRoaXMgbWVzc2FnZSB0byBjcm9zcyB0YWIgY29va2llXG4gICAqL1xuICBzZW5kTWVzc2FnZShkYXRhOiAoc3RyaW5nIHwgTHNuQ3Jvc3NUYWJNZXNzYWdlIHwgb2JqZWN0KSkge1xuICAgIGxldCBtZXNzYWdlO1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIG1lc3NhZ2UgPSBuZXcgTHNuQ3Jvc3NUYWJNZXNzYWdlKHtjb2RlOiBkYXRhfSk7XG4gICAgfSBlbHNlIGlmIChkYXRhIGluc3RhbmNlb2YgTHNuQ3Jvc3NUYWJNZXNzYWdlKSB7XG4gICAgICBtZXNzYWdlID0gZGF0YTtcbiAgICB9IGVsc2UgaWYgKCEhZGF0YSAmJiB0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgIG1lc3NhZ2UgPSBuZXcgTHNuQ3Jvc3NUYWJNZXNzYWdlKHsuLi5kYXRhfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gcHJldmlvdXMgaW1wbGVtZW50YXRpb24sIG1lc3NhZ2UuY3JlYXRlZCBpcyBhbHdheXMgb3ZlcnJpZGRlblxuICAgIG1lc3NhZ2UuY3JlYXRlZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIG1lc3NhZ2UudGFiSWQgPSB0aGlzLnRhYklkO1xuICAgIHRoaXMubWVzc2FnZXNSZWFkU2V0LmFkZCh0aGlzLmdldE1lc3NhZ2VJZChtZXNzYWdlKSk7XG4gICAgdGhpcy51cGRhdGVDb29raWUodGhpcy5tZXNzYWdlVG9QbGFpbk9iamVjdChtZXNzYWdlKSk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIG1lc3NhZ2Ugd2l0aCBnaXZlbiBpZCB3YXMgYWxyZWFkeSByZWFkXG4gICAqL1xuICBwcml2YXRlIG1lc3NhZ2VXYXNSZWFkID0gKG1zZzogTHNuQ3Jvc3NUYWJNZXNzYWdlKTogYm9vbGVhbiA9PiB0aGlzLm1lc3NhZ2VzUmVhZFNldC5oYXModGhpcy5nZXRNZXNzYWdlSWQobXNnKSk7XG5cbiAgcHJpdmF0ZSBnZXRNZXNzYWdlSWQgPSAobWVzc2FnZTogTHNuQ3Jvc3NUYWJNZXNzYWdlKTogc3RyaW5nID0+IG1lc3NhZ2UudGFiSWQgKyBtZXNzYWdlLmNyZWF0ZWQgKyBtZXNzYWdlLmNvZGU7XG5cbiAgcHJpdmF0ZSBtZXNzYWdlVG9QbGFpbk9iamVjdCA9IChtc2c6IExzbkNyb3NzVGFiTWVzc2FnZSk6IG9iamVjdCA9PiBPYmplY3Qua2V5cyhtc2cpXG4gICAgLnJlZHVjZSgobWluaWZpZWRPYmosIGtleSkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSBtc2dba2V5XTtcbiAgICAgIGlmICghKGtleSA9PT0gJ2F0dHJzJyAmJiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHt9KSkpIHtcbiAgICAgICAgbWluaWZpZWRPYmpba2V5XSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gbWluaWZpZWRPYmo7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbWluaWZpZWRPYmo7XG4gICAgICB9IC8vIHRzbGludDpkaXNhYmxlXG4gICAgfSwge30pOyAvLyB0c2xpbnQ6ZW5hYmxlXG5cbiAgLyoqXG4gICAqIEFwcGVuZHMgZ2l2ZW4gbWVzc2FnZSB0byBjcm9zcyB0YWIgY29va2llIHZhbHVlXG4gICAqL1xuICBwcml2YXRlIHVwZGF0ZUNvb2tpZShtc2c6IG9iamVjdCkge1xuICAgIGNvbnN0IGNvb2tpZURhdGE6IEFycmF5PExzbkNyb3NzVGFiTWVzc2FnZT4gPSB0aGlzLmNvb2tpZTtcbiAgICBjb29raWVEYXRhLnB1c2gobXNnKTtcbiAgICB0aGlzLmNvb2tpZSA9IGNvb2tpZURhdGE7XG4gIH1cblxuICBwcml2YXRlIGdldCBjb29raWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubHNuQ29va2llU2VydmljZS5nZXQodGhpcy5jcm9zc1RhYkNvbmZpZy5jcm9zc1RhYkNvb2tpZU5hbWUpIHx8IFtdO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXQgY29va2llKGNvb2tpZURhdGE6IEFycmF5PExzbkNyb3NzVGFiTWVzc2FnZT4pIHtcbiAgICB0aGlzLmxzbkNvb2tpZVNlcnZpY2Uuc2V0KHRoaXMuY3Jvc3NUYWJDb29raWVOYW1lLCBjb29raWVEYXRhLCB7XG4gICAgICBkb21haW46IHRoaXMuY3Jvc3NUYWJDb25maWcucm9vdERvbWFpbixcbiAgICAgIHBhdGg6ICcvJ1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgbWVzc2FnZXMgZnJvbSBjcm9zcyB0YWIgY29va2llIHRoYXQgYXJlIG9sZGVyIHRoYW4gc3VwcGxpZWQgY29uZmlnLm1zZ1R0bCB0aW1lXG4gICAqL1xuICBwcml2YXRlIGNsZWFuQ29va2llKCkge1xuICAgIGNvbnN0IGN1cnJlbnRDb29raWUgPSB0aGlzLmNvb2tpZTtcbiAgICBpZiAoY3VycmVudENvb2tpZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHRpbWVzdGFtcCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIGNvbnN0IGNsZWFuZWRDb29raWUgPSBjdXJyZW50Q29va2llLmZpbHRlcih0aGlzLmNsZWFuQ29va2llRmlsdGVyKHRpbWVzdGFtcCwgdGhpcy5jcm9zc1RhYkNvbmZpZy5tc2dUdGwpKTtcbiAgICAvLyBwcmV2aW91cyBpbXBsZW1lbnRhdGlvbiwgY29va2llIG1pZ2h0IGhhdmUgYmVlbiBtb2RpZmllZCBpbiB0aGUgb3RoZXIgdGFiP1xuICAgIGlmICghdGhpcy5hcmVDb29raWVzRXF1YWwoY3VycmVudENvb2tpZSwgdGhpcy5jb29raWUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5jb29raWUgPSBjbGVhbmVkQ29va2llO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGludm9rZWQgYWZ0ZXIgZXZlcnkgY29va2llIHJlYWQgaW50ZXJ2YWxcbiAgICovXG4gIHByaXZhdGUgcmVhZE1lc3NhZ2VzKCkge1xuICAgIGlmICh0aGlzLmNvb2tpZSkge1xuICAgICAgdGhpcy5jb29raWUuZm9yRWFjaCgobXNnRGF0YTogTHNuQ3Jvc3NUYWJNZXNzYWdlKSA9PiB7XG4gICAgICAgIGlmIChtc2dEYXRhLmNyZWF0ZWQgPiB0aGlzLnRhYk9wZW5UaW1lKSB7XG4gICAgICAgICAgY29uc3QgbXNnQ29weSA9IHsuLi5tc2dEYXRhfTtcbiAgICAgICAgICBpZiAoIXRoaXMubWVzc2FnZVdhc1JlYWQobXNnQ29weSkpIHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZXNSZWFkU2V0LmFkZCh0aGlzLmdldE1lc3NhZ2VJZChtc2dDb3B5KSk7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VTdWJqZWN0Lm5leHQobXNnQ29weSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBnZXRDb29raWUgPSAoKSA9PiB0aGlzLmNvb2tpZTtcblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgc3Vic2NyaXB0aW9ucyB0aGF0IHRoaXMgc2VydmljZSBpcyBzdWJzY3JpYmUgdG8gKGludGVydmFscyBhcmUgY2xlYXJlZClcbiAgICovXG4gIHVuc3Vic2NyaWJlKCkge1xuICAgIHRoaXMuY29va2llUmVhZFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuY29va2llQ2xlYW5TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTb3J0cyB0d28gY29va2llIGFycmF5cyBhbmQgY29tcGFyZXMgZWFjaCBlbGVtZW50XG4gICAqL1xuICBwcml2YXRlIGFyZUNvb2tpZXNFcXVhbChmaXJzdENvb2tpZTogQXJyYXk8THNuQ3Jvc3NUYWJNZXNzYWdlPiwgc2Vjb25kQ29va2llOiBBcnJheTxMc25Dcm9zc1RhYk1lc3NhZ2U+KSB7XG4gICAgaWYgKGZpcnN0Q29va2llLmxlbmd0aCAhPT0gc2Vjb25kQ29va2llLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoZmlyc3RDb29raWUubGVuZ3RoID09PSAwICYmIHNlY29uZENvb2tpZS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBmaXJzdENvb2tpZS5zb3J0KHRoaXMubWVzc2FnZUNvbXBhcmVyKTtcbiAgICBzZWNvbmRDb29raWUuc29ydCh0aGlzLm1lc3NhZ2VDb21wYXJlcik7XG4gICAgbGV0IGluZGV4ID0gMDtcbiAgICBsZXQgYXJlQ29va2llc0VxdWFsID0gdHJ1ZTtcbiAgICBmb3IgKGNvbnN0IG1lc3NhZ2Ugb2YgZmlyc3RDb29raWUpIHtcbiAgICAgIGlmIChMc25Dcm9zc1RhYk1lc3NhZ2UuY29tcGFyZShtZXNzYWdlLCBzZWNvbmRDb29raWVbaW5kZXhdKSkge1xuICAgICAgICBhcmVDb29raWVzRXF1YWwgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICsraW5kZXg7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcmVDb29raWVzRXF1YWw7XG4gIH1cblxuICAvKipcbiAgICogQ29tcGFyZXMgdHdvIG1lc3NhZ2VzIGJ5IHByb3BlcnRpZXMgaW4gb3JkZXI6ICdjcmVhdGVkJywgJ2NvZGUnLCAndGFiSWQnO1xuICAgKi9cbiAgcHJpdmF0ZSBtZXNzYWdlQ29tcGFyZXIoZmlyc3RDb29raWVWYWx1ZTogTHNuQ3Jvc3NUYWJNZXNzYWdlLCBzZWNvbmRDb29raWVWYWx1ZTogTHNuQ3Jvc3NUYWJNZXNzYWdlKSB7XG4gICAgbGV0IHJlc3VsdCA9IGZpcnN0Q29va2llVmFsdWUuY3JlYXRlZCA8IHNlY29uZENvb2tpZVZhbHVlLmNyZWF0ZWQgPyAtMSA6IHNlY29uZENvb2tpZVZhbHVlLmNyZWF0ZWQgPCBmaXJzdENvb2tpZVZhbHVlLmNyZWF0ZWQgPyAxIDogMDtcbiAgICBpZiAocmVzdWx0ID09PSAwKSB7XG4gICAgICByZXN1bHQgPSBmaXJzdENvb2tpZVZhbHVlLmNvZGUgPCBzZWNvbmRDb29raWVWYWx1ZS5jb2RlID8gLTEgOiBzZWNvbmRDb29raWVWYWx1ZS5jb2RlIDwgZmlyc3RDb29raWVWYWx1ZS5jb2RlID8gMSA6IDA7XG4gICAgICBpZiAocmVzdWx0ID09PSAwKSB7XG4gICAgICAgIHJlc3VsdCA9IGZpcnN0Q29va2llVmFsdWUudGFiSWQgPCBzZWNvbmRDb29raWVWYWx1ZS50YWJJZCA/IC0xIDogc2Vjb25kQ29va2llVmFsdWUudGFiSWQgPCBmaXJzdENvb2tpZVZhbHVlLnRhYklkID8gMSA6IDA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogRnVuY3Rpb24gZGV0ZXJtaW5lcyB3aGV0aGVyIGdpdmVuIG1lc3NhZ2UgaXMgdG8gYmUgcmVtb3ZlZCBmcm9tIHRoZSBjcm9zcyB0YWIgY29va2llXG4gICAqL1xuICBwcml2YXRlIGNsZWFuQ29va2llRmlsdGVyKHRpbWVzdGFtcDogbnVtYmVyLCBtc2dUdGw6IG51bWJlcikge1xuICAgIHJldHVybiAoY29va2llTWVzc2FnZTogTHNuQ3Jvc3NUYWJNZXNzYWdlKSA9PiB0aW1lc3RhbXAgLSBjb29raWVNZXNzYWdlLmNyZWF0ZWQgPD0gbXNnVHRsO1xuICB9XG5cbn1cbiJdfQ==