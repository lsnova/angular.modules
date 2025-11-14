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
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: LsnCookieService, deps: [{ token: LSN_COOKIE_CONFIG }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable }); }
    /** @nocollapse */ static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: LsnCookieService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: LsnCookieService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1.LsnCookieConfig, decorators: [{
                    type: Inject,
                    args: [LSN_COOKIE_CONFIG]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNuLWNvb2tpZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbHNuLWxpYnMvc3JjL2xpYi9zZXJ2aWNlcy9sc24tY29va2llL2xzbi1jb29raWUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsZUFBZSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDckUsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDOzs7QUFxQnpDLE1BQU0sT0FBTyxnQkFBZ0I7SUFFM0IsWUFBK0MsWUFBNkIsRUFBNkIsUUFBYTtRQUF2RSxpQkFBWSxHQUFaLFlBQVksQ0FBaUI7UUFBNkIsYUFBUSxHQUFSLFFBQVEsQ0FBSztJQUN0SCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsR0FBRyxDQUFDLFNBQWlCLEVBQUUsV0FBZ0IsRUFBRSxhQUFnQztRQUN2RSxNQUFNLE9BQU8sR0FBRztZQUNkLEdBQUcsYUFBYTtZQUNoQixNQUFNLEVBQUUsYUFBYSxJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYTtTQUN2RyxDQUFDO1FBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDckMsT0FBTyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDekIsQ0FBQztRQUNELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDMUMsSUFBSSxVQUFVLENBQUM7UUFFZixJQUFJLE9BQU8sT0FBTyxDQUFDLE9BQU8sS0FBSyxRQUFRLEVBQUUsQ0FBQztZQUN4QyxVQUFVLEdB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R0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRW5DLElBQUksTUFBTSxFQUFFLENBQUM7WUFDWCxhQUFhLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQztZQUN2QyxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7YUFBTSxDQUFDO1lBQ04sT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDO0lBQ0gsQ0FBQztrSUE3RlUsZ0JBQWdCLGtCQUVQLGlCQUFpQixhQUFpRCxRQUFRO3NJQUZuRixnQkFBZ0IsY0FGZixNQUFNOzs0RkFFUCxnQkFBZ0I7a0JBSDVCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzswQkFHYyxNQUFNOzJCQUFDLGlCQUFpQjs7MEJBQTBDLE1BQU07MkJBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TFNOX0NPT0tJRV9DT05GSUcsIExzbkNvb2tpZUNvbmZpZ30gZnJvbSAnLi9sc25Db29raWVDb25maWcnO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuZXhwb3J0IGludGVyZmFjZSBMc25Db29raWVPcHRpb25zIHtcbiAgZXhwaXJlcz86IG51bWJlciB8IERhdGU7XG4gIGV4cGlyYXRpb25Vbml0Pzogc3RyaW5nO1xuICBwYXRoPzogc3RyaW5nO1xuICBkb21haW4/OiBzdHJpbmcgfCBib29sZWFuO1xuICBzZWN1cmU/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvb2tpZVNlcnZpY2Uge1xuICBzZXQoY29va2llS2V5OiBzdHJpbmcsIGNvb2tpZVZhbHVlLCBjb29raWVPcHRpb25zOiBMc25Db29raWVPcHRpb25zKTogdm9pZDtcblxuICBnZXQoY29va2llS2V5Pzogc3RyaW5nKTogYW55O1xuXG4gIHJlbW92ZShjb29raWVLZXk6IHN0cmluZywgY29va2llT3B0aW9uczogTHNuQ29va2llT3B0aW9ucyk6IHZvaWQ7XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIExzbkNvb2tpZVNlcnZpY2UgaW1wbGVtZW50cyBDb29raWVTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KExTTl9DT09LSUVfQ09ORklHKSBwcml2YXRlIGNvb2tpZUNvbmZpZzogTHNuQ29va2llQ29uZmlnLCBASW5qZWN0KERPQ1VNRU5UKSByZWFkb25seSBkb2N1bWVudDogYW55KSB7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBjb29raWUgd2l0aCBnaXZlbiBrZXkgdG8gZ2l2ZW4gdmFsdWUsIGNvb2tpZSBvcHRpb25zIGFyZSBvcHRpb25hbCwgaWYgbm90IHNldCwgc29tZSBwcm9wZXJ0aWVzXG4gICAqIChzZWN1cmUgYW5kIGRvbWFpbikgd2lsbCBiZSBzZXQgZnJvbSBnbG9iYWwgY29va2llIGNvbmZpZ1xuICAgKi9cbiAgc2V0KGNvb2tpZUtleTogc3RyaW5nLCBjb29raWVWYWx1ZTogYW55LCBjb29raWVPcHRpb25zPzogTHNuQ29va2llT3B0aW9ucykge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAuLi5jb29raWVPcHRpb25zLFxuICAgICAgc2VjdXJlOiBjb29raWVPcHRpb25zICYmIGNvb2tpZU9wdGlvbnMuc2VjdXJlID8gY29va2llT3B0aW9ucy5zZWN1cmUgOiB0aGlzLmNvb2tpZUNvbmZpZy5zZWN1cmVDb29raWVzXG4gICAgfTtcbiAgICBpZiAoIXRoaXMuY29va2llQ29uZmlnLmRvbWFpbkNvb2tpZXMpIHtcbiAgICAgIG9wdGlvbnMuZG9tYWluID0gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHZhbHVlID0gSlNPTi5zdHJpbmdpZnkoY29va2llVmFsdWUpO1xuICAgIGxldCBleHBpcmVzRm9yO1xuXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLmV4cGlyZXMgPT09ICdudW1iZXInKSB7XG4gICAgICBleHBpcmVzRm9yID0gb3B0aW9ucy5leHBpcmVzO1xuICAgICAgb3B0aW9ucy5leHBpcmVzID0gbmV3IERhdGUoKTtcbiAgICAgIC8vIFRyeWluZyB0byBkZWxldGUgYSBjb29raWU7IHNldCBhIGRhdGUgZmFyIGluIHRoZSBwYXN0XG4gICAgICBpZiAoZXhwaXJlc0ZvciA9PT0gLTEpIHtcbiAgICAgICAgb3B0aW9ucy5leHBpcmVzID0gbmV3IERhdGUoJ1RodSwgMDEgSmFuIDE5NzAgMDA6MDA6MDAgR01UJyk7XG4gICAgICB9IGVsc2UgaWYgKG9wdGlvbnMuZXhwaXJhdGlvblVuaXQpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuZXhwaXJhdGlvblVuaXQgPT09ICdob3VycycpIHtcbiAgICAgICAgICBvcHRpb25zLmV4cGlyZXMuc2V0SG91cnMob3B0aW9ucy5leHBpcmVzLmdldEhvdXJzKCkgKyBleHBpcmVzRm9yKTtcbiAgICAgICAgfSBlbHNlIGlmIChvcHRpb25zLmV4cGlyYXRpb25Vbml0ID09PSAnbWludXRlcycpIHtcbiAgICAgICAgICBvcHRpb25zLmV4cGlyZXMuc2V0TWludXRlcyhvcHRpb25zLmV4cGlyZXMuZ2V0TWludXRlcygpICsgZXhwaXJlc0Zvcik7XG4gICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5leHBpcmF0aW9uVW5pdCA9PT0gJ3NlY29uZHMnKSB7XG4gICAgICAgICAgb3B0aW9ucy5leHBpcmVzLnNldFNlY29uZHMob3B0aW9ucy5leHBpcmVzLmdldFNlY29uZHMoKSArIGV4cGlyZXNGb3IpO1xuICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMuZXhwaXJhdGlvblVuaXQgPT09ICdtaWxsaXNlY29uZHMnKSB7XG4gICAgICAgICAgb3B0aW9ucy5leHBpcmVzLnNldE1pbGxpc2Vjb25kcyhvcHRpb25zLmV4cGlyZXMuZ2V0TWlsbGlzZWNvbmRzKCkgKyBleHBpcmVzRm9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvcHRpb25zLmV4cGlyZXMuc2V0RGF0ZShvcHRpb25zLmV4cGlyZXMuZ2V0RGF0ZSgpICsgZXhwaXJlc0Zvcik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9wdGlvbnMuZXhwaXJlcy5zZXREYXRlKG9wdGlvbnMuZXhwaXJlcy5nZXREYXRlKCkgKyBleHBpcmVzRm9yKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5kb2N1bWVudC5jb29raWUgPSBbXG4gICAgICBlbmNvZGVVUklDb21wb25lbnQoY29va2llS2V5KSxcbiAgICAgICc9JyxcbiAgICAgIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSksXG4gICAgICBvcHRpb25zLmV4cGlyZXMgPyAnOyBleHBpcmVzPScgKyBvcHRpb25zLmV4cGlyZXMudG9VVENTdHJpbmcoKSA6ICcnLFxuICAgICAgb3B0aW9ucy5wYXRoID8gJzsgcGF0aD0nICsgb3B0aW9ucy5wYXRoIDogJycsXG4gICAgICBvcHRpb25zLmRvbWFpbiA/ICc7IGRvbWFpbj0nICsgb3B0aW9ucy5kb21haW4gOiAnJyxcbiAgICAgIG9wdGlvbnMuc2VjdXJlID8gJzsgc2VjdXJlJyA6ICcnXG4gICAgXS5qb2luKCcnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBLZXkgcHJvdmlkZWQgLSByZXR1cm5zIHZhbHVlIG9mIGdpdmVuIGNvb2tpZSBvciB1bmRlZmluZWQgaWYgbm9uIGV4aXN0ZW50XG4gICAqIEtleSBub3QgcHJvdmlkZWQgLSByZXR1cm5zIGFsbCBjb29raWVzIGFzIE9iamVjdCBvciB1bmRlZmluZWQgaWYgdGhlcmUgYXJlIG5vIGNvb2tpZXNcbiAgICogQ29va2llIHZhbHVlcyBhcmUgSlNPTi5wYXJzZWQsIGlmIGVycm9yIG9jY3VycyBkdXJpbmcgcGFyc2luZywgc3RyaW5nIHZhbHVlIGlzIGFzc2lnbmVkXG4gICAqL1xuICBnZXQoY29va2llS2V5Pzogc3RyaW5nKTogYW55IHtcbiAgICBjb25zdCBjb29raWVTdHJpbmdMaXN0OiBBcnJheTxTdHJpbmc+ID0gdGhpcy5kb2N1bWVudC5jb29raWUgPyB0aGlzLmRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOyAnKSA6IFtdO1xuXG4gICAgY29uc3QgY29va2llT2JqZWN0ID0gY29va2llU3RyaW5nTGlzdFxuICAgICAgLm1hcChjb29raWVTdHJpbmcgPT4ge1xuICAgICAgICBjb25zdCBwb3MgPSBjb29raWVTdHJpbmcuaW5kZXhPZignPScpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG5hbWU6IGNvb2tpZVN0cmluZy5zdWJzdHIoMCwgcG9zKSxcbiAgICAgICAgICB2YWx1ZTogZGVjb2RlVVJJQ29tcG9uZW50KGNvb2tpZVN0cmluZy5zdWJzdHIocG9zICsgMSkpXG4gICAgICAgIH07XG4gICAgICB9KS5maWx0ZXIoY29va2llID0+IHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBjb29raWUudmFsdWUgIT09ICd1bmRlZmluZWQnICYmIChjb29raWVLZXkgPT09IHVuZGVmaW5lZCB8fCBjb29raWVLZXkgPT09IGNvb2tpZS5uYW1lKTtcbiAgICAgIH0pLnJlZHVjZSgocHJldmlvdXNWYWx1ZTogb2JqZWN0LCBjdXJyZW50VmFsdWU6IHsgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55IH0pID0+IHtcbiAgICAgICAgbGV0IHZhbHVlID0gbnVsbDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB2YWx1ZSA9IEpTT04ucGFyc2UoY3VycmVudFZhbHVlLnZhbHVlKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHZhbHVlID0gY3VycmVudFZhbHVlLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHByZXZpb3VzVmFsdWVbY3VycmVudFZhbHVlLm5hbWVdID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBwcmV2aW91c1ZhbHVlO1xuICAgICAgfSwge30pO1xuICAgIHJldHVybiBjb29raWVLZXkgPyBjb29raWVPYmplY3RbY29va2llS2V5XSA6IE9iamVjdC5rZXlzKGNvb2tpZU9iamVjdCkubGVuZ3RoID4gMCA/IGNvb2tpZU9iamVjdCA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHJlbW92ZShjb29raWVLZXk6IHN0cmluZywgY29va2llT3B0aW9uczogTHNuQ29va2llT3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgY29va2llID0gdGhpcy5nZXQoY29va2llS2V5KTtcblxuICAgIGlmIChjb29raWUpIHtcbiAgICAgIGNvb2tpZU9wdGlvbnMuZXhwaXJlcyA9IC0xO1xuICAgICAgdGhpcy5zZXQoY29va2llS2V5LCAnJywgY29va2llT3B0aW9ucyk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxufVxuIl19