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
     * @param {?} cookieKey
     * @param {?} cookieValue
     * @param {?} cookieOptions
     * @return {?}
     */
    LsnCookieService.prototype.set = /**
     * @param {?} cookieKey
     * @param {?} cookieValue
     * @param {?} cookieOptions
     * @return {?}
     */
    function (cookieKey, cookieValue, cookieOptions) {
        /** @type {?} */
        var options = tslib_1.__assign({ secure: this.cookieConfig.secureCookies, domain: this.cookieConfig.domainCookies || false }, cookieOptions);
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
        return (this.document.cookie = [
            encodeURIComponent(cookieKey),
            '=',
            encodeURIComponent(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '',
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    };
    /**
     * @param {?=} cookieKey
     * @return {?}
     */
    LsnCookieService.prototype.get = /**
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
        return cookieKey ? cookieObject[cookieKey] : Object.keys(cookieObject).length > 0 ? cookieObject : null;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNuLWNvb2tpZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9sc24tY29va2llL2xzbi1jb29raWUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBQyxpQkFBaUIsRUFBRSxlQUFlLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7QUFFekMsbUNBTUM7OztJQUxDLGdDQUF3Qjs7SUFDeEIsdUNBQXdCOztJQUN4Qiw2QkFBYzs7SUFDZCwrQkFBZ0I7O0lBQ2hCLCtCQUFpQjs7Ozs7QUFHbkIsbUNBTUM7Ozs7Ozs7O0lBTEMsbUZBQXdFOzs7OztJQUV4RSx1REFBNkI7Ozs7OztJQUU3Qix5RUFBOEQ7O0FBR2hFO0lBS0UsMEJBQStDLFlBQTZCLEVBQTZCLFFBQWE7UUFBdkUsaUJBQVksR0FBWixZQUFZLENBQWlCO1FBQTZCLGFBQVEsR0FBUixRQUFRLENBQUs7SUFDdEgsQ0FBQzs7Ozs7OztJQUVELDhCQUFHOzs7Ozs7SUFBSCxVQUFJLFNBQWlCLEVBQUUsV0FBZ0IsRUFBRSxhQUE0Qjs7WUFDN0QsT0FBTyxzQkFDWCxNQUFNLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQ3ZDLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsSUFBSSxLQUFLLElBQzdDLGFBQWEsQ0FDakI7O1lBQ0ssS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDOztZQUNyQyxVQUFVO1FBRWQsSUFBSSxPQUFPLE9BQU8sQ0FBQyxPQUFPLEtBQUssUUFBUSxFQUFFO1lBQ3ZDLFVBQVUsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFD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QztZQUN2QyxPQUFPLElBQUksQ0FBQztTQUNiO2FBQU07WUFDTCxPQUFPLEtBQUssQ0FBQztTQUNkO0lBQ0gsQ0FBQzs7Z0JBckZGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBckIwQixlQUFlLHVCQXdCM0IsTUFBTSxTQUFDLGlCQUFpQjtnREFBMEMsTUFBTSxTQUFDLFFBQVE7OzsyQkF6QmhHO0NBMEdDLEFBdEZELElBc0ZDO1NBbkZZLGdCQUFnQjs7Ozs7O0lBRWYsd0NBQWdFOztJQUFFLG9DQUF3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TFNOX0NPT0tJRV9DT05GSUcsIExzbkNvb2tpZUNvbmZpZ30gZnJvbSAnLi9tb2RlbHMvbHNuQ29va2llQ29uZmlnJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29va2llT3B0aW9ucyB7XG4gIGV4cGlyZXM/OiBudW1iZXIgfCBEYXRlO1xuICBleHBpcmF0aW9uVW5pdD86IHN0cmluZztcbiAgcGF0aD86IHN0cmluZztcbiAgZG9tYWluPzogc3RyaW5nO1xuICBzZWN1cmU/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvb2tpZVNlcnZpY2Uge1xuICBzZXQoY29va2llS2V5OiBzdHJpbmcsIGNvb2tpZVZhbHVlLCBjb29raWVPcHRpb25zOiBDb29raWVPcHRpb25zKTogdm9pZDtcblxuICBnZXQoY29va2llS2V5Pzogc3RyaW5nKTogYW55O1xuXG4gIHJlbW92ZShjb29raWVLZXk6IHN0cmluZywgY29va2llT3B0aW9uczogQ29va2llT3B0aW9ucyk6IHZvaWQ7XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIExzbkNvb2tpZVNlcnZpY2UgaW1wbGVtZW50cyBDb29raWVTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KExTTl9DT09LSUVfQ09ORklHKSBwcml2YXRlIGNvb2tpZUNvbmZpZzogTHNuQ29va2llQ29uZmlnLCBASW5qZWN0KERPQ1VNRU5UKSByZWFkb25seSBkb2N1bWVudDogYW55KSB7XG4gIH1cblxuICBzZXQoY29va2llS2V5OiBzdHJpbmcsIGNvb2tpZVZhbHVlOiBhbnksIGNvb2tpZU9wdGlvbnM6IENvb2tpZU9wdGlvbnMpIHtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgc2VjdXJlOiB0aGlzLmNvb2tpZUNvbmZpZy5zZWN1cmVDb29raWVzLFxuICAgICAgZG9tYWluOiB0aGlzLmNvb2tpZUNvbmZpZy5kb21haW5Db29raWVzIHx8IGZhbHNlLFxuICAgICAgLi4uY29va2llT3B0aW9ucyxcbiAgICB9O1xuICAgIGNvbnN0IHZhbHVlID0gSlNPTi5zdHJpbmdpZnkoY29va2llVmFsdWUpO1xuICAgIGxldCBleHBpcmVzRm9yO1xuXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLmV4cGlyZXMgPT09ICdudW1iZXInKSB7XG4gICAgICBleHBpcmVzRm9yID0gb3B0aW9ucy5leHBpcmVzO1xuICAgICAgb3B0aW9ucy5leHBpcmVzID0gbmV3IERhdGUoKTtcbiAgICAgIC8vIFRyeWluZyB0byBkZWxldGUgYSBjb29raWU7IHNldCBhIGRhdGUgZmFyIGluIHRoZSBwYXN0XG4gICAgICBpZiAoZXhwaXJlc0ZvciA9PT0gLTEpIHtcbiAgICAgICAgb3B0aW9ucy5leHBpcmVzID0gbmV3IERhdGUoJ1RodSwgMDEgSmFuIDE5NzAgMDA6MDA6MDAgR01UJyk7XG4gICAgICB9IGVsc2UgaWYgKG9wdGlvbnMuZXhwaXJhdGlvblVuaXQpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuZXhwaXJhdGlvblVuaXQgPT09ICdob3VycycpIHtcbiAgICAgICAgICBvcHRpb25zLmV4cGlyZXMuc2V0SG91cnMob3B0aW9ucy5leHBpcmVzLmdldEhvdXJzKCkgKyBleHBpcmVzRm9yKTtcbiAgICAgICAgfSBlbHNlIGlmIChvcHRpb25zLmV4cGlyYXRpb25Vbml0ID09PSAnbWludXRlcycpIHtcbiAgICAgICAgICBvcHRpb25zLmV4cGlyZXMuc2V0TWludXRlcyhvcHRpb25zLmV4cGlyZXMuZ2V0TWludXRlcygpICsgZXhwaXJlc0Zvcik7XG4gICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5leHBpcmF0aW9uVW5pdCA9PT0gJ3NlY29uZHMnKSB7XG4gICAgICAgICAgb3B0aW9ucy5leHBpcmVzLnNldFNlY29uZHMob3B0aW9ucy5leHBpcmVzLmdldFNlY29uZHMoKSArIGV4cGlyZXNGb3IpO1xuICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMuZXhwaXJhdGlvblVuaXQgPT09ICdtaWxsaXNlY29uZHMnKSB7XG4gICAgICAgICAgb3B0aW9ucy5leHBpcmVzLnNldE1pbGxpc2Vjb25kcyhvcHRpb25zLmV4cGlyZXMuZ2V0TWlsbGlzZWNvbmRzKCkgKyBleHBpcmVzRm9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvcHRpb25zLmV4cGlyZXMuc2V0RGF0ZShvcHRpb25zLmV4cGlyZXMuZ2V0RGF0ZSgpICsgZXhwaXJlc0Zvcik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9wdGlvbnMuZXhwaXJlcy5zZXREYXRlKG9wdGlvbnMuZXhwaXJlcy5nZXREYXRlKCkgKyBleHBpcmVzRm9yKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuICh0aGlzLmRvY3VtZW50LmNvb2tpZSA9IFtcbiAgICAgIGVuY29kZVVSSUNvbXBvbmVudChjb29raWVLZXkpLFxuICAgICAgJz0nLFxuICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSxcbiAgICAgIG9wdGlvbnMuZXhwaXJlcyA/ICc7IGV4cGlyZXM9JyArIG9wdGlvbnMuZXhwaXJlcy50b1VUQ1N0cmluZygpIDogJycsXG4gICAgICBvcHRpb25zLnBhdGggPyAnOyBwYXRoPScgKyBvcHRpb25zLnBhdGggOiAnJyxcbiAgICAgIG9wdGlvbnMuZG9tYWluID8gJzsgZG9tYWluPScgKyBvcHRpb25zLmRvbWFpbiA6ICcnLFxuICAgICAgb3B0aW9ucy5zZWN1cmUgPyAnOyBzZWN1cmUnIDogJydcbiAgICBdLmpvaW4oJycpKTtcbiAgfVxuXG4gIGdldChjb29raWVLZXk/OiBzdHJpbmcpOiBhbnkge1xuICAgIGNvbnN0IGNvb2tpZVN0cmluZ0xpc3Q6IEFycmF5PFN0cmluZz4gPSB0aGlzLmRvY3VtZW50LmNvb2tpZSA/IHRoaXMuZG9jdW1lbnQuY29va2llLnNwbGl0KCc7ICcpIDogW107XG5cbiAgICBjb25zdCBjb29raWVPYmplY3QgPSBjb29raWVTdHJpbmdMaXN0XG4gICAgICAubWFwKGNvb2tpZVN0cmluZyA9PiB7XG4gICAgICAgIGNvbnN0IHBvcyA9IGNvb2tpZVN0cmluZy5pbmRleE9mKCc9Jyk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbmFtZTogY29va2llU3RyaW5nLnN1YnN0cigwLCBwb3MpLFxuICAgICAgICAgIHZhbHVlOiBkZWNvZGVVUklDb21wb25lbnQoY29va2llU3RyaW5nLnN1YnN0cihwb3MgKyAxKSlcbiAgICAgICAgfTtcbiAgICAgIH0pLmZpbHRlcihjb29raWUgPT4ge1xuICAgICAgICByZXR1cm4gdHlwZW9mIGNvb2tpZS52YWx1ZSAhPT0gJ3VuZGVmaW5lZCcgJiYgKGNvb2tpZUtleSA9PT0gdW5kZWZpbmVkIHx8IGNvb2tpZUtleSA9PT0gY29va2llLm5hbWUpO1xuICAgICAgfSkucmVkdWNlKChwcmV2aW91c1ZhbHVlOiBvYmplY3QsIGN1cnJlbnRWYWx1ZTogeyBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkgfSkgPT4ge1xuICAgICAgICBsZXQgdmFsdWUgPSBudWxsO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHZhbHVlID0gSlNPTi5wYXJzZShjdXJyZW50VmFsdWUudmFsdWUpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgdmFsdWUgPSBjdXJyZW50VmFsdWUudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcHJldmlvdXNWYWx1ZVtjdXJyZW50VmFsdWUubmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHByZXZpb3VzVmFsdWU7XG4gICAgICB9LCB7fSk7XG4gICAgcmV0dXJuIGNvb2tpZUtleSA/IGNvb2tpZU9iamVjdFtjb29raWVLZXldIDogT2JqZWN0LmtleXMoY29va2llT2JqZWN0KS5sZW5ndGggPiAwID8gY29va2llT2JqZWN0IDogbnVsbDtcbiAgfVxuXG4gIHJlbW92ZShjb29raWVLZXk6IHN0cmluZywgY29va2llT3B0aW9uczogQ29va2llT3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgY29va2llID0gdGhpcy5nZXQoY29va2llS2V5KTtcblxuICAgIGlmIChjb29raWUpIHtcbiAgICAgIGNvb2tpZU9wdGlvbnMuZXhwaXJlcyA9IC0xO1xuICAgICAgdGhpcy5zZXQoY29va2llS2V5LCAnJywgY29va2llT3B0aW9ucyk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxufVxuIl19