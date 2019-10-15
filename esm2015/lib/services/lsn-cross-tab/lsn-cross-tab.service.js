/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable } from '@angular/core';
import { LsnCookieService } from '../lsn-cookie/index';
import { interval, Subject } from 'rxjs';
import { LsnCrossTabMessage } from './models/lsnCrossTabMessage';
import { LSN_CROSS_TAB_CONFIG, LsnCrossTabConfig } from './models/lsnCrossTabConfig';
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
            if (key !== 'attrs' && value !== null && value !== {}) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNuLWNyb3NzLXRhYi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9sc24tY3Jvc3MtdGFiL2xzbi1jcm9zcy10YWIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQVksTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDckQsT0FBTyxFQUFDLFFBQVEsRUFBYyxPQUFPLEVBQWUsTUFBTSxNQUFNLENBQUM7QUFDakUsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDL0QsT0FBTyxFQUFDLG9CQUFvQixFQUFFLGlCQUFpQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7Ozs7QUFLbkYsTUFBTSxPQUFPLGtCQUFrQjs7Ozs7SUFTN0IsWUFBb0IsZ0JBQWtDLEVBQXdDLGNBQWlDO1FBQTNHLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBd0MsbUJBQWMsR0FBZCxjQUFjLENBQW1COzs7O1FBcUR2SCxtQkFBYyxHQUFHLENBQUMsR0FBdUIsRUFBVyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRXhHLGlCQUFZLEdBQUcsQ0FBQyxPQUEyQixFQUFVLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztRQUV2Ryx5QkFBb0IsR0FBRyxDQUFDLEdBQXVCLEVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2FBQ2pGLE1BQU0sQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUUsRUFBRTs7a0JBQ3JC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Ozs7SUFScEYsNENBQTZEOztJQUM3RCxtQ0FBdUI7Ozs7O0lBQ3ZCLDZDQUE4Qzs7Ozs7SUFDOUMsZ0RBQTRDOzs7OztJQUM1Qyx5Q0FBcUM7Ozs7O0lBQ3JDLG9EQUE2Qzs7Ozs7SUFDN0MscURBQThDOzs7Ozs7SUF1RDlDLDRDQUFnSDs7Ozs7SUFFaEgsMENBQStHOzs7OztJQUUvRyxrREFTUzs7SUF3RFQsdUNBQThCOzs7OztJQTFIbEIsOENBQTBDOzs7OztJQUFFLDRDQUF1RSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlLCBPbkRlc3Ryb3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtMc25Db29raWVTZXJ2aWNlfSBmcm9tICcuLi9sc24tY29va2llL2luZGV4JztcbmltcG9ydCB7aW50ZXJ2YWwsIE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0xzbkNyb3NzVGFiTWVzc2FnZX0gZnJvbSAnLi9tb2RlbHMvbHNuQ3Jvc3NUYWJNZXNzYWdlJztcbmltcG9ydCB7TFNOX0NST1NTX1RBQl9DT05GSUcsIExzbkNyb3NzVGFiQ29uZmlnfSBmcm9tICcuL21vZGVscy9sc25Dcm9zc1RhYkNvbmZpZyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIExzbkNyb3NzVGFiU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgbWVzc2FnZVN1YmplY3Q6IFN1YmplY3Q8THNuQ3Jvc3NUYWJNZXNzYWdlPjtcbiAgcmVhZG9ubHkgdGFiSWQ6IHN0cmluZztcbiAgcHJpdmF0ZSByZWFkb25seSBtZXNzYWdlc1JlYWRTZXQ6IFNldDxzdHJpbmc+O1xuICBwcml2YXRlIHJlYWRvbmx5IGNyb3NzVGFiQ29va2llTmFtZTogc3RyaW5nO1xuICBwcml2YXRlIHJlYWRvbmx5IHRhYk9wZW5UaW1lOiBudW1iZXI7XG4gIHByaXZhdGUgY29va2llUmVhZFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIGNvb2tpZUNsZWFuU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBsc25Db29raWVTZXJ2aWNlOiBMc25Db29raWVTZXJ2aWNlLCBASW5qZWN0KExTTl9DUk9TU19UQUJfQ09ORklHKSBwcml2YXRlIGNyb3NzVGFiQ29uZmlnOiBMc25Dcm9zc1RhYkNvbmZpZykge1xuICAgIHRoaXMuY3Jvc3NUYWJDb29raWVOYW1lID0gY3Jvc3NUYWJDb25maWcuY3Jvc3NUYWJDb29raWVOYW1lO1xuICAgIHRoaXMubWVzc2FnZVN1YmplY3QgPSBuZXcgU3ViamVjdDxMc25Dcm9zc1RhYk1lc3NhZ2U+KCk7XG4gICAgdGhpcy50YWJJZCA9IE1hdGgucmFuZG9tKCkgKyAnJztcbiAgICB0aGlzLm1lc3NhZ2VzUmVhZFNldCA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgIHRoaXMudGFiT3BlblRpbWUgPSBEYXRlLm5vdygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgZnVuY3Rpb24gc2V0cyB1cCBzdWJzY3JpcHRpb25zIGZvciByZWFkaW5nIGFuZCBjbGVhbmluZyBjcm9zcyB0YWIgY29va2llXG4gICAqL1xuICBydW4oKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmNvb2tpZVJlYWRTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuY29va2llUmVhZFN1YnNjcmlwdGlvbiA9IGludGVydmFsKHRoaXMuY3Jvc3NUYWJDb25maWcuY29va2llUmVhZEZyZXEpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5yZWFkTWVzc2FnZXMoKSk7XG4gICAgfVxuICAgIGlmICghdGhpcy5jb29raWVDbGVhblN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5jb29raWVDbGVhblN1YnNjcmlwdGlvbiA9IGludGVydmFsKHRoaXMuY3Jvc3NUYWJDb25maWcuY29va2llQ2xlYW5GcmVxKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xlYW5Db29raWUoKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgT2JzZXJ2YWJsZSBlbWl0cyBtZXNzYWdlcyB0aGF0IHdlcmUgc2VudCBieSBvdGhlciB0YWJzXG4gICAqL1xuICBnZXQgbWVzc2FnZXMkKCk6IE9ic2VydmFibGU8THNuQ3Jvc3NUYWJNZXNzYWdlPiB7XG4gICAgcmV0dXJuIHRoaXMubWVzc2FnZVN1YmplY3Q7XG4gIH1cblxuICAvKipcbiAgICogU2VuZHMgbWVzc2FnZSB0byBvdGhlciB0YWJzIGJ5IGFkZGluZyB0aGlzIG1lc3NhZ2UgdG8gY3Jvc3MgdGFiIGNvb2tpZVxuICAgKi9cbiAgc2VuZE1lc3NhZ2UoZGF0YTogKHN0cmluZyB8IExzbkNyb3NzVGFiTWVzc2FnZSB8IG9iamVjdCkpIHtcbiAgICBsZXQgbWVzc2FnZTtcbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICBtZXNzYWdlID0gbmV3IExzbkNyb3NzVGFiTWVzc2FnZSh7Y29kZTogZGF0YX0pO1xuICAgIH0gZWxzZSBpZiAoZGF0YSBpbnN0YW5jZW9mIExzbkNyb3NzVGFiTWVzc2FnZSkge1xuICAgICAgbWVzc2FnZSA9IGRhdGE7XG4gICAgfSBlbHNlIGlmICghIWRhdGEgJiYgdHlwZW9mIGRhdGEgPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICBtZXNzYWdlID0gbmV3IExzbkNyb3NzVGFiTWVzc2FnZSh7Li4uZGF0YX0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIHByZXZpb3VzIGltcGxlbWVudGF0aW9uLCBtZXNzYWdlLmNyZWF0ZWQgaXMgYWx3YXlzIG92ZXJyaWRkZW5cbiAgICBtZXNzYWdlLmNyZWF0ZWQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICBtZXNzYWdlLnRhYklkID0gdGhpcy50YWJJZDtcbiAgICB0aGlzLm1lc3NhZ2VzUmVhZFNldC5hZGQodGhpcy5nZXRNZXNzYWdlSWQobWVzc2FnZSkpO1xuICAgIHRoaXMudXBkYXRlQ29va2llKHRoaXMubWVzc2FnZVRvUGxhaW5PYmplY3QobWVzc2FnZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBtZXNzYWdlIHdpdGggZ2l2ZW4gaWQgd2FzIGFscmVhZHkgcmVhZFxuICAgKi9cbiAgcHJpdmF0ZSBtZXNzYWdlV2FzUmVhZCA9IChtc2c6IExzbkNyb3NzVGFiTWVzc2FnZSk6IGJvb2xlYW4gPT4gdGhpcy5tZXNzYWdlc1JlYWRTZXQuaGFzKHRoaXMuZ2V0TWVzc2FnZUlkKG1zZykpO1xuXG4gIHByaXZhdGUgZ2V0TWVzc2FnZUlkID0gKG1lc3NhZ2U6IExzbkNyb3NzVGFiTWVzc2FnZSk6IHN0cmluZyA9PiBtZXNzYWdlLnRhYklkICsgbWVzc2FnZS5jcmVhdGVkICsgbWVzc2FnZS5jb2RlO1xuXG4gIHByaXZhdGUgbWVzc2FnZVRvUGxhaW5PYmplY3QgPSAobXNnOiBMc25Dcm9zc1RhYk1lc3NhZ2UpOiBvYmplY3QgPT4gT2JqZWN0LmtleXMobXNnKVxuICAgIC5yZWR1Y2UoKG1pbmlmaWVkT2JqLCBrZXkpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gbXNnW2tleV07XG4gICAgICBpZiAoa2V5ICE9PSAnYXR0cnMnICYmIHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB7fSkge1xuICAgICAgICBtaW5pZmllZE9ialtrZXldID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBtaW5pZmllZE9iajtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBtaW5pZmllZE9iajtcbiAgICAgIH0gLy8gdHNsaW50OmRpc2FibGVcbiAgICB9LCB7fSk7IC8vIHRzbGludDplbmFibGVcblxuICAvKipcbiAgICogQXBwZW5kcyBnaXZlbiBtZXNzYWdlIHRvIGNyb3NzIHRhYiBjb29raWUgdmFsdWVcbiAgICovXG4gIHByaXZhdGUgdXBkYXRlQ29va2llKG1zZzogb2JqZWN0KSB7XG4gICAgY29uc3QgY29va2llRGF0YTogQXJyYXk8THNuQ3Jvc3NUYWJNZXNzYWdlPiA9IHRoaXMuY29va2llO1xuICAgIGNvb2tpZURhdGEucHVzaChtc2cpO1xuICAgIHRoaXMuY29va2llID0gY29va2llRGF0YTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGNvb2tpZSgpIHtcbiAgICByZXR1cm4gdGhpcy5sc25Db29raWVTZXJ2aWNlLmdldCh0aGlzLmNyb3NzVGFiQ29uZmlnLmNyb3NzVGFiQ29va2llTmFtZSkgfHwgW107XG4gIH1cblxuICBwcml2YXRlIHNldCBjb29raWUoY29va2llRGF0YTogQXJyYXk8THNuQ3Jvc3NUYWJNZXNzYWdlPikge1xuICAgIHRoaXMubHNuQ29va2llU2VydmljZS5zZXQodGhpcy5jcm9zc1RhYkNvb2tpZU5hbWUsIGNvb2tpZURhdGEsIHtcbiAgICAgIGRvbWFpbjogdGhpcy5jcm9zc1RhYkNvbmZpZy5yb290RG9tYWluLFxuICAgICAgcGF0aDogJy8nXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBtZXNzYWdlcyBmcm9tIGNyb3NzIHRhYiBjb29raWUgdGhhdCBhcmUgb2xkZXIgdGhhbiBzdXBwbGllZCBjb25maWcubXNnVHRsIHRpbWVcbiAgICovXG4gIHByaXZhdGUgY2xlYW5Db29raWUoKSB7XG4gICAgY29uc3QgY3VycmVudENvb2tpZSA9IHRoaXMuY29va2llO1xuICAgIGlmIChjdXJyZW50Q29va2llID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdGltZXN0YW1wID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgY29uc3QgY2xlYW5lZENvb2tpZSA9IGN1cnJlbnRDb29raWUuZmlsdGVyKHRoaXMuY2xlYW5Db29raWVGaWx0ZXIodGltZXN0YW1wLCB0aGlzLmNyb3NzVGFiQ29uZmlnLm1zZ1R0bCkpO1xuICAgIC8vIHByZXZpb3VzIGltcGxlbWVudGF0aW9uLCBjb29raWUgbWlnaHQgaGF2ZSBiZWVuIG1vZGlmaWVkIGluIHRoZSBvdGhlciB0YWI/XG4gICAgaWYgKCF0aGlzLmFyZUNvb2tpZXNFcXVhbChjdXJyZW50Q29va2llLCB0aGlzLmNvb2tpZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmNvb2tpZSA9IGNsZWFuZWRDb29raWU7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGJhY2sgaW52b2tlZCBhZnRlciBldmVyeSBjb29raWUgcmVhZCBpbnRlcnZhbFxuICAgKi9cbiAgcHJpdmF0ZSByZWFkTWVzc2FnZXMoKSB7XG4gICAgaWYgKHRoaXMuY29va2llKSB7XG4gICAgICB0aGlzLmNvb2tpZS5mb3JFYWNoKChtc2dEYXRhOiBMc25Dcm9zc1RhYk1lc3NhZ2UpID0+IHtcbiAgICAgICAgY29uc3QgbXNnQ29weSA9IHsuLi5tc2dEYXRhfTtcbiAgICAgICAgaWYgKCF0aGlzLm1lc3NhZ2VXYXNSZWFkKG1zZ0NvcHkpKSB7XG4gICAgICAgICAgdGhpcy5tZXNzYWdlc1JlYWRTZXQuYWRkKHRoaXMuZ2V0TWVzc2FnZUlkKG1zZ0NvcHkpKTtcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VTdWJqZWN0Lm5leHQobXNnQ29weSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGdldENvb2tpZSA9ICgpID0+IHRoaXMuY29va2llO1xuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCBzdWJzY3JpcHRpb25zIHRoYXQgdGhpcyBzZXJ2aWNlIGlzIHN1YnNjcmliZSB0byAoaW50ZXJ2YWxzIGFyZSBjbGVhcmVkKVxuICAgKi9cbiAgdW5zdWJzY3JpYmUoKSB7XG4gICAgdGhpcy5jb29raWVSZWFkU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5jb29raWVDbGVhblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNvcnRzIHR3byBjb29raWUgYXJyYXlzIGFuZCBjb21wYXJlcyBlYWNoIGVsZW1lbnRcbiAgICovXG4gIHByaXZhdGUgYXJlQ29va2llc0VxdWFsKGZpcnN0Q29va2llOiBBcnJheTxMc25Dcm9zc1RhYk1lc3NhZ2U+LCBzZWNvbmRDb29raWU6IEFycmF5PExzbkNyb3NzVGFiTWVzc2FnZT4pIHtcbiAgICBpZiAoZmlyc3RDb29raWUubGVuZ3RoICE9PSBzZWNvbmRDb29raWUubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChmaXJzdENvb2tpZS5sZW5ndGggPT09IDAgJiYgc2Vjb25kQ29va2llLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGZpcnN0Q29va2llLnNvcnQodGhpcy5tZXNzYWdlQ29tcGFyZXIpO1xuICAgIHNlY29uZENvb2tpZS5zb3J0KHRoaXMubWVzc2FnZUNvbXBhcmVyKTtcbiAgICBsZXQgaW5kZXggPSAwO1xuICAgIGxldCBhcmVDb29raWVzRXF1YWwgPSB0cnVlO1xuICAgIGZvciAoY29uc3QgbWVzc2FnZSBvZiBmaXJzdENvb2tpZSkge1xuICAgICAgaWYgKExzbkNyb3NzVGFiTWVzc2FnZS5jb21wYXJlKG1lc3NhZ2UsIHNlY29uZENvb2tpZVtpbmRleF0pKSB7XG4gICAgICAgIGFyZUNvb2tpZXNFcXVhbCA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgKytpbmRleDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFyZUNvb2tpZXNFcXVhbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wYXJlcyB0d28gbWVzc2FnZXMgYnkgcHJvcGVydGllcyBpbiBvcmRlcjogJ2NyZWF0ZWQnLCAnY29kZScsICd0YWJJZCc7XG4gICAqL1xuICBwcml2YXRlIG1lc3NhZ2VDb21wYXJlcihmaXJzdENvb2tpZVZhbHVlOiBMc25Dcm9zc1RhYk1lc3NhZ2UsIHNlY29uZENvb2tpZVZhbHVlOiBMc25Dcm9zc1RhYk1lc3NhZ2UpIHtcbiAgICBsZXQgcmVzdWx0ID0gZmlyc3RDb29raWVWYWx1ZS5jcmVhdGVkIDwgc2Vjb25kQ29va2llVmFsdWUuY3JlYXRlZCA/IC0xIDogc2Vjb25kQ29va2llVmFsdWUuY3JlYXRlZCA8IGZpcnN0Q29va2llVmFsdWUuY3JlYXRlZCA/IDEgOiAwO1xuICAgIGlmIChyZXN1bHQgPT09IDApIHtcbiAgICAgIHJlc3VsdCA9IGZpcnN0Q29va2llVmFsdWUuY29kZSA8IHNlY29uZENvb2tpZVZhbHVlLmNvZGUgPyAtMSA6IHNlY29uZENvb2tpZVZhbHVlLmNvZGUgPCBmaXJzdENvb2tpZVZhbHVlLmNvZGUgPyAxIDogMDtcbiAgICAgIGlmIChyZXN1bHQgPT09IDApIHtcbiAgICAgICAgcmVzdWx0ID0gZmlyc3RDb29raWVWYWx1ZS50YWJJZCA8IHNlY29uZENvb2tpZVZhbHVlLnRhYklkID8gLTEgOiBzZWNvbmRDb29raWVWYWx1ZS50YWJJZCA8IGZpcnN0Q29va2llVmFsdWUudGFiSWQgPyAxIDogMDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiBkZXRlcm1pbmVzIHdoZXRoZXIgZ2l2ZW4gbWVzc2FnZSBpcyB0byBiZSByZW1vdmVkIGZyb20gdGhlIGNyb3NzIHRhYiBjb29raWVcbiAgICovXG4gIHByaXZhdGUgY2xlYW5Db29raWVGaWx0ZXIodGltZXN0YW1wOiBudW1iZXIsIG1zZ1R0bDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIChjb29raWVNZXNzYWdlOiBMc25Dcm9zc1RhYk1lc3NhZ2UpID0+IHRpbWVzdGFtcCAtIGNvb2tpZU1lc3NhZ2UuY3JlYXRlZCA8PSBtc2dUdGw7XG4gIH1cblxufVxuIl19