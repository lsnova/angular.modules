(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/cdk/keycodes'), require('@angular/forms'), require('rxjs'), require('rxjs/operators'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@lsnova/angularmodules', ['exports', '@angular/core', '@angular/cdk/keycodes', '@angular/forms', 'rxjs', 'rxjs/operators', '@angular/common'], factory) :
    (global = global || self, factory((global.lsnova = global.lsnova || {}, global.lsnova.angularmodules = {}), global.ng.core, global.ng.cdk.keycodes, global.ng.forms, global.rxjs, global.rxjs.operators, global.ng.common));
}(this, (function (exports, core, keycodes, forms, rxjs, operators, common) { 'use strict';

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

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
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
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __createBinding(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    }

    function __exportStar(m, exports) {
        for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/directives/numeric/numeric-config.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {string} */
    var NumericSeparator = {
        COMMA: ",",
        PERIOD: ".",
        SPACE: " ",
    };
    /**
     * @record
     */
    function NumericConfig() { }
    if (false) {
        /** @type {?|undefined} */
        NumericConfig.prototype.min;
        /** @type {?|undefined} */
        NumericConfig.prototype.max;
        /** @type {?|undefined} */
        NumericConfig.prototype.maxLength;
        /** @type {?|undefined} */
        NumericConfig.prototype.precision;
        /** @type {?|undefined} */
        NumericConfig.prototype.decimals;
        /** @type {?|undefined} */
        NumericConfig.prototype.thousands;
        /** @type {?|undefined} */
        NumericConfig.prototype.config;
        /** @type {?|undefined} */
        NumericConfig.prototype.step;
        /** @type {?|undefined} */
        NumericConfig.prototype.noScientificNotation;
        /** @type {?|undefined} */
        NumericConfig.prototype.alwaysDisplayDecimals;
    }
    var DefaultNumericConfig = /** @class */ (function () {
        function DefaultNumericConfig(props) {
            if (props === void 0) { props = {}; }
            this.precision = 0;
            this.decimals = NumericSeparator.PERIOD;
            this.noScientificNotation = false;
            Object.assign(this, props);
        }
        return DefaultNumericConfig;
    }());
    if (false) {
        /** @type {?} */
        DefaultNumericConfig.prototype.min;
        /** @type {?} */
        DefaultNumericConfig.prototype.max;
        /** @type {?} */
        DefaultNumericConfig.prototype.maxLength;
        /** @type {?} */
        DefaultNumericConfig.prototype.precision;
        /** @type {?} */
        DefaultNumericConfig.prototype.decimals;
        /** @type {?} */
        DefaultNumericConfig.prototype.thousands;
        /** @type {?} */
        DefaultNumericConfig.prototype.step;
        /** @type {?} */
        DefaultNumericConfig.prototype.noScientificNotation;
    }
    var CustomNumericConfig = /** @class */ (function () {
        function CustomNumericConfig(props) {
            if (props === void 0) { props = {}; }
            Object.assign(this, props);
        }
        return CustomNumericConfig;
    }());
    if (false) {
        /** @type {?} */
        CustomNumericConfig.prototype.default;
        /** @type {?} */
        CustomNumericConfig.prototype.custom;
    }
    var NumericConfigService = /** @class */ (function () {
        function NumericConfigService(config) {
            /** @type {?} */
            var moduleConfig = new CustomNumericConfig();
            if (config) {
                moduleConfig = Object.assign(moduleConfig, config);
            }
            /** @type {?} */
            var numericConfig = moduleConfig.default || {};
            /** @type {?} */
            var customConfig = moduleConfig.custom || {};
            this.config = new CustomNumericConfig({
                default: new DefaultNumericConfig(numericConfig),
                custom: customConfig,
            });
        }
        /**
         * @return {?}
         */
        NumericConfigService.prototype.getDefaultConfig = /**
         * @return {?}
         */
        function () {
            return this.config.default;
        };
        /**
         * @param {?} key
         * @return {?}
         */
        NumericConfigService.prototype.getCustomConfig = /**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            if (!this.config.custom[key]) {
                console.warn('[lsnNumeric] Invalid config key provided.');
            }
            return __assign(__assign({}, this.getDefaultConfig()), this.config.custom[key]) || this.getDefaultConfig();
        };
        NumericConfigService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        NumericConfigService.ctorParameters = function () { return [
            { type: CustomNumericConfig }
        ]; };
        return NumericConfigService;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        NumericConfigService.prototype.config;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/directives/numeric/numeric.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var CUSTOM_SELECT_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef((/**
         * @return {?}
         */
        function () { return NumericDirective; })),
        multi: true
    };
    /** @enum {number} */
    var NumericMessage = {
        ADDITIONAL_DECIMAL_SEPARATOR: 0,
    };
    NumericMessage[NumericMessage.ADDITIONAL_DECIMAL_SEPARATOR] = 'ADDITIONAL_DECIMAL_SEPARATOR';
    var NumericDirective = /** @class */ (function () {
        function NumericDirective(el, configService) {
            this.el = el;
            this.configService = configService;
            this.lsnNumeric = {};
            this.lsnNumericMessages = new core.EventEmitter();
            this.onChange = (/**
             * @param {?} _
             * @return {?}
             */
            function (_) {
            });
            this.onTouch = (/**
             * @return {?}
             */
            function () {
            });
            this.element = el;
            this.setConfig();
        }
        /**
         * @return {?}
         */
        NumericDirective.prototype.ngOnChanges = /**
         * @return {?}
         */
        function () {
            this.setConfig();
        };
        /**
         * @param {?} $event
         * @return {?}
         */
        NumericDirective.prototype.inputHandler = /**
         * @param {?} $event
         * @return {?}
         */
        function ($event) {
            if ($event.target.value === '-') {
                return;
            }
            /** @type {?} */
            var value = this.removeInvalidCharacters($event.target.value);
            value = this.handleWholesLength(value);
            /** @type {?} */
            var parsedValue = this.parseValue(value);
            this.displayValue = value.replace(/[,|.]/, this.config.decimals);
            this.onChange(parsedValue);
        };
        /**
         * @return {?}
         */
        NumericDirective.prototype.focusHandler = /**
         * @return {?}
         */
        function () {
            this.setEditMode();
        };
        /**
         * @return {?}
         */
        NumericDirective.prototype.blurHandler = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var parsedValue = this.parseValue(this.element.nativeElement.value);
            /** @type {?} */
            var rangeValue = this.handleRange(parsedValue);
            // correct entered value on blur to proper range value
            if (parsedValue !== rangeValue) {
                this.displayValue = rangeValue.toString().replace(/[,|.]/, this.config.decimals);
                this.onChange(rangeValue);
            }
            else if (this.config.step && !isNaN(parsedValue)) {
                // correct entered value on blur to proper step value
                /** @type {?} */
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
        /**
         * @param {?} modelValue
         * @return {?}
         */
        NumericDirective.prototype.writeValue = /**
         * @param {?} modelValue
         * @return {?}
         */
        function (modelValue) {
            return __awaiter(this, void 0, void 0, function () {
                var parsedValue;
                return __generator(this, function (_a) {
                    parsedValue = this.parseValue(modelValue);
                    this.displayValue = this.prepareDisplayValue(parsedValue);
                    return [2 /*return*/];
                });
            });
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        NumericDirective.prototype.registerOnChange = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this.onChange = fn;
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        NumericDirective.prototype.registerOnTouched = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this.onTouch = fn;
        };
        Object.defineProperty(NumericDirective.prototype, "displayValue", {
            get: /**
             * @return {?}
             */
            function () {
                return this.element.nativeElement.value;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.element.nativeElement.value = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        NumericDirective.prototype.setConfig = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var defaultConfig = this.lsnNumeric.config
                ? this.configService.getCustomConfig(this.lsnNumeric.config)
                : this.configService.getDefaultConfig();
            this.config = Object.assign(__assign(__assign({}, defaultConfig), this.lsnNumeric));
            if (this.config.decimals && this.config.thousands && this.config.decimals === this.config.thousands) {
                this.config.thousands = undefined;
            }
            if (this.config.max !== undefined && this.config.maxLength !== undefined) {
                console.warn('[lsnNumeric] Setting `maxLength` makes `max` redundant.');
            }
        };
        /**
         * @param {?} value
         * @return {?}
         */
        NumericDirective.prototype.parseValue = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!value && value !== 0) {
                return undefined;
            }
            /** @type {?} */
            var newValue = value.toString().replace(/[,|.]/, '.');
            /** @type {?} */
            var parsedValue = this.config.precision > 0
                ? parseFloat(newValue)
                : parseInt(newValue, 10);
            return isNaN(parsedValue) ? undefined : parsedValue;
        };
        /**
         * @param {?} value
         * @return {?}
         */
        NumericDirective.prototype.handleWholesLength = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this.config.maxLength) {
                /** @type {?} */
                var negativeSign = value.toString().startsWith('-') ? '-' : '';
                /** @type {?} */
                var absoluteValue = value.toString()
                    .replace(/^-/, '')
                    .replace(/[,|.]/, this.config.decimals);
                if (absoluteValue.toString().includes(this.config.decimals)) {
                    var _a = __read(absoluteValue.toString().split(this.config.decimals), 2), wholes = _a[0], decimals = _a[1];
                    /** @type {?} */
                    var properDecimals = this.removeInvalidCharacters(decimals, true);
                    return negativeSign + wholes.substr(0, this.config.maxLength) + this.config.decimals + properDecimals;
                }
                return negativeSign + absoluteValue.toString().substr(0, this.config.maxLength);
            }
            return value;
        };
        /**
         * @param {?} value
         * @param {?=} allowDecimalsOnly
         * @return {?}
         */
        NumericDirective.prototype.removeInvalidCharacters = /**
         * @param {?} value
         * @param {?=} allowDecimalsOnly
         * @return {?}
         */
        function (value, allowDecimalsOnly) {
            if (allowDecimalsOnly === void 0) { allowDecimalsOnly = false; }
            return this.cleanUp(allowDecimalsOnly
                ? value.replace(/[^\-0-9]/g, '')
                : value.replace(/[^\-0-9,.]/g, ''));
        };
        /**
         * @private
         * @param {?} input
         * @return {?}
         */
        NumericDirective.prototype.cleanUp = /**
         * @private
         * @param {?} input
         * @return {?}
         */
        function (input) {
            // no precision at all
            /** @type {?} */
            var value = input.replace(/[,|.]/g, '.');
            /** @type {?} */
            var firstIndex = typeof value === 'string' || value instanceof String
                ? value.indexOf('.')
                : -1;
            if (firstIndex === -1) {
                return value;
            }
            // remove everything after second comma
            /** @type {?} */
            var secondIndex = value.substr(firstIndex + 1).indexOf('.');
            if (secondIndex !== -1) {
                this.lsnNumericMessages.emit(NumericMessage.ADDITIONAL_DECIMAL_SEPARATOR);
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
        /**
         * @param {?} value
         * @return {?}
         */
        NumericDirective.prototype.handleRange = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!this.config.maxLength && this.config.max !== undefined && value > this.config.max) {
                return this.config.max;
            }
            else if (this.config.min !== undefined && value < this.config.min) {
                return this.config.min;
            }
            return value;
        };
        /**
         * @param {?} value
         * @return {?}
         */
        NumericDirective.prototype.handleStep = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            return Math.round(value / this.config.step) * this.config.step;
        };
        /**
         * @param {?} value
         * @return {?}
         */
        NumericDirective.prototype.prepareDisplayValue = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!value && value !== 0) {
                return '';
            }
            var _a = __read(this.getWholeAndDecimalParts(value), 2), whole = _a[0], decimals = _a[1];
            /** @type {?} */
            var isNegative = whole[0] === '-' || whole < 0;
            /** @type {?} */
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
        /**
         * @return {?}
         */
        NumericDirective.prototype.setEditMode = /**
         * @return {?}
         */
        function () {
            if (this.config.thousands) {
                /** @type {?} */
                var currentValue = this.element.nativeElement.value;
                var _a = __read(currentValue.split(this.config.decimals), 2), whole = _a[0], decimals = _a[1];
                /** @type {?} */
                var regex = new RegExp('\\' + this.config.thousands, 'g');
                /** @type {?} */
                var result = whole.replace(regex, '');
                if (decimals && this.config.precision && this.config.decimals) {
                    result = result + this.config.decimals + decimals;
                }
                this.displayValue = result;
            }
        };
        /**
         * @param {?} e
         * @return {?}
         */
        NumericDirective.prototype.keyDownHandler = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            /** @type {?} */
            var currentValue = this.element.nativeElement.value;
            if (
            // Allow special keys
            [
                keycodes.LEFT_ARROW,
                keycodes.RIGHT_ARROW,
                keycodes.BACKSPACE,
                keycodes.DELETE,
                keycodes.END,
                keycodes.ENTER,
                keycodes.ESCAPE,
                keycodes.HOME,
                keycodes.TAB,
            ].indexOf(e.keyCode) !== -1
                // Allow Ctrl+key actions
                || ([
                    keycodes.A,
                    keycodes.C,
                    keycodes.R,
                    keycodes.V,
                    keycodes.X,
                ].indexOf(e.keyCode) !== -1
                    && (e.ctrlKey === true || e.metaKey === true))) {
                return; // let it happen, don't do anything
            }
            // Handle maxLength
            /** @type {?} */
            var absoluteValue = currentValue.toString().replace(/^-/, '');
            var _a = __read(absoluteValue.toString().split(this.config.decimals), 1), wholes = _a[0];
            if (this.config.maxLength !== undefined
                && (this.element.nativeElement.selectionStart < wholes.length
                    && wholes.length >= this.config.maxLength
                    && [keycodes.DASH, keycodes.NUMPAD_MINUS].indexOf(e.keyCode) === -1)
                && this.element.nativeElement.selectionEnd - this.element.nativeElement.selectionStart === 0) {
                e.preventDefault();
            }
            // Handle minus
            if ([keycodes.DASH, keycodes.NUMPAD_MINUS].indexOf(e.keyCode) !== -1
                && this.element.nativeElement.selectionStart === 0
                && ((this.config.min !== undefined && this.config.min < 0) || this.config.min === undefined)
                && currentValue.indexOf('-') === -1) {
                return;
            }
            // Handle separator
            if (this.config.precision > 0
                && [keycodes.COMMA, keycodes.NUMPAD_PERIOD, 190].indexOf(e.keyCode) !== -1
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
                keycodes.ZERO,
                keycodes.ONE,
                keycodes.TWO,
                keycodes.THREE,
                keycodes.FOUR,
                keycodes.FIVE,
                keycodes.SIX,
                keycodes.SEVEN,
                keycodes.EIGHT,
                keycodes.NINE
            ].indexOf(e.keyCode) === -1
                || e.shiftKey)
                &&
                    [
                        keycodes.NUMPAD_ZERO,
                        keycodes.NUMPAD_ONE,
                        keycodes.NUMPAD_TWO,
                        keycodes.NUMPAD_THREE,
                        keycodes.NUMPAD_FOUR,
                        keycodes.NUMPAD_FIVE,
                        keycodes.NUMPAD_SIX,
                        keycodes.NUMPAD_SEVEN,
                        keycodes.NUMPAD_EIGHT,
                        keycodes.NUMPAD_NINE,
                    ].indexOf(e.keyCode) === -1)
                || (this.element.nativeElement.selectionStart === 0
                    && this.element.nativeElement.selectionEnd === 0
                    && currentValue.indexOf('-') > -1)) {
                e.preventDefault();
            }
        };
        /**
         * @param {?} isDisabled
         * @return {?}
         */
        NumericDirective.prototype.setDisabledState = /**
         * @param {?} isDisabled
         * @return {?}
         */
        function (isDisabled) {
            this.element.nativeElement.disabled = isDisabled;
        };
        /**
         * parse whole part of a number to display value (based on given config)
         */
        /**
         * parse whole part of a number to display value (based on given config)
         * @protected
         * @param {?} whole
         * @return {?}
         */
        NumericDirective.prototype.getWholeDisplayValue = /**
         * parse whole part of a number to display value (based on given config)
         * @protected
         * @param {?} whole
         * @return {?}
         */
        function (whole) {
            /** @type {?} */
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
        /**
         * get whole and decimal part of a number
         * type of return values may vary, it is intentional
         * the returned array should have size of 1(only whole number) or 2(whole and decimal)
         * @protected
         * @param {?} value
         * @return {?}
         */
        NumericDirective.prototype.getWholeAndDecimalParts = /**
         * get whole and decimal part of a number
         * type of return values may vary, it is intentional
         * the returned array should have size of 1(only whole number) or 2(whole and decimal)
         * @protected
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (typeof value === 'number') {
                if (this.config.noScientificNotation && (value > Number.MAX_SAFE_INTEGER || value < Number.MIN_SAFE_INTEGER)) {
                    /** @type {?} */
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
        /**
         * @protected
         * @param {?=} value
         * @param {?=} precision
         * @return {?}
         */
        NumericDirective.prototype.defaultDecimals = /**
         * @protected
         * @param {?=} value
         * @param {?=} precision
         * @return {?}
         */
        function (value, precision) {
            if (value === void 0) { value = ''; }
            if (precision === void 0) { precision = 0; }
            /** @type {?} */
            var result = '' + value;
            while (result.length < precision) {
                result += '0';
            }
            return result;
        };
        /**
         * @protected
         * @param {?} decimals
         * @return {?}
         */
        NumericDirective.prototype.shouldAddDefaultDecimals = /**
         * @protected
         * @param {?} decimals
         * @return {?}
         */
        function (decimals) {
            return !decimals || ('' + decimals).length !== this.config.precision;
        };
        NumericDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[lsnNumeric]',
                        providers: [CUSTOM_SELECT_VALUE_ACCESSOR]
                    },] }
        ];
        /** @nocollapse */
        NumericDirective.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: NumericConfigService }
        ]; };
        NumericDirective.propDecorators = {
            lsnNumeric: [{ type: core.Input }],
            lsnNumericMessages: [{ type: core.Output }],
            inputHandler: [{ type: core.HostListener, args: ['input', ['$event'],] }],
            focusHandler: [{ type: core.HostListener, args: ['focus', [],] }],
            blurHandler: [{ type: core.HostListener, args: ['blur', [],] }],
            keyDownHandler: [{ type: core.HostListener, args: ['keydown', ['$event'],] }]
        };
        return NumericDirective;
    }());
    if (false) {
        /** @type {?} */
        NumericDirective.prototype.lsnNumeric;
        /** @type {?} */
        NumericDirective.prototype.lsnNumericMessages;
        /** @type {?} */
        NumericDirective.prototype.element;
        /**
         * @type {?}
         * @protected
         */
        NumericDirective.prototype.config;
        /** @type {?} */
        NumericDirective.prototype.onChange;
        /** @type {?} */
        NumericDirective.prototype.onTouch;
        /**
         * @type {?}
         * @private
         */
        NumericDirective.prototype.el;
        /**
         * @type {?}
         * @private
         */
        NumericDirective.prototype.configService;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/directives/numeric/numeric.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var LsnNumericModule = /** @class */ (function () {
        function LsnNumericModule() {
        }
        /**
         * @param {?=} config
         * @return {?}
         */
        LsnNumericModule.forRoot = /**
         * @param {?=} config
         * @return {?}
         */
        function (config) {
            return {
                ngModule: LsnNumericModule,
                providers: [
                    NumericConfigService,
                    { provide: CustomNumericConfig, useValue: config }
                ]
            };
        };
        LsnNumericModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            NumericDirective,
                        ],
                        exports: [
                            NumericDirective,
                        ]
                    },] }
        ];
        return LsnNumericModule;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/directives/numpad/numpad.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NumPadConfig = /** @class */ (function () {
        function NumPadConfig() {
            this.allowLeadingZeros = false;
        }
        return NumPadConfig;
    }());
    if (false) {
        /** @type {?} */
        NumPadConfig.prototype.maxlength;
        /** @type {?} */
        NumPadConfig.prototype.allowLeadingZeros;
    }
    var NumPadDirective = /** @class */ (function () {
        function NumPadDirective(element, ngControl) {
            this.element = element;
            this.ngControl = ngControl;
            this.lsnNumPad = {};
            this.defaultConfig = new NumPadConfig();
        }
        /**
         * @return {?}
         */
        NumPadDirective.prototype.ngOnChanges = /**
         * @return {?}
         */
        function () {
            this.config = Object.assign(__assign(__assign({}, this.defaultConfig), this.lsnNumPad));
        };
        /**
         * @param {?} $event
         * @return {?}
         */
        NumPadDirective.prototype.inputHandler = /**
         * @param {?} $event
         * @return {?}
         */
        function ($event) {
            /** @type {?} */
            var currentValue = $event.target.value;
            this.setValue(this.parseNewValue(currentValue));
        };
        /**
         * @param {?} $event
         * @return {?}
         */
        NumPadDirective.prototype.blurHandler = /**
         * @param {?} $event
         * @return {?}
         */
        function ($event) {
            /** @type {?} */
            var currentValue = $event.target.value;
            this.setValue(this.parseNewValue(currentValue, true));
        };
        /**
         * @protected
         * @param {?} value
         * @return {?}
         */
        NumPadDirective.prototype.setValue = /**
         * @protected
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this.ngControl && this.ngControl.control) {
                this.ngControl.control.setValue(value);
            }
            else {
                this.element.nativeElement.value = value;
            }
        };
        /**
         * @protected
         * @param {?} value
         * @param {?=} blurEvent
         * @return {?}
         */
        NumPadDirective.prototype.parseNewValue = /**
         * @protected
         * @param {?} value
         * @param {?=} blurEvent
         * @return {?}
         */
        function (value, blurEvent) {
            if (blurEvent === void 0) { blurEvent = false; }
            /** @type {?} */
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
        /**
         * @param {?} e
         * @return {?}
         */
        NumPadDirective.prototype.keyDownHandler = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            /** @type {?} */
            var currentValue = this.element.nativeElement.value;
            if (
            // Allow special keys
            [
                keycodes.LEFT_ARROW,
                keycodes.RIGHT_ARROW,
                keycodes.BACKSPACE,
                keycodes.DELETE,
                keycodes.END,
                keycodes.ENTER,
                keycodes.ESCAPE,
                keycodes.HOME,
                keycodes.TAB,
            ].indexOf(e.keyCode) !== -1
                // Allow Ctrl+key actions
                || ([
                    keycodes.A,
                    keycodes.C,
                    keycodes.R,
                    keycodes.V,
                    keycodes.X,
                ].indexOf(e.keyCode) !== -1
                    && (e.ctrlKey === true || e.metaKey === true))) {
                return; // let it happen, don't do anything
            }
            // Ensure that it is a number or stop the keypress
            if ((([
                keycodes.ZERO,
                keycodes.ONE,
                keycodes.TWO,
                keycodes.THREE,
                keycodes.FOUR,
                keycodes.FIVE,
                keycodes.SIX,
                keycodes.SEVEN,
                keycodes.EIGHT,
                keycodes.NINE
            ].indexOf(e.keyCode) === -1
                || e.shiftKey)
                &&
                    [
                        keycodes.NUMPAD_ZERO,
                        keycodes.NUMPAD_ONE,
                        keycodes.NUMPAD_TWO,
                        keycodes.NUMPAD_THREE,
                        keycodes.NUMPAD_FOUR,
                        keycodes.NUMPAD_FIVE,
                        keycodes.NUMPAD_SIX,
                        keycodes.NUMPAD_SEVEN,
                        keycodes.NUMPAD_EIGHT,
                        keycodes.NUMPAD_NINE,
                    ].indexOf(e.keyCode) === -1)
                || (currentValue.length
                    && this.config.maxlength && this.config.maxlength > 0
                    && currentValue.length >= this.config.maxlength)) {
                e.preventDefault();
            }
        };
        NumPadDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[lsnNumPad]'
                    },] }
        ];
        /** @nocollapse */
        NumPadDirective.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: forms.NgControl, decorators: [{ type: core.Optional }] }
        ]; };
        NumPadDirective.propDecorators = {
            lsnNumPad: [{ type: core.Input }],
            inputHandler: [{ type: core.HostListener, args: ['input', ['$event'],] }],
            blurHandler: [{ type: core.HostListener, args: ['blur', ['$event'],] }],
            keyDownHandler: [{ type: core.HostListener, args: ['keydown', ['$event'],] }]
        };
        return NumPadDirective;
    }());
    if (false) {
        /** @type {?} */
        NumPadDirective.prototype.lsnNumPad;
        /**
         * @type {?}
         * @protected
         */
        NumPadDirective.prototype.config;
        /**
         * @type {?}
         * @private
         */
        NumPadDirective.prototype.defaultConfig;
        /**
         * @type {?}
         * @private
         */
        NumPadDirective.prototype.element;
        /**
         * @type {?}
         * @private
         */
        NumPadDirective.prototype.ngControl;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/directives/numpad/numpad.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var LsnNumpadModule = /** @class */ (function () {
        function LsnNumpadModule() {
        }
        LsnNumpadModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            NumPadDirective,
                        ],
                        imports: [],
                        exports: [
                            NumPadDirective,
                        ]
                    },] }
        ];
        return LsnNumpadModule;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/directives/latin-to-greek/latin-to-greek.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
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
        /**
         * @private
         * @return {?}
         */
        LatinToGreekDirective.prototype.getCaret = /**
         * @private
         * @return {?}
         */
        function () {
            return {
                start: this.el.nativeElement.selectionStart,
                end: this.el.nativeElement.selectionEnd,
            };
        };
        /**
         * @private
         * @param {?} start
         * @param {?} end
         * @return {?}
         */
        LatinToGreekDirective.prototype.setCaret = /**
         * @private
         * @param {?} start
         * @param {?} end
         * @return {?}
         */
        function (start, end) {
            this.el.nativeElement.selectionStart = start;
            this.el.nativeElement.selectionEnd = end;
            this.el.nativeElement.focus();
        };
        /**
         * @param {?} $event
         * @return {?}
         */
        LatinToGreekDirective.prototype.onInputChange = /**
         * @param {?} $event
         * @return {?}
         */
        function ($event) {
            var _a = this.getCaret(), start = _a.start, end = _a.end;
            /** @type {?} */
            var translated = $event.toLocaleUpperCase();
            this.latinToGreek.forEach((/**
             * @param {?} replace
             * @return {?}
             */
            function (replace) {
                translated = translated.replace(replace[0], replace[1]);
            }));
            this.model.valueAccessor.writeValue(translated);
            this.setCaret(start, end);
        };
        LatinToGreekDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[ngModel][lsnLatinToGreek]',
                        providers: [forms.NgModel]
                    },] }
        ];
        /** @nocollapse */
        LatinToGreekDirective.ctorParameters = function () { return [
            { type: forms.NgModel },
            { type: core.ElementRef }
        ]; };
        LatinToGreekDirective.propDecorators = {
            onInputChange: [{ type: core.HostListener, args: ['ngModelChange', ['$event'],] }]
        };
        return LatinToGreekDirective;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        LatinToGreekDirective.prototype.latinToGreek;
        /**
         * @type {?}
         * @private
         */
        LatinToGreekDirective.prototype.model;
        /**
         * @type {?}
         * @private
         */
        LatinToGreekDirective.prototype.el;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/directives/latin-to-greek/latin-to-greek.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var LsnLatinToGreekModule = /** @class */ (function () {
        function LsnLatinToGreekModule() {
        }
        LsnLatinToGreekModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            LatinToGreekDirective,
                        ],
                        imports: [],
                        exports: [
                            LatinToGreekDirective,
                        ]
                    },] }
        ];
        return LsnLatinToGreekModule;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/directives/capitalize/capitalize.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CapitalizeDirective = /** @class */ (function () {
        function CapitalizeDirective(model) {
            this.model = model;
        }
        /**
         * @param {?} $event
         * @return {?}
         */
        CapitalizeDirective.prototype.onInputChange = /**
         * @param {?} $event
         * @return {?}
         */
        function ($event) {
            this.model.valueAccessor.writeValue($event.toLocaleUpperCase());
        };
        CapitalizeDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[ngModel][lsnCapitalize]',
                        providers: [forms.NgModel]
                    },] }
        ];
        /** @nocollapse */
        CapitalizeDirective.ctorParameters = function () { return [
            { type: forms.NgModel }
        ]; };
        CapitalizeDirective.propDecorators = {
            onInputChange: [{ type: core.HostListener, args: ['ngModelChange', ['$event'],] }]
        };
        return CapitalizeDirective;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        CapitalizeDirective.prototype.model;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/directives/capitalize/capitalize.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var LsnCapitalizeModule = /** @class */ (function () {
        function LsnCapitalizeModule() {
        }
        LsnCapitalizeModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            CapitalizeDirective,
                        ],
                        imports: [],
                        exports: [
                            CapitalizeDirective,
                        ]
                    },] }
        ];
        return LsnCapitalizeModule;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/directives/scroll-spy/scroll-spy.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ScrollSpyDirective = /** @class */ (function () {
        function ScrollSpyDirective(elementRef) {
            this.elementRef = elementRef;
            this.spySectionChange = new core.EventEmitter();
            this.disableEmitter = false;
            this.subscriptions = [];
            this.currentSection$ = new rxjs.Subject();
        }
        /**
         * @return {?}
         */
        ScrollSpyDirective.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.scrollOffset = this.nativeElement().offsetTop;
            // emit event on section change
            /** @type {?} */
            var sectionChangeSub = this.currentSection$.pipe(operators.distinctUntilChanged(), operators.tap((/**
             * @param {?} sectionId
             * @return {?}
             */
            function (sectionId) { return _this.spySectionChange.emit(sectionId); }))).subscribe();
            // scroll to given section
            /** @type {?} */
            var scrollToSub = this.scrollToSection.pipe(operators.filter((/**
             * @param {?} section
             * @return {?}
             */
            function (section) { return !!section; })), operators.tap((/**
             * @param {?} section
             * @return {?}
             */
            function (section) { return _this.scrollTo(section); }))).subscribe();
            this.subscriptions.push(sectionChangeSub, scrollToSub);
        };
        /**
         * @return {?}
         */
        ScrollSpyDirective.prototype.onScroll = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var section = this.findCurrentSection();
            if (section) {
                this.setCurrentSection(section.id);
            }
        };
        /**
         * @return {?}
         */
        ScrollSpyDirective.prototype.onResize = /**
         * @return {?}
         */
        function () {
            this.onScroll();
        };
        /**
         * @private
         * @param {?} sectionId
         * @return {?}
         */
        ScrollSpyDirective.prototype.scrollTo = /**
         * @private
         * @param {?} sectionId
         * @return {?}
         */
        function (sectionId) {
            var _this = this;
            this.disableEmitter = true;
            this.nativeElement().querySelector('#' + sectionId).scrollIntoView();
            // set timeout to enforce scroll event execute before enabling back the emitter
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.disableEmitter = false;
            }), 0);
        };
        /**
         * @private
         * @return {?}
         */
        ScrollSpyDirective.prototype.findCurrentSection = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var scrollMiddle = (this.scrollTopPosition() + this.scrollBottomPosition()) / 2;
            /** @type {?} */
            var spiedSections = this.getSpiedSections();
            return spiedSections.find((/**
             * @param {?} section
             * @return {?}
             */
            function (section) { return _this.isCurrentSection(section, scrollMiddle); }));
        };
        /**
         * @private
         * @return {?}
         */
        ScrollSpyDirective.prototype.getSpiedSections = /**
         * @private
         * @return {?}
         */
        function () {
            return Array.from(this.nativeElement().querySelectorAll(this.spySelector));
        };
        /**
         * @private
         * @param {?} section
         * @param {?} scrollMiddle
         * @return {?}
         */
        ScrollSpyDirective.prototype.isCurrentSection = /**
         * @private
         * @param {?} section
         * @param {?} scrollMiddle
         * @return {?}
         */
        function (section, scrollMiddle) {
            return this.sectionTopPosition(section) <= scrollMiddle
                && this.sectionBottomPosition(section) > scrollMiddle;
        };
        /**
         * @private
         * @param {?} sectionId
         * @return {?}
         */
        ScrollSpyDirective.prototype.setCurrentSection = /**
         * @private
         * @param {?} sectionId
         * @return {?}
         */
        function (sectionId) {
            if (!this.disableEmitter) {
                this.currentSection$.next(sectionId);
            }
        };
        /**
         * @private
         * @param {?} section
         * @return {?}
         */
        ScrollSpyDirective.prototype.sectionTopPosition = /**
         * @private
         * @param {?} section
         * @return {?}
         */
        function (section) {
            return section.offsetTop;
        };
        /**
         * @private
         * @param {?} section
         * @return {?}
         */
        ScrollSpyDirective.prototype.sectionBottomPosition = /**
         * @private
         * @param {?} section
         * @return {?}
         */
        function (section) {
            return section.offsetTop + section.offsetHeight;
        };
        /**
         * @private
         * @return {?}
         */
        ScrollSpyDirective.prototype.scrollTopPosition = /**
         * @private
         * @return {?}
         */
        function () {
            return this.scrollOffset + this.nativeElement().scrollTop;
        };
        /**
         * @private
         * @return {?}
         */
        ScrollSpyDirective.prototype.scrollBottomPosition = /**
         * @private
         * @return {?}
         */
        function () {
            return this.scrollOffset + this.nativeElement().scrollTop + this.nativeElement().offsetHeight;
        };
        /**
         * @private
         * @return {?}
         */
        ScrollSpyDirective.prototype.nativeElement = /**
         * @private
         * @return {?}
         */
        function () {
            return this.elementRef.nativeElement;
        };
        /**
         * @return {?}
         */
        ScrollSpyDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.subscriptions.forEach((/**
             * @param {?} sub
             * @return {?}
             */
            function (sub) { return sub.unsubscribe(); }));
        };
        ScrollSpyDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[lsnScrollSpy]'
                    },] }
        ];
        /** @nocollapse */
        ScrollSpyDirective.ctorParameters = function () { return [
            { type: core.ElementRef }
        ]; };
        ScrollSpyDirective.propDecorators = {
            spySelector: [{ type: core.Input }],
            scrollToSection: [{ type: core.Input }],
            spySectionChange: [{ type: core.Output }],
            onScroll: [{ type: core.HostListener, args: ['scroll',] }],
            onResize: [{ type: core.HostListener, args: ['window:resize',] }]
        };
        return ScrollSpyDirective;
    }());
    if (false) {
        /** @type {?} */
        ScrollSpyDirective.prototype.spySelector;
        /** @type {?} */
        ScrollSpyDirective.prototype.scrollToSection;
        /** @type {?} */
        ScrollSpyDirective.prototype.spySectionChange;
        /**
         * @type {?}
         * @private
         */
        ScrollSpyDirective.prototype.scrollOffset;
        /**
         * @type {?}
         * @private
         */
        ScrollSpyDirective.prototype.currentSection$;
        /**
         * @type {?}
         * @private
         */
        ScrollSpyDirective.prototype.disableEmitter;
        /** @type {?} */
        ScrollSpyDirective.prototype.subscriptions;
        /**
         * @type {?}
         * @private
         */
        ScrollSpyDirective.prototype.elementRef;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/directives/scroll-spy/scroll-spy.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var LsnScrollSpyModule = /** @class */ (function () {
        function LsnScrollSpyModule() {
        }
        LsnScrollSpyModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            ScrollSpyDirective,
                        ],
                        imports: [],
                        exports: [
                            ScrollSpyDirective,
                        ]
                    },] }
        ];
        return LsnScrollSpyModule;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/services/lsn-cookie/lsn-cookie.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var LsnCookieModule = /** @class */ (function () {
        function LsnCookieModule() {
        }
        LsnCookieModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [],
                        imports: [
                            common.CommonModule
                        ]
                    },] }
        ];
        return LsnCookieModule;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/services/lsn-cross-tab/lsn-cross-tab.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} lsnCrossTabService
     * @return {?}
     */
    function lsnCrossTabServiceFactory(lsnCrossTabService) {
        return (/**
         * @return {?}
         */
        function () { return lsnCrossTabService.run(); });
    }
    var LsnCrossTabModule = /** @class */ (function () {
        function LsnCrossTabModule() {
        }
        LsnCrossTabModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            LsnCookieModule
                        ],
                        exports: [
                            LsnCookieModule
                        ]
                    },] }
        ];
        return LsnCrossTabModule;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/lsn-libs.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var LsnLibsModule = /** @class */ (function () {
        function LsnLibsModule() {
        }
        LsnLibsModule.decorators = [
            { type: core.NgModule, args: [{
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
        return LsnLibsModule;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/directives/capitalize/public_api.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/directives/latin-to-greek/public_api.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/directives/numeric/public_api.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/directives/numpad/public_api.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/directives/scroll-spy/public_api.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/services/lsn-cross-tab/models/lsnCrossTabConfig.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
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
    if (false) {
        /** @type {?} */
        LsnCrossTabConfig.prototype.cookieCleanFreq;
        /** @type {?} */
        LsnCrossTabConfig.prototype.cookieReadFreq;
        /** @type {?} */
        LsnCrossTabConfig.prototype.msgTtl;
        /** @type {?} */
        LsnCrossTabConfig.prototype.rootDomain;
        /** @type {?} */
        LsnCrossTabConfig.prototype.crossTabCookieName;
    }
    /** @type {?} */
    var LSN_CROSS_TAB_CONFIG = new core.InjectionToken('LsnCrossTabConfig');

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/services/lsn-cross-tab/models/lsnCrossTabMessage.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @template T
     */
    var   /**
     * @template T
     */
    LsnCrossTabMessage = /** @class */ (function () {
        function LsnCrossTabMessage(_a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.created, created = _c === void 0 ? null : _c, _d = _b.code, code = _d === void 0 ? null : _d, _e = _b.tabId, tabId = _e === void 0 ? null : _e, _f = _b.attrs, attrs = _f === void 0 ? null : _f;
            this.created = created;
            this.code = code;
            this.tabId = tabId;
            this.attrs = attrs;
        }
        /**
         * @param {?} firstMessage
         * @param {?} secondMessage
         * @return {?}
         */
        LsnCrossTabMessage.compare = /**
         * @param {?} firstMessage
         * @param {?} secondMessage
         * @return {?}
         */
        function (firstMessage, secondMessage) {
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
    if (false) {
        /** @type {?} */
        LsnCrossTabMessage.prototype.created;
        /** @type {?} */
        LsnCrossTabMessage.prototype.code;
        /** @type {?} */
        LsnCrossTabMessage.prototype.tabId;
        /** @type {?} */
        LsnCrossTabMessage.prototype.attrs;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/services/lsn-cookie/lsnCookieConfig.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var LsnCookieConfig = /** @class */ (function () {
        function LsnCookieConfig(_a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.secureCookies, secureCookies = _c === void 0 ? null : _c, _d = _b.domainCookies, domainCookies = _d === void 0 ? null : _d;
            this.secureCookies = secureCookies;
            this.domainCookies = domainCookies;
        }
        return LsnCookieConfig;
    }());
    if (false) {
        /** @type {?} */
        LsnCookieConfig.prototype.secureCookies;
        /** @type {?} */
        LsnCookieConfig.prototype.domainCookies;
    }
    /** @type {?} */
    var LSN_COOKIE_CONFIG = new core.InjectionToken('LsnCookieConfig');

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/services/lsn-cookie/lsn-cookie.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function LsnCookieOptions() { }
    if (false) {
        /** @type {?|undefined} */
        LsnCookieOptions.prototype.expires;
        /** @type {?|undefined} */
        LsnCookieOptions.prototype.expirationUnit;
        /** @type {?|undefined} */
        LsnCookieOptions.prototype.path;
        /** @type {?|undefined} */
        LsnCookieOptions.prototype.domain;
        /** @type {?|undefined} */
        LsnCookieOptions.prototype.secure;
    }
    /**
     * @record
     */
    function CookieService() { }
    if (false) {
        /**
         * @param {?} cookieKey
         * @param {?} cookieValue
         * @param {?} cookieOptions
         * @return {?}
         */
        CookieService.prototype.set = function (cookieKey, cookieValue, cookieOptions) { };
        /**
         * @param {?=} cookieKey
         * @return {?}
         */
        CookieService.prototype.get = function (cookieKey) { };
        /**
         * @param {?} cookieKey
         * @param {?} cookieOptions
         * @return {?}
         */
        CookieService.prototype.remove = function (cookieKey, cookieOptions) { };
    }
    var LsnCookieService = /** @class */ (function () {
        function LsnCookieService(cookieConfig, document) {
            this.cookieConfig = cookieConfig;
            this.document = document;
        }
        /**
         * Sets cookie with given key to given value, cookie options are optional, if not set, some properties
         * (secure and domain) will be set from global cookie config
         */
        /**
         * Sets cookie with given key to given value, cookie options are optional, if not set, some properties
         * (secure and domain) will be set from global cookie config
         * @param {?} cookieKey
         * @param {?} cookieValue
         * @param {?=} cookieOptions
         * @return {?}
         */
        LsnCookieService.prototype.set = /**
         * Sets cookie with given key to given value, cookie options are optional, if not set, some properties
         * (secure and domain) will be set from global cookie config
         * @param {?} cookieKey
         * @param {?} cookieValue
         * @param {?=} cookieOptions
         * @return {?}
         */
        function (cookieKey, cookieValue, cookieOptions) {
            /** @type {?} */
            var options = __assign(__assign({}, cookieOptions), { secure: cookieOptions && cookieOptions.secure ? cookieOptions.secure : this.cookieConfig.secureCookies });
            if (!this.cookieConfig.domainCookies) {
                options.domain = false;
            }
            /** @type {?} */
            var value = JSON.stringify(cookieValue);
            /** @type {?} */
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
        /**
         * Key provided - returns value of given cookie or undefined if non existent
         * Key not provided - returns all cookies as Object or undefined if there are no cookies
         * Cookie values are JSON.parsed, if error occurs during parsing, string value is assigned
         * @param {?=} cookieKey
         * @return {?}
         */
        LsnCookieService.prototype.get = /**
         * Key provided - returns value of given cookie or undefined if non existent
         * Key not provided - returns all cookies as Object or undefined if there are no cookies
         * Cookie values are JSON.parsed, if error occurs during parsing, string value is assigned
         * @param {?=} cookieKey
         * @return {?}
         */
        function (cookieKey) {
            /** @type {?} */
            var cookieStringList = this.document.cookie ? this.document.cookie.split('; ') : [];
            /** @type {?} */
            var cookieObject = cookieStringList
                .map((/**
             * @param {?} cookieString
             * @return {?}
             */
            function (cookieString) {
                /** @type {?} */
                var pos = cookieString.indexOf('=');
                return {
                    name: cookieString.substr(0, pos),
                    value: decodeURIComponent(cookieString.substr(pos + 1))
                };
            })).filter((/**
             * @param {?} cookie
             * @return {?}
             */
            function (cookie) {
                return typeof cookie.value !== 'undefined' && (cookieKey === undefined || cookieKey === cookie.name);
            })).reduce((/**
             * @param {?} previousValue
             * @param {?} currentValue
             * @return {?}
             */
            function (previousValue, currentValue) {
                /** @type {?} */
                var value = null;
                try {
                    value = JSON.parse(currentValue.value);
                }
                catch (e) {
                    value = currentValue.value;
                }
                previousValue[currentValue.name] = value;
                return previousValue;
            }), {});
            return cookieKey ? cookieObject[cookieKey] : Object.keys(cookieObject).length > 0 ? cookieObject : undefined;
        };
        /**
         * @param {?} cookieKey
         * @param {?=} cookieOptions
         * @return {?}
         */
        LsnCookieService.prototype.remove = /**
         * @param {?} cookieKey
         * @param {?=} cookieOptions
         * @return {?}
         */
        function (cookieKey, cookieOptions) {
            if (cookieOptions === void 0) { cookieOptions = {}; }
            /** @type {?} */
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
        LsnCookieService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        LsnCookieService.ctorParameters = function () { return [
            { type: LsnCookieConfig, decorators: [{ type: core.Inject, args: [LSN_COOKIE_CONFIG,] }] },
            { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] }
        ]; };
        /** @nocollapse */ LsnCookieService.ɵprov = core.ɵɵdefineInjectable({ factory: function LsnCookieService_Factory() { return new LsnCookieService(core.ɵɵinject(LSN_COOKIE_CONFIG), core.ɵɵinject(common.DOCUMENT)); }, token: LsnCookieService, providedIn: "root" });
        return LsnCookieService;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        LsnCookieService.prototype.cookieConfig;
        /** @type {?} */
        LsnCookieService.prototype.document;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/services/lsn-cross-tab/lsn-cross-tab.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var LsnCrossTabService = /** @class */ (function () {
        function LsnCrossTabService(lsnCookieService, crossTabConfig) {
            var _this = this;
            this.lsnCookieService = lsnCookieService;
            /**
             * Checks if message with given id was already read
             */
            this.messageWasRead = (/**
             * @param {?} msg
             * @return {?}
             */
            function (msg) { return _this.messagesReadSet.has(_this.getMessageId(msg)); });
            this.getMessageId = (/**
             * @param {?} message
             * @return {?}
             */
            function (message) { return message.tabId + message.created + message.code; });
            this.messageToPlainObject = (/**
             * @param {?} msg
             * @return {?}
             */
            function (msg) { return Object.keys(msg)
                .reduce((/**
             * @param {?} minifiedObj
             * @param {?} key
             * @return {?}
             */
            function (minifiedObj, key) {
                /** @type {?} */
                var value = msg[key];
                if (!(key === 'attrs' && (value === null || value === {}))) {
                    minifiedObj[key] = value;
                    return minifiedObj;
                }
                else {
                    return minifiedObj;
                } // tslint:disable
            }), {}); }); // tslint:enable
            this.getCookie = (/**
             * @return {?}
             */
            function () { return _this.cookie; });
            this.crossTabConfig = crossTabConfig || new LsnCrossTabConfig();
            this.messageSubject = new rxjs.Subject();
            this.tabId = Math.random() + '';
            this.messagesReadSet = new Set();
            this.tabOpenTime = Date.now();
        }
        Object.defineProperty(LsnCrossTabService.prototype, "crossTabCookieName", {
            get: /**
             * @private
             * @return {?}
             */
            function () {
                return this.crossTabConfig.crossTabCookieName;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * This function sets up subscriptions for reading and cleaning cross tab cookie
         */
        /**
         * This function sets up subscriptions for reading and cleaning cross tab cookie
         * @return {?}
         */
        LsnCrossTabService.prototype.run = /**
         * This function sets up subscriptions for reading and cleaning cross tab cookie
         * @return {?}
         */
        function () {
            var _this = this;
            if (!this.cookieReadSubscription) {
                this.cookieReadSubscription = rxjs.interval(this.crossTabConfig.cookieReadFreq)
                    .subscribe((/**
                 * @return {?}
                 */
                function () { return _this.readMessages(); }));
            }
            if (!this.cookieCleanSubscription) {
                this.cookieCleanSubscription = rxjs.interval(this.crossTabConfig.cookieCleanFreq)
                    .subscribe((/**
                 * @return {?}
                 */
                function () { return _this.cleanCookie(); }));
            }
        };
        Object.defineProperty(LsnCrossTabService.prototype, "messages$", {
            /**
             * This Observable emits messages that were sent by other tabs
             */
            get: /**
             * This Observable emits messages that were sent by other tabs
             * @return {?}
             */
            function () {
                return this.messageSubject;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Manually set cross tab config, for example when config must be provided asynchronously and not with InjectionToken
         */
        /**
         * Manually set cross tab config, for example when config must be provided asynchronously and not with InjectionToken
         * @param {?} config
         * @return {?}
         */
        LsnCrossTabService.prototype.setCrossTabConfig = /**
         * Manually set cross tab config, for example when config must be provided asynchronously and not with InjectionToken
         * @param {?} config
         * @return {?}
         */
        function (config) {
            this.crossTabConfig = config;
        };
        /**
         * Sends message to other tabs by adding this message to cross tab cookie
         */
        /**
         * Sends message to other tabs by adding this message to cross tab cookie
         * @param {?} data
         * @return {?}
         */
        LsnCrossTabService.prototype.sendMessage = /**
         * Sends message to other tabs by adding this message to cross tab cookie
         * @param {?} data
         * @return {?}
         */
        function (data) {
            /** @type {?} */
            var message;
            if (typeof data === 'string') {
                message = new LsnCrossTabMessage({ code: data });
            }
            else if (data instanceof LsnCrossTabMessage) {
                message = data;
            }
            else if (!!data && typeof data === 'object' && !Array.isArray(data)) {
                message = new LsnCrossTabMessage(__assign({}, data));
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
        // tslint:enable
        /**
         * Appends given message to cross tab cookie value
         * @private
         * @param {?} msg
         * @return {?}
         */
        LsnCrossTabService.prototype.updateCookie = 
        // tslint:enable
        /**
         * Appends given message to cross tab cookie value
         * @private
         * @param {?} msg
         * @return {?}
         */
        function (msg) {
            /** @type {?} */
            var cookieData = this.cookie;
            cookieData.push(msg);
            this.cookie = cookieData;
        };
        Object.defineProperty(LsnCrossTabService.prototype, "cookie", {
            get: /**
             * @private
             * @return {?}
             */
            function () {
                return this.lsnCookieService.get(this.crossTabConfig.crossTabCookieName) || [];
            },
            set: /**
             * @private
             * @param {?} cookieData
             * @return {?}
             */
            function (cookieData) {
                this.lsnCookieService.set(this.crossTabCookieName, cookieData, {
                    domain: this.crossTabConfig.rootDomain,
                    path: '/'
                });
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Removes messages from cross tab cookie that are older than supplied config.msgTtl time
         */
        /**
         * Removes messages from cross tab cookie that are older than supplied config.msgTtl time
         * @private
         * @return {?}
         */
        LsnCrossTabService.prototype.cleanCookie = /**
         * Removes messages from cross tab cookie that are older than supplied config.msgTtl time
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var currentCookie = this.cookie;
            if (currentCookie === null) {
                return;
            }
            /** @type {?} */
            var timestamp = new Date().getTime();
            /** @type {?} */
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
        /**
         * Callback invoked after every cookie read interval
         * @private
         * @return {?}
         */
        LsnCrossTabService.prototype.readMessages = /**
         * Callback invoked after every cookie read interval
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.cookie) {
                this.cookie.forEach((/**
                 * @param {?} msgData
                 * @return {?}
                 */
                function (msgData) {
                    if (msgData.created > _this.tabOpenTime) {
                        /** @type {?} */
                        var msgCopy = __assign({}, msgData);
                        if (!_this.messageWasRead(msgCopy)) {
                            _this.messagesReadSet.add(_this.getMessageId(msgCopy));
                            _this.messageSubject.next(msgCopy);
                        }
                    }
                }));
            }
        };
        /**
         * Removes all subscriptions that this service is subscribe to (intervals are cleared)
         */
        /**
         * Removes all subscriptions that this service is subscribe to (intervals are cleared)
         * @return {?}
         */
        LsnCrossTabService.prototype.unsubscribe = /**
         * Removes all subscriptions that this service is subscribe to (intervals are cleared)
         * @return {?}
         */
        function () {
            this.cookieReadSubscription.unsubscribe();
            this.cookieCleanSubscription.unsubscribe();
        };
        /**
         * @return {?}
         */
        LsnCrossTabService.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.unsubscribe();
        };
        /**
         * Sorts two cookie arrays and compares each element
         */
        /**
         * Sorts two cookie arrays and compares each element
         * @private
         * @param {?} firstCookie
         * @param {?} secondCookie
         * @return {?}
         */
        LsnCrossTabService.prototype.areCookiesEqual = /**
         * Sorts two cookie arrays and compares each element
         * @private
         * @param {?} firstCookie
         * @param {?} secondCookie
         * @return {?}
         */
        function (firstCookie, secondCookie) {
            var e_1, _a;
            if (firstCookie.length !== secondCookie.length) {
                return false;
            }
            else if (firstCookie.length === 0 && secondCookie.length === 0) {
                return true;
            }
            firstCookie.sort(this.messageComparer);
            secondCookie.sort(this.messageComparer);
            /** @type {?} */
            var index = 0;
            /** @type {?} */
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
        /**
         * Compares two messages by properties in order: 'created', 'code', 'tabId';
         * @private
         * @param {?} firstCookieValue
         * @param {?} secondCookieValue
         * @return {?}
         */
        LsnCrossTabService.prototype.messageComparer = /**
         * Compares two messages by properties in order: 'created', 'code', 'tabId';
         * @private
         * @param {?} firstCookieValue
         * @param {?} secondCookieValue
         * @return {?}
         */
        function (firstCookieValue, secondCookieValue) {
            /** @type {?} */
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
        /**
         * Function determines whether given message is to be removed from the cross tab cookie
         * @private
         * @param {?} timestamp
         * @param {?} msgTtl
         * @return {?}
         */
        LsnCrossTabService.prototype.cleanCookieFilter = /**
         * Function determines whether given message is to be removed from the cross tab cookie
         * @private
         * @param {?} timestamp
         * @param {?} msgTtl
         * @return {?}
         */
        function (timestamp, msgTtl) {
            return (/**
             * @param {?} cookieMessage
             * @return {?}
             */
            function (cookieMessage) { return timestamp - cookieMessage.created <= msgTtl; });
        };
        LsnCrossTabService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        LsnCrossTabService.ctorParameters = function () { return [
            { type: LsnCookieService },
            { type: LsnCrossTabConfig, decorators: [{ type: core.Optional }, { type: core.Inject, args: [LSN_CROSS_TAB_CONFIG,] }] }
        ]; };
        /** @nocollapse */ LsnCrossTabService.ɵprov = core.ɵɵdefineInjectable({ factory: function LsnCrossTabService_Factory() { return new LsnCrossTabService(core.ɵɵinject(LsnCookieService), core.ɵɵinject(LSN_CROSS_TAB_CONFIG, 8)); }, token: LsnCrossTabService, providedIn: "root" });
        return LsnCrossTabService;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        LsnCrossTabService.prototype.messageSubject;
        /** @type {?} */
        LsnCrossTabService.prototype.tabId;
        /**
         * @type {?}
         * @private
         */
        LsnCrossTabService.prototype.messagesReadSet;
        /**
         * @type {?}
         * @private
         */
        LsnCrossTabService.prototype.tabOpenTime;
        /**
         * @type {?}
         * @private
         */
        LsnCrossTabService.prototype.cookieReadSubscription;
        /**
         * @type {?}
         * @private
         */
        LsnCrossTabService.prototype.cookieCleanSubscription;
        /**
         * @type {?}
         * @private
         */
        LsnCrossTabService.prototype.crossTabConfig;
        /**
         * Checks if message with given id was already read
         * @type {?}
         * @private
         */
        LsnCrossTabService.prototype.messageWasRead;
        /**
         * @type {?}
         * @private
         */
        LsnCrossTabService.prototype.getMessageId;
        /**
         * @type {?}
         * @private
         */
        LsnCrossTabService.prototype.messageToPlainObject;
        /** @type {?} */
        LsnCrossTabService.prototype.getCookie;
        /**
         * @type {?}
         * @private
         */
        LsnCrossTabService.prototype.lsnCookieService;
    }

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
    exports.NumericMessage = NumericMessage;
    exports.ScrollSpyDirective = ScrollSpyDirective;
    exports.lsnCrossTabServiceFactory = lsnCrossTabServiceFactory;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=lsnova-angularmodules.umd.js.map
