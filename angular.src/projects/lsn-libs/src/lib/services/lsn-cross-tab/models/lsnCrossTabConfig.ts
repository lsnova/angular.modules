import {InjectionToken} from '@angular/core';

export class LsnCrossTabConfig {
  COOKIE_CLEAN_FREQ: number;
  COOKIE_READ_FREQ: number;
  MSG_TTL: number;
  ROOT_DOMAIN: string;
  SSO_REFRESH_URL: string;

  constructor({COOKIE_CLEAN_FREQ = null, COOKIE_READ_FREQ = null, MSG_TTL = null, ROOT_DOMAIN = null, SSO_REFRESH_URL = null} = {}) {
    this.COOKIE_CLEAN_FREQ = COOKIE_CLEAN_FREQ;
    this.COOKIE_READ_FREQ = COOKIE_READ_FREQ;
    this.MSG_TTL = MSG_TTL;
    this.ROOT_DOMAIN = ROOT_DOMAIN;
    this.SSO_REFRESH_URL = SSO_REFRESH_URL;
  }
}

export const LSN_CROSS_TAB_CONFIG = new InjectionToken<LsnCrossTabConfig>('LsnCrossTabConfig');
