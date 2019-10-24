/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable } from '@angular/core';
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
        this.crossTabCookieName = crossTabConfig.crossTabCookieName;
        this.messageSubject = new Subject();
        this.tabId = Math.random() + '';
        this.messagesReadSet = new Set();
        this.tabOpenTime = Date.now();
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
                /** @type {?} */
                const msgCopy = Object.assign({}, msgData);
                if (!this.messageWasRead(msgCopy)) {
                    this.messagesReadSet.add(this.getMessageId(msgCopy));
                    this.messageSubject.next(msgCopy);
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
    { type: LsnCrossTabConfig, decorators: [{ type: Inject, args: [LSN_CROSS_TAB_CONFIG,] }] }
];
/** @nocollapse */ LsnCrossTabService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function LsnCrossTabService_Factory() { return new LsnCrossTabService(i0.ɵɵinject(i1.LsnCookieService), i0.ɵɵinject(i2.LSN_CROSS_TAB_CONFIG)); }, token: LsnCrossTabService, providedIn: "root" });
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
    LsnCrossTabService.prototype.crossTabCookieName;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNuLWNyb3NzLXRhYi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9sc24tY3Jvc3MtdGFiL2xzbi1jcm9zcy10YWIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQVksTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFDLFFBQVEsRUFBYyxPQUFPLEVBQWUsTUFBTSxNQUFNLENBQUM7QUFDakUsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDL0QsT0FBTyxFQUFDLG9CQUFvQixFQUFFLGlCQUFpQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDbkYsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sa0NBQWtDLENBQUM7Ozs7QUFLbEUsTUFBTSxPQUFPLGtCQUFrQjs7Ozs7SUFTN0IsWUFBb0IsZ0JBQWtDLEVBQXdDLGNBQWlDO1FBQTNHLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBd0MsbUJBQWMsR0FBZCxjQUFjLENBQW1COzs7O1FBcUR2SCxtQkFBYyxHQUFHLENBQUMsR0FBdUIsRUFBVyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRXhHLGlCQUFZLEdBQUcsQ0FBQyxPQUEyQixFQUFVLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztRQUV2Ryx5QkFBb0IsR0FBRyxDQUFDLEdBQXVCLEVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2FBQ2pGLE1BQU0sQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUUsRUFBRTs7a0JBQ3JC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QWVZLE1BQU0sU0FBQyxvQkFBb0I7Ozs7Ozs7O0lBUnBGLDRDQUE2RDs7SUFDN0QsbUNBQXVCOzs7OztJQUN2Qiw2Q0FBOEM7Ozs7O0lBQzlDLGdEQUE0Qzs7Ozs7SUFDNUMseUNBQXFDOzs7OztJQUNyQyxvREFBNkM7Ozs7O0lBQzdDLHFEQUE4Qzs7Ozs7O0lBdUQ5Qyw0Q0FBZ0g7Ozs7O0lBRWhILDBDQUErRzs7Ozs7SUFFL0csa0RBU1M7O0lBd0RULHVDQUE4Qjs7Ozs7SUExSGxCLDhDQUEwQzs7Ozs7SUFBRSw0Q0FBdUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgT25EZXN0cm95fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7aW50ZXJ2YWwsIE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0xzbkNyb3NzVGFiTWVzc2FnZX0gZnJvbSAnLi9tb2RlbHMvbHNuQ3Jvc3NUYWJNZXNzYWdlJztcbmltcG9ydCB7TFNOX0NST1NTX1RBQl9DT05GSUcsIExzbkNyb3NzVGFiQ29uZmlnfSBmcm9tICcuL21vZGVscy9sc25Dcm9zc1RhYkNvbmZpZyc7XG5pbXBvcnQge0xzbkNvb2tpZVNlcnZpY2V9IGZyb20gJy4uL2xzbi1jb29raWUvbHNuLWNvb2tpZS5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTHNuQ3Jvc3NUYWJTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSByZWFkb25seSBtZXNzYWdlU3ViamVjdDogU3ViamVjdDxMc25Dcm9zc1RhYk1lc3NhZ2U+O1xuICByZWFkb25seSB0YWJJZDogc3RyaW5nO1xuICBwcml2YXRlIHJlYWRvbmx5IG1lc3NhZ2VzUmVhZFNldDogU2V0PHN0cmluZz47XG4gIHByaXZhdGUgcmVhZG9ubHkgY3Jvc3NUYWJDb29raWVOYW1lOiBzdHJpbmc7XG4gIHByaXZhdGUgcmVhZG9ubHkgdGFiT3BlblRpbWU6IG51bWJlcjtcbiAgcHJpdmF0ZSBjb29raWVSZWFkU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgY29va2llQ2xlYW5TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxzbkNvb2tpZVNlcnZpY2U6IExzbkNvb2tpZVNlcnZpY2UsIEBJbmplY3QoTFNOX0NST1NTX1RBQl9DT05GSUcpIHByaXZhdGUgY3Jvc3NUYWJDb25maWc6IExzbkNyb3NzVGFiQ29uZmlnKSB7XG4gICAgdGhpcy5jcm9zc1RhYkNvb2tpZU5hbWUgPSBjcm9zc1RhYkNvbmZpZy5jcm9zc1RhYkNvb2tpZU5hbWU7XG4gICAgdGhpcy5tZXNzYWdlU3ViamVjdCA9IG5ldyBTdWJqZWN0PExzbkNyb3NzVGFiTWVzc2FnZT4oKTtcbiAgICB0aGlzLnRhYklkID0gTWF0aC5yYW5kb20oKSArICcnO1xuICAgIHRoaXMubWVzc2FnZXNSZWFkU2V0ID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgdGhpcy50YWJPcGVuVGltZSA9IERhdGUubm93KCk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiBzZXRzIHVwIHN1YnNjcmlwdGlvbnMgZm9yIHJlYWRpbmcgYW5kIGNsZWFuaW5nIGNyb3NzIHRhYiBjb29raWVcbiAgICovXG4gIHJ1bigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuY29va2llUmVhZFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5jb29raWVSZWFkU3Vic2NyaXB0aW9uID0gaW50ZXJ2YWwodGhpcy5jcm9zc1RhYkNvbmZpZy5jb29raWVSZWFkRnJlcSlcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLnJlYWRNZXNzYWdlcygpKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmNvb2tpZUNsZWFuU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmNvb2tpZUNsZWFuU3Vic2NyaXB0aW9uID0gaW50ZXJ2YWwodGhpcy5jcm9zc1RhYkNvbmZpZy5jb29raWVDbGVhbkZyZXEpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbGVhbkNvb2tpZSgpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBPYnNlcnZhYmxlIGVtaXRzIG1lc3NhZ2VzIHRoYXQgd2VyZSBzZW50IGJ5IG90aGVyIHRhYnNcbiAgICovXG4gIGdldCBtZXNzYWdlcyQoKTogT2JzZXJ2YWJsZTxMc25Dcm9zc1RhYk1lc3NhZ2U+IHtcbiAgICByZXR1cm4gdGhpcy5tZXNzYWdlU3ViamVjdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kcyBtZXNzYWdlIHRvIG90aGVyIHRhYnMgYnkgYWRkaW5nIHRoaXMgbWVzc2FnZSB0byBjcm9zcyB0YWIgY29va2llXG4gICAqL1xuICBzZW5kTWVzc2FnZShkYXRhOiAoc3RyaW5nIHwgTHNuQ3Jvc3NUYWJNZXNzYWdlIHwgb2JqZWN0KSkge1xuICAgIGxldCBtZXNzYWdlO1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIG1lc3NhZ2UgPSBuZXcgTHNuQ3Jvc3NUYWJNZXNzYWdlKHtjb2RlOiBkYXRhfSk7XG4gICAgfSBlbHNlIGlmIChkYXRhIGluc3RhbmNlb2YgTHNuQ3Jvc3NUYWJNZXNzYWdlKSB7XG4gICAgICBtZXNzYWdlID0gZGF0YTtcbiAgICB9IGVsc2UgaWYgKCEhZGF0YSAmJiB0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgIG1lc3NhZ2UgPSBuZXcgTHNuQ3Jvc3NUYWJNZXNzYWdlKHsuLi5kYXRhfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gcHJldmlvdXMgaW1wbGVtZW50YXRpb24sIG1lc3NhZ2UuY3JlYXRlZCBpcyBhbHdheXMgb3ZlcnJpZGRlblxuICAgIG1lc3NhZ2UuY3JlYXRlZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIG1lc3NhZ2UudGFiSWQgPSB0aGlzLnRhYklkO1xuICAgIHRoaXMubWVzc2FnZXNSZWFkU2V0LmFkZCh0aGlzLmdldE1lc3NhZ2VJZChtZXNzYWdlKSk7XG4gICAgdGhpcy51cGRhdGVDb29raWUodGhpcy5tZXNzYWdlVG9QbGFpbk9iamVjdChtZXNzYWdlKSk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIG1lc3NhZ2Ugd2l0aCBnaXZlbiBpZCB3YXMgYWxyZWFkeSByZWFkXG4gICAqL1xuICBwcml2YXRlIG1lc3NhZ2VXYXNSZWFkID0gKG1zZzogTHNuQ3Jvc3NUYWJNZXNzYWdlKTogYm9vbGVhbiA9PiB0aGlzLm1lc3NhZ2VzUmVhZFNldC5oYXModGhpcy5nZXRNZXNzYWdlSWQobXNnKSk7XG5cbiAgcHJpdmF0ZSBnZXRNZXNzYWdlSWQgPSAobWVzc2FnZTogTHNuQ3Jvc3NUYWJNZXNzYWdlKTogc3RyaW5nID0+IG1lc3NhZ2UudGFiSWQgKyBtZXNzYWdlLmNyZWF0ZWQgKyBtZXNzYWdlLmNvZGU7XG5cbiAgcHJpdmF0ZSBtZXNzYWdlVG9QbGFpbk9iamVjdCA9IChtc2c6IExzbkNyb3NzVGFiTWVzc2FnZSk6IG9iamVjdCA9PiBPYmplY3Qua2V5cyhtc2cpXG4gICAgLnJlZHVjZSgobWluaWZpZWRPYmosIGtleSkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSBtc2dba2V5XTtcbiAgICAgIGlmICghIChrZXkgPT09ICdhdHRycycgJiYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB7fSkgKSkge1xuICAgICAgICBtaW5pZmllZE9ialtrZXldID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBtaW5pZmllZE9iajtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBtaW5pZmllZE9iajtcbiAgICAgIH0gLy8gdHNsaW50OmRpc2FibGVcbiAgICB9LCB7fSk7IC8vIHRzbGludDplbmFibGVcblxuICAvKipcbiAgICogQXBwZW5kcyBnaXZlbiBtZXNzYWdlIHRvIGNyb3NzIHRhYiBjb29raWUgdmFsdWVcbiAgICovXG4gIHByaXZhdGUgdXBkYXRlQ29va2llKG1zZzogb2JqZWN0KSB7XG4gICAgY29uc3QgY29va2llRGF0YTogQXJyYXk8THNuQ3Jvc3NUYWJNZXNzYWdlPiA9IHRoaXMuY29va2llO1xuICAgIGNvb2tpZURhdGEucHVzaChtc2cpO1xuICAgIHRoaXMuY29va2llID0gY29va2llRGF0YTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGNvb2tpZSgpIHtcbiAgICByZXR1cm4gdGhpcy5sc25Db29raWVTZXJ2aWNlLmdldCh0aGlzLmNyb3NzVGFiQ29uZmlnLmNyb3NzVGFiQ29va2llTmFtZSkgfHwgW107XG4gIH1cblxuICBwcml2YXRlIHNldCBjb29raWUoY29va2llRGF0YTogQXJyYXk8THNuQ3Jvc3NUYWJNZXNzYWdlPikge1xuICAgIHRoaXMubHNuQ29va2llU2VydmljZS5zZXQodGhpcy5jcm9zc1RhYkNvb2tpZU5hbWUsIGNvb2tpZURhdGEsIHtcbiAgICAgIGRvbWFpbjogdGhpcy5jcm9zc1RhYkNvbmZpZy5yb290RG9tYWluLFxuICAgICAgcGF0aDogJy8nXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBtZXNzYWdlcyBmcm9tIGNyb3NzIHRhYiBjb29raWUgdGhhdCBhcmUgb2xkZXIgdGhhbiBzdXBwbGllZCBjb25maWcubXNnVHRsIHRpbWVcbiAgICovXG4gIHByaXZhdGUgY2xlYW5Db29raWUoKSB7XG4gICAgY29uc3QgY3VycmVudENvb2tpZSA9IHRoaXMuY29va2llO1xuICAgIGlmIChjdXJyZW50Q29va2llID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdGltZXN0YW1wID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgY29uc3QgY2xlYW5lZENvb2tpZSA9IGN1cnJlbnRDb29raWUuZmlsdGVyKHRoaXMuY2xlYW5Db29raWVGaWx0ZXIodGltZXN0YW1wLCB0aGlzLmNyb3NzVGFiQ29uZmlnLm1zZ1R0bCkpO1xuICAgIC8vIHByZXZpb3VzIGltcGxlbWVudGF0aW9uLCBjb29raWUgbWlnaHQgaGF2ZSBiZWVuIG1vZGlmaWVkIGluIHRoZSBvdGhlciB0YWI/XG4gICAgaWYgKCF0aGlzLmFyZUNvb2tpZXNFcXVhbChjdXJyZW50Q29va2llLCB0aGlzLmNvb2tpZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmNvb2tpZSA9IGNsZWFuZWRDb29raWU7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGJhY2sgaW52b2tlZCBhZnRlciBldmVyeSBjb29raWUgcmVhZCBpbnRlcnZhbFxuICAgKi9cbiAgcHJpdmF0ZSByZWFkTWVzc2FnZXMoKSB7XG4gICAgaWYgKHRoaXMuY29va2llKSB7XG4gICAgICB0aGlzLmNvb2tpZS5mb3JFYWNoKChtc2dEYXRhOiBMc25Dcm9zc1RhYk1lc3NhZ2UpID0+IHtcbiAgICAgICAgY29uc3QgbXNnQ29weSA9IHsuLi5tc2dEYXRhfTtcbiAgICAgICAgaWYgKCF0aGlzLm1lc3NhZ2VXYXNSZWFkKG1zZ0NvcHkpKSB7XG4gICAgICAgICAgdGhpcy5tZXNzYWdlc1JlYWRTZXQuYWRkKHRoaXMuZ2V0TWVzc2FnZUlkKG1zZ0NvcHkpKTtcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VTdWJqZWN0Lm5leHQobXNnQ29weSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGdldENvb2tpZSA9ICgpID0+IHRoaXMuY29va2llO1xuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCBzdWJzY3JpcHRpb25zIHRoYXQgdGhpcyBzZXJ2aWNlIGlzIHN1YnNjcmliZSB0byAoaW50ZXJ2YWxzIGFyZSBjbGVhcmVkKVxuICAgKi9cbiAgdW5zdWJzY3JpYmUoKSB7XG4gICAgdGhpcy5jb29raWVSZWFkU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5jb29raWVDbGVhblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNvcnRzIHR3byBjb29raWUgYXJyYXlzIGFuZCBjb21wYXJlcyBlYWNoIGVsZW1lbnRcbiAgICovXG4gIHByaXZhdGUgYXJlQ29va2llc0VxdWFsKGZpcnN0Q29va2llOiBBcnJheTxMc25Dcm9zc1RhYk1lc3NhZ2U+LCBzZWNvbmRDb29raWU6IEFycmF5PExzbkNyb3NzVGFiTWVzc2FnZT4pIHtcbiAgICBpZiAoZmlyc3RDb29raWUubGVuZ3RoICE9PSBzZWNvbmRDb29raWUubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChmaXJzdENvb2tpZS5sZW5ndGggPT09IDAgJiYgc2Vjb25kQ29va2llLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGZpcnN0Q29va2llLnNvcnQodGhpcy5tZXNzYWdlQ29tcGFyZXIpO1xuICAgIHNlY29uZENvb2tpZS5zb3J0KHRoaXMubWVzc2FnZUNvbXBhcmVyKTtcbiAgICBsZXQgaW5kZXggPSAwO1xuICAgIGxldCBhcmVDb29raWVzRXF1YWwgPSB0cnVlO1xuICAgIGZvciAoY29uc3QgbWVzc2FnZSBvZiBmaXJzdENvb2tpZSkge1xuICAgICAgaWYgKExzbkNyb3NzVGFiTWVzc2FnZS5jb21wYXJlKG1lc3NhZ2UsIHNlY29uZENvb2tpZVtpbmRleF0pKSB7XG4gICAgICAgIGFyZUNvb2tpZXNFcXVhbCA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgKytpbmRleDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFyZUNvb2tpZXNFcXVhbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wYXJlcyB0d28gbWVzc2FnZXMgYnkgcHJvcGVydGllcyBpbiBvcmRlcjogJ2NyZWF0ZWQnLCAnY29kZScsICd0YWJJZCc7XG4gICAqL1xuICBwcml2YXRlIG1lc3NhZ2VDb21wYXJlcihmaXJzdENvb2tpZVZhbHVlOiBMc25Dcm9zc1RhYk1lc3NhZ2UsIHNlY29uZENvb2tpZVZhbHVlOiBMc25Dcm9zc1RhYk1lc3NhZ2UpIHtcbiAgICBsZXQgcmVzdWx0ID0gZmlyc3RDb29raWVWYWx1ZS5jcmVhdGVkIDwgc2Vjb25kQ29va2llVmFsdWUuY3JlYXRlZCA/IC0xIDogc2Vjb25kQ29va2llVmFsdWUuY3JlYXRlZCA8IGZpcnN0Q29va2llVmFsdWUuY3JlYXRlZCA/IDEgOiAwO1xuICAgIGlmIChyZXN1bHQgPT09IDApIHtcbiAgICAgIHJlc3VsdCA9IGZpcnN0Q29va2llVmFsdWUuY29kZSA8IHNlY29uZENvb2tpZVZhbHVlLmNvZGUgPyAtMSA6IHNlY29uZENvb2tpZVZhbHVlLmNvZGUgPCBmaXJzdENvb2tpZVZhbHVlLmNvZGUgPyAxIDogMDtcbiAgICAgIGlmIChyZXN1bHQgPT09IDApIHtcbiAgICAgICAgcmVzdWx0ID0gZmlyc3RDb29raWVWYWx1ZS50YWJJZCA8IHNlY29uZENvb2tpZVZhbHVlLnRhYklkID8gLTEgOiBzZWNvbmRDb29raWVWYWx1ZS50YWJJZCA8IGZpcnN0Q29va2llVmFsdWUudGFiSWQgPyAxIDogMDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiBkZXRlcm1pbmVzIHdoZXRoZXIgZ2l2ZW4gbWVzc2FnZSBpcyB0byBiZSByZW1vdmVkIGZyb20gdGhlIGNyb3NzIHRhYiBjb29raWVcbiAgICovXG4gIHByaXZhdGUgY2xlYW5Db29raWVGaWx0ZXIodGltZXN0YW1wOiBudW1iZXIsIG1zZ1R0bDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIChjb29raWVNZXNzYWdlOiBMc25Dcm9zc1RhYk1lc3NhZ2UpID0+IHRpbWVzdGFtcCAtIGNvb2tpZU1lc3NhZ2UuY3JlYXRlZCA8PSBtc2dUdGw7XG4gIH1cblxufVxuIl19