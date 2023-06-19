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
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: LsnCookieService, deps: [{ token: LSN_COOKIE_CONFIG }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable }); }
    /** @nocollapse */ static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: LsnCookieService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: LsnCookieService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.LsnCookieConfig, decorators: [{
                    type: Inject,
                    args: [LSN_COOKIE_CONFIG]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNuLWNvb2tpZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbHNuLWxpYnMvc3JjL2xpYi9zZXJ2aWNlcy9sc24tY29va2llL2xzbi1jb29raWUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsZUFBZSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDckUsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDOzs7QUFxQnpDLE1BQU0sT0FBTyxnQkFBZ0I7SUFFM0IsWUFBK0MsWUFBNkIsRUFBNkIsUUFBYTtRQUF2RSxpQkFBWSxHQUFaLFlBQVksQ0FBaUI7UUFBNkIsYUFBUSxHQUFSLFFBQVEsQ0FBSztJQUN0SCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsR0FBRyxDQUFDLFNBQWlCLEVBQUUsV0FBZ0IsRUFBRSxhQUFnQztRQUN2RSxNQUFNLE9BQU8sR0FBRztZQUNkLEdBQUcsYUFBYTtZQUNoQixNQUFNLEVBQUUsYUFBYSxJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYTtTQUN2RyxDQUFDO1FBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFO1lBQ3BDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1NBQ3hCO1FBQ0QsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMxQyxJQUFJLFVBQVUsQ0FBQztRQUVmLElBQUksT0FBTyxPQUFPLENBQUMsT0FBTyxLQUFLLFFBQVEsRUFBRTtZQUN2QyxVQUFVLEdBQUcsT0FBTyxDQUFDLE9B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RSxFQUFFLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDdkMsT0FBTyxJQUFJLENBQUM7U0FDYjthQUFNO1lBQ0wsT0FBTyxLQUFLLENBQUM7U0FDZDtJQUNILENBQUM7aUlBN0ZVLGdCQUFnQixrQkFFUCxpQkFBaUIsYUFBaUQsUUFBUTtxSUFGbkYsZ0JBQWdCLGNBRmYsTUFBTTs7MkZBRVAsZ0JBQWdCO2tCQUg1QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7MEJBR2MsTUFBTTsyQkFBQyxpQkFBaUI7OzBCQUEwQyxNQUFNOzJCQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0xTTl9DT09LSUVfQ09ORklHLCBMc25Db29raWVDb25maWd9IGZyb20gJy4vbHNuQ29va2llQ29uZmlnJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTHNuQ29va2llT3B0aW9ucyB7XG4gIGV4cGlyZXM/OiBudW1iZXIgfCBEYXRlO1xuICBleHBpcmF0aW9uVW5pdD86IHN0cmluZztcbiAgcGF0aD86IHN0cmluZztcbiAgZG9tYWluPzogc3RyaW5nIHwgYm9vbGVhbjtcbiAgc2VjdXJlPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb29raWVTZXJ2aWNlIHtcbiAgc2V0KGNvb2tpZUtleTogc3RyaW5nLCBjb29raWVWYWx1ZSwgY29va2llT3B0aW9uczogTHNuQ29va2llT3B0aW9ucyk6IHZvaWQ7XG5cbiAgZ2V0KGNvb2tpZUtleT86IHN0cmluZyk6IGFueTtcblxuICByZW1vdmUoY29va2llS2V5OiBzdHJpbmcsIGNvb2tpZU9wdGlvbnM6IExzbkNvb2tpZU9wdGlvbnMpOiB2b2lkO1xufVxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBMc25Db29raWVTZXJ2aWNlIGltcGxlbWVudHMgQ29va2llU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChMU05fQ09PS0lFX0NPTkZJRykgcHJpdmF0ZSBjb29raWVDb25maWc6IExzbkNvb2tpZUNvbmZpZywgQEluamVjdChET0NVTUVOVCkgcmVhZG9ubHkgZG9jdW1lbnQ6IGFueSkge1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgY29va2llIHdpdGggZ2l2ZW4ga2V5IHRvIGdpdmVuIHZhbHVlLCBjb29raWUgb3B0aW9ucyBhcmUgb3B0aW9uYWwsIGlmIG5vdCBzZXQsIHNvbWUgcHJvcGVydGllc1xuICAgKiAoc2VjdXJlIGFuZCBkb21haW4pIHdpbGwgYmUgc2V0IGZyb20gZ2xvYmFsIGNvb2tpZSBjb25maWdcbiAgICovXG4gIHNldChjb29raWVLZXk6IHN0cmluZywgY29va2llVmFsdWU6IGFueSwgY29va2llT3B0aW9ucz86IExzbkNvb2tpZU9wdGlvbnMpIHtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgLi4uY29va2llT3B0aW9ucyxcbiAgICAgIHNlY3VyZTogY29va2llT3B0aW9ucyAmJiBjb29raWVPcHRpb25zLnNlY3VyZSA/IGNvb2tpZU9wdGlvbnMuc2VjdXJlIDogdGhpcy5jb29raWVDb25maWcuc2VjdXJlQ29va2llc1xuICAgIH07XG4gICAgaWYgKCF0aGlzLmNvb2tpZUNvbmZpZy5kb21haW5Db29raWVzKSB7XG4gICAgICBvcHRpb25zLmRvbWFpbiA9IGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCB2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KGNvb2tpZVZhbHVlKTtcbiAgICBsZXQgZXhwaXJlc0ZvcjtcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5leHBpcmVzID09PSAnbnVtYmVyJykge1xuICAgICAgZXhwaXJlc0ZvciA9IG9wdGlvbnMuZXhwaXJlcztcbiAgICAgIG9wdGlvbnMuZXhwaXJlcyA9IG5ldyBEYXRlKCk7XG4gICAgICAvLyBUcnlpbmcgdG8gZGVsZXRlIGEgY29va2llOyBzZXQgYSBkYXRlIGZhciBpbiB0aGUgcGFzdFxuICAgICAgaWYgKGV4cGlyZXNGb3IgPT09IC0xKSB7XG4gICAgICAgIG9wdGlvbnMuZXhwaXJlcyA9IG5ldyBEYXRlKCdUaHUsIDAxIEphbiAxOTcwIDAwOjAwOjAwIEdNVCcpO1xuICAgICAgfSBlbHNlIGlmIChvcHRpb25zLmV4cGlyYXRpb25Vbml0KSB7XG4gICAgICAgIGlmIChvcHRpb25zLmV4cGlyYXRpb25Vbml0ID09PSAnaG91cnMnKSB7XG4gICAgICAgICAgb3B0aW9ucy5leHBpcmVzLnNldEhvdXJzKG9wdGlvbnMuZXhwaXJlcy5nZXRIb3VycygpICsgZXhwaXJlc0Zvcik7XG4gICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5leHBpcmF0aW9uVW5pdCA9PT0gJ21pbnV0ZXMnKSB7XG4gICAgICAgICAgb3B0aW9ucy5leHBpcmVzLnNldE1pbnV0ZXMob3B0aW9ucy5leHBpcmVzLmdldE1pbnV0ZXMoKSArIGV4cGlyZXNGb3IpO1xuICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMuZXhwaXJhdGlvblVuaXQgPT09ICdzZWNvbmRzJykge1xuICAgICAgICAgIG9wdGlvbnMuZXhwaXJlcy5zZXRTZWNvbmRzKG9wdGlvbnMuZXhwaXJlcy5nZXRTZWNvbmRzKCkgKyBleHBpcmVzRm9yKTtcbiAgICAgICAgfSBlbHNlIGlmIChvcHRpb25zLmV4cGlyYXRpb25Vbml0ID09PSAnbWlsbGlzZWNvbmRzJykge1xuICAgICAgICAgIG9wdGlvbnMuZXhwaXJlcy5zZXRNaWxsaXNlY29uZHMob3B0aW9ucy5leHBpcmVzLmdldE1pbGxpc2Vjb25kcygpICsgZXhwaXJlc0Zvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb3B0aW9ucy5leHBpcmVzLnNldERhdGUob3B0aW9ucy5leHBpcmVzLmdldERhdGUoKSArIGV4cGlyZXNGb3IpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcHRpb25zLmV4cGlyZXMuc2V0RGF0ZShvcHRpb25zLmV4cGlyZXMuZ2V0RGF0ZSgpICsgZXhwaXJlc0Zvcik7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuZG9jdW1lbnQuY29va2llID0gW1xuICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KGNvb2tpZUtleSksXG4gICAgICAnPScsXG4gICAgICBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpLFxuICAgICAgb3B0aW9ucy5leHBpcmVzID8gJzsgZXhwaXJlcz0nICsgb3B0aW9ucy5leHBpcmVzLnRvVVRDU3RyaW5nKCkgOiAnJyxcbiAgICAgIG9wdGlvbnMucGF0aCA/ICc7IHBhdGg9JyArIG9wdGlvbnMucGF0aCA6ICcnLFxuICAgICAgb3B0aW9ucy5kb21haW4gPyAnOyBkb21haW49JyArIG9wdGlvbnMuZG9tYWluIDogJycsXG4gICAgICBvcHRpb25zLnNlY3VyZSA/ICc7IHNlY3VyZScgOiAnJ1xuICAgIF0uam9pbignJyk7XG4gIH1cblxuICAvKipcbiAgICogS2V5IHByb3ZpZGVkIC0gcmV0dXJucyB2YWx1ZSBvZiBnaXZlbiBjb29raWUgb3IgdW5kZWZpbmVkIGlmIG5vbiBleGlzdGVudFxuICAgKiBLZXkgbm90IHByb3ZpZGVkIC0gcmV0dXJucyBhbGwgY29va2llcyBhcyBPYmplY3Qgb3IgdW5kZWZpbmVkIGlmIHRoZXJlIGFyZSBubyBjb29raWVzXG4gICAqIENvb2tpZSB2YWx1ZXMgYXJlIEpTT04ucGFyc2VkLCBpZiBlcnJvciBvY2N1cnMgZHVyaW5nIHBhcnNpbmcsIHN0cmluZyB2YWx1ZSBpcyBhc3NpZ25lZFxuICAgKi9cbiAgZ2V0KGNvb2tpZUtleT86IHN0cmluZyk6IGFueSB7XG4gICAgY29uc3QgY29va2llU3RyaW5nTGlzdDogQXJyYXk8U3RyaW5nPiA9IHRoaXMuZG9jdW1lbnQuY29va2llID8gdGhpcy5kb2N1bWVudC5jb29raWUuc3BsaXQoJzsgJykgOiBbXTtcblxuICAgIGNvbnN0IGNvb2tpZU9iamVjdCA9IGNvb2tpZVN0cmluZ0xpc3RcbiAgICAgIC5tYXAoY29va2llU3RyaW5nID0+IHtcbiAgICAgICAgY29uc3QgcG9zID0gY29va2llU3RyaW5nLmluZGV4T2YoJz0nKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBuYW1lOiBjb29raWVTdHJpbmcuc3Vic3RyKDAsIHBvcyksXG4gICAgICAgICAgdmFsdWU6IGRlY29kZVVSSUNvbXBvbmVudChjb29raWVTdHJpbmcuc3Vic3RyKHBvcyArIDEpKVxuICAgICAgICB9O1xuICAgICAgfSkuZmlsdGVyKGNvb2tpZSA9PiB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgY29va2llLnZhbHVlICE9PSAndW5kZWZpbmVkJyAmJiAoY29va2llS2V5ID09PSB1bmRlZmluZWQgfHwgY29va2llS2V5ID09PSBjb29raWUubmFtZSk7XG4gICAgICB9KS5yZWR1Y2UoKHByZXZpb3VzVmFsdWU6IG9iamVjdCwgY3VycmVudFZhbHVlOiB7IG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSB9KSA9PiB7XG4gICAgICAgIGxldCB2YWx1ZSA9IG51bGw7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdmFsdWUgPSBKU09OLnBhcnNlKGN1cnJlbnRWYWx1ZS52YWx1ZSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICB2YWx1ZSA9IGN1cnJlbnRWYWx1ZS52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBwcmV2aW91c1ZhbHVlW2N1cnJlbnRWYWx1ZS5uYW1lXSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gcHJldmlvdXNWYWx1ZTtcbiAgICAgIH0sIHt9KTtcbiAgICByZXR1cm4gY29va2llS2V5ID8gY29va2llT2JqZWN0W2Nvb2tpZUtleV0gOiBPYmplY3Qua2V5cyhjb29raWVPYmplY3QpLmxlbmd0aCA+IDAgPyBjb29raWVPYmplY3QgOiB1bmRlZmluZWQ7XG4gIH1cblxuICByZW1vdmUoY29va2llS2V5OiBzdHJpbmcsIGNvb2tpZU9wdGlvbnM6IExzbkNvb2tpZU9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IGNvb2tpZSA9IHRoaXMuZ2V0KGNvb2tpZUtleSk7XG5cbiAgICBpZiAoY29va2llKSB7XG4gICAgICBjb29raWVPcHRpb25zLmV4cGlyZXMgPSAtMTtcbiAgICAgIHRoaXMuc2V0KGNvb2tpZUtleSwgJycsIGNvb2tpZU9wdGlvbnMpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==