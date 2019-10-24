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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNuLWNyb3NzLXRhYi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9sc24tY3Jvc3MtdGFiL2xzbi1jcm9zcy10YWIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFZLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBQyxRQUFRLEVBQWMsT0FBTyxFQUFlLE1BQU0sTUFBTSxDQUFDO0FBQ2pFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQy9ELE9BQU8sRUFBQyxvQkFBb0IsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ25GLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGtDQUFrQyxDQUFDOzs7O0FBRWxFO0lBWUUsNEJBQW9CLGdCQUFrQyxFQUF3QyxjQUFpQztRQUEvSCxpQkFNQztRQU5tQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQXdDLG1CQUFjLEdBQWQsY0FBYyxDQUFtQjs7OztRQXFEdkgsbUJBQWMsR0FBRyxVQUFDLEdBQXVCLElBQWMsT0FBQSxLQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQWhELENBQWdELENBQUM7UUFFeEcsaUJBQVksR0FBRyxVQUFDLE9BQTJCLElBQWEsT0FBQSxPQUFPLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksRUFBOUMsQ0FBOEMsQ0FBQztRQUV2Ryx5QkFBb0IsR0FBRyxVQUFDLEdBQXVCLElBQWEsT0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzthQUNqRixNQUFNLENBQUMsVUFBQyxXQUFXLEVBQUUsR0FBRzs7Z0JBQ2pCLEtBQUssR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1lBQ3RCLElBQUksQ0FBRSxDQUFDLEdBQUcsS0FBSyxPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxFQUFFLENBQUMsQ0FBRSxFQUFFO2dCQUM1RCxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO2dCQUN6QixPQUFPLFdBQVcsQ0FBQzthQUNwQjtpQkFBTTtnQkFDTCxPQUFPLFdBQVcsQ0FBQzthQUNwQixDQUFDLGlCQUFpQjtRQUNyQixDQUFDLEVBQUUsRUFBRSxDQUFDLEVBVDRELENBUzVELENBQUMsQ0FBQyxnQkFBZ0I7UUF3RDFCLGNBQVMsR0FBRyxjQUFNLE9BQUEsS0FBSSxDQUFDLE1BQU0sRUFBWCxDQUFXLENBQUM7UUF6SDVCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxjQUFjLENBQUMsa0JBQWtCLENBQUM7UUFDNUQsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLE9BQU8sRUFBc0IsQ0FBQztRQUN4RCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLEdBQUcsRUFBVSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSCxnQ0FBRzs7OztJQUFIO1FBQUEsaUJBU0M7UUFSQyxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFO1lBQ2hDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUM7aUJBQ3ZFLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFlBQVksRUFBRSxFQUFuQixDQUFtQixDQUFDLENBQUM7U0FDekM7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFO1lBQ2pDLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUM7aUJBQ3pFLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFdBQVcsRUFBRSxFQUFsQixDQUFrQixDQUFDLENBQUM7U0FDeEM7SUFDSCxDQUFDO0lBS0Qsc0JBQUkseUNBQVM7UUFIYjs7V0FFRzs7Ozs7UUFDSDtZQUNFLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUM3QixDQUFDOzs7T0FBQTtJQUVEOztPQUVHOzs7Ozs7SUFDSCx3Q0FBVzs7Ozs7SUFBWCxVQUFZLElBQTRDOztZQUNsRCxPQUFPO1FBQ1gsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7WUFDNUIsT0FBTyxHQUFHLElBQUksa0JBQWtCLENBQUMsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztTQUNoRDthQUFNLElBQUksSUFBSSxZQUFZLGtCQUFrQixFQUFFO1lBQzdDLE9BQU8sR0FBRyxJQUFJLENBQUM7U0FDaEI7YUFBTSxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNyRSxPQUFPLEdBQUcsSUFBSSxrQkFBa0Isc0JBQUssSUFBSSxFQUFFLENBQUM7U0FDN0M7YUFBTTtZQUNMLE9BQU87U0FDUjtRQUNELGdFQUFnRTtRQUNoRSxPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdkMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFvQkQ7O09BRUc7Ozs7Ozs7O0lBQ0sseUNBQVk7Ozs7Ozs7O0lBQXBCLFVBQXFCLEdBQVc7O1lBQ3hCLFVBQVUsR0FBOEIsSUFBSSxDQUFDLE1BQU07UUFDekQsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQztJQUMzQixDQUFDO0lBRUQsc0JBQVksc0NBQU07Ozs7O1FBQWxCO1lBQ0UsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDakYsQ0FBQzs7Ozs7O1FBRUQsVUFBbUIsVUFBcUM7WUFDdEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsVUFBVSxFQUFFO2dCQUM3RCxNQUFNLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVO2dCQUN0QyxJQUFJLEVBQUUsR0FBRzthQUNWLENBQUMsQ0FBQztRQUNMLENBQUM7OztPQVBBO0lBU0Q7O09BRUc7Ozs7OztJQUNLLHdDQUFXOzs7OztJQUFuQjs7WUFDUSxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU07UUFDakMsSUFBSSxhQUFhLEtBQUssSUFBSSxFQUFFO1lBQzFCLE9BQU87U0FDUjs7WUFFSyxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUU7O1lBQ2hDLGFBQWEsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6Ryw2RUFBNkU7UUFDN0UsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNyRCxPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQztJQUM5QixDQUFDO0lBRUQ7O09BRUc7Ozs7OztJQUNLLHlDQUFZOzs7OztJQUFwQjtRQUFBLGlCQVVDO1FBVEMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQyxPQUEyQjs7b0JBQ3hDLE9BQU8sd0JBQU8sT0FBTyxDQUFDO2dCQUM1QixJQUFJLENBQUMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsRUFBRTtvQkFDakMsS0FBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUNyRCxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDbkM7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUlEOztPQUVHOzs7OztJQUNILHdDQUFXOzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzdDLENBQUM7Ozs7SUFFRCx3Q0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVEOztPQUVHOzs7Ozs7OztJQUNLLDRDQUFlOzs7Ozs7O0lBQXZCLFVBQXdCLFdBQXNDLEVBQUUsWUFBdUM7O1FBQ3JHLElBQUksV0FBVyxDQUFDLE1BQU0sS0FBSyxZQUFZLENBQUMsTUFBTSxFQUFFO1lBQzlDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7YUFBTSxJQUFJLFdBQVcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLFlBQVksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ2hFLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN2QyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQzs7WUFDcEMsS0FBSyxHQUFHLENBQUM7O1lBQ1QsZUFBZSxHQUFHLElBQUk7O1lBQzFCLEtBQXNCLElBQUEsZ0JBQUEsaUJBQUEsV0FBVyxDQUFBLHdDQUFBLGlFQUFFO2dCQUE5QixJQUFNLE9BQU8sd0JBQUE7Z0JBQ2hCLElBQUksa0JBQWtCLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtvQkFDNUQsZUFBZSxHQUFHLEtBQUssQ0FBQztpQkFDekI7cUJBQU07b0JBQ0wsRUFBRSxLQUFLLENBQUM7aUJBQ1Q7YUFDRjs7Ozs7Ozs7O1FBQ0QsT0FBTyxlQUFlLENBQUM7SUFDekIsQ0FBQztJQUVEOztPQUVHOzs7Ozs7OztJQUNLLDRDQUFlOzs7Ozs7O0lBQXZCLFVBQXdCLGdCQUFvQyxFQUFFLGlCQUFxQzs7WUFDN0YsTUFBTSxHQUFHLGdCQUFnQixDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckksSUFBSSxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ2hCLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsSUFBSSxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEgsSUFBSSxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUNoQixNQUFNLEdBQUcsZ0JBQWdCLENBQUMsS0FBSyxHQUFHLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzNIO1NBQ0Y7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQ7O09BRUc7Ozs7Ozs7O0lBQ0ssOENBQWlCOzs7Ozs7O0lBQXpCLFVBQTBCLFNBQWlCLEVBQUUsTUFBYztRQUN6RCxPQUFPLFVBQUMsYUFBaUMsSUFBSyxPQUFBLFNBQVMsR0FBRyxhQUFhLENBQUMsT0FBTyxJQUFJLE1BQU0sRUFBM0MsQ0FBMkMsQ0FBQztJQUM1RixDQUFDOztnQkE5TEYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFKTyxnQkFBZ0I7Z0JBRE0saUJBQWlCLHVCQWVZLE1BQU0sU0FBQyxvQkFBb0I7Ozs2QkFsQnRGO0NBc01DLEFBaE1ELElBZ01DO1NBN0xZLGtCQUFrQjs7Ozs7O0lBQzdCLDRDQUE2RDs7SUFDN0QsbUNBQXVCOzs7OztJQUN2Qiw2Q0FBOEM7Ozs7O0lBQzlDLGdEQUE0Qzs7Ozs7SUFDNUMseUNBQXFDOzs7OztJQUNyQyxvREFBNkM7Ozs7O0lBQzdDLHFEQUE4Qzs7Ozs7O0lBdUQ5Qyw0Q0FBZ0g7Ozs7O0lBRWhILDBDQUErRzs7Ozs7SUFFL0csa0RBU1M7O0lBd0RULHVDQUE4Qjs7Ozs7SUExSGxCLDhDQUEwQzs7Ozs7SUFBRSw0Q0FBdUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgT25EZXN0cm95fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7aW50ZXJ2YWwsIE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0xzbkNyb3NzVGFiTWVzc2FnZX0gZnJvbSAnLi9tb2RlbHMvbHNuQ3Jvc3NUYWJNZXNzYWdlJztcbmltcG9ydCB7TFNOX0NST1NTX1RBQl9DT05GSUcsIExzbkNyb3NzVGFiQ29uZmlnfSBmcm9tICcuL21vZGVscy9sc25Dcm9zc1RhYkNvbmZpZyc7XG5pbXBvcnQge0xzbkNvb2tpZVNlcnZpY2V9IGZyb20gJy4uL2xzbi1jb29raWUvbHNuLWNvb2tpZS5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTHNuQ3Jvc3NUYWJTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSByZWFkb25seSBtZXNzYWdlU3ViamVjdDogU3ViamVjdDxMc25Dcm9zc1RhYk1lc3NhZ2U+O1xuICByZWFkb25seSB0YWJJZDogc3RyaW5nO1xuICBwcml2YXRlIHJlYWRvbmx5IG1lc3NhZ2VzUmVhZFNldDogU2V0PHN0cmluZz47XG4gIHByaXZhdGUgcmVhZG9ubHkgY3Jvc3NUYWJDb29raWVOYW1lOiBzdHJpbmc7XG4gIHByaXZhdGUgcmVhZG9ubHkgdGFiT3BlblRpbWU6IG51bWJlcjtcbiAgcHJpdmF0ZSBjb29raWVSZWFkU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgY29va2llQ2xlYW5TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxzbkNvb2tpZVNlcnZpY2U6IExzbkNvb2tpZVNlcnZpY2UsIEBJbmplY3QoTFNOX0NST1NTX1RBQl9DT05GSUcpIHByaXZhdGUgY3Jvc3NUYWJDb25maWc6IExzbkNyb3NzVGFiQ29uZmlnKSB7XG4gICAgdGhpcy5jcm9zc1RhYkNvb2tpZU5hbWUgPSBjcm9zc1RhYkNvbmZpZy5jcm9zc1RhYkNvb2tpZU5hbWU7XG4gICAgdGhpcy5tZXNzYWdlU3ViamVjdCA9IG5ldyBTdWJqZWN0PExzbkNyb3NzVGFiTWVzc2FnZT4oKTtcbiAgICB0aGlzLnRhYklkID0gTWF0aC5yYW5kb20oKSArICcnO1xuICAgIHRoaXMubWVzc2FnZXNSZWFkU2V0ID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgdGhpcy50YWJPcGVuVGltZSA9IERhdGUubm93KCk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiBzZXRzIHVwIHN1YnNjcmlwdGlvbnMgZm9yIHJlYWRpbmcgYW5kIGNsZWFuaW5nIGNyb3NzIHRhYiBjb29raWVcbiAgICovXG4gIHJ1bigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuY29va2llUmVhZFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5jb29raWVSZWFkU3Vic2NyaXB0aW9uID0gaW50ZXJ2YWwodGhpcy5jcm9zc1RhYkNvbmZpZy5jb29raWVSZWFkRnJlcSlcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLnJlYWRNZXNzYWdlcygpKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmNvb2tpZUNsZWFuU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmNvb2tpZUNsZWFuU3Vic2NyaXB0aW9uID0gaW50ZXJ2YWwodGhpcy5jcm9zc1RhYkNvbmZpZy5jb29raWVDbGVhbkZyZXEpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbGVhbkNvb2tpZSgpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBPYnNlcnZhYmxlIGVtaXRzIG1lc3NhZ2VzIHRoYXQgd2VyZSBzZW50IGJ5IG90aGVyIHRhYnNcbiAgICovXG4gIGdldCBtZXNzYWdlcyQoKTogT2JzZXJ2YWJsZTxMc25Dcm9zc1RhYk1lc3NhZ2U+IHtcbiAgICByZXR1cm4gdGhpcy5tZXNzYWdlU3ViamVjdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kcyBtZXNzYWdlIHRvIG90aGVyIHRhYnMgYnkgYWRkaW5nIHRoaXMgbWVzc2FnZSB0byBjcm9zcyB0YWIgY29va2llXG4gICAqL1xuICBzZW5kTWVzc2FnZShkYXRhOiAoc3RyaW5nIHwgTHNuQ3Jvc3NUYWJNZXNzYWdlIHwgb2JqZWN0KSkge1xuICAgIGxldCBtZXNzYWdlO1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIG1lc3NhZ2UgPSBuZXcgTHNuQ3Jvc3NUYWJNZXNzYWdlKHtjb2RlOiBkYXRhfSk7XG4gICAgfSBlbHNlIGlmIChkYXRhIGluc3RhbmNlb2YgTHNuQ3Jvc3NUYWJNZXNzYWdlKSB7XG4gICAgICBtZXNzYWdlID0gZGF0YTtcbiAgICB9IGVsc2UgaWYgKCEhZGF0YSAmJiB0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgIG1lc3NhZ2UgPSBuZXcgTHNuQ3Jvc3NUYWJNZXNzYWdlKHsuLi5kYXRhfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gcHJldmlvdXMgaW1wbGVtZW50YXRpb24sIG1lc3NhZ2UuY3JlYXRlZCBpcyBhbHdheXMgb3ZlcnJpZGRlblxuICAgIG1lc3NhZ2UuY3JlYXRlZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIG1lc3NhZ2UudGFiSWQgPSB0aGlzLnRhYklkO1xuICAgIHRoaXMubWVzc2FnZXNSZWFkU2V0LmFkZCh0aGlzLmdldE1lc3NhZ2VJZChtZXNzYWdlKSk7XG4gICAgdGhpcy51cGRhdGVDb29raWUodGhpcy5tZXNzYWdlVG9QbGFpbk9iamVjdChtZXNzYWdlKSk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIG1lc3NhZ2Ugd2l0aCBnaXZlbiBpZCB3YXMgYWxyZWFkeSByZWFkXG4gICAqL1xuICBwcml2YXRlIG1lc3NhZ2VXYXNSZWFkID0gKG1zZzogTHNuQ3Jvc3NUYWJNZXNzYWdlKTogYm9vbGVhbiA9PiB0aGlzLm1lc3NhZ2VzUmVhZFNldC5oYXModGhpcy5nZXRNZXNzYWdlSWQobXNnKSk7XG5cbiAgcHJpdmF0ZSBnZXRNZXNzYWdlSWQgPSAobWVzc2FnZTogTHNuQ3Jvc3NUYWJNZXNzYWdlKTogc3RyaW5nID0+IG1lc3NhZ2UudGFiSWQgKyBtZXNzYWdlLmNyZWF0ZWQgKyBtZXNzYWdlLmNvZGU7XG5cbiAgcHJpdmF0ZSBtZXNzYWdlVG9QbGFpbk9iamVjdCA9IChtc2c6IExzbkNyb3NzVGFiTWVzc2FnZSk6IG9iamVjdCA9PiBPYmplY3Qua2V5cyhtc2cpXG4gICAgLnJlZHVjZSgobWluaWZpZWRPYmosIGtleSkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSBtc2dba2V5XTtcbiAgICAgIGlmICghIChrZXkgPT09ICdhdHRycycgJiYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB7fSkgKSkge1xuICAgICAgICBtaW5pZmllZE9ialtrZXldID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBtaW5pZmllZE9iajtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBtaW5pZmllZE9iajtcbiAgICAgIH0gLy8gdHNsaW50OmRpc2FibGVcbiAgICB9LCB7fSk7IC8vIHRzbGludDplbmFibGVcblxuICAvKipcbiAgICogQXBwZW5kcyBnaXZlbiBtZXNzYWdlIHRvIGNyb3NzIHRhYiBjb29raWUgdmFsdWVcbiAgICovXG4gIHByaXZhdGUgdXBkYXRlQ29va2llKG1zZzogb2JqZWN0KSB7XG4gICAgY29uc3QgY29va2llRGF0YTogQXJyYXk8THNuQ3Jvc3NUYWJNZXNzYWdlPiA9IHRoaXMuY29va2llO1xuICAgIGNvb2tpZURhdGEucHVzaChtc2cpO1xuICAgIHRoaXMuY29va2llID0gY29va2llRGF0YTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGNvb2tpZSgpIHtcbiAgICByZXR1cm4gdGhpcy5sc25Db29raWVTZXJ2aWNlLmdldCh0aGlzLmNyb3NzVGFiQ29uZmlnLmNyb3NzVGFiQ29va2llTmFtZSkgfHwgW107XG4gIH1cblxuICBwcml2YXRlIHNldCBjb29raWUoY29va2llRGF0YTogQXJyYXk8THNuQ3Jvc3NUYWJNZXNzYWdlPikge1xuICAgIHRoaXMubHNuQ29va2llU2VydmljZS5zZXQodGhpcy5jcm9zc1RhYkNvb2tpZU5hbWUsIGNvb2tpZURhdGEsIHtcbiAgICAgIGRvbWFpbjogdGhpcy5jcm9zc1RhYkNvbmZpZy5yb290RG9tYWluLFxuICAgICAgcGF0aDogJy8nXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBtZXNzYWdlcyBmcm9tIGNyb3NzIHRhYiBjb29raWUgdGhhdCBhcmUgb2xkZXIgdGhhbiBzdXBwbGllZCBjb25maWcubXNnVHRsIHRpbWVcbiAgICovXG4gIHByaXZhdGUgY2xlYW5Db29raWUoKSB7XG4gICAgY29uc3QgY3VycmVudENvb2tpZSA9IHRoaXMuY29va2llO1xuICAgIGlmIChjdXJyZW50Q29va2llID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdGltZXN0YW1wID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgY29uc3QgY2xlYW5lZENvb2tpZSA9IGN1cnJlbnRDb29raWUuZmlsdGVyKHRoaXMuY2xlYW5Db29raWVGaWx0ZXIodGltZXN0YW1wLCB0aGlzLmNyb3NzVGFiQ29uZmlnLm1zZ1R0bCkpO1xuICAgIC8vIHByZXZpb3VzIGltcGxlbWVudGF0aW9uLCBjb29raWUgbWlnaHQgaGF2ZSBiZWVuIG1vZGlmaWVkIGluIHRoZSBvdGhlciB0YWI/XG4gICAgaWYgKCF0aGlzLmFyZUNvb2tpZXNFcXVhbChjdXJyZW50Q29va2llLCB0aGlzLmNvb2tpZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmNvb2tpZSA9IGNsZWFuZWRDb29raWU7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGJhY2sgaW52b2tlZCBhZnRlciBldmVyeSBjb29raWUgcmVhZCBpbnRlcnZhbFxuICAgKi9cbiAgcHJpdmF0ZSByZWFkTWVzc2FnZXMoKSB7XG4gICAgaWYgKHRoaXMuY29va2llKSB7XG4gICAgICB0aGlzLmNvb2tpZS5mb3JFYWNoKChtc2dEYXRhOiBMc25Dcm9zc1RhYk1lc3NhZ2UpID0+IHtcbiAgICAgICAgY29uc3QgbXNnQ29weSA9IHsuLi5tc2dEYXRhfTtcbiAgICAgICAgaWYgKCF0aGlzLm1lc3NhZ2VXYXNSZWFkKG1zZ0NvcHkpKSB7XG4gICAgICAgICAgdGhpcy5tZXNzYWdlc1JlYWRTZXQuYWRkKHRoaXMuZ2V0TWVzc2FnZUlkKG1zZ0NvcHkpKTtcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VTdWJqZWN0Lm5leHQobXNnQ29weSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGdldENvb2tpZSA9ICgpID0+IHRoaXMuY29va2llO1xuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCBzdWJzY3JpcHRpb25zIHRoYXQgdGhpcyBzZXJ2aWNlIGlzIHN1YnNjcmliZSB0byAoaW50ZXJ2YWxzIGFyZSBjbGVhcmVkKVxuICAgKi9cbiAgdW5zdWJzY3JpYmUoKSB7XG4gICAgdGhpcy5jb29raWVSZWFkU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5jb29raWVDbGVhblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNvcnRzIHR3byBjb29raWUgYXJyYXlzIGFuZCBjb21wYXJlcyBlYWNoIGVsZW1lbnRcbiAgICovXG4gIHByaXZhdGUgYXJlQ29va2llc0VxdWFsKGZpcnN0Q29va2llOiBBcnJheTxMc25Dcm9zc1RhYk1lc3NhZ2U+LCBzZWNvbmRDb29raWU6IEFycmF5PExzbkNyb3NzVGFiTWVzc2FnZT4pIHtcbiAgICBpZiAoZmlyc3RDb29raWUubGVuZ3RoICE9PSBzZWNvbmRDb29raWUubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChmaXJzdENvb2tpZS5sZW5ndGggPT09IDAgJiYgc2Vjb25kQ29va2llLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGZpcnN0Q29va2llLnNvcnQodGhpcy5tZXNzYWdlQ29tcGFyZXIpO1xuICAgIHNlY29uZENvb2tpZS5zb3J0KHRoaXMubWVzc2FnZUNvbXBhcmVyKTtcbiAgICBsZXQgaW5kZXggPSAwO1xuICAgIGxldCBhcmVDb29raWVzRXF1YWwgPSB0cnVlO1xuICAgIGZvciAoY29uc3QgbWVzc2FnZSBvZiBmaXJzdENvb2tpZSkge1xuICAgICAgaWYgKExzbkNyb3NzVGFiTWVzc2FnZS5jb21wYXJlKG1lc3NhZ2UsIHNlY29uZENvb2tpZVtpbmRleF0pKSB7XG4gICAgICAgIGFyZUNvb2tpZXNFcXVhbCA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgKytpbmRleDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFyZUNvb2tpZXNFcXVhbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wYXJlcyB0d28gbWVzc2FnZXMgYnkgcHJvcGVydGllcyBpbiBvcmRlcjogJ2NyZWF0ZWQnLCAnY29kZScsICd0YWJJZCc7XG4gICAqL1xuICBwcml2YXRlIG1lc3NhZ2VDb21wYXJlcihmaXJzdENvb2tpZVZhbHVlOiBMc25Dcm9zc1RhYk1lc3NhZ2UsIHNlY29uZENvb2tpZVZhbHVlOiBMc25Dcm9zc1RhYk1lc3NhZ2UpIHtcbiAgICBsZXQgcmVzdWx0ID0gZmlyc3RDb29raWVWYWx1ZS5jcmVhdGVkIDwgc2Vjb25kQ29va2llVmFsdWUuY3JlYXRlZCA/IC0xIDogc2Vjb25kQ29va2llVmFsdWUuY3JlYXRlZCA8IGZpcnN0Q29va2llVmFsdWUuY3JlYXRlZCA/IDEgOiAwO1xuICAgIGlmIChyZXN1bHQgPT09IDApIHtcbiAgICAgIHJlc3VsdCA9IGZpcnN0Q29va2llVmFsdWUuY29kZSA8IHNlY29uZENvb2tpZVZhbHVlLmNvZGUgPyAtMSA6IHNlY29uZENvb2tpZVZhbHVlLmNvZGUgPCBmaXJzdENvb2tpZVZhbHVlLmNvZGUgPyAxIDogMDtcbiAgICAgIGlmIChyZXN1bHQgPT09IDApIHtcbiAgICAgICAgcmVzdWx0ID0gZmlyc3RDb29raWVWYWx1ZS50YWJJZCA8IHNlY29uZENvb2tpZVZhbHVlLnRhYklkID8gLTEgOiBzZWNvbmRDb29raWVWYWx1ZS50YWJJZCA8IGZpcnN0Q29va2llVmFsdWUudGFiSWQgPyAxIDogMDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiBkZXRlcm1pbmVzIHdoZXRoZXIgZ2l2ZW4gbWVzc2FnZSBpcyB0byBiZSByZW1vdmVkIGZyb20gdGhlIGNyb3NzIHRhYiBjb29raWVcbiAgICovXG4gIHByaXZhdGUgY2xlYW5Db29raWVGaWx0ZXIodGltZXN0YW1wOiBudW1iZXIsIG1zZ1R0bDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIChjb29raWVNZXNzYWdlOiBMc25Dcm9zc1RhYk1lc3NhZ2UpID0+IHRpbWVzdGFtcCAtIGNvb2tpZU1lc3NhZ2UuY3JlYXRlZCA8PSBtc2dUdGw7XG4gIH1cblxufVxuIl19