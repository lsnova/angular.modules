import { Inject, Injectable } from '@angular/core';
import { LSN_COOKIE_CONFIG, LsnCookieConfig } from './lsnCookieConfig';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "./lsnCookieConfig";
export class LsnCookieService {
    constructor(cookieConfig, document) {
        this.cookieConfig = cookieConfig;
        this.document = document;
    }
    /**
     * Sets cookie with given key to given value, cookie options are optional, if not set, some properties
     * (secure and domain) will be set from global cookie config
     */
    set(cookieKey, cookieValue, cookieOptions) {
        const options = {
            ...cookieOptions,
            secure: cookieOptions && cookieOptions.secure ? cookieOptions.secure : this.cookieConfig.secureCookies
        };
        if (!this.cookieConfig.domainCookies) {
            options.domain = false;
        }
        const value = JSON.stringify(cookieValue);
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
     */
    get(cookieKey) {
        const cookieStringList = this.document.cookie ? this.document.cookie.split('; ') : [];
        const cookieObject = cookieStringList
            .map(cookieString => {
            const pos = cookieString.indexOf('=');
            return {
                name: cookieString.substr(0, pos),
                value: decodeURIComponent(cookieString.substr(pos + 1))
            };
        }).filter(cookie => {
            return typeof cookie.value !== 'undefined' && (cookieKey === undefined || cookieKey === cookie.name);
        }).reduce((previousValue, currentValue) => {
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
        return cookieKey ? cookieObject[cookieKey] : Object.keys(cookieObject).length > 0 ? cookieObject : undefined;
    }
    remove(cookieKey, cookieOptions = {}) {
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
/** @nocollapse */ LsnCookieService.ɵfac = function LsnCookieService_Factory(t) { return new (t || LsnCookieService)(i0.ɵɵinject(LSN_COOKIE_CONFIG), i0.ɵɵinject(DOCUMENT)); };
/** @nocollapse */ LsnCookieService.ɵprov = /** @pureOrBreakMyCode */ i0.ɵɵdefineInjectable({ token: LsnCookieService, factory: LsnCookieService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LsnCookieService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.LsnCookieConfig, decorators: [{
                type: Inject,
                args: [LSN_COOKIE_CONFIG]
            }] }, { type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNuLWNvb2tpZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbHNuLWxpYnMvc3JjL2xpYi9zZXJ2aWNlcy9sc24tY29va2llL2xzbi1jb29raWUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsZUFBZSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDckUsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDOzs7QUFxQnpDLE1BQU0sT0FBTyxnQkFBZ0I7SUFFM0IsWUFBK0MsWUFBNkIsRUFBNkIsUUFBYTtRQUF2RSxpQkFBWSxHQUFaLFlBQVksQ0FBaUI7UUFBNkIsYUFBUSxHQUFSLFFBQVEsQ0FBSztJQUN0SCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsR0FBRyxDQUFDLFNBQWlCLEVBQUUsV0FBZ0IsRUFBRSxhQUFnQztRQUN2RSxNQUFNLE9BQU8sR0FBRztZQUNkLEdBQUcsYUFBYTtZQUNoQixNQUFNLEVBQUUsYUFBYSxJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYTtTQUN2RyxDQUFDO1FBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFO1lBQ3BDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1NBQ3hCO1FBQ0QsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMxQyxJQUFJLFVBQVUsQ0FBQztRQUVmLElBQUksT0FBTyxPQUFPLENBQUMsT0FBTyxLQUFLLFFBQVEsRUFBRTtZQUN2QyxVQUFVLEdBQUcsT0FBTyxDQUFDLE9B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RSxFQUFFLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDdkMsT0FBTyxJQUFJLENBQUM7U0FDYjthQUFNO1lBQ0wsT0FBTyxLQUFLLENBQUM7U0FDZDtJQUNILENBQUM7O21HQTdGVSxnQkFBZ0IsY0FFUCxpQkFBaUIsZUFBaUQsUUFBUTtxR0FGbkYsZ0JBQWdCLFdBQWhCLGdCQUFnQixtQkFGZixNQUFNO3VGQUVQLGdCQUFnQjtjQUg1QixVQUFVO2VBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7O3NCQUdjLE1BQU07dUJBQUMsaUJBQWlCOztzQkFBMEMsTUFBTTt1QkFBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtMU05fQ09PS0lFX0NPTkZJRywgTHNuQ29va2llQ29uZmlnfSBmcm9tICcuL2xzbkNvb2tpZUNvbmZpZyc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5leHBvcnQgaW50ZXJmYWNlIExzbkNvb2tpZU9wdGlvbnMge1xuICBleHBpcmVzPzogbnVtYmVyIHwgRGF0ZTtcbiAgZXhwaXJhdGlvblVuaXQ/OiBzdHJpbmc7XG4gIHBhdGg/OiBzdHJpbmc7XG4gIGRvbWFpbj86IHN0cmluZyB8IGJvb2xlYW47XG4gIHNlY3VyZT86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29va2llU2VydmljZSB7XG4gIHNldChjb29raWVLZXk6IHN0cmluZywgY29va2llVmFsdWUsIGNvb2tpZU9wdGlvbnM6IExzbkNvb2tpZU9wdGlvbnMpOiB2b2lkO1xuXG4gIGdldChjb29raWVLZXk/OiBzdHJpbmcpOiBhbnk7XG5cbiAgcmVtb3ZlKGNvb2tpZUtleTogc3RyaW5nLCBjb29raWVPcHRpb25zOiBMc25Db29raWVPcHRpb25zKTogdm9pZDtcbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTHNuQ29va2llU2VydmljZSBpbXBsZW1lbnRzIENvb2tpZVNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoTFNOX0NPT0tJRV9DT05GSUcpIHByaXZhdGUgY29va2llQ29uZmlnOiBMc25Db29raWVDb25maWcsIEBJbmplY3QoRE9DVU1FTlQpIHJlYWRvbmx5IGRvY3VtZW50OiBhbnkpIHtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIGNvb2tpZSB3aXRoIGdpdmVuIGtleSB0byBnaXZlbiB2YWx1ZSwgY29va2llIG9wdGlvbnMgYXJlIG9wdGlvbmFsLCBpZiBub3Qgc2V0LCBzb21lIHByb3BlcnRpZXNcbiAgICogKHNlY3VyZSBhbmQgZG9tYWluKSB3aWxsIGJlIHNldCBmcm9tIGdsb2JhbCBjb29raWUgY29uZmlnXG4gICAqL1xuICBzZXQoY29va2llS2V5OiBzdHJpbmcsIGNvb2tpZVZhbHVlOiBhbnksIGNvb2tpZU9wdGlvbnM/OiBMc25Db29raWVPcHRpb25zKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIC4uLmNvb2tpZU9wdGlvbnMsXG4gICAgICBzZWN1cmU6IGNvb2tpZU9wdGlvbnMgJiYgY29va2llT3B0aW9ucy5zZWN1cmUgPyBjb29raWVPcHRpb25zLnNlY3VyZSA6IHRoaXMuY29va2llQ29uZmlnLnNlY3VyZUNvb2tpZXNcbiAgICB9O1xuICAgIGlmICghdGhpcy5jb29raWVDb25maWcuZG9tYWluQ29va2llcykge1xuICAgICAgb3B0aW9ucy5kb21haW4gPSBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSBKU09OLnN0cmluZ2lmeShjb29raWVWYWx1ZSk7XG4gICAgbGV0IGV4cGlyZXNGb3I7XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuZXhwaXJlcyA9PT0gJ251bWJlcicpIHtcbiAgICAgIGV4cGlyZXNGb3IgPSBvcHRpb25zLmV4cGlyZXM7XG4gICAgICBvcHRpb25zLmV4cGlyZXMgPSBuZXcgRGF0ZSgpO1xuICAgICAgLy8gVHJ5aW5nIHRvIGRlbGV0ZSBhIGNvb2tpZTsgc2V0IGEgZGF0ZSBmYXIgaW4gdGhlIHBhc3RcbiAgICAgIGlmIChleHBpcmVzRm9yID09PSAtMSkge1xuICAgICAgICBvcHRpb25zLmV4cGlyZXMgPSBuZXcgRGF0ZSgnVGh1LCAwMSBKYW4gMTk3MCAwMDowMDowMCBHTVQnKTtcbiAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5leHBpcmF0aW9uVW5pdCkge1xuICAgICAgICBpZiAob3B0aW9ucy5leHBpcmF0aW9uVW5pdCA9PT0gJ2hvdXJzJykge1xuICAgICAgICAgIG9wdGlvbnMuZXhwaXJlcy5zZXRIb3VycyhvcHRpb25zLmV4cGlyZXMuZ2V0SG91cnMoKSArIGV4cGlyZXNGb3IpO1xuICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMuZXhwaXJhdGlvblVuaXQgPT09ICdtaW51dGVzJykge1xuICAgICAgICAgIG9wdGlvbnMuZXhwaXJlcy5zZXRNaW51dGVzKG9wdGlvbnMuZXhwaXJlcy5nZXRNaW51dGVzKCkgKyBleHBpcmVzRm9yKTtcbiAgICAgICAgfSBlbHNlIGlmIChvcHRpb25zLmV4cGlyYXRpb25Vbml0ID09PSAnc2Vjb25kcycpIHtcbiAgICAgICAgICBvcHRpb25zLmV4cGlyZXMuc2V0U2Vjb25kcyhvcHRpb25zLmV4cGlyZXMuZ2V0U2Vjb25kcygpICsgZXhwaXJlc0Zvcik7XG4gICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5leHBpcmF0aW9uVW5pdCA9PT0gJ21pbGxpc2Vjb25kcycpIHtcbiAgICAgICAgICBvcHRpb25zLmV4cGlyZXMuc2V0TWlsbGlzZWNvbmRzKG9wdGlvbnMuZXhwaXJlcy5nZXRNaWxsaXNlY29uZHMoKSArIGV4cGlyZXNGb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9wdGlvbnMuZXhwaXJlcy5zZXREYXRlKG9wdGlvbnMuZXhwaXJlcy5nZXREYXRlKCkgKyBleHBpcmVzRm9yKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3B0aW9ucy5leHBpcmVzLnNldERhdGUob3B0aW9ucy5leHBpcmVzLmdldERhdGUoKSArIGV4cGlyZXNGb3IpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmRvY3VtZW50LmNvb2tpZSA9IFtcbiAgICAgIGVuY29kZVVSSUNvbXBvbmVudChjb29raWVLZXkpLFxuICAgICAgJz0nLFxuICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSxcbiAgICAgIG9wdGlvbnMuZXhwaXJlcyA/ICc7IGV4cGlyZXM9JyArIG9wdGlvbnMuZXhwaXJlcy50b1VUQ1N0cmluZygpIDogJycsXG4gICAgICBvcHRpb25zLnBhdGggPyAnOyBwYXRoPScgKyBvcHRpb25zLnBhdGggOiAnJyxcbiAgICAgIG9wdGlvbnMuZG9tYWluID8gJzsgZG9tYWluPScgKyBvcHRpb25zLmRvbWFpbiA6ICcnLFxuICAgICAgb3B0aW9ucy5zZWN1cmUgPyAnOyBzZWN1cmUnIDogJydcbiAgICBdLmpvaW4oJycpO1xuICB9XG5cbiAgLyoqXG4gICAqIEtleSBwcm92aWRlZCAtIHJldHVybnMgdmFsdWUgb2YgZ2l2ZW4gY29va2llIG9yIHVuZGVmaW5lZCBpZiBub24gZXhpc3RlbnRcbiAgICogS2V5IG5vdCBwcm92aWRlZCAtIHJldHVybnMgYWxsIGNvb2tpZXMgYXMgT2JqZWN0IG9yIHVuZGVmaW5lZCBpZiB0aGVyZSBhcmUgbm8gY29va2llc1xuICAgKiBDb29raWUgdmFsdWVzIGFyZSBKU09OLnBhcnNlZCwgaWYgZXJyb3Igb2NjdXJzIGR1cmluZyBwYXJzaW5nLCBzdHJpbmcgdmFsdWUgaXMgYXNzaWduZWRcbiAgICovXG4gIGdldChjb29raWVLZXk/OiBzdHJpbmcpOiBhbnkge1xuICAgIGNvbnN0IGNvb2tpZVN0cmluZ0xpc3Q6IEFycmF5PFN0cmluZz4gPSB0aGlzLmRvY3VtZW50LmNvb2tpZSA/IHRoaXMuZG9jdW1lbnQuY29va2llLnNwbGl0KCc7ICcpIDogW107XG5cbiAgICBjb25zdCBjb29raWVPYmplY3QgPSBjb29raWVTdHJpbmdMaXN0XG4gICAgICAubWFwKGNvb2tpZVN0cmluZyA9PiB7XG4gICAgICAgIGNvbnN0IHBvcyA9IGNvb2tpZVN0cmluZy5pbmRleE9mKCc9Jyk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbmFtZTogY29va2llU3RyaW5nLnN1YnN0cigwLCBwb3MpLFxuICAgICAgICAgIHZhbHVlOiBkZWNvZGVVUklDb21wb25lbnQoY29va2llU3RyaW5nLnN1YnN0cihwb3MgKyAxKSlcbiAgICAgICAgfTtcbiAgICAgIH0pLmZpbHRlcihjb29raWUgPT4ge1xuICAgICAgICByZXR1cm4gdHlwZW9mIGNvb2tpZS52YWx1ZSAhPT0gJ3VuZGVmaW5lZCcgJiYgKGNvb2tpZUtleSA9PT0gdW5kZWZpbmVkIHx8IGNvb2tpZUtleSA9PT0gY29va2llLm5hbWUpO1xuICAgICAgfSkucmVkdWNlKChwcmV2aW91c1ZhbHVlOiBvYmplY3QsIGN1cnJlbnRWYWx1ZTogeyBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkgfSkgPT4ge1xuICAgICAgICBsZXQgdmFsdWUgPSBudWxsO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHZhbHVlID0gSlNPTi5wYXJzZShjdXJyZW50VmFsdWUudmFsdWUpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgdmFsdWUgPSBjdXJyZW50VmFsdWUudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcHJldmlvdXNWYWx1ZVtjdXJyZW50VmFsdWUubmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHByZXZpb3VzVmFsdWU7XG4gICAgICB9LCB7fSk7XG4gICAgcmV0dXJuIGNvb2tpZUtleSA/IGNvb2tpZU9iamVjdFtjb29raWVLZXldIDogT2JqZWN0LmtleXMoY29va2llT2JqZWN0KS5sZW5ndGggPiAwID8gY29va2llT2JqZWN0IDogdW5kZWZpbmVkO1xuICB9XG5cbiAgcmVtb3ZlKGNvb2tpZUtleTogc3RyaW5nLCBjb29raWVPcHRpb25zOiBMc25Db29raWVPcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBjb29raWUgPSB0aGlzLmdldChjb29raWVLZXkpO1xuXG4gICAgaWYgKGNvb2tpZSkge1xuICAgICAgY29va2llT3B0aW9ucy5leHBpcmVzID0gLTE7XG4gICAgICB0aGlzLnNldChjb29raWVLZXksICcnLCBjb29raWVPcHRpb25zKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG59XG4iXX0=