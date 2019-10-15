/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Inject, Injectable } from '@angular/core';
import { LSN_COOKIE_CONFIG, LsnCookieConfig } from './models/lsnCookieConfig';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "./models/lsnCookieConfig";
import * as i2 from "@angular/common";
/**
 * @record
 */
export function CookieOptions() { }
if (false) {
    /** @type {?|undefined} */
    CookieOptions.prototype.expires;
    /** @type {?|undefined} */
    CookieOptions.prototype.expirationUnit;
    /** @type {?|undefined} */
    CookieOptions.prototype.path;
    /** @type {?|undefined} */
    CookieOptions.prototype.domain;
    /** @type {?|undefined} */
    CookieOptions.prototype.secure;
}
/**
 * @record
 */
export function CookieService() { }
if (false) {
    /**
     * @param {?} cookieKey
     * @param {?} cookieValue
     * @param {?} cookieOptions
     * @return {?}
     */
    CookieService.prototype.set = function (cookieKey, cookieValue, cookieOptions) { };
    /**
     * @param {?=} cookieKey
     * @return {?}
     */
    CookieService.prototype.get = function (cookieKey) { };
    /**
     * @param {?} cookieKey
     * @param {?} cookieOptions
     * @return {?}
     */
    CookieService.prototype.remove = function (cookieKey, cookieOptions) { };
}
var LsnCookieService = /** @class */ (function () {
    function LsnCookieService(cookieConfig, document) {
        this.cookieConfig = cookieConfig;
        this.document = document;
    }
    /**
     * Sets cookie with given key to given value, cookie options are optional, if not set, some properties
     * (secure and domain) will be set from global cookie config
     */
    /**
     * Sets cookie with given key to given value, cookie options are optional, if not set, some properties
     * (secure and domain) will be set from global cookie config
     * @param {?} cookieKey
     * @param {?} cookieValue
     * @param {?=} cookieOptions
     * @return {?}
     */
    LsnCookieService.prototype.set = /**
     * Sets cookie with given key to given value, cookie options are optional, if not set, some properties
     * (secure and domain) will be set from global cookie config
     * @param {?} cookieKey
     * @param {?} cookieValue
     * @param {?=} cookieOptions
     * @return {?}
     */
    function (cookieKey, cookieValue, cookieOptions) {
        /** @type {?} */
        var options = tslib_1.__assign({}, cookieOptions, { secure: cookieOptions && cookieOptions.secure ? cookieOptions.secure : this.cookieConfig.secureCookies });
        if (!this.cookieConfig.domainCookies) {
            options.domain = false;
        }
        /** @type {?} */
        var value = JSON.stringify(cookieValue);
        /** @type {?} */
        var expiresFor;
        if (typeof options.expires === 'number') {
            expiresFor = options.expires;
            options.expires = new Date();
            // Trying to delete a cookie; set a date far in the past
            if (expiresFor === -1) {
                options.expires = new Date('Thu, 01 Jan 1970 00:00:00 GMT');
            }
            else if (options.expirationUnit) {
                if (options.expirationUnit === 'hours') {
                    options.expires.setHours(options.expires.getHours() + expiresFor);
                }
                else if (options.expirationUnit === 'minutes') {
                    options.expires.setMinutes(options.expires.getMinutes() + expiresFor);
                }
                else if (options.expirationUnit === 'seconds') {
                    options.expires.setSeconds(options.expires.getSeconds() + expiresFor);
                }
                else if (options.expirationUnit === 'milliseconds') {
                    options.expires.setMilliseconds(options.expires.getMilliseconds() + expiresFor);
                }
                else {
                    options.expires.setDate(options.expires.getDate() + expiresFor);
                }
            }
            else {
                options.expires.setDate(options.expires.getDate() + expiresFor);
            }
        }
        this.document.cookie = [
            encodeURIComponent(cookieKey),
            '=',
            encodeURIComponent(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '',
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join('');
    };
    /**
     * Key provided - returns value of given cookie or undefined if non existent
     * Key not provided - returns all cookies as Object or undefined if there are no cookies
     * Cookie values are JSON.parsed, if error occurs during parsing, string value is assigned
     */
    /**
     * Key provided - returns value of given cookie or undefined if non existent
     * Key not provided - returns all cookies as Object or undefined if there are no cookies
     * Cookie values are JSON.parsed, if error occurs during parsing, string value is assigned
     * @param {?=} cookieKey
     * @return {?}
     */
    LsnCookieService.prototype.get = /**
     * Key provided - returns value of given cookie or undefined if non existent
     * Key not provided - returns all cookies as Object or undefined if there are no cookies
     * Cookie values are JSON.parsed, if error occurs during parsing, string value is assigned
     * @param {?=} cookieKey
     * @return {?}
     */
    function (cookieKey) {
        /** @type {?} */
        var cookieStringList = this.document.cookie ? this.document.cookie.split('; ') : [];
        /** @type {?} */
        var cookieObject = cookieStringList
            .map(function (cookieString) {
            /** @type {?} */
            var pos = cookieString.indexOf('=');
            return {
                name: cookieString.substr(0, pos),
                value: decodeURIComponent(cookieString.substr(pos + 1))
            };
        }).filter(function (cookie) {
            return typeof cookie.value !== 'undefined' && (cookieKey === undefined || cookieKey === cookie.name);
        }).reduce(function (previousValue, currentValue) {
            /** @type {?} */
            var value = null;
            try {
                value = JSON.parse(currentValue.value);
            }
            catch (e) {
                value = currentValue.value;
            }
            previousValue[currentValue.name] = value;
            return previousValue;
        }, {});
        return cookieKey ? cookieObject[cookieKey] : Object.keys(cookieObject).length > 0 ? cookieObject : undefined;
    };
    /**
     * @param {?} cookieKey
     * @param {?=} cookieOptions
     * @return {?}
     */
    LsnCookieService.prototype.remove = /**
     * @param {?} cookieKey
     * @param {?=} cookieOptions
     * @return {?}
     */
    function (cookieKey, cookieOptions) {
        if (cookieOptions === void 0) { cookieOptions = {}; }
        /** @type {?} */
        var cookie = this.get(cookieKey);
        if (cookie) {
            cookieOptions.expires = -1;
            this.set(cookieKey, '', cookieOptions);
            return true;
        }
        else {
            return false;
        }
    };
    LsnCookieService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    LsnCookieService.ctorParameters = function () { return [
        { type: LsnCookieConfig, decorators: [{ type: Inject, args: [LSN_COOKIE_CONFIG,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    /** @nocollapse */ LsnCookieService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function LsnCookieService_Factory() { return new LsnCookieService(i0.ɵɵinject(i1.LSN_COOKIE_CONFIG), i0.ɵɵinject(i2.DOCUMENT)); }, token: LsnCookieService, providedIn: "root" });
    return LsnCookieService;
}());
export { LsnCookieService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    LsnCookieService.prototype.cookieConfig;
    /** @type {?} */
    LsnCookieService.prototype.document;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNuLWNvb2tpZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9sc24tY29va2llL2xzbi1jb29raWUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBQyxpQkFBaUIsRUFBRSxlQUFlLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7QUFFekMsbUNBTUM7OztJQUxDLGdDQUF3Qjs7SUFDeEIsdUNBQXdCOztJQUN4Qiw2QkFBYzs7SUFDZCwrQkFBMEI7O0lBQzFCLCtCQUFpQjs7Ozs7QUFHbkIsbUNBTUM7Ozs7Ozs7O0lBTEMsbUZBQXdFOzs7OztJQUV4RSx1REFBNkI7Ozs7OztJQUU3Qix5RUFBOEQ7O0FBR2hFO0lBS0UsMEJBQStDLFlBQTZCLEVBQTZCLFFBQWE7UUFBdkUsaUJBQVksR0FBWixZQUFZLENBQWlCO1FBQTZCLGFBQVEsR0FBUixRQUFRLENBQUs7SUFDdEgsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7Ozs7O0lBQ0gsOEJBQUc7Ozs7Ozs7O0lBQUgsVUFBSSxTQUFpQixFQUFFLFdBQWdCLEVBQUUsYUFBNkI7O1lBQzlELE9BQU8sd0JBQ1IsYUFBYSxJQUNoQixNQUFNLEVBQUUsYUFBYSxJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxHQUN2RztRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRTtZQUNwQyxPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUN4Qjs7WUFDSyxLQUFLLEdBQUcs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LENBQUM7UUFFbEMsSUFBSSxNQUFNLEVBQUU7WUFDVixhQUFhLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQztZQUN2QyxPQUFPLElBQUksQ0FBQztTQUNiO2FBQU07WUFDTCxPQUFPLEtBQUssQ0FBQztTQUNkO0lBQ0gsQ0FBQzs7Z0JBaEdGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBckIwQixlQUFlLHVCQXdCM0IsTUFBTSxTQUFDLGlCQUFpQjtnREFBMEMsTUFBTSxTQUFDLFFBQVE7OzsyQkF6QmhHO0NBcUhDLEFBakdELElBaUdDO1NBOUZZLGdCQUFnQjs7Ozs7O0lBRWYsd0NBQWdFOztJQUFFLG9DQUF3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TFNOX0NPT0tJRV9DT05GSUcsIExzbkNvb2tpZUNvbmZpZ30gZnJvbSAnLi9tb2RlbHMvbHNuQ29va2llQ29uZmlnJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29va2llT3B0aW9ucyB7XG4gIGV4cGlyZXM/OiBudW1iZXIgfCBEYXRlO1xuICBleHBpcmF0aW9uVW5pdD86IHN0cmluZztcbiAgcGF0aD86IHN0cmluZztcbiAgZG9tYWluPzogc3RyaW5nIHwgYm9vbGVhbjtcbiAgc2VjdXJlPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb29raWVTZXJ2aWNlIHtcbiAgc2V0KGNvb2tpZUtleTogc3RyaW5nLCBjb29raWVWYWx1ZSwgY29va2llT3B0aW9uczogQ29va2llT3B0aW9ucyk6IHZvaWQ7XG5cbiAgZ2V0KGNvb2tpZUtleT86IHN0cmluZyk6IGFueTtcblxuICByZW1vdmUoY29va2llS2V5OiBzdHJpbmcsIGNvb2tpZU9wdGlvbnM6IENvb2tpZU9wdGlvbnMpOiB2b2lkO1xufVxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBMc25Db29raWVTZXJ2aWNlIGltcGxlbWVudHMgQ29va2llU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChMU05fQ09PS0lFX0NPTkZJRykgcHJpdmF0ZSBjb29raWVDb25maWc6IExzbkNvb2tpZUNvbmZpZywgQEluamVjdChET0NVTUVOVCkgcmVhZG9ubHkgZG9jdW1lbnQ6IGFueSkge1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgY29va2llIHdpdGggZ2l2ZW4ga2V5IHRvIGdpdmVuIHZhbHVlLCBjb29raWUgb3B0aW9ucyBhcmUgb3B0aW9uYWwsIGlmIG5vdCBzZXQsIHNvbWUgcHJvcGVydGllc1xuICAgKiAoc2VjdXJlIGFuZCBkb21haW4pIHdpbGwgYmUgc2V0IGZyb20gZ2xvYmFsIGNvb2tpZSBjb25maWdcbiAgICovXG4gIHNldChjb29raWVLZXk6IHN0cmluZywgY29va2llVmFsdWU6IGFueSwgY29va2llT3B0aW9ucz86IENvb2tpZU9wdGlvbnMpIHtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgLi4uY29va2llT3B0aW9ucyxcbiAgICAgIHNlY3VyZTogY29va2llT3B0aW9ucyAmJiBjb29raWVPcHRpb25zLnNlY3VyZSA/IGNvb2tpZU9wdGlvbnMuc2VjdXJlIDogdGhpcy5jb29raWVDb25maWcuc2VjdXJlQ29va2llc1xuICAgIH07XG4gICAgaWYgKCF0aGlzLmNvb2tpZUNvbmZpZy5kb21haW5Db29raWVzKSB7XG4gICAgICBvcHRpb25zLmRvbWFpbiA9IGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCB2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KGNvb2tpZVZhbHVlKTtcbiAgICBsZXQgZXhwaXJlc0ZvcjtcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5leHBpcmVzID09PSAnbnVtYmVyJykge1xuICAgICAgZXhwaXJlc0ZvciA9IG9wdGlvbnMuZXhwaXJlcztcbiAgICAgIG9wdGlvbnMuZXhwaXJlcyA9IG5ldyBEYXRlKCk7XG4gICAgICAvLyBUcnlpbmcgdG8gZGVsZXRlIGEgY29va2llOyBzZXQgYSBkYXRlIGZhciBpbiB0aGUgcGFzdFxuICAgICAgaWYgKGV4cGlyZXNGb3IgPT09IC0xKSB7XG4gICAgICAgIG9wdGlvbnMuZXhwaXJlcyA9IG5ldyBEYXRlKCdUaHUsIDAxIEphbiAxOTcwIDAwOjAwOjAwIEdNVCcpO1xuICAgICAgfSBlbHNlIGlmIChvcHRpb25zLmV4cGlyYXRpb25Vbml0KSB7XG4gICAgICAgIGlmIChvcHRpb25zLmV4cGlyYXRpb25Vbml0ID09PSAnaG91cnMnKSB7XG4gICAgICAgICAgb3B0aW9ucy5leHBpcmVzLnNldEhvdXJzKG9wdGlvbnMuZXhwaXJlcy5nZXRIb3VycygpICsgZXhwaXJlc0Zvcik7XG4gICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5leHBpcmF0aW9uVW5pdCA9PT0gJ21pbnV0ZXMnKSB7XG4gICAgICAgICAgb3B0aW9ucy5leHBpcmVzLnNldE1pbnV0ZXMob3B0aW9ucy5leHBpcmVzLmdldE1pbnV0ZXMoKSArIGV4cGlyZXNGb3IpO1xuICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMuZXhwaXJhdGlvblVuaXQgPT09ICdzZWNvbmRzJykge1xuICAgICAgICAgIG9wdGlvbnMuZXhwaXJlcy5zZXRTZWNvbmRzKG9wdGlvbnMuZXhwaXJlcy5nZXRTZWNvbmRzKCkgKyBleHBpcmVzRm9yKTtcbiAgICAgICAgfSBlbHNlIGlmIChvcHRpb25zLmV4cGlyYXRpb25Vbml0ID09PSAnbWlsbGlzZWNvbmRzJykge1xuICAgICAgICAgIG9wdGlvbnMuZXhwaXJlcy5zZXRNaWxsaXNlY29uZHMob3B0aW9ucy5leHBpcmVzLmdldE1pbGxpc2Vjb25kcygpICsgZXhwaXJlc0Zvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb3B0aW9ucy5leHBpcmVzLnNldERhdGUob3B0aW9ucy5leHBpcmVzLmdldERhdGUoKSArIGV4cGlyZXNGb3IpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcHRpb25zLmV4cGlyZXMuc2V0RGF0ZShvcHRpb25zLmV4cGlyZXMuZ2V0RGF0ZSgpICsgZXhwaXJlc0Zvcik7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuZG9jdW1lbnQuY29va2llID0gW1xuICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KGNvb2tpZUtleSksXG4gICAgICAnPScsXG4gICAgICBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpLFxuICAgICAgb3B0aW9ucy5leHBpcmVzID8gJzsgZXhwaXJlcz0nICsgb3B0aW9ucy5leHBpcmVzLnRvVVRDU3RyaW5nKCkgOiAnJyxcbiAgICAgIG9wdGlvbnMucGF0aCA/ICc7IHBhdGg9JyArIG9wdGlvbnMucGF0aCA6ICcnLFxuICAgICAgb3B0aW9ucy5kb21haW4gPyAnOyBkb21haW49JyArIG9wdGlvbnMuZG9tYWluIDogJycsXG4gICAgICBvcHRpb25zLnNlY3VyZSA/ICc7IHNlY3VyZScgOiAnJ1xuICAgIF0uam9pbignJyk7XG4gIH1cblxuICAvKipcbiAgICogS2V5IHByb3ZpZGVkIC0gcmV0dXJucyB2YWx1ZSBvZiBnaXZlbiBjb29raWUgb3IgdW5kZWZpbmVkIGlmIG5vbiBleGlzdGVudFxuICAgKiBLZXkgbm90IHByb3ZpZGVkIC0gcmV0dXJucyBhbGwgY29va2llcyBhcyBPYmplY3Qgb3IgdW5kZWZpbmVkIGlmIHRoZXJlIGFyZSBubyBjb29raWVzXG4gICAqIENvb2tpZSB2YWx1ZXMgYXJlIEpTT04ucGFyc2VkLCBpZiBlcnJvciBvY2N1cnMgZHVyaW5nIHBhcnNpbmcsIHN0cmluZyB2YWx1ZSBpcyBhc3NpZ25lZFxuICAgKi9cbiAgZ2V0KGNvb2tpZUtleT86IHN0cmluZyk6IGFueSB7XG4gICAgY29uc3QgY29va2llU3RyaW5nTGlzdDogQXJyYXk8U3RyaW5nPiA9IHRoaXMuZG9jdW1lbnQuY29va2llID8gdGhpcy5kb2N1bWVudC5jb29raWUuc3BsaXQoJzsgJykgOiBbXTtcblxuICAgIGNvbnN0IGNvb2tpZU9iamVjdCA9IGNvb2tpZVN0cmluZ0xpc3RcbiAgICAgIC5tYXAoY29va2llU3RyaW5nID0+IHtcbiAgICAgICAgY29uc3QgcG9zID0gY29va2llU3RyaW5nLmluZGV4T2YoJz0nKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBuYW1lOiBjb29raWVTdHJpbmcuc3Vic3RyKDAsIHBvcyksXG4gICAgICAgICAgdmFsdWU6IGRlY29kZVVSSUNvbXBvbmVudChjb29raWVTdHJpbmcuc3Vic3RyKHBvcyArIDEpKVxuICAgICAgICB9O1xuICAgICAgfSkuZmlsdGVyKGNvb2tpZSA9PiB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgY29va2llLnZhbHVlICE9PSAndW5kZWZpbmVkJyAmJiAoY29va2llS2V5ID09PSB1bmRlZmluZWQgfHwgY29va2llS2V5ID09PSBjb29raWUubmFtZSk7XG4gICAgICB9KS5yZWR1Y2UoKHByZXZpb3VzVmFsdWU6IG9iamVjdCwgY3VycmVudFZhbHVlOiB7IG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSB9KSA9PiB7XG4gICAgICAgIGxldCB2YWx1ZSA9IG51bGw7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdmFsdWUgPSBKU09OLnBhcnNlKGN1cnJlbnRWYWx1ZS52YWx1ZSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICB2YWx1ZSA9IGN1cnJlbnRWYWx1ZS52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBwcmV2aW91c1ZhbHVlW2N1cnJlbnRWYWx1ZS5uYW1lXSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gcHJldmlvdXNWYWx1ZTtcbiAgICAgIH0sIHt9KTtcbiAgICByZXR1cm4gY29va2llS2V5ID8gY29va2llT2JqZWN0W2Nvb2tpZUtleV0gOiBPYmplY3Qua2V5cyhjb29raWVPYmplY3QpLmxlbmd0aCA+IDAgPyBjb29raWVPYmplY3QgOiB1bmRlZmluZWQ7XG4gIH1cblxuICByZW1vdmUoY29va2llS2V5OiBzdHJpbmcsIGNvb2tpZU9wdGlvbnM6IENvb2tpZU9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IGNvb2tpZSA9IHRoaXMuZ2V0KGNvb2tpZUtleSk7XG5cbiAgICBpZiAoY29va2llKSB7XG4gICAgICBjb29raWVPcHRpb25zLmV4cGlyZXMgPSAtMTtcbiAgICAgIHRoaXMuc2V0KGNvb2tpZUtleSwgJycsIGNvb2tpZU9wdGlvbnMpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==