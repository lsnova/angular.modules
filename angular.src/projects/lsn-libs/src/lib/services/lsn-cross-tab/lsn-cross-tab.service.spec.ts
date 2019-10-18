import {async, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {LsnCrossTabService} from './lsn-cross-tab.service';
import {CookieOptions, CookieService, LsnCookieService} from './lsn-cookie/lsn-cookie.service';
import {LSN_CROSS_TAB_CONFIG, LsnCrossTabConfig} from './models/lsnCrossTabConfig';
import {LsnCrossTabMessage} from './models/lsnCrossTabMessage';

class MockCookieService implements CookieService {
  cookie = [];
  get = (cookieKey?: string): any => this.cookie;

  remove(cookieKey: string, cookieOptions: CookieOptions): void {
  }

  set(cookieKey: string, cookieValue, cookieOptions: CookieOptions): void {
    this.cookie = cookieValue;
  }

}

describe('LsnCrossTabService', () => {
  const mockCookieService = new MockCookieService();
  let crossTabService: LsnCrossTabService;

  beforeEach(async(() => TestBed.configureTestingModule({
    providers: [
      LsnCrossTabService,
      {
        provide: LsnCookieService,
        useValue: mockCookieService
      },
      {
        provide: LSN_CROSS_TAB_CONFIG, useValue: new LsnCrossTabConfig({
          cookieCleanFreq: 200,
          cookieReadFreq: 100,
          msgTtl: 15000,
          rootDomain: 'localhost:4200',
          crossTabCookieName: 'ih-crosstab-data'
        })
      }
    ]
  })));

  beforeEach(() => {
    crossTabService = TestBed.get(LsnCrossTabService);
    mockCookieService.cookie = [];
  });

  it('should be created', () => {
    const service: LsnCrossTabService = TestBed.get(LsnCrossTabService);
    expect(service).toBeTruthy();
  });

  it('should add message to cookie when send message is invoked', () => {
    const cookieServiceSetCookieSpy = spyOn(mockCookieService, 'set');
    const message = 'test message';
    crossTabService.sendMessage(message);
    expect(cookieServiceSetCookieSpy).toHaveBeenCalled();
    expect(mockCookieService.cookie.length).toEqual(1);
  });

  it('should correctly create message for string, object and LsnCrossTabMessage instance', () => {
    const stringMessage = 'text message';
    const objectMessage = {
      created: Date.now(),
      code: 'object message',
      tabId: crossTabService.tabId,
      attrs: null
    };
    const instanceMessage = new LsnCrossTabMessage({
      created: Date.now(),
      code: 'instance message',
      tabId: crossTabService.tabId,
      attrs: null
    });
    crossTabService.sendMessage(stringMessage);
    expect(mockCookieService.cookie.length).toEqual(1);
    crossTabService.sendMessage(objectMessage);
    expect(mockCookieService.cookie.length).toEqual(2);
    crossTabService.sendMessage(instanceMessage);
    expect(mockCookieService.cookie.length).toEqual(3);
    mockCookieService.cookie.forEach(message => {
      Object.keys(message).forEach(key => key in LsnCrossTabMessage);
    });
  });

  it('should clean message from cookie after it expired', () => {
    const messageOne = {
      code: 'object message',
      tabId: crossTabService.tabId
    };
    const messageTwo = {
      code: 'object message 2',
      tabId: crossTabService.tabId,
    };
    // cleanCookieFilter has private access, so it must be casted to 'any'
    spyOn<any>(crossTabService, 'cleanCookieFilter').and.returnValue((cookieMessage) => cookieMessage.code !== messageOne.code);
    crossTabService.sendMessage(messageOne);
    crossTabService.sendMessage(messageTwo);
    expect(mockCookieService.cookie.length).toEqual(2);
    // accessing private method workaround
    const cleanCookie = crossTabService['cleanCookie'];
    cleanCookie.bind(crossTabService)();
    expect(mockCookieService.cookie.length).toEqual(1);
  });

  it('should filter message older than given msgTtl', () => {
    const now = Date.now();
    const crossTabConfig: LsnCrossTabConfig = TestBed.get(LSN_CROSS_TAB_CONFIG);
    const cleanCookieFilter: (timestamp: number, msgTtl: number) => (LsnCrossTabMessage) => boolean = crossTabService['cleanCookieFilter'];
    const messages = [
      new LsnCrossTabMessage({
        code: 'message to remove',
        created: now - crossTabConfig.msgTtl - 100
      }),
      new LsnCrossTabMessage({
        code: 'message to keep',
        created: now - crossTabConfig.msgTtl + 100
      })
    ];
    const filteredMessages = messages.filter(cleanCookieFilter(now, crossTabConfig.msgTtl));
    expect(filteredMessages.length).toEqual(1);
  });

  it('should read and clean messages after specified intervals', fakeAsync(() => {
    crossTabService.run();
    const crossTabMessageConfig: LsnCrossTabConfig = TestBed.get(LSN_CROSS_TAB_CONFIG);
    // spies
    // NOTE: without and.callThrough(), functions inside these spies will not be invoked
    const readMessageSpy = spyOn<any>(crossTabService, 'readMessages').and.callThrough();
    const cleanCookieSpy = spyOn<any>(crossTabService, 'cleanCookie').and.callThrough();
    const areCookiesEqualSpy = spyOn<any>(crossTabService, 'areCookiesEqual').and.callThrough();
    const messageWasReadSpy = spyOn<any>(crossTabService, 'messageWasRead').and.callThrough();
    // model
    const message = new LsnCrossTabMessage({code: 'message one', created: Date.now(), tabId: crossTabService.tabId});
    mockCookieService.set('mock key', [message], null);
    // read message tick
    tick(crossTabMessageConfig.cookieReadFreq + 1);
    expect(readMessageSpy).toHaveBeenCalled();
    expect(messageWasReadSpy).toHaveBeenCalled();
    // clean message tick
    tick(crossTabMessageConfig.cookieCleanFreq + 1);
    expect(cleanCookieSpy).toHaveBeenCalled();
    expect(areCookiesEqualSpy).toHaveBeenCalled();
    crossTabService.unsubscribe();
  }));

});
