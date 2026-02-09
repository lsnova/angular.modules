import * as i0 from '@angular/core';
import { InjectionToken, Type, ModuleWithProviders, Injector, Renderer2, RendererFactory2, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import * as i1 from '@angular/common';

declare const ADV_CHATBOT_CONFIG: InjectionToken<AdvChatbotModuleConfig>;
interface AdvChatbotModuleConfig {
    dataProviders?: Type<AdvChatbotDataProvider>[];
}
interface AdvChatbotGlobal {
    initWidget: (config: AdvChatbotGlobalConfig) => Promise<any>;
}
interface AdvChatbotWidget {
    toggleWidget: () => void;
    hideWidget: () => void;
    showWidget: () => void;
}
declare enum AdvChatbotEvents {
    newMessage = "newMessage"
}
interface AdvChatbotEvent {
    type: AdvChatbotEvents;
    value: any;
}
interface AdvChatbotDataProvider {
    getData(chatBotConfig: AdvChatbotWidgetConfig): Observable<object>;
}
declare class AdvChatbotWidgetConfig {
    enabled?: boolean;
    sdkUrl?: string;
    cid?: string;
    baseUrl?: string;
    audioFile?: string;
    layout?: any;
    theme?: {
        [key: string]: string;
    };
    translations?: {
        [key: string]: string;
    };
}
interface AdvChatbotGlobalConfig extends AdvChatbotWidgetConfig {
    getCustomerData: (done: (err: any, data: any) => void) => void;
    newMessageEvent: (boolean: any) => void;
}

declare class LsnAdvChatbotModule {
    static forRoot(config?: AdvChatbotModuleConfig): ModuleWithProviders<LsnAdvChatbotModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<LsnAdvChatbotModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<LsnAdvChatbotModule, never, [typeof i1.CommonModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<LsnAdvChatbotModule>;
}

declare class AdvChatbotHelper {
    protected document: any;
    protected moduleConfig: AdvChatbotModuleConfig;
    protected injector: Injector;
    protected renderer: Renderer2;
    protected widget: AdvChatbotWidget;
    protected events$: Subject<AdvChatbotEvent>;
    protected dataProviders: AdvChatbotDataProvider[];
    get events(): Observable<AdvChatbotEvent>;
    get isInitialized(): boolean;
    constructor(document: any, rendererFactory2: RendererFactory2, moduleConfig: AdvChatbotModuleConfig, injector: Injector);
    setupSdk(config: AdvChatbotWidgetConfig, awaitConfig?: boolean): Promise<void>;
    protected loadScript(scriptUrl: string): Promise<any>;
    /**
     * check if any script on page includes one with src = apiUrl
     */
    protected checkScriptLoaded(scriptUrl: string): boolean;
    protected setConfig(advGlobal: AdvChatbotGlobal, chatbotConfig: AdvChatbotWidgetConfig): Promise<void>;
    /**
     * manual click on chatbot icon, setup sdk if not loaded
     */
    toggleVisibility(config: AdvChatbotWidgetConfig): Promise<any>;
    protected getDataForWidget(chatbotConfig: AdvChatbotWidgetConfig): Observable<object>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AdvChatbotHelper, [null, null, { optional: true; }, null]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AdvChatbotHelper>;
}

declare abstract class AbstractAdvChatbotComponent implements OnInit, OnDestroy {
    protected chatBotHelper: AdvChatbotHelper;
    protected cd: ChangeDetectorRef;
    protected eventsSub: Subscription;
    unreadMessages: boolean;
    abstract audioSrc: string;
    protected audio: HTMLAudioElement;
    constructor(chatBotHelper: AdvChatbotHelper, cd: ChangeDetectorRef);
    ngOnInit(): void;
    toggleVisibility(config: AdvChatbotWidgetConfig): void;
    playAudio(): void;
    protected handleEvent(event: AdvChatbotEvent): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AbstractAdvChatbotComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AbstractAdvChatbotComponent, "ng-component", never, {}, {}, never, never, false, never>;
}

export { ADV_CHATBOT_CONFIG, AbstractAdvChatbotComponent, AdvChatbotEvents, AdvChatbotHelper, AdvChatbotWidgetConfig, LsnAdvChatbotModule };
export type { AdvChatbotDataProvider, AdvChatbotEvent, AdvChatbotGlobal, AdvChatbotGlobalConfig, AdvChatbotModuleConfig, AdvChatbotWidget };
