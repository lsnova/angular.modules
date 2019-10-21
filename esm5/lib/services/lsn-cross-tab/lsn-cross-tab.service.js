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
            if (key !== 'attrs' && value !== null && value !== {}) {
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
                /** @type {?} */
                var msgCopy = tslib_1.__assign({}, msgData);
                if (!_this.messageWasRead(msgCopy)) {
                    _this.messagesReadSet.add(_this.getMessageId(msgCopy));
                    _this.messageSubject.next(msgCopy);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNuLWNyb3NzLXRhYi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9sc24tY3Jvc3MtdGFiL2xzbi1jcm9zcy10YWIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFZLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBQyxRQUFRLEVBQWMsT0FBTyxFQUFlLE1BQU0sTUFBTSxDQUFDO0FBQ2pFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQy9ELE9BQU8sRUFBQyxvQkFBb0IsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ25GLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGtDQUFrQyxDQUFDOzs7O0FBRWxFO0lBWUUsNEJBQW9CLGdCQUFrQyxFQUF3QyxjQUFpQztRQUEvSCxpQkFNQztRQU5tQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQXdDLG1CQUFjLEdBQWQsY0FBYyxDQUFtQjs7OztRQXFEdkgsbUJBQWMsR0FBRyxVQUFDLEdBQXVCLElBQWMsT0FBQSxLQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQWhELENBQWdELENBQUM7UUFFeEcsaUJBQVksR0FBRyxVQUFDLE9BQTJCLElBQWEsT0FBQSxPQUFPLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksRUFBOUMsQ0FBOEMsQ0FBQztRQUV2Ryx5QkFBb0IsR0FBRyxVQUFDLEdBQXVCLElBQWEsT0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzthQUNqRixNQUFNLENBQUMsVUFBQyxXQUFXLEVBQUUsR0FBRzs7Z0JBQ2pCLEtBQUssR0FB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LENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDM0g7U0FDRjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7T0FFRzs7Ozs7Ozs7SUFDSyw4Q0FBaUI7Ozs7Ozs7SUFBekIsVUFBMEIsU0FBaUIsRUFBRSxNQUFjO1FBQ3pELE9BQU8sVUFBQyxhQUFpQyxJQUFLLE9BQUEsU0FBUyxHQUFHLGFBQWEsQ0FBQyxPQUFPLElBQUksTUFBTSxFQUEzQyxDQUEyQyxDQUFDO0lBQzVGLENBQUM7O2dCQTlMRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQUpPLGdCQUFnQjtnQkFETSxpQkFBaUIsdUJBZVksTUFBTSxTQUFDLG9CQUFvQjs7OzZCQWxCdEY7Q0FzTUMsQUFoTUQsSUFnTUM7U0E3TFksa0JBQWtCOzs7Ozs7SUFDN0IsNENBQTZEOztJQUM3RCxtQ0FBdUI7Ozs7O0lBQ3ZCLDZDQUE4Qzs7Ozs7SUFDOUMsZ0RBQTRDOzs7OztJQUM1Qyx5Q0FBcUM7Ozs7O0lBQ3JDLG9EQUE2Qzs7Ozs7SUFDN0MscURBQThDOzs7Ozs7SUF1RDlDLDRDQUFnSDs7Ozs7SUFFaEgsMENBQStHOzs7OztJQUUvRyxrREFTUzs7SUF3RFQsdUNBQThCOzs7OztJQTFIbEIsOENBQTBDOzs7OztJQUFFLDRDQUF1RSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlLCBPbkRlc3Ryb3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtpbnRlcnZhbCwgT2JzZXJ2YWJsZSwgU3ViamVjdCwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7THNuQ3Jvc3NUYWJNZXNzYWdlfSBmcm9tICcuL21vZGVscy9sc25Dcm9zc1RhYk1lc3NhZ2UnO1xuaW1wb3J0IHtMU05fQ1JPU1NfVEFCX0NPTkZJRywgTHNuQ3Jvc3NUYWJDb25maWd9IGZyb20gJy4vbW9kZWxzL2xzbkNyb3NzVGFiQ29uZmlnJztcbmltcG9ydCB7THNuQ29va2llU2VydmljZX0gZnJvbSAnLi4vbHNuLWNvb2tpZS9sc24tY29va2llLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBMc25Dcm9zc1RhYlNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHJlYWRvbmx5IG1lc3NhZ2VTdWJqZWN0OiBTdWJqZWN0PExzbkNyb3NzVGFiTWVzc2FnZT47XG4gIHJlYWRvbmx5IHRhYklkOiBzdHJpbmc7XG4gIHByaXZhdGUgcmVhZG9ubHkgbWVzc2FnZXNSZWFkU2V0OiBTZXQ8c3RyaW5nPjtcbiAgcHJpdmF0ZSByZWFkb25seSBjcm9zc1RhYkNvb2tpZU5hbWU6IHN0cmluZztcbiAgcHJpdmF0ZSByZWFkb25seSB0YWJPcGVuVGltZTogbnVtYmVyO1xuICBwcml2YXRlIGNvb2tpZVJlYWRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBjb29raWVDbGVhblN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbHNuQ29va2llU2VydmljZTogTHNuQ29va2llU2VydmljZSwgQEluamVjdChMU05fQ1JPU1NfVEFCX0NPTkZJRykgcHJpdmF0ZSBjcm9zc1RhYkNvbmZpZzogTHNuQ3Jvc3NUYWJDb25maWcpIHtcbiAgICB0aGlzLmNyb3NzVGFiQ29va2llTmFtZSA9IGNyb3NzVGFiQ29uZmlnLmNyb3NzVGFiQ29va2llTmFtZTtcbiAgICB0aGlzLm1lc3NhZ2VTdWJqZWN0ID0gbmV3IFN1YmplY3Q8THNuQ3Jvc3NUYWJNZXNzYWdlPigpO1xuICAgIHRoaXMudGFiSWQgPSBNYXRoLnJhbmRvbSgpICsgJyc7XG4gICAgdGhpcy5tZXNzYWdlc1JlYWRTZXQgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgICB0aGlzLnRhYk9wZW5UaW1lID0gRGF0ZS5ub3coKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGZ1bmN0aW9uIHNldHMgdXAgc3Vic2NyaXB0aW9ucyBmb3IgcmVhZGluZyBhbmQgY2xlYW5pbmcgY3Jvc3MgdGFiIGNvb2tpZVxuICAgKi9cbiAgcnVuKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5jb29raWVSZWFkU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmNvb2tpZVJlYWRTdWJzY3JpcHRpb24gPSBpbnRlcnZhbCh0aGlzLmNyb3NzVGFiQ29uZmlnLmNvb2tpZVJlYWRGcmVxKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMucmVhZE1lc3NhZ2VzKCkpO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuY29va2llQ2xlYW5TdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuY29va2llQ2xlYW5TdWJzY3JpcHRpb24gPSBpbnRlcnZhbCh0aGlzLmNyb3NzVGFiQ29uZmlnLmNvb2tpZUNsZWFuRnJlcSlcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNsZWFuQ29va2llKCkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIE9ic2VydmFibGUgZW1pdHMgbWVzc2FnZXMgdGhhdCB3ZXJlIHNlbnQgYnkgb3RoZXIgdGFic1xuICAgKi9cbiAgZ2V0IG1lc3NhZ2VzJCgpOiBPYnNlcnZhYmxlPExzbkNyb3NzVGFiTWVzc2FnZT4ge1xuICAgIHJldHVybiB0aGlzLm1lc3NhZ2VTdWJqZWN0O1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbmRzIG1lc3NhZ2UgdG8gb3RoZXIgdGFicyBieSBhZGRpbmcgdGhpcyBtZXNzYWdlIHRvIGNyb3NzIHRhYiBjb29raWVcbiAgICovXG4gIHNlbmRNZXNzYWdlKGRhdGE6IChzdHJpbmcgfCBMc25Dcm9zc1RhYk1lc3NhZ2UgfCBvYmplY3QpKSB7XG4gICAgbGV0IG1lc3NhZ2U7XG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgbWVzc2FnZSA9IG5ldyBMc25Dcm9zc1RhYk1lc3NhZ2Uoe2NvZGU6IGRhdGF9KTtcbiAgICB9IGVsc2UgaWYgKGRhdGEgaW5zdGFuY2VvZiBMc25Dcm9zc1RhYk1lc3NhZ2UpIHtcbiAgICAgIG1lc3NhZ2UgPSBkYXRhO1xuICAgIH0gZWxzZSBpZiAoISFkYXRhICYmIHR5cGVvZiBkYXRhID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgICAgbWVzc2FnZSA9IG5ldyBMc25Dcm9zc1RhYk1lc3NhZ2Uoey4uLmRhdGF9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBwcmV2aW91cyBpbXBsZW1lbnRhdGlvbiwgbWVzc2FnZS5jcmVhdGVkIGlzIGFsd2F5cyBvdmVycmlkZGVuXG4gICAgbWVzc2FnZS5jcmVhdGVkID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgbWVzc2FnZS50YWJJZCA9IHRoaXMudGFiSWQ7XG4gICAgdGhpcy5tZXNzYWdlc1JlYWRTZXQuYWRkKHRoaXMuZ2V0TWVzc2FnZUlkKG1lc3NhZ2UpKTtcbiAgICB0aGlzLnVwZGF0ZUNvb2tpZSh0aGlzLm1lc3NhZ2VUb1BsYWluT2JqZWN0KG1lc3NhZ2UpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgbWVzc2FnZSB3aXRoIGdpdmVuIGlkIHdhcyBhbHJlYWR5IHJlYWRcbiAgICovXG4gIHByaXZhdGUgbWVzc2FnZVdhc1JlYWQgPSAobXNnOiBMc25Dcm9zc1RhYk1lc3NhZ2UpOiBib29sZWFuID0+IHRoaXMubWVzc2FnZXNSZWFkU2V0Lmhhcyh0aGlzLmdldE1lc3NhZ2VJZChtc2cpKTtcblxuICBwcml2YXRlIGdldE1lc3NhZ2VJZCA9IChtZXNzYWdlOiBMc25Dcm9zc1RhYk1lc3NhZ2UpOiBzdHJpbmcgPT4gbWVzc2FnZS50YWJJZCArIG1lc3NhZ2UuY3JlYXRlZCArIG1lc3NhZ2UuY29kZTtcblxuICBwcml2YXRlIG1lc3NhZ2VUb1BsYWluT2JqZWN0ID0gKG1zZzogTHNuQ3Jvc3NUYWJNZXNzYWdlKTogb2JqZWN0ID0+IE9iamVjdC5rZXlzKG1zZylcbiAgICAucmVkdWNlKChtaW5pZmllZE9iaiwga2V5KSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IG1zZ1trZXldO1xuICAgICAgaWYgKGtleSAhPT0gJ2F0dHJzJyAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0ge30pIHtcbiAgICAgICAgbWluaWZpZWRPYmpba2V5XSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gbWluaWZpZWRPYmo7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbWluaWZpZWRPYmo7XG4gICAgICB9IC8vIHRzbGludDpkaXNhYmxlXG4gICAgfSwge30pOyAvLyB0c2xpbnQ6ZW5hYmxlXG5cbiAgLyoqXG4gICAqIEFwcGVuZHMgZ2l2ZW4gbWVzc2FnZSB0byBjcm9zcyB0YWIgY29va2llIHZhbHVlXG4gICAqL1xuICBwcml2YXRlIHVwZGF0ZUNvb2tpZShtc2c6IG9iamVjdCkge1xuICAgIGNvbnN0IGNvb2tpZURhdGE6IEFycmF5PExzbkNyb3NzVGFiTWVzc2FnZT4gPSB0aGlzLmNvb2tpZTtcbiAgICBjb29raWVEYXRhLnB1c2gobXNnKTtcbiAgICB0aGlzLmNvb2tpZSA9IGNvb2tpZURhdGE7XG4gIH1cblxuICBwcml2YXRlIGdldCBjb29raWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubHNuQ29va2llU2VydmljZS5nZXQodGhpcy5jcm9zc1RhYkNvbmZpZy5jcm9zc1RhYkNvb2tpZU5hbWUpIHx8IFtdO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXQgY29va2llKGNvb2tpZURhdGE6IEFycmF5PExzbkNyb3NzVGFiTWVzc2FnZT4pIHtcbiAgICB0aGlzLmxzbkNvb2tpZVNlcnZpY2Uuc2V0KHRoaXMuY3Jvc3NUYWJDb29raWVOYW1lLCBjb29raWVEYXRhLCB7XG4gICAgICBkb21haW46IHRoaXMuY3Jvc3NUYWJDb25maWcucm9vdERvbWFpbixcbiAgICAgIHBhdGg6ICcvJ1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgbWVzc2FnZXMgZnJvbSBjcm9zcyB0YWIgY29va2llIHRoYXQgYXJlIG9sZGVyIHRoYW4gc3VwcGxpZWQgY29uZmlnLm1zZ1R0bCB0aW1lXG4gICAqL1xuICBwcml2YXRlIGNsZWFuQ29va2llKCkge1xuICAgIGNvbnN0IGN1cnJlbnRDb29raWUgPSB0aGlzLmNvb2tpZTtcbiAgICBpZiAoY3VycmVudENvb2tpZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHRpbWVzdGFtcCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIGNvbnN0IGNsZWFuZWRDb29raWUgPSBjdXJyZW50Q29va2llLmZpbHRlcih0aGlzLmNsZWFuQ29va2llRmlsdGVyKHRpbWVzdGFtcCwgdGhpcy5jcm9zc1RhYkNvbmZpZy5tc2dUdGwpKTtcbiAgICAvLyBwcmV2aW91cyBpbXBsZW1lbnRhdGlvbiwgY29va2llIG1pZ2h0IGhhdmUgYmVlbiBtb2RpZmllZCBpbiB0aGUgb3RoZXIgdGFiP1xuICAgIGlmICghdGhpcy5hcmVDb29raWVzRXF1YWwoY3VycmVudENvb2tpZSwgdGhpcy5jb29raWUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5jb29raWUgPSBjbGVhbmVkQ29va2llO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGludm9rZWQgYWZ0ZXIgZXZlcnkgY29va2llIHJlYWQgaW50ZXJ2YWxcbiAgICovXG4gIHByaXZhdGUgcmVhZE1lc3NhZ2VzKCkge1xuICAgIGlmICh0aGlzLmNvb2tpZSkge1xuICAgICAgdGhpcy5jb29raWUuZm9yRWFjaCgobXNnRGF0YTogTHNuQ3Jvc3NUYWJNZXNzYWdlKSA9PiB7XG4gICAgICAgIGNvbnN0IG1zZ0NvcHkgPSB7Li4ubXNnRGF0YX07XG4gICAgICAgIGlmICghdGhpcy5tZXNzYWdlV2FzUmVhZChtc2dDb3B5KSkge1xuICAgICAgICAgIHRoaXMubWVzc2FnZXNSZWFkU2V0LmFkZCh0aGlzLmdldE1lc3NhZ2VJZChtc2dDb3B5KSk7XG4gICAgICAgICAgdGhpcy5tZXNzYWdlU3ViamVjdC5uZXh0KG1zZ0NvcHkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBnZXRDb29raWUgPSAoKSA9PiB0aGlzLmNvb2tpZTtcblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgc3Vic2NyaXB0aW9ucyB0aGF0IHRoaXMgc2VydmljZSBpcyBzdWJzY3JpYmUgdG8gKGludGVydmFscyBhcmUgY2xlYXJlZClcbiAgICovXG4gIHVuc3Vic2NyaWJlKCkge1xuICAgIHRoaXMuY29va2llUmVhZFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuY29va2llQ2xlYW5TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTb3J0cyB0d28gY29va2llIGFycmF5cyBhbmQgY29tcGFyZXMgZWFjaCBlbGVtZW50XG4gICAqL1xuICBwcml2YXRlIGFyZUNvb2tpZXNFcXVhbChmaXJzdENvb2tpZTogQXJyYXk8THNuQ3Jvc3NUYWJNZXNzYWdlPiwgc2Vjb25kQ29va2llOiBBcnJheTxMc25Dcm9zc1RhYk1lc3NhZ2U+KSB7XG4gICAgaWYgKGZpcnN0Q29va2llLmxlbmd0aCAhPT0gc2Vjb25kQ29va2llLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoZmlyc3RDb29raWUubGVuZ3RoID09PSAwICYmIHNlY29uZENvb2tpZS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBmaXJzdENvb2tpZS5zb3J0KHRoaXMubWVzc2FnZUNvbXBhcmVyKTtcbiAgICBzZWNvbmRDb29raWUuc29ydCh0aGlzLm1lc3NhZ2VDb21wYXJlcik7XG4gICAgbGV0IGluZGV4ID0gMDtcbiAgICBsZXQgYXJlQ29va2llc0VxdWFsID0gdHJ1ZTtcbiAgICBmb3IgKGNvbnN0IG1lc3NhZ2Ugb2YgZmlyc3RDb29raWUpIHtcbiAgICAgIGlmIChMc25Dcm9zc1RhYk1lc3NhZ2UuY29tcGFyZShtZXNzYWdlLCBzZWNvbmRDb29raWVbaW5kZXhdKSkge1xuICAgICAgICBhcmVDb29raWVzRXF1YWwgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICsraW5kZXg7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcmVDb29raWVzRXF1YWw7XG4gIH1cblxuICAvKipcbiAgICogQ29tcGFyZXMgdHdvIG1lc3NhZ2VzIGJ5IHByb3BlcnRpZXMgaW4gb3JkZXI6ICdjcmVhdGVkJywgJ2NvZGUnLCAndGFiSWQnO1xuICAgKi9cbiAgcHJpdmF0ZSBtZXNzYWdlQ29tcGFyZXIoZmlyc3RDb29raWVWYWx1ZTogTHNuQ3Jvc3NUYWJNZXNzYWdlLCBzZWNvbmRDb29raWVWYWx1ZTogTHNuQ3Jvc3NUYWJNZXNzYWdlKSB7XG4gICAgbGV0IHJlc3VsdCA9IGZpcnN0Q29va2llVmFsdWUuY3JlYXRlZCA8IHNlY29uZENvb2tpZVZhbHVlLmNyZWF0ZWQgPyAtMSA6IHNlY29uZENvb2tpZVZhbHVlLmNyZWF0ZWQgPCBmaXJzdENvb2tpZVZhbHVlLmNyZWF0ZWQgPyAxIDogMDtcbiAgICBpZiAocmVzdWx0ID09PSAwKSB7XG4gICAgICByZXN1bHQgPSBmaXJzdENvb2tpZVZhbHVlLmNvZGUgPCBzZWNvbmRDb29raWVWYWx1ZS5jb2RlID8gLTEgOiBzZWNvbmRDb29raWVWYWx1ZS5jb2RlIDwgZmlyc3RDb29raWVWYWx1ZS5jb2RlID8gMSA6IDA7XG4gICAgICBpZiAocmVzdWx0ID09PSAwKSB7XG4gICAgICAgIHJlc3VsdCA9IGZpcnN0Q29va2llVmFsdWUudGFiSWQgPCBzZWNvbmRDb29raWVWYWx1ZS50YWJJZCA/IC0xIDogc2Vjb25kQ29va2llVmFsdWUudGFiSWQgPCBmaXJzdENvb2tpZVZhbHVlLnRhYklkID8gMSA6IDA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogRnVuY3Rpb24gZGV0ZXJtaW5lcyB3aGV0aGVyIGdpdmVuIG1lc3NhZ2UgaXMgdG8gYmUgcmVtb3ZlZCBmcm9tIHRoZSBjcm9zcyB0YWIgY29va2llXG4gICAqL1xuICBwcml2YXRlIGNsZWFuQ29va2llRmlsdGVyKHRpbWVzdGFtcDogbnVtYmVyLCBtc2dUdGw6IG51bWJlcikge1xuICAgIHJldHVybiAoY29va2llTWVzc2FnZTogTHNuQ3Jvc3NUYWJNZXNzYWdlKSA9PiB0aW1lc3RhbXAgLSBjb29raWVNZXNzYWdlLmNyZWF0ZWQgPD0gbXNnVHRsO1xuICB9XG5cbn1cbiJdfQ==