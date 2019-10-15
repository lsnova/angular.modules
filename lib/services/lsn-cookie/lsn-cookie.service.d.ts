import { LsnCookieConfig } from './models/lsnCookieConfig';
export interface CookieOptions {
    expires?: number | Date;
    expirationUnit?: string;
    path?: string;
    domain?: string;
    secure?: boolean;
}
export interface CookieService {
    set(cookieKey: string, cookieValue: any, cookieOptions: CookieOptions): void;
    get(cookieKey?: string): any;
    remove(cookieKey: string, cookieOptions: CookieOptions): void;
}
export declare class LsnCookieService implements CookieService {
    private cookieConfig;
    readonly document: any;
    constructor(cookieConfig: LsnCookieConfig, document: any);
    set(cookieKey: string, cookieValue: any, cookieOptions: CookieOptions): string;
    get(cookieKey?: string): any;
    remove(cookieKey: string, cookieOptions?: CookieOptions): boolean;
}
