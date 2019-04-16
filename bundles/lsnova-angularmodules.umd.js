(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/cdk/keycodes'), require('@angular/forms'), require('@angular/material'), require('rxjs'), require('rxjs/operators'), require('@angular/platform-browser')) :
    typeof define === 'function' && define.amd ? define('@lsnova/angularmodules', ['exports', '@angular/core', '@angular/cdk/keycodes', '@angular/forms', '@angular/material', 'rxjs', 'rxjs/operators', '@angular/platform-browser'], factory) :
    (factory((global.lsnova = global.lsnova || {}, global.lsnova.angularmodules = {}),global.ng.core,global.ng.cdk.keycodes,global.ng.forms,global.ng.material,global.rxjs,global.rxjs.operators,global.ng.platformBrowser));
}(this, (function (exports,core,keyboard,forms,material,rxjs,operators,platformBrowser) { 'use strict';

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
            if (props === void 0) {
                props = {};
            }
            this.precision = 0;
            this.decimals = NumericSeparator.PERIOD;
            Object.assign(this, props);
        }
        return DefaultNumericConfig;
    }());
    var CustomNumericConfig = /** @class */ (function () {
        function CustomNumericConfig(props) {
            if (props === void 0) {
                props = {};
            }
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
                return this.config.custom[key] || {};
            };
        NumericConfigService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        NumericConfigService.ctorParameters = function () {
            return [
                { type: CustomNumericConfig }
            ];
        };
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
                { type: NumericConfigService }
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
                    console.warn('[app-select] Given value is an array. Should `multiple = true`?');
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
                    var result = this.options.find(function (option) {
                        return _this.bindValue
                            ? option[_this.bindValue] === value
                            : _this.bindBy
                                ? option[_this.bindBy] === value[_this.bindBy]
                                : option === value;
                    });
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
                        // _remove(this.selectedOptions, (item) => {
                        //   return this.bindValue ? item[this.bindValue] === value[this.bindValue] : item === value;
                        // });
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
             */ function () {
                return Array.isArray(this.options) && this.options.length > SELECT_SEARCHABLE_MIN_LIMIT;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatSelectComponent.prototype, "isClearEnabled", {
            get: /**
             * @return {?}
             */ function () {
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
                if (this.isSearchEnabled && [keyboard.DOWN_ARROW, keyboard.END, keyboard.ENTER, keyboard.HOME, keyboard.UP_ARROW].indexOf(event.keyCode) === -1) {
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
        MatSelectComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'lsn-mat-select',
                        template: "<mat-form-field>\n    <mat-select\n        [formControl]=\"control\"\n        [placeholder]=\"placeholder\"\n        [errorStateMatcher]=\"errorStateMatcher\"\n        [multiple]=\"multiple\"\n        [disableOptionCentering]=\"true\"\n        panelClass=\"app-select-panel\"\n        (blur)=\"onBlur()\"\n        (openedChange)=\"openedChange($event)\"\n    >\n        <input\n            #searchInput\n            *ngIf=\"isSearchEnabled\"\n            matInput\n            type=\"text\"\n            class=\"input-filter mat-select-search\"\n            autocomplete=\"off\"\n            [ngModel]=\"searchTerm\"\n            (ngModelChange)=\"filterOptions($event)\"\n            [placeholder]=\"'FILTER'\"\n            (keydown)=\"handleKeydown($event)\"\n        />\n        <div [ngClass]=\"{'app-select__options': true, 'app-select__options--searchable': isSearchEnabled}\">\n            <mat-option *ngIf=\"!options.length\"></mat-option>\n            <mat-option\n                *ngFor=\"let option of filteredOptions\"\n                [value]=\"option\"\n                [title]=\"bindLabel ? option[bindLabel] : option\"\n            >\n                <span *ngIf=\"!optionTemplate\">{{ bindLabel ? option[bindLabel] : option }}</span>\n                <span *ngIf=\"optionTemplate\">\n                <ng-container *ngTemplateOutlet=\"optionTemplate; context:{option: option}\"></ng-container>\n            </span>\n            </mat-option>\n        </div>\n    </mat-select>\n    <mat-icon class=\"mat-select-clear\" *ngIf=\"isClearEnabled\">\n        <button\n            class=\"btn btn-basic-icon pr-0 pl-0\"\n            [matTooltip]=\"'BUTTON.DELETE'\"\n            (click)=\"clearValue($event)\">\n            <i class=\"icon-close\"></i>\n        </button>\n    </mat-icon>\n    <mat-error appScrollTo=\"\" *ngFor=\"let error of errors\">\n        {{ error.description }}\n    </mat-error>\n</mat-form-field>\n",
                        providers: [CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR],
                        encapsulation: core.ViewEncapsulation.Emulated,
                        styles: ["app-select .mat-select-placeholder{color:rgba(0,0,0,.6)}app-select .mat-select-value{padding-right:1rem}app-select .mat-select-arrow-wrapper{display:inline}app-select .mat-select-clear{position:absolute;z-index:1;right:.5rem;bottom:.35rem}app-select .mat-select-clear button{color:#989898}app-select .mat-select-clear button:hover{color:#13418f}app-select .mat-select-clear button i{font-size:14px}.app-select-panel{min-height:36px}.app-select-panel .mat-select-search{position:relative;top:0;left:0;right:0;padding:9px 16px;background-color:#fafafa;z-index:1}.app-select-panel .app-select__options{position:relative;overflow:auto;width:100%;max-height:100%}.app-select-panel .app-select__options--searchable{max-height:calc(100% - 35px)}.app-select-panel mat-option .mat-pseudo-checkbox{border:1px solid #d4d7d9}.app-select-panel mat-option .mat-pseudo-checkbox.mat-pseudo-checkbox-checked{border:1px solid #13418f}.app-select-panel mat-option .mat-pseudo-checkbox.mat-pseudo-checkbox-checked::after{top:1px;left:1px;height:6px;width:12px;border:none;box-shadow:-1.5px 1.5px 0 0 currentColor}"]
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
            disabled: [{ type: core.Input }],
            multiple: [{ type: core.Input }],
            errorStateMatcher: [{ type: core.Input }],
            errors: [{ type: core.Input }],
            optionTemplate: [{ type: core.ContentChild, args: [core.TemplateRef,] }],
            matSelect: [{ type: core.ViewChild, args: [material.MatSelect,] }],
            searchInput: [{ type: core.ViewChild, args: ['searchInput',] }]
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
                            platformBrowser.BrowserModule,
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
                        ],
                        exports: [
                            LsnCapitalizeModule,
                            LsnLatinToGreekModule,
                            LsnNumericModule,
                            LsnNumpadModule,
                            LsnMatSelectModule,
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
    exports.ɵh = CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR;
    exports.ɵi = MatSelectComponent;
    exports.ɵg = LsnMatSelectModule;
    exports.ɵa = CapitalizeDirective;
    exports.ɵb = LatinToGreekDirective;
    exports.ɵd = CustomNumericConfig;
    exports.ɵe = NumericConfigService;
    exports.ɵc = NumericDirective;
    exports.ɵf = NumPadDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNub3ZhLWFuZ3VsYXJtb2R1bGVzLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCJuZzovL0Bsc25vdmEvYW5ndWxhcm1vZHVsZXMvbGliL2RpcmVjdGl2ZXMvbnVtZXJpYy9udW1lcmljLWNvbmZpZy5zZXJ2aWNlLnRzIiwibmc6Ly9AbHNub3ZhL2FuZ3VsYXJtb2R1bGVzL2xpYi9kaXJlY3RpdmVzL251bWVyaWMvbnVtZXJpYy5kaXJlY3RpdmUudHMiLCJuZzovL0Bsc25vdmEvYW5ndWxhcm1vZHVsZXMvbGliL2RpcmVjdGl2ZXMvbnVtZXJpYy9udW1lcmljLm1vZHVsZS50cyIsIm5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy9saWIvZGlyZWN0aXZlcy9udW1wYWQvbnVtcGFkLmRpcmVjdGl2ZS50cyIsIm5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy9saWIvZGlyZWN0aXZlcy9udW1wYWQvbnVtcGFkLm1vZHVsZS50cyIsIm5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy9saWIvZGlyZWN0aXZlcy9sYXRpbi10by1ncmVlay9sYXRpbi10by1ncmVlay5kaXJlY3RpdmUudHMiLCJuZzovL0Bsc25vdmEvYW5ndWxhcm1vZHVsZXMvbGliL2RpcmVjdGl2ZXMvbGF0aW4tdG8tZ3JlZWsvbGF0aW4tdG8tZ3JlZWsubW9kdWxlLnRzIiwibmc6Ly9AbHNub3ZhL2FuZ3VsYXJtb2R1bGVzL2xpYi9kaXJlY3RpdmVzL2NhcGl0YWxpemUvY2FwaXRhbGl6ZS5kaXJlY3RpdmUudHMiLCJuZzovL0Bsc25vdmEvYW5ndWxhcm1vZHVsZXMvbGliL2RpcmVjdGl2ZXMvY2FwaXRhbGl6ZS9jYXBpdGFsaXplLm1vZHVsZS50cyIsIm5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy9saWIvY29tcG9uZW50cy9tYXQtc2VsZWN0L21hdC1zZWxlY3QuY29tcG9uZW50LnRzIiwibmc6Ly9AbHNub3ZhL2FuZ3VsYXJtb2R1bGVzL2xpYi9jb21wb25lbnRzL21hdC1zZWxlY3QvbWF0LXNlbGVjdC5tb2R1bGUudHMiLCJuZzovL0Bsc25vdmEvYW5ndWxhcm1vZHVsZXMvbGliL2xzbi1saWJzLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmVudW0gTnVtZXJpY1NlcGFyYXRvciB7XG4gIENPTU1BID0gJywnLFxuICBQRVJJT0QgPSAnLicsXG4gIFNQQUNFID0gJyAnXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTnVtZXJpY0NvbmZpZyB7XG4gIG1pbj86IG51bWJlcjtcbiAgbWF4PzogbnVtYmVyO1xuICBtYXhMZW5ndGg/OiBudW1iZXI7XG4gIHByZWNpc2lvbj86IG51bWJlcjtcbiAgZGVjaW1hbHM/OiBzdHJpbmc7XG4gIHRob3VzYW5kcz86IHN0cmluZztcbiAgY29uZmlnPzogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgRGVmYXVsdE51bWVyaWNDb25maWcgaW1wbGVtZW50cyBOdW1lcmljQ29uZmlnIHtcbiAgbWluOiBudW1iZXI7XG4gIG1heDogbnVtYmVyO1xuICBtYXhMZW5ndGg6IG51bWJlcjtcbiAgcHJlY2lzaW9uID0gMDtcbiAgZGVjaW1hbHM6IHN0cmluZyA9IE51bWVyaWNTZXBhcmF0b3IuUEVSSU9EO1xuICB0aG91c2FuZHM6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcm9wcyA9IHt9KSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBwcm9wcyk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEN1c3RvbU51bWVyaWNDb25maWcge1xuICBkZWZhdWx0PzogTnVtZXJpY0NvbmZpZztcbiAgY3VzdG9tPzogeyBba2V5OiBzdHJpbmddOiBOdW1lcmljQ29uZmlnIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMgPSB7fSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgcHJvcHMpO1xuICB9XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOdW1lcmljQ29uZmlnU2VydmljZSB7XG4gIHByaXZhdGUgY29uZmlnOiBDdXN0b21OdW1lcmljQ29uZmlnO1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogQ3VzdG9tTnVtZXJpY0NvbmZpZykge1xuXG4gICAgbGV0IG1vZHVsZUNvbmZpZyA9IG5ldyBDdXN0b21OdW1lcmljQ29uZmlnKCk7XG4gICAgaWYgKGNvbmZpZykge1xuICAgICAgbW9kdWxlQ29uZmlnID0gT2JqZWN0LmFzc2lnbihtb2R1bGVDb25maWcsIGNvbmZpZyk7XG4gICAgfVxuXG4gICAgY29uc3QgbnVtZXJpY0NvbmZpZyA9IG1vZHVsZUNvbmZpZy5kZWZhdWx0IHx8IHt9O1xuICAgIGNvbnN0IGN1c3RvbUNvbmZpZyA9IG1vZHVsZUNvbmZpZy5jdXN0b20gfHwge307XG4gICAgdGhpcy5jb25maWcgPSBuZXcgQ3VzdG9tTnVtZXJpY0NvbmZpZyh7XG4gICAgICBkZWZhdWx0OiBuZXcgRGVmYXVsdE51bWVyaWNDb25maWcobnVtZXJpY0NvbmZpZyksXG4gICAgICBjdXN0b206IGN1c3RvbUNvbmZpZyxcbiAgICB9KTtcbiAgfVxuXG4gIGdldERlZmF1bHRDb25maWcoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmRlZmF1bHQ7XG4gIH1cblxuICBnZXRDdXN0b21Db25maWcoa2V5KSB7XG4gICAgaWYgKCF0aGlzLmNvbmZpZy5jdXN0b21ba2V5XSkge1xuICAgICAgY29uc29sZS53YXJuKCdbbHNuTnVtZXJpY10gSW52YWxpZCBjb25maWcga2V5IHByb3ZpZGVkLicpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jb25maWcuY3VzdG9tW2tleV0gfHwge307XG4gIH1cbn1cbiIsImltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBmb3J3YXJkUmVmLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkNoYW5nZXN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMga2V5Ym9hcmQgZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge051bWVyaWNDb25maWdTZXJ2aWNlLCBOdW1lcmljQ29uZmlnfSBmcm9tICcuL251bWVyaWMtY29uZmlnLnNlcnZpY2UnO1xuXG5jb25zdCBDVVNUT01fU0VMRUNUX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOdW1lcmljRGlyZWN0aXZlKSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tsc25OdW1lcmljXVtuZ01vZGVsXScsXG4gIHByb3ZpZGVyczogW0NVU1RPTV9TRUxFQ1RfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIE51bWVyaWNEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgQElucHV0KCkgbHNuTnVtZXJpYzogTnVtZXJpY0NvbmZpZyA9IHt9O1xuICBlbGVtZW50OiBFbGVtZW50UmVmO1xuICBwcm90ZWN0ZWQgY29uZmlnOiBOdW1lcmljQ29uZmlnO1xuICBwdWJsaWMgb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7fTtcbiAgcHVibGljIG9uVG91Y2ggPSAoKSA9PiB7fTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgY29uZmlnU2VydmljZTogTnVtZXJpY0NvbmZpZ1NlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZWw7XG4gICAgdGhpcy5zZXRDb25maWcoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMuc2V0Q29uZmlnKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdpbnB1dCcsIFsnJGV2ZW50J10pXG4gIGlucHV0SGFuZGxlcigkZXZlbnQpIHtcbiAgICBpZiAoJGV2ZW50LnRhcmdldC52YWx1ZSA9PT0gJy0nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5oYW5kbGVMZW5ndGgoJGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgY29uc3QgcGFyc2VkVmFsdWUgPSB0aGlzLnBhcnNlVmFsdWUodmFsdWUpO1xuICAgIGNvbnN0IHJhbmdlVmFsdWUgPSB0aGlzLmhhbmRsZVJhbmdlKHBhcnNlZFZhbHVlKTtcbiAgICBpZiAocGFyc2VkVmFsdWUgPT09IHJhbmdlVmFsdWUpIHtcbiAgICAgIHRoaXMuZGlzcGxheVZhbHVlID0gdmFsdWUucmVwbGFjZSgvWyx8Ll0vLCB0aGlzLmNvbmZpZy5kZWNpbWFscyk7XG4gICAgICB0aGlzLm9uQ2hhbmdlKHBhcnNlZFZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kaXNwbGF5VmFsdWUgPSByYW5nZVZhbHVlLnRvU3RyaW5nKCkucmVwbGFjZSgvWyx8Ll0vLCB0aGlzLmNvbmZpZy5kZWNpbWFscyk7XG4gICAgICB0aGlzLm9uQ2hhbmdlKHJhbmdlVmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzJywgWyckZXZlbnQnXSlcbiAgZm9jdXNIYW5kbGVyKCkge1xuICAgIHRoaXMuc2V0RWRpdE1vZGUoKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInLCBbJyRldmVudCddKVxuICBibHVySGFuZGxlcigpIHtcbiAgICB0aGlzLmRpc3BsYXlWYWx1ZSA9IHRoaXMucHJlcGFyZURpc3BsYXlWYWx1ZSh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC52YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgd3JpdGVWYWx1ZShtb2RlbFZhbHVlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsZXQgcGFyc2VkVmFsdWUgPSB0aGlzLnBhcnNlVmFsdWUobW9kZWxWYWx1ZSk7XG4gICAgcGFyc2VkVmFsdWUgPSB0aGlzLmhhbmRsZVJhbmdlKHBhcnNlZFZhbHVlKTtcbiAgICB0aGlzLmRpc3BsYXlWYWx1ZSA9IHRoaXMucHJlcGFyZURpc3BsYXlWYWx1ZShwYXJzZWRWYWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2ggPSBmbjtcbiAgfVxuXG4gIGdldCBkaXNwbGF5VmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnZhbHVlO1xuICB9XG5cbiAgc2V0IGRpc3BsYXlWYWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBzZXRDb25maWcoKSB7XG4gICAgY29uc3QgZGVmYXVsdENvbmZpZyA9IHRoaXMubHNuTnVtZXJpYy5jb25maWdcbiAgICAgID8gdGhpcy5jb25maWdTZXJ2aWNlLmdldEN1c3RvbUNvbmZpZyh0aGlzLmxzbk51bWVyaWMuY29uZmlnKVxuICAgICAgOiB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0RGVmYXVsdENvbmZpZygpO1xuICAgIHRoaXMuY29uZmlnID0gT2JqZWN0LmFzc2lnbih7Li4uZGVmYXVsdENvbmZpZywgLi4udGhpcy5sc25OdW1lcmljfSk7XG4gICAgaWYgKHRoaXMuY29uZmlnLmRlY2ltYWxzICYmIHRoaXMuY29uZmlnLnRob3VzYW5kcyAmJiB0aGlzLmNvbmZpZy5kZWNpbWFscyA9PT0gdGhpcy5jb25maWcudGhvdXNhbmRzKSB7XG4gICAgICB0aGlzLmNvbmZpZy50aG91c2FuZHMgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGlmICh0aGlzLmNvbmZpZy5tYXggIT09IHVuZGVmaW5lZCAmJiB0aGlzLmNvbmZpZy5tYXhMZW5ndGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc29sZS53YXJuKCdbbHNuTnVtZXJpY10gU2V0dGluZyBgbWF4TGVuZ3RoYCBtYWtlcyBgbWF4YCByZWR1bmRhbnQuJyk7XG4gICAgfVxuICB9XG5cbiAgcGFyc2VWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICghdmFsdWUgJiYgdmFsdWUgIT09IDApIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGNvbnN0IG5ld1ZhbHVlID0gdmFsdWUudG9TdHJpbmcoKS5yZXBsYWNlKC9bLHwuXS8sICcuJyk7XG4gICAgY29uc3QgcGFyc2VkVmFsdWUgPSB0aGlzLmNvbmZpZy5wcmVjaXNpb24gPiAwXG4gICAgICA/IHBhcnNlRmxvYXQobmV3VmFsdWUpXG4gICAgICA6IHBhcnNlSW50KG5ld1ZhbHVlLCAxMCk7XG4gICAgcmV0dXJuIGlzTmFOKHBhcnNlZFZhbHVlKSA/IHVuZGVmaW5lZCA6IHBhcnNlZFZhbHVlO1xuICB9XG5cbiAgaGFuZGxlTGVuZ3RoKHZhbHVlKSB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5jb25maWcubWF4TGVuZ3RoXG4gICAgICAmJiB2YWx1ZS50b1N0cmluZygpLmxlbmd0aCA+IHRoaXMuY29uZmlnLm1heExlbmd0aFxuICAgICkge1xuICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCkuc3Vic3RyKDAsIHRoaXMuY29uZmlnLm1heExlbmd0aCk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIGhhbmRsZVJhbmdlKHZhbHVlKSB7XG4gICAgaWYgKCF0aGlzLmNvbmZpZy5tYXhMZW5ndGggJiYgdGhpcy5jb25maWcubWF4ICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgPiB0aGlzLmNvbmZpZy5tYXgpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5tYXg7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNvbmZpZy5taW4gIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSA8IHRoaXMuY29uZmlnLm1pbikge1xuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLm1pbjtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcHJlcGFyZURpc3BsYXlWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICghdmFsdWUgJiYgdmFsdWUgIT09IDApIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgY29uc3QgW3dob2xlLCBkZWNpbWFsc10gPSB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInXG4gICAgICA/IHZhbHVlLnRvU3RyaW5nKCkuc3BsaXQoJy4nKVxuICAgICAgOiB2YWx1ZS50b1N0cmluZygpLnNwbGl0KHRoaXMuY29uZmlnLmRlY2ltYWxzKTtcbiAgICBjb25zdCBpc05lZ2F0aXZlID0gd2hvbGVbMF0gPT09ICctJztcbiAgICBsZXQgcmVzdWx0ID0gd2hvbGUgPT09ICctJyB8fCAhd2hvbGVcbiAgICAgID8gJzAnXG4gICAgICA6IE1hdGguYWJzKHBhcnNlSW50KHdob2xlLCAxMCkpLnRvU3RyaW5nKCk7XG4gICAgaWYgKHRoaXMuY29uZmlnLnRob3VzYW5kcykge1xuICAgICAgcmVzdWx0ID0gcmVzdWx0LnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csIHRoaXMuY29uZmlnLnRob3VzYW5kcyk7XG4gICAgfVxuICAgIGlmIChkZWNpbWFscyAmJiB0aGlzLmNvbmZpZy5wcmVjaXNpb24gJiYgdGhpcy5jb25maWcuZGVjaW1hbHMpIHtcbiAgICAgIHJlc3VsdCA9IHJlc3VsdCArIHRoaXMuY29uZmlnLmRlY2ltYWxzICsgZGVjaW1hbHM7XG4gICAgfVxuICAgIHJldHVybiBpc05lZ2F0aXZlICYmIHJlc3VsdCAhPT0gJzAnID8gJy0nICsgcmVzdWx0IDogcmVzdWx0O1xuICB9XG5cbiAgc2V0RWRpdE1vZGUoKSB7XG4gICAgaWYgKHRoaXMuY29uZmlnLnRob3VzYW5kcykge1xuICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgICBjb25zdCBbd2hvbGUsIGRlY2ltYWxzXSA9IGN1cnJlbnRWYWx1ZS5zcGxpdCh0aGlzLmNvbmZpZy5kZWNpbWFscyk7XG4gICAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoJ1xcXFwnICsgdGhpcy5jb25maWcudGhvdXNhbmRzLCAnZycpO1xuICAgICAgbGV0IHJlc3VsdCA9IHdob2xlLnJlcGxhY2UocmVnZXgsICcnKTtcbiAgICAgIGlmIChkZWNpbWFscyAmJiB0aGlzLmNvbmZpZy5wcmVjaXNpb24gJiYgdGhpcy5jb25maWcuZGVjaW1hbHMpIHtcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0ICsgdGhpcy5jb25maWcuZGVjaW1hbHMgKyBkZWNpbWFscztcbiAgICAgIH1cbiAgICAgIHRoaXMuZGlzcGxheVZhbHVlID0gcmVzdWx0O1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICBrZXlEb3duSGFuZGxlcihlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgY29uc3QgY3VycmVudFZhbHVlID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgaWYgKFxuICAgICAgLy8gQWxsb3cgc3BlY2lhbCBrZXlzXG4gICAgICBbXG4gICAgICAgIGtleWJvYXJkLkxFRlRfQVJST1csXG4gICAgICAgIGtleWJvYXJkLlJJR0hUX0FSUk9XLFxuICAgICAgICBrZXlib2FyZC5CQUNLU1BBQ0UsXG4gICAgICAgIGtleWJvYXJkLkRFTEVURSxcbiAgICAgICAga2V5Ym9hcmQuRU5ELFxuICAgICAgICBrZXlib2FyZC5FTlRFUixcbiAgICAgICAga2V5Ym9hcmQuRVNDQVBFLFxuICAgICAgICBrZXlib2FyZC5IT01FLFxuICAgICAgICBrZXlib2FyZC5UQUIsXG4gICAgICBdLmluZGV4T2YoZS5rZXlDb2RlKSAhPT0gLTFcbiAgICAgIC8vIEFsbG93IEN0cmwra2V5IGFjdGlvbnNcbiAgICAgIHx8IChcbiAgICAgICAgW1xuICAgICAgICAgIGtleWJvYXJkLkEsXG4gICAgICAgICAga2V5Ym9hcmQuQyxcbiAgICAgICAgICBrZXlib2FyZC5SLFxuICAgICAgICAgIGtleWJvYXJkLlYsXG4gICAgICAgICAga2V5Ym9hcmQuWCxcbiAgICAgICAgXS5pbmRleE9mKGUua2V5Q29kZSkgIT09IC0xXG4gICAgICAgICYmIChlLmN0cmxLZXkgPT09IHRydWUgfHwgZS5tZXRhS2V5ID09PSB0cnVlKVxuICAgICAgKVxuICAgICkge1xuICAgICAgcmV0dXJuOyAgLy8gbGV0IGl0IGhhcHBlbiwgZG9uJ3QgZG8gYW55dGhpbmdcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgbWF4TGVuZ3RoXG4gICAgaWYgKFxuICAgICAgdGhpcy5jb25maWcubWF4TGVuZ3RoICE9PSB1bmRlZmluZWRcbiAgICAgICYmIGN1cnJlbnRWYWx1ZS50b1N0cmluZygpLmxlbmd0aCA+PSB0aGlzLmNvbmZpZy5tYXhMZW5ndGhcbiAgICAgICYmIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvbkVuZCAtIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0ID09PSAwXG4gICAgKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIG1pbnVzXG4gICAgaWYgKFxuICAgICAgW2tleWJvYXJkLkRBU0gsIGtleWJvYXJkLk5VTVBBRF9NSU5VU10uaW5kZXhPZihlLmtleUNvZGUpICE9PSAtMVxuICAgICAgJiYgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPT09IDBcbiAgICAgICYmICgodGhpcy5jb25maWcubWluICE9PSB1bmRlZmluZWQgJiYgdGhpcy5jb25maWcubWluIDwgMCkgfHwgdGhpcy5jb25maWcubWluID09PSB1bmRlZmluZWQpXG4gICAgICAmJiBjdXJyZW50VmFsdWUuaW5kZXhPZignLScpID09PSAtMVxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBzZXBhcmF0b3JcbiAgICBpZiAoXG4gICAgICB0aGlzLmNvbmZpZy5wcmVjaXNpb24gPiAwXG4gICAgICAmJiBba2V5Ym9hcmQuQ09NTUEsIGtleWJvYXJkLk5VTVBBRF9QRVJJT0QsIDE5MF0uaW5kZXhPZihlLmtleUNvZGUpICE9PSAtMVxuICAgICAgJiYgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPiAwXG4gICAgICAmJiBjdXJyZW50VmFsdWUubGVuZ3RoXG4gICAgICAmJiBjdXJyZW50VmFsdWUuaW5kZXhPZignLicpID09PSAtMVxuICAgICAgJiYgY3VycmVudFZhbHVlLmluZGV4T2YoJywnKSA9PT0gLTFcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUga2V5IGFmdGVyIHNlcGFyYXRvclxuICAgIGlmIChcbiAgICAgIHRoaXMuY29uZmlnLnByZWNpc2lvbiA+IDBcbiAgICAgICYmIGN1cnJlbnRWYWx1ZS5pbmRleE9mKHRoaXMuY29uZmlnLmRlY2ltYWxzKSA+IC0xXG4gICAgICAmJiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCA+IGN1cnJlbnRWYWx1ZS5pbmRleE9mKHRoaXMuY29uZmlnLmRlY2ltYWxzKVxuICAgICkge1xuICAgICAgY29uc3QgWywgZGVjaW1hbHNdID0gY3VycmVudFZhbHVlLnNwbGl0KHRoaXMuY29uZmlnLmRlY2ltYWxzKTtcbiAgICAgIGlmIChkZWNpbWFscyAmJiBkZWNpbWFscy5sZW5ndGggPj0gdGhpcy5jb25maWcucHJlY2lzaW9uKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBFbnN1cmUgdGhhdCBpdCBpcyBhIG51bWJlciBvciBzdG9wIHRoZSBrZXlwcmVzc1xuICAgIGlmIChcbiAgICAgIChcbiAgICAgICAgKFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIGtleWJvYXJkLlpFUk8sXG4gICAgICAgICAgICBrZXlib2FyZC5PTkUsXG4gICAgICAgICAgICBrZXlib2FyZC5UV08sXG4gICAgICAgICAgICBrZXlib2FyZC5USFJFRSxcbiAgICAgICAgICAgIGtleWJvYXJkLkZPVVIsXG4gICAgICAgICAgICBrZXlib2FyZC5GSVZFLFxuICAgICAgICAgICAga2V5Ym9hcmQuU0lYLFxuICAgICAgICAgICAga2V5Ym9hcmQuU0VWRU4sXG4gICAgICAgICAgICBrZXlib2FyZC5FSUdIVCxcbiAgICAgICAgICAgIGtleWJvYXJkLk5JTkVcbiAgICAgICAgICBdLmluZGV4T2YoZS5rZXlDb2RlKSA9PT0gLTFcbiAgICAgICAgICB8fCBlLnNoaWZ0S2V5XG4gICAgICAgIClcbiAgICAgICAgJiZcbiAgICAgICAgW1xuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9aRVJPLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9PTkUsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX1RXTyxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfVEhSRUUsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX0ZPVVIsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX0ZJVkUsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX1NJWCxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfU0VWRU4sXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX0VJR0hULFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9OSU5FLFxuICAgICAgICBdLmluZGV4T2YoZS5rZXlDb2RlKSA9PT0gLTFcbiAgICAgIClcbiAgICAgIHx8ICh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCA9PT0gMCAmJiBjdXJyZW50VmFsdWUuaW5kZXhPZignLScpID4gLTEpXG4gICAgKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge01vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TnVtZXJpY0RpcmVjdGl2ZX0gZnJvbSAnLi9udW1lcmljLmRpcmVjdGl2ZSc7XG5pbXBvcnQge051bWVyaWNDb25maWdTZXJ2aWNlLCBDdXN0b21OdW1lcmljQ29uZmlnfSBmcm9tICcuL251bWVyaWMtY29uZmlnLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOdW1lcmljRGlyZWN0aXZlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTnVtZXJpY0RpcmVjdGl2ZSxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBMc25OdW1lcmljTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnPzogQ3VzdG9tTnVtZXJpY0NvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTHNuTnVtZXJpY01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBOdW1lcmljQ29uZmlnU2VydmljZSxcbiAgICAgICAge3Byb3ZpZGU6IEN1c3RvbU51bWVyaWNDb25maWcsIHVzZVZhbHVlOiBjb25maWd9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uQ2hhbmdlcywgT3B0aW9uYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMga2V5Ym9hcmQgZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7TmdDb250cm9sfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmNsYXNzIE51bVBhZENvbmZpZyB7XG4gIG1heGxlbmd0aDogbnVtYmVyO1xuICBhbGxvd0xlYWRpbmdaZXJvcyA9IGZhbHNlO1xufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbHNuTnVtUGFkXSdcbn0pXG5leHBvcnQgY2xhc3MgTnVtUGFkRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgbHNuTnVtUGFkID0ge307XG4gIHByb3RlY3RlZCBjb25maWc6IE51bVBhZENvbmZpZztcbiAgcHJpdmF0ZSBkZWZhdWx0Q29uZmlnOiBOdW1QYWRDb25maWcgPSBuZXcgTnVtUGFkQ29uZmlnKCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLCBAT3B0aW9uYWwoKSBwcml2YXRlIG5nQ29udHJvbDogTmdDb250cm9sKSB7XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLmNvbmZpZyA9IE9iamVjdC5hc3NpZ24oey4uLnRoaXMuZGVmYXVsdENvbmZpZywgLi4udGhpcy5sc25OdW1QYWR9KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2lucHV0JywgWyckZXZlbnQnXSlcbiAgaW5wdXRIYW5kbGVyKCRldmVudCkge1xuICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9ICRldmVudC50YXJnZXQudmFsdWU7XG4gICAgdGhpcy5zZXRWYWx1ZSh0aGlzLnBhcnNlTmV3VmFsdWUoY3VycmVudFZhbHVlKSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdibHVyJywgWyckZXZlbnQnXSlcbiAgYmx1ckhhbmRsZXIoJGV2ZW50KSB7XG4gICAgY29uc3QgY3VycmVudFZhbHVlID0gJGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICB0aGlzLnNldFZhbHVlKHRoaXMucGFyc2VOZXdWYWx1ZShjdXJyZW50VmFsdWUsIHRydWUpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzZXRWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh0aGlzLm5nQ29udHJvbCAmJiB0aGlzLm5nQ29udHJvbC5jb250cm9sKSB7XG4gICAgICB0aGlzLm5nQ29udHJvbC5jb250cm9sLnNldFZhbHVlKHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgcGFyc2VOZXdWYWx1ZSh2YWx1ZSwgYmx1ckV2ZW50ID0gZmFsc2UpIHtcbiAgICBsZXQgbmV3VmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9bXjAtOV0vZywgJycpO1xuICAgIGlmIChuZXdWYWx1ZSA9PT0gJycpIHtcbiAgICAgIHJldHVybiBibHVyRXZlbnQgPyAnJyA6IG5ld1ZhbHVlO1xuICAgIH1cbiAgICBpZiAodGhpcy5jb25maWcubWF4bGVuZ3RoICYmIHRoaXMuY29uZmlnLm1heGxlbmd0aCA+IDApIHtcbiAgICAgIG5ld1ZhbHVlID0gbmV3VmFsdWUuc3Vic3RyaW5nKDAsIHRoaXMuY29uZmlnLm1heGxlbmd0aCk7XG4gICAgfVxuICAgIGlmICghdGhpcy5jb25maWcuYWxsb3dMZWFkaW5nWmVyb3MgJiYgYmx1ckV2ZW50KSB7XG4gICAgICBuZXdWYWx1ZSA9IG5ld1ZhbHVlLnJlcGxhY2UoL14wKy8sICcnKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ld1ZhbHVlO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gIGtleURvd25IYW5kbGVyKGU6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgICBpZiAoXG4gICAgICAvLyBBbGxvdyBzcGVjaWFsIGtleXNcbiAgICAgIFtcbiAgICAgICAga2V5Ym9hcmQuTEVGVF9BUlJPVyxcbiAgICAgICAga2V5Ym9hcmQuUklHSFRfQVJST1csXG4gICAgICAgIGtleWJvYXJkLkJBQ0tTUEFDRSxcbiAgICAgICAga2V5Ym9hcmQuREVMRVRFLFxuICAgICAgICBrZXlib2FyZC5FTkQsXG4gICAgICAgIGtleWJvYXJkLkVOVEVSLFxuICAgICAgICBrZXlib2FyZC5FU0NBUEUsXG4gICAgICAgIGtleWJvYXJkLkhPTUUsXG4gICAgICAgIGtleWJvYXJkLlRBQixcbiAgICAgIF0uaW5kZXhPZihlLmtleUNvZGUpICE9PSAtMVxuICAgICAgLy8gQWxsb3cgQ3RybCtrZXkgYWN0aW9uc1xuICAgICAgfHwgKFxuICAgICAgICBbXG4gICAgICAgICAga2V5Ym9hcmQuQSxcbiAgICAgICAgICBrZXlib2FyZC5DLFxuICAgICAgICAgIGtleWJvYXJkLlIsXG4gICAgICAgICAga2V5Ym9hcmQuVixcbiAgICAgICAgICBrZXlib2FyZC5YLFxuICAgICAgICBdLmluZGV4T2YoZS5rZXlDb2RlKSAhPT0gLTFcbiAgICAgICAgJiYgKGUuY3RybEtleSA9PT0gdHJ1ZSB8fCBlLm1ldGFLZXkgPT09IHRydWUpXG4gICAgICApXG4gICAgKSB7XG4gICAgICByZXR1cm47ICAvLyBsZXQgaXQgaGFwcGVuLCBkb24ndCBkbyBhbnl0aGluZ1xuICAgIH1cblxuICAgIC8vIEVuc3VyZSB0aGF0IGl0IGlzIGEgbnVtYmVyIG9yIHN0b3AgdGhlIGtleXByZXNzXG4gICAgaWYgKFxuICAgICAgKFxuICAgICAgICAoXG4gICAgICAgICAgW1xuICAgICAgICAgICAga2V5Ym9hcmQuWkVSTyxcbiAgICAgICAgICAgIGtleWJvYXJkLk9ORSxcbiAgICAgICAgICAgIGtleWJvYXJkLlRXTyxcbiAgICAgICAgICAgIGtleWJvYXJkLlRIUkVFLFxuICAgICAgICAgICAga2V5Ym9hcmQuRk9VUixcbiAgICAgICAgICAgIGtleWJvYXJkLkZJVkUsXG4gICAgICAgICAgICBrZXlib2FyZC5TSVgsXG4gICAgICAgICAgICBrZXlib2FyZC5TRVZFTixcbiAgICAgICAgICAgIGtleWJvYXJkLkVJR0hULFxuICAgICAgICAgICAga2V5Ym9hcmQuTklORVxuICAgICAgICAgIF0uaW5kZXhPZihlLmtleUNvZGUpID09PSAtMVxuICAgICAgICAgIHx8IGUuc2hpZnRLZXlcbiAgICAgICAgKVxuICAgICAgICAmJlxuICAgICAgICBbXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX1pFUk8sXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX09ORSxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfVFdPLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9USFJFRSxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfRk9VUixcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfRklWRSxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfU0lYLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9TRVZFTixcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfRUlHSFQsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX05JTkUsXG4gICAgICAgIF0uaW5kZXhPZihlLmtleUNvZGUpID09PSAtMVxuICAgICAgKVxuICAgICAgfHwgKFxuICAgICAgICBjdXJyZW50VmFsdWUubGVuZ3RoXG4gICAgICAgICYmIHRoaXMuY29uZmlnLm1heGxlbmd0aCAmJiB0aGlzLmNvbmZpZy5tYXhsZW5ndGggPiAwXG4gICAgICAgICYmIGN1cnJlbnRWYWx1ZS5sZW5ndGggPj0gdGhpcy5jb25maWcubWF4bGVuZ3RoXG4gICAgICApXG4gICAgKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TnVtUGFkRGlyZWN0aXZlfSBmcm9tICcuL251bXBhZC5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOdW1QYWREaXJlY3RpdmUsXG4gIF0sXG4gIGltcG9ydHM6IFtdLFxuICBleHBvcnRzOiBbXG4gICAgTnVtUGFkRGlyZWN0aXZlLFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIExzbk51bXBhZE1vZHVsZSB7XG59XG4iLCJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TmdNb2RlbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuZ01vZGVsXVtsc25MYXRpblRvR3JlZWtdJyxcbiAgcHJvdmlkZXJzOiBbTmdNb2RlbF1cbn0pXG5leHBvcnQgY2xhc3MgTGF0aW5Ub0dyZWVrRGlyZWN0aXZlIHtcblxuICBwcml2YXRlIGxhdGluVG9HcmVlayA9IFtcbiAgICBbL0EvaWcsICfDjsKRJ10sXG4gICAgWy9CL2lnLCAnw47CkiddLFxuICAgIFsvRy9pZywgJ8OOwpMnXSxcbiAgICBbL0QvaWcsICfDjsKUJ10sXG4gICAgWy9FL2lnLCAnw47ClSddLFxuICAgIFsvWi9pZywgJ8OOwpYnXSxcbiAgICBbL0gvaWcsICfDjsKXJ10sXG4gICAgWy9VL2lnLCAnw47CmCddLFxuICAgIFsvSS9pZywgJ8OOwpknXSxcbiAgICBbL0svaWcsICfDjsKaJ10sXG4gICAgWy9ML2lnLCAnw47CmyddLFxuICAgIFsvTS9pZywgJ8OOwpwnXSxcbiAgICBbL04vaWcsICfDjsKdJ10sXG4gICAgWy9KL2lnLCAnw47CniddLFxuICAgIFsvTy9pZywgJ8OOwp8nXSxcbiAgICBbL1AvaWcsICfDjsKgJ10sXG4gICAgWy9SL2lnLCAnw47CoSddLFxuICAgIFsvUy9pZywgJ8OOwqMnXSxcbiAgICBbL1QvaWcsICfDjsKkJ10sXG4gICAgWy9ZL2lnLCAnw47CpSddLFxuICAgIFsvRi9pZywgJ8OOwqYnXSxcbiAgICBbL1gvaWcsICfDjsKnJ10sXG4gICAgWy9DL2lnLCAnw47CqCddLFxuICAgIFsvVi9pZywgJ8OOwqknXSxcbiAgICBbL1cvaWcsICdXJ10sXG4gICAgWy9RL2lnLCAnUSddXG4gIF07XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RlbDogTmdNb2RlbCwgcHJpdmF0ZSBlbDogRWxlbWVudFJlZikge1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRDYXJldCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhcnQ6IHRoaXMuZWwubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCxcbiAgICAgIGVuZDogdGhpcy5lbC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvbkVuZCxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRDYXJldChzdGFydCwgZW5kKSB7XG4gICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0ID0gc3RhcnQ7XG4gICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvbkVuZCA9IGVuZDtcbiAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG5cbiAgQEhvc3RMaXN0ZW5lcignbmdNb2RlbENoYW5nZScsIFsnJGV2ZW50J10pXG4gIG9uSW5wdXRDaGFuZ2UoJGV2ZW50KSB7XG4gICAgY29uc3Qge3N0YXJ0LCBlbmR9ID0gdGhpcy5nZXRDYXJldCgpO1xuXG4gICAgbGV0IHRyYW5zbGF0ZWQgPSAkZXZlbnQudG9Mb2NhbGVVcHBlckNhc2UoKTtcbiAgICB0aGlzLmxhdGluVG9HcmVlay5mb3JFYWNoKHJlcGxhY2UgPT4ge1xuICAgICAgdHJhbnNsYXRlZCA9IHRyYW5zbGF0ZWQucmVwbGFjZShyZXBsYWNlWzBdLCByZXBsYWNlWzFdKTtcbiAgICB9KTtcbiAgICB0aGlzLm1vZGVsLnZhbHVlQWNjZXNzb3Iud3JpdGVWYWx1ZSh0cmFuc2xhdGVkKTtcbiAgICB0aGlzLnNldENhcmV0KHN0YXJ0LCBlbmQpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtMYXRpblRvR3JlZWtEaXJlY3RpdmV9IGZyb20gJy4vbGF0aW4tdG8tZ3JlZWsuZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTGF0aW5Ub0dyZWVrRGlyZWN0aXZlLFxuICBdLFxuICBpbXBvcnRzOiBbXSxcbiAgZXhwb3J0czogW1xuICAgIExhdGluVG9HcmVla0RpcmVjdGl2ZSxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBMc25MYXRpblRvR3JlZWtNb2R1bGUge1xufVxuIiwiaW1wb3J0IHtEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05nTW9kZWx9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW25nTW9kZWxdW2xzbkNhcGl0YWxpemVdJyxcbiAgcHJvdmlkZXJzOiBbTmdNb2RlbF1cbn0pXG5leHBvcnQgY2xhc3MgQ2FwaXRhbGl6ZURpcmVjdGl2ZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbW9kZWw6IE5nTW9kZWwpIHtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ25nTW9kZWxDaGFuZ2UnLCBbJyRldmVudCddKVxuICBvbklucHV0Q2hhbmdlKCRldmVudCkge1xuICAgIHRoaXMubW9kZWwudmFsdWVBY2Nlc3Nvci53cml0ZVZhbHVlKCRldmVudC50b0xvY2FsZVVwcGVyQ2FzZSgpKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q2FwaXRhbGl6ZURpcmVjdGl2ZX0gZnJvbSAnLi9jYXBpdGFsaXplLmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIENhcGl0YWxpemVEaXJlY3RpdmUsXG4gIF0sXG4gIGltcG9ydHM6IFtdLFxuICBleHBvcnRzOiBbXG4gICAgQ2FwaXRhbGl6ZURpcmVjdGl2ZSxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBMc25DYXBpdGFsaXplTW9kdWxlIHtcbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBGb3JtQ29udHJvbCwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7RXJyb3JTdGF0ZU1hdGNoZXIsIE1hdFNlbGVjdH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHtET1dOX0FSUk9XLCBFTkQsIEVOVEVSLCBIT01FLCBVUF9BUlJPV30gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7U3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge3Rha2VVbnRpbH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vKiB0c2xpbnQ6ZGlzYWJsZTpuby11c2UtYmVmb3JlLWRlY2xhcmUgKi9cbmV4cG9ydCBjb25zdCBDVVNUT01fU0VMRUNUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1hdFNlbGVjdENvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuLyogdHNsaW50OmVuYWJsZTpuby11c2UtYmVmb3JlLWRlY2xhcmUgKi9cblxuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbmNvbnN0IFNFTEVDVF9TRUFSQ0hBQkxFX01JTl9MSU1JVCA9IDg7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xzbi1tYXQtc2VsZWN0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL21hdC1zZWxlY3QuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9tYXQtc2VsZWN0LmNvbXBvbmVudC5zY3NzJ10sXG4gIHByb3ZpZGVyczogW0NVU1RPTV9TRUxFQ1RfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLkVtdWxhdGVkXG59KVxuZXhwb3J0IGNsYXNzIE1hdFNlbGVjdENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgQElucHV0KCkgY29udHJvbDogRm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woKTtcbiAgQElucHV0KCkgb3B0aW9uczogYW55W10gPSBbXTtcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgQElucHV0KCkgYmluZExhYmVsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGJpbmRCeTogc3RyaW5nO1xuICBASW5wdXQoKSBiaW5kVmFsdWU6IHN0cmluZztcbiAgQElucHV0KCkgY2xlYXIgPSB0cnVlO1xuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBtdWx0aXBsZSA9IGZhbHNlO1xuICBASW5wdXQoKSBlcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXI7XG4gIEBJbnB1dCgpIGVycm9yczogYW55W10gPSBbXTtcblxuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSBvcHRpb25UZW1wbGF0ZTtcbiAgQFZpZXdDaGlsZChNYXRTZWxlY3QpIG1hdFNlbGVjdDtcbiAgQFZpZXdDaGlsZCgnc2VhcmNoSW5wdXQnKSBzZWFyY2hJbnB1dDtcblxuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3QoKTtcbiAgcHJpdmF0ZSBwYW5lbENsb3NlZCQgPSBuZXcgU3ViamVjdCgpO1xuICBwcml2YXRlIG9wdGlvbkNoYW5nZXMkID0gbmV3IFN1YmplY3QoKTtcbiAgcHJpdmF0ZSBzZWxlY3RlZE9wdGlvbnM6IGFueVtdID0gW107XG4gIHB1YmxpYyBmaWx0ZXJlZE9wdGlvbnM6IGFueVtdO1xuICBwdWJsaWMgc2VhcmNoVGVybSA9ICcnO1xuICBwcml2YXRlIF9vblRvdWNoZWQ6ICgpID0+IHZvaWQgPSBub29wO1xuICBwcml2YXRlIF9vbkNoYW5nZTogKHZhbHVlKSA9PiB2b2lkO1xuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucmVzZXRPcHRpb25zKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLmhhbmRsZURpc2FibGVkKCk7XG4gICAgdGhpcy5yZXNldE9wdGlvbnMoKTtcbiAgICB0aGlzLndyaXRlVmFsdWUodGhpcy5jb250cm9sLnZhbHVlKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICB9XG5cbiAgb25CbHVyKCkge1xuICAgIHRoaXMuX29uVG91Y2hlZCgpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKCF0aGlzLm11bHRpcGxlKSB7XG4gICAgICB0aGlzLnNldFNpbmdsZVZhbHVlKHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubXVsdGlwbGUgJiYgQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHRoaXMuc2V0TXVsdGlwbGVWYWx1ZSh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgc2V0U2luZ2xlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgY29uc29sZS53YXJuKCdbYXBwLXNlbGVjdF0gR2l2ZW4gdmFsdWUgaXMgYW4gYXJyYXkuIFNob3VsZCBgbXVsdGlwbGUgPSB0cnVlYD8nKTtcbiAgICB9XG4gICAgY29uc3QgY29ycmVzcG9uZGluZ09wdGlvbiA9IHRoaXMuZmluZE9wdGlvbih2YWx1ZSk7XG4gICAgdGhpcy5jaGFuZ2VWYWx1ZShjb3JyZXNwb25kaW5nT3B0aW9uKTtcbiAgfVxuXG4gIHNldE11bHRpcGxlVmFsdWUodmFsdWVzOiBhbnlbXSkge1xuICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25zID0gW107XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWVzKSkge1xuICAgICAgdmFsdWVzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGNvbnN0IGNvcnJlc3BvbmRpbmdPcHRpb24gPSB0aGlzLmZpbmRPcHRpb24oaXRlbSk7XG4gICAgICAgIGlmIChjb3JyZXNwb25kaW5nT3B0aW9uKSB7XG4gICAgICAgICAgdGhpcy5oYW5kbGVPcHRpb25TZWxlY3Rpb24oe1xuICAgICAgICAgICAgc2VsZWN0ZWQ6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogY29ycmVzcG9uZGluZ09wdGlvblxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5jaGFuZ2VWYWx1ZSh0aGlzLnNlbGVjdGVkT3B0aW9ucyk7XG4gIH1cblxuICBmaW5kT3B0aW9uKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgfHwgdmFsdWUgPT09IDAgfHwgdmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICBjb25zdCByZXN1bHQgPSB0aGlzLm9wdGlvbnMuZmluZCgob3B0aW9uKSA9PiB0aGlzLmJpbmRWYWx1ZVxuICAgICAgICA/IG9wdGlvblt0aGlzLmJpbmRWYWx1ZV0gPT09IHZhbHVlXG4gICAgICAgIDogdGhpcy5iaW5kQnlcbiAgICAgICAgICA/IG9wdGlvblt0aGlzLmJpbmRCeV0gPT09IHZhbHVlW3RoaXMuYmluZEJ5XVxuICAgICAgICAgIDogb3B0aW9uID09PSB2YWx1ZVxuICAgICAgKTtcbiAgICAgIHJldHVybiByZXN1bHQgfHwgdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBjaGFuZ2VWYWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuY29udHJvbC5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgaWYgKHRoaXMuX29uQ2hhbmdlKSB7XG4gICAgICBpZiAoIXRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgdGhpcy5fb25DaGFuZ2UodGhpcy5wYXJzZVZhbHVlKHZhbHVlKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLm1hcChpdGVtID0+IHRoaXMucGFyc2VWYWx1ZShpdGVtKSkgOiB2YWx1ZTtcbiAgICAgICAgdGhpcy5fb25DaGFuZ2UocmVzdWx0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwYXJzZVZhbHVlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdGhpcy5iaW5kVmFsdWUgPyB2YWx1ZVt0aGlzLmJpbmRWYWx1ZV0gOiB2YWx1ZTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMuX29uQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5fb25Ub3VjaGVkID0gZm47XG4gIH1cblxuICBiaW5kT3B0aW9uU2VsZWN0aW9uQ2hhbmdlcygpIHtcbiAgICB0aGlzLm1hdFNlbGVjdC5vcHRpb25TZWxlY3Rpb25DaGFuZ2VzXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5vcHRpb25DaGFuZ2VzJCB8fCB0aGlzLmRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgY29uc3Qge2lzVXNlcklucHV0LCBzb3VyY2V9ID0gcmVzO1xuICAgICAgICBpZiAoaXNVc2VySW5wdXQpIHtcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmhhbmRsZU9wdGlvblNlbGVjdGlvbihzb3VyY2UpO1xuICAgICAgICAgIGlmICghdGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTaW5nbGVWYWx1ZShyZXN1bHQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldE11bHRpcGxlVmFsdWUodGhpcy5zZWxlY3RlZE9wdGlvbnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgfVxuXG4gIGhhbmRsZU9wdGlvblNlbGVjdGlvbihldmVudCkge1xuICAgIGNvbnN0IHt2YWx1ZSwgc2VsZWN0ZWR9ID0gZXZlbnQ7XG4gICAgaWYgKCF0aGlzLm11bHRpcGxlKSB7XG4gICAgICByZXR1cm4gc2VsZWN0ZWRcbiAgICAgICAgPyB0aGlzLnBhcnNlVmFsdWUodmFsdWUpXG4gICAgICAgIDogdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvbnMucHVzaCh2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBfcmVtb3ZlKHRoaXMuc2VsZWN0ZWRPcHRpb25zLCAoaXRlbSkgPT4ge1xuICAgICAgICAvLyAgIHJldHVybiB0aGlzLmJpbmRWYWx1ZSA/IGl0ZW1bdGhpcy5iaW5kVmFsdWVdID09PSB2YWx1ZVt0aGlzLmJpbmRWYWx1ZV0gOiBpdGVtID09PSB2YWx1ZTtcbiAgICAgICAgLy8gfSk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25zID0gdGhpcy5zZWxlY3RlZE9wdGlvbnMuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuYmluZFZhbHVlID8gaXRlbVt0aGlzLmJpbmRWYWx1ZV0gIT09IHZhbHVlW3RoaXMuYmluZFZhbHVlXSA6IGl0ZW0gIT09IHZhbHVlO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuc2VsZWN0ZWRPcHRpb25zLm1hcChpdGVtID0+IHRoaXMucGFyc2VWYWx1ZShpdGVtKSk7XG4gICAgICByZXR1cm4gQXJyYXkuaXNBcnJheShyZXN1bHQpICYmIHJlc3VsdC5sZW5ndGggPyByZXN1bHQgOiB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgcmVzZXRPcHRpb25zKCkge1xuICAgIHRoaXMuc2VhcmNoVGVybSA9ICcnO1xuICAgIHRoaXMuZmlsdGVyZWRPcHRpb25zID0gWy4uLnRoaXMub3B0aW9uc107XG4gICAgdGhpcy5vcHRpb25DaGFuZ2VzJC5uZXh0KCk7XG4gICAgdGhpcy5iaW5kT3B0aW9uU2VsZWN0aW9uQ2hhbmdlcygpO1xuICB9XG5cbiAgY2xlYXJWYWx1ZSgkZXZlbnQpIHtcbiAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5zZWxlY3RlZE9wdGlvbnMgPSBbXTtcbiAgICB0aGlzLmNoYW5nZVZhbHVlKHVuZGVmaW5lZCk7XG4gIH1cblxuICBmaWx0ZXJPcHRpb25zKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLnNlYXJjaFRlcm0pIHtcbiAgICAgIHRoaXMuc2VhcmNoVGVybSA9IHZhbHVlO1xuICAgICAgdGhpcy5maWx0ZXJlZE9wdGlvbnMgPVxuICAgICAgICB0aGlzLm9wdGlvbnMuZmlsdGVyKGl0ZW0gPT4ge1xuICAgICAgICAgIGlmICh0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLnRvTG9jYWxlVXBwZXJDYXNlKCkuaW5kZXhPZih0aGlzLnNlYXJjaFRlcm0udG9Mb2NhbGVVcHBlckNhc2UoKSkgIT09IC0xO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBvcHRpb25WYWx1ZXMgPSBPYmplY3QudmFsdWVzKGl0ZW0pO1xuICAgICAgICAgIHJldHVybiBvcHRpb25WYWx1ZXMuc29tZSgob3B0aW9uVmFsdWU6IHN0cmluZykgPT5cbiAgICAgICAgICAgIHR5cGVvZiBvcHRpb25WYWx1ZSA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgICYmIG9wdGlvblZhbHVlLnRvTG9jYWxlVXBwZXJDYXNlKCkuaW5kZXhPZih0aGlzLnNlYXJjaFRlcm0udG9Mb2NhbGVVcHBlckNhc2UoKSkgPiAtMSk7XG4gICAgICAgIH0pO1xuICAgICAgdGhpcy5tYXRTZWxlY3QuX2tleU1hbmFnZXIuc2V0Rmlyc3RJdGVtQWN0aXZlKCk7XG5cbiAgICAgIHRoaXMub3B0aW9uQ2hhbmdlcyQubmV4dCgpO1xuICAgICAgdGhpcy5iaW5kT3B0aW9uU2VsZWN0aW9uQ2hhbmdlcygpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBpc1NlYXJjaEVuYWJsZWQoKSB7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodGhpcy5vcHRpb25zKSAmJiB0aGlzLm9wdGlvbnMubGVuZ3RoID4gU0VMRUNUX1NFQVJDSEFCTEVfTUlOX0xJTUlUO1xuICB9XG5cbiAgZ2V0IGlzQ2xlYXJFbmFibGVkKCkge1xuICAgIHJldHVybiB0aGlzLmNsZWFyICYmIHRoaXMuY29udHJvbC52YWx1ZSAmJiAhdGhpcy5kaXNhYmxlZFxuICAgICAgJiYgKFxuICAgICAgICAodGhpcy5tdWx0aXBsZSAmJiBBcnJheS5pc0FycmF5KHRoaXMuY29udHJvbC52YWx1ZSkgJiYgdGhpcy5jb250cm9sLnZhbHVlLmxlbmd0aClcbiAgICAgICAgfHwgIXRoaXMubXVsdGlwbGVcbiAgICAgICk7XG4gIH1cblxuICBoYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKHRoaXMuaXNTZWFyY2hFbmFibGVkICYmIFtET1dOX0FSUk9XLCBFTkQsIEVOVEVSLCBIT01FLCBVUF9BUlJPV10uaW5kZXhPZihldmVudC5rZXlDb2RlKSA9PT0gLTEpIHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZURpc2FibGVkKCkge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLmNvbnRyb2wuZGlzYWJsZSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmNvbnRyb2wuZW5hYmxlKCk7XG4gIH1cblxuICBzY3JvbGxUb0FjdGl2ZUl0ZW0oKSB7XG4gICAgY29uc3QgYWN0aXZlSXRlbSA9IHRoaXMubWF0U2VsZWN0Ll9rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW07XG4gICAgaWYgKCFhY3RpdmVJdGVtKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG9wdGlvbiA9IGFjdGl2ZUl0ZW0uX2VsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCBwYXJlbnQgPSBvcHRpb24ucGFyZW50Tm9kZTtcbiAgICBpZiAob3B0aW9uLm9mZnNldFRvcCArIG9wdGlvbi5vZmZzZXRIZWlnaHQgPiBwYXJlbnQuc2Nyb2xsVG9wICsgcGFyZW50Lm9mZnNldEhlaWdodCkge1xuICAgICAgcGFyZW50LnNjcm9sbFRvcCA9IG9wdGlvbi5vZmZzZXRUb3AgLSBwYXJlbnQub2Zmc2V0SGVpZ2h0ICsgb3B0aW9uLm9mZnNldEhlaWdodDtcbiAgICB9IGVsc2UgaWYgKG9wdGlvbi5vZmZzZXRUb3AgPCBwYXJlbnQuc2Nyb2xsVG9wKSB7XG4gICAgICBwYXJlbnQuc2Nyb2xsVG9wID0gb3B0aW9uLm9mZnNldFRvcDtcbiAgICB9XG4gIH1cblxuICBvcGVuZWRDaGFuZ2UoaXNPcGVuKSB7XG4gICAgaWYgKGlzT3Blbikge1xuICAgICAgaWYgKHRoaXMuaXNTZWFyY2hFbmFibGVkKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoSW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgfVxuICAgICAgdGhpcy5vcHRpb25DaGFuZ2VzJC5uZXh0KCk7XG4gICAgICB0aGlzLmJpbmRPcHRpb25TZWxlY3Rpb25DaGFuZ2VzKCk7XG4gICAgICB0aGlzLnNjcm9sbFRvQWN0aXZlSXRlbSgpO1xuICAgICAgY29uc3Qga2V5TWFuYWdlckNoYW5nZSA9IHRoaXMubWF0U2VsZWN0Ll9rZXlNYW5hZ2VyLmNoYW5nZTtcbiAgICAgIGtleU1hbmFnZXJDaGFuZ2VcbiAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMucGFuZWxDbG9zZWQkKSlcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5zY3JvbGxUb0FjdGl2ZUl0ZW0oKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGFuZWxDbG9zZWQkLm5leHQoKTtcbiAgICAgIHRoaXMucmVzZXRPcHRpb25zKCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Rm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7QnJvd3Nlck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge1xuICBNYXRJY29uTW9kdWxlLFxuICBNYXRJbnB1dE1vZHVsZSxcbiAgTWF0U2VsZWN0TW9kdWxlLFxuICBNYXRUb29sdGlwTW9kdWxlXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7TWF0U2VsZWN0Q29tcG9uZW50fSBmcm9tICcuL21hdC1zZWxlY3QuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTWF0U2VsZWN0Q29tcG9uZW50LFxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgQnJvd3Nlck1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxuICAgIE1hdFRvb2x0aXBNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE1hdFNlbGVjdENvbXBvbmVudCxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBMc25NYXRTZWxlY3RNb2R1bGUge1xufVxuIiwiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0xzbk51bWVyaWNNb2R1bGV9IGZyb20gJy4vZGlyZWN0aXZlcy9udW1lcmljL251bWVyaWMubW9kdWxlJztcbmltcG9ydCB7THNuTnVtcGFkTW9kdWxlfSBmcm9tICcuL2RpcmVjdGl2ZXMvbnVtcGFkL251bXBhZC5tb2R1bGUnO1xuaW1wb3J0IHtMc25MYXRpblRvR3JlZWtNb2R1bGV9IGZyb20gJy4vZGlyZWN0aXZlcy9sYXRpbi10by1ncmVlay9sYXRpbi10by1ncmVlay5tb2R1bGUnO1xuaW1wb3J0IHtMc25DYXBpdGFsaXplTW9kdWxlfSBmcm9tICcuL2RpcmVjdGl2ZXMvY2FwaXRhbGl6ZS9jYXBpdGFsaXplLm1vZHVsZSc7XG5cbmltcG9ydCB7THNuTWF0U2VsZWN0TW9kdWxlfSBmcm9tICcuL2NvbXBvbmVudHMvbWF0LXNlbGVjdC9tYXQtc2VsZWN0Lm1vZHVsZSc7XG5pbXBvcnQge0Zvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW10sXG4gIGltcG9ydHM6IFtcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBMc25DYXBpdGFsaXplTW9kdWxlLFxuICAgIExzbkxhdGluVG9HcmVla01vZHVsZSxcbiAgICBMc25OdW1lcmljTW9kdWxlLmZvclJvb3Qoe1xuICAgICAgZGVmYXVsdDoge1xuICAgICAgICBkZWNpbWFsczogJy4nLFxuICAgICAgICBwcmVjaXNpb246IDQsXG4gICAgICB9LFxuICAgICAgY3VzdG9tOiB7XG4gICAgICAgIGN1cnJlbmN5OiB7XG4gICAgICAgICAgZGVjaW1hbHM6ICcsJyxcbiAgICAgICAgICB0aG91c2FuZHM6ICcgJyxcbiAgICAgICAgICBwcmVjaXNpb246IDIsXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KSxcblxuICAgIExzbk51bXBhZE1vZHVsZSxcbiAgICBMc25NYXRTZWxlY3RNb2R1bGUsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBMc25DYXBpdGFsaXplTW9kdWxlLFxuICAgIExzbkxhdGluVG9HcmVla01vZHVsZSxcbiAgICBMc25OdW1lcmljTW9kdWxlLFxuICAgIExzbk51bXBhZE1vZHVsZSxcbiAgICBMc25NYXRTZWxlY3RNb2R1bGUsXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTHNuTGlic01vZHVsZSB7XG59XG4iXSwibmFtZXMiOlsiSW5qZWN0YWJsZSIsIk5HX1ZBTFVFX0FDQ0VTU09SIiwiZm9yd2FyZFJlZiIsImtleWJvYXJkLkxFRlRfQVJST1ciLCJrZXlib2FyZC5SSUdIVF9BUlJPVyIsImtleWJvYXJkLkJBQ0tTUEFDRSIsImtleWJvYXJkLkRFTEVURSIsImtleWJvYXJkLkVORCIsImtleWJvYXJkLkVOVEVSIiwia2V5Ym9hcmQuRVNDQVBFIiwia2V5Ym9hcmQuSE9NRSIsImtleWJvYXJkLlRBQiIsImtleWJvYXJkLkEiLCJrZXlib2FyZC5DIiwia2V5Ym9hcmQuUiIsImtleWJvYXJkLlYiLCJrZXlib2FyZC5YIiwia2V5Ym9hcmQuREFTSCIsImtleWJvYXJkLk5VTVBBRF9NSU5VUyIsImtleWJvYXJkLkNPTU1BIiwia2V5Ym9hcmQuTlVNUEFEX1BFUklPRCIsImtleWJvYXJkLlpFUk8iLCJrZXlib2FyZC5PTkUiLCJrZXlib2FyZC5UV08iLCJrZXlib2FyZC5USFJFRSIsImtleWJvYXJkLkZPVVIiLCJrZXlib2FyZC5GSVZFIiwia2V5Ym9hcmQuU0lYIiwia2V5Ym9hcmQuU0VWRU4iLCJrZXlib2FyZC5FSUdIVCIsImtleWJvYXJkLk5JTkUiLCJrZXlib2FyZC5OVU1QQURfWkVSTyIsImtleWJvYXJkLk5VTVBBRF9PTkUiLCJrZXlib2FyZC5OVU1QQURfVFdPIiwia2V5Ym9hcmQuTlVNUEFEX1RIUkVFIiwia2V5Ym9hcmQuTlVNUEFEX0ZPVVIiLCJrZXlib2FyZC5OVU1QQURfRklWRSIsImtleWJvYXJkLk5VTVBBRF9TSVgiLCJrZXlib2FyZC5OVU1QQURfU0VWRU4iLCJrZXlib2FyZC5OVU1QQURfRUlHSFQiLCJrZXlib2FyZC5OVU1QQURfTklORSIsIkRpcmVjdGl2ZSIsIkVsZW1lbnRSZWYiLCJJbnB1dCIsIkhvc3RMaXN0ZW5lciIsIk5nTW9kdWxlIiwiTmdDb250cm9sIiwiT3B0aW9uYWwiLCJOZ01vZGVsIiwiRm9ybUNvbnRyb2wiLCJTdWJqZWN0IiwidGFrZVVudGlsIiwiRE9XTl9BUlJPVyIsIkVORCIsIkVOVEVSIiwiSE9NRSIsIlVQX0FSUk9XIiwiQ29tcG9uZW50IiwiVmlld0VuY2Fwc3VsYXRpb24iLCJDb250ZW50Q2hpbGQiLCJUZW1wbGF0ZVJlZiIsIlZpZXdDaGlsZCIsIk1hdFNlbGVjdCIsIkJyb3dzZXJNb2R1bGUiLCJGb3Jtc01vZHVsZSIsIlJlYWN0aXZlRm9ybXNNb2R1bGUiLCJNYXRJY29uTW9kdWxlIiwiTWF0SW5wdXRNb2R1bGUiLCJNYXRTZWxlY3RNb2R1bGUiLCJNYXRUb29sdGlwTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7SUFBQTs7Ozs7Ozs7Ozs7Ozs7QUFjQSxJQWVPLElBQUksUUFBUSxHQUFHO1FBQ2xCLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFJLFNBQVMsUUFBUSxDQUFDLENBQUM7WUFDM0MsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFF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RyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUFDLFNBQVM7d0JBQ2pELEtBQUssQ0FBQzs0QkFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQzs0QkFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDOzRCQUFDLFNBQVM7d0JBQ2pEOzRCQUNJLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQ0FBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dDQUFDLFNBQVM7NkJBQUU7NEJBQzVHLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dDQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUFDLE1BQU07NkJBQUU7NEJBQ3RGLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQ0FBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dDQUFDLE1BQU07NkJBQUU7NEJBQ3JFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FB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