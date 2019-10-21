import { InjectionToken } from '@angular/core';
export declare class LsnCookieConfig {
    secureCookies: boolean;
    domainCookies: boolean;
    constructor({ secureCookies, domainCookies }?: {
        secureCookies?: any;
        domainCookies?: any;
    });
}
export declare const LSN_COOKIE_CONFIG: InjectionToken<LsnCookieConfig>;
