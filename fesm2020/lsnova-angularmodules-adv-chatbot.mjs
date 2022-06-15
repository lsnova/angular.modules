import * as i0 from '@angular/core';
import { InjectionToken, Injectable, Inject, Optional, NgModule, Component } from '@angular/core';
import { DOCUMENT, CommonModule } from '@angular/common';
import { Subject, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

const ADV_CHATBOT_CONFIG = new InjectionToken('AdvChatbotModuleConfig');
var AdvChatbotEvents;
(function (AdvChatbotEvents) {
    AdvChatbotEvents["newMessage"] = "newMessage";
})(AdvChatbotEvents || (AdvChatbotEvents = {}));
class AdvChatbotWidgetConfig {
}

class AdvChatbotHelper {
    constructor(document, rendererFactory2, moduleConfig, injector) {
        this.document = document;
        this.moduleConfig = moduleConfig;
        this.injector = injector;
        this.events$ = new Subject();
        this.dataProviders = [];
        this.renderer = rendererFactory2.createRenderer(document, null);
        if (this.moduleConfig?.dataProviders?.length) {
            for (const providerClass of this.moduleConfig.dataProviders) {
                this.dataProviders.push(this.injector.get(providerClass));
            }
        }
    }
    get events() {
        return this.events$.asObservable();
    }
    get isInitialized() {
        return !!this.widget;
    }
    async setupSdk(config, awaitConfig = false) {
        if (config.sdkUrl) {
            await this.loadScript(config.sdkUrl);
            const advGlobal = this.document.defaultView.ADV;
            const configPromise = this.setConfig(advGlobal, config);
            if (awaitConfig) {
                await configPromise;
            }
        }
    }
    loadScript(scriptUrl) {
        return new Promise((resolve => {
            const chatBotScriptFound = this.checkScriptLoaded(scriptUrl);
            if (!chatBotScriptFound) {
                const script = this.renderer.createElement('script');
                this.renderer.appendChild(document.head, script);
                script.type = 'text/javascript';
                script.async = false;
                script.charset = 'utf-8';
                // load listener first in case script is cached
                script.addEventListener('load', () => {
                    resolve(true);
                });
                script.src = scriptUrl;
            }
            else {
                resolve(true);
            }
        }));
    }
    /**
     * check if any script on page includes one with src = apiUrl
     */
    checkScriptLoaded(scriptUrl) {
        const scripts = this.document.getElementsByTagName('script');
        return Array.from(scripts)?.some((scriptEl) => scriptEl.src?.includes(scriptUrl)) ?? false;
    }
    async setConfig(advGlobal, chatbotConfig) {
        this.widget = await advGlobal.initWidget({
            cid: chatbotConfig.cid,
            baseUrl: chatbotConfig.baseUrl,
            layout: chatbotConfig.layout,
            theme: chatbotConfig.theme,
            translations: chatbotConfig.translations,
            getCustomerData: done => {
                this.getDataForWidget(chatbotConfig)
                    .subscribe({
                    // check status 200?
                    next: resp => {
                        done(null, resp);
                    },
                    error: err => done(err, null)
                });
            },
            newMessageEvent: isWidgetOpen => {
                this.events$.next({
                    type: AdvChatbotEvents.newMessage,
                    value: !isWidgetOpen // mark new message as unread
                });
            }
        });
    }
    /**
     * manual click on chatbot icon, setup sdk if not loaded
     */
    async toggleVisibility(config) {
        if (this.widget) {
            this.widget.toggleWidget();
        }
        else {
            await this.setupSdk(config, true);
            this.widget.toggleWidget();
        }
    }
    getDataForWidget(chatbotConfig) {
        const obs$ = this.dataProviders?.map(provider => provider.getData(chatbotConfig));
        return forkJoin(obs$).pipe(map(outputs => Object.assign({}, ...outputs)));
    }
}
/** @nocollapse */ AdvChatbotHelper.ɵfac = function AdvChatbotHelper_Factory(t) { return new (t || AdvChatbotHelper)(i0.ɵɵinject(DOCUMENT), i0.ɵɵinject(i0.RendererFactory2), i0.ɵɵinject(ADV_CHATBOT_CONFIG, 8), i0.ɵɵinject(i0.Injector)); };
/** @nocollapse */ AdvChatbotHelper.ɵprov = /** @pureOrBreakMyCode */ i0.ɵɵdefineInjectable({ token: AdvChatbotHelper, factory: AdvChatbotHelper.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AdvChatbotHelper, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }, { type: i0.RendererFactory2 }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [ADV_CHATBOT_CONFIG]
            }] }, { type: i0.Injector }]; }, null); })();

class LsnAdvChatbotModule {
    static forRoot(config = {}) {
        return {
            ngModule: LsnAdvChatbotModule,
            providers: [
                { provide: ADV_CHATBOT_CONFIG, useValue: config },
                AdvChatbotHelper
            ]
        };
    }
}
/** @nocollapse */ LsnAdvChatbotModule.ɵfac = function LsnAdvChatbotModule_Factory(t) { return new (t || LsnAdvChatbotModule)(); };
/** @nocollapse */ LsnAdvChatbotModule.ɵmod = /** @pureOrBreakMyCode */ i0.ɵɵdefineNgModule({ type: LsnAdvChatbotModule });
/** @nocollapse */ LsnAdvChatbotModule.ɵinj = /** @pureOrBreakMyCode */ i0.ɵɵdefineInjector({ imports: [[
            CommonModule
        ]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LsnAdvChatbotModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(LsnAdvChatbotModule, { imports: [CommonModule] }); })();

class AbstractAdvChatbotComponent {
    constructor(chatBotHelper, cd) {
        this.chatBotHelper = chatBotHelper;
        this.cd = cd;
        this.unreadMessages = false;
    }
    ngOnInit() {
        this.audio = new Audio(this.audioSrc);
        this.eventsSub = this.chatBotHelper.events
            .subscribe(this.handleEvent.bind(this));
    }
    toggleVisibility(config) {
        // when opening widget, remove unread messages mark
        this.unreadMessages = false;
        this.chatBotHelper.toggleVisibility(config);
    }
    playAudio() {
        if (this.audio.paused) {
            this.audio.play();
        }
        else {
            // if audio is playing, reset it (immediately plays again)
            this.audio.currentTime = 0;
        }
    }
    handleEvent(event) {
        if (event.type === AdvChatbotEvents.newMessage) {
            this.unreadMessages = event.value;
            this.playAudio();
        }
        this.cd.markForCheck();
    }
    ngOnDestroy() {
        this.eventsSub?.unsubscribe();
    }
}
/** @nocollapse */ AbstractAdvChatbotComponent.ɵfac = function AbstractAdvChatbotComponent_Factory(t) { return new (t || AbstractAdvChatbotComponent)(i0.ɵɵdirectiveInject(AdvChatbotHelper), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
/** @nocollapse */ AbstractAdvChatbotComponent.ɵcmp = /** @pureOrBreakMyCode */ i0.ɵɵdefineComponent({ type: AbstractAdvChatbotComponent, selectors: [["ng-component"]], decls: 0, vars: 0, template: function AbstractAdvChatbotComponent_Template(rf, ctx) { }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AbstractAdvChatbotComponent, [{
        type: Component,
        args: [{
                template: ''
            }]
    }], function () { return [{ type: AdvChatbotHelper }, { type: i0.ChangeDetectorRef }]; }, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { ADV_CHATBOT_CONFIG, AbstractAdvChatbotComponent, AdvChatbotEvents, AdvChatbotHelper, AdvChatbotWidgetConfig, LsnAdvChatbotModule };
//# sourceMappingURL=lsnova-angularmodules-adv-chatbot.mjs.map
