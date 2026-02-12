import * as i0 from '@angular/core';
import { ElementRef, EventEmitter, ModuleWithProviders, OnChanges, InjectionToken, OnDestroy, OnInit } from '@angular/core';
import * as i1$1 from '@angular/forms';
import { NgModel, ControlValueAccessor, NgControl } from '@angular/forms';
import * as i1 from '@angular/common';
import { Observable, Subscription } from 'rxjs';

declare class CapitalizeDirective {
    private model;
    constructor(model: NgModel);
    onInputChange($event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CapitalizeDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<CapitalizeDirective, "[ngModel][lsnCapitalize]", never, {}, {}, never, never, false, never>;
}

declare class LsnCapitalizeModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<LsnCapitalizeModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<LsnCapitalizeModule, [typeof CapitalizeDirective], never, [typeof CapitalizeDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<LsnCapitalizeModule>;
}

declare class LatinToGreekDirective {
    private model;
    private el;
    private latinToGreek;
    constructor(model: NgModel, el: ElementRef);
    private getCaret;
    private setCaret;
    onInputChange($event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LatinToGreekDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<LatinToGreekDirective, "[ngModel][lsnLatinToGreek]", never, {}, {}, never, never, false, never>;
}

declare class LsnLatinToGreekModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<LsnLatinToGreekModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<LsnLatinToGreekModule, [typeof LatinToGreekDirective], never, [typeof LatinToGreekDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<LsnLatinToGreekModule>;
}

interface NumericConfig {
    min?: number;
    max?: number;
    maxLength?: number;
    precision?: number;
    decimals?: string;
    thousands?: string;
    config?: string;
    step?: number;
    noScientificNotation?: boolean;
    alwaysDisplayDecimals?: boolean;
}
declare class DefaultNumericConfig implements NumericConfig {
    min: number;
    max: number;
    maxLength: number;
    precision: number;
    decimals: string;
    thousands: string;
    step: number;
    noScientificNotation: boolean;
    alwaysDisplayDecimals: boolean;
    constructor(props?: {});
}
declare class CustomNumericConfig {
    default?: NumericConfig;
    custom?: {
        [key: string]: NumericConfig;
    };
    constructor(props?: {});
}
declare class NumericConfigService {
    private config;
    constructor(config: CustomNumericConfig);
    getDefaultConfig(): NumericConfig;
    getCustomConfig(key: any): {
        min?: number;
        max?: number;
        maxLength?: number;
        precision?: number;
        decimals?: string;
        thousands?: string;
        config?: string;
        step?: number;
        noScientificNotation?: boolean;
        alwaysDisplayDecimals?: boolean;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<NumericConfigService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NumericConfigService>;
}

declare enum NumericMessage {
    ADDITIONAL_DECIMAL_SEPARATOR = 0,
    RANGE_EXCEEDED = 1
}
declare class NumericDirective implements ControlValueAccessor {
    private el;
    private configService;
    protected _lsnNumeric: NumericConfig;
    set lsnNumeric(newValue: NumericConfig);
    get lsnNumeric(): NumericConfig;
    lsnNumericMessages: EventEmitter<NumericMessage>;
    element: ElementRef;
    protected config: NumericConfig;
    onChange: (_: any) => void;
    onTouch: () => void;
    constructor(el: ElementRef, configService: NumericConfigService);
    inputHandler($event: any): void;
    focusHandler(): void;
    blurHandler(): void;
    writeValue(modelValue: string): Promise<void>;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    get displayValue(): any;
    set displayValue(value: any);
    setConfig(): void;
    parseValue(value: any): number;
    handleWholesLength(value: any): any;
    removeInvalidCharacters(value: any, allowDecimalsOnly?: boolean): any;
    private cleanUp;
    handleRange(value: any): any;
    handleStep(value: number): number;
    prepareDisplayValue(value: any): string;
    setEditMode(): void;
    keyDownHandler(e: KeyboardEvent): void;
    setDisabledState(isDisabled: boolean): void;
    /**
     * parse whole part of a number to display value (based on given config)
     */
    protected getWholeDisplayValue(whole: string | number): string;
    /**
     * get whole and decimal part of a number
     * type of return values may vary, it is intentional
     * the returned array should have size of 1(only whole number) or 2(whole and decimal)
     */
    protected getWholeAndDecimalParts(value: string | number): Array<number | string>;
    protected defaultDecimals(value?: string | number, precision?: number): string;
    protected shouldAddDefaultDecimals(decimals: string | number | undefined): boolean;
    isConfigEqual(config1?: NumericConfig, config2?: NumericConfig): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NumericDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NumericDirective, "[lsnNumeric]", never, { "lsnNumeric": { "alias": "lsnNumeric"; "required": false; }; }, { "lsnNumericMessages": "lsnNumericMessages"; }, never, never, false, never>;
}

declare class LsnNumericModule {
    static forRoot(config?: CustomNumericConfig): ModuleWithProviders<LsnNumericModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<LsnNumericModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<LsnNumericModule, [typeof NumericDirective], never, [typeof NumericDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<LsnNumericModule>;
}

declare class NumPadConfig {
    maxlength: number;
    allowLeadingZeros: boolean;
}
declare class NumPadDirective implements OnChanges {
    private element;
    private ngControl;
    lsnNumPad: {};
    protected config: NumPadConfig;
    private defaultConfig;
    constructor(element: ElementRef, ngControl: NgControl);
    ngOnChanges(): void;
    inputHandler($event: any): void;
    blurHandler($event: any): void;
    protected setValue(value: any): void;
    protected parseNewValue(value: any, blurEvent?: boolean): any;
    keyDownHandler(e: KeyboardEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NumPadDirective, [null, { optional: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NumPadDirective, "[lsnNumPad]", never, { "lsnNumPad": { "alias": "lsnNumPad"; "required": false; }; }, {}, never, never, false, never>;
}

declare class LsnNumpadModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<LsnNumpadModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<LsnNumpadModule, [typeof NumPadDirective], never, [typeof NumPadDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<LsnNumpadModule>;
}

declare class LsnCookieModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<LsnCookieModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<LsnCookieModule, never, [typeof i1.CommonModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<LsnCookieModule>;
}

declare class LsnCrossTabMessage<T extends object = any> {
    created?: number;
    code?: string;
    tabId?: string;
    attrs?: T;
    constructor({ created, code, tabId, attrs }?: LsnCrossTabMessage<T>);
    static compare(firstMessage: LsnCrossTabMessage, secondMessage: LsnCrossTabMessage): boolean;
}

declare class LsnCrossTabConfig {
    cookieCleanFreq: number;
    cookieReadFreq: number;
    msgTtl: number;
    rootDomain: string;
    crossTabCookieName: string;
    constructor({ cookieCleanFreq, cookieReadFreq, msgTtl, rootDomain, crossTabCookieName }?: {
        cookieCleanFreq?: any;
        cookieReadFreq?: any;
        msgTtl?: any;
        rootDomain?: any;
        crossTabCookieName?: any;
    });
}
declare const LSN_CROSS_TAB_CONFIG: InjectionToken<LsnCrossTabConfig>;

declare class LsnCookieConfig {
    secureCookies: boolean;
    domainCookies: boolean;
    constructor({ secureCookies, domainCookies }?: {
        secureCookies?: any;
        domainCookies?: any;
    });
}
declare const LSN_COOKIE_CONFIG: InjectionToken<LsnCookieConfig>;

interface LsnCookieOptions {
    expires?: number | Date;
    expirationUnit?: string;
    path?: string;
    domain?: string | boolean;
    secure?: boolean;
}
interface CookieService {
    set(cookieKey: string, cookieValue: any, cookieOptions: LsnCookieOptions): void;
    get(cookieKey?: string): any;
    remove(cookieKey: string, cookieOptions: LsnCookieOptions): void;
}
declare class LsnCookieService implements CookieService {
    private cookieConfig;
    readonly document: any;
    constructor(cookieConfig: LsnCookieConfig, document: any);
    /**
     * Sets cookie with given key to given value, cookie options are optional, if not set, some properties
     * (secure and domain) will be set from global cookie config
     */
    set(cookieKey: string, cookieValue: any, cookieOptions?: LsnCookieOptions): void;
    /**
     * Key provided - returns value of given cookie or undefined if non existent
     * Key not provided - returns all cookies as Object or undefined if there are no cookies
     * Cookie values are JSON.parsed, if error occurs during parsing, string value is assigned
     */
    get(cookieKey?: string): any;
    remove(cookieKey: string, cookieOptions?: LsnCookieOptions): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<LsnCookieService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LsnCookieService>;
}

declare class LsnCrossTabService implements OnDestroy {
    private lsnCookieService;
    private readonly messageSubject;
    readonly tabId: string;
    private readonly messagesReadSet;
    private readonly tabOpenTime;
    private cookieReadSubscription?;
    private cookieCleanSubscription?;
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

declare function lsnCrossTabServiceFactory(lsnCrossTabService: LsnCrossTabService): () => void;
declare class LsnCrossTabModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<LsnCrossTabModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<LsnCrossTabModule, never, [typeof i1.CommonModule, typeof LsnCookieModule], [typeof LsnCookieModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<LsnCrossTabModule>;
}

declare class ScrollSpyDirective implements OnInit, OnDestroy {
    private elementRef;
    spySelector: string;
    scrollToSection: Observable<string>;
    spySectionChange: EventEmitter<string>;
    private scrollOffset;
    private currentSection$;
    private disableEmitter;
    subscriptions: Subscription[];
    constructor(elementRef: ElementRef);
    ngOnInit(): void;
    onScroll(): void;
    onResize(): void;
    private scrollTo;
    private findCurrentSection;
    private getSpiedSections;
    private isCurrentSection;
    private setCurrentSection;
    private sectionTopPosition;
    private sectionBottomPosition;
    private scrollTopPosition;
    private scrollBottomPosition;
    private nativeElement;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ScrollSpyDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ScrollSpyDirective, "[lsnScrollSpy]", never, { "spySelector": { "alias": "spySelector"; "required": false; }; "scrollToSection": { "alias": "scrollToSection"; "required": false; }; }, { "spySectionChange": "spySectionChange"; }, never, never, false, never>;
}

declare class LsnScrollSpyModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<LsnScrollSpyModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<LsnScrollSpyModule, [typeof ScrollSpyDirective], never, [typeof ScrollSpyDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<LsnScrollSpyModule>;
}

declare class LsnLibsModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<LsnLibsModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<LsnLibsModule, never, [typeof i1$1.FormsModule, typeof LsnCapitalizeModule, typeof LsnLatinToGreekModule, typeof LsnNumericModule, typeof LsnNumpadModule, typeof LsnCookieModule, typeof LsnCrossTabModule, typeof LsnScrollSpyModule], [typeof LsnCapitalizeModule, typeof LsnLatinToGreekModule, typeof LsnNumericModule, typeof LsnNumpadModule, typeof LsnCookieModule, typeof LsnCrossTabModule, typeof LsnScrollSpyModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<LsnLibsModule>;
}

export { CapitalizeDirective, CustomNumericConfig, DefaultNumericConfig, LSN_COOKIE_CONFIG, LSN_CROSS_TAB_CONFIG, LatinToGreekDirective, LsnCapitalizeModule, LsnCookieConfig, LsnCookieModule, LsnCookieService, LsnCrossTabConfig, LsnCrossTabMessage, LsnCrossTabModule, LsnCrossTabService, LsnLatinToGreekModule, LsnLibsModule, LsnNumericModule, LsnNumpadModule, LsnScrollSpyModule, NumPadDirective, NumericConfigService, NumericDirective, NumericMessage, ScrollSpyDirective, lsnCrossTabServiceFactory };
export type { CookieService, LsnCookieOptions, NumericConfig };
