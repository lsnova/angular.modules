/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/lsn-cookie/lsn-cookie.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __assign } from "tslib";
import { Inject, Injectable } from '@angular/core';
import { LSN_COOKIE_CONFIG, LsnCookieConfig } from './lsnCookieConfig';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "./lsnCookieConfig";
import * as i2 from "@angular/common";
/**
 * @record
 */
export function LsnCookieOptions() { }
if (false) {
    /** @type {?|undefined} */
    LsnCookieOptions.prototype.expires;
    /** @type {?|undefined} */
    LsnCookieOptions.prototype.expirationUnit;
    /** @type {?|undefined} */
    LsnCookieOptions.prototype.path;
    /** @type {?|undefined} */
    LsnCookieOptions.prototype.domain;
    /** @type {?|undefined} */
    LsnCookieOptions.prototype.secure;
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
        var options = __assign(__assign({}, cookieOptions), { secure: cookieOptions && cookieOptions.secure ? cookieOptions.secure : this.cookieConfig.secureCookies });
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
            .map((/**
         * @param {?} cookieString
         * @return {?}
         */
        function (cookieString) {
            /** @type {?} */
            var pos = cookieString.indexOf('=');
            return {
                name: cookieString.substr(0, pos),
                value: decodeURIComponent(cookieString.substr(pos + 1))
            };
        })).filter((/**
         * @param {?} cookie
         * @return {?}
         */
        function (cookie) {
            return typeof cookie.value !== 'undefined' && (cookieKey === undefined || cookieKey === cookie.name);
        })).reduce((/**
         * @param {?} previousValue
         * @param {?} currentValue
         * @return {?}
         */
        function (previousValue, currentValue) {
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
        }), {});
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
    /** @nocollapse */ LsnCookieService.ɵprov = i0.ɵɵdefineInjectable({ factory: function LsnCookieService_Factory() { return new LsnCookieService(i0.ɵɵinject(i1.LSN_COOKIE_CONFIG), i0.ɵɵinject(i2.DOCUMENT)); }, token: LsnCookieService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNuLWNvb2tpZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9sc24tY29va2llL2xzbi1jb29raWUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsZUFBZSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDckUsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDOzs7Ozs7O0FBRXpDLHNDQU1DOzs7SUFMQyxtQ0FBd0I7O0lBQ3hCLDBDQUF3Qjs7SUFDeEIsZ0NBQWM7O0lBQ2Qsa0NBQTBCOztJQUMxQixrQ0FBaUI7Ozs7O0FBR25CLG1DQU1DOzs7Ozs7OztJQUxDLG1GQUEyRTs7Ozs7SUFFM0UsdURBQTZCOzs7Ozs7SUFFN0IseUVBQWlFOztBQUduRTtJQUtFLDBCQUErQyxZQUE2QixFQUE2QixRQUFhO1FBQXZFLGlCQUFZLEdBQVosWUFBWSxDQUFpQjtRQUE2QixhQUFRLEdBQVIsUUFBUSxDQUFLO0lBQ3RILENBQUM7SUFFRDs7O09BR0c7Ozs7Ozs7OztJQUNILDhCQUFHOzs7Ozs7OztJQUFILFVBQUksU0FBaUIsRUFBRSxXQUFnQixFQUFFLGFBQWdDOztZQUNqRSxPQUFPLHlCQUNSLGFBQWEsS0FDaEIsTUFBTSxFQUFFLGFBQWEsSUFBSSxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsR0FDdkc7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUU7WUFDcEMsT0FBTyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDeEI7O1lBQ0ssS0FBSyxHQUFH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RyxDQUFDLFNBQVMsQ0FBQztRQUVsQyxJQUFJLE1BQU0sRUFBRTtZQUNWLGFBQWEsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsRUFBRSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQ3ZDLE9BQU8sSUFBSSxDQUFDO1NBQ2I7YUFBTTtZQUNMLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7SUFDSCxDQUFDOztnQkFoR0YsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFyQjBCLGVBQWUsdUJBd0IzQixNQUFNLFNBQUMsaUJBQWlCO2dEQUEwQyxNQUFNLFNBQUMsUUFBUTs7OzJCQXpCaEc7Q0FxSEMsQUFqR0QsSUFpR0M7U0E5RlksZ0JBQWdCOzs7Ozs7SUFFZix3Q0FBZ0U7O0lBQUUsb0NBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtMU05fQ09PS0lFX0NPTkZJRywgTHNuQ29va2llQ29uZmlnfSBmcm9tICcuL2xzbkNvb2tpZUNvbmZpZyc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5leHBvcnQgaW50ZXJmYWNlIExzbkNvb2tpZU9wdGlvbnMge1xuICBleHBpcmVzPzogbnVtYmVyIHwgRGF0ZTtcbiAgZXhwaXJhdGlvblVuaXQ/OiBzdHJpbmc7XG4gIHBhdGg/OiBzdHJpbmc7XG4gIGRvbWFpbj86IHN0cmluZyB8IGJvb2xlYW47XG4gIHNlY3VyZT86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29va2llU2VydmljZSB7XG4gIHNldChjb29raWVLZXk6IHN0cmluZywgY29va2llVmFsdWUsIGNvb2tpZU9wdGlvbnM6IExzbkNvb2tpZU9wdGlvbnMpOiB2b2lkO1xuXG4gIGdldChjb29raWVLZXk/OiBzdHJpbmcpOiBhbnk7XG5cbiAgcmVtb3ZlKGNvb2tpZUtleTogc3RyaW5nLCBjb29raWVPcHRpb25zOiBMc25Db29raWVPcHRpb25zKTogdm9pZDtcbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTHNuQ29va2llU2VydmljZSBpbXBsZW1lbnRzIENvb2tpZVNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoTFNOX0NPT0tJRV9DT05GSUcpIHByaXZhdGUgY29va2llQ29uZmlnOiBMc25Db29raWVDb25maWcsIEBJbmplY3QoRE9DVU1FTlQpIHJlYWRvbmx5IGRvY3VtZW50OiBhbnkpIHtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIGNvb2tpZSB3aXRoIGdpdmVuIGtleSB0byBnaXZlbiB2YWx1ZSwgY29va2llIG9wdGlvbnMgYXJlIG9wdGlvbmFsLCBpZiBub3Qgc2V0LCBzb21lIHByb3BlcnRpZXNcbiAgICogKHNlY3VyZSBhbmQgZG9tYWluKSB3aWxsIGJlIHNldCBmcm9tIGdsb2JhbCBjb29raWUgY29uZmlnXG4gICAqL1xuICBzZXQoY29va2llS2V5OiBzdHJpbmcsIGNvb2tpZVZhbHVlOiBhbnksIGNvb2tpZU9wdGlvbnM/OiBMc25Db29raWVPcHRpb25zKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIC4uLmNvb2tpZU9wdGlvbnMsXG4gICAgICBzZWN1cmU6IGNvb2tpZU9wdGlvbnMgJiYgY29va2llT3B0aW9ucy5zZWN1cmUgPyBjb29raWVPcHRpb25zLnNlY3VyZSA6IHRoaXMuY29va2llQ29uZmlnLnNlY3VyZUNvb2tpZXNcbiAgICB9O1xuICAgIGlmICghdGhpcy5jb29raWVDb25maWcuZG9tYWluQ29va2llcykge1xuICAgICAgb3B0aW9ucy5kb21haW4gPSBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSBKU09OLnN0cmluZ2lmeShjb29raWVWYWx1ZSk7XG4gICAgbGV0IGV4cGlyZXNGb3I7XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuZXhwaXJlcyA9PT0gJ251bWJlcicpIHtcbiAgICAgIGV4cGlyZXNGb3IgPSBvcHRpb25zLmV4cGlyZXM7XG4gICAgICBvcHRpb25zLmV4cGlyZXMgPSBuZXcgRGF0ZSgpO1xuICAgICAgLy8gVHJ5aW5nIHRvIGRlbGV0ZSBhIGNvb2tpZTsgc2V0IGEgZGF0ZSBmYXIgaW4gdGhlIHBhc3RcbiAgICAgIGlmIChleHBpcmVzRm9yID09PSAtMSkge1xuICAgICAgICBvcHRpb25zLmV4cGlyZXMgPSBuZXcgRGF0ZSgnVGh1LCAwMSBKYW4gMTk3MCAwMDowMDowMCBHTVQnKTtcbiAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5leHBpcmF0aW9uVW5pdCkge1xuICAgICAgICBpZiAob3B0aW9ucy5leHBpcmF0aW9uVW5pdCA9PT0gJ2hvdXJzJykge1xuICAgICAgICAgIG9wdGlvbnMuZXhwaXJlcy5zZXRIb3VycyhvcHRpb25zLmV4cGlyZXMuZ2V0SG91cnMoKSArIGV4cGlyZXNGb3IpO1xuICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMuZXhwaXJhdGlvblVuaXQgPT09ICdtaW51dGVzJykge1xuICAgICAgICAgIG9wdGlvbnMuZXhwaXJlcy5zZXRNaW51dGVzKG9wdGlvbnMuZXhwaXJlcy5nZXRNaW51dGVzKCkgKyBleHBpcmVzRm9yKTtcbiAgICAgICAgfSBlbHNlIGlmIChvcHRpb25zLmV4cGlyYXRpb25Vbml0ID09PSAnc2Vjb25kcycpIHtcbiAgICAgICAgICBvcHRpb25zLmV4cGlyZXMuc2V0U2Vjb25kcyhvcHRpb25zLmV4cGlyZXMuZ2V0U2Vjb25kcygpICsgZXhwaXJlc0Zvcik7XG4gICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5leHBpcmF0aW9uVW5pdCA9PT0gJ21pbGxpc2Vjb25kcycpIHtcbiAgICAgICAgICBvcHRpb25zLmV4cGlyZXMuc2V0TWlsbGlzZWNvbmRzKG9wdGlvbnMuZXhwaXJlcy5nZXRNaWxsaXNlY29uZHMoKSArIGV4cGlyZXNGb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9wdGlvbnMuZXhwaXJlcy5zZXREYXRlKG9wdGlvbnMuZXhwaXJlcy5nZXREYXRlKCkgKyBleHBpcmVzRm9yKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3B0aW9ucy5leHBpcmVzLnNldERhdGUob3B0aW9ucy5leHBpcmVzLmdldERhdGUoKSArIGV4cGlyZXNGb3IpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmRvY3VtZW50LmNvb2tpZSA9IFtcbiAgICAgIGVuY29kZVVSSUNvbXBvbmVudChjb29raWVLZXkpLFxuICAgICAgJz0nLFxuICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSxcbiAgICAgIG9wdGlvbnMuZXhwaXJlcyA/ICc7IGV4cGlyZXM9JyArIG9wdGlvbnMuZXhwaXJlcy50b1VUQ1N0cmluZygpIDogJycsXG4gICAgICBvcHRpb25zLnBhdGggPyAnOyBwYXRoPScgKyBvcHRpb25zLnBhdGggOiAnJyxcbiAgICAgIG9wdGlvbnMuZG9tYWluID8gJzsgZG9tYWluPScgKyBvcHRpb25zLmRvbWFpbiA6ICcnLFxuICAgICAgb3B0aW9ucy5zZWN1cmUgPyAnOyBzZWN1cmUnIDogJydcbiAgICBdLmpvaW4oJycpO1xuICB9XG5cbiAgLyoqXG4gICAqIEtleSBwcm92aWRlZCAtIHJldHVybnMgdmFsdWUgb2YgZ2l2ZW4gY29va2llIG9yIHVuZGVmaW5lZCBpZiBub24gZXhpc3RlbnRcbiAgICogS2V5IG5vdCBwcm92aWRlZCAtIHJldHVybnMgYWxsIGNvb2tpZXMgYXMgT2JqZWN0IG9yIHVuZGVmaW5lZCBpZiB0aGVyZSBhcmUgbm8gY29va2llc1xuICAgKiBDb29raWUgdmFsdWVzIGFyZSBKU09OLnBhcnNlZCwgaWYgZXJyb3Igb2NjdXJzIGR1cmluZyBwYXJzaW5nLCBzdHJpbmcgdmFsdWUgaXMgYXNzaWduZWRcbiAgICovXG4gIGdldChjb29raWVLZXk/OiBzdHJpbmcpOiBhbnkge1xuICAgIGNvbnN0IGNvb2tpZVN0cmluZ0xpc3Q6IEFycmF5PFN0cmluZz4gPSB0aGlzLmRvY3VtZW50LmNvb2tpZSA/IHRoaXMuZG9jdW1lbnQuY29va2llLnNwbGl0KCc7ICcpIDogW107XG5cbiAgICBjb25zdCBjb29raWVPYmplY3QgPSBjb29raWVTdHJpbmdMaXN0XG4gICAgICAubWFwKGNvb2tpZVN0cmluZyA9PiB7XG4gICAgICAgIGNvbnN0IHBvcyA9IGNvb2tpZVN0cmluZy5pbmRleE9mKCc9Jyk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbmFtZTogY29va2llU3RyaW5nLnN1YnN0cigwLCBwb3MpLFxuICAgICAgICAgIHZhbHVlOiBkZWNvZGVVUklDb21wb25lbnQoY29va2llU3RyaW5nLnN1YnN0cihwb3MgKyAxKSlcbiAgICAgICAgfTtcbiAgICAgIH0pLmZpbHRlcihjb29raWUgPT4ge1xuICAgICAgICByZXR1cm4gdHlwZW9mIGNvb2tpZS52YWx1ZSAhPT0gJ3VuZGVmaW5lZCcgJiYgKGNvb2tpZUtleSA9PT0gdW5kZWZpbmVkIHx8IGNvb2tpZUtleSA9PT0gY29va2llLm5hbWUpO1xuICAgICAgfSkucmVkdWNlKChwcmV2aW91c1ZhbHVlOiBvYmplY3QsIGN1cnJlbnRWYWx1ZTogeyBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkgfSkgPT4ge1xuICAgICAgICBsZXQgdmFsdWUgPSBudWxsO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHZhbHVlID0gSlNPTi5wYXJzZShjdXJyZW50VmFsdWUudmFsdWUpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgdmFsdWUgPSBjdXJyZW50VmFsdWUudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcHJldmlvdXNWYWx1ZVtjdXJyZW50VmFsdWUubmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHByZXZpb3VzVmFsdWU7XG4gICAgICB9LCB7fSk7XG4gICAgcmV0dXJuIGNvb2tpZUtleSA/IGNvb2tpZU9iamVjdFtjb29raWVLZXldIDogT2JqZWN0LmtleXMoY29va2llT2JqZWN0KS5sZW5ndGggPiAwID8gY29va2llT2JqZWN0IDogdW5kZWZpbmVkO1xuICB9XG5cbiAgcmVtb3ZlKGNvb2tpZUtleTogc3RyaW5nLCBjb29raWVPcHRpb25zOiBMc25Db29raWVPcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBjb29raWUgPSB0aGlzLmdldChjb29raWVLZXkpO1xuXG4gICAgaWYgKGNvb2tpZSkge1xuICAgICAgY29va2llT3B0aW9ucy5leHBpcmVzID0gLTE7XG4gICAgICB0aGlzLnNldChjb29raWVLZXksICcnLCBjb29raWVPcHRpb25zKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG59XG4iXX0=