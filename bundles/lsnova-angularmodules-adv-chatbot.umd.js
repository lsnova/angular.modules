(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@lsnova/angularmodules/adv-chatbot', ['exports', '@angular/core', '@angular/common', 'rxjs', 'rxjs/operators'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.lsnova = global.lsnova || {}, global.lsnova.angularmodules = global.lsnova.angularmodules || {}, global.lsnova.angularmodules['adv-chatbot'] = {}), global.ng.core, global.ng.common, global.rxjs, global.rxjs.operators));
}(this, (function (exports, core, common, rxjs, operators) { 'use strict';

    var ADV_CHATBOT_CONFIG = new core.InjectionToken('AdvChatbotModuleConfig');
    (function (AdvChatbotEvents) {
        AdvChatbotEvents["newMessage"] = "newMessage";
    })(exports.AdvChatbotEvents || (exports.AdvChatbotEvents = {}));
    var AdvChatbotWidgetConfig = /** @class */ (function () {
        function AdvChatbotWidgetConfig() {
        }
        return AdvChatbotWidgetConfig;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    var AdvChatbotHelper = /** @class */ (function () {
        function AdvChatbotHelper(document, rendererFactory2, moduleConfig, injector) {
            var e_1, _c;
            var _a, _b;
            this.document = document;
            this.moduleConfig = moduleConfig;
            this.injector = injector;
            this.events$ = new rxjs.Subject();
            this.dataProviders = [];
            this.renderer = rendererFactory2.createRenderer(document, null);
            if ((_b = (_a = this.moduleConfig) === null || _a === void 0 ? void 0 : _a.dataProviders) === null || _b === void 0 ? void 0 : _b.length) {
                try {
                    for (var _d = __values(this.moduleConfig.dataProviders), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var providerClass = _e.value;
                        this.dataProviders.push(this.injector.get(providerClass));
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_c = _d.return)) _c.call(_d);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        }
        Object.defineProperty(AdvChatbotHelper.prototype, "events", {
            get: function () {
                return this.events$.asObservable();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AdvChatbotHelper.prototype, "isInitialized", {
            get: function () {
                return !!this.widget;
            },
            enumerable: false,
            configurable: true
        });
        AdvChatbotHelper.prototype.setupSdk = function (config, awaitConfig) {
            if (awaitConfig === void 0) { awaitConfig = false; }
            return __awaiter(this, void 0, void 0, function () {
                var advGlobal, configPromise;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!config.sdkUrl) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.loadScript(config.sdkUrl)];
                        case 1:
                            _c.sent();
                            advGlobal = this.document.defaultView.ADV;
                            configPromise = this.setConfig(advGlobal, config);
                            if (!awaitConfig) return [3 /*break*/, 3];
                            return [4 /*yield*/, configPromise];
                        case 2:
                            _c.sent();
                            _c.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        AdvChatbotHelper.prototype.loadScript = function (scriptUrl) {
            var _this = this;
            return new Promise((function (resolve) {
                var chatBotScriptFound = _this.checkScriptLoaded(scriptUrl);
                if (!chatBotScriptFound) {
                    var script = _this.renderer.createElement('script');
                    _this.renderer.appendChild(document.head, script);
                    script.type = 'text/javascript';
                    script.async = false;
                    script.charset = 'utf-8';
                    // load listener first in case script is cached
                    script.addEventListener('load', function () {
                        resolve(true);
                    });
                    script.src = scriptUrl;
                }
                else {
                    resolve(true);
                }
            }));
        };
        /**
         * check if any script on page includes one with src = apiUrl
         */
        AdvChatbotHelper.prototype.checkScriptLoaded = function (scriptUrl) {
            var _a, _b;
            var scripts = this.document.getElementsByTagName('script');
            return (_b = (_a = Array.from(scripts)) === null || _a === void 0 ? void 0 : _a.some(function (scriptEl) { var _a; return (_a = scriptEl.src) === null || _a === void 0 ? void 0 : _a.includes(scriptUrl); })) !== null && _b !== void 0 ? _b : false;
        };
        AdvChatbotHelper.prototype.setConfig = function (advGlobal, chatbotConfig) {
            return __awaiter(this, void 0, void 0, function () {
                var _c;
                var _this = this;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _c = this;
                            return [4 /*yield*/, advGlobal.initWidget({
                                    cid: chatbotConfig.cid,
                                    baseUrl: chatbotConfig.baseUrl,
                                    layout: chatbotConfig.layout,
                                    theme: chatbotConfig.theme,
                                    translations: chatbotConfig.translations,
                                    getCustomerData: function (done) {
                                        _this.getDataForWidget(chatbotConfig)
                                            .subscribe({
                                            // check status 200?
                                            next: function (resp) {
                                                done(null, resp);
                                            },
                                            error: function (err) { return done(err, null); }
                                        });
                                    },
                                    newMessageEvent: function (isWidgetOpen) {
                                        _this.events$.next({
                                            type: exports.AdvChatbotEvents.newMessage,
                                            value: !isWidgetOpen // mark new message as unread
                                        });
                                    }
                                })];
                        case 1:
                            _c.widget = _d.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * manual click on chatbot icon, setup sdk if not loaded
         */
        AdvChatbotHelper.prototype.toggleVisibility = function (config) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!this.widget) return [3 /*break*/, 1];
                            this.widget.toggleWidget();
                            return [3 /*break*/, 3];
                        case 1: return [4 /*yield*/, this.setupSdk(config, true)];
                        case 2:
                            _c.sent();
                            this.widget.toggleWidget();
                            _c.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        AdvChatbotHelper.prototype.getDataForWidget = function (chatbotConfig) {
            var _a;
            var obs$ = (_a = this.dataProviders) === null || _a === void 0 ? void 0 : _a.map(function (provider) { return provider.getData(chatbotConfig); });
            return rxjs.forkJoin(obs$).pipe(operators.map(function (outputs) { return Object.assign.apply(Object, __spread([{}], outputs)); }));
        };
        return AdvChatbotHelper;
    }());
    AdvChatbotHelper.decorators = [
        { type: core.Injectable }
    ];
    /** @nocollapse */
    AdvChatbotHelper.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] },
        { type: core.RendererFactory2 },
        { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [ADV_CHATBOT_CONFIG,] }] },
        { type: core.Injector }
    ]; };

    var LsnAdvChatbotModule = /** @class */ (function () {
        function LsnAdvChatbotModule() {
        }
        LsnAdvChatbotModule.forRoot = function (config) {
            if (config === void 0) { config = {}; }
            return {
                ngModule: LsnAdvChatbotModule,
                providers: [
                    { provide: ADV_CHATBOT_CONFIG, useValue: config },
                    AdvChatbotHelper
                ]
            };
        };
        return LsnAdvChatbotModule;
    }());
    LsnAdvChatbotModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        common.CommonModule
                    ]
                },] }
    ];

    var AbstractAdvChatbotComponent = /** @class */ (function () {
        function AbstractAdvChatbotComponent(chatBotHelper, cd) {
            this.chatBotHelper = chatBotHelper;
            this.cd = cd;
            this.unreadMessages = false;
        }
        AbstractAdvChatbotComponent.prototype.ngOnInit = function () {
            this.audio = new Audio(this.audioSrc);
            this.eventsSub = this.chatBotHelper.events
                .subscribe(this.handleEvent.bind(this));
        };
        AbstractAdvChatbotComponent.prototype.toggleVisibility = function (config) {
            // when opening widget, remove unread messages mark
            this.unreadMessages = false;
            this.chatBotHelper.toggleVisibility(config);
        };
        AbstractAdvChatbotComponent.prototype.playAudio = function () {
            if (this.audio.paused) {
                this.audio.play();
            }
            else {
                // if audio is playing, reset it (immediately plays again)
                this.audio.currentTime = 0;
            }
        };
        AbstractAdvChatbotComponent.prototype.handleEvent = function (event) {
            if (event.type === exports.AdvChatbotEvents.newMessage) {
                this.unreadMessages = event.value;
                this.playAudio();
            }
            this.cd.markForCheck();
        };
        AbstractAdvChatbotComponent.prototype.ngOnDestroy = function () {
            var _a;
            (_a = this.eventsSub) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        };
        return AbstractAdvChatbotComponent;
    }());
    AbstractAdvChatbotComponent.decorators = [
        { type: core.Component, args: [{
                    template: ''
                },] }
    ];
    /** @nocollapse */
    AbstractAdvChatbotComponent.ctorParameters = function () { return [
        { type: AdvChatbotHelper },
        { type: core.ChangeDetectorRef }
    ]; };

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ADV_CHATBOT_CONFIG = ADV_CHATBOT_CONFIG;
    exports.AbstractAdvChatbotComponent = AbstractAdvChatbotComponent;
    exports.AdvChatbotHelper = AdvChatbotHelper;
    exports.AdvChatbotWidgetConfig = AdvChatbotWidgetConfig;
    exports.LsnAdvChatbotModule = LsnAdvChatbotModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=lsnova-angularmodules-adv-chatbot.umd.js.map
