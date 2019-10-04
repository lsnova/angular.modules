import {Inject, Injectable, OnDestroy} from '@angular/core';
import {LsnCookieService} from './lsn-cookie/lsn-cookie.service';
import {interval, Observable, Subject, Subscription} from 'rxjs';
import {LsnCrossTabMessage} from './models/lsnCrossTabMessage';
import {LSN_COOKIE_CONFIG, LsnCookieConfig} from './models/lsnCookieConfig';
import {LSN_CROSS_TAB_CONFIG, LsnCrossTabConfig} from './models/lsnCrossTabConfig';

@Injectable({
  providedIn: 'root'
})
export class LsnCrossTabService implements OnDestroy {
  private readonly messageSubject: Subject<LsnCrossTabMessage>;
  private readonly tabId: string;
  private readonly messagesReadSet: Set<string>;
  private readonly crossTabCookieName: string;
  private readonly tabOpenTime: number;
  private cookieReadSubscription: Subscription;
  private cookieCleanSubscription: Subscription;

  constructor(private lsnCookieService: LsnCookieService, @Inject(LSN_COOKIE_CONFIG) private cookieConfig: LsnCookieConfig,
              @Inject(LSN_CROSS_TAB_CONFIG) private crossTabConfig: LsnCrossTabConfig) {
    this.crossTabCookieName = cookieConfig.CROSS_TAB;
    this.messageSubject = new Subject<LsnCrossTabMessage>();
    this.tabId = Math.random() + '';
    this.messagesReadSet = new Set<string>();
    this.tabOpenTime = Date.now();
  }

  run(): void {
    if (!this.cookieReadSubscription) {
      this.cookieReadSubscription = interval(this.crossTabConfig.COOKIE_READ_FREQ)
        .subscribe(() => this.readMessages());
    }
    if (!this.cookieCleanSubscription) {
      this.cookieCleanSubscription = interval(this.crossTabConfig.COOKIE_CLEAN_FREQ)
        .subscribe(() => this.cleanCookie());
    }
  }

  get messages$(): Observable<LsnCrossTabMessage> {
    return this.messageSubject;
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
    this.messagesReadSet.add(this.getMessageId(message));
    this.updateCookie(this.messageToPlainObject(message));
  }

  private messageWasRead = (msg: LsnCrossTabMessage): boolean => this.messagesReadSet.has(this.getMessageId(msg));

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
    const cookieData: Array<LsnCrossTabMessage> = this.cookie;
    cookieData.push(msg);
    this.cookie = cookieData;
  }

  private get cookie() {
    return this.lsnCookieService.get(this.cookieConfig.CROSS_TAB) || [];
  }

  private set cookie(cookieData: Array<LsnCrossTabMessage>) {
    this.lsnCookieService.set(this.crossTabCookieName, cookieData, {
      domain: this.crossTabConfig.ROOT_DOMAIN,
      path: '/'
    });
  }

  private cleanCookie() {
    const currentCookie = this.cookie;
    if (currentCookie === null) {
      return;
    }

    const timestamp = new Date().getTime();
    const cleanedCookie = currentCookie.filter(cookieItem => {
      return timestamp - cookieItem.created <= this.crossTabConfig.MSG_TTL;
    });
    // w miedzyczasie ktoś zmodyfikowal ciasteczko - mógł tylko dodać jakiś message (asynchronicznie do tego)
    if (!this.areCookiesEqual(currentCookie, this.cookie)) {
      return;
    }

    this.cookie = cleanedCookie;
  }

  private readMessages() {
    if (this.cookie) {
      this.cookie.forEach((msgData: LsnCrossTabMessage) => {
        const msgCopy = {...msgData};
        if (!this.messageWasRead(msgCopy)) {
          this.messagesReadSet.add(this.getMessageId(msgCopy));
          this.messageSubject.next(msgCopy);
        }
      });
    }
  }

  getCookie = () => this.cookie;

  unsubscribe() {
    this.cookieReadSubscription.unsubscribe();
    this.cookieCleanSubscription.unsubscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  /**
   * Sorts two cookie arrays and compares each element
   */
  private areCookiesEqual(firstCookie: Array<LsnCrossTabMessage>, secondCookie: Array<LsnCrossTabMessage>) {
    if (firstCookie.length !== secondCookie.length) {
      return false;
    } else if (firstCookie.length === 0 && secondCookie.length === 0) {
      return true;
    }
    firstCookie.sort(this.messageComparer);
    secondCookie.sort(this.messageComparer);
    let index = 0;
    let areCookiesEqual = true;
    for (const message of firstCookie) {
      if (LsnCrossTabMessage.compare(message, secondCookie[index])) {
        areCookiesEqual = false;
      } else {
        ++index;
      }
    }
    return areCookiesEqual;
  }

  /**
   * Compares two messages by properties in order: 'created', 'code', 'tabId';
   */
  private messageComparer(firstCookieValue: LsnCrossTabMessage, secondCookieValue: LsnCrossTabMessage) {
    let result = firstCookieValue.created < secondCookieValue.created ? -1 : secondCookieValue.created < firstCookieValue.created ? 1 : 0;
    if (result === 0) {
      result = firstCookieValue.code < secondCookieValue.code ? -1 : secondCookieValue.code < firstCookieValue.code ? 1 : 0;
      if (result === 0) {
        result = firstCookieValue.tabId < secondCookieValue.tabId ? -1 : secondCookieValue.tabId < firstCookieValue.tabId ? 1 : 0;
      }
    }
    return result;
  }

}
