import {InjectionToken} from '@angular/core';

export class LsnCookieConfig {
  secureCookies: boolean;
  domainCookies: boolean;

  constructor({
                secureCookies = null, domainCookies = null
              } = {}) {
    this.secureCookies = secureCookies;
    this.domainCookies = domainCookies;
  }
}

export const LSN_COOKIE_CONFIG = new InjectionToken<LsnCookieConfig>('LsnCookieConfig')
