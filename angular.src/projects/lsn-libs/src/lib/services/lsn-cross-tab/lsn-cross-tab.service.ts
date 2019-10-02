import {Inject, Injectable, OnInit} from '@angular/core';
import {LsnCookieService} from './lsn-cookie/lsn-cookie.service';
import {Observable, Subject} from 'rxjs';
import {LsnCrossTabMessage} from './models/lsnCrossTabMessage';
import {LSN_COOKIE_CONFIG, LsnCookieConfig} from './models/lsnCookieConfig';
import {LSN_CROSS_TAB_CONFIG, LsnCrossTabConfig} from './models/lsnCrossTabConfig';

@Injectable({
  providedIn: 'root'
})
export class LsnCrossTabService implements OnInit {
  private messageSubject: Subject<LsnCrossTabMessage>;
  private _messages$: Observable<LsnCrossTabMessage>;
  private tabId = Math.random() + '';
  private messagesReadMap = new Map<string, LsnCrossTabMessage>();

  get messages$() {
    return this._messages$;
  }

  constructor(private lsnCookieService: LsnCookieService, @Inject(LSN_COOKIE_CONFIG) private cookieConfig: LsnCookieConfig,
              @Inject(LSN_CROSS_TAB_CONFIG) private crossTabConfig: LsnCrossTabConfig) {
  }

  ngOnInit(): void {
    this.messageSubject = new Subject<LsnCrossTabMessage>();
    this._messages$ = this.messageSubject.asObservable();
  }

  sendMessage(data: (string | LsnCrossTabMessage | object)) {
    let message;
    if (typeof data === 'string') {
      message = new LsnCrossTabMessage({code: data});
    } else if (data instanceof LsnCrossTabMessage) {
      message = data;
    } else if (typeof data === 'object' && !Array.isArray(data)) {
      message = new LsnCrossTabMessage({...data});
    } else {
      return;
    }
    message.created = new Date().getTime();
    message.tabId = this.tabId;
    this.messagesReadMap.set(this.getMessageId(message), message);
    this.updateCookie(this.messageToPlainObject(message));
  }

  private messageWasRead = (msg: LsnCrossTabMessage): boolean => this.messagesReadMap.has(this.getMessageId(msg));

  private getMessageId = (message: LsnCrossTabMessage): string => message.code + message.created;

  private messageToPlainObject = (msg: LsnCrossTabMessage): object => Object.keys(msg)
    .reduce((minifiedObj, key) => {
      const value = msg[key];
      if (key !== 'attrs' && value !== null && value !== {}) {
        minifiedObj[key] = value;
        return minifiedObj;
      } else {
        return minifiedObj;
      }
    }, {});

  private updateCookie(msg: object) {
    const cookieName = this.cookieConfig.CROSS_TAB;
    const cookieData = this.lsnCookieService.get(cookieName) || [];
    cookieData.push(msg);
    this.lsnCookieService.set(cookieName, cookieData, {
      domain: this.crossTabConfig.ROOT_DOMAIN,
      path: '/'
    });
  }

}
