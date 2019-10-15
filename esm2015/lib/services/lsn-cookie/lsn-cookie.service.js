/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
     * @param {?} cookieKey
     * @param {?} cookieValue
     * @param {?} cookieOptions
     * @return {?}
     */
    set(cookieKey, cookieValue, cookieOptions) {
        /** @type {?} */
        const options = Object.assign({ secure: this.cookieConfig.secureCookies, domain: this.cookieConfig.domainCookies || false }, cookieOptions);
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
        return (this.document.cookie = [
            encodeURIComponent(cookieKey),
            '=',
            encodeURIComponent(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '',
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }
    /**
     * @param {?=} cookieKey
     * @return {?}
     */
    get(cookieKey) {
        /** @type {?} */
        const cookieStringList = this.document.cookie ? this.document.cookie.split('; ') : [];
        /** @type {?} */
        const cookieObject = cookieStringList
            .map(cookieString => {
            /** @type {?} */
            const pos = cookieString.indexOf('=');
            return {
                name: cookieString.substr(0, pos),
                value: decodeURIComponent(cookieString.substr(pos + 1))
            };
        }).filter(cookie => {
            return typeof cookie.value !== 'undefined' && (cookieKey === undefined || cookieKey === cookie.name);
        }).reduce((previousValue, currentValue) => {
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
        }, {});
        return cookieKey ? cookieObject[cookieKey] : Object.keys(cookieObject).length > 0 ? cookieObject : null;
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
/** @nocollapse */ LsnCookieService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function LsnCookieService_Factory() { return new LsnCookieService(i0.ɵɵinject(i1.LSN_COOKIE_CONFIG), i0.ɵɵinject(i2.DOCUMENT)); }, token: LsnCookieService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    LsnCookieService.prototype.cookieConfig;
    /** @type {?} */
    LsnCookieService.prototype.document;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNuLWNvb2tpZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9sc24tY29va2llL2xzbi1jb29raWUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFDLGlCQUFpQixFQUFFLGVBQWUsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQzVFLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7OztBQUV6QyxtQ0FNQzs7O0lBTEMsZ0NBQXdCOztJQUN4Qix1Q0FBd0I7O0lBQ3hCLDZCQUFjOztJQUNkLCtCQUFnQjs7SUFDaEIsK0JBQWlCOzs7OztBQUduQixtQ0FNQzs7Ozs7Ozs7SUFMQyxtRkFBd0U7Ozs7O0lBRXhFLHVEQUE2Qjs7Ozs7O0lBRTdCLHlFQUE4RDs7QUFNaEUsTUFBTSxPQUFPLGdCQUFnQjs7Ozs7SUFFM0IsWUFBK0MsWUFBNkIsRUFBNkIsUUFBYTtRQUF2RSxpQkFBWSxHQUFaLFlBQVksQ0FBaUI7UUFBNkIsYUFBUSxHQUFSLFFBQVEsQ0FBSztJQUN0SCxDQUFDOzs7Ozs7O0lBRUQsR0FBRyxDQUFDLFNBQWlCLEVBQUUsV0FBZ0IsRUFBRSxhQUE0Qjs7Y0FDN0QsT0FBTyxtQkFDWCxNQUFNLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQ3ZDLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsSUFBSSxLQUFLLElBQzdDLGFBQWEsQ0FDakI7O2NBQ0ssS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDOztZQUNyQyxVQUFVO1FBRWQsSUFBSSxPQUFPLE9BQU8sQ0FBQyxPQUFPLEtBQUssUUFBUSxFQUFFO1lBQ3ZDLFVBQVUsR0FBRyxPQUFPLENBQUMs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LE9BQU8sSUFBSSxDQUFDO1NBQ2I7YUFBTTtZQUNMLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7SUFDSCxDQUFDOzs7WUFyRkYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBckIwQixlQUFlLHVCQXdCM0IsTUFBTSxTQUFDLGlCQUFpQjs0Q0FBMEMsTUFBTSxTQUFDLFFBQVE7Ozs7Ozs7O0lBQWxGLHdDQUFnRTs7SUFBRSxvQ0FBd0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0xTTl9DT09LSUVfQ09ORklHLCBMc25Db29raWVDb25maWd9IGZyb20gJy4vbW9kZWxzL2xzbkNvb2tpZUNvbmZpZyc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvb2tpZU9wdGlvbnMge1xuICBleHBpcmVzPzogbnVtYmVyIHwgRGF0ZTtcbiAgZXhwaXJhdGlvblVuaXQ/OiBzdHJpbmc7XG4gIHBhdGg/OiBzdHJpbmc7XG4gIGRvbWFpbj86IHN0cmluZztcbiAgc2VjdXJlPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb29raWVTZXJ2aWNlIHtcbiAgc2V0KGNvb2tpZUtleTogc3RyaW5nLCBjb29raWVWYWx1ZSwgY29va2llT3B0aW9uczogQ29va2llT3B0aW9ucyk6IHZvaWQ7XG5cbiAgZ2V0KGNvb2tpZUtleT86IHN0cmluZyk6IGFueTtcblxuICByZW1vdmUoY29va2llS2V5OiBzdHJpbmcsIGNvb2tpZU9wdGlvbnM6IENvb2tpZU9wdGlvbnMpOiB2b2lkO1xufVxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBMc25Db29raWVTZXJ2aWNlIGltcGxlbWVudHMgQ29va2llU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChMU05fQ09PS0lFX0NPTkZJRykgcHJpdmF0ZSBjb29raWVDb25maWc6IExzbkNvb2tpZUNvbmZpZywgQEluamVjdChET0NVTUVOVCkgcmVhZG9ubHkgZG9jdW1lbnQ6IGFueSkge1xuICB9XG5cbiAgc2V0KGNvb2tpZUtleTogc3RyaW5nLCBjb29raWVWYWx1ZTogYW55LCBjb29raWVPcHRpb25zOiBDb29raWVPcHRpb25zKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIHNlY3VyZTogdGhpcy5jb29raWVDb25maWcuc2VjdXJlQ29va2llcyxcbiAgICAgIGRvbWFpbjogdGhpcy5jb29raWVDb25maWcuZG9tYWluQ29va2llcyB8fCBmYWxzZSxcbiAgICAgIC4uLmNvb2tpZU9wdGlvbnMsXG4gICAgfTtcbiAgICBjb25zdCB2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KGNvb2tpZVZhbHVlKTtcbiAgICBsZXQgZXhwaXJlc0ZvcjtcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5leHBpcmVzID09PSAnbnVtYmVyJykge1xuICAgICAgZXhwaXJlc0ZvciA9IG9wdGlvbnMuZXhwaXJlcztcbiAgICAgIG9wdGlvbnMuZXhwaXJlcyA9IG5ldyBEYXRlKCk7XG4gICAgICAvLyBUcnlpbmcgdG8gZGVsZXRlIGEgY29va2llOyBzZXQgYSBkYXRlIGZhciBpbiB0aGUgcGFzdFxuICAgICAgaWYgKGV4cGlyZXNGb3IgPT09IC0xKSB7XG4gICAgICAgIG9wdGlvbnMuZXhwaXJlcyA9IG5ldyBEYXRlKCdUaHUsIDAxIEphbiAxOTcwIDAwOjAwOjAwIEdNVCcpO1xuICAgICAgfSBlbHNlIGlmIChvcHRpb25zLmV4cGlyYXRpb25Vbml0KSB7XG4gICAgICAgIGlmIChvcHRpb25zLmV4cGlyYXRpb25Vbml0ID09PSAnaG91cnMnKSB7XG4gICAgICAgICAgb3B0aW9ucy5leHBpcmVzLnNldEhvdXJzKG9wdGlvbnMuZXhwaXJlcy5nZXRIb3VycygpICsgZXhwaXJlc0Zvcik7XG4gICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5leHBpcmF0aW9uVW5pdCA9PT0gJ21pbnV0ZXMnKSB7XG4gICAgICAgICAgb3B0aW9ucy5leHBpcmVzLnNldE1pbnV0ZXMob3B0aW9ucy5leHBpcmVzLmdldE1pbnV0ZXMoKSArIGV4cGlyZXNGb3IpO1xuICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMuZXhwaXJhdGlvblVuaXQgPT09ICdzZWNvbmRzJykge1xuICAgICAgICAgIG9wdGlvbnMuZXhwaXJlcy5zZXRTZWNvbmRzKG9wdGlvbnMuZXhwaXJlcy5nZXRTZWNvbmRzKCkgKyBleHBpcmVzRm9yKTtcbiAgICAgICAgfSBlbHNlIGlmIChvcHRpb25zLmV4cGlyYXRpb25Vbml0ID09PSAnbWlsbGlzZWNvbmRzJykge1xuICAgICAgICAgIG9wdGlvbnMuZXhwaXJlcy5zZXRNaWxsaXNlY29uZHMob3B0aW9ucy5leHBpcmVzLmdldE1pbGxpc2Vjb25kcygpICsgZXhwaXJlc0Zvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb3B0aW9ucy5leHBpcmVzLnNldERhdGUob3B0aW9ucy5leHBpcmVzLmdldERhdGUoKSArIGV4cGlyZXNGb3IpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcHRpb25zLmV4cGlyZXMuc2V0RGF0ZShvcHRpb25zLmV4cGlyZXMuZ2V0RGF0ZSgpICsgZXhwaXJlc0Zvcik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAodGhpcy5kb2N1bWVudC5jb29raWUgPSBbXG4gICAgICBlbmNvZGVVUklDb21wb25lbnQoY29va2llS2V5KSxcbiAgICAgICc9JyxcbiAgICAgIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSksXG4gICAgICBvcHRpb25zLmV4cGlyZXMgPyAnOyBleHBpcmVzPScgKyBvcHRpb25zLmV4cGlyZXMudG9VVENTdHJpbmcoKSA6ICcnLFxuICAgICAgb3B0aW9ucy5wYXRoID8gJzsgcGF0aD0nICsgb3B0aW9ucy5wYXRoIDogJycsXG4gICAgICBvcHRpb25zLmRvbWFpbiA/ICc7IGRvbWFpbj0nICsgb3B0aW9ucy5kb21haW4gOiAnJyxcbiAgICAgIG9wdGlvbnMuc2VjdXJlID8gJzsgc2VjdXJlJyA6ICcnXG4gICAgXS5qb2luKCcnKSk7XG4gIH1cblxuICBnZXQoY29va2llS2V5Pzogc3RyaW5nKTogYW55IHtcbiAgICBjb25zdCBjb29raWVTdHJpbmdMaXN0OiBBcnJheTxTdHJpbmc+ID0gdGhpcy5kb2N1bWVudC5jb29raWUgPyB0aGlzLmRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOyAnKSA6IFtdO1xuXG4gICAgY29uc3QgY29va2llT2JqZWN0ID0gY29va2llU3RyaW5nTGlzdFxuICAgICAgLm1hcChjb29raWVTdHJpbmcgPT4ge1xuICAgICAgICBjb25zdCBwb3MgPSBjb29raWVTdHJpbmcuaW5kZXhPZignPScpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG5hbWU6IGNvb2tpZVN0cmluZy5zdWJzdHIoMCwgcG9zKSxcbiAgICAgICAgICB2YWx1ZTogZGVjb2RlVVJJQ29tcG9uZW50KGNvb2tpZVN0cmluZy5zdWJzdHIocG9zICsgMSkpXG4gICAgICAgIH07XG4gICAgICB9KS5maWx0ZXIoY29va2llID0+IHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBjb29raWUudmFsdWUgIT09ICd1bmRlZmluZWQnICYmIChjb29raWVLZXkgPT09IHVuZGVmaW5lZCB8fCBjb29raWVLZXkgPT09IGNvb2tpZS5uYW1lKTtcbiAgICAgIH0pLnJlZHVjZSgocHJldmlvdXNWYWx1ZTogb2JqZWN0LCBjdXJyZW50VmFsdWU6IHsgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55IH0pID0+IHtcbiAgICAgICAgbGV0IHZhbHVlID0gbnVsbDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB2YWx1ZSA9IEpTT04ucGFyc2UoY3VycmVudFZhbHVlLnZhbHVlKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHZhbHVlID0gY3VycmVudFZhbHVlLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHByZXZpb3VzVmFsdWVbY3VycmVudFZhbHVlLm5hbWVdID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBwcmV2aW91c1ZhbHVlO1xuICAgICAgfSwge30pO1xuICAgIHJldHVybiBjb29raWVLZXkgPyBjb29raWVPYmplY3RbY29va2llS2V5XSA6IE9iamVjdC5rZXlzKGNvb2tpZU9iamVjdCkubGVuZ3RoID4gMCA/IGNvb2tpZU9iamVjdCA6IG51bGw7XG4gIH1cblxuICByZW1vdmUoY29va2llS2V5OiBzdHJpbmcsIGNvb2tpZU9wdGlvbnM6IENvb2tpZU9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IGNvb2tpZSA9IHRoaXMuZ2V0KGNvb2tpZUtleSk7XG5cbiAgICBpZiAoY29va2llKSB7XG4gICAgICBjb29raWVPcHRpb25zLmV4cGlyZXMgPSAtMTtcbiAgICAgIHRoaXMuc2V0KGNvb2tpZUtleSwgJycsIGNvb2tpZU9wdGlvbnMpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==