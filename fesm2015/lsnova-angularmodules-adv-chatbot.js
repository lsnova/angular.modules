import { InjectionToken, Injectable, Inject, RendererFactory2, Optional, Injector, NgModule, Component, ChangeDetectorRef } from '@angular/core';
import { DOCUMENT, CommonModule } from '@angular/common';
import { __awaiter } from 'tslib';
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
        var _a, _b;
        this.document = document;
        this.moduleConfig = moduleConfig;
        this.injector = injector;
        this.events$ = new Subject();
        this.dataProviders = [];
        this.renderer = rendererFactory2.createRenderer(document, null);
        if ((_b = (_a = this.moduleConfig) === null || _a === void 0 ? void 0 : _a.dataProviders) === null || _b === void 0 ? void 0 : _b.length) {
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
    setupSdk(config, awaitConfig = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (config.sdkUrl) {
                yield this.loadScript(config.sdkUrl);
                const advGlobal = this.document.defaultView.ADV;
                const configPromise = this.setConfig(advGlobal, config);
                if (awaitConfig) {
                    yield configPromise;
                }
            }
        });
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
        var _a, _b;
        const scripts = this.document.getElementsByTagName('script');
        return (_b = (_a = Array.from(scripts)) === null || _a === void 0 ? void 0 : _a.some((scriptEl) => { var _a; return (_a = scriptEl.src) === null || _a === void 0 ? void 0 : _a.includes(scriptUrl); })) !== null && _b !== void 0 ? _b : false;
    }
    setConfig(advGlobal, chatbotConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            this.widget = yield advGlobal.initWidget({
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
        });
    }
    /**
     * manual click on chatbot icon, setup sdk if not loaded
     */
    toggleVisibility(config) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.widget) {
                this.widget.toggleWidget();
            }
            else {
                yield this.setupSdk(config, true);
                this.widget.toggleWidget();
            }
        });
    }
    getDataForWidget(chatbotConfig) {
        var _a;
        const obs$ = (_a = this.dataProviders) === null || _a === void 0 ? void 0 : _a.map(provider => provider.getData(chatbotConfig));
        return forkJoin(obs$).pipe(map(outputs => Object.assign({}, ...outputs)));
    }
}
AdvChatbotHelper.decorators = [
    { type: Injectable }
];
/** @nocollapse */
AdvChatbotHelper.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: RendererFactory2 },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [ADV_CHATBOT_CONFIG,] }] },
    { type: Injector }
];

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
LsnAdvChatbotModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ]
            },] }
];

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
        var _a;
        (_a = this.eventsSub) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
}
AbstractAdvChatbotComponent.decorators = [
    { type: Component, args: [{
                template: ''
            },] }
];
/** @nocollapse */
AbstractAdvChatbotComponent.ctorParameters = () => [
    { type: AdvChatbotHelper },
    { type: ChangeDetectorRef }
];

/**
 * Generated bundle index. Do not edit.
 */

export { ADV_CHATBOT_CONFIG, AbstractAdvChatbotComponent, AdvChatbotEvents, AdvChatbotHelper, AdvChatbotWidgetConfig, LsnAdvChatbotModule };
//# sourceMappingURL=lsnova-angularmodules-adv-chatbot.js.map
