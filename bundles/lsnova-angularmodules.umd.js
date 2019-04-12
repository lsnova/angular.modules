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
                        exports: []
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNub3ZhLWFuZ3VsYXJtb2R1bGVzLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCJuZzovL0Bsc25vdmEvYW5ndWxhcm1vZHVsZXMvbGliL3NlcnZpY2VzL2NvbmZpZy5zZXJ2aWNlLnRzIiwibmc6Ly9AbHNub3ZhL2FuZ3VsYXJtb2R1bGVzL2xpYi9kaXJlY3RpdmVzL251bWVyaWMvbnVtZXJpYy5kaXJlY3RpdmUudHMiLCJuZzovL0Bsc25vdmEvYW5ndWxhcm1vZHVsZXMvbGliL2RpcmVjdGl2ZXMvbnVtZXJpYy9udW1lcmljLm1vZHVsZS50cyIsIm5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy9saWIvZGlyZWN0aXZlcy9udW1wYWQvbnVtcGFkLmRpcmVjdGl2ZS50cyIsIm5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy9saWIvZGlyZWN0aXZlcy9udW1wYWQvbnVtcGFkLm1vZHVsZS50cyIsIm5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy9saWIvZGlyZWN0aXZlcy9sYXRpbi10by1ncmVlay9sYXRpbi10by1ncmVlay5kaXJlY3RpdmUudHMiLCJuZzovL0Bsc25vdmEvYW5ndWxhcm1vZHVsZXMvbGliL2RpcmVjdGl2ZXMvbGF0aW4tdG8tZ3JlZWsvbGF0aW4tdG8tZ3JlZWsubW9kdWxlLnRzIiwibmc6Ly9AbHNub3ZhL2FuZ3VsYXJtb2R1bGVzL2xpYi9kaXJlY3RpdmVzL2NhcGl0YWxpemUvY2FwaXRhbGl6ZS5kaXJlY3RpdmUudHMiLCJuZzovL0Bsc25vdmEvYW5ndWxhcm1vZHVsZXMvbGliL2RpcmVjdGl2ZXMvY2FwaXRhbGl6ZS9jYXBpdGFsaXplLm1vZHVsZS50cyIsIm5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy9saWIvbHNuLWxpYnMubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZW51bSBOdW1lcmljU2VwYXJhdG9yIHtcbiAgQ09NTUEgPSAnLCcsXG4gIFBFUklPRCA9ICcuJyxcbiAgU1BBQ0UgPSAnICdcbn1cblxuZXhwb3J0IGludGVyZmFjZSBOdW1lcmljQ29uZmlnIHtcbiAgbWluPzogbnVtYmVyO1xuICBtYXg/OiBudW1iZXI7XG4gIG1heExlbmd0aD86IG51bWJlcjtcbiAgcHJlY2lzaW9uPzogbnVtYmVyO1xuICBkZWNpbWFscz86IHN0cmluZztcbiAgdGhvdXNhbmRzPzogc3RyaW5nO1xuICBjb25maWc/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBEZWZhdWx0TnVtZXJpY0NvbmZpZyBpbXBsZW1lbnRzIE51bWVyaWNDb25maWcge1xuICBtaW46IG51bWJlcjtcbiAgbWF4OiBudW1iZXI7XG4gIG1heExlbmd0aDogbnVtYmVyO1xuICBwcmVjaXNpb24gPSAwO1xuICBkZWNpbWFsczogc3RyaW5nID0gTnVtZXJpY1NlcGFyYXRvci5QRVJJT0Q7XG4gIHRob3VzYW5kczogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzID0ge30pIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHByb3BzKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ3VzdG9tQ29uZmlnIHtcbiAgbnVtZXJpYz86IE51bWVyaWNDb25maWc7XG4gIGN1c3RvbT86IHsgW2tleTogc3RyaW5nXTogTnVtZXJpY0NvbmZpZyB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzID0ge30pIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHByb3BzKTtcbiAgfVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29uZmlnU2VydmljZSB7XG4gIHByaXZhdGUgY29uZmlnOiBDdXN0b21Db25maWc7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBDdXN0b21Db25maWcpIHtcblxuICAgIGxldCBtb2R1bGVDb25maWcgPSBuZXcgQ3VzdG9tQ29uZmlnKCk7XG4gICAgaWYgKGNvbmZpZykge1xuICAgICAgbW9kdWxlQ29uZmlnID0gT2JqZWN0LmFzc2lnbihtb2R1bGVDb25maWcsIGNvbmZpZyk7XG4gICAgfVxuXG4gICAgY29uc3QgbnVtZXJpY0NvbmZpZyA9IG1vZHVsZUNvbmZpZy5udW1lcmljIHx8IHt9O1xuICAgIGNvbnN0IGN1c3RvbUNvbmZpZyA9IG1vZHVsZUNvbmZpZy5jdXN0b20gfHwge307XG4gICAgdGhpcy5jb25maWcgPSBuZXcgQ3VzdG9tQ29uZmlnKHtcbiAgICAgIG51bWVyaWM6IG5ldyBEZWZhdWx0TnVtZXJpY0NvbmZpZyhudW1lcmljQ29uZmlnKSxcbiAgICAgIGN1c3RvbTogY3VzdG9tQ29uZmlnLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0TnVtZXJpY0NvbmZpZygpIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcubnVtZXJpYztcbiAgfVxuXG4gIGdldEN1c3RvbUNvbmZpZyhrZXkpIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcuY3VzdG9tW2tleV0gfHwge307XG4gIH1cbn1cbiIsImltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBmb3J3YXJkUmVmLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkNoYW5nZXN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMga2V5Ym9hcmQgZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0NvbmZpZ1NlcnZpY2UsIE51bWVyaWNDb25maWd9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NvbmZpZy5zZXJ2aWNlJztcblxuY29uc3QgQ1VTVE9NX1NFTEVDVF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTnVtZXJpY0RpcmVjdGl2ZSksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbHNuTnVtZXJpY11bbmdNb2RlbF0nLFxuICBwcm92aWRlcnM6IFtDVVNUT01fU0VMRUNUX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBOdW1lcmljRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzLCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIEBJbnB1dCgpIGxzbk51bWVyaWM6IE51bWVyaWNDb25maWcgPSB7fTtcbiAgZWxlbWVudDogRWxlbWVudFJlZjtcbiAgcHJvdGVjdGVkIGNvbmZpZzogTnVtZXJpY0NvbmZpZztcbiAgcHVibGljIG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XG4gIHB1YmxpYyBvblRvdWNoID0gKCkgPT4ge307XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGNvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZWw7XG4gICAgdGhpcy5zZXRDb25maWcoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMuc2V0Q29uZmlnKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdpbnB1dCcsIFsnJGV2ZW50J10pXG4gIGlucHV0SGFuZGxlcigkZXZlbnQpIHtcbiAgICBpZiAoJGV2ZW50LnRhcmdldC52YWx1ZSA9PT0gJy0nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5oYW5kbGVMZW5ndGgoJGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgY29uc3QgcGFyc2VkVmFsdWUgPSB0aGlzLnBhcnNlVmFsdWUodmFsdWUpO1xuICAgIGNvbnN0IHJhbmdlVmFsdWUgPSB0aGlzLmhhbmRsZVJhbmdlKHBhcnNlZFZhbHVlKTtcbiAgICBpZiAocGFyc2VkVmFsdWUgPT09IHJhbmdlVmFsdWUpIHtcbiAgICAgIHRoaXMuZGlzcGxheVZhbHVlID0gdmFsdWUucmVwbGFjZSgvWyx8Ll0vLCB0aGlzLmNvbmZpZy5kZWNpbWFscyk7XG4gICAgICB0aGlzLm9uQ2hhbmdlKHBhcnNlZFZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kaXNwbGF5VmFsdWUgPSByYW5nZVZhbHVlLnRvU3RyaW5nKCkucmVwbGFjZSgvWyx8Ll0vLCB0aGlzLmNvbmZpZy5kZWNpbWFscyk7XG4gICAgICB0aGlzLm9uQ2hhbmdlKHJhbmdlVmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzJywgWyckZXZlbnQnXSlcbiAgZm9jdXNIYW5kbGVyKCkge1xuICAgIHRoaXMuc2V0RWRpdE1vZGUoKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInLCBbJyRldmVudCddKVxuICBibHVySGFuZGxlcigpIHtcbiAgICB0aGlzLmRpc3BsYXlWYWx1ZSA9IHRoaXMucHJlcGFyZURpc3BsYXlWYWx1ZSh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC52YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgd3JpdGVWYWx1ZShtb2RlbFZhbHVlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsZXQgcGFyc2VkVmFsdWUgPSB0aGlzLnBhcnNlVmFsdWUobW9kZWxWYWx1ZSk7XG4gICAgcGFyc2VkVmFsdWUgPSB0aGlzLmhhbmRsZVJhbmdlKHBhcnNlZFZhbHVlKTtcbiAgICB0aGlzLmRpc3BsYXlWYWx1ZSA9IHRoaXMucHJlcGFyZURpc3BsYXlWYWx1ZShwYXJzZWRWYWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2ggPSBmbjtcbiAgfVxuXG4gIGdldCBkaXNwbGF5VmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnZhbHVlO1xuICB9XG5cbiAgc2V0IGRpc3BsYXlWYWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBzZXRDb25maWcoKSB7XG4gICAgY29uc3QgZGVmYXVsdENvbmZpZyA9IHRoaXMubHNuTnVtZXJpYy5jb25maWdcbiAgICAgID8gdGhpcy5jb25maWdTZXJ2aWNlLmdldEN1c3RvbUNvbmZpZyh0aGlzLmxzbk51bWVyaWMuY29uZmlnKVxuICAgICAgOiB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0TnVtZXJpY0NvbmZpZygpO1xuICAgIHRoaXMuY29uZmlnID0gT2JqZWN0LmFzc2lnbih7Li4uZGVmYXVsdENvbmZpZywgLi4udGhpcy5sc25OdW1lcmljfSk7XG4gICAgaWYgKHRoaXMuY29uZmlnLmRlY2ltYWxzICYmIHRoaXMuY29uZmlnLnRob3VzYW5kcyAmJiB0aGlzLmNvbmZpZy5kZWNpbWFscyA9PT0gdGhpcy5jb25maWcudGhvdXNhbmRzKSB7XG4gICAgICB0aGlzLmNvbmZpZy50aG91c2FuZHMgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGlmICh0aGlzLmNvbmZpZy5tYXggIT09IHVuZGVmaW5lZCAmJiB0aGlzLmNvbmZpZy5tYXhMZW5ndGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc29sZS53YXJuKCdbbHNuTnVtZXJpY10gU2V0dGluZyBgbWF4TGVuZ3RoYCBtYWtlcyBgbWF4YCByZWR1bmRhbnQuJyk7XG4gICAgfVxuICB9XG5cbiAgcGFyc2VWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICghdmFsdWUgJiYgdmFsdWUgIT09IDApIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGNvbnN0IG5ld1ZhbHVlID0gdmFsdWUudG9TdHJpbmcoKS5yZXBsYWNlKC9bLHwuXS8sICcuJyk7XG4gICAgY29uc3QgcGFyc2VkVmFsdWUgPSB0aGlzLmNvbmZpZy5wcmVjaXNpb24gPiAwXG4gICAgICA/IHBhcnNlRmxvYXQobmV3VmFsdWUpXG4gICAgICA6IHBhcnNlSW50KG5ld1ZhbHVlLCAxMCk7XG4gICAgcmV0dXJuIGlzTmFOKHBhcnNlZFZhbHVlKSA/IHVuZGVmaW5lZCA6IHBhcnNlZFZhbHVlO1xuICB9XG5cbiAgaGFuZGxlTGVuZ3RoKHZhbHVlKSB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5jb25maWcubWF4TGVuZ3RoXG4gICAgICAmJiB2YWx1ZS50b1N0cmluZygpLmxlbmd0aCA+IHRoaXMuY29uZmlnLm1heExlbmd0aFxuICAgICkge1xuICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCkuc3Vic3RyKDAsIHRoaXMuY29uZmlnLm1heExlbmd0aCk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIGhhbmRsZVJhbmdlKHZhbHVlKSB7XG4gICAgaWYgKCF0aGlzLmNvbmZpZy5tYXhMZW5ndGggJiYgdGhpcy5jb25maWcubWF4ICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgPiB0aGlzLmNvbmZpZy5tYXgpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5tYXg7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNvbmZpZy5taW4gIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSA8IHRoaXMuY29uZmlnLm1pbikge1xuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLm1pbjtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcHJlcGFyZURpc3BsYXlWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICghdmFsdWUgJiYgdmFsdWUgIT09IDApIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgY29uc3QgW3dob2xlLCBkZWNpbWFsc10gPSB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInXG4gICAgICA/IHZhbHVlLnRvU3RyaW5nKCkuc3BsaXQoJy4nKVxuICAgICAgOiB2YWx1ZS50b1N0cmluZygpLnNwbGl0KHRoaXMuY29uZmlnLmRlY2ltYWxzKTtcbiAgICBjb25zdCBpc05lZ2F0aXZlID0gd2hvbGVbMF0gPT09ICctJztcbiAgICBsZXQgcmVzdWx0ID0gd2hvbGUgPT09ICctJyB8fCAhd2hvbGVcbiAgICAgID8gJzAnXG4gICAgICA6IE1hdGguYWJzKHBhcnNlSW50KHdob2xlLCAxMCkpLnRvU3RyaW5nKCk7XG4gICAgaWYgKHRoaXMuY29uZmlnLnRob3VzYW5kcykge1xuICAgICAgcmVzdWx0ID0gcmVzdWx0LnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csIHRoaXMuY29uZmlnLnRob3VzYW5kcyk7XG4gICAgfVxuICAgIGlmIChkZWNpbWFscyAmJiB0aGlzLmNvbmZpZy5wcmVjaXNpb24gJiYgdGhpcy5jb25maWcuZGVjaW1hbHMpIHtcbiAgICAgIHJlc3VsdCA9IHJlc3VsdCArIHRoaXMuY29uZmlnLmRlY2ltYWxzICsgZGVjaW1hbHM7XG4gICAgfVxuICAgIHJldHVybiBpc05lZ2F0aXZlICYmIHJlc3VsdCAhPT0gJzAnID8gJy0nICsgcmVzdWx0IDogcmVzdWx0O1xuICB9XG5cbiAgc2V0RWRpdE1vZGUoKSB7XG4gICAgaWYgKHRoaXMuY29uZmlnLnRob3VzYW5kcykge1xuICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgICBjb25zdCBbd2hvbGUsIGRlY2ltYWxzXSA9IGN1cnJlbnRWYWx1ZS5zcGxpdCh0aGlzLmNvbmZpZy5kZWNpbWFscyk7XG4gICAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoJ1xcXFwnICsgdGhpcy5jb25maWcudGhvdXNhbmRzLCAnZycpO1xuICAgICAgbGV0IHJlc3VsdCA9IHdob2xlLnJlcGxhY2UocmVnZXgsICcnKTtcbiAgICAgIGlmIChkZWNpbWFscyAmJiB0aGlzLmNvbmZpZy5wcmVjaXNpb24gJiYgdGhpcy5jb25maWcuZGVjaW1hbHMpIHtcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0ICsgdGhpcy5jb25maWcuZGVjaW1hbHMgKyBkZWNpbWFscztcbiAgICAgIH1cbiAgICAgIHRoaXMuZGlzcGxheVZhbHVlID0gcmVzdWx0O1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICBrZXlEb3duSGFuZGxlcihlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgY29uc3QgY3VycmVudFZhbHVlID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgaWYgKFxuICAgICAgLy8gQWxsb3cgc3BlY2lhbCBrZXlzXG4gICAgICBbXG4gICAgICAgIGtleWJvYXJkLkxFRlRfQVJST1csXG4gICAgICAgIGtleWJvYXJkLlJJR0hUX0FSUk9XLFxuICAgICAgICBrZXlib2FyZC5CQUNLU1BBQ0UsXG4gICAgICAgIGtleWJvYXJkLkRFTEVURSxcbiAgICAgICAga2V5Ym9hcmQuRU5ELFxuICAgICAgICBrZXlib2FyZC5FTlRFUixcbiAgICAgICAga2V5Ym9hcmQuRVNDQVBFLFxuICAgICAgICBrZXlib2FyZC5IT01FLFxuICAgICAgICBrZXlib2FyZC5UQUIsXG4gICAgICBdLmluZGV4T2YoZS5rZXlDb2RlKSAhPT0gLTFcbiAgICAgIC8vIEFsbG93IEN0cmwra2V5IGFjdGlvbnNcbiAgICAgIHx8IChcbiAgICAgICAgW1xuICAgICAgICAgIGtleWJvYXJkLkEsXG4gICAgICAgICAga2V5Ym9hcmQuQyxcbiAgICAgICAgICBrZXlib2FyZC5SLFxuICAgICAgICAgIGtleWJvYXJkLlYsXG4gICAgICAgICAga2V5Ym9hcmQuWCxcbiAgICAgICAgXS5pbmRleE9mKGUua2V5Q29kZSkgIT09IC0xXG4gICAgICAgICYmIChlLmN0cmxLZXkgPT09IHRydWUgfHwgZS5tZXRhS2V5ID09PSB0cnVlKVxuICAgICAgKVxuICAgICkge1xuICAgICAgcmV0dXJuOyAgLy8gbGV0IGl0IGhhcHBlbiwgZG9uJ3QgZG8gYW55dGhpbmdcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgbWF4TGVuZ3RoXG4gICAgaWYgKFxuICAgICAgdGhpcy5jb25maWcubWF4TGVuZ3RoICE9PSB1bmRlZmluZWRcbiAgICAgICYmIGN1cnJlbnRWYWx1ZS50b1N0cmluZygpLmxlbmd0aCA+PSB0aGlzLmNvbmZpZy5tYXhMZW5ndGhcbiAgICAgICYmIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvbkVuZCAtIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0ID09PSAwXG4gICAgKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIG1pbnVzXG4gICAgaWYgKFxuICAgICAgW2tleWJvYXJkLkRBU0gsIGtleWJvYXJkLk5VTVBBRF9NSU5VU10uaW5kZXhPZihlLmtleUNvZGUpICE9PSAtMVxuICAgICAgJiYgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPT09IDBcbiAgICAgICYmICgodGhpcy5jb25maWcubWluICE9PSB1bmRlZmluZWQgJiYgdGhpcy5jb25maWcubWluIDwgMCkgfHwgdGhpcy5jb25maWcubWluID09PSB1bmRlZmluZWQpXG4gICAgICAmJiBjdXJyZW50VmFsdWUuaW5kZXhPZignLScpID09PSAtMVxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBzZXBhcmF0b3JcbiAgICBpZiAoXG4gICAgICB0aGlzLmNvbmZpZy5wcmVjaXNpb24gPiAwXG4gICAgICAmJiBba2V5Ym9hcmQuQ09NTUEsIGtleWJvYXJkLk5VTVBBRF9QRVJJT0QsIDE5MF0uaW5kZXhPZihlLmtleUNvZGUpICE9PSAtMVxuICAgICAgJiYgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPiAwXG4gICAgICAmJiBjdXJyZW50VmFsdWUubGVuZ3RoXG4gICAgICAmJiBjdXJyZW50VmFsdWUuaW5kZXhPZignLicpID09PSAtMVxuICAgICAgJiYgY3VycmVudFZhbHVlLmluZGV4T2YoJywnKSA9PT0gLTFcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUga2V5IGFmdGVyIHNlcGFyYXRvclxuICAgIGlmIChcbiAgICAgIHRoaXMuY29uZmlnLnByZWNpc2lvbiA+IDBcbiAgICAgICYmIGN1cnJlbnRWYWx1ZS5pbmRleE9mKHRoaXMuY29uZmlnLmRlY2ltYWxzKSA+IC0xXG4gICAgICAmJiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCA+IGN1cnJlbnRWYWx1ZS5pbmRleE9mKHRoaXMuY29uZmlnLmRlY2ltYWxzKVxuICAgICkge1xuICAgICAgY29uc3QgWywgZGVjaW1hbHNdID0gY3VycmVudFZhbHVlLnNwbGl0KHRoaXMuY29uZmlnLmRlY2ltYWxzKTtcbiAgICAgIGlmIChkZWNpbWFscyAmJiBkZWNpbWFscy5sZW5ndGggPj0gdGhpcy5jb25maWcucHJlY2lzaW9uKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBFbnN1cmUgdGhhdCBpdCBpcyBhIG51bWJlciBvciBzdG9wIHRoZSBrZXlwcmVzc1xuICAgIGlmIChcbiAgICAgIChcbiAgICAgICAgKFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIGtleWJvYXJkLlpFUk8sXG4gICAgICAgICAgICBrZXlib2FyZC5PTkUsXG4gICAgICAgICAgICBrZXlib2FyZC5UV08sXG4gICAgICAgICAgICBrZXlib2FyZC5USFJFRSxcbiAgICAgICAgICAgIGtleWJvYXJkLkZPVVIsXG4gICAgICAgICAgICBrZXlib2FyZC5GSVZFLFxuICAgICAgICAgICAga2V5Ym9hcmQuU0lYLFxuICAgICAgICAgICAga2V5Ym9hcmQuU0VWRU4sXG4gICAgICAgICAgICBrZXlib2FyZC5FSUdIVCxcbiAgICAgICAgICAgIGtleWJvYXJkLk5JTkVcbiAgICAgICAgICBdLmluZGV4T2YoZS5rZXlDb2RlKSA9PT0gLTFcbiAgICAgICAgICB8fCBlLnNoaWZ0S2V5XG4gICAgICAgIClcbiAgICAgICAgJiZcbiAgICAgICAgW1xuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9aRVJPLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9PTkUsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX1RXTyxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfVEhSRUUsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX0ZPVVIsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX0ZJVkUsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX1NJWCxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfU0VWRU4sXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX0VJR0hULFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9OSU5FLFxuICAgICAgICBdLmluZGV4T2YoZS5rZXlDb2RlKSA9PT0gLTFcbiAgICAgIClcbiAgICAgIHx8ICh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCA9PT0gMCAmJiBjdXJyZW50VmFsdWUuaW5kZXhPZignLScpID4gLTEpXG4gICAgKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge01vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TnVtZXJpY0RpcmVjdGl2ZX0gZnJvbSAnLi9udW1lcmljLmRpcmVjdGl2ZSc7XG5pbXBvcnQge0NvbmZpZ1NlcnZpY2UsIEN1c3RvbUNvbmZpZ30gZnJvbSAnLi4vLi4vc2VydmljZXMvY29uZmlnLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOdW1lcmljRGlyZWN0aXZlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTnVtZXJpY0RpcmVjdGl2ZSxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBMc25OdW1lcmljTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnPzogQ3VzdG9tQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBMc25OdW1lcmljTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIENvbmZpZ1NlcnZpY2UsXG4gICAgICAgIHtwcm92aWRlOiBDdXN0b21Db25maWcsIHVzZVZhbHVlOiBjb25maWd9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uQ2hhbmdlcywgT3B0aW9uYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMga2V5Ym9hcmQgZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7TmdDb250cm9sfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmNsYXNzIE51bVBhZENvbmZpZyB7XG4gIG1heGxlbmd0aDogbnVtYmVyO1xuICBhbGxvd0xlYWRpbmdaZXJvcyA9IGZhbHNlO1xufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbHNuTnVtUGFkXSdcbn0pXG5leHBvcnQgY2xhc3MgTnVtUGFkRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgbHNuTnVtUGFkID0ge307XG4gIHByb3RlY3RlZCBjb25maWc6IE51bVBhZENvbmZpZztcbiAgcHJpdmF0ZSBkZWZhdWx0Q29uZmlnOiBOdW1QYWRDb25maWcgPSBuZXcgTnVtUGFkQ29uZmlnKCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLCBAT3B0aW9uYWwoKSBwcml2YXRlIG5nQ29udHJvbDogTmdDb250cm9sKSB7XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLmNvbmZpZyA9IE9iamVjdC5hc3NpZ24oey4uLnRoaXMuZGVmYXVsdENvbmZpZywgLi4udGhpcy5sc25OdW1QYWR9KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2lucHV0JywgWyckZXZlbnQnXSlcbiAgaW5wdXRIYW5kbGVyKCRldmVudCkge1xuICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9ICRldmVudC50YXJnZXQudmFsdWU7XG4gICAgdGhpcy5zZXRWYWx1ZSh0aGlzLnBhcnNlTmV3VmFsdWUoY3VycmVudFZhbHVlKSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdibHVyJywgWyckZXZlbnQnXSlcbiAgYmx1ckhhbmRsZXIoJGV2ZW50KSB7XG4gICAgY29uc3QgY3VycmVudFZhbHVlID0gJGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICB0aGlzLnNldFZhbHVlKHRoaXMucGFyc2VOZXdWYWx1ZShjdXJyZW50VmFsdWUsIHRydWUpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzZXRWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh0aGlzLm5nQ29udHJvbCAmJiB0aGlzLm5nQ29udHJvbC5jb250cm9sKSB7XG4gICAgICB0aGlzLm5nQ29udHJvbC5jb250cm9sLnNldFZhbHVlKHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgcGFyc2VOZXdWYWx1ZSh2YWx1ZSwgYmx1ckV2ZW50ID0gZmFsc2UpIHtcbiAgICBsZXQgbmV3VmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9bXjAtOV0vZywgJycpO1xuICAgIGlmIChuZXdWYWx1ZSA9PT0gJycpIHtcbiAgICAgIHJldHVybiBibHVyRXZlbnQgPyAnJyA6IG5ld1ZhbHVlO1xuICAgIH1cbiAgICBpZiAodGhpcy5jb25maWcubWF4bGVuZ3RoICYmIHRoaXMuY29uZmlnLm1heGxlbmd0aCA+IDApIHtcbiAgICAgIG5ld1ZhbHVlID0gbmV3VmFsdWUuc3Vic3RyaW5nKDAsIHRoaXMuY29uZmlnLm1heGxlbmd0aCk7XG4gICAgfVxuICAgIGlmICghdGhpcy5jb25maWcuYWxsb3dMZWFkaW5nWmVyb3MgJiYgYmx1ckV2ZW50KSB7XG4gICAgICBuZXdWYWx1ZSA9IG5ld1ZhbHVlLnJlcGxhY2UoL14wKy8sICcnKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ld1ZhbHVlO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gIGtleURvd25IYW5kbGVyKGU6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgICBpZiAoXG4gICAgICAvLyBBbGxvdyBzcGVjaWFsIGtleXNcbiAgICAgIFtcbiAgICAgICAga2V5Ym9hcmQuTEVGVF9BUlJPVyxcbiAgICAgICAga2V5Ym9hcmQuUklHSFRfQVJST1csXG4gICAgICAgIGtleWJvYXJkLkJBQ0tTUEFDRSxcbiAgICAgICAga2V5Ym9hcmQuREVMRVRFLFxuICAgICAgICBrZXlib2FyZC5FTkQsXG4gICAgICAgIGtleWJvYXJkLkVOVEVSLFxuICAgICAgICBrZXlib2FyZC5FU0NBUEUsXG4gICAgICAgIGtleWJvYXJkLkhPTUUsXG4gICAgICAgIGtleWJvYXJkLlRBQixcbiAgICAgIF0uaW5kZXhPZihlLmtleUNvZGUpICE9PSAtMVxuICAgICAgLy8gQWxsb3cgQ3RybCtrZXkgYWN0aW9uc1xuICAgICAgfHwgKFxuICAgICAgICBbXG4gICAgICAgICAga2V5Ym9hcmQuQSxcbiAgICAgICAgICBrZXlib2FyZC5DLFxuICAgICAgICAgIGtleWJvYXJkLlIsXG4gICAgICAgICAga2V5Ym9hcmQuVixcbiAgICAgICAgICBrZXlib2FyZC5YLFxuICAgICAgICBdLmluZGV4T2YoZS5rZXlDb2RlKSAhPT0gLTFcbiAgICAgICAgJiYgKGUuY3RybEtleSA9PT0gdHJ1ZSB8fCBlLm1ldGFLZXkgPT09IHRydWUpXG4gICAgICApXG4gICAgKSB7XG4gICAgICByZXR1cm47ICAvLyBsZXQgaXQgaGFwcGVuLCBkb24ndCBkbyBhbnl0aGluZ1xuICAgIH1cblxuICAgIC8vIEVuc3VyZSB0aGF0IGl0IGlzIGEgbnVtYmVyIG9yIHN0b3AgdGhlIGtleXByZXNzXG4gICAgaWYgKFxuICAgICAgKFxuICAgICAgICAoXG4gICAgICAgICAgW1xuICAgICAgICAgICAga2V5Ym9hcmQuWkVSTyxcbiAgICAgICAgICAgIGtleWJvYXJkLk9ORSxcbiAgICAgICAgICAgIGtleWJvYXJkLlRXTyxcbiAgICAgICAgICAgIGtleWJvYXJkLlRIUkVFLFxuICAgICAgICAgICAga2V5Ym9hcmQuRk9VUixcbiAgICAgICAgICAgIGtleWJvYXJkLkZJVkUsXG4gICAgICAgICAgICBrZXlib2FyZC5TSVgsXG4gICAgICAgICAgICBrZXlib2FyZC5TRVZFTixcbiAgICAgICAgICAgIGtleWJvYXJkLkVJR0hULFxuICAgICAgICAgICAga2V5Ym9hcmQuTklORVxuICAgICAgICAgIF0uaW5kZXhPZihlLmtleUNvZGUpID09PSAtMVxuICAgICAgICAgIHx8IGUuc2hpZnRLZXlcbiAgICAgICAgKVxuICAgICAgICAmJlxuICAgICAgICBbXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX1pFUk8sXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX09ORSxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfVFdPLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9USFJFRSxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfRk9VUixcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfRklWRSxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfU0lYLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9TRVZFTixcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfRUlHSFQsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX05JTkUsXG4gICAgICAgIF0uaW5kZXhPZihlLmtleUNvZGUpID09PSAtMVxuICAgICAgKVxuICAgICAgfHwgKFxuICAgICAgICBjdXJyZW50VmFsdWUubGVuZ3RoXG4gICAgICAgICYmIHRoaXMuY29uZmlnLm1heGxlbmd0aCAmJiB0aGlzLmNvbmZpZy5tYXhsZW5ndGggPiAwXG4gICAgICAgICYmIGN1cnJlbnRWYWx1ZS5sZW5ndGggPj0gdGhpcy5jb25maWcubWF4bGVuZ3RoXG4gICAgICApXG4gICAgKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TnVtUGFkRGlyZWN0aXZlfSBmcm9tICcuL251bXBhZC5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOdW1QYWREaXJlY3RpdmUsXG4gIF0sXG4gIGltcG9ydHM6IFtdLFxuICBleHBvcnRzOiBbXG4gICAgTnVtUGFkRGlyZWN0aXZlLFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIExzbk51bXBhZE1vZHVsZSB7XG59XG4iLCJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TmdNb2RlbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuZ01vZGVsXVtsc25MYXRpblRvR3JlZWtdJyxcbiAgcHJvdmlkZXJzOiBbTmdNb2RlbF1cbn0pXG5leHBvcnQgY2xhc3MgTGF0aW5Ub0dyZWVrRGlyZWN0aXZlIHtcblxuICBwcml2YXRlIGxhdGluVG9HcmVlayA9IFtcbiAgICBbL0EvaWcsICfDjsKRJ10sXG4gICAgWy9CL2lnLCAnw47CkiddLFxuICAgIFsvRy9pZywgJ8OOwpMnXSxcbiAgICBbL0QvaWcsICfDjsKUJ10sXG4gICAgWy9FL2lnLCAnw47ClSddLFxuICAgIFsvWi9pZywgJ8OOwpYnXSxcbiAgICBbL0gvaWcsICfDjsKXJ10sXG4gICAgWy9VL2lnLCAnw47CmCddLFxuICAgIFsvSS9pZywgJ8OOwpknXSxcbiAgICBbL0svaWcsICfDjsKaJ10sXG4gICAgWy9ML2lnLCAnw47CmyddLFxuICAgIFsvTS9pZywgJ8OOwpwnXSxcbiAgICBbL04vaWcsICfDjsKdJ10sXG4gICAgWy9KL2lnLCAnw47CniddLFxuICAgIFsvTy9pZywgJ8OOwp8nXSxcbiAgICBbL1AvaWcsICfDjsKgJ10sXG4gICAgWy9SL2lnLCAnw47CoSddLFxuICAgIFsvUy9pZywgJ8OOwqMnXSxcbiAgICBbL1QvaWcsICfDjsKkJ10sXG4gICAgWy9ZL2lnLCAnw47CpSddLFxuICAgIFsvRi9pZywgJ8OOwqYnXSxcbiAgICBbL1gvaWcsICfDjsKnJ10sXG4gICAgWy9DL2lnLCAnw47CqCddLFxuICAgIFsvVi9pZywgJ8OOwqknXSxcbiAgICBbL1cvaWcsICdXJ10sXG4gICAgWy9RL2lnLCAnUSddXG4gIF07XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RlbDogTmdNb2RlbCwgcHJpdmF0ZSBlbDogRWxlbWVudFJlZikge1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRDYXJldCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhcnQ6IHRoaXMuZWwubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCxcbiAgICAgIGVuZDogdGhpcy5lbC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvbkVuZCxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRDYXJldChzdGFydCwgZW5kKSB7XG4gICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0ID0gc3RhcnQ7XG4gICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvbkVuZCA9IGVuZDtcbiAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG5cbiAgQEhvc3RMaXN0ZW5lcignbmdNb2RlbENoYW5nZScsIFsnJGV2ZW50J10pXG4gIG9uSW5wdXRDaGFuZ2UoJGV2ZW50KSB7XG4gICAgY29uc3Qge3N0YXJ0LCBlbmR9ID0gdGhpcy5nZXRDYXJldCgpO1xuXG4gICAgbGV0IHRyYW5zbGF0ZWQgPSAkZXZlbnQudG9Mb2NhbGVVcHBlckNhc2UoKTtcbiAgICB0aGlzLmxhdGluVG9HcmVlay5mb3JFYWNoKHJlcGxhY2UgPT4ge1xuICAgICAgdHJhbnNsYXRlZCA9IHRyYW5zbGF0ZWQucmVwbGFjZShyZXBsYWNlWzBdLCByZXBsYWNlWzFdKTtcbiAgICB9KTtcbiAgICB0aGlzLm1vZGVsLnZhbHVlQWNjZXNzb3Iud3JpdGVWYWx1ZSh0cmFuc2xhdGVkKTtcbiAgICB0aGlzLnNldENhcmV0KHN0YXJ0LCBlbmQpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtMYXRpblRvR3JlZWtEaXJlY3RpdmV9IGZyb20gJy4vbGF0aW4tdG8tZ3JlZWsuZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTGF0aW5Ub0dyZWVrRGlyZWN0aXZlLFxuICBdLFxuICBpbXBvcnRzOiBbXSxcbiAgZXhwb3J0czogW1xuICAgIExhdGluVG9HcmVla0RpcmVjdGl2ZSxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBMc25MYXRpblRvR3JlZWtNb2R1bGUge1xufVxuIiwiaW1wb3J0IHtEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05nTW9kZWx9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW25nTW9kZWxdW2xzbkNhcGl0YWxpemVdJyxcbiAgcHJvdmlkZXJzOiBbTmdNb2RlbF1cbn0pXG5leHBvcnQgY2xhc3MgQ2FwaXRhbGl6ZURpcmVjdGl2ZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbW9kZWw6IE5nTW9kZWwpIHtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ25nTW9kZWxDaGFuZ2UnLCBbJyRldmVudCddKVxuICBvbklucHV0Q2hhbmdlKCRldmVudCkge1xuICAgIHRoaXMubW9kZWwudmFsdWVBY2Nlc3Nvci53cml0ZVZhbHVlKCRldmVudC50b0xvY2FsZVVwcGVyQ2FzZSgpKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q2FwaXRhbGl6ZURpcmVjdGl2ZX0gZnJvbSAnLi9jYXBpdGFsaXplLmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIENhcGl0YWxpemVEaXJlY3RpdmUsXG4gIF0sXG4gIGltcG9ydHM6IFtdLFxuICBleHBvcnRzOiBbXG4gICAgQ2FwaXRhbGl6ZURpcmVjdGl2ZSxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBMc25DYXBpdGFsaXplTW9kdWxlIHtcbn1cbiIsImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtMc25OdW1lcmljTW9kdWxlfSBmcm9tICcuL2RpcmVjdGl2ZXMvbnVtZXJpYy9udW1lcmljLm1vZHVsZSc7XG5pbXBvcnQge0xzbk51bXBhZE1vZHVsZX0gZnJvbSAnLi9kaXJlY3RpdmVzL251bXBhZC9udW1wYWQubW9kdWxlJztcbmltcG9ydCB7THNuTGF0aW5Ub0dyZWVrTW9kdWxlfSBmcm9tICcuL2RpcmVjdGl2ZXMvbGF0aW4tdG8tZ3JlZWsvbGF0aW4tdG8tZ3JlZWsubW9kdWxlJztcbmltcG9ydCB7THNuQ2FwaXRhbGl6ZU1vZHVsZX0gZnJvbSAnLi9kaXJlY3RpdmVzL2NhcGl0YWxpemUvY2FwaXRhbGl6ZS5tb2R1bGUnO1xuaW1wb3J0IHtGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtdLFxuICBpbXBvcnRzOiBbXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgTHNuQ2FwaXRhbGl6ZU1vZHVsZSxcbiAgICBMc25MYXRpblRvR3JlZWtNb2R1bGUsXG4gICAgTHNuTnVtZXJpY01vZHVsZS5mb3JSb290KCksXG4gICAgTHNuTnVtcGFkTW9kdWxlLFxuICBdLFxuICBleHBvcnRzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBMc25MaWJzTW9kdWxlIHtcbn1cbiJdLCJuYW1lcyI6WyJJbmplY3RhYmxlIiwiTkdfVkFMVUVfQUNDRVNTT1IiLCJmb3J3YXJkUmVmIiwia2V5Ym9hcmQuTEVGVF9BUlJPVyIsImtleWJvYXJkLlJJR0hUX0FSUk9XIiwia2V5Ym9hcmQuQkFDS1NQQUNFIiwia2V5Ym9hcmQuREVMRVRFIiwia2V5Ym9hcmQuRU5EIiwia2V5Ym9hcmQuRU5URVIiLCJrZXlib2FyZC5FU0NBUEUiLCJrZXlib2FyZC5IT01FIiwia2V5Ym9hcmQuVEFCIiwia2V5Ym9hcmQuQSIsImtleWJvYXJkLkMiLCJrZXlib2FyZC5SIiwia2V5Ym9hcmQuViIsImtleWJvYXJkLlgiLCJrZXlib2FyZC5EQVNIIiwia2V5Ym9hcmQuTlVNUEFEX01JTlVTIiwia2V5Ym9hcmQuQ09NTUEiLCJrZXlib2FyZC5OVU1QQURfUEVSSU9EIiwia2V5Ym9hcmQuWkVSTyIsImtleWJvYXJkLk9ORSIsImtleWJvYXJkLlRXTyIsImtleWJvYXJkLlRIUkVFIiwia2V5Ym9hcmQuRk9VUiIsImtleWJvYXJkLkZJVkUiLCJrZXlib2FyZC5TSVgiLCJrZXlib2FyZC5TRVZFTiIsImtleWJvYXJkLkVJR0hUIiwia2V5Ym9hcmQuTklORSIsImtleWJvYXJkLk5VTVBBRF9aRVJPIiwia2V5Ym9hcmQuTlVNUEFEX09ORSIsImtleWJvYXJkLk5VTVBBRF9UV08iLCJrZXlib2FyZC5OVU1QQURfVEhSRUUiLCJrZXlib2FyZC5OVU1QQURfRk9VUiIsImtleWJvYXJkLk5VTVBBRF9GSVZFIiwia2V5Ym9hcmQuTlVNUEFEX1NJWCIsImtleWJvYXJkLk5VTVBBRF9TRVZFTiIsImtleWJvYXJkLk5VTVBBRF9FSUdIVCIsImtleWJvYXJkLk5VTVBBRF9OSU5FIiwiRGlyZWN0aXZlIiwiRWxlbWVudFJlZiIsIklucHV0IiwiSG9zdExpc3RlbmVyIiwiTmdNb2R1bGUiLCJOZ0NvbnRyb2wiLCJPcHRpb25hbCIsIk5nTW9kZWwiLCJGb3Jtc01vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBQUE7Ozs7Ozs7Ozs7Ozs7O0FBY0EsSUFlTyxJQUFJLFFBQVEsR0FBRztRQUNsQixRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sSUFBSSxTQUFTLFFBQVEsQ0FBQyxDQUFDO1lBQzNDLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNqRCxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixLQUFLLElBQUksQ0FBQyxJQUFJLENBQUM7b0JB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QUMsR0FBRyxFQUFFLENBQUM7NEJBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQzs0QkFBQyxTQUFTO3dCQUNqRDs0QkFDSSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0NBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQ0FBQyxTQUFTOzZCQUFFOzRCQUM1RyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQ0FBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FBQyxNQUFNOzZCQUFFOzRCQUN0RixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0NBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQ0FBQyxNQUFNOzZCQUFFOzRCQUNyRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQ0FBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFD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