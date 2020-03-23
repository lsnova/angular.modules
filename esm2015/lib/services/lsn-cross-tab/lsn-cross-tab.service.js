/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @param {?=} crossTabConfig
     */
    constructor(lsnCookieService, crossTabConfig = new LsnCrossTabConfig()) {
        this.lsnCookieService = lsnCookieService;
        this.crossTabConfig = crossTabConfig;
        /**
         * Checks if message with given id was already read
         */
        this.messageWasRead = (msg) => this.messagesReadSet.has(this.getMessageId(msg));
        this.getMessageId = (message) => message.tabId + message.created + message.code;
        this.messageToPlainObject = (msg) => Object.keys(msg)
            .reduce((minifiedObj, key) => {
            /** @type {?} */
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
                .subscribe(() => this.readMessages());
        }
        if (!this.cookieCleanSubscription) {
            this.cookieCleanSubscription = interval(this.crossTabConfig.cookieCleanFreq)
                .subscribe(() => this.cleanCookie());
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
            this.cookie.forEach((msgData) => {
                if (msgData.created > this.tabOpenTime) {
                    /** @type {?} */
                    const msgCopy = Object.assign({}, msgData);
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
        return (cookieMessage) => timestamp - cookieMessage.created <= msgTtl;
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
/** @nocollapse */ LsnCrossTabService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function LsnCrossTabService_Factory() { return new LsnCrossTabService(i0.ɵɵinject(i1.LsnCookieService), i0.ɵɵinject(i2.LSN_CROSS_TAB_CONFIG, 8)); }, token: LsnCrossTabService, providedIn: "root" });
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
    /**
     * @type {?}
     * @private
     */
    LsnCrossTabService.prototype.crossTabConfig;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNuLWNyb3NzLXRhYi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9sc24tY3Jvc3MtdGFiL2xzbi1jcm9zcy10YWIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQWEsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3RFLE9BQU8sRUFBQyxRQUFRLEVBQWMsT0FBTyxFQUFlLE1BQU0sTUFBTSxDQUFDO0FBQ2pFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQy9ELE9BQU8sRUFBQyxvQkFBb0IsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ25GLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGtDQUFrQyxDQUFDOzs7O0FBS2xFLE1BQU0sT0FBTyxrQkFBa0I7Ozs7O0lBWTdCLFlBQW9CLGdCQUFrQyxFQUNRLGlCQUFvQyxJQUFJLGlCQUFpQixFQUFFO1FBRHJHLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDUSxtQkFBYyxHQUFkLGNBQWMsQ0FBNkM7Ozs7UUEyRGpILG1CQUFjLEdBQUcsQ0FBQyxHQUF1QixFQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFeEcsaUJBQVksR0FBRyxDQUFDLE9BQTJCLEVBQVUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBRXZHLHlCQUFvQixHQUFHLENBQUMsR0FBdUIsRUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7YUFDakYsTUFBTSxDQUFDLENBQUMsV0FBVyxF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LENBQUMsU0FBaUIsRUFBRSxNQUFjO1FBQ3pELE9BQU8sQ0FBQyxhQUFpQyxFQUFFLEVBQUUsQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDLE9BQU8sSUFBSSxNQUFNLENBQUM7SUFDNUYsQ0FBQzs7O1lBMU1GLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQUpPLGdCQUFnQjtZQURNLGlCQUFpQix1QkFtQmhDLFFBQVEsWUFBSSxNQUFNLFNBQUMsb0JBQW9COzs7Ozs7OztJQVpwRCw0Q0FBNkQ7O0lBQzdELG1DQUF1Qjs7Ozs7SUFDdkIsNkNBQThDOzs7OztJQUM5Qyx5Q0FBcUM7Ozs7O0lBQ3JDLG9EQUE2Qzs7Ozs7SUFDN0MscURBQThDOzs7Ozs7SUFrRTlDLDRDQUFnSDs7Ozs7SUFFaEgsMENBQStHOzs7OztJQUUvRyxrREFTUzs7SUEwRFQsdUNBQThCOzs7OztJQW5JbEIsOENBQTBDOzs7OztJQUMxQyw0Q0FBNkciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgT25EZXN0cm95LCBPcHRpb25hbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2ludGVydmFsLCBPYnNlcnZhYmxlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtMc25Dcm9zc1RhYk1lc3NhZ2V9IGZyb20gJy4vbW9kZWxzL2xzbkNyb3NzVGFiTWVzc2FnZSc7XG5pbXBvcnQge0xTTl9DUk9TU19UQUJfQ09ORklHLCBMc25Dcm9zc1RhYkNvbmZpZ30gZnJvbSAnLi9tb2RlbHMvbHNuQ3Jvc3NUYWJDb25maWcnO1xuaW1wb3J0IHtMc25Db29raWVTZXJ2aWNlfSBmcm9tICcuLi9sc24tY29va2llL2xzbi1jb29raWUuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIExzbkNyb3NzVGFiU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgbWVzc2FnZVN1YmplY3Q6IFN1YmplY3Q8THNuQ3Jvc3NUYWJNZXNzYWdlPjtcbiAgcmVhZG9ubHkgdGFiSWQ6IHN0cmluZztcbiAgcHJpdmF0ZSByZWFkb25seSBtZXNzYWdlc1JlYWRTZXQ6IFNldDxzdHJpbmc+O1xuICBwcml2YXRlIHJlYWRvbmx5IHRhYk9wZW5UaW1lOiBudW1iZXI7XG4gIHByaXZhdGUgY29va2llUmVhZFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIGNvb2tpZUNsZWFuU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgcHJpdmF0ZSBnZXQgY3Jvc3NUYWJDb29raWVOYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY3Jvc3NUYWJDb25maWcuY3Jvc3NUYWJDb29raWVOYW1lO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBsc25Db29raWVTZXJ2aWNlOiBMc25Db29raWVTZXJ2aWNlLFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KExTTl9DUk9TU19UQUJfQ09ORklHKSBwcml2YXRlIGNyb3NzVGFiQ29uZmlnOiBMc25Dcm9zc1RhYkNvbmZpZyA9IG5ldyBMc25Dcm9zc1RhYkNvbmZpZygpKSB7XG4gICAgdGhpcy5tZXNzYWdlU3ViamVjdCA9IG5ldyBTdWJqZWN0PExzbkNyb3NzVGFiTWVzc2FnZT4oKTtcbiAgICB0aGlzLnRhYklkID0gTWF0aC5yYW5kb20oKSArICcnO1xuICAgIHRoaXMubWVzc2FnZXNSZWFkU2V0ID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgdGhpcy50YWJPcGVuVGltZSA9IERhdGUubm93KCk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiBzZXRzIHVwIHN1YnNjcmlwdGlvbnMgZm9yIHJlYWRpbmcgYW5kIGNsZWFuaW5nIGNyb3NzIHRhYiBjb29raWVcbiAgICovXG4gIHJ1bigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuY29va2llUmVhZFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5jb29raWVSZWFkU3Vic2NyaXB0aW9uID0gaW50ZXJ2YWwodGhpcy5jcm9zc1RhYkNvbmZpZy5jb29raWVSZWFkRnJlcSlcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLnJlYWRNZXNzYWdlcygpKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmNvb2tpZUNsZWFuU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmNvb2tpZUNsZWFuU3Vic2NyaXB0aW9uID0gaW50ZXJ2YWwodGhpcy5jcm9zc1RhYkNvbmZpZy5jb29raWVDbGVhbkZyZXEpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbGVhbkNvb2tpZSgpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBPYnNlcnZhYmxlIGVtaXRzIG1lc3NhZ2VzIHRoYXQgd2VyZSBzZW50IGJ5IG90aGVyIHRhYnNcbiAgICovXG4gIGdldCBtZXNzYWdlcyQoKTogT2JzZXJ2YWJsZTxMc25Dcm9zc1RhYk1lc3NhZ2U+IHtcbiAgICByZXR1cm4gdGhpcy5tZXNzYWdlU3ViamVjdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYW51YWxseSBzZXQgY3Jvc3MgdGFiIGNvbmZpZywgZm9yIGV4YW1wbGUgd2hlbiBjb25maWcgbXVzdCBiZSBwcm92aWRlZCBhc3luY2hyb25vdXNseSBhbmQgbm90IHdpdGggSW5qZWN0aW9uVG9rZW5cbiAgICovXG4gIHNldENyb3NzVGFiQ29uZmlnKGNvbmZpZzogTHNuQ3Jvc3NUYWJDb25maWcpIHtcbiAgICB0aGlzLmNyb3NzVGFiQ29uZmlnID0gY29uZmlnO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbmRzIG1lc3NhZ2UgdG8gb3RoZXIgdGFicyBieSBhZGRpbmcgdGhpcyBtZXNzYWdlIHRvIGNyb3NzIHRhYiBjb29raWVcbiAgICovXG4gIHNlbmRNZXNzYWdlKGRhdGE6IChzdHJpbmcgfCBMc25Dcm9zc1RhYk1lc3NhZ2UgfCBvYmplY3QpKSB7XG4gICAgbGV0IG1lc3NhZ2U7XG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgbWVzc2FnZSA9IG5ldyBMc25Dcm9zc1RhYk1lc3NhZ2Uoe2NvZGU6IGRhdGF9KTtcbiAgICB9IGVsc2UgaWYgKGRhdGEgaW5zdGFuY2VvZiBMc25Dcm9zc1RhYk1lc3NhZ2UpIHtcbiAgICAgIG1lc3NhZ2UgPSBkYXRhO1xuICAgIH0gZWxzZSBpZiAoISFkYXRhICYmIHR5cGVvZiBkYXRhID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgICAgbWVzc2FnZSA9IG5ldyBMc25Dcm9zc1RhYk1lc3NhZ2Uoey4uLmRhdGF9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBwcmV2aW91cyBpbXBsZW1lbnRhdGlvbiwgbWVzc2FnZS5jcmVhdGVkIGlzIGFsd2F5cyBvdmVycmlkZGVuXG4gICAgbWVzc2FnZS5jcmVhdGVkID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgbWVzc2FnZS50YWJJZCA9IHRoaXMudGFiSWQ7XG4gICAgdGhpcy5tZXNzYWdlc1JlYWRTZXQuYWRkKHRoaXMuZ2V0TWVzc2FnZUlkKG1lc3NhZ2UpKTtcbiAgICB0aGlzLnVwZGF0ZUNvb2tpZSh0aGlzLm1lc3NhZ2VUb1BsYWluT2JqZWN0KG1lc3NhZ2UpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgbWVzc2FnZSB3aXRoIGdpdmVuIGlkIHdhcyBhbHJlYWR5IHJlYWRcbiAgICovXG4gIHByaXZhdGUgbWVzc2FnZVdhc1JlYWQgPSAobXNnOiBMc25Dcm9zc1RhYk1lc3NhZ2UpOiBib29sZWFuID0+IHRoaXMubWVzc2FnZXNSZWFkU2V0Lmhhcyh0aGlzLmdldE1lc3NhZ2VJZChtc2cpKTtcblxuICBwcml2YXRlIGdldE1lc3NhZ2VJZCA9IChtZXNzYWdlOiBMc25Dcm9zc1RhYk1lc3NhZ2UpOiBzdHJpbmcgPT4gbWVzc2FnZS50YWJJZCArIG1lc3NhZ2UuY3JlYXRlZCArIG1lc3NhZ2UuY29kZTtcblxuICBwcml2YXRlIG1lc3NhZ2VUb1BsYWluT2JqZWN0ID0gKG1zZzogTHNuQ3Jvc3NUYWJNZXNzYWdlKTogb2JqZWN0ID0+IE9iamVjdC5rZXlzKG1zZylcbiAgICAucmVkdWNlKChtaW5pZmllZE9iaiwga2V5KSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IG1zZ1trZXldO1xuICAgICAgaWYgKCEoa2V5ID09PSAnYXR0cnMnICYmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0ge30pKSkge1xuICAgICAgICBtaW5pZmllZE9ialtrZXldID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBtaW5pZmllZE9iajtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBtaW5pZmllZE9iajtcbiAgICAgIH0gLy8gdHNsaW50OmRpc2FibGVcbiAgICB9LCB7fSk7IC8vIHRzbGludDplbmFibGVcblxuICAvKipcbiAgICogQXBwZW5kcyBnaXZlbiBtZXNzYWdlIHRvIGNyb3NzIHRhYiBjb29raWUgdmFsdWVcbiAgICovXG4gIHByaXZhdGUgdXBkYXRlQ29va2llKG1zZzogb2JqZWN0KSB7XG4gICAgY29uc3QgY29va2llRGF0YTogQXJyYXk8THNuQ3Jvc3NUYWJNZXNzYWdlPiA9IHRoaXMuY29va2llO1xuICAgIGNvb2tpZURhdGEucHVzaChtc2cpO1xuICAgIHRoaXMuY29va2llID0gY29va2llRGF0YTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGNvb2tpZSgpIHtcbiAgICByZXR1cm4gdGhpcy5sc25Db29raWVTZXJ2aWNlLmdldCh0aGlzLmNyb3NzVGFiQ29uZmlnLmNyb3NzVGFiQ29va2llTmFtZSkgfHwgW107XG4gIH1cblxuICBwcml2YXRlIHNldCBjb29raWUoY29va2llRGF0YTogQXJyYXk8THNuQ3Jvc3NUYWJNZXNzYWdlPikge1xuICAgIHRoaXMubHNuQ29va2llU2VydmljZS5zZXQodGhpcy5jcm9zc1RhYkNvb2tpZU5hbWUsIGNvb2tpZURhdGEsIHtcbiAgICAgIGRvbWFpbjogdGhpcy5jcm9zc1RhYkNvbmZpZy5yb290RG9tYWluLFxuICAgICAgcGF0aDogJy8nXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBtZXNzYWdlcyBmcm9tIGNyb3NzIHRhYiBjb29raWUgdGhhdCBhcmUgb2xkZXIgdGhhbiBzdXBwbGllZCBjb25maWcubXNnVHRsIHRpbWVcbiAgICovXG4gIHByaXZhdGUgY2xlYW5Db29raWUoKSB7XG4gICAgY29uc3QgY3VycmVudENvb2tpZSA9IHRoaXMuY29va2llO1xuICAgIGlmIChjdXJyZW50Q29va2llID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdGltZXN0YW1wID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgY29uc3QgY2xlYW5lZENvb2tpZSA9IGN1cnJlbnRDb29raWUuZmlsdGVyKHRoaXMuY2xlYW5Db29raWVGaWx0ZXIodGltZXN0YW1wLCB0aGlzLmNyb3NzVGFiQ29uZmlnLm1zZ1R0bCkpO1xuICAgIC8vIHByZXZpb3VzIGltcGxlbWVudGF0aW9uLCBjb29raWUgbWlnaHQgaGF2ZSBiZWVuIG1vZGlmaWVkIGluIHRoZSBvdGhlciB0YWI/XG4gICAgaWYgKCF0aGlzLmFyZUNvb2tpZXNFcXVhbChjdXJyZW50Q29va2llLCB0aGlzLmNvb2tpZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmNvb2tpZSA9IGNsZWFuZWRDb29raWU7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGJhY2sgaW52b2tlZCBhZnRlciBldmVyeSBjb29raWUgcmVhZCBpbnRlcnZhbFxuICAgKi9cbiAgcHJpdmF0ZSByZWFkTWVzc2FnZXMoKSB7XG4gICAgaWYgKHRoaXMuY29va2llKSB7XG4gICAgICB0aGlzLmNvb2tpZS5mb3JFYWNoKChtc2dEYXRhOiBMc25Dcm9zc1RhYk1lc3NhZ2UpID0+IHtcbiAgICAgICAgaWYgKG1zZ0RhdGEuY3JlYXRlZCA+IHRoaXMudGFiT3BlblRpbWUpIHtcbiAgICAgICAgICBjb25zdCBtc2dDb3B5ID0gey4uLm1zZ0RhdGF9O1xuICAgICAgICAgIGlmICghdGhpcy5tZXNzYWdlV2FzUmVhZChtc2dDb3B5KSkge1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlc1JlYWRTZXQuYWRkKHRoaXMuZ2V0TWVzc2FnZUlkKG1zZ0NvcHkpKTtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZVN1YmplY3QubmV4dChtc2dDb3B5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGdldENvb2tpZSA9ICgpID0+IHRoaXMuY29va2llO1xuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCBzdWJzY3JpcHRpb25zIHRoYXQgdGhpcyBzZXJ2aWNlIGlzIHN1YnNjcmliZSB0byAoaW50ZXJ2YWxzIGFyZSBjbGVhcmVkKVxuICAgKi9cbiAgdW5zdWJzY3JpYmUoKSB7XG4gICAgdGhpcy5jb29raWVSZWFkU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5jb29raWVDbGVhblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNvcnRzIHR3byBjb29raWUgYXJyYXlzIGFuZCBjb21wYXJlcyBlYWNoIGVsZW1lbnRcbiAgICovXG4gIHByaXZhdGUgYXJlQ29va2llc0VxdWFsKGZpcnN0Q29va2llOiBBcnJheTxMc25Dcm9zc1RhYk1lc3NhZ2U+LCBzZWNvbmRDb29raWU6IEFycmF5PExzbkNyb3NzVGFiTWVzc2FnZT4pIHtcbiAgICBpZiAoZmlyc3RDb29raWUubGVuZ3RoICE9PSBzZWNvbmRDb29raWUubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChmaXJzdENvb2tpZS5sZW5ndGggPT09IDAgJiYgc2Vjb25kQ29va2llLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGZpcnN0Q29va2llLnNvcnQodGhpcy5tZXNzYWdlQ29tcGFyZXIpO1xuICAgIHNlY29uZENvb2tpZS5zb3J0KHRoaXMubWVzc2FnZUNvbXBhcmVyKTtcbiAgICBsZXQgaW5kZXggPSAwO1xuICAgIGxldCBhcmVDb29raWVzRXF1YWwgPSB0cnVlO1xuICAgIGZvciAoY29uc3QgbWVzc2FnZSBvZiBmaXJzdENvb2tpZSkge1xuICAgICAgaWYgKExzbkNyb3NzVGFiTWVzc2FnZS5jb21wYXJlKG1lc3NhZ2UsIHNlY29uZENvb2tpZVtpbmRleF0pKSB7XG4gICAgICAgIGFyZUNvb2tpZXNFcXVhbCA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgKytpbmRleDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFyZUNvb2tpZXNFcXVhbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wYXJlcyB0d28gbWVzc2FnZXMgYnkgcHJvcGVydGllcyBpbiBvcmRlcjogJ2NyZWF0ZWQnLCAnY29kZScsICd0YWJJZCc7XG4gICAqL1xuICBwcml2YXRlIG1lc3NhZ2VDb21wYXJlcihmaXJzdENvb2tpZVZhbHVlOiBMc25Dcm9zc1RhYk1lc3NhZ2UsIHNlY29uZENvb2tpZVZhbHVlOiBMc25Dcm9zc1RhYk1lc3NhZ2UpIHtcbiAgICBsZXQgcmVzdWx0ID0gZmlyc3RDb29raWVWYWx1ZS5jcmVhdGVkIDwgc2Vjb25kQ29va2llVmFsdWUuY3JlYXRlZCA/IC0xIDogc2Vjb25kQ29va2llVmFsdWUuY3JlYXRlZCA8IGZpcnN0Q29va2llVmFsdWUuY3JlYXRlZCA/IDEgOiAwO1xuICAgIGlmIChyZXN1bHQgPT09IDApIHtcbiAgICAgIHJlc3VsdCA9IGZpcnN0Q29va2llVmFsdWUuY29kZSA8IHNlY29uZENvb2tpZVZhbHVlLmNvZGUgPyAtMSA6IHNlY29uZENvb2tpZVZhbHVlLmNvZGUgPCBmaXJzdENvb2tpZVZhbHVlLmNvZGUgPyAxIDogMDtcbiAgICAgIGlmIChyZXN1bHQgPT09IDApIHtcbiAgICAgICAgcmVzdWx0ID0gZmlyc3RDb29raWVWYWx1ZS50YWJJZCA8IHNlY29uZENvb2tpZVZhbHVlLnRhYklkID8gLTEgOiBzZWNvbmRDb29raWVWYWx1ZS50YWJJZCA8IGZpcnN0Q29va2llVmFsdWUudGFiSWQgPyAxIDogMDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiBkZXRlcm1pbmVzIHdoZXRoZXIgZ2l2ZW4gbWVzc2FnZSBpcyB0byBiZSByZW1vdmVkIGZyb20gdGhlIGNyb3NzIHRhYiBjb29raWVcbiAgICovXG4gIHByaXZhdGUgY2xlYW5Db29raWVGaWx0ZXIodGltZXN0YW1wOiBudW1iZXIsIG1zZ1R0bDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIChjb29raWVNZXNzYWdlOiBMc25Dcm9zc1RhYk1lc3NhZ2UpID0+IHRpbWVzdGFtcCAtIGNvb2tpZU1lc3NhZ2UuY3JlYXRlZCA8PSBtc2dUdGw7XG4gIH1cblxufVxuIl19