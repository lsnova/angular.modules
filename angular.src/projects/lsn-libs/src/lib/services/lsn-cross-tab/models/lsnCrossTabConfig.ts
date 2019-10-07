import {InjectionToken} from '@angular/core';

export class LsnCrossTabConfig {
  cookieCleanFreq: number;
  cookieReadFreq: number;
  msgTtl: number; // represents duration of existence of given cross tab message, after this period from message creation, the message will be deleted from cookie
  rootDomain: string;
  crossTabCookieName: string;

  constructor({cookieCleanFreq = null, cookieReadFreq = null, msgTtl = null, rootDomain = null, crossTabCookieName = null} = {}) {
    this.cookieCleanFreq = cookieCleanFreq;
    this.cookieReadFreq = cookieReadFreq;
    this.msgTtl = msgTtl;
    this.rootDomain = rootDomain;
    this.crossTabCookieName = crossTabCookieName;
  }
}

export const LSN_CROSS_TAB_CONFIG = new InjectionToken<LsnCrossTabConfig>('LsnCrossTabConfig');
