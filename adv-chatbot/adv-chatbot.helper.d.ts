import { Injector, Renderer2, RendererFactory2 } from '@angular/core';
import { AdvChatbotDataProvider, AdvChatbotEvent, AdvChatbotGlobal, AdvChatbotModuleConfig, AdvChatbotWidget, AdvChatbotWidgetConfig } from './adv-chatbot.model';
import { Observable, Subject } from 'rxjs';
import * as i0 from "@angular/core";
export declare class AdvChatbotHelper {
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
