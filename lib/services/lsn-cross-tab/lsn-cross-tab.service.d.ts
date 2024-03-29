import { OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { LsnCrossTabMessage } from './models/lsnCrossTabMessage';
import { LsnCrossTabConfig } from './models/lsnCrossTabConfig';
import { LsnCookieService } from '../lsn-cookie/lsn-cookie.service';
import * as i0 from "@angular/core";
export declare class LsnCrossTabService implements OnDestroy {
    private lsnCookieService;
    private readonly messageSubject;
    readonly tabId: string;
    private readonly messagesReadSet;
    private readonly tabOpenTime;
    private cookieReadSubscription;
    private cookieCleanSubscription;
    private crossTabConfig;
    private get crossTabCookieName();
    constructor(lsnCookieService: LsnCookieService, crossTabConfig: LsnCrossTabConfig);
    /**
     * This function sets up subscriptions for reading and cleaning cross tab cookie
     */
    run(): void;
    /**
     * This Observable emits messages that were sent by other tabs
     */
    get messages$(): Observable<LsnCrossTabMessage>;
    /**
     * Manually set cross tab config, for example when config must be provided asynchronously and not with InjectionToken
     */
    setCrossTabConfig(config: LsnCrossTabConfig): void;
    /**
     * Sends message to other tabs by adding this message to cross tab cookie
     */
    sendMessage(data: (string | LsnCrossTabMessage | object)): void;
    /**
     * Checks if message with given id was already read
     */
    private messageWasRead;
    private getMessageId;
    private messageToPlainObject;
    /**
     * Appends given message to cross tab cookie value
     */
    private updateCookie;
    private get cookie();
    private set cookie(value);
    /**
     * Removes messages from cross tab cookie that are older than supplied config.msgTtl time
     */
    private cleanCookie;
    /**
     * Callback invoked after every cookie read interval
     */
    private readMessages;
    getCookie: () => LsnCrossTabMessage<any>[];
    /**
     * Removes all subscriptions that this service is subscribe to (intervals are cleared)
     */
    unsubscribe(): void;
    ngOnDestroy(): void;
    /**
     * Sorts two cookie arrays and compares each element
     */
    private areCookiesEqual;
    /**
     * Compares two messages by properties in order: 'created', 'code', 'tabId';
     */
    private messageComparer;
    /**
     * Function determines whether given message is to be removed from the cross tab cookie
     */
    private cleanCookieFilter;
    static ɵfac: i0.ɵɵFactoryDeclaration<LsnCrossTabService, [null, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LsnCrossTabService>;
}
