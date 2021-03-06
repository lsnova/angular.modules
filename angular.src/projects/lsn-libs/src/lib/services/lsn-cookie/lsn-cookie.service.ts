import {Inject, Injectable} from '@angular/core';
import {LSN_COOKIE_CONFIG, LsnCookieConfig} from './lsnCookieConfig';
import {DOCUMENT} from '@angular/common';

export interface LsnCookieOptions {
  expires?: number | Date;
  expirationUnit?: string;
  path?: string;
  domain?: string | boolean;
  secure?: boolean;
}

export interface CookieService {
  set(cookieKey: string, cookieValue, cookieOptions: LsnCookieOptions): void;

  get(cookieKey?: string): any;

  remove(cookieKey: string, cookieOptions: LsnCookieOptions): void;
}

@Injectable({
  providedIn: 'root'
})
export class LsnCookieService implements CookieService {

  constructor(@Inject(LSN_COOKIE_CONFIG) private cookieConfig: LsnCookieConfig, @Inject(DOCUMENT) readonly document: any) {
  }

  /**
   * Sets cookie with given key to given value, cookie options are optional, if not set, some properties
   * (secure and domain) will be set from global cookie config
   */
  set(cookieKey: string, cookieValue: any, cookieOptions?: LsnCookieOptions) {
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
      } else if (options.expirationUnit) {
        if (options.expirationUnit === 'hours') {
          options.expires.setHours(options.expires.getHours() + expiresFor);
        } else if (options.expirationUnit === 'minutes') {
          options.expires.setMinutes(options.expires.getMinutes() + expiresFor);
        } else if (options.expirationUnit === 'seconds') {
          options.expires.setSeconds(options.expires.getSeconds() + expiresFor);
        } else if (options.expirationUnit === 'milliseconds') {
          options.expires.setMilliseconds(options.expires.getMilliseconds() + expiresFor);
        } else {
          options.expires.setDate(options.expires.getDate() + expiresFor);
        }
      } else {
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
  get(cookieKey?: string): any {
    const cookieStringList: Array<String> = this.document.cookie ? this.document.cookie.split('; ') : [];

    const cookieObject = cookieStringList
      .map(cookieString => {
        const pos = cookieString.indexOf('=');
        return {
          name: cookieString.substr(0, pos),
          value: decodeURIComponent(cookieString.substr(pos + 1))
        };
      }).filter(cookie => {
        return typeof cookie.value !== 'undefined' && (cookieKey === undefined || cookieKey === cookie.name);
      }).reduce((previousValue: object, currentValue: { name: string, value: any }) => {
        let value = null;
        try {
          value = JSON.parse(currentValue.value);
        } catch (e) {
          value = currentValue.value;
        }
        previousValue[currentValue.name] = value;
        return previousValue;
      }, {});
    return cookieKey ? cookieObject[cookieKey] : Object.keys(cookieObject).length > 0 ? cookieObject : undefined;
  }

  remove(cookieKey: string, cookieOptions: LsnCookieOptions = {}) {
    const cookie = this.get(cookieKey);

    if (cookie) {
      cookieOptions.expires = -1;
      this.set(cookieKey, '', cookieOptions);
      return true;
    } else {
      return false;
    }
  }
}
