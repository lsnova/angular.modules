import {Inject, Injectable, OnDestroy} from '@angular/core';
import {interval, Observable, Subject, Subscription} from 'rxjs';
import {LsnCrossTabMessage} from './models/lsnCrossTabMessage';
import {LSN_CROSS_TAB_CONFIG, LsnCrossTabConfig} from './models/lsnCrossTabConfig';
import {LsnCookieService} from '../lsn-cookie/lsn-cookie.service';

@Injectable({
  providedIn: 'root'
})
export class LsnCrossTabService implements OnDestroy {
  private readonly messageSubject: Subject<LsnCrossTabMessage>;
  readonly tabId: string;
  private readonly messagesReadSet: Set<string>;
  private readonly crossTabCookieName: string;
  private readonly tabOpenTime: number;
  private cookieReadSubscription: Subscription;
  private cookieCleanSubscription: Subscription;

  constructor(private lsnCookieService: LsnCookieService, @Inject(LSN_CROSS_TAB_CONFIG) private crossTabConfig: LsnCrossTabConfig) {
    this.crossTabCookieName = crossTabConfig.crossTabCookieName;
    this.messageSubject = new Subject<LsnCrossTabMessage>();
    this.tabId = Math.random() + '';
    this.messagesReadSet = new Set<string>();
    this.tabOpenTime = Date.now();
  }

  /**
   * This function sets up subscriptions for reading and cleaning cross tab cookie
   */
  run(): void {
    if (!this.cookieReadSubscription) {
      this.cookieReadSubscription = interval(this.crossTabConfig.cookieReadFreq)
        .subscribe(() => this.readMessages());
    }
    if (!this.cookieCleanSubscription) {
      this.cookieCleanSubscription = interval(this.crossTabConfig.cookieCleanFreq)
        .subscribe(() => this.cleanCookie());
    }
  }

  /**
   * This Observable emits messages that were sent by other tabs
   */
  get messages$(): Observable<LsnCrossTabMessage> {
    return this.messageSubject;
  }

  /**
   * Manually set cross tab config, for example when config must be provided asynchronously and not with InjectionToken
   */
  setCrossTabConfig(config: LsnCrossTabConfig) {
    this.crossTabConfig = config;
  }

  /**
   * Sends message to other tabs by adding this message to cross tab cookie
   */
  sendMessage(data: (string | LsnCrossTabMessage | object)) {
    let message;
    if (typeof data === 'string') {
      message = new LsnCrossTabMessage({code: data});
    } else if (data instanceof LsnCrossTabMessage) {
      message = data;
    } else if (!!data && typeof data === 'object' && !Array.isArray(data)) {
      message = new LsnCrossTabMessage({...data});
    } else {
      return;
    }
    // previous implementation, message.created is always overridden
    message.created = new Date().getTime();
    message.tabId = this.tabId;
    this.messagesReadSet.add(this.getMessageId(message));
    this.updateCookie(this.messageToPlainObject(message));
  }

  /**
   * Checks if message with given id was already read
   */
  private messageWasRead = (msg: LsnCrossTabMessage): boolean => this.messagesReadSet.has(this.getMessageId(msg));

  private getMessageId = (message: LsnCrossTabMessage): string => message.tabId + message.created + message.code;

  private messageToPlainObject = (msg: LsnCrossTabMessage): object => Object.keys(msg)
    .reduce((minifiedObj, key) => {
      const value = msg[key];
      if (!(key === 'attrs' && (value === null || value === {}))) {
        minifiedObj[key] = value;
        return minifiedObj;
      } else {
        return minifiedObj;
      } // tslint:disable
    }, {}); // tslint:enable

  /**
   * Appends given message to cross tab cookie value
   */
  private updateCookie(msg: object) {
    const cookieData: Array<LsnCrossTabMessage> = this.cookie;
    cookieData.push(msg);
    this.cookie = cookieData;
  }

  private get cookie() {
    return this.lsnCookieService.get(this.crossTabConfig.crossTabCookieName) || [];
  }

  private set cookie(cookieData: Array<LsnCrossTabMessage>) {
    this.lsnCookieService.set(this.crossTabCookieName, cookieData, {
      domain: this.crossTabConfig.rootDomain,
      path: '/'
    });
  }

  /**
   * Removes messages from cross tab cookie that are older than supplied config.msgTtl time
   */
  private cleanCookie() {
    const currentCookie = this.cookie;
    if (currentCookie === null) {
      return;
    }

    const timestamp = new Date().getTime();
    const cleanedCookie = currentCookie.filter(this.cleanCookieFilter(timestamp, this.crossTabConfig.msgTtl));
    // previous implementation, cookie might have been modified in the other tab?
    if (!this.areCookiesEqual(currentCookie, this.cookie)) {
      return;
    }

    this.cookie = cleanedCookie;
  }

  /**
   * Callback invoked after every cookie read interval
   */
  private readMessages() {
    if (this.cookie) {
      this.cookie.forEach((msgData: LsnCrossTabMessage) => {
        if (msgData.created > this.tabOpenTime) {
          const msgCopy = {...msgData};
          if (!this.messageWasRead(msgCopy)) {
            this.messagesReadSet.add(this.getMessageId(msgCopy));
            this.messageSubject.next(msgCopy);
          }
        }
      });
    }
  }

  getCookie = () => this.cookie;

  /**
   * Removes all subscriptions that this service is subscribe to (intervals are cleared)
   */
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

  /**
   * Function determines whether given message is to be removed from the cross tab cookie
   */
  private cleanCookieFilter(timestamp: number, msgTtl: number) {
    return (cookieMessage: LsnCrossTabMessage) => timestamp - cookieMessage.created <= msgTtl;
  }

}
