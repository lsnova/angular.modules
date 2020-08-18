/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/lsn-cookie/lsn-cookie.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class LsnCookieService {
    /**
     * @param {?} cookieConfig
     * @param {?} document
     */
    constructor(cookieConfig, document) {
        this.cookieConfig = cookieConfig;
        this.document = document;
    }
    /**
     * Sets cookie with given key to given value, cookie options are optional, if not set, some properties
     * (secure and domain) will be set from global cookie config
     * @param {?} cookieKey
     * @param {?} cookieValue
     * @param {?=} cookieOptions
     * @return {?}
     */
    set(cookieKey, cookieValue, cookieOptions) {
        /** @type {?} */
        const options = Object.assign(Object.assign({}, cookieOptions), { secure: cookieOptions && cookieOptions.secure ? cookieOptions.secure : this.cookieConfig.secureCookies });
        if (!this.cookieConfig.domainCookies) {
            options.domain = false;
        }
        /** @type {?} */
        const value = JSON.stringify(cookieValue);
        /** @type {?} */
        let expiresFor;
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
    }
    /**
     * Key provided - returns value of given cookie or undefined if non existent
     * Key not provided - returns all cookies as Object or undefined if there are no cookies
     * Cookie values are JSON.parsed, if error occurs during parsing, string value is assigned
     * @param {?=} cookieKey
     * @return {?}
     */
    get(cookieKey) {
        /** @type {?} */
        const cookieStringList = this.document.cookie ? this.document.cookie.split('; ') : [];
        /** @type {?} */
        const cookieObject = cookieStringList
            .map((/**
         * @param {?} cookieString
         * @return {?}
         */
        cookieString => {
            /** @type {?} */
            const pos = cookieString.indexOf('=');
            return {
                name: cookieString.substr(0, pos),
                value: decodeURIComponent(cookieString.substr(pos + 1))
            };
        })).filter((/**
         * @param {?} cookie
         * @return {?}
         */
        cookie => {
            return typeof cookie.value !== 'undefined' && (cookieKey === undefined || cookieKey === cookie.name);
        })).reduce((/**
         * @param {?} previousValue
         * @param {?} currentValue
         * @return {?}
         */
        (previousValue, currentValue) => {
            /** @type {?} */
            let value = null;
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
    }
    /**
     * @param {?} cookieKey
     * @param {?=} cookieOptions
     * @return {?}
     */
    remove(cookieKey, cookieOptions = {}) {
        /** @type {?} */
        const cookie = this.get(cookieKey);
        if (cookie) {
            cookieOptions.expires = -1;
            this.set(cookieKey, '', cookieOptions);
            return true;
        }
        else {
            return false;
        }
    }
}
LsnCookieService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
LsnCookieService.ctorParameters = () => [
    { type: LsnCookieConfig, decorators: [{ type: Inject, args: [LSN_COOKIE_CONFIG,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
/** @nocollapse */ LsnCookieService.ɵprov = i0.ɵɵdefineInjectable({ factory: function LsnCookieService_Factory() { return new LsnCookieService(i0.ɵɵinject(i1.LSN_COOKIE_CONFIG), i0.ɵɵinject(i2.DOCUMENT)); }, token: LsnCookieService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    LsnCookieService.prototype.cookieConfig;
    /** @type {?} */
    LsnCookieService.prototype.document;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNuLWNvb2tpZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9sc24tY29va2llL2xzbi1jb29raWUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBQyxpQkFBaUIsRUFBRSxlQUFlLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNyRSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7QUFFekMsc0NBTUM7OztJQUxDLG1DQUF3Qjs7SUFDeEIsMENBQXdCOztJQUN4QixnQ0FBYzs7SUFDZCxrQ0FBMEI7O0lBQzFCLGtDQUFpQjs7Ozs7QUFHbkIsbUNBTUM7Ozs7Ozs7O0lBTEMsbUZBQTJFOzs7OztJQUUzRSx1REFBNkI7Ozs7OztJQUU3Qix5RUFBaUU7O0FBTW5FLE1BQU0sT0FBTyxnQkFBZ0I7Ozs7O0lBRTNCLFlBQStDLFlBQTZCLEVBQTZCLFFBQWE7UUFBdkUsaUJBQVksR0FBWixZQUFZLENBQWlCO1FBQTZCLGFBQVEsR0FBUixRQUFRLENBQUs7SUFDdEgsQ0FBQzs7Ozs7Ozs7O0lBTUQsR0FBRyxDQUFDLFNBQWlCLEVBQUUsV0FBZ0IsRUFBRSxhQUFnQzs7Y0FDakUsT0FBTyxtQ0FDUixhQUFhLEtBQ2hCLE1BQU0sRUFBRSxhQUFhLElBQUksYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEdBQ3ZHO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFO1lBQ3BDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1NBQ3hCOztjQUNLLEtBQUssR0FBRyxJQUFJ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O1lBQ1YsYUFBYSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxFQUFFLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDdkMsT0FBTyxJQUFJLENBQUM7U0FDYjthQUFNO1lBQ0wsT0FBTyxLQUFLLENBQUM7U0FDZDtJQUNILENBQUM7OztZQWhHRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFyQjBCLGVBQWUsdUJBd0IzQixNQUFNLFNBQUMsaUJBQWlCOzRDQUEwQyxNQUFNLFNBQUMsUUFBUTs7Ozs7Ozs7SUFBbEYsd0NBQWdFOztJQUFFLG9DQUF3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TFNOX0NPT0tJRV9DT05GSUcsIExzbkNvb2tpZUNvbmZpZ30gZnJvbSAnLi9sc25Db29raWVDb25maWcnO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuZXhwb3J0IGludGVyZmFjZSBMc25Db29raWVPcHRpb25zIHtcbiAgZXhwaXJlcz86IG51bWJlciB8IERhdGU7XG4gIGV4cGlyYXRpb25Vbml0Pzogc3RyaW5nO1xuICBwYXRoPzogc3RyaW5nO1xuICBkb21haW4/OiBzdHJpbmcgfCBib29sZWFuO1xuICBzZWN1cmU/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvb2tpZVNlcnZpY2Uge1xuICBzZXQoY29va2llS2V5OiBzdHJpbmcsIGNvb2tpZVZhbHVlLCBjb29raWVPcHRpb25zOiBMc25Db29raWVPcHRpb25zKTogdm9pZDtcblxuICBnZXQoY29va2llS2V5Pzogc3RyaW5nKTogYW55O1xuXG4gIHJlbW92ZShjb29raWVLZXk6IHN0cmluZywgY29va2llT3B0aW9uczogTHNuQ29va2llT3B0aW9ucyk6IHZvaWQ7XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIExzbkNvb2tpZVNlcnZpY2UgaW1wbGVtZW50cyBDb29raWVTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KExTTl9DT09LSUVfQ09ORklHKSBwcml2YXRlIGNvb2tpZUNvbmZpZzogTHNuQ29va2llQ29uZmlnLCBASW5qZWN0KERPQ1VNRU5UKSByZWFkb25seSBkb2N1bWVudDogYW55KSB7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBjb29raWUgd2l0aCBnaXZlbiBrZXkgdG8gZ2l2ZW4gdmFsdWUsIGNvb2tpZSBvcHRpb25zIGFyZSBvcHRpb25hbCwgaWYgbm90IHNldCwgc29tZSBwcm9wZXJ0aWVzXG4gICAqIChzZWN1cmUgYW5kIGRvbWFpbikgd2lsbCBiZSBzZXQgZnJvbSBnbG9iYWwgY29va2llIGNvbmZpZ1xuICAgKi9cbiAgc2V0KGNvb2tpZUtleTogc3RyaW5nLCBjb29raWVWYWx1ZTogYW55LCBjb29raWVPcHRpb25zPzogTHNuQ29va2llT3B0aW9ucykge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAuLi5jb29raWVPcHRpb25zLFxuICAgICAgc2VjdXJlOiBjb29raWVPcHRpb25zICYmIGNvb2tpZU9wdGlvbnMuc2VjdXJlID8gY29va2llT3B0aW9ucy5zZWN1cmUgOiB0aGlzLmNvb2tpZUNvbmZpZy5zZWN1cmVDb29raWVzXG4gICAgfTtcbiAgICBpZiAoIXRoaXMuY29va2llQ29uZmlnLmRvbWFpbkNvb2tpZXMpIHtcbiAgICAgIG9wdGlvbnMuZG9tYWluID0gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHZhbHVlID0gSlNPTi5zdHJpbmdpZnkoY29va2llVmFsdWUpO1xuICAgIGxldCBleHBpcmVzRm9yO1xuXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLmV4cGlyZXMgPT09ICdudW1iZXInKSB7XG4gICAgICBleHBpcmVzRm9yID0gb3B0aW9ucy5leHBpcmVzO1xuICAgICAgb3B0aW9ucy5leHBpcmVzID0gbmV3IERhdGUoKTtcbiAgICAgIC8vIFRyeWluZyB0byBkZWxldGUgYSBjb29raWU7IHNldCBhIGRhdGUgZmFyIGluIHRoZSBwYXN0XG4gICAgICBpZiAoZXhwaXJlc0ZvciA9PT0gLTEpIHtcbiAgICAgICAgb3B0aW9ucy5leHBpcmVzID0gbmV3IERhdGUoJ1RodSwgMDEgSmFuIDE5NzAgMDA6MDA6MDAgR01UJyk7XG4gICAgICB9IGVsc2UgaWYgKG9wdGlvbnMuZXhwaXJhdGlvblVuaXQpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuZXhwaXJhdGlvblVuaXQgPT09ICdob3VycycpIHtcbiAgICAgICAgICBvcHRpb25zLmV4cGlyZXMuc2V0SG91cnMob3B0aW9ucy5leHBpcmVzLmdldEhvdXJzKCkgKyBleHBpcmVzRm9yKTtcbiAgICAgICAgfSBlbHNlIGlmIChvcHRpb25zLmV4cGlyYXRpb25Vbml0ID09PSAnbWludXRlcycpIHtcbiAgICAgICAgICBvcHRpb25zLmV4cGlyZXMuc2V0TWludXRlcyhvcHRpb25zLmV4cGlyZXMuZ2V0TWludXRlcygpICsgZXhwaXJlc0Zvcik7XG4gICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5leHBpcmF0aW9uVW5pdCA9PT0gJ3NlY29uZHMnKSB7XG4gICAgICAgICAgb3B0aW9ucy5leHBpcmVzLnNldFNlY29uZHMob3B0aW9ucy5leHBpcmVzLmdldFNlY29uZHMoKSArIGV4cGlyZXNGb3IpO1xuICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMuZXhwaXJhdGlvblVuaXQgPT09ICdtaWxsaXNlY29uZHMnKSB7XG4gICAgICAgICAgb3B0aW9ucy5leHBpcmVzLnNldE1pbGxpc2Vjb25kcyhvcHRpb25zLmV4cGlyZXMuZ2V0TWlsbGlzZWNvbmRzKCkgKyBleHBpcmVzRm9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvcHRpb25zLmV4cGlyZXMuc2V0RGF0ZShvcHRpb25zLmV4cGlyZXMuZ2V0RGF0ZSgpICsgZXhwaXJlc0Zvcik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9wdGlvbnMuZXhwaXJlcy5zZXREYXRlKG9wdGlvbnMuZXhwaXJlcy5nZXREYXRlKCkgKyBleHBpcmVzRm9yKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5kb2N1bWVudC5jb29raWUgPSBbXG4gICAgICBlbmNvZGVVUklDb21wb25lbnQoY29va2llS2V5KSxcbiAgICAgICc9JyxcbiAgICAgIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSksXG4gICAgICBvcHRpb25zLmV4cGlyZXMgPyAnOyBleHBpcmVzPScgKyBvcHRpb25zLmV4cGlyZXMudG9VVENTdHJpbmcoKSA6ICcnLFxuICAgICAgb3B0aW9ucy5wYXRoID8gJzsgcGF0aD0nICsgb3B0aW9ucy5wYXRoIDogJycsXG4gICAgICBvcHRpb25zLmRvbWFpbiA/ICc7IGRvbWFpbj0nICsgb3B0aW9ucy5kb21haW4gOiAnJyxcbiAgICAgIG9wdGlvbnMuc2VjdXJlID8gJzsgc2VjdXJlJyA6ICcnXG4gICAgXS5qb2luKCcnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBLZXkgcHJvdmlkZWQgLSByZXR1cm5zIHZhbHVlIG9mIGdpdmVuIGNvb2tpZSBvciB1bmRlZmluZWQgaWYgbm9uIGV4aXN0ZW50XG4gICAqIEtleSBub3QgcHJvdmlkZWQgLSByZXR1cm5zIGFsbCBjb29raWVzIGFzIE9iamVjdCBvciB1bmRlZmluZWQgaWYgdGhlcmUgYXJlIG5vIGNvb2tpZXNcbiAgICogQ29va2llIHZhbHVlcyBhcmUgSlNPTi5wYXJzZWQsIGlmIGVycm9yIG9jY3VycyBkdXJpbmcgcGFyc2luZywgc3RyaW5nIHZhbHVlIGlzIGFzc2lnbmVkXG4gICAqL1xuICBnZXQoY29va2llS2V5Pzogc3RyaW5nKTogYW55IHtcbiAgICBjb25zdCBjb29raWVTdHJpbmdMaXN0OiBBcnJheTxTdHJpbmc+ID0gdGhpcy5kb2N1bWVudC5jb29raWUgPyB0aGlzLmRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOyAnKSA6IFtdO1xuXG4gICAgY29uc3QgY29va2llT2JqZWN0ID0gY29va2llU3RyaW5nTGlzdFxuICAgICAgLm1hcChjb29raWVTdHJpbmcgPT4ge1xuICAgICAgICBjb25zdCBwb3MgPSBjb29raWVTdHJpbmcuaW5kZXhPZignPScpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG5hbWU6IGNvb2tpZVN0cmluZy5zdWJzdHIoMCwgcG9zKSxcbiAgICAgICAgICB2YWx1ZTogZGVjb2RlVVJJQ29tcG9uZW50KGNvb2tpZVN0cmluZy5zdWJzdHIocG9zICsgMSkpXG4gICAgICAgIH07XG4gICAgICB9KS5maWx0ZXIoY29va2llID0+IHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBjb29raWUudmFsdWUgIT09ICd1bmRlZmluZWQnICYmIChjb29raWVLZXkgPT09IHVuZGVmaW5lZCB8fCBjb29raWVLZXkgPT09IGNvb2tpZS5uYW1lKTtcbiAgICAgIH0pLnJlZHVjZSgocHJldmlvdXNWYWx1ZTogb2JqZWN0LCBjdXJyZW50VmFsdWU6IHsgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55IH0pID0+IHtcbiAgICAgICAgbGV0IHZhbHVlID0gbnVsbDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB2YWx1ZSA9IEpTT04ucGFyc2UoY3VycmVudFZhbHVlLnZhbHVlKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHZhbHVlID0gY3VycmVudFZhbHVlLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHByZXZpb3VzVmFsdWVbY3VycmVudFZhbHVlLm5hbWVdID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBwcmV2aW91c1ZhbHVlO1xuICAgICAgfSwge30pO1xuICAgIHJldHVybiBjb29raWVLZXkgPyBjb29raWVPYmplY3RbY29va2llS2V5XSA6IE9iamVjdC5rZXlzKGNvb2tpZU9iamVjdCkubGVuZ3RoID4gMCA/IGNvb2tpZU9iamVjdCA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHJlbW92ZShjb29raWVLZXk6IHN0cmluZywgY29va2llT3B0aW9uczogTHNuQ29va2llT3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgY29va2llID0gdGhpcy5nZXQoY29va2llS2V5KTtcblxuICAgIGlmIChjb29raWUpIHtcbiAgICAgIGNvb2tpZU9wdGlvbnMuZXhwaXJlcyA9IC0xO1xuICAgICAgdGhpcy5zZXQoY29va2llS2V5LCAnJywgY29va2llT3B0aW9ucyk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxufVxuIl19