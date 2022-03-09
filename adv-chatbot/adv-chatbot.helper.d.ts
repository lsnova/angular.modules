import { Injector, Renderer2, RendererFactory2 } from '@angular/core';
import { AdvChatbot } from './adv-chatbot.model';
import { Observable, Subject } from 'rxjs';
export declare class AdvChatbotHelper {
    protected document: any;
    protected moduleConfig: AdvChatbot.ModuleConfig;
    protected injector: Injector;
    protected renderer: Renderer2;
    protected widget: AdvChatbot.Widget;
    protected events$: Subject<AdvChatbot.Event>;
    protected dataProviders: AdvChatbot.DataProvider[];
    get events(): Observable<AdvChatbot.Event>;
    get isInitialized(): boolean;
    constructor(document: any, rendererFactory2: RendererFactory2, moduleConfig: AdvChatbot.ModuleConfig, injector: Injector);
    setupSdk(config: AdvChatbot.WidgetConfig, awaitConfig?: boolean): Promise<void>;
    protected loadScript(scriptUrl: string): Promise<any>;
    /**
     * check if any script on page includes one with src = apiUrl
     */
    protected checkScriptLoaded(scriptUrl: string): boolean;
    protected setConfig(advGlobal: AdvChatbot.Global, chatbotConfig: AdvChatbot.WidgetConfig): Promise<void>;
    /**
     * manual click on chatbot icon, setup sdk if not loaded
     */
    toggleVisibility(config: AdvChatbot.WidgetConfig): Promise<any>;
    protected getDataForWidget(chatbotConfig: AdvChatbot.WidgetConfig): Observable<object>;
}
