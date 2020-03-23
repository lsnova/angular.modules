/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Inject, Injectable, Optional } from '@angular/core';
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
        if (crossTabConfig === void 0) { crossTabConfig = new LsnCrossTabConfig(); }
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
        this.messageSubject = new Subject();
        this.tabId = Math.random() + '';
        this.messagesReadSet = new Set();
        this.tabOpenTime = Date.now();
    }
    Object.defineProperty(LsnCrossTabService.prototype, "crossTabCookieName", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this.crossTabConfig.crossTabCookieName;
        },
        enumerable: true,
        configurable: true
    });
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
     * Manually set cross tab config, for example when config must be provided asynchronously and not with InjectionToken
     */
    /**
     * Manually set cross tab config, for example when config must be provided asynchronously and not with InjectionToken
     * @param {?} config
     * @return {?}
     */
    LsnCrossTabService.prototype.setCrossTabConfig = /**
     * Manually set cross tab config, for example when config must be provided asynchronously and not with InjectionToken
     * @param {?} config
     * @return {?}
     */
    function (config) {
        this.crossTabConfig = config;
    };
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
        { type: LsnCrossTabConfig, decorators: [{ type: Optional }, { type: Inject, args: [LSN_CROSS_TAB_CONFIG,] }] }
    ]; };
    /** @nocollapse */ LsnCrossTabService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function LsnCrossTabService_Factory() { return new LsnCrossTabService(i0.ɵɵinject(i1.LsnCookieService), i0.ɵɵinject(i2.LSN_CROSS_TAB_CONFIG, 8)); }, token: LsnCrossTabService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNuLWNyb3NzLXRhYi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9sc24tY3Jvc3MtdGFiL2xzbi1jcm9zcy10YWIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFhLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN0RSxPQUFPLEVBQUMsUUFBUSxFQUFjLE9BQU8sRUFBZSxNQUFNLE1BQU0sQ0FBQztBQUNqRSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUMvRCxPQUFPLEVBQUMsb0JBQW9CLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUNuRixPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQzs7OztBQUVsRTtJQWVFLDRCQUFvQixnQkFBa0MsRUFDUSxjQUEyRDtRQUR6SCxpQkFNQztRQUw2RCwrQkFBQSxFQUFBLHFCQUF3QyxpQkFBaUIsRUFBRTtRQURyRyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ1EsbUJBQWMsR0FBZCxjQUFjLENBQTZDOzs7O1FBMkRqSCxtQkFBYyxHQUFHLFVBQUMsR0FBdUIsSUFBYyxPQUFBLEtBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBaEQsQ0FBZ0QsQ0FBQztRQUV4RyxpQkFBWSxHQUFHLFVBQUMsT0FBMkIsSUFBYSxPQUFBLE9BQU8sQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxFQUE5QyxDQUE4QyxDQUFDO1FBRXZHLHlCQUFvQixHQUFHLFVBQUMsR0FBdUIsSUFBYSxPQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2FBQ2pGLE1B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bkRlc3Ryb3ksIE9wdGlvbmFsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7aW50ZXJ2YWwsIE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0xzbkNyb3NzVGFiTWVzc2FnZX0gZnJvbSAnLi9tb2RlbHMvbHNuQ3Jvc3NUYWJNZXNzYWdlJztcbmltcG9ydCB7TFNOX0NST1NTX1RBQl9DT05GSUcsIExzbkNyb3NzVGFiQ29uZmlnfSBmcm9tICcuL21vZGVscy9sc25Dcm9zc1RhYkNvbmZpZyc7XG5pbXBvcnQge0xzbkNvb2tpZVNlcnZpY2V9IGZyb20gJy4uL2xzbi1jb29raWUvbHNuLWNvb2tpZS5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTHNuQ3Jvc3NUYWJTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSByZWFkb25seSBtZXNzYWdlU3ViamVjdDogU3ViamVjdDxMc25Dcm9zc1RhYk1lc3NhZ2U+O1xuICByZWFkb25seSB0YWJJZDogc3RyaW5nO1xuICBwcml2YXRlIHJlYWRvbmx5IG1lc3NhZ2VzUmVhZFNldDogU2V0PHN0cmluZz47XG4gIHByaXZhdGUgcmVhZG9ubHkgdGFiT3BlblRpbWU6IG51bWJlcjtcbiAgcHJpdmF0ZSBjb29raWVSZWFkU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgY29va2llQ2xlYW5TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBwcml2YXRlIGdldCBjcm9zc1RhYkNvb2tpZU5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jcm9zc1RhYkNvbmZpZy5jcm9zc1RhYkNvb2tpZU5hbWU7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxzbkNvb2tpZVNlcnZpY2U6IExzbkNvb2tpZVNlcnZpY2UsXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTFNOX0NST1NTX1RBQl9DT05GSUcpIHByaXZhdGUgY3Jvc3NUYWJDb25maWc6IExzbkNyb3NzVGFiQ29uZmlnID0gbmV3IExzbkNyb3NzVGFiQ29uZmlnKCkpIHtcbiAgICB0aGlzLm1lc3NhZ2VTdWJqZWN0ID0gbmV3IFN1YmplY3Q8THNuQ3Jvc3NUYWJNZXNzYWdlPigpO1xuICAgIHRoaXMudGFiSWQgPSBNYXRoLnJhbmRvbSgpICsgJyc7XG4gICAgdGhpcy5tZXNzYWdlc1JlYWRTZXQgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgICB0aGlzLnRhYk9wZW5UaW1lID0gRGF0ZS5ub3coKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGZ1bmN0aW9uIHNldHMgdXAgc3Vic2NyaXB0aW9ucyBmb3IgcmVhZGluZyBhbmQgY2xlYW5pbmcgY3Jvc3MgdGFiIGNvb2tpZVxuICAgKi9cbiAgcnVuKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5jb29raWVSZWFkU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmNvb2tpZVJlYWRTdWJzY3JpcHRpb24gPSBpbnRlcnZhbCh0aGlzLmNyb3NzVGFiQ29uZmlnLmNvb2tpZVJlYWRGcmVxKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMucmVhZE1lc3NhZ2VzKCkpO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuY29va2llQ2xlYW5TdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuY29va2llQ2xlYW5TdWJzY3JpcHRpb24gPSBpbnRlcnZhbCh0aGlzLmNyb3NzVGFiQ29uZmlnLmNvb2tpZUNsZWFuRnJlcSlcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNsZWFuQ29va2llKCkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIE9ic2VydmFibGUgZW1pdHMgbWVzc2FnZXMgdGhhdCB3ZXJlIHNlbnQgYnkgb3RoZXIgdGFic1xuICAgKi9cbiAgZ2V0IG1lc3NhZ2VzJCgpOiBPYnNlcnZhYmxlPExzbkNyb3NzVGFiTWVzc2FnZT4ge1xuICAgIHJldHVybiB0aGlzLm1lc3NhZ2VTdWJqZWN0O1xuICB9XG5cbiAgLyoqXG4gICAqIE1hbnVhbGx5IHNldCBjcm9zcyB0YWIgY29uZmlnLCBmb3IgZXhhbXBsZSB3aGVuIGNvbmZpZyBtdXN0IGJlIHByb3ZpZGVkIGFzeW5jaHJvbm91c2x5IGFuZCBub3Qgd2l0aCBJbmplY3Rpb25Ub2tlblxuICAgKi9cbiAgc2V0Q3Jvc3NUYWJDb25maWcoY29uZmlnOiBMc25Dcm9zc1RhYkNvbmZpZykge1xuICAgIHRoaXMuY3Jvc3NUYWJDb25maWcgPSBjb25maWc7XG4gIH1cblxuICAvKipcbiAgICogU2VuZHMgbWVzc2FnZSB0byBvdGhlciB0YWJzIGJ5IGFkZGluZyB0aGlzIG1lc3NhZ2UgdG8gY3Jvc3MgdGFiIGNvb2tpZVxuICAgKi9cbiAgc2VuZE1lc3NhZ2UoZGF0YTogKHN0cmluZyB8IExzbkNyb3NzVGFiTWVzc2FnZSB8IG9iamVjdCkpIHtcbiAgICBsZXQgbWVzc2FnZTtcbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICBtZXNzYWdlID0gbmV3IExzbkNyb3NzVGFiTWVzc2FnZSh7Y29kZTogZGF0YX0pO1xuICAgIH0gZWxzZSBpZiAoZGF0YSBpbnN0YW5jZW9mIExzbkNyb3NzVGFiTWVzc2FnZSkge1xuICAgICAgbWVzc2FnZSA9IGRhdGE7XG4gICAgfSBlbHNlIGlmICghIWRhdGEgJiYgdHlwZW9mIGRhdGEgPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICBtZXNzYWdlID0gbmV3IExzbkNyb3NzVGFiTWVzc2FnZSh7Li4uZGF0YX0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIHByZXZpb3VzIGltcGxlbWVudGF0aW9uLCBtZXNzYWdlLmNyZWF0ZWQgaXMgYWx3YXlzIG92ZXJyaWRkZW5cbiAgICBtZXNzYWdlLmNyZWF0ZWQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICBtZXNzYWdlLnRhYklkID0gdGhpcy50YWJJZDtcbiAgICB0aGlzLm1lc3NhZ2VzUmVhZFNldC5hZGQodGhpcy5nZXRNZXNzYWdlSWQobWVzc2FnZSkpO1xuICAgIHRoaXMudXBkYXRlQ29va2llKHRoaXMubWVzc2FnZVRvUGxhaW5PYmplY3QobWVzc2FnZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBtZXNzYWdlIHdpdGggZ2l2ZW4gaWQgd2FzIGFscmVhZHkgcmVhZFxuICAgKi9cbiAgcHJpdmF0ZSBtZXNzYWdlV2FzUmVhZCA9IChtc2c6IExzbkNyb3NzVGFiTWVzc2FnZSk6IGJvb2xlYW4gPT4gdGhpcy5tZXNzYWdlc1JlYWRTZXQuaGFzKHRoaXMuZ2V0TWVzc2FnZUlkKG1zZykpO1xuXG4gIHByaXZhdGUgZ2V0TWVzc2FnZUlkID0gKG1lc3NhZ2U6IExzbkNyb3NzVGFiTWVzc2FnZSk6IHN0cmluZyA9PiBtZXNzYWdlLnRhYklkICsgbWVzc2FnZS5jcmVhdGVkICsgbWVzc2FnZS5jb2RlO1xuXG4gIHByaXZhdGUgbWVzc2FnZVRvUGxhaW5PYmplY3QgPSAobXNnOiBMc25Dcm9zc1RhYk1lc3NhZ2UpOiBvYmplY3QgPT4gT2JqZWN0LmtleXMobXNnKVxuICAgIC5yZWR1Y2UoKG1pbmlmaWVkT2JqLCBrZXkpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gbXNnW2tleV07XG4gICAgICBpZiAoIShrZXkgPT09ICdhdHRycycgJiYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB7fSkpKSB7XG4gICAgICAgIG1pbmlmaWVkT2JqW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIG1pbmlmaWVkT2JqO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG1pbmlmaWVkT2JqO1xuICAgICAgfSAvLyB0c2xpbnQ6ZGlzYWJsZVxuICAgIH0sIHt9KTsgLy8gdHNsaW50OmVuYWJsZVxuXG4gIC8qKlxuICAgKiBBcHBlbmRzIGdpdmVuIG1lc3NhZ2UgdG8gY3Jvc3MgdGFiIGNvb2tpZSB2YWx1ZVxuICAgKi9cbiAgcHJpdmF0ZSB1cGRhdGVDb29raWUobXNnOiBvYmplY3QpIHtcbiAgICBjb25zdCBjb29raWVEYXRhOiBBcnJheTxMc25Dcm9zc1RhYk1lc3NhZ2U+ID0gdGhpcy5jb29raWU7XG4gICAgY29va2llRGF0YS5wdXNoKG1zZyk7XG4gICAgdGhpcy5jb29raWUgPSBjb29raWVEYXRhO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgY29va2llKCkge1xuICAgIHJldHVybiB0aGlzLmxzbkNvb2tpZVNlcnZpY2UuZ2V0KHRoaXMuY3Jvc3NUYWJDb25maWcuY3Jvc3NUYWJDb29raWVOYW1lKSB8fCBbXTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0IGNvb2tpZShjb29raWVEYXRhOiBBcnJheTxMc25Dcm9zc1RhYk1lc3NhZ2U+KSB7XG4gICAgdGhpcy5sc25Db29raWVTZXJ2aWNlLnNldCh0aGlzLmNyb3NzVGFiQ29va2llTmFtZSwgY29va2llRGF0YSwge1xuICAgICAgZG9tYWluOiB0aGlzLmNyb3NzVGFiQ29uZmlnLnJvb3REb21haW4sXG4gICAgICBwYXRoOiAnLydcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIG1lc3NhZ2VzIGZyb20gY3Jvc3MgdGFiIGNvb2tpZSB0aGF0IGFyZSBvbGRlciB0aGFuIHN1cHBsaWVkIGNvbmZpZy5tc2dUdGwgdGltZVxuICAgKi9cbiAgcHJpdmF0ZSBjbGVhbkNvb2tpZSgpIHtcbiAgICBjb25zdCBjdXJyZW50Q29va2llID0gdGhpcy5jb29raWU7XG4gICAgaWYgKGN1cnJlbnRDb29raWUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICBjb25zdCBjbGVhbmVkQ29va2llID0gY3VycmVudENvb2tpZS5maWx0ZXIodGhpcy5jbGVhbkNvb2tpZUZpbHRlcih0aW1lc3RhbXAsIHRoaXMuY3Jvc3NUYWJDb25maWcubXNnVHRsKSk7XG4gICAgLy8gcHJldmlvdXMgaW1wbGVtZW50YXRpb24sIGNvb2tpZSBtaWdodCBoYXZlIGJlZW4gbW9kaWZpZWQgaW4gdGhlIG90aGVyIHRhYj9cbiAgICBpZiAoIXRoaXMuYXJlQ29va2llc0VxdWFsKGN1cnJlbnRDb29raWUsIHRoaXMuY29va2llKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuY29va2llID0gY2xlYW5lZENvb2tpZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBpbnZva2VkIGFmdGVyIGV2ZXJ5IGNvb2tpZSByZWFkIGludGVydmFsXG4gICAqL1xuICBwcml2YXRlIHJlYWRNZXNzYWdlcygpIHtcbiAgICBpZiAodGhpcy5jb29raWUpIHtcbiAgICAgIHRoaXMuY29va2llLmZvckVhY2goKG1zZ0RhdGE6IExzbkNyb3NzVGFiTWVzc2FnZSkgPT4ge1xuICAgICAgICBpZiAobXNnRGF0YS5jcmVhdGVkID4gdGhpcy50YWJPcGVuVGltZSkge1xuICAgICAgICAgIGNvbnN0IG1zZ0NvcHkgPSB7Li4ubXNnRGF0YX07XG4gICAgICAgICAgaWYgKCF0aGlzLm1lc3NhZ2VXYXNSZWFkKG1zZ0NvcHkpKSB7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VzUmVhZFNldC5hZGQodGhpcy5nZXRNZXNzYWdlSWQobXNnQ29weSkpO1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlU3ViamVjdC5uZXh0KG1zZ0NvcHkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0Q29va2llID0gKCkgPT4gdGhpcy5jb29raWU7XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIHN1YnNjcmlwdGlvbnMgdGhhdCB0aGlzIHNlcnZpY2UgaXMgc3Vic2NyaWJlIHRvIChpbnRlcnZhbHMgYXJlIGNsZWFyZWQpXG4gICAqL1xuICB1bnN1YnNjcmliZSgpIHtcbiAgICB0aGlzLmNvb2tpZVJlYWRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLmNvb2tpZUNsZWFuU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKipcbiAgICogU29ydHMgdHdvIGNvb2tpZSBhcnJheXMgYW5kIGNvbXBhcmVzIGVhY2ggZWxlbWVudFxuICAgKi9cbiAgcHJpdmF0ZSBhcmVDb29raWVzRXF1YWwoZmlyc3RDb29raWU6IEFycmF5PExzbkNyb3NzVGFiTWVzc2FnZT4sIHNlY29uZENvb2tpZTogQXJyYXk8THNuQ3Jvc3NUYWJNZXNzYWdlPikge1xuICAgIGlmIChmaXJzdENvb2tpZS5sZW5ndGggIT09IHNlY29uZENvb2tpZS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKGZpcnN0Q29va2llLmxlbmd0aCA9PT0gMCAmJiBzZWNvbmRDb29raWUubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZmlyc3RDb29raWUuc29ydCh0aGlzLm1lc3NhZ2VDb21wYXJlcik7XG4gICAgc2Vjb25kQ29va2llLnNvcnQodGhpcy5tZXNzYWdlQ29tcGFyZXIpO1xuICAgIGxldCBpbmRleCA9IDA7XG4gICAgbGV0IGFyZUNvb2tpZXNFcXVhbCA9IHRydWU7XG4gICAgZm9yIChjb25zdCBtZXNzYWdlIG9mIGZpcnN0Q29va2llKSB7XG4gICAgICBpZiAoTHNuQ3Jvc3NUYWJNZXNzYWdlLmNvbXBhcmUobWVzc2FnZSwgc2Vjb25kQ29va2llW2luZGV4XSkpIHtcbiAgICAgICAgYXJlQ29va2llc0VxdWFsID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICArK2luZGV4O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJlQ29va2llc0VxdWFsO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXBhcmVzIHR3byBtZXNzYWdlcyBieSBwcm9wZXJ0aWVzIGluIG9yZGVyOiAnY3JlYXRlZCcsICdjb2RlJywgJ3RhYklkJztcbiAgICovXG4gIHByaXZhdGUgbWVzc2FnZUNvbXBhcmVyKGZpcnN0Q29va2llVmFsdWU6IExzbkNyb3NzVGFiTWVzc2FnZSwgc2Vjb25kQ29va2llVmFsdWU6IExzbkNyb3NzVGFiTWVzc2FnZSkge1xuICAgIGxldCByZXN1bHQgPSBmaXJzdENvb2tpZVZhbHVlLmNyZWF0ZWQgPCBzZWNvbmRDb29raWVWYWx1ZS5jcmVhdGVkID8gLTEgOiBzZWNvbmRDb29raWVWYWx1ZS5jcmVhdGVkIDwgZmlyc3RDb29raWVWYWx1ZS5jcmVhdGVkID8gMSA6IDA7XG4gICAgaWYgKHJlc3VsdCA9PT0gMCkge1xuICAgICAgcmVzdWx0ID0gZmlyc3RDb29raWVWYWx1ZS5jb2RlIDwgc2Vjb25kQ29va2llVmFsdWUuY29kZSA/IC0xIDogc2Vjb25kQ29va2llVmFsdWUuY29kZSA8IGZpcnN0Q29va2llVmFsdWUuY29kZSA/IDEgOiAwO1xuICAgICAgaWYgKHJlc3VsdCA9PT0gMCkge1xuICAgICAgICByZXN1bHQgPSBmaXJzdENvb2tpZVZhbHVlLnRhYklkIDwgc2Vjb25kQ29va2llVmFsdWUudGFiSWQgPyAtMSA6IHNlY29uZENvb2tpZVZhbHVlLnRhYklkIDwgZmlyc3RDb29raWVWYWx1ZS50YWJJZCA/IDEgOiAwO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIGRldGVybWluZXMgd2hldGhlciBnaXZlbiBtZXNzYWdlIGlzIHRvIGJlIHJlbW92ZWQgZnJvbSB0aGUgY3Jvc3MgdGFiIGNvb2tpZVxuICAgKi9cbiAgcHJpdmF0ZSBjbGVhbkNvb2tpZUZpbHRlcih0aW1lc3RhbXA6IG51bWJlciwgbXNnVHRsOiBudW1iZXIpIHtcbiAgICByZXR1cm4gKGNvb2tpZU1lc3NhZ2U6IExzbkNyb3NzVGFiTWVzc2FnZSkgPT4gdGltZXN0YW1wIC0gY29va2llTWVzc2FnZS5jcmVhdGVkIDw9IG1zZ1R0bDtcbiAgfVxuXG59XG4iXX0=