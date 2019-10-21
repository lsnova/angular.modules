import { LsnCookieConfig } from './lsnCookieConfig';
export interface LsnCookieOptions {
    expires?: number | Date;
    expirationUnit?: string;
    path?: string;
    domain?: string | boolean;
    secure?: boolean;
}
export interface CookieService {
    set(cookieKey: string, cookieValue: any, cookieOptions: LsnCookieOptions): void;
    get(cookieKey?: string): any;
    remove(cookieKey: string, cookieOptions: LsnCookieOptions): void;
}
export declare class LsnCookieService implements CookieService {
    private cookieConfig;
    readonly document: any;
    constructor(cookieConfig: LsnCookieConfig, document: any);
    /**
     * Sets cookie with given key to given value, cookie options are optional, if not set, some properties
     * (secure and domain) will be set from global cookie config
     */
    set(cookieKey: string, cookieValue: any, cookieOptions?: LsnCookieOptions): void;
    /**
     * Key provided - returns value of given cookie or undefined if non existent
     * Key not provided - returns all cookies as Object or undefined if there are no cookies
     * Cookie values are JSON.parsed, if error occurs during parsing, string value is assigned
     */
    get(cookieKey?: string): any;
    remove(cookieKey: string, cookieOptions?: LsnCookieOptions): boolean;
}
