/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Inject, Injectable } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { LsnCrossTabMessage } from './models/lsnCrossTabMessage';
import { LSN_CROSS_TAB_CONFIG, LsnCrossTabConfig } from './models/lsnCrossTabConfig';
import { LsnCookieService } from '../lsn-cookie/lsn-cookie.service';
import * as i0 from "@angular/core";
import * as i1 from "../lsn-cookie/lsn-cookie.service";
import * as i2 from "./models/lsnCrossTabConfig";
var LsnCrossTabService = /** @class */ (function () {
    function LsnCrossTabService(lsnCookieService, crossTabConfig) {
        var _this = this;
        this.lsnCookieService = lsnCookieService;
        this.crossTabConfig = crossTabConfig;
        /**
         * Checks if message with given id was already read
         */
        this.messageWasRead = function (msg) { return _this.messagesReadSet.has(_this.getMessageId(msg)); };
        this.getMessageId = function (message) { return message.tabId + message.created + message.code; };
        this.messageToPlainObject = function (msg) { return Object.keys(msg)
            .reduce(function (minifiedObj, key) {
            /** @type {?} */
            var value = msg[key];
            if (!(key === 'attrs' && (value === null || value === {}))) {
                minifiedObj[key] = value;
                return minifiedObj;
            }
            else {
                return minifiedObj;
            } // tslint:disable
        }, {}); }; // tslint:enable
        this.getCookie = function () { return _this.cookie; };
        this.crossTabCookieName = crossTabConfig.crossTabCookieName;
        this.messageSubject = new Subject();
        this.tabId = Math.random() + '';
        this.messagesReadSet = new Set();
        this.tabOpenTime = Date.now();
    }
    /**
     * This function sets up subscriptions for reading and cleaning cross tab cookie
     */
    /**
     * This function sets up subscriptions for reading and cleaning cross tab cookie
     * @return {?}
     */
    LsnCrossTabService.prototype.run = /**
     * This function sets up subscriptions for reading and cleaning cross tab cookie
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.cookieReadSubscription) {
            this.cookieReadSubscription = interval(this.crossTabConfig.cookieReadFreq)
                .subscribe(function () { return _this.readMessages(); });
        }
        if (!this.cookieCleanSubscription) {
            this.cookieCleanSubscription = interval(this.crossTabConfig.cookieCleanFreq)
                .subscribe(function () { return _this.cleanCookie(); });
        }
    };
    Object.defineProperty(LsnCrossTabService.prototype, "messages$", {
        /**
         * This Observable emits messages that were sent by other tabs
         */
        get: /**
         * This Observable emits messages that were sent by other tabs
         * @return {?}
         */
        function () {
            return this.messageSubject;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sends message to other tabs by adding this message to cross tab cookie
     */
    /**
     * Sends message to other tabs by adding this message to cross tab cookie
     * @param {?} data
     * @return {?}
     */
    LsnCrossTabService.prototype.sendMessage = /**
     * Sends message to other tabs by adding this message to cross tab cookie
     * @param {?} data
     * @return {?}
     */
    function (data) {
        /** @type {?} */
        var message;
        if (typeof data === 'string') {
            message = new LsnCrossTabMessage({ code: data });
        }
        else if (data instanceof LsnCrossTabMessage) {
            message = data;
        }
        else if (!!data && typeof data === 'object' && !Array.isArray(data)) {
            message = new LsnCrossTabMessage(tslib_1.__assign({}, data));
        }
        else {
            return;
        }
        // previous implementation, message.created is always overridden
        message.created = new Date().getTime();
        message.tabId = this.tabId;
        this.messagesReadSet.add(this.getMessageId(message));
        this.updateCookie(this.messageToPlainObject(message));
    };
    /**
     * Appends given message to cross tab cookie value
     */
    // tslint:enable
    /**
     * Appends given message to cross tab cookie value
     * @private
     * @param {?} msg
     * @return {?}
     */
    LsnCrossTabService.prototype.updateCookie = 
    // tslint:enable
    /**
     * Appends given message to cross tab cookie value
     * @private
     * @param {?} msg
     * @return {?}
     */
    function (msg) {
        /** @type {?} */
        var cookieData = this.cookie;
        cookieData.push(msg);
        this.cookie = cookieData;
    };
    Object.defineProperty(LsnCrossTabService.prototype, "cookie", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this.lsnCookieService.get(this.crossTabConfig.crossTabCookieName) || [];
        },
        set: /**
         * @private
         * @param {?} cookieData
         * @return {?}
         */
        function (cookieData) {
            this.lsnCookieService.set(this.crossTabCookieName, cookieData, {
                domain: this.crossTabConfig.rootDomain,
                path: '/'
            });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Removes messages from cross tab cookie that are older than supplied config.msgTtl time
     */
    /**
     * Removes messages from cross tab cookie that are older than supplied config.msgTtl time
     * @private
     * @return {?}
     */
    LsnCrossTabService.prototype.cleanCookie = /**
     * Removes messages from cross tab cookie that are older than supplied config.msgTtl time
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var currentCookie = this.cookie;
        if (currentCookie === null) {
            return;
        }
        /** @type {?} */
        var timestamp = new Date().getTime();
        /** @type {?} */
        var cleanedCookie = currentCookie.filter(this.cleanCookieFilter(timestamp, this.crossTabConfig.msgTtl));
        // previous implementation, cookie might have been modified in the other tab?
        if (!this.areCookiesEqual(currentCookie, this.cookie)) {
            return;
        }
        this.cookie = cleanedCookie;
    };
    /**
     * Callback invoked after every cookie read interval
     */
    /**
     * Callback invoked after every cookie read interval
     * @private
     * @return {?}
     */
    LsnCrossTabService.prototype.readMessages = /**
     * Callback invoked after every cookie read interval
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.cookie) {
            this.cookie.forEach(function (msgData) {
                if (msgData.created > _this.tabOpenTime) {
                    /** @type {?} */
                    var msgCopy = tslib_1.__assign({}, msgData);
                    if (!_this.messageWasRead(msgCopy)) {
                        _this.messagesReadSet.add(_this.getMessageId(msgCopy));
                        _this.messageSubject.next(msgCopy);
                    }
                }
            });
        }
    };
    /**
     * Removes all subscriptions that this service is subscribe to (intervals are cleared)
     */
    /**
     * Removes all subscriptions that this service is subscribe to (intervals are cleared)
     * @return {?}
     */
    LsnCrossTabService.prototype.unsubscribe = /**
     * Removes all subscriptions that this service is subscribe to (intervals are cleared)
     * @return {?}
     */
    function () {
        this.cookieReadSubscription.unsubscribe();
        this.cookieCleanSubscription.unsubscribe();
    };
    /**
     * @return {?}
     */
    LsnCrossTabService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.unsubscribe();
    };
    /**
     * Sorts two cookie arrays and compares each element
     */
    /**
     * Sorts two cookie arrays and compares each element
     * @private
     * @param {?} firstCookie
     * @param {?} secondCookie
     * @return {?}
     */
    LsnCrossTabService.prototype.areCookiesEqual = /**
     * Sorts two cookie arrays and compares each element
     * @private
     * @param {?} firstCookie
     * @param {?} secondCookie
     * @return {?}
     */
    function (firstCookie, secondCookie) {
        var e_1, _a;
        if (firstCookie.length !== secondCookie.length) {
            return false;
        }
        else if (firstCookie.length === 0 && secondCookie.length === 0) {
            return true;
        }
        firstCookie.sort(this.messageComparer);
        secondCookie.sort(this.messageComparer);
        /** @type {?} */
        var index = 0;
        /** @type {?} */
        var areCookiesEqual = true;
        try {
            for (var firstCookie_1 = tslib_1.__values(firstCookie), firstCookie_1_1 = firstCookie_1.next(); !firstCookie_1_1.done; firstCookie_1_1 = firstCookie_1.next()) {
                var message = firstCookie_1_1.value;
                if (LsnCrossTabMessage.compare(message, secondCookie[index])) {
                    areCookiesEqual = false;
                }
                else {
                    ++index;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (firstCookie_1_1 && !firstCookie_1_1.done && (_a = firstCookie_1.return)) _a.call(firstCookie_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return areCookiesEqual;
    };
    /**
     * Compares two messages by properties in order: 'created', 'code', 'tabId';
     */
    /**
     * Compares two messages by properties in order: 'created', 'code', 'tabId';
     * @private
     * @param {?} firstCookieValue
     * @param {?} secondCookieValue
     * @return {?}
     */
    LsnCrossTabService.prototype.messageComparer = /**
     * Compares two messages by properties in order: 'created', 'code', 'tabId';
     * @private
     * @param {?} firstCookieValue
     * @param {?} secondCookieValue
     * @return {?}
     */
    function (firstCookieValue, secondCookieValue) {
        /** @type {?} */
        var result = firstCookieValue.created < secondCookieValue.created ? -1 : secondCookieValue.created < firstCookieValue.created ? 1 : 0;
        if (result === 0) {
            result = firstCookieValue.code < secondCookieValue.code ? -1 : secondCookieValue.code < firstCookieValue.code ? 1 : 0;
            if (result === 0) {
                result = firstCookieValue.tabId < secondCookieValue.tabId ? -1 : secondCookieValue.tabId < firstCookieValue.tabId ? 1 : 0;
            }
        }
        return result;
    };
    /**
     * Function determines whether given message is to be removed from the cross tab cookie
     */
    /**
     * Function determines whether given message is to be removed from the cross tab cookie
     * @private
     * @param {?} timestamp
     * @param {?} msgTtl
     * @return {?}
     */
    LsnCrossTabService.prototype.cleanCookieFilter = /**
     * Function determines whether given message is to be removed from the cross tab cookie
     * @private
     * @param {?} timestamp
     * @param {?} msgTtl
     * @return {?}
     */
    function (timestamp, msgTtl) {
        return function (cookieMessage) { return timestamp - cookieMessage.created <= msgTtl; };
    };
    LsnCrossTabService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    LsnCrossTabService.ctorParameters = function () { return [
        { type: LsnCookieService },
        { type: LsnCrossTabConfig, decorators: [{ type: Inject, args: [LSN_CROSS_TAB_CONFIG,] }] }
    ]; };
    /** @nocollapse */ LsnCrossTabService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function LsnCrossTabService_Factory() { return new LsnCrossTabService(i0.ɵɵinject(i1.LsnCookieService), i0.ɵɵinject(i2.LSN_CROSS_TAB_CONFIG)); }, token: LsnCrossTabService, providedIn: "root" });
    return LsnCrossTabService;
}());
export { LsnCrossTabService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNuLWNyb3NzLXRhYi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9sc24tY3Jvc3MtdGFiL2xzbi1jcm9zcy10YWIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFZLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBQyxRQUFRLEVBQWMsT0FBTyxFQUFlLE1BQU0sTUFBTSxDQUFDO0FBQ2pFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQy9ELE9BQU8sRUFBQyxvQkFBb0IsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ25GLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGtDQUFrQyxDQUFDOzs7O0FBRWxFO0lBWUUsNEJBQW9CLGdCQUFrQyxFQUF3QyxjQUFpQztRQUEvSCxpQkFNQztRQU5tQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQXdDLG1CQUFjLEdBQWQsY0FBYyxDQUFtQjs7OztRQXFEdkgsbUJBQWMsR0FBRyxVQUFDLEdBQXVCLElBQWMsT0FBQSxLQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQWhELENBQWdELENBQUM7UUFFeEcsaUJBQVksR0FBRyxVQUFDLE9BQTJCLElBQWEsT0FBQSxPQUFPLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksRUFBOUMsQ0FBOEMsQ0FBQztRQUV2Ryx5QkFBb0IsR0FBRyxVQUFDLEdBQXVCLElBQWEsT0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzthQUNqRixNQUFNLENBQUMsVUFBQyxXQUFXLEVBQUUsR0FBRzs7Z0JBQ2pCLEtBQUssR0FB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Q0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMzSDtTQUNGO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVEOztPQUVHOzs7Ozs7OztJQUNLLDhDQUFpQjs7Ozs7OztJQUF6QixVQUEwQixTQUFpQixFQUFFLE1BQWM7UUFDekQsT0FBTyxVQUFDLGFBQWlDLElBQUssT0FBQSxTQUFTLEdBQUcsYUFBYSxDQUFDLE9BQU8sSUFBSSxNQUFNLEVBQTNDLENBQTJDLENBQUM7SUFDNUYsQ0FBQzs7Z0JBaE1GLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBSk8sZ0JBQWdCO2dCQURNLGlCQUFpQix1QkFlWSxNQUFNLFNBQUMsb0JBQW9COzs7NkJBbEJ0RjtDQXdNQyxBQWxNRCxJQWtNQztTQS9MWSxrQkFBa0I7Ozs7OztJQUM3Qiw0Q0FBNkQ7O0lBQzdELG1DQUF1Qjs7Ozs7SUFDdkIsNkNBQThDOzs7OztJQUM5QyxnREFBNEM7Ozs7O0lBQzVDLHlDQUFxQzs7Ozs7SUFDckMsb0RBQTZDOzs7OztJQUM3QyxxREFBOEM7Ozs7OztJQXVEOUMsNENBQWdIOzs7OztJQUVoSCwwQ0FBK0c7Ozs7O0lBRS9HLGtEQVNTOztJQTBEVCx1Q0FBOEI7Ozs7O0lBNUhsQiw4Q0FBMEM7Ozs7O0lBQUUsNENBQXVFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIE9uRGVzdHJveX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2ludGVydmFsLCBPYnNlcnZhYmxlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtMc25Dcm9zc1RhYk1lc3NhZ2V9IGZyb20gJy4vbW9kZWxzL2xzbkNyb3NzVGFiTWVzc2FnZSc7XG5pbXBvcnQge0xTTl9DUk9TU19UQUJfQ09ORklHLCBMc25Dcm9zc1RhYkNvbmZpZ30gZnJvbSAnLi9tb2RlbHMvbHNuQ3Jvc3NUYWJDb25maWcnO1xuaW1wb3J0IHtMc25Db29raWVTZXJ2aWNlfSBmcm9tICcuLi9sc24tY29va2llL2xzbi1jb29raWUuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIExzbkNyb3NzVGFiU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgbWVzc2FnZVN1YmplY3Q6IFN1YmplY3Q8THNuQ3Jvc3NUYWJNZXNzYWdlPjtcbiAgcmVhZG9ubHkgdGFiSWQ6IHN0cmluZztcbiAgcHJpdmF0ZSByZWFkb25seSBtZXNzYWdlc1JlYWRTZXQ6IFNldDxzdHJpbmc+O1xuICBwcml2YXRlIHJlYWRvbmx5IGNyb3NzVGFiQ29va2llTmFtZTogc3RyaW5nO1xuICBwcml2YXRlIHJlYWRvbmx5IHRhYk9wZW5UaW1lOiBudW1iZXI7XG4gIHByaXZhdGUgY29va2llUmVhZFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIGNvb2tpZUNsZWFuU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBsc25Db29raWVTZXJ2aWNlOiBMc25Db29raWVTZXJ2aWNlLCBASW5qZWN0KExTTl9DUk9TU19UQUJfQ09ORklHKSBwcml2YXRlIGNyb3NzVGFiQ29uZmlnOiBMc25Dcm9zc1RhYkNvbmZpZykge1xuICAgIHRoaXMuY3Jvc3NUYWJDb29raWVOYW1lID0gY3Jvc3NUYWJDb25maWcuY3Jvc3NUYWJDb29raWVOYW1lO1xuICAgIHRoaXMubWVzc2FnZVN1YmplY3QgPSBuZXcgU3ViamVjdDxMc25Dcm9zc1RhYk1lc3NhZ2U+KCk7XG4gICAgdGhpcy50YWJJZCA9IE1hdGgucmFuZG9tKCkgKyAnJztcbiAgICB0aGlzLm1lc3NhZ2VzUmVhZFNldCA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgIHRoaXMudGFiT3BlblRpbWUgPSBEYXRlLm5vdygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgZnVuY3Rpb24gc2V0cyB1cCBzdWJzY3JpcHRpb25zIGZvciByZWFkaW5nIGFuZCBjbGVhbmluZyBjcm9zcyB0YWIgY29va2llXG4gICAqL1xuICBydW4oKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmNvb2tpZVJlYWRTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuY29va2llUmVhZFN1YnNjcmlwdGlvbiA9IGludGVydmFsKHRoaXMuY3Jvc3NUYWJDb25maWcuY29va2llUmVhZEZyZXEpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5yZWFkTWVzc2FnZXMoKSk7XG4gICAgfVxuICAgIGlmICghdGhpcy5jb29raWVDbGVhblN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5jb29raWVDbGVhblN1YnNjcmlwdGlvbiA9IGludGVydmFsKHRoaXMuY3Jvc3NUYWJDb25maWcuY29va2llQ2xlYW5GcmVxKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xlYW5Db29raWUoKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgT2JzZXJ2YWJsZSBlbWl0cyBtZXNzYWdlcyB0aGF0IHdlcmUgc2VudCBieSBvdGhlciB0YWJzXG4gICAqL1xuICBnZXQgbWVzc2FnZXMkKCk6IE9ic2VydmFibGU8THNuQ3Jvc3NUYWJNZXNzYWdlPiB7XG4gICAgcmV0dXJuIHRoaXMubWVzc2FnZVN1YmplY3Q7XG4gIH1cblxuICAvKipcbiAgICogU2VuZHMgbWVzc2FnZSB0byBvdGhlciB0YWJzIGJ5IGFkZGluZyB0aGlzIG1lc3NhZ2UgdG8gY3Jvc3MgdGFiIGNvb2tpZVxuICAgKi9cbiAgc2VuZE1lc3NhZ2UoZGF0YTogKHN0cmluZyB8IExzbkNyb3NzVGFiTWVzc2FnZSB8IG9iamVjdCkpIHtcbiAgICBsZXQgbWVzc2FnZTtcbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICBtZXNzYWdlID0gbmV3IExzbkNyb3NzVGFiTWVzc2FnZSh7Y29kZTogZGF0YX0pO1xuICAgIH0gZWxzZSBpZiAoZGF0YSBpbnN0YW5jZW9mIExzbkNyb3NzVGFiTWVzc2FnZSkge1xuICAgICAgbWVzc2FnZSA9IGRhdGE7XG4gICAgfSBlbHNlIGlmICghIWRhdGEgJiYgdHlwZW9mIGRhdGEgPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICBtZXNzYWdlID0gbmV3IExzbkNyb3NzVGFiTWVzc2FnZSh7Li4uZGF0YX0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIHByZXZpb3VzIGltcGxlbWVudGF0aW9uLCBtZXNzYWdlLmNyZWF0ZWQgaXMgYWx3YXlzIG92ZXJyaWRkZW5cbiAgICBtZXNzYWdlLmNyZWF0ZWQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICBtZXNzYWdlLnRhYklkID0gdGhpcy50YWJJZDtcbiAgICB0aGlzLm1lc3NhZ2VzUmVhZFNldC5hZGQodGhpcy5nZXRNZXNzYWdlSWQobWVzc2FnZSkpO1xuICAgIHRoaXMudXBkYXRlQ29va2llKHRoaXMubWVzc2FnZVRvUGxhaW5PYmplY3QobWVzc2FnZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBtZXNzYWdlIHdpdGggZ2l2ZW4gaWQgd2FzIGFscmVhZHkgcmVhZFxuICAgKi9cbiAgcHJpdmF0ZSBtZXNzYWdlV2FzUmVhZCA9IChtc2c6IExzbkNyb3NzVGFiTWVzc2FnZSk6IGJvb2xlYW4gPT4gdGhpcy5tZXNzYWdlc1JlYWRTZXQuaGFzKHRoaXMuZ2V0TWVzc2FnZUlkKG1zZykpO1xuXG4gIHByaXZhdGUgZ2V0TWVzc2FnZUlkID0gKG1lc3NhZ2U6IExzbkNyb3NzVGFiTWVzc2FnZSk6IHN0cmluZyA9PiBtZXNzYWdlLnRhYklkICsgbWVzc2FnZS5jcmVhdGVkICsgbWVzc2FnZS5jb2RlO1xuXG4gIHByaXZhdGUgbWVzc2FnZVRvUGxhaW5PYmplY3QgPSAobXNnOiBMc25Dcm9zc1RhYk1lc3NhZ2UpOiBvYmplY3QgPT4gT2JqZWN0LmtleXMobXNnKVxuICAgIC5yZWR1Y2UoKG1pbmlmaWVkT2JqLCBrZXkpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gbXNnW2tleV07XG4gICAgICBpZiAoIShrZXkgPT09ICdhdHRycycgJiYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB7fSkpKSB7XG4gICAgICAgIG1pbmlmaWVkT2JqW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIG1pbmlmaWVkT2JqO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG1pbmlmaWVkT2JqO1xuICAgICAgfSAvLyB0c2xpbnQ6ZGlzYWJsZVxuICAgIH0sIHt9KTsgLy8gdHNsaW50OmVuYWJsZVxuXG4gIC8qKlxuICAgKiBBcHBlbmRzIGdpdmVuIG1lc3NhZ2UgdG8gY3Jvc3MgdGFiIGNvb2tpZSB2YWx1ZVxuICAgKi9cbiAgcHJpdmF0ZSB1cGRhdGVDb29raWUobXNnOiBvYmplY3QpIHtcbiAgICBjb25zdCBjb29raWVEYXRhOiBBcnJheTxMc25Dcm9zc1RhYk1lc3NhZ2U+ID0gdGhpcy5jb29raWU7XG4gICAgY29va2llRGF0YS5wdXNoKG1zZyk7XG4gICAgdGhpcy5jb29raWUgPSBjb29raWVEYXRhO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgY29va2llKCkge1xuICAgIHJldHVybiB0aGlzLmxzbkNvb2tpZVNlcnZpY2UuZ2V0KHRoaXMuY3Jvc3NUYWJDb25maWcuY3Jvc3NUYWJDb29raWVOYW1lKSB8fCBbXTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0IGNvb2tpZShjb29raWVEYXRhOiBBcnJheTxMc25Dcm9zc1RhYk1lc3NhZ2U+KSB7XG4gICAgdGhpcy5sc25Db29raWVTZXJ2aWNlLnNldCh0aGlzLmNyb3NzVGFiQ29va2llTmFtZSwgY29va2llRGF0YSwge1xuICAgICAgZG9tYWluOiB0aGlzLmNyb3NzVGFiQ29uZmlnLnJvb3REb21haW4sXG4gICAgICBwYXRoOiAnLydcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIG1lc3NhZ2VzIGZyb20gY3Jvc3MgdGFiIGNvb2tpZSB0aGF0IGFyZSBvbGRlciB0aGFuIHN1cHBsaWVkIGNvbmZpZy5tc2dUdGwgdGltZVxuICAgKi9cbiAgcHJpdmF0ZSBjbGVhbkNvb2tpZSgpIHtcbiAgICBjb25zdCBjdXJyZW50Q29va2llID0gdGhpcy5jb29raWU7XG4gICAgaWYgKGN1cnJlbnRDb29raWUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICBjb25zdCBjbGVhbmVkQ29va2llID0gY3VycmVudENvb2tpZS5maWx0ZXIodGhpcy5jbGVhbkNvb2tpZUZpbHRlcih0aW1lc3RhbXAsIHRoaXMuY3Jvc3NUYWJDb25maWcubXNnVHRsKSk7XG4gICAgLy8gcHJldmlvdXMgaW1wbGVtZW50YXRpb24sIGNvb2tpZSBtaWdodCBoYXZlIGJlZW4gbW9kaWZpZWQgaW4gdGhlIG90aGVyIHRhYj9cbiAgICBpZiAoIXRoaXMuYXJlQ29va2llc0VxdWFsKGN1cnJlbnRDb29raWUsIHRoaXMuY29va2llKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuY29va2llID0gY2xlYW5lZENvb2tpZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBpbnZva2VkIGFmdGVyIGV2ZXJ5IGNvb2tpZSByZWFkIGludGVydmFsXG4gICAqL1xuICBwcml2YXRlIHJlYWRNZXNzYWdlcygpIHtcbiAgICBpZiAodGhpcy5jb29raWUpIHtcbiAgICAgIHRoaXMuY29va2llLmZvckVhY2goKG1zZ0RhdGE6IExzbkNyb3NzVGFiTWVzc2FnZSkgPT4ge1xuICAgICAgICBpZiAobXNnRGF0YS5jcmVhdGVkID4gdGhpcy50YWJPcGVuVGltZSkge1xuICAgICAgICBjb25zdCBtc2dDb3B5ID0gey4uLm1zZ0RhdGF9O1xuICAgICAgICBpZiAoIXRoaXMubWVzc2FnZVdhc1JlYWQobXNnQ29weSkpIHtcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VzUmVhZFNldC5hZGQodGhpcy5nZXRNZXNzYWdlSWQobXNnQ29weSkpO1xuICAgICAgICAgIHRoaXMubWVzc2FnZVN1YmplY3QubmV4dChtc2dDb3B5KTtcbiAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBnZXRDb29raWUgPSAoKSA9PiB0aGlzLmNvb2tpZTtcblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgc3Vic2NyaXB0aW9ucyB0aGF0IHRoaXMgc2VydmljZSBpcyBzdWJzY3JpYmUgdG8gKGludGVydmFscyBhcmUgY2xlYXJlZClcbiAgICovXG4gIHVuc3Vic2NyaWJlKCkge1xuICAgIHRoaXMuY29va2llUmVhZFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuY29va2llQ2xlYW5TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTb3J0cyB0d28gY29va2llIGFycmF5cyBhbmQgY29tcGFyZXMgZWFjaCBlbGVtZW50XG4gICAqL1xuICBwcml2YXRlIGFyZUNvb2tpZXNFcXVhbChmaXJzdENvb2tpZTogQXJyYXk8THNuQ3Jvc3NUYWJNZXNzYWdlPiwgc2Vjb25kQ29va2llOiBBcnJheTxMc25Dcm9zc1RhYk1lc3NhZ2U+KSB7XG4gICAgaWYgKGZpcnN0Q29va2llLmxlbmd0aCAhPT0gc2Vjb25kQ29va2llLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoZmlyc3RDb29raWUubGVuZ3RoID09PSAwICYmIHNlY29uZENvb2tpZS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBmaXJzdENvb2tpZS5zb3J0KHRoaXMubWVzc2FnZUNvbXBhcmVyKTtcbiAgICBzZWNvbmRDb29raWUuc29ydCh0aGlzLm1lc3NhZ2VDb21wYXJlcik7XG4gICAgbGV0IGluZGV4ID0gMDtcbiAgICBsZXQgYXJlQ29va2llc0VxdWFsID0gdHJ1ZTtcbiAgICBmb3IgKGNvbnN0IG1lc3NhZ2Ugb2YgZmlyc3RDb29raWUpIHtcbiAgICAgIGlmIChMc25Dcm9zc1RhYk1lc3NhZ2UuY29tcGFyZShtZXNzYWdlLCBzZWNvbmRDb29raWVbaW5kZXhdKSkge1xuICAgICAgICBhcmVDb29raWVzRXF1YWwgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICsraW5kZXg7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcmVDb29raWVzRXF1YWw7XG4gIH1cblxuICAvKipcbiAgICogQ29tcGFyZXMgdHdvIG1lc3NhZ2VzIGJ5IHByb3BlcnRpZXMgaW4gb3JkZXI6ICdjcmVhdGVkJywgJ2NvZGUnLCAndGFiSWQnO1xuICAgKi9cbiAgcHJpdmF0ZSBtZXNzYWdlQ29tcGFyZXIoZmlyc3RDb29raWVWYWx1ZTogTHNuQ3Jvc3NUYWJNZXNzYWdlLCBzZWNvbmRDb29raWVWYWx1ZTogTHNuQ3Jvc3NUYWJNZXNzYWdlKSB7XG4gICAgbGV0IHJlc3VsdCA9IGZpcnN0Q29va2llVmFsdWUuY3JlYXRlZCA8IHNlY29uZENvb2tpZVZhbHVlLmNyZWF0ZWQgPyAtMSA6IHNlY29uZENvb2tpZVZhbHVlLmNyZWF0ZWQgPCBmaXJzdENvb2tpZVZhbHVlLmNyZWF0ZWQgPyAxIDogMDtcbiAgICBpZiAocmVzdWx0ID09PSAwKSB7XG4gICAgICByZXN1bHQgPSBmaXJzdENvb2tpZVZhbHVlLmNvZGUgPCBzZWNvbmRDb29raWVWYWx1ZS5jb2RlID8gLTEgOiBzZWNvbmRDb29raWVWYWx1ZS5jb2RlIDwgZmlyc3RDb29raWVWYWx1ZS5jb2RlID8gMSA6IDA7XG4gICAgICBpZiAocmVzdWx0ID09PSAwKSB7XG4gICAgICAgIHJlc3VsdCA9IGZpcnN0Q29va2llVmFsdWUudGFiSWQgPCBzZWNvbmRDb29raWVWYWx1ZS50YWJJZCA/IC0xIDogc2Vjb25kQ29va2llVmFsdWUudGFiSWQgPCBmaXJzdENvb2tpZVZhbHVlLnRhYklkID8gMSA6IDA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogRnVuY3Rpb24gZGV0ZXJtaW5lcyB3aGV0aGVyIGdpdmVuIG1lc3NhZ2UgaXMgdG8gYmUgcmVtb3ZlZCBmcm9tIHRoZSBjcm9zcyB0YWIgY29va2llXG4gICAqL1xuICBwcml2YXRlIGNsZWFuQ29va2llRmlsdGVyKHRpbWVzdGFtcDogbnVtYmVyLCBtc2dUdGw6IG51bWJlcikge1xuICAgIHJldHVybiAoY29va2llTWVzc2FnZTogTHNuQ3Jvc3NUYWJNZXNzYWdlKSA9PiB0aW1lc3RhbXAgLSBjb29raWVNZXNzYWdlLmNyZWF0ZWQgPD0gbXNnVHRsO1xuICB9XG5cbn1cbiJdfQ==