(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/cdk/keycodes'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('@lsnova/angularmodules', ['exports', '@angular/core', '@angular/cdk/keycodes', '@angular/forms'], factory) :
    (factory((global.lsnova = global.lsnova || {}, global.lsnova.angularmodules = {}),global.ng.core,global.ng.cdk.keycodes,global.ng.forms));
}(this, (function (exports,core,keyboard,forms) { 'use strict';

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
    function __awaiter(thisArg, _arguments, P, generator) {
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
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (props === void 0) {
                props = {};
            }
            this.precision = 0;
            this.decimals = NumericSeparator.PERIOD;
            Object.assign(this, props);
        }
        return DefaultNumericConfig;
    }());
    var CustomConfig = /** @class */ (function () {
        function CustomConfig(props) {
            if (props === void 0) {
                props = {};
            }
            Object.assign(this, props);
        }
        return CustomConfig;
    }());
    var ConfigService = /** @class */ (function () {
        function ConfigService(config) {
            /** @type {?} */
            var moduleConfig = new CustomConfig();
            if (config) {
                moduleConfig = Object.assign(moduleConfig, config);
            }
            /** @type {?} */
            var numericConfig = moduleConfig.numeric || {};
            /** @type {?} */
            var customConfig = moduleConfig.custom || {};
            this.config = new CustomConfig({
                numeric: new DefaultNumericConfig(numericConfig),
                custom: customConfig,
            });
        }
        /**
         * @return {?}
         */
        ConfigService.prototype.getNumericConfig = /**
         * @return {?}
         */
            function () {
                return this.config.numeric;
            };
        /**
         * @param {?} key
         * @return {?}
         */
        ConfigService.prototype.getCustomConfig = /**
         * @param {?} key
         * @return {?}
         */
            function (key) {
                return this.config.custom[key] || {};
            };
        ConfigService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        ConfigService.ctorParameters = function () {
            return [
                { type: CustomConfig }
            ];
        };
        return ConfigService;
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
                var value = this.handleLength($event.target.value);
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
             */ function () {
                return this.element.nativeElement.value;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
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
                    : this.configService.getNumericConfig();
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
        NumericDirective.prototype.handleLength = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                if (this.config.maxLength
                    && value.toString().length > this.config.maxLength) {
                    return value.toString().substr(0, this.config.maxLength);
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
                if (this.config.maxLength !== undefined
                    && currentValue.toString().length >= this.config.maxLength
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
                    var _a = __read(currentValue.split(this.config.decimals), 2), decimals = _a[1];
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
        NumericDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: ConfigService }
            ];
        };
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
                        ConfigService,
                        { provide: CustomConfig, useValue: config }
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
                if (blurEvent === void 0) {
                    blurEvent = false;
                }
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
        NumPadDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: forms.NgControl, decorators: [{ type: core.Optional }] }
            ];
        };
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
        LatinToGreekDirective.ctorParameters = function () {
            return [
                { type: forms.NgModel },
                { type: core.ElementRef }
            ];
        };
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
        CapitalizeDirective.ctorParameters = function () {
            return [
                { type: forms.NgModel }
            ];
        };
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
                            LsnNumericModule.forRoot(),
                            LsnNumpadModule,
                        ],
                        exports: [
                            LsnCapitalizeModule,
                            LsnLatinToGreekModule,
                            LsnNumericModule,
                            LsnNumpadModule,
                        ]
                    },] }
        ];
        return LsnLibsModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.LsnLibsModule = LsnLibsModule;
    exports.LsnCapitalizeModule = LsnCapitalizeModule;
    exports.LsnLatinToGreekModule = LsnLatinToGreekModule;
    exports.LsnNumericModule = LsnNumericModule;
    exports.LsnNumpadModule = LsnNumpadModule;
    exports.ɵa = CapitalizeDirective;
    exports.ɵb = LatinToGreekDirective;
    exports.ɵc = NumericDirective;
    exports.ɵf = NumPadDirective;
    exports.ɵe = ConfigService;
    exports.ɵd = CustomConfig;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNub3ZhLWFuZ3VsYXJtb2R1bGVzLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCJuZzovL0Bsc25vdmEvYW5ndWxhcm1vZHVsZXMvbGliL3NlcnZpY2VzL2NvbmZpZy5zZXJ2aWNlLnRzIiwibmc6Ly9AbHNub3ZhL2FuZ3VsYXJtb2R1bGVzL2xpYi9kaXJlY3RpdmVzL251bWVyaWMvbnVtZXJpYy5kaXJlY3RpdmUudHMiLCJuZzovL0Bsc25vdmEvYW5ndWxhcm1vZHVsZXMvbGliL2RpcmVjdGl2ZXMvbnVtZXJpYy9udW1lcmljLm1vZHVsZS50cyIsIm5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy9saWIvZGlyZWN0aXZlcy9udW1wYWQvbnVtcGFkLmRpcmVjdGl2ZS50cyIsIm5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy9saWIvZGlyZWN0aXZlcy9udW1wYWQvbnVtcGFkLm1vZHVsZS50cyIsIm5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy9saWIvZGlyZWN0aXZlcy9sYXRpbi10by1ncmVlay9sYXRpbi10by1ncmVlay5kaXJlY3RpdmUudHMiLCJuZzovL0Bsc25vdmEvYW5ndWxhcm1vZHVsZXMvbGliL2RpcmVjdGl2ZXMvbGF0aW4tdG8tZ3JlZWsvbGF0aW4tdG8tZ3JlZWsubW9kdWxlLnRzIiwibmc6Ly9AbHNub3ZhL2FuZ3VsYXJtb2R1bGVzL2xpYi9kaXJlY3RpdmVzL2NhcGl0YWxpemUvY2FwaXRhbGl6ZS5kaXJlY3RpdmUudHMiLCJuZzovL0Bsc25vdmEvYW5ndWxhcm1vZHVsZXMvbGliL2RpcmVjdGl2ZXMvY2FwaXRhbGl6ZS9jYXBpdGFsaXplLm1vZHVsZS50cyIsIm5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy9saWIvbHNuLWxpYnMubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZW51bSBOdW1lcmljU2VwYXJhdG9yIHtcbiAgQ09NTUEgPSAnLCcsXG4gIFBFUklPRCA9ICcuJyxcbiAgU1BBQ0UgPSAnICdcbn1cblxuZXhwb3J0IGludGVyZmFjZSBOdW1lcmljQ29uZmlnIHtcbiAgbWluPzogbnVtYmVyO1xuICBtYXg/OiBudW1iZXI7XG4gIG1heExlbmd0aD86IG51bWJlcjtcbiAgcHJlY2lzaW9uPzogbnVtYmVyO1xuICBkZWNpbWFscz86IHN0cmluZztcbiAgdGhvdXNhbmRzPzogc3RyaW5nO1xuICBjb25maWc/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBEZWZhdWx0TnVtZXJpY0NvbmZpZyBpbXBsZW1lbnRzIE51bWVyaWNDb25maWcge1xuICBtaW46IG51bWJlcjtcbiAgbWF4OiBudW1iZXI7XG4gIG1heExlbmd0aDogbnVtYmVyO1xuICBwcmVjaXNpb24gPSAwO1xuICBkZWNpbWFsczogc3RyaW5nID0gTnVtZXJpY1NlcGFyYXRvci5QRVJJT0Q7XG4gIHRob3VzYW5kczogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzID0ge30pIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHByb3BzKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ3VzdG9tQ29uZmlnIHtcbiAgbnVtZXJpYz86IE51bWVyaWNDb25maWc7XG4gIGN1c3RvbT86IHsgW2tleTogc3RyaW5nXTogTnVtZXJpY0NvbmZpZyB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzID0ge30pIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHByb3BzKTtcbiAgfVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29uZmlnU2VydmljZSB7XG4gIHByaXZhdGUgY29uZmlnOiBDdXN0b21Db25maWc7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBDdXN0b21Db25maWcpIHtcblxuICAgIGxldCBtb2R1bGVDb25maWcgPSBuZXcgQ3VzdG9tQ29uZmlnKCk7XG4gICAgaWYgKGNvbmZpZykge1xuICAgICAgbW9kdWxlQ29uZmlnID0gT2JqZWN0LmFzc2lnbihtb2R1bGVDb25maWcsIGNvbmZpZyk7XG4gICAgfVxuXG4gICAgY29uc3QgbnVtZXJpY0NvbmZpZyA9IG1vZHVsZUNvbmZpZy5udW1lcmljIHx8IHt9O1xuICAgIGNvbnN0IGN1c3RvbUNvbmZpZyA9IG1vZHVsZUNvbmZpZy5jdXN0b20gfHwge307XG4gICAgdGhpcy5jb25maWcgPSBuZXcgQ3VzdG9tQ29uZmlnKHtcbiAgICAgIG51bWVyaWM6IG5ldyBEZWZhdWx0TnVtZXJpY0NvbmZpZyhudW1lcmljQ29uZmlnKSxcbiAgICAgIGN1c3RvbTogY3VzdG9tQ29uZmlnLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0TnVtZXJpY0NvbmZpZygpIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcubnVtZXJpYztcbiAgfVxuXG4gIGdldEN1c3RvbUNvbmZpZyhrZXkpIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcuY3VzdG9tW2tleV0gfHwge307XG4gIH1cbn1cbiIsImltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBmb3J3YXJkUmVmLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkNoYW5nZXN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMga2V5Ym9hcmQgZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0NvbmZpZ1NlcnZpY2UsIE51bWVyaWNDb25maWd9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NvbmZpZy5zZXJ2aWNlJztcblxuY29uc3QgQ1VTVE9NX1NFTEVDVF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTnVtZXJpY0RpcmVjdGl2ZSksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbHNuTnVtZXJpY11bbmdNb2RlbF0nLFxuICBwcm92aWRlcnM6IFtDVVNUT01fU0VMRUNUX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBOdW1lcmljRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzLCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIEBJbnB1dCgpIGxzbk51bWVyaWM6IE51bWVyaWNDb25maWcgPSB7fTtcbiAgZWxlbWVudDogRWxlbWVudFJlZjtcbiAgcHJvdGVjdGVkIGNvbmZpZzogTnVtZXJpY0NvbmZpZztcbiAgcHVibGljIG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XG4gIHB1YmxpYyBvblRvdWNoID0gKCkgPT4ge307XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGNvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZWw7XG4gICAgdGhpcy5zZXRDb25maWcoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMuc2V0Q29uZmlnKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdpbnB1dCcsIFsnJGV2ZW50J10pXG4gIGlucHV0SGFuZGxlcigkZXZlbnQpIHtcbiAgICBpZiAoJGV2ZW50LnRhcmdldC52YWx1ZSA9PT0gJy0nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5oYW5kbGVMZW5ndGgoJGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgY29uc3QgcGFyc2VkVmFsdWUgPSB0aGlzLnBhcnNlVmFsdWUodmFsdWUpO1xuICAgIGNvbnN0IHJhbmdlVmFsdWUgPSB0aGlzLmhhbmRsZVJhbmdlKHBhcnNlZFZhbHVlKTtcbiAgICBpZiAocGFyc2VkVmFsdWUgPT09IHJhbmdlVmFsdWUpIHtcbiAgICAgIHRoaXMuZGlzcGxheVZhbHVlID0gdmFsdWUucmVwbGFjZSgvWyx8Ll0vLCB0aGlzLmNvbmZpZy5kZWNpbWFscyk7XG4gICAgICB0aGlzLm9uQ2hhbmdlKHBhcnNlZFZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kaXNwbGF5VmFsdWUgPSByYW5nZVZhbHVlLnRvU3RyaW5nKCkucmVwbGFjZSgvWyx8Ll0vLCB0aGlzLmNvbmZpZy5kZWNpbWFscyk7XG4gICAgICB0aGlzLm9uQ2hhbmdlKHJhbmdlVmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzJywgWyckZXZlbnQnXSlcbiAgZm9jdXNIYW5kbGVyKCkge1xuICAgIHRoaXMuc2V0RWRpdE1vZGUoKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInLCBbJyRldmVudCddKVxuICBibHVySGFuZGxlcigpIHtcbiAgICB0aGlzLmRpc3BsYXlWYWx1ZSA9IHRoaXMucHJlcGFyZURpc3BsYXlWYWx1ZSh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC52YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgd3JpdGVWYWx1ZShtb2RlbFZhbHVlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsZXQgcGFyc2VkVmFsdWUgPSB0aGlzLnBhcnNlVmFsdWUobW9kZWxWYWx1ZSk7XG4gICAgcGFyc2VkVmFsdWUgPSB0aGlzLmhhbmRsZVJhbmdlKHBhcnNlZFZhbHVlKTtcbiAgICB0aGlzLmRpc3BsYXlWYWx1ZSA9IHRoaXMucHJlcGFyZURpc3BsYXlWYWx1ZShwYXJzZWRWYWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2ggPSBmbjtcbiAgfVxuXG4gIGdldCBkaXNwbGF5VmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnZhbHVlO1xuICB9XG5cbiAgc2V0IGRpc3BsYXlWYWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBzZXRDb25maWcoKSB7XG4gICAgY29uc3QgZGVmYXVsdENvbmZpZyA9IHRoaXMubHNuTnVtZXJpYy5jb25maWdcbiAgICAgID8gdGhpcy5jb25maWdTZXJ2aWNlLmdldEN1c3RvbUNvbmZpZyh0aGlzLmxzbk51bWVyaWMuY29uZmlnKVxuICAgICAgOiB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0TnVtZXJpY0NvbmZpZygpO1xuICAgIHRoaXMuY29uZmlnID0gT2JqZWN0LmFzc2lnbih7Li4uZGVmYXVsdENvbmZpZywgLi4udGhpcy5sc25OdW1lcmljfSk7XG4gICAgaWYgKHRoaXMuY29uZmlnLmRlY2ltYWxzICYmIHRoaXMuY29uZmlnLnRob3VzYW5kcyAmJiB0aGlzLmNvbmZpZy5kZWNpbWFscyA9PT0gdGhpcy5jb25maWcudGhvdXNhbmRzKSB7XG4gICAgICB0aGlzLmNvbmZpZy50aG91c2FuZHMgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGlmICh0aGlzLmNvbmZpZy5tYXggIT09IHVuZGVmaW5lZCAmJiB0aGlzLmNvbmZpZy5tYXhMZW5ndGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc29sZS53YXJuKCdbbHNuTnVtZXJpY10gU2V0dGluZyBgbWF4TGVuZ3RoYCBtYWtlcyBgbWF4YCByZWR1bmRhbnQuJyk7XG4gICAgfVxuICB9XG5cbiAgcGFyc2VWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICghdmFsdWUgJiYgdmFsdWUgIT09IDApIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGNvbnN0IG5ld1ZhbHVlID0gdmFsdWUudG9TdHJpbmcoKS5yZXBsYWNlKC9bLHwuXS8sICcuJyk7XG4gICAgY29uc3QgcGFyc2VkVmFsdWUgPSB0aGlzLmNvbmZpZy5wcmVjaXNpb24gPiAwXG4gICAgICA/IHBhcnNlRmxvYXQobmV3VmFsdWUpXG4gICAgICA6IHBhcnNlSW50KG5ld1ZhbHVlLCAxMCk7XG4gICAgcmV0dXJuIGlzTmFOKHBhcnNlZFZhbHVlKSA/IHVuZGVmaW5lZCA6IHBhcnNlZFZhbHVlO1xuICB9XG5cbiAgaGFuZGxlTGVuZ3RoKHZhbHVlKSB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5jb25maWcubWF4TGVuZ3RoXG4gICAgICAmJiB2YWx1ZS50b1N0cmluZygpLmxlbmd0aCA+IHRoaXMuY29uZmlnLm1heExlbmd0aFxuICAgICkge1xuICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCkuc3Vic3RyKDAsIHRoaXMuY29uZmlnLm1heExlbmd0aCk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIGhhbmRsZVJhbmdlKHZhbHVlKSB7XG4gICAgaWYgKCF0aGlzLmNvbmZpZy5tYXhMZW5ndGggJiYgdGhpcy5jb25maWcubWF4ICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgPiB0aGlzLmNvbmZpZy5tYXgpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5tYXg7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNvbmZpZy5taW4gIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSA8IHRoaXMuY29uZmlnLm1pbikge1xuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLm1pbjtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcHJlcGFyZURpc3BsYXlWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICghdmFsdWUgJiYgdmFsdWUgIT09IDApIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgY29uc3QgW3dob2xlLCBkZWNpbWFsc10gPSB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInXG4gICAgICA/IHZhbHVlLnRvU3RyaW5nKCkuc3BsaXQoJy4nKVxuICAgICAgOiB2YWx1ZS50b1N0cmluZygpLnNwbGl0KHRoaXMuY29uZmlnLmRlY2ltYWxzKTtcbiAgICBjb25zdCBpc05lZ2F0aXZlID0gd2hvbGVbMF0gPT09ICctJztcbiAgICBsZXQgcmVzdWx0ID0gd2hvbGUgPT09ICctJyB8fCAhd2hvbGVcbiAgICAgID8gJzAnXG4gICAgICA6IE1hdGguYWJzKHBhcnNlSW50KHdob2xlLCAxMCkpLnRvU3RyaW5nKCk7XG4gICAgaWYgKHRoaXMuY29uZmlnLnRob3VzYW5kcykge1xuICAgICAgcmVzdWx0ID0gcmVzdWx0LnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csIHRoaXMuY29uZmlnLnRob3VzYW5kcyk7XG4gICAgfVxuICAgIGlmIChkZWNpbWFscyAmJiB0aGlzLmNvbmZpZy5wcmVjaXNpb24gJiYgdGhpcy5jb25maWcuZGVjaW1hbHMpIHtcbiAgICAgIHJlc3VsdCA9IHJlc3VsdCArIHRoaXMuY29uZmlnLmRlY2ltYWxzICsgZGVjaW1hbHM7XG4gICAgfVxuICAgIHJldHVybiBpc05lZ2F0aXZlICYmIHJlc3VsdCAhPT0gJzAnID8gJy0nICsgcmVzdWx0IDogcmVzdWx0O1xuICB9XG5cbiAgc2V0RWRpdE1vZGUoKSB7XG4gICAgaWYgKHRoaXMuY29uZmlnLnRob3VzYW5kcykge1xuICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgICBjb25zdCBbd2hvbGUsIGRlY2ltYWxzXSA9IGN1cnJlbnRWYWx1ZS5zcGxpdCh0aGlzLmNvbmZpZy5kZWNpbWFscyk7XG4gICAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoJ1xcXFwnICsgdGhpcy5jb25maWcudGhvdXNhbmRzLCAnZycpO1xuICAgICAgbGV0IHJlc3VsdCA9IHdob2xlLnJlcGxhY2UocmVnZXgsICcnKTtcbiAgICAgIGlmIChkZWNpbWFscyAmJiB0aGlzLmNvbmZpZy5wcmVjaXNpb24gJiYgdGhpcy5jb25maWcuZGVjaW1hbHMpIHtcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0ICsgdGhpcy5jb25maWcuZGVjaW1hbHMgKyBkZWNpbWFscztcbiAgICAgIH1cbiAgICAgIHRoaXMuZGlzcGxheVZhbHVlID0gcmVzdWx0O1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICBrZXlEb3duSGFuZGxlcihlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgY29uc3QgY3VycmVudFZhbHVlID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgaWYgKFxuICAgICAgLy8gQWxsb3cgc3BlY2lhbCBrZXlzXG4gICAgICBbXG4gICAgICAgIGtleWJvYXJkLkxFRlRfQVJST1csXG4gICAgICAgIGtleWJvYXJkLlJJR0hUX0FSUk9XLFxuICAgICAgICBrZXlib2FyZC5CQUNLU1BBQ0UsXG4gICAgICAgIGtleWJvYXJkLkRFTEVURSxcbiAgICAgICAga2V5Ym9hcmQuRU5ELFxuICAgICAgICBrZXlib2FyZC5FTlRFUixcbiAgICAgICAga2V5Ym9hcmQuRVNDQVBFLFxuICAgICAgICBrZXlib2FyZC5IT01FLFxuICAgICAgICBrZXlib2FyZC5UQUIsXG4gICAgICBdLmluZGV4T2YoZS5rZXlDb2RlKSAhPT0gLTFcbiAgICAgIC8vIEFsbG93IEN0cmwra2V5IGFjdGlvbnNcbiAgICAgIHx8IChcbiAgICAgICAgW1xuICAgICAgICAgIGtleWJvYXJkLkEsXG4gICAgICAgICAga2V5Ym9hcmQuQyxcbiAgICAgICAgICBrZXlib2FyZC5SLFxuICAgICAgICAgIGtleWJvYXJkLlYsXG4gICAgICAgICAga2V5Ym9hcmQuWCxcbiAgICAgICAgXS5pbmRleE9mKGUua2V5Q29kZSkgIT09IC0xXG4gICAgICAgICYmIChlLmN0cmxLZXkgPT09IHRydWUgfHwgZS5tZXRhS2V5ID09PSB0cnVlKVxuICAgICAgKVxuICAgICkge1xuICAgICAgcmV0dXJuOyAgLy8gbGV0IGl0IGhhcHBlbiwgZG9uJ3QgZG8gYW55dGhpbmdcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgbWF4TGVuZ3RoXG4gICAgaWYgKFxuICAgICAgdGhpcy5jb25maWcubWF4TGVuZ3RoICE9PSB1bmRlZmluZWRcbiAgICAgICYmIGN1cnJlbnRWYWx1ZS50b1N0cmluZygpLmxlbmd0aCA+PSB0aGlzLmNvbmZpZy5tYXhMZW5ndGhcbiAgICAgICYmIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvbkVuZCAtIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0ID09PSAwXG4gICAgKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIG1pbnVzXG4gICAgaWYgKFxuICAgICAgW2tleWJvYXJkLkRBU0gsIGtleWJvYXJkLk5VTVBBRF9NSU5VU10uaW5kZXhPZihlLmtleUNvZGUpICE9PSAtMVxuICAgICAgJiYgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPT09IDBcbiAgICAgICYmICgodGhpcy5jb25maWcubWluICE9PSB1bmRlZmluZWQgJiYgdGhpcy5jb25maWcubWluIDwgMCkgfHwgdGhpcy5jb25maWcubWluID09PSB1bmRlZmluZWQpXG4gICAgICAmJiBjdXJyZW50VmFsdWUuaW5kZXhPZignLScpID09PSAtMVxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBzZXBhcmF0b3JcbiAgICBpZiAoXG4gICAgICB0aGlzLmNvbmZpZy5wcmVjaXNpb24gPiAwXG4gICAgICAmJiBba2V5Ym9hcmQuQ09NTUEsIGtleWJvYXJkLk5VTVBBRF9QRVJJT0QsIDE5MF0uaW5kZXhPZihlLmtleUNvZGUpICE9PSAtMVxuICAgICAgJiYgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPiAwXG4gICAgICAmJiBjdXJyZW50VmFsdWUubGVuZ3RoXG4gICAgICAmJiBjdXJyZW50VmFsdWUuaW5kZXhPZignLicpID09PSAtMVxuICAgICAgJiYgY3VycmVudFZhbHVlLmluZGV4T2YoJywnKSA9PT0gLTFcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUga2V5IGFmdGVyIHNlcGFyYXRvclxuICAgIGlmIChcbiAgICAgIHRoaXMuY29uZmlnLnByZWNpc2lvbiA+IDBcbiAgICAgICYmIGN1cnJlbnRWYWx1ZS5pbmRleE9mKHRoaXMuY29uZmlnLmRlY2ltYWxzKSA+IC0xXG4gICAgICAmJiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCA+IGN1cnJlbnRWYWx1ZS5pbmRleE9mKHRoaXMuY29uZmlnLmRlY2ltYWxzKVxuICAgICkge1xuICAgICAgY29uc3QgWywgZGVjaW1hbHNdID0gY3VycmVudFZhbHVlLnNwbGl0KHRoaXMuY29uZmlnLmRlY2ltYWxzKTtcbiAgICAgIGlmIChkZWNpbWFscyAmJiBkZWNpbWFscy5sZW5ndGggPj0gdGhpcy5jb25maWcucHJlY2lzaW9uKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBFbnN1cmUgdGhhdCBpdCBpcyBhIG51bWJlciBvciBzdG9wIHRoZSBrZXlwcmVzc1xuICAgIGlmIChcbiAgICAgIChcbiAgICAgICAgKFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIGtleWJvYXJkLlpFUk8sXG4gICAgICAgICAgICBrZXlib2FyZC5PTkUsXG4gICAgICAgICAgICBrZXlib2FyZC5UV08sXG4gICAgICAgICAgICBrZXlib2FyZC5USFJFRSxcbiAgICAgICAgICAgIGtleWJvYXJkLkZPVVIsXG4gICAgICAgICAgICBrZXlib2FyZC5GSVZFLFxuICAgICAgICAgICAga2V5Ym9hcmQuU0lYLFxuICAgICAgICAgICAga2V5Ym9hcmQuU0VWRU4sXG4gICAgICAgICAgICBrZXlib2FyZC5FSUdIVCxcbiAgICAgICAgICAgIGtleWJvYXJkLk5JTkVcbiAgICAgICAgICBdLmluZGV4T2YoZS5rZXlDb2RlKSA9PT0gLTFcbiAgICAgICAgICB8fCBlLnNoaWZ0S2V5XG4gICAgICAgIClcbiAgICAgICAgJiZcbiAgICAgICAgW1xuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9aRVJPLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9PTkUsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX1RXTyxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfVEhSRUUsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX0ZPVVIsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX0ZJVkUsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX1NJWCxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfU0VWRU4sXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX0VJR0hULFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9OSU5FLFxuICAgICAgICBdLmluZGV4T2YoZS5rZXlDb2RlKSA9PT0gLTFcbiAgICAgIClcbiAgICAgIHx8ICh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCA9PT0gMCAmJiBjdXJyZW50VmFsdWUuaW5kZXhPZignLScpID4gLTEpXG4gICAgKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge01vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TnVtZXJpY0RpcmVjdGl2ZX0gZnJvbSAnLi9udW1lcmljLmRpcmVjdGl2ZSc7XG5pbXBvcnQge0NvbmZpZ1NlcnZpY2UsIEN1c3RvbUNvbmZpZ30gZnJvbSAnLi4vLi4vc2VydmljZXMvY29uZmlnLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOdW1lcmljRGlyZWN0aXZlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTnVtZXJpY0RpcmVjdGl2ZSxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBMc25OdW1lcmljTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnPzogQ3VzdG9tQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBMc25OdW1lcmljTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIENvbmZpZ1NlcnZpY2UsXG4gICAgICAgIHtwcm92aWRlOiBDdXN0b21Db25maWcsIHVzZVZhbHVlOiBjb25maWd9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uQ2hhbmdlcywgT3B0aW9uYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMga2V5Ym9hcmQgZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7TmdDb250cm9sfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmNsYXNzIE51bVBhZENvbmZpZyB7XG4gIG1heGxlbmd0aDogbnVtYmVyO1xuICBhbGxvd0xlYWRpbmdaZXJvcyA9IGZhbHNlO1xufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbHNuTnVtUGFkXSdcbn0pXG5leHBvcnQgY2xhc3MgTnVtUGFkRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgbHNuTnVtUGFkID0ge307XG4gIHByb3RlY3RlZCBjb25maWc6IE51bVBhZENvbmZpZztcbiAgcHJpdmF0ZSBkZWZhdWx0Q29uZmlnOiBOdW1QYWRDb25maWcgPSBuZXcgTnVtUGFkQ29uZmlnKCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLCBAT3B0aW9uYWwoKSBwcml2YXRlIG5nQ29udHJvbDogTmdDb250cm9sKSB7XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLmNvbmZpZyA9IE9iamVjdC5hc3NpZ24oey4uLnRoaXMuZGVmYXVsdENvbmZpZywgLi4udGhpcy5sc25OdW1QYWR9KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2lucHV0JywgWyckZXZlbnQnXSlcbiAgaW5wdXRIYW5kbGVyKCRldmVudCkge1xuICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9ICRldmVudC50YXJnZXQudmFsdWU7XG4gICAgdGhpcy5zZXRWYWx1ZSh0aGlzLnBhcnNlTmV3VmFsdWUoY3VycmVudFZhbHVlKSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdibHVyJywgWyckZXZlbnQnXSlcbiAgYmx1ckhhbmRsZXIoJGV2ZW50KSB7XG4gICAgY29uc3QgY3VycmVudFZhbHVlID0gJGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICB0aGlzLnNldFZhbHVlKHRoaXMucGFyc2VOZXdWYWx1ZShjdXJyZW50VmFsdWUsIHRydWUpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzZXRWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh0aGlzLm5nQ29udHJvbCAmJiB0aGlzLm5nQ29udHJvbC5jb250cm9sKSB7XG4gICAgICB0aGlzLm5nQ29udHJvbC5jb250cm9sLnNldFZhbHVlKHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgcGFyc2VOZXdWYWx1ZSh2YWx1ZSwgYmx1ckV2ZW50ID0gZmFsc2UpIHtcbiAgICBsZXQgbmV3VmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9bXjAtOV0vZywgJycpO1xuICAgIGlmIChuZXdWYWx1ZSA9PT0gJycpIHtcbiAgICAgIHJldHVybiBibHVyRXZlbnQgPyAnJyA6IG5ld1ZhbHVlO1xuICAgIH1cbiAgICBpZiAodGhpcy5jb25maWcubWF4bGVuZ3RoICYmIHRoaXMuY29uZmlnLm1heGxlbmd0aCA+IDApIHtcbiAgICAgIG5ld1ZhbHVlID0gbmV3VmFsdWUuc3Vic3RyaW5nKDAsIHRoaXMuY29uZmlnLm1heGxlbmd0aCk7XG4gICAgfVxuICAgIGlmICghdGhpcy5jb25maWcuYWxsb3dMZWFkaW5nWmVyb3MgJiYgYmx1ckV2ZW50KSB7XG4gICAgICBuZXdWYWx1ZSA9IG5ld1ZhbHVlLnJlcGxhY2UoL14wKy8sICcnKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ld1ZhbHVlO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gIGtleURvd25IYW5kbGVyKGU6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgICBpZiAoXG4gICAgICAvLyBBbGxvdyBzcGVjaWFsIGtleXNcbiAgICAgIFtcbiAgICAgICAga2V5Ym9hcmQuTEVGVF9BUlJPVyxcbiAgICAgICAga2V5Ym9hcmQuUklHSFRfQVJST1csXG4gICAgICAgIGtleWJvYXJkLkJBQ0tTUEFDRSxcbiAgICAgICAga2V5Ym9hcmQuREVMRVRFLFxuICAgICAgICBrZXlib2FyZC5FTkQsXG4gICAgICAgIGtleWJvYXJkLkVOVEVSLFxuICAgICAgICBrZXlib2FyZC5FU0NBUEUsXG4gICAgICAgIGtleWJvYXJkLkhPTUUsXG4gICAgICAgIGtleWJvYXJkLlRBQixcbiAgICAgIF0uaW5kZXhPZihlLmtleUNvZGUpICE9PSAtMVxuICAgICAgLy8gQWxsb3cgQ3RybCtrZXkgYWN0aW9uc1xuICAgICAgfHwgKFxuICAgICAgICBbXG4gICAgICAgICAga2V5Ym9hcmQuQSxcbiAgICAgICAgICBrZXlib2FyZC5DLFxuICAgICAgICAgIGtleWJvYXJkLlIsXG4gICAgICAgICAga2V5Ym9hcmQuVixcbiAgICAgICAgICBrZXlib2FyZC5YLFxuICAgICAgICBdLmluZGV4T2YoZS5rZXlDb2RlKSAhPT0gLTFcbiAgICAgICAgJiYgKGUuY3RybEtleSA9PT0gdHJ1ZSB8fCBlLm1ldGFLZXkgPT09IHRydWUpXG4gICAgICApXG4gICAgKSB7XG4gICAgICByZXR1cm47ICAvLyBsZXQgaXQgaGFwcGVuLCBkb24ndCBkbyBhbnl0aGluZ1xuICAgIH1cblxuICAgIC8vIEVuc3VyZSB0aGF0IGl0IGlzIGEgbnVtYmVyIG9yIHN0b3AgdGhlIGtleXByZXNzXG4gICAgaWYgKFxuICAgICAgKFxuICAgICAgICAoXG4gICAgICAgICAgW1xuICAgICAgICAgICAga2V5Ym9hcmQuWkVSTyxcbiAgICAgICAgICAgIGtleWJvYXJkLk9ORSxcbiAgICAgICAgICAgIGtleWJvYXJkLlRXTyxcbiAgICAgICAgICAgIGtleWJvYXJkLlRIUkVFLFxuICAgICAgICAgICAga2V5Ym9hcmQuRk9VUixcbiAgICAgICAgICAgIGtleWJvYXJkLkZJVkUsXG4gICAgICAgICAgICBrZXlib2FyZC5TSVgsXG4gICAgICAgICAgICBrZXlib2FyZC5TRVZFTixcbiAgICAgICAgICAgIGtleWJvYXJkLkVJR0hULFxuICAgICAgICAgICAga2V5Ym9hcmQuTklORVxuICAgICAgICAgIF0uaW5kZXhPZihlLmtleUNvZGUpID09PSAtMVxuICAgICAgICAgIHx8IGUuc2hpZnRLZXlcbiAgICAgICAgKVxuICAgICAgICAmJlxuICAgICAgICBbXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX1pFUk8sXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX09ORSxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfVFdPLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9USFJFRSxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfRk9VUixcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfRklWRSxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfU0lYLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9TRVZFTixcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfRUlHSFQsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX05JTkUsXG4gICAgICAgIF0uaW5kZXhPZihlLmtleUNvZGUpID09PSAtMVxuICAgICAgKVxuICAgICAgfHwgKFxuICAgICAgICBjdXJyZW50VmFsdWUubGVuZ3RoXG4gICAgICAgICYmIHRoaXMuY29uZmlnLm1heGxlbmd0aCAmJiB0aGlzLmNvbmZpZy5tYXhsZW5ndGggPiAwXG4gICAgICAgICYmIGN1cnJlbnRWYWx1ZS5sZW5ndGggPj0gdGhpcy5jb25maWcubWF4bGVuZ3RoXG4gICAgICApXG4gICAgKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TnVtUGFkRGlyZWN0aXZlfSBmcm9tICcuL251bXBhZC5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOdW1QYWREaXJlY3RpdmUsXG4gIF0sXG4gIGltcG9ydHM6IFtdLFxuICBleHBvcnRzOiBbXG4gICAgTnVtUGFkRGlyZWN0aXZlLFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIExzbk51bXBhZE1vZHVsZSB7XG59XG4iLCJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TmdNb2RlbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuZ01vZGVsXVtsc25MYXRpblRvR3JlZWtdJyxcbiAgcHJvdmlkZXJzOiBbTmdNb2RlbF1cbn0pXG5leHBvcnQgY2xhc3MgTGF0aW5Ub0dyZWVrRGlyZWN0aXZlIHtcblxuICBwcml2YXRlIGxhdGluVG9HcmVlayA9IFtcbiAgICBbL0EvaWcsICfDjsKRJ10sXG4gICAgWy9CL2lnLCAnw47CkiddLFxuICAgIFsvRy9pZywgJ8OOwpMnXSxcbiAgICBbL0QvaWcsICfDjsKUJ10sXG4gICAgWy9FL2lnLCAnw47ClSddLFxuICAgIFsvWi9pZywgJ8OOwpYnXSxcbiAgICBbL0gvaWcsICfDjsKXJ10sXG4gICAgWy9VL2lnLCAnw47CmCddLFxuICAgIFsvSS9pZywgJ8OOwpknXSxcbiAgICBbL0svaWcsICfDjsKaJ10sXG4gICAgWy9ML2lnLCAnw47CmyddLFxuICAgIFsvTS9pZywgJ8OOwpwnXSxcbiAgICBbL04vaWcsICfDjsKdJ10sXG4gICAgWy9KL2lnLCAnw47CniddLFxuICAgIFsvTy9pZywgJ8OOwp8nXSxcbiAgICBbL1AvaWcsICfDjsKgJ10sXG4gICAgWy9SL2lnLCAnw47CoSddLFxuICAgIFsvUy9pZywgJ8OOwqMnXSxcbiAgICBbL1QvaWcsICfDjsKkJ10sXG4gICAgWy9ZL2lnLCAnw47CpSddLFxuICAgIFsvRi9pZywgJ8OOwqYnXSxcbiAgICBbL1gvaWcsICfDjsKnJ10sXG4gICAgWy9DL2lnLCAnw47CqCddLFxuICAgIFsvVi9pZywgJ8OOwqknXSxcbiAgICBbL1cvaWcsICdXJ10sXG4gICAgWy9RL2lnLCAnUSddXG4gIF07XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RlbDogTmdNb2RlbCwgcHJpdmF0ZSBlbDogRWxlbWVudFJlZikge1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRDYXJldCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhcnQ6IHRoaXMuZWwubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCxcbiAgICAgIGVuZDogdGhpcy5lbC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvbkVuZCxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRDYXJldChzdGFydCwgZW5kKSB7XG4gICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0ID0gc3RhcnQ7XG4gICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvbkVuZCA9IGVuZDtcbiAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG5cbiAgQEhvc3RMaXN0ZW5lcignbmdNb2RlbENoYW5nZScsIFsnJGV2ZW50J10pXG4gIG9uSW5wdXRDaGFuZ2UoJGV2ZW50KSB7XG4gICAgY29uc3Qge3N0YXJ0LCBlbmR9ID0gdGhpcy5nZXRDYXJldCgpO1xuXG4gICAgbGV0IHRyYW5zbGF0ZWQgPSAkZXZlbnQudG9Mb2NhbGVVcHBlckNhc2UoKTtcbiAgICB0aGlzLmxhdGluVG9HcmVlay5mb3JFYWNoKHJlcGxhY2UgPT4ge1xuICAgICAgdHJhbnNsYXRlZCA9IHRyYW5zbGF0ZWQucmVwbGFjZShyZXBsYWNlWzBdLCByZXBsYWNlWzFdKTtcbiAgICB9KTtcbiAgICB0aGlzLm1vZGVsLnZhbHVlQWNjZXNzb3Iud3JpdGVWYWx1ZSh0cmFuc2xhdGVkKTtcbiAgICB0aGlzLnNldENhcmV0KHN0YXJ0LCBlbmQpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtMYXRpblRvR3JlZWtEaXJlY3RpdmV9IGZyb20gJy4vbGF0aW4tdG8tZ3JlZWsuZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTGF0aW5Ub0dyZWVrRGlyZWN0aXZlLFxuICBdLFxuICBpbXBvcnRzOiBbXSxcbiAgZXhwb3J0czogW1xuICAgIExhdGluVG9HcmVla0RpcmVjdGl2ZSxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBMc25MYXRpblRvR3JlZWtNb2R1bGUge1xufVxuIiwiaW1wb3J0IHtEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05nTW9kZWx9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW25nTW9kZWxdW2xzbkNhcGl0YWxpemVdJyxcbiAgcHJvdmlkZXJzOiBbTmdNb2RlbF1cbn0pXG5leHBvcnQgY2xhc3MgQ2FwaXRhbGl6ZURpcmVjdGl2ZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbW9kZWw6IE5nTW9kZWwpIHtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ25nTW9kZWxDaGFuZ2UnLCBbJyRldmVudCddKVxuICBvbklucHV0Q2hhbmdlKCRldmVudCkge1xuICAgIHRoaXMubW9kZWwudmFsdWVBY2Nlc3Nvci53cml0ZVZhbHVlKCRldmVudC50b0xvY2FsZVVwcGVyQ2FzZSgpKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q2FwaXRhbGl6ZURpcmVjdGl2ZX0gZnJvbSAnLi9jYXBpdGFsaXplLmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIENhcGl0YWxpemVEaXJlY3RpdmUsXG4gIF0sXG4gIGltcG9ydHM6IFtdLFxuICBleHBvcnRzOiBbXG4gICAgQ2FwaXRhbGl6ZURpcmVjdGl2ZSxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBMc25DYXBpdGFsaXplTW9kdWxlIHtcbn1cbiIsImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtMc25OdW1lcmljTW9kdWxlfSBmcm9tICcuL2RpcmVjdGl2ZXMvbnVtZXJpYy9udW1lcmljLm1vZHVsZSc7XG5pbXBvcnQge0xzbk51bXBhZE1vZHVsZX0gZnJvbSAnLi9kaXJlY3RpdmVzL251bXBhZC9udW1wYWQubW9kdWxlJztcbmltcG9ydCB7THNuTGF0aW5Ub0dyZWVrTW9kdWxlfSBmcm9tICcuL2RpcmVjdGl2ZXMvbGF0aW4tdG8tZ3JlZWsvbGF0aW4tdG8tZ3JlZWsubW9kdWxlJztcbmltcG9ydCB7THNuQ2FwaXRhbGl6ZU1vZHVsZX0gZnJvbSAnLi9kaXJlY3RpdmVzL2NhcGl0YWxpemUvY2FwaXRhbGl6ZS5tb2R1bGUnO1xuaW1wb3J0IHtGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtdLFxuICBpbXBvcnRzOiBbXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgTHNuQ2FwaXRhbGl6ZU1vZHVsZSxcbiAgICBMc25MYXRpblRvR3JlZWtNb2R1bGUsXG4gICAgTHNuTnVtZXJpY01vZHVsZS5mb3JSb290KCksXG4gICAgTHNuTnVtcGFkTW9kdWxlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTHNuQ2FwaXRhbGl6ZU1vZHVsZSxcbiAgICBMc25MYXRpblRvR3JlZWtNb2R1bGUsXG4gICAgTHNuTnVtZXJpY01vZHVsZSxcbiAgICBMc25OdW1wYWRNb2R1bGUsXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTHNuTGlic01vZHVsZSB7XG59XG4iXSwibmFtZXMiOlsiSW5qZWN0YWJsZSIsIk5HX1ZBTFVFX0FDQ0VTU09SIiwiZm9yd2FyZFJlZiIsImtleWJvYXJkLkxFRlRfQVJST1ciLCJrZXlib2FyZC5SSUdIVF9BUlJPVyIsImtleWJvYXJkLkJBQ0tTUEFDRSIsImtleWJvYXJkLkRFTEVURSIsImtleWJvYXJkLkVORCIsImtleWJvYXJkLkVOVEVSIiwia2V5Ym9hcmQuRVNDQVBFIiwia2V5Ym9hcmQuSE9NRSIsImtleWJvYXJkLlRBQiIsImtleWJvYXJkLkEiLCJrZXlib2FyZC5DIiwia2V5Ym9hcmQuUiIsImtleWJvYXJkLlYiLCJrZXlib2FyZC5YIiwia2V5Ym9hcmQuREFTSCIsImtleWJvYXJkLk5VTVBBRF9NSU5VUyIsImtleWJvYXJkLkNPTU1BIiwia2V5Ym9hcmQuTlVNUEFEX1BFUklPRCIsImtleWJvYXJkLlpFUk8iLCJrZXlib2FyZC5PTkUiLCJrZXlib2FyZC5UV08iLCJrZXlib2FyZC5USFJFRSIsImtleWJvYXJkLkZPVVIiLCJrZXlib2FyZC5GSVZFIiwia2V5Ym9hcmQuU0lYIiwia2V5Ym9hcmQuU0VWRU4iLCJrZXlib2FyZC5FSUdIVCIsImtleWJvYXJkLk5JTkUiLCJrZXlib2FyZC5OVU1QQURfWkVSTyIsImtleWJvYXJkLk5VTVBBRF9PTkUiLCJrZXlib2FyZC5OVU1QQURfVFdPIiwia2V5Ym9hcmQuTlVNUEFEX1RIUkVFIiwia2V5Ym9hcmQuTlVNUEFEX0ZPVVIiLCJrZXlib2FyZC5OVU1QQURfRklWRSIsImtleWJvYXJkLk5VTVBBRF9TSVgiLCJrZXlib2FyZC5OVU1QQURfU0VWRU4iLCJrZXlib2FyZC5OVU1QQURfRUlHSFQiLCJrZXlib2FyZC5OVU1QQURfTklORSIsIkRpcmVjdGl2ZSIsIkVsZW1lbnRSZWYiLCJJbnB1dCIsIkhvc3RMaXN0ZW5lciIsIk5nTW9kdWxlIiwiTmdDb250cm9sIiwiT3B0aW9uYWwiLCJOZ01vZGVsIiwiRm9ybXNNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7OztJQUFBOzs7Ozs7Ozs7Ozs7OztBQWNBLElBZU8sSUFBSSxRQUFRLEdBQUc7UUFDbEIsUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUksU0FBUyxRQUFRLENBQUMsQ0FBQztZQUMzQyxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFH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LENBQUM7NEJBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQUMsU0FBUzt3QkFDakQsS0FBSyxDQUFDOzRCQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDOzRCQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7NEJBQUMsU0FBUzt3QkFDakQ7NEJBQ0ksSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dDQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7Z0NBQUMsU0FBUzs2QkFBRTs0QkFDNUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0NBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQUMsTUFBTTs2QkFBRTs0QkFDdEYsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dDQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7Z0NBQUMsTUFBTTs2QkFBRTs0QkFDckUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssR0FB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