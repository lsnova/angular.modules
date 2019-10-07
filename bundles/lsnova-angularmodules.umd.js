(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/cdk/keycodes'), require('@angular/common'), require('@angular/material'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@lsnova/angularmodules', ['exports', '@angular/core', '@angular/forms', '@angular/cdk/keycodes', '@angular/common', '@angular/material', 'rxjs', 'rxjs/operators'], factory) :
    (global = global || self, factory((global.lsnova = global.lsnova || {}, global.lsnova.angularmodules = {}), global.ng.core, global.ng.forms, global.ng.cdk.keycodes, global.ng.common, global.ng.material, global.rxjs, global.rxjs.operators));
}(this, function (exports, core, forms, keycodes, common, material, rxjs, operators) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

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

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {string} */
    var NumericSeparator = {
        COMMA: ',',
        PERIOD: '.',
        SPACE: ' ',
    };
    var DefaultNumericConfig = /** @class */ (function () {
        function DefaultNumericConfig(props) {
            if (props === void 0) { props = {}; }
            this.precision = 0;
            this.decimals = NumericSeparator.PERIOD;
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
            return __assign({}, this.getDefaultConfig(), this.config.custom[key]) || this.getDefaultConfig();
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var CUSTOM_SELECT_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return NumericDirective; }),
        multi: true
    };
    var NumericDirective = /** @class */ (function () {
        function NumericDirective(el, configService) {
            this.el = el;
            this.configService = configService;
            this.lsnNumeric = {};
            this.onChange = function (_) { };
            this.onTouch = function () { };
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
            /** @type {?} */
            var rangeValue = this.handleRange(parsedValue);
            if (parsedValue === rangeValue) {
                this.displayValue = value.replace(/[,|.]/, this.config.decimals);
                this.onChange(parsedValue);
            }
            else {
                this.displayValue = rangeValue.toString().replace(/[,|.]/, this.config.decimals);
                this.onChange(rangeValue);
            }
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
            this.displayValue = this.prepareDisplayValue(this.element.nativeElement.value);
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
                    parsedValue = this.handleRange(parsedValue);
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
            this.config = Object.assign(__assign({}, defaultConfig, this.lsnNumeric));
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
            return allowDecimalsOnly
                ? value.replace(/[^0-9]/g, '')
                : value.replace(/[^\-0-9,.]/g, '');
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
        NumericDirective.prototype.prepareDisplayValue = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!value && value !== 0) {
                return '';
            }
            var _a = __read(typeof value === 'number'
                ? value.toString().split('.')
                : value.toString().split(this.config.decimals), 2), whole = _a[0], decimals = _a[1];
            /** @type {?} */
            var isNegative = whole[0] === '-';
            /** @type {?} */
            var result = whole === '-' || !whole
                ? '0'
                : Math.abs(parseInt(whole, 10)).toString();
            if (this.config.thousands) {
                result = result.replace(/\B(?=(\d{3})+(?!\d))/g, this.config.thousands);
            }
            if (decimals && this.config.precision && this.config.decimals) {
                result = result + this.config.decimals + decimals;
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
                || (this.element.nativeElement.selectionStart === 0 && currentValue.indexOf('-') > -1)) {
                e.preventDefault();
            }
        };
        NumericDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[lsnNumeric][ngModel]',
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
            inputHandler: [{ type: core.HostListener, args: ['input', ['$event'],] }],
            focusHandler: [{ type: core.HostListener, args: ['focus', ['$event'],] }],
            blurHandler: [{ type: core.HostListener, args: ['blur', ['$event'],] }],
            keyDownHandler: [{ type: core.HostListener, args: ['keydown', ['$event'],] }]
        };
        return NumericDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
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
        /**
         * @return {?}
         */
        NumPadDirective.prototype.ngOnChanges = /**
         * @return {?}
         */
        function () {
            this.config = Object.assign(__assign({}, this.defaultConfig, this.lsnNumPad));
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            this.latinToGreek.forEach(function (replace) {
                translated = translated.replace(replace[0], replace[1]);
            });
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /* tslint:disable:no-use-before-declare */
    /** @type {?} */
    var CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return MatSelectComponent; }),
        multi: true
    };
    /* tslint:enable:no-use-before-declare */
    /** @type {?} */
    var noop = function () {
    };
    /** @type {?} */
    var SELECT_SEARCHABLE_MIN_LIMIT = 8;
    var MatSelectComponent = /** @class */ (function () {
        function MatSelectComponent() {
            this.control = new forms.FormControl();
            this.options = [];
            this.clear = true;
            this.disabled = false;
            this.multiple = false;
            this.errors = [];
            this.destroy$ = new rxjs.Subject();
            this.panelClosed$ = new rxjs.Subject();
            this.optionChanges$ = new rxjs.Subject();
            this.selectedOptions = [];
            this.searchTerm = '';
            this._onTouched = noop;
        }
        /**
         * @return {?}
         */
        MatSelectComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.resetOptions();
        };
        /**
         * @return {?}
         */
        MatSelectComponent.prototype.ngOnChanges = /**
         * @return {?}
         */
        function () {
            this.handleDisabled();
            this.resetOptions();
            this.writeValue(this.control.value);
        };
        /**
         * @return {?}
         */
        MatSelectComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
        };
        /**
         * @return {?}
         */
        MatSelectComponent.prototype.onBlur = /**
         * @return {?}
         */
        function () {
            this._onTouched();
        };
        /**
         * @param {?} value
         * @return {?}
         */
        MatSelectComponent.prototype.writeValue = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!this.multiple) {
                this.setSingleValue(value);
            }
            else if (this.multiple && Array.isArray(value)) {
                this.setMultipleValue(value);
            }
        };
        /**
         * @param {?} value
         * @return {?}
         */
        MatSelectComponent.prototype.setSingleValue = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (Array.isArray(value)) {
                console.warn('[lsn-mat-select] Given value is an array. Should `multiple = true`?');
            }
            /** @type {?} */
            var correspondingOption = this.findOption(value);
            this.changeValue(correspondingOption);
        };
        /**
         * @param {?} values
         * @return {?}
         */
        MatSelectComponent.prototype.setMultipleValue = /**
         * @param {?} values
         * @return {?}
         */
        function (values) {
            var _this = this;
            this.selectedOptions = [];
            if (Array.isArray(values)) {
                values.forEach(function (item) {
                    /** @type {?} */
                    var correspondingOption = _this.findOption(item);
                    if (correspondingOption) {
                        _this.handleOptionSelection({
                            selected: true,
                            value: correspondingOption
                        });
                    }
                });
            }
            this.changeValue(this.selectedOptions);
        };
        /**
         * @param {?} value
         * @return {?}
         */
        MatSelectComponent.prototype.findOption = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            if (value || value === 0 || value === false) {
                /** @type {?} */
                var result = this.options.find(function (option) { return _this.bindValue
                    ? option[_this.bindValue] === value
                    : _this.bindBy
                        ? option[_this.bindBy] === value[_this.bindBy]
                        : option === value; });
                return result || value;
            }
            return undefined;
        };
        /**
         * @param {?} value
         * @return {?}
         */
        MatSelectComponent.prototype.changeValue = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            this.control.setValue(value);
            if (this._onChange) {
                if (!this.multiple) {
                    this._onChange(this.parseValue(value));
                }
                else {
                    /** @type {?} */
                    var result = Array.isArray(value) ? value.map(function (item) { return _this.parseValue(item); }) : value;
                    this._onChange(result);
                }
            }
        };
        /**
         * @param {?} value
         * @return {?}
         */
        MatSelectComponent.prototype.parseValue = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            return value !== undefined && value !== null && this.bindValue ? value[this.bindValue] : value;
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        MatSelectComponent.prototype.registerOnChange = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this._onChange = fn;
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        MatSelectComponent.prototype.registerOnTouched = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this._onTouched = fn;
        };
        /**
         * @return {?}
         */
        MatSelectComponent.prototype.bindOptionSelectionChanges = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.matSelect.optionSelectionChanges
                .pipe(operators.takeUntil(this.optionChanges$ || this.destroy$))
                .subscribe(function (res) {
                var isUserInput = res.isUserInput, source = res.source;
                if (isUserInput) {
                    /** @type {?} */
                    var result = _this.handleOptionSelection(source);
                    if (!_this.multiple) {
                        _this.setSingleValue(result);
                    }
                    else {
                        _this.setMultipleValue(_this.selectedOptions);
                    }
                }
            });
        };
        /**
         * @param {?} event
         * @return {?}
         */
        MatSelectComponent.prototype.handleOptionSelection = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            var _this = this;
            var value = event.value, selected = event.selected;
            if (!this.multiple) {
                return selected
                    ? this.parseValue(value)
                    : undefined;
            }
            else {
                if (selected) {
                    this.selectedOptions.push(value);
                }
                else {
                    this.selectedOptions = this.selectedOptions.filter(function (item) {
                        return _this.bindValue ? item[_this.bindValue] !== value[_this.bindValue] : item !== value;
                    });
                }
                /** @type {?} */
                var result = this.selectedOptions.map(function (item) { return _this.parseValue(item); });
                return Array.isArray(result) && result.length ? result : undefined;
            }
        };
        /**
         * @return {?}
         */
        MatSelectComponent.prototype.resetOptions = /**
         * @return {?}
         */
        function () {
            if (!Array.isArray(this.options)) {
                this.options = [];
            }
            this.searchTerm = '';
            this.filteredOptions = __spread(this.options);
            this.optionChanges$.next();
            this.bindOptionSelectionChanges();
        };
        /**
         * @param {?} $event
         * @return {?}
         */
        MatSelectComponent.prototype.clearValue = /**
         * @param {?} $event
         * @return {?}
         */
        function ($event) {
            $event.stopPropagation();
            this.selectedOptions = [];
            this.changeValue(undefined);
        };
        /**
         * @param {?} value
         * @return {?}
         */
        MatSelectComponent.prototype.filterOptions = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            if (value !== this.searchTerm) {
                this.searchTerm = value;
                this.filteredOptions =
                    this.options.filter(function (item) {
                        if (typeof item === 'string') {
                            return item.toLocaleUpperCase().indexOf(_this.searchTerm.toLocaleUpperCase()) !== -1;
                        }
                        /** @type {?} */
                        var optionValues = Object.values(item);
                        return optionValues.some(function (optionValue) {
                            return typeof optionValue === 'string'
                                && optionValue.toLocaleUpperCase().indexOf(_this.searchTerm.toLocaleUpperCase()) > -1;
                        });
                    });
                this.matSelect._keyManager.setFirstItemActive();
                this.optionChanges$.next();
                this.bindOptionSelectionChanges();
            }
        };
        Object.defineProperty(MatSelectComponent.prototype, "isSearchEnabled", {
            get: /**
             * @return {?}
             */
            function () {
                return Array.isArray(this.options) && this.options.length > SELECT_SEARCHABLE_MIN_LIMIT;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatSelectComponent.prototype, "isClearEnabled", {
            get: /**
             * @return {?}
             */
            function () {
                return this.clear && this.control.value && !this.disabled
                    && ((this.multiple && Array.isArray(this.control.value) && this.control.value.length)
                        || !this.multiple);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} event
         * @return {?}
         */
        MatSelectComponent.prototype.handleKeydown = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (this.isSearchEnabled && [keycodes.DOWN_ARROW, keycodes.END, keycodes.ENTER, keycodes.HOME, keycodes.UP_ARROW].indexOf(event.keyCode) === -1) {
                event.stopPropagation();
            }
        };
        /**
         * @return {?}
         */
        MatSelectComponent.prototype.handleDisabled = /**
         * @return {?}
         */
        function () {
            if (this.disabled) {
                this.control.disable();
                return;
            }
            this.control.enable();
        };
        /**
         * @return {?}
         */
        MatSelectComponent.prototype.scrollToActiveItem = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var activeItem = this.matSelect._keyManager.activeItem;
            if (!activeItem) {
                return;
            }
            /** @type {?} */
            var option = activeItem._element.nativeElement;
            /** @type {?} */
            var parent = option.parentNode;
            if (option.offsetTop + option.offsetHeight > parent.scrollTop + parent.offsetHeight) {
                parent.scrollTop = option.offsetTop - parent.offsetHeight + option.offsetHeight;
            }
            else if (option.offsetTop < parent.scrollTop) {
                parent.scrollTop = option.offsetTop;
            }
        };
        /**
         * @param {?} isOpen
         * @return {?}
         */
        MatSelectComponent.prototype.openedChange = /**
         * @param {?} isOpen
         * @return {?}
         */
        function (isOpen) {
            var _this = this;
            if (isOpen) {
                if (this.isSearchEnabled) {
                    this.searchInput.nativeElement.focus();
                }
                this.optionChanges$.next();
                this.bindOptionSelectionChanges();
                this.scrollToActiveItem();
                /** @type {?} */
                var keyManagerChange = this.matSelect._keyManager.change;
                keyManagerChange
                    .pipe(operators.takeUntil(this.panelClosed$))
                    .subscribe(function () {
                    _this.scrollToActiveItem();
                });
            }
            else {
                this.panelClosed$.next();
                this.resetOptions();
            }
        };
        Object.defineProperty(MatSelectComponent.prototype, "errorList", {
            get: /**
             * @return {?}
             */
            function () {
                var _this = this;
                if (Array.isArray(this.errors) && this.errors.length) {
                    return this.errors.map(function (item) {
                        return _this.errorLabel ? item[_this.errorLabel] : item;
                    });
                }
                if (this.control.errors) {
                    return Object.values(this.control.errors);
                }
            },
            enumerable: true,
            configurable: true
        });
        MatSelectComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'lsn-mat-select',
                        template: "<mat-form-field>\n  <mat-select\n    [formControl]=\"control\"\n    [placeholder]=\"placeholder\"\n    [errorStateMatcher]=\"errorStateMatcher\"\n    [multiple]=\"multiple\"\n    [disableOptionCentering]=\"true\"\n    panelClass=\"lsn-mat-select-panel\"\n    (blur)=\"onBlur()\"\n    (openedChange)=\"openedChange($event)\"\n  >\n    <input\n      #searchInput\n      *ngIf=\"isSearchEnabled\"\n      type=\"text\"\n      class=\"input-filter mat-select-search mat-input-element\"\n      autocomplete=\"off\"\n      [ngModel]=\"searchTerm\"\n      (ngModelChange)=\"filterOptions($event)\"\n      [placeholder]=\"placeholder\"\n      (keydown)=\"handleKeydown($event)\"\n    />\n    <div [ngClass]=\"{'lsn-mat-select__options': true, 'lsn-mat-select__options--searchable': isSearchEnabled}\">\n      <mat-option *ngIf=\"!options.length\"></mat-option>\n      <mat-option\n        *ngFor=\"let option of filteredOptions\"\n        [value]=\"option\"\n        [title]=\"bindLabel ? option[bindLabel] : option\"\n      >\n        <span *ngIf=\"!optionTemplate\">{{ bindLabel ? option[bindLabel] : option }}</span>\n        <span *ngIf=\"optionTemplate\">\n          <ng-container *ngTemplateOutlet=\"optionTemplate; context:{option: option}\"></ng-container>\n        </span>\n      </mat-option>\n    </div>\n  </mat-select>\n  <mat-icon class=\"mat-select-clear\" *ngIf=\"isClearEnabled\">\n    <button\n      class=\"mat-select-clear-btn\"\n      [matTooltip]=\"clearLabel\"\n      (click)=\"clearValue($event)\">\n      <i class=\"mat-select-clear-btn-icon\"></i>\n    </button>\n  </mat-icon>\n  <mat-error *ngFor=\"let error of errorList\">\n    {{ error }}\n  </mat-error>\n</mat-form-field>\n",
                        providers: [CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR],
                        encapsulation: core.ViewEncapsulation.None,
                        styles: ["lsn-mat-select .mat-select-placeholder{color:rgba(0,0,0,.6)}lsn-mat-select .mat-select-value{padding-right:1rem}lsn-mat-select .mat-select-clear{position:absolute;z-index:1;right:.6rem;bottom:.1rem}lsn-mat-select .mat-select-clear button.mat-select-clear-btn{color:#989898;opacity:.5;border:none;padding:.3rem .2rem;cursor:pointer;outline:0}lsn-mat-select .mat-select-clear button.mat-select-clear-btn:hover{opacity:1}lsn-mat-select .mat-select-clear button.mat-select-clear-btn .mat-select-clear-btn-icon{display:inline-block;width:12px;height:12px}lsn-mat-select .mat-select-clear button.mat-select-clear-btn .mat-select-clear-btn-icon::after,lsn-mat-select .mat-select-clear button.mat-select-clear-btn .mat-select-clear-btn-icon::before{position:absolute;left:.5rem;content:\" \";height:13px;width:1px;background-color:#333}lsn-mat-select .mat-select-clear button.mat-select-clear-btn .mat-select-clear-btn-icon::before{-webkit-transform:rotate(45deg);transform:rotate(45deg)}lsn-mat-select .mat-select-clear button.mat-select-clear-btn .mat-select-clear-btn-icon::after{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.lsn-mat-select-panel{min-height:36px}.lsn-mat-select-panel .mat-select-search{font-family:Roboto,\"Helvetica Neue\",sans-serif;box-sizing:border-box;position:relative;width:100%;padding:9px 16px;background-color:#fafafa;z-index:1}.lsn-mat-select-panel .lsn-mat-select__options{position:relative;overflow:auto;width:100%;max-height:100%}.lsn-mat-select-panel .lsn-mat-select__options--searchable{max-height:calc(100% - 35px)}.lsn-mat-select-panel mat-option .mat-pseudo-checkbox{border:1px solid #d4d7d9}.lsn-mat-select-panel mat-option .mat-pseudo-checkbox.mat-pseudo-checkbox-checked{border:1px solid #13418f}.lsn-mat-select-panel mat-option .mat-pseudo-checkbox.mat-pseudo-checkbox-checked::after{top:1px;left:1px;height:6px;width:12px;border:none;box-shadow:-1.5px 1.5px 0 0 currentColor}"]
                    }] }
        ];
        MatSelectComponent.propDecorators = {
            control: [{ type: core.Input }],
            options: [{ type: core.Input }],
            placeholder: [{ type: core.Input }],
            bindLabel: [{ type: core.Input }],
            bindBy: [{ type: core.Input }],
            bindValue: [{ type: core.Input }],
            clear: [{ type: core.Input }],
            clearLabel: [{ type: core.Input }],
            disabled: [{ type: core.Input }],
            multiple: [{ type: core.Input }],
            errorStateMatcher: [{ type: core.Input }],
            errors: [{ type: core.Input }],
            errorLabel: [{ type: core.Input }],
            optionTemplate: [{ type: core.ContentChild, args: [core.TemplateRef, { static: false },] }],
            matSelect: [{ type: core.ViewChild, args: [material.MatSelect, { static: true },] }],
            searchInput: [{ type: core.ViewChild, args: ['searchInput', { static: false },] }]
        };
        return MatSelectComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var LsnMatSelectModule = /** @class */ (function () {
        function LsnMatSelectModule() {
        }
        LsnMatSelectModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            MatSelectComponent,
                        ],
                        imports: [
                            common.CommonModule,
                            forms.FormsModule,
                            forms.ReactiveFormsModule,
                            material.MatIconModule,
                            material.MatInputModule,
                            material.MatSelectModule,
                            material.MatTooltipModule
                        ],
                        exports: [
                            MatSelectComponent,
                        ]
                    },] }
        ];
        return LsnMatSelectModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            var sectionChangeSub = this.currentSection$.pipe(operators.distinctUntilChanged(), operators.tap(function (sectionId) { return _this.spySectionChange.emit(sectionId); })).subscribe();
            // scroll to given section
            /** @type {?} */
            var scrollToSub = this.scrollToSection.pipe(operators.filter(function (section) { return !!section; }), operators.tap(function (section) { return _this.scrollTo(section); })).subscribe();
            this.subscriptions.push(sectionChangeSub, scrollToSub);
        };
        /**
         * @private
         * @return {?}
         */
        ScrollSpyDirective.prototype.onScroll = /**
         * @private
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
         * @private
         * @return {?}
         */
        ScrollSpyDirective.prototype.onResize = /**
         * @private
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
            setTimeout(function () {
                _this.disableEmitter = false;
            }, 0);
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
            return spiedSections.find(function (section) { return _this.isCurrentSection(section, scrollMiddle); });
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
            this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                            LsnMatSelectModule,
                            LsnScrollSpyModule
                        ],
                        exports: [
                            LsnCapitalizeModule,
                            LsnLatinToGreekModule,
                            LsnNumericModule,
                            LsnNumpadModule,
                            LsnMatSelectModule,
                            LsnScrollSpyModule
                        ]
                    },] }
        ];
        return LsnLibsModule;
    }());

    exports.LsnCapitalizeModule = LsnCapitalizeModule;
    exports.LsnLatinToGreekModule = LsnLatinToGreekModule;
    exports.LsnLibsModule = LsnLibsModule;
    exports.LsnMatSelectModule = LsnMatSelectModule;
    exports.LsnNumericModule = LsnNumericModule;
    exports.LsnNumpadModule = LsnNumpadModule;
    exports.LsnScrollSpyModule = LsnScrollSpyModule;
    exports.ɵa = CapitalizeDirective;
    exports.ɵb = LatinToGreekDirective;
    exports.ɵc = NumericDirective;
    exports.ɵd = CustomNumericConfig;
    exports.ɵe = NumericConfigService;
    exports.ɵf = NumPadDirective;
    exports.ɵg = CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR;
    exports.ɵh = MatSelectComponent;
    exports.ɵi = ScrollSpyDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=lsnova-angularmodules.umd.js.map
