import {InjectionToken} from '@angular/core';

export class LsnCookieConfig {
  CHAT_WAS_OPENED: string;
  CROSS_TAB: string;
  SELECTED_LANGUAGE: string;
  STARTED_BRAND: string;
  TOUCH_SESSION: string;
  secureCookies: boolean;
  domainCookies: boolean;

  constructor({
                CHAT_WAS_OPENED = null, CROSS_TAB = null, SELECTED_LANGUAGE = null, STARTED_BRAND = null, TOUCH_SESSION = null,
                secureCookies = null, domainCookies = null
              } = {}) {
    this.CHAT_WAS_OPENED = CHAT_WAS_OPENED;
    this.CROSS_TAB = CROSS_TAB;
    this.SELECTED_LANGUAGE = SELECTED_LANGUAGE;
    this.TOUCH_SESSION = TOUCH_SESSION;
    this.secureCookies = secureCookies;
    this.domainCookies = domainCookies;
  }
}

export const LSN_COOKIE_CONFIG = new InjectionToken<LsnCookieConfig>('LsnCookieConfig')
