import { InjectionToken } from '@angular/core';
export declare class LsnCrossTabConfig {
    cookieCleanFreq: number;
    cookieReadFreq: number;
    msgTtl: number;
    rootDomain: string;
    crossTabCookieName: string;
    constructor({ cookieCleanFreq, cookieReadFreq, msgTtl, rootDomain, crossTabCookieName }?: {
        cookieCleanFreq?: any;
        cookieReadFreq?: any;
        msgTtl?: any;
        rootDomain?: any;
        crossTabCookieName?: any;
    });
}
export declare const LSN_CROSS_TAB_CONFIG: InjectionToken<LsnCrossTabConfig>;
