(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/cdk/keycodes'), require('@angular/forms'), require('rxjs'), require('rxjs/operators'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@lsnova/angularmodules', ['exports', '@angular/core', '@angular/cdk/keycodes', '@angular/forms', 'rxjs', 'rxjs/operators', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.lsnova = global.lsnova || {}, global.lsnova.angularmodules = {}), global.ng.core, global.ng.cdk.keycodes, global.ng.forms, global.rxjs, global.rxjs.operators, global.ng.common));
}(this, (function (exports, i0, keyboard, forms, rxjs, operators, i2) { 'use strict';

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

    var NumericSeparator;
    (function (NumericSeparator) {
        NumericSeparator["COMMA"] = ",";
        NumericSeparator["PERIOD"] = ".";
        NumericSeparator["SPACE"] = " ";
    })(NumericSeparator || (NumericSeparator = {}));
    var DefaultNumericConfig = /** @class */ (function () {
        function DefaultNumericConfig(props) {
            if (props === void 0) { props = {}; }
            this.precision = 0;
            this.decimals = NumericSeparator.PERIOD;
            this.noScientificNotation = false;
            this.alwaysDisplayDecimals = false;
            Object.assign(this, props);
        }
        return DefaultNumericConfig;
    }());
    var CustomNumericConfig = /** @class */ (function () {
        function CustomNumericConfig(props) {
            if (props === void 0) { props = {}; }
            Object.assign(this, props);
        }
        return CustomNumericConfig;
    }());
    var NumericConfigService = /** @class */ (function () {
        function NumericConfigService(config) {
            var moduleConfig = new CustomNumericConfig();
            if (config) {
                moduleConfig = Object.assign(moduleConfig, config);
            }
            var numericConfig = moduleConfig.default || {};
            var customConfig = moduleConfig.custom || {};
            this.config = new CustomNumericConfig({
                default: new DefaultNumericConfig(numericConfig),
                custom: customConfig,
            });
        }
        NumericConfigService.prototype.getDefaultConfig = function () {
            return this.config.default;
        };
        NumericConfigService.prototype.getCustomConfig = function (key) {
            if (!this.config.custom[key]) {
                console.warn('[lsnNumeric] Invalid config key provided.');
            }
            return Object.assign(Object.assign({}, this.getDefaultConfig()), this.config.custom[key]) || this.getDefaultConfig();
        };
        return NumericConfigService;
    }());
    NumericConfigService.decorators = [
        { type: i0.Injectable }
    ];
    /** @nocollapse */
    NumericConfigService.ctorParameters = function () { return [
        { type: CustomNumericConfig }
    ]; };

    var CUSTOM_SELECT_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: i0.forwardRef(function () { return NumericDirective; }),
        multi: true
    };
    (function (NumericMessage) {
        NumericMessage[NumericMessage["ADDITIONAL_DECIMAL_SEPARATOR"] = 0] = "ADDITIONAL_DECIMAL_SEPARATOR";
    })(exports.NumericMessage || (exports.NumericMessage = {}));
    var NumericDirective = /** @class */ (function () {
        function NumericDirective(el, configService) {
            this.el = el;
            this.configService = configService;
            this.lsnNumeric = {};
            this.lsnNumericMessages = new i0.EventEmitter();
            this.onChange = function (_) {
            };
            this.onTouch = function () {
            };
            this.element = el;
            this.setConfig();
        }
        NumericDirective.prototype.ngOnChanges = function () {
            this.setConfig();
        };
        NumericDirective.prototype.inputHandler = function ($event) {
            if ($event.target.value === '-') {
                return;
            }
            var value = this.removeInvalidCharacters($event.target.value);
            value = this.handleWholesLength(value);
            var parsedValue = this.parseValue(value);
            this.displayValue = value.replace(/[,|.]/, this.config.decimals);
            this.onChange(parsedValue);
        };
        NumericDirective.prototype.focusHandler = function () {
            this.setEditMode();
        };
        NumericDirective.prototype.blurHandler = function () {
            var parsedValue = this.parseValue(this.element.nativeElement.value);
            var rangeValue = this.handleRange(parsedValue);
            // correct entered value on blur to proper range value
            if (parsedValue !== rangeValue) {
                this.displayValue = rangeValue.toString().replace(/[,|.]/, this.config.decimals);
                this.onChange(rangeValue);
            }
            else if (this.config.step && !isNaN(parsedValue)) {
                // correct entered value on blur to proper step value
                var stepValue = this.handleStep(parsedValue);
                this.displayValue = stepValue.toString().replace(/[,|.]/, this.config.decimals);
                this.onChange(stepValue);
            }
            this.displayValue = this.prepareDisplayValue(this.element.nativeElement.value);
            if (this.onTouch) {
                // if user sets updateOn to 'blur', we have to call onTouch for it to work properly
                this.onTouch();
            }
        };
        NumericDirective.prototype.writeValue = function (modelValue) {
            return __awaiter(this, void 0, void 0, function () {
                var parsedValue;
                return __generator(this, function (_a) {
                    parsedValue = this.parseValue(modelValue);
                    this.displayValue = this.prepareDisplayValue(parsedValue);
                    return [2 /*return*/];
                });
            });
        };
        NumericDirective.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        NumericDirective.prototype.registerOnTouched = function (fn) {
            this.onTouch = fn;
        };
        Object.defineProperty(NumericDirective.prototype, "displayValue", {
            get: function () {
                return this.element.nativeElement.value;
            },
            set: function (value) {
                this.element.nativeElement.value = value;
            },
            enumerable: false,
            configurable: true
        });
        NumericDirective.prototype.setConfig = function () {
            var defaultConfig = this.lsnNumeric.config
                ? this.configService.getCustomConfig(this.lsnNumeric.config)
                : this.configService.getDefaultConfig();
            this.config = Object.assign(Object.assign(Object.assign({}, defaultConfig), this.lsnNumeric));
            if (this.config.decimals && this.config.thousands && this.config.decimals === this.config.thousands) {
                this.config.thousands = undefined;
            }
            if (this.config.max !== undefined && this.config.maxLength !== undefined) {
                console.warn('[lsnNumeric] Setting `maxLength` makes `max` redundant.');
            }
        };
        NumericDirective.prototype.parseValue = function (value) {
            if (!value && value !== 0) {
                return undefined;
            }
            var newValue = value.toString().replace(/[,|.]/, '.');
            var parsedValue = this.config.precision > 0
                ? parseFloat(newValue)
                : parseInt(newValue, 10);
            return isNaN(parsedValue) ? undefined : parsedValue;
        };
        NumericDirective.prototype.handleWholesLength = function (value) {
            if (this.config.maxLength) {
                var negativeSign = value.toString().startsWith('-') ? '-' : '';
                var absoluteValue = value.toString()
                    .replace(/^-/, '')
                    .replace(/[,|.]/, this.config.decimals);
                if (absoluteValue.toString().includes(this.config.decimals)) {
                    var _a = __read(absoluteValue.toString().split(this.config.decimals), 2), wholes = _a[0], decimals = _a[1];
                    var properDecimals = this.removeInvalidCharacters(decimals, true);
                    return negativeSign + wholes.substr(0, this.config.maxLength) + this.config.decimals + properDecimals;
                }
                return negativeSign + absoluteValue.toString().substr(0, this.config.maxLength);
            }
            return value;
        };
        NumericDirective.prototype.removeInvalidCharacters = function (value, allowDecimalsOnly) {
            if (allowDecimalsOnly === void 0) { allowDecimalsOnly = false; }
            return this.cleanUp(allowDecimalsOnly
                ? value.replace(/[^\-0-9]/g, '')
                : value.replace(/[^\-0-9,.]/g, ''));
        };
        NumericDirective.prototype.cleanUp = function (input) {
            // no precision at all
            var value = input.replace(/[,|.]/g, '.');
            var firstIndex = typeof value === 'string' || value instanceof String
                ? value.indexOf('.')
                : -1;
            if (firstIndex === -1) {
                return value;
            }
            // remove everything after second comma
            var secondIndex = value.substr(firstIndex + 1).indexOf('.');
            if (secondIndex !== -1) {
                this.lsnNumericMessages.emit(exports.NumericMessage.ADDITIONAL_DECIMAL_SEPARATOR);
                value = value.substr(0, firstIndex + secondIndex + 1);
            }
            // remove additional precision
            if (this.config.precision === 0) {
                return value.substr(0, firstIndex);
            }
            else if (this.config.precision) {
                return value.substr(0, firstIndex + this.config.precision + 1);
            }
            return value;
        };
        NumericDirective.prototype.handleRange = function (value) {
            if (!this.config.maxLength && this.config.max !== undefined && value > this.config.max) {
                return this.config.max;
            }
            else if (this.config.min !== undefined && value < this.config.min) {
                return this.config.min;
            }
            return value;
        };
        NumericDirective.prototype.handleStep = function (value) {
            return Math.round(value / this.config.step) * this.config.step;
        };
        NumericDirective.prototype.prepareDisplayValue = function (value) {
            if (!value && value !== 0) {
                return '';
            }
            var _a = __read(this.getWholeAndDecimalParts(value), 2), whole = _a[0], decimals = _a[1];
            var isNegative = whole[0] === '-' || whole < 0;
            var result = whole === '-' || !whole
                ? '0'
                : this.getWholeDisplayValue(whole);
            if (this.config.thousands) {
                result = result.replace(/\B(?=(\d{3})+(?!\d))/g, this.config.thousands);
            }
            if (this.config.precision && this.config.decimals) {
                if (this.config.alwaysDisplayDecimals && this.shouldAddDefaultDecimals(decimals)) {
                    result = result + this.config.decimals + this.defaultDecimals(decimals, this.config.precision);
                }
                else if (decimals) {
                    result = result + this.config.decimals + decimals;
                }
            }
            return isNegative && result !== '0' ? '-' + result : result;
        };
        NumericDirective.prototype.setEditMode = function () {
            if (this.config.thousands) {
                var currentValue = this.element.nativeElement.value;
                var _a = __read(currentValue.split(this.config.decimals), 2), whole = _a[0], decimals = _a[1];
                var regex = new RegExp('\\' + this.config.thousands, 'g');
                var result = whole.replace(regex, '');
                if (decimals && this.config.precision && this.config.decimals) {
                    result = result + this.config.decimals + decimals;
                }
                this.displayValue = result;
            }
        };
        NumericDirective.prototype.keyDownHandler = function (e) {
            var currentValue = this.element.nativeElement.value;
            if (
            // Allow special keys
            [
                keyboard.LEFT_ARROW,
                keyboard.RIGHT_ARROW,
                keyboard.BACKSPACE,
                keyboard.DELETE,
                keyboard.END,
                keyboard.ENTER,
                keyboard.ESCAPE,
                keyboard.HOME,
                keyboard.TAB,
            ].indexOf(e.keyCode) !== -1
                // Allow Ctrl+key actions
                || ([
                    keyboard.A,
                    keyboard.C,
                    keyboard.R,
                    keyboard.V,
                    keyboard.X,
                ].indexOf(e.keyCode) !== -1
                    && (e.ctrlKey === true || e.metaKey === true))) {
                return; // let it happen, don't do anything
            }
            // Handle maxLength
            var absoluteValue = currentValue.toString().replace(/^-/, '');
            var _a = __read(absoluteValue.toString().split(this.config.decimals), 1), wholes = _a[0];
            if (this.config.maxLength !== undefined
                && (this.element.nativeElement.selectionStart < wholes.length
                    && wholes.length >= this.config.maxLength
                    && [keyboard.DASH, keyboard.NUMPAD_MINUS].indexOf(e.keyCode) === -1)
                && this.element.nativeElement.selectionEnd - this.element.nativeElement.selectionStart === 0) {
                e.preventDefault();
            }
            // Handle minus
            if ([keyboard.DASH, keyboard.NUMPAD_MINUS].indexOf(e.keyCode) !== -1
                && this.element.nativeElement.selectionStart === 0
                && ((this.config.min !== undefined && this.config.min < 0) || this.config.min === undefined)
                && currentValue.indexOf('-') === -1) {
                return;
            }
            // Handle separator
            if (this.config.precision > 0
                && [keyboard.COMMA, keyboard.NUMPAD_PERIOD, 190].indexOf(e.keyCode) !== -1
                && this.element.nativeElement.selectionStart > 0
                && currentValue.length
                && currentValue.indexOf('.') === -1
                && currentValue.indexOf(',') === -1) {
                return;
            }
            // Handle key after separator
            if (this.config.precision > 0
                && currentValue.indexOf(this.config.decimals) > -1
                && this.element.nativeElement.selectionStart > currentValue.indexOf(this.config.decimals)) {
                var _b = __read(currentValue.split(this.config.decimals), 2), decimals = _b[1];
                if (decimals && decimals.length >= this.config.precision) {
                    e.preventDefault();
                }
            }
            // Ensure that it is a number or stop the keypress
            if ((([
                keyboard.ZERO,
                keyboard.ONE,
                keyboard.TWO,
                keyboard.THREE,
                keyboard.FOUR,
                keyboard.FIVE,
                keyboard.SIX,
                keyboard.SEVEN,
                keyboard.EIGHT,
                keyboard.NINE
            ].indexOf(e.keyCode) === -1
                || e.shiftKey)
                &&
                    [
                        keyboard.NUMPAD_ZERO,
                        keyboard.NUMPAD_ONE,
                        keyboard.NUMPAD_TWO,
                        keyboard.NUMPAD_THREE,
                        keyboard.NUMPAD_FOUR,
                        keyboard.NUMPAD_FIVE,
                        keyboard.NUMPAD_SIX,
                        keyboard.NUMPAD_SEVEN,
                        keyboard.NUMPAD_EIGHT,
                        keyboard.NUMPAD_NINE,
                    ].indexOf(e.keyCode) === -1)
                || (this.element.nativeElement.selectionStart === 0
                    && this.element.nativeElement.selectionEnd === 0
                    && currentValue.indexOf('-') > -1)) {
                e.preventDefault();
            }
        };
        NumericDirective.prototype.setDisabledState = function (isDisabled) {
            this.element.nativeElement.disabled = isDisabled;
        };
        /**
         * parse whole part of a number to display value (based on given config)
         */
        NumericDirective.prototype.getWholeDisplayValue = function (whole) {
            var parsedWhole = Math.abs(typeof whole !== 'number' ? parseInt(whole, 10) : whole);
            return this.config.noScientificNotation
                ? parsedWhole.toLocaleString('fullwide', { useGrouping: false })
                : parsedWhole.toString();
        };
        /**
         * get whole and decimal part of a number
         * type of return values may vary, it is intentional
         * the returned array should have size of 1(only whole number) or 2(whole and decimal)
         */
        NumericDirective.prototype.getWholeAndDecimalParts = function (value) {
            if (typeof value === 'number') {
                if (this.config.noScientificNotation && (value > Number.MAX_SAFE_INTEGER || value < Number.MIN_SAFE_INTEGER)) {
                    var decimals = value % 1;
                    return [Math.floor(value), decimals !== 0 ? '' + decimals : undefined];
                }
                else {
                    return value.toString().split('.');
                }
            }
            else {
                return value.toString().split(this.config.decimals);
            }
        };
        NumericDirective.prototype.defaultDecimals = function (value, precision) {
            if (value === void 0) { value = ''; }
            if (precision === void 0) { precision = 0; }
            var result = '' + value;
            while (result.length < precision) {
                result += '0';
            }
            return result;
        };
        NumericDirective.prototype.shouldAddDefaultDecimals = function (decimals) {
            return !decimals || ('' + decimals).length !== this.config.precision;
        };
        return NumericDirective;
    }());
    NumericDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[lsnNumeric]',
                    providers: [CUSTOM_SELECT_VALUE_ACCESSOR]
                },] }
    ];
    /** @nocollapse */
    NumericDirective.ctorParameters = function () { return [
        { type: i0.ElementRef },
        { type: NumericConfigService }
    ]; };
    NumericDirective.propDecorators = {
        lsnNumeric: [{ type: i0.Input }],
        lsnNumericMessages: [{ type: i0.Output }],
        inputHandler: [{ type: i0.HostListener, args: ['input', ['$event'],] }],
        focusHandler: [{ type: i0.HostListener, args: ['focus', [],] }],
        blurHandler: [{ type: i0.HostListener, args: ['blur', [],] }],
        keyDownHandler: [{ type: i0.HostListener, args: ['keydown', ['$event'],] }]
    };

    var LsnNumericModule = /** @class */ (function () {
        function LsnNumericModule() {
        }
        LsnNumericModule.forRoot = function (config) {
            return {
                ngModule: LsnNumericModule,
                providers: [
                    NumericConfigService,
                    { provide: CustomNumericConfig, useValue: config }
                ]
            };
        };
        return LsnNumericModule;
    }());
    LsnNumericModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: [
                        NumericDirective,
                    ],
                    exports: [
                        NumericDirective,
                    ]
                },] }
    ];

    var NumPadConfig = /** @class */ (function () {
        function NumPadConfig() {
            this.allowLeadingZeros = false;
        }
        return NumPadConfig;
    }());
    var NumPadDirective = /** @class */ (function () {
        function NumPadDirective(element, ngControl) {
            this.element = element;
            this.ngControl = ngControl;
            this.lsnNumPad = {};
            this.defaultConfig = new NumPadConfig();
        }
        NumPadDirective.prototype.ngOnChanges = function () {
            this.config = Object.assign(Object.assign(Object.assign({}, this.defaultConfig), this.lsnNumPad));
        };
        NumPadDirective.prototype.inputHandler = function ($event) {
            var currentValue = $event.target.value;
            this.setValue(this.parseNewValue(currentValue));
        };
        NumPadDirective.prototype.blurHandler = function ($event) {
            var currentValue = $event.target.value;
            this.setValue(this.parseNewValue(currentValue, true));
        };
        NumPadDirective.prototype.setValue = function (value) {
            if (this.ngControl && this.ngControl.control) {
                this.ngControl.control.setValue(value);
            }
            else {
                this.element.nativeElement.value = value;
            }
        };
        NumPadDirective.prototype.parseNewValue = function (value, blurEvent) {
            if (blurEvent === void 0) { blurEvent = false; }
            var newValue = value.replace(/[^0-9]/g, '');
            if (newValue === '') {
                return blurEvent ? '' : newValue;
            }
            if (this.config.maxlength && this.config.maxlength > 0) {
                newValue = newValue.substring(0, this.config.maxlength);
            }
            if (!this.config.allowLeadingZeros && blurEvent) {
                newValue = newValue.replace(/^0+/, '');
            }
            return newValue;
        };
        NumPadDirective.prototype.keyDownHandler = function (e) {
            var currentValue = this.element.nativeElement.value;
            if (
            // Allow special keys
            [
                keyboard.LEFT_ARROW,
                keyboard.RIGHT_ARROW,
                keyboard.BACKSPACE,
                keyboard.DELETE,
                keyboard.END,
                keyboard.ENTER,
                keyboard.ESCAPE,
                keyboard.HOME,
                keyboard.TAB,
            ].indexOf(e.keyCode) !== -1
                // Allow Ctrl+key actions
                || ([
                    keyboard.A,
                    keyboard.C,
                    keyboard.R,
                    keyboard.V,
                    keyboard.X,
                ].indexOf(e.keyCode) !== -1
                    && (e.ctrlKey === true || e.metaKey === true))) {
                return; // let it happen, don't do anything
            }
            // Ensure that it is a number or stop the keypress
            if ((([
                keyboard.ZERO,
                keyboard.ONE,
                keyboard.TWO,
                keyboard.THREE,
                keyboard.FOUR,
                keyboard.FIVE,
                keyboard.SIX,
                keyboard.SEVEN,
                keyboard.EIGHT,
                keyboard.NINE
            ].indexOf(e.keyCode) === -1
                || e.shiftKey)
                &&
                    [
                        keyboard.NUMPAD_ZERO,
                        keyboard.NUMPAD_ONE,
                        keyboard.NUMPAD_TWO,
                        keyboard.NUMPAD_THREE,
                        keyboard.NUMPAD_FOUR,
                        keyboard.NUMPAD_FIVE,
                        keyboard.NUMPAD_SIX,
                        keyboard.NUMPAD_SEVEN,
                        keyboard.NUMPAD_EIGHT,
                        keyboard.NUMPAD_NINE,
                    ].indexOf(e.keyCode) === -1)
                || (currentValue.length
                    && this.config.maxlength && this.config.maxlength > 0
                    && currentValue.length >= this.config.maxlength
                    && this.element.nativeElement.selectionEnd - this.element.nativeElement.selectionStart === 0)) {
                e.preventDefault();
            }
        };
        return NumPadDirective;
    }());
    NumPadDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[lsnNumPad]'
                },] }
    ];
    /** @nocollapse */
    NumPadDirective.ctorParameters = function () { return [
        { type: i0.ElementRef },
        { type: forms.NgControl, decorators: [{ type: i0.Optional }] }
    ]; };
    NumPadDirective.propDecorators = {
        lsnNumPad: [{ type: i0.Input }],
        inputHandler: [{ type: i0.HostListener, args: ['input', ['$event'],] }],
        blurHandler: [{ type: i0.HostListener, args: ['blur', ['$event'],] }],
        keyDownHandler: [{ type: i0.HostListener, args: ['keydown', ['$event'],] }]
    };

    var LsnNumpadModule = /** @class */ (function () {
        function LsnNumpadModule() {
        }
        return LsnNumpadModule;
    }());
    LsnNumpadModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: [
                        NumPadDirective,
                    ],
                    imports: [],
                    exports: [
                        NumPadDirective,
                    ]
                },] }
    ];

    var LatinToGreekDirective = /** @class */ (function () {
        function LatinToGreekDirective(model, el) {
            this.model = model;
            this.el = el;
            this.latinToGreek = [
                [/A/ig, 'Α'],
                [/B/ig, 'Β'],
                [/G/ig, 'Γ'],
                [/D/ig, 'Δ'],
                [/E/ig, 'Ε'],
                [/Z/ig, 'Ζ'],
                [/H/ig, 'Η'],
                [/U/ig, 'Θ'],
                [/I/ig, 'Ι'],
                [/K/ig, 'Κ'],
                [/L/ig, 'Λ'],
                [/M/ig, 'Μ'],
                [/N/ig, 'Ν'],
                [/J/ig, 'Ξ'],
                [/O/ig, 'Ο'],
                [/P/ig, 'Π'],
                [/R/ig, 'Ρ'],
                [/S/ig, 'Σ'],
                [/T/ig, 'Τ'],
                [/Y/ig, 'Υ'],
                [/F/ig, 'Φ'],
                [/X/ig, 'Χ'],
                [/C/ig, 'Ψ'],
                [/V/ig, 'Ω'],
                [/W/ig, 'W'],
                [/Q/ig, 'Q']
            ];
        }
        LatinToGreekDirective.prototype.getCaret = function () {
            return {
                start: this.el.nativeElement.selectionStart,
                end: this.el.nativeElement.selectionEnd,
            };
        };
        LatinToGreekDirective.prototype.setCaret = function (start, end) {
            this.el.nativeElement.selectionStart = start;
            this.el.nativeElement.selectionEnd = end;
            this.el.nativeElement.focus();
        };
        LatinToGreekDirective.prototype.onInputChange = function ($event) {
            var _a = this.getCaret(), start = _a.start, end = _a.end;
            var translated = $event.toLocaleUpperCase();
            this.latinToGreek.forEach(function (replace) {
                translated = translated.replace(replace[0], replace[1]);
            });
            this.model.valueAccessor.writeValue(translated);
            this.setCaret(start, end);
        };
        return LatinToGreekDirective;
    }());
    LatinToGreekDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[ngModel][lsnLatinToGreek]',
                    providers: [forms.NgModel]
                },] }
    ];
    /** @nocollapse */
    LatinToGreekDirective.ctorParameters = function () { return [
        { type: forms.NgModel },
        { type: i0.ElementRef }
    ]; };
    LatinToGreekDirective.propDecorators = {
        onInputChange: [{ type: i0.HostListener, args: ['ngModelChange', ['$event'],] }]
    };

    var LsnLatinToGreekModule = /** @class */ (function () {
        function LsnLatinToGreekModule() {
        }
        return LsnLatinToGreekModule;
    }());
    LsnLatinToGreekModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: [
                        LatinToGreekDirective,
                    ],
                    imports: [],
                    exports: [
                        LatinToGreekDirective,
                    ]
                },] }
    ];

    var CapitalizeDirective = /** @class */ (function () {
        function CapitalizeDirective(model) {
            this.model = model;
        }
        CapitalizeDirective.prototype.onInputChange = function ($event) {
            this.model.valueAccessor.writeValue($event.toLocaleUpperCase());
        };
        return CapitalizeDirective;
    }());
    CapitalizeDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[ngModel][lsnCapitalize]',
                    providers: [forms.NgModel]
                },] }
    ];
    /** @nocollapse */
    CapitalizeDirective.ctorParameters = function () { return [
        { type: forms.NgModel }
    ]; };
    CapitalizeDirective.propDecorators = {
        onInputChange: [{ type: i0.HostListener, args: ['ngModelChange', ['$event'],] }]
    };

    var LsnCapitalizeModule = /** @class */ (function () {
        function LsnCapitalizeModule() {
        }
        return LsnCapitalizeModule;
    }());
    LsnCapitalizeModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: [
                        CapitalizeDirective,
                    ],
                    imports: [],
                    exports: [
                        CapitalizeDirective,
                    ]
                },] }
    ];

    var ScrollSpyDirective = /** @class */ (function () {
        function ScrollSpyDirective(elementRef) {
            this.elementRef = elementRef;
            this.spySectionChange = new i0.EventEmitter();
            this.disableEmitter = false;
            this.subscriptions = [];
            this.currentSection$ = new rxjs.Subject();
        }
        ScrollSpyDirective.prototype.ngOnInit = function () {
            var _this = this;
            this.scrollOffset = this.nativeElement().offsetTop;
            // emit event on section change
            var sectionChangeSub = this.currentSection$.pipe(operators.distinctUntilChanged(), operators.tap(function (sectionId) { return _this.spySectionChange.emit(sectionId); })).subscribe();
            // scroll to given section
            var scrollToSub = this.scrollToSection.pipe(operators.filter(function (section) { return !!section; }), operators.tap(function (section) { return _this.scrollTo(section); })).subscribe();
            this.subscriptions.push(sectionChangeSub, scrollToSub);
        };
        ScrollSpyDirective.prototype.onScroll = function () {
            var section = this.findCurrentSection();
            if (section) {
                this.setCurrentSection(section.id);
            }
        };
        ScrollSpyDirective.prototype.onResize = function () {
            this.onScroll();
        };
        ScrollSpyDirective.prototype.scrollTo = function (sectionId) {
            var _this = this;
            this.disableEmitter = true;
            this.nativeElement().querySelector('#' + sectionId).scrollIntoView();
            // set timeout to enforce scroll event execute before enabling back the emitter
            setTimeout(function () {
                _this.disableEmitter = false;
            }, 0);
        };
        ScrollSpyDirective.prototype.findCurrentSection = function () {
            var _this = this;
            var scrollMiddle = (this.scrollTopPosition() + this.scrollBottomPosition()) / 2;
            var spiedSections = this.getSpiedSections();
            return spiedSections.find(function (section) { return _this.isCurrentSection(section, scrollMiddle); });
        };
        ScrollSpyDirective.prototype.getSpiedSections = function () {
            return Array.from(this.nativeElement().querySelectorAll(this.spySelector));
        };
        ScrollSpyDirective.prototype.isCurrentSection = function (section, scrollMiddle) {
            return this.sectionTopPosition(section) <= scrollMiddle
                && this.sectionBottomPosition(section) > scrollMiddle;
        };
        ScrollSpyDirective.prototype.setCurrentSection = function (sectionId) {
            if (!this.disableEmitter) {
                this.currentSection$.next(sectionId);
            }
        };
        ScrollSpyDirective.prototype.sectionTopPosition = function (section) {
            return section.offsetTop;
        };
        ScrollSpyDirective.prototype.sectionBottomPosition = function (section) {
            return section.offsetTop + section.offsetHeight;
        };
        ScrollSpyDirective.prototype.scrollTopPosition = function () {
            return this.scrollOffset + this.nativeElement().scrollTop;
        };
        ScrollSpyDirective.prototype.scrollBottomPosition = function () {
            return this.scrollOffset + this.nativeElement().scrollTop + this.nativeElement().offsetHeight;
        };
        ScrollSpyDirective.prototype.nativeElement = function () {
            return this.elementRef.nativeElement;
        };
        ScrollSpyDirective.prototype.ngOnDestroy = function () {
            this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
        };
        return ScrollSpyDirective;
    }());
    ScrollSpyDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[lsnScrollSpy]'
                },] }
    ];
    /** @nocollapse */
    ScrollSpyDirective.ctorParameters = function () { return [
        { type: i0.ElementRef }
    ]; };
    ScrollSpyDirective.propDecorators = {
        spySelector: [{ type: i0.Input }],
        scrollToSection: [{ type: i0.Input }],
        spySectionChange: [{ type: i0.Output }],
        onScroll: [{ type: i0.HostListener, args: ['scroll',] }],
        onResize: [{ type: i0.HostListener, args: ['window:resize',] }]
    };

    var LsnScrollSpyModule = /** @class */ (function () {
        function LsnScrollSpyModule() {
        }
        return LsnScrollSpyModule;
    }());
    LsnScrollSpyModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: [
                        ScrollSpyDirective,
                    ],
                    imports: [],
                    exports: [
                        ScrollSpyDirective,
                    ]
                },] }
    ];

    var LsnCookieModule = /** @class */ (function () {
        function LsnCookieModule() {
        }
        return LsnCookieModule;
    }());
    LsnCookieModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: [],
                    imports: [
                        i2.CommonModule
                    ]
                },] }
    ];

    function lsnCrossTabServiceFactory(lsnCrossTabService) {
        return function () { return lsnCrossTabService.run(); };
    }
    var LsnCrossTabModule = /** @class */ (function () {
        function LsnCrossTabModule() {
        }
        return LsnCrossTabModule;
    }());
    LsnCrossTabModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [
                        i2.CommonModule,
                        LsnCookieModule
                    ],
                    exports: [
                        LsnCookieModule
                    ]
                },] }
    ];

    var LsnLibsModule = /** @class */ (function () {
        function LsnLibsModule() {
        }
        return LsnLibsModule;
    }());
    LsnLibsModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: [],
                    imports: [
                        forms.FormsModule,
                        LsnCapitalizeModule,
                        LsnLatinToGreekModule,
                        LsnNumericModule.forRoot({
                            default: {
                                decimals: '.',
                                precision: 4,
                            },
                            custom: {
                                currency: {
                                    decimals: ',',
                                    thousands: ' ',
                                    precision: 2,
                                }
                            }
                        }),
                        LsnNumpadModule,
                        LsnCookieModule,
                        LsnCrossTabModule,
                        LsnScrollSpyModule
                    ],
                    exports: [
                        LsnCapitalizeModule,
                        LsnLatinToGreekModule,
                        LsnNumericModule,
                        LsnNumpadModule,
                        LsnCookieModule,
                        LsnCrossTabModule,
                        LsnScrollSpyModule
                    ]
                },] }
    ];

    var LsnCrossTabConfig = /** @class */ (function () {
        function LsnCrossTabConfig(_a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.cookieCleanFreq, cookieCleanFreq = _c === void 0 ? null : _c, _d = _b.cookieReadFreq, cookieReadFreq = _d === void 0 ? null : _d, _e = _b.msgTtl, msgTtl = _e === void 0 ? null : _e, _f = _b.rootDomain, rootDomain = _f === void 0 ? null : _f, _g = _b.crossTabCookieName, crossTabCookieName = _g === void 0 ? null : _g;
            this.cookieCleanFreq = cookieCleanFreq;
            this.cookieReadFreq = cookieReadFreq;
            this.msgTtl = msgTtl;
            this.rootDomain = rootDomain;
            this.crossTabCookieName = crossTabCookieName;
        }
        return LsnCrossTabConfig;
    }());
    var LSN_CROSS_TAB_CONFIG = new i0.InjectionToken('LsnCrossTabConfig');

    var LsnCrossTabMessage = /** @class */ (function () {
        function LsnCrossTabMessage(_a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.created, created = _c === void 0 ? null : _c, _d = _b.code, code = _d === void 0 ? null : _d, _e = _b.tabId, tabId = _e === void 0 ? null : _e, _f = _b.attrs, attrs = _f === void 0 ? null : _f;
            this.created = created;
            this.code = code;
            this.tabId = tabId;
            this.attrs = attrs;
        }
        LsnCrossTabMessage.compare = function (firstMessage, secondMessage) {
            if (!firstMessage || !secondMessage) {
                return false;
            }
            if (firstMessage.created !== secondMessage.created) {
                return false;
            }
            if (firstMessage.code !== secondMessage.code) {
                return false;
            }
            return firstMessage.tabId !== secondMessage.tabId;
        };
        return LsnCrossTabMessage;
    }());

    var LsnCookieConfig = /** @class */ (function () {
        function LsnCookieConfig(_a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.secureCookies, secureCookies = _c === void 0 ? null : _c, _d = _b.domainCookies, domainCookies = _d === void 0 ? null : _d;
            this.secureCookies = secureCookies;
            this.domainCookies = domainCookies;
        }
        return LsnCookieConfig;
    }());
    var LSN_COOKIE_CONFIG = new i0.InjectionToken('LsnCookieConfig');

    var LsnCookieService = /** @class */ (function () {
        function LsnCookieService(cookieConfig, document) {
            this.cookieConfig = cookieConfig;
            this.document = document;
        }
        /**
         * Sets cookie with given key to given value, cookie options are optional, if not set, some properties
         * (secure and domain) will be set from global cookie config
         */
        LsnCookieService.prototype.set = function (cookieKey, cookieValue, cookieOptions) {
            var options = Object.assign(Object.assign({}, cookieOptions), { secure: cookieOptions && cookieOptions.secure ? cookieOptions.secure : this.cookieConfig.secureCookies });
            if (!this.cookieConfig.domainCookies) {
                options.domain = false;
            }
            var value = JSON.stringify(cookieValue);
            var expiresFor;
            if (typeof options.expires === 'number') {
                expiresFor = options.expires;
                options.expires = new Date();
                // Trying to delete a cookie; set a date far in the past
                if (expiresFor === -1) {
                    options.expires = new Date('Thu, 01 Jan 1970 00:00:00 GMT');
                }
                else if (options.expirationUnit) {
                    if (options.expirationUnit === 'hours') {
                        options.expires.setHours(options.expires.getHours() + expiresFor);
                    }
                    else if (options.expirationUnit === 'minutes') {
                        options.expires.setMinutes(options.expires.getMinutes() + expiresFor);
                    }
                    else if (options.expirationUnit === 'seconds') {
                        options.expires.setSeconds(options.expires.getSeconds() + expiresFor);
                    }
                    else if (options.expirationUnit === 'milliseconds') {
                        options.expires.setMilliseconds(options.expires.getMilliseconds() + expiresFor);
                    }
                    else {
                        options.expires.setDate(options.expires.getDate() + expiresFor);
                    }
                }
                else {
                    options.expires.setDate(options.expires.getDate() + expiresFor);
                }
            }
            this.document.cookie = [
                encodeURIComponent(cookieKey),
                '=',
                encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '',
                options.path ? '; path=' + options.path : '',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
            ].join('');
        };
        /**
         * Key provided - returns value of given cookie or undefined if non existent
         * Key not provided - returns all cookies as Object or undefined if there are no cookies
         * Cookie values are JSON.parsed, if error occurs during parsing, string value is assigned
         */
        LsnCookieService.prototype.get = function (cookieKey) {
            var cookieStringList = this.document.cookie ? this.document.cookie.split('; ') : [];
            var cookieObject = cookieStringList
                .map(function (cookieString) {
                var pos = cookieString.indexOf('=');
                return {
                    name: cookieString.substr(0, pos),
                    value: decodeURIComponent(cookieString.substr(pos + 1))
                };
            }).filter(function (cookie) {
                return typeof cookie.value !== 'undefined' && (cookieKey === undefined || cookieKey === cookie.name);
            }).reduce(function (previousValue, currentValue) {
                var value = null;
                try {
                    value = JSON.parse(currentValue.value);
                }
                catch (e) {
                    value = currentValue.value;
                }
                previousValue[currentValue.name] = value;
                return previousValue;
            }, {});
            return cookieKey ? cookieObject[cookieKey] : Object.keys(cookieObject).length > 0 ? cookieObject : undefined;
        };
        LsnCookieService.prototype.remove = function (cookieKey, cookieOptions) {
            if (cookieOptions === void 0) { cookieOptions = {}; }
            var cookie = this.get(cookieKey);
            if (cookie) {
                cookieOptions.expires = -1;
                this.set(cookieKey, '', cookieOptions);
                return true;
            }
            else {
                return false;
            }
        };
        return LsnCookieService;
    }());
    /** @nocollapse */ LsnCookieService.ɵprov = i0.ɵɵdefineInjectable({ factory: function LsnCookieService_Factory() { return new LsnCookieService(i0.ɵɵinject(LSN_COOKIE_CONFIG), i0.ɵɵinject(i2.DOCUMENT)); }, token: LsnCookieService, providedIn: "root" });
    LsnCookieService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    LsnCookieService.ctorParameters = function () { return [
        { type: LsnCookieConfig, decorators: [{ type: i0.Inject, args: [LSN_COOKIE_CONFIG,] }] },
        { type: undefined, decorators: [{ type: i0.Inject, args: [i2.DOCUMENT,] }] }
    ]; };

    var LsnCrossTabService = /** @class */ (function () {
        function LsnCrossTabService(lsnCookieService, crossTabConfig) {
            var _this = this;
            this.lsnCookieService = lsnCookieService;
            /**
             * Checks if message with given id was already read
             */
            this.messageWasRead = function (msg) { return _this.messagesReadSet.has(_this.getMessageId(msg)); };
            this.getMessageId = function (message) { return message.tabId + message.created + message.code; };
            this.messageToPlainObject = function (msg) { return Object.keys(msg)
                .reduce(function (minifiedObj, key) {
                var value = msg[key];
                if (!(key === 'attrs' && (value === null || value === {}))) {
                    minifiedObj[key] = value;
                    return minifiedObj;
                }
                else {
                    return minifiedObj;
                } // tslint:disable
            }, {}); }; // tslint:enable
            this.getCookie = function () { return _this.cookie; };
            this.crossTabConfig = crossTabConfig || new LsnCrossTabConfig();
            this.messageSubject = new rxjs.Subject();
            this.tabId = Math.random() + '';
            this.messagesReadSet = new Set();
            this.tabOpenTime = Date.now();
        }
        Object.defineProperty(LsnCrossTabService.prototype, "crossTabCookieName", {
            get: function () {
                return this.crossTabConfig.crossTabCookieName;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * This function sets up subscriptions for reading and cleaning cross tab cookie
         */
        LsnCrossTabService.prototype.run = function () {
            var _this = this;
            if (!this.cookieReadSubscription) {
                this.cookieReadSubscription = rxjs.interval(this.crossTabConfig.cookieReadFreq)
                    .subscribe(function () { return _this.readMessages(); });
            }
            if (!this.cookieCleanSubscription) {
                this.cookieCleanSubscription = rxjs.interval(this.crossTabConfig.cookieCleanFreq)
                    .subscribe(function () { return _this.cleanCookie(); });
            }
        };
        Object.defineProperty(LsnCrossTabService.prototype, "messages$", {
            /**
             * This Observable emits messages that were sent by other tabs
             */
            get: function () {
                return this.messageSubject;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Manually set cross tab config, for example when config must be provided asynchronously and not with InjectionToken
         */
        LsnCrossTabService.prototype.setCrossTabConfig = function (config) {
            this.crossTabConfig = config;
        };
        /**
         * Sends message to other tabs by adding this message to cross tab cookie
         */
        LsnCrossTabService.prototype.sendMessage = function (data) {
            var message;
            if (typeof data === 'string') {
                message = new LsnCrossTabMessage({ code: data });
            }
            else if (data instanceof LsnCrossTabMessage) {
                message = data;
            }
            else if (!!data && typeof data === 'object' && !Array.isArray(data)) {
                message = new LsnCrossTabMessage(Object.assign({}, data));
            }
            else {
                return;
            }
            // previous implementation, message.created is always overridden
            message.created = new Date().getTime();
            message.tabId = this.tabId;
            this.messagesReadSet.add(this.getMessageId(message));
            this.updateCookie(this.messageToPlainObject(message));
        };
        /**
         * Appends given message to cross tab cookie value
         */
        LsnCrossTabService.prototype.updateCookie = function (msg) {
            var cookieData = this.cookie;
            cookieData.push(msg);
            this.cookie = cookieData;
        };
        Object.defineProperty(LsnCrossTabService.prototype, "cookie", {
            get: function () {
                return this.lsnCookieService.get(this.crossTabConfig.crossTabCookieName) || [];
            },
            set: function (cookieData) {
                this.lsnCookieService.set(this.crossTabCookieName, cookieData, {
                    domain: this.crossTabConfig.rootDomain,
                    path: '/'
                });
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Removes messages from cross tab cookie that are older than supplied config.msgTtl time
         */
        LsnCrossTabService.prototype.cleanCookie = function () {
            var currentCookie = this.cookie;
            if (currentCookie === null) {
                return;
            }
            var timestamp = new Date().getTime();
            var cleanedCookie = currentCookie.filter(this.cleanCookieFilter(timestamp, this.crossTabConfig.msgTtl));
            // previous implementation, cookie might have been modified in the other tab?
            if (!this.areCookiesEqual(currentCookie, this.cookie)) {
                return;
            }
            this.cookie = cleanedCookie;
        };
        /**
         * Callback invoked after every cookie read interval
         */
        LsnCrossTabService.prototype.readMessages = function () {
            var _this = this;
            if (this.cookie) {
                this.cookie.forEach(function (msgData) {
                    if (msgData.created > _this.tabOpenTime) {
                        var msgCopy = Object.assign({}, msgData);
                        if (!_this.messageWasRead(msgCopy)) {
                            _this.messagesReadSet.add(_this.getMessageId(msgCopy));
                            _this.messageSubject.next(msgCopy);
                        }
                    }
                });
            }
        };
        /**
         * Removes all subscriptions that this service is subscribe to (intervals are cleared)
         */
        LsnCrossTabService.prototype.unsubscribe = function () {
            this.cookieReadSubscription.unsubscribe();
            this.cookieCleanSubscription.unsubscribe();
        };
        LsnCrossTabService.prototype.ngOnDestroy = function () {
            this.unsubscribe();
        };
        /**
         * Sorts two cookie arrays and compares each element
         */
        LsnCrossTabService.prototype.areCookiesEqual = function (firstCookie, secondCookie) {
            var e_1, _a;
            if (firstCookie.length !== secondCookie.length) {
                return false;
            }
            else if (firstCookie.length === 0 && secondCookie.length === 0) {
                return true;
            }
            firstCookie.sort(this.messageComparer);
            secondCookie.sort(this.messageComparer);
            var index = 0;
            var areCookiesEqual = true;
            try {
                for (var firstCookie_1 = __values(firstCookie), firstCookie_1_1 = firstCookie_1.next(); !firstCookie_1_1.done; firstCookie_1_1 = firstCookie_1.next()) {
                    var message = firstCookie_1_1.value;
                    if (LsnCrossTabMessage.compare(message, secondCookie[index])) {
                        areCookiesEqual = false;
                    }
                    else {
                        ++index;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (firstCookie_1_1 && !firstCookie_1_1.done && (_a = firstCookie_1.return)) _a.call(firstCookie_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return areCookiesEqual;
        };
        /**
         * Compares two messages by properties in order: 'created', 'code', 'tabId';
         */
        LsnCrossTabService.prototype.messageComparer = function (firstCookieValue, secondCookieValue) {
            var result = firstCookieValue.created < secondCookieValue.created ? -1 : secondCookieValue.created < firstCookieValue.created ? 1 : 0;
            if (result === 0) {
                result = firstCookieValue.code < secondCookieValue.code ? -1 : secondCookieValue.code < firstCookieValue.code ? 1 : 0;
                if (result === 0) {
                    result = firstCookieValue.tabId < secondCookieValue.tabId ? -1 : secondCookieValue.tabId < firstCookieValue.tabId ? 1 : 0;
                }
            }
            return result;
        };
        /**
         * Function determines whether given message is to be removed from the cross tab cookie
         */
        LsnCrossTabService.prototype.cleanCookieFilter = function (timestamp, msgTtl) {
            return function (cookieMessage) { return timestamp - cookieMessage.created <= msgTtl; };
        };
        return LsnCrossTabService;
    }());
    /** @nocollapse */ LsnCrossTabService.ɵprov = i0.ɵɵdefineInjectable({ factory: function LsnCrossTabService_Factory() { return new LsnCrossTabService(i0.ɵɵinject(LsnCookieService), i0.ɵɵinject(LSN_CROSS_TAB_CONFIG, 8)); }, token: LsnCrossTabService, providedIn: "root" });
    LsnCrossTabService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    LsnCrossTabService.ctorParameters = function () { return [
        { type: LsnCookieService },
        { type: LsnCrossTabConfig, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: [LSN_CROSS_TAB_CONFIG,] }] }
    ]; };

    /*
     * Public API Surface of lsn-libs
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.CapitalizeDirective = CapitalizeDirective;
    exports.CustomNumericConfig = CustomNumericConfig;
    exports.DefaultNumericConfig = DefaultNumericConfig;
    exports.LSN_COOKIE_CONFIG = LSN_COOKIE_CONFIG;
    exports.LSN_CROSS_TAB_CONFIG = LSN_CROSS_TAB_CONFIG;
    exports.LatinToGreekDirective = LatinToGreekDirective;
    exports.LsnCapitalizeModule = LsnCapitalizeModule;
    exports.LsnCookieConfig = LsnCookieConfig;
    exports.LsnCookieModule = LsnCookieModule;
    exports.LsnCookieService = LsnCookieService;
    exports.LsnCrossTabConfig = LsnCrossTabConfig;
    exports.LsnCrossTabMessage = LsnCrossTabMessage;
    exports.LsnCrossTabModule = LsnCrossTabModule;
    exports.LsnCrossTabService = LsnCrossTabService;
    exports.LsnLatinToGreekModule = LsnLatinToGreekModule;
    exports.LsnLibsModule = LsnLibsModule;
    exports.LsnNumericModule = LsnNumericModule;
    exports.LsnNumpadModule = LsnNumpadModule;
    exports.LsnScrollSpyModule = LsnScrollSpyModule;
    exports.NumPadDirective = NumPadDirective;
    exports.NumericConfigService = NumericConfigService;
    exports.NumericDirective = NumericDirective;
    exports.ScrollSpyDirective = ScrollSpyDirective;
    exports.lsnCrossTabServiceFactory = lsnCrossTabServiceFactory;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=lsnova-angularmodules.umd.js.map
