import {TestBed} from '@angular/core/testing';

import {LsnCookieService} from './lsn-cookie.service';
import {LSN_COOKIE_CONFIG} from './lsnCookieConfig';
import {DOCUMENT} from '@angular/common';

let mockDocument = {cookie: undefined};
let testCookie = null;

describe('LsnCookieService', () => {
  beforeEach(() => {
    mockDocument = {cookie: undefined};
    testCookie = {
      name: 'myCookie',
      options: {
        expires: 1000,
        expirationUnit: 'milliseconds'
      },
      value: 'some mock value'
    };
    TestBed.configureTestingModule({
      providers: [
        {provide: LSN_COOKIE_CONFIG, useValue: {domainCookies: false, secureCookies: false}},
        {provide: DOCUMENT, useValue: document}
      ]
    });
  });

  it('should be created', () => {
    const service: LsnCookieService = TestBed.inject(LsnCookieService);
    expect(service).toBeTruthy();
  });

  it('should properly set cookie and retrieve cookie', () => {
    const service: LsnCookieService = TestBed.inject(LsnCookieService);
    service.set(testCookie.name, testCookie.value, testCookie.options);
    expect(service.document.cookie).toBeDefined();

    const retrievedCookieValue = service.get(testCookie.name);
    expect(retrievedCookieValue).toEqual(testCookie.value);
  });

  it('should retrieve list of all cookies', () => {
    const service: LsnCookieService = TestBed.inject(LsnCookieService);
    service.set(testCookie.name, testCookie.value, testCookie.options);
    const testCookie2 = {...testCookie, name: 'test cookie two'};
    service.set(testCookie2.name, testCookie2.value, testCookie2.options);

    const cookies = service.get();
    console.log(cookies);
    expect(cookies).toBeDefined();
    expect(typeof cookies).toEqual('object');
  });
});
