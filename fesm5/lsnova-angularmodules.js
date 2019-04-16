import { Injectable, Directive, ElementRef, forwardRef, HostListener, Input, NgModule, Optional, Component, ContentChild, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { __spread, __awaiter, __generator, __assign, __read } from 'tslib';
import { DOWN_ARROW, END, ENTER, HOME, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, BACKSPACE, DELETE, ESCAPE, TAB, A, C, R, V, X, DASH, NUMPAD_MINUS, COMMA, NUMPAD_PERIOD, ZERO, ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE, NUMPAD_ZERO, NUMPAD_ONE, NUMPAD_TWO, NUMPAD_THREE, NUMPAD_FOUR, NUMPAD_FIVE, NUMPAD_SIX, NUMPAD_SEVEN, NUMPAD_EIGHT, NUMPAD_NINE } from '@angular/cdk/keycodes';
import { NG_VALUE_ACCESSOR, NgControl, NgModel, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelect, MatIconModule, MatInputModule, MatSelectModule, MatTooltipModule } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BrowserModule } from '@angular/platform-browser';

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
        return this.config.custom[key] || {};
    };
    NumericConfigService.decorators = [
        { type: Injectable }
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
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return NumericDirective; }),
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
            LEFT_ARROW,
            RIGHT_ARROW,
            BACKSPACE,
            DELETE,
            END,
            ENTER,
            ESCAPE,
            HOME,
            TAB,
        ].indexOf(e.keyCode) !== -1
            // Allow Ctrl+key actions
            || ([
                A,
                C,
                R,
                V,
                X,
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
        if ([DASH, NUMPAD_MINUS].indexOf(e.keyCode) !== -1
            && this.element.nativeElement.selectionStart === 0
            && ((this.config.min !== undefined && this.config.min < 0) || this.config.min === undefined)
            && currentValue.indexOf('-') === -1) {
            return;
        }
        // Handle separator
        if (this.config.precision > 0
            && [COMMA, NUMPAD_PERIOD, 190].indexOf(e.keyCode) !== -1
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
            ZERO,
            ONE,
            TWO,
            THREE,
            FOUR,
            FIVE,
            SIX,
            SEVEN,
            EIGHT,
            NINE
        ].indexOf(e.keyCode) === -1
            || e.shiftKey)
            &&
                [
                    NUMPAD_ZERO,
                    NUMPAD_ONE,
                    NUMPAD_TWO,
                    NUMPAD_THREE,
                    NUMPAD_FOUR,
                    NUMPAD_FIVE,
                    NUMPAD_SIX,
                    NUMPAD_SEVEN,
                    NUMPAD_EIGHT,
                    NUMPAD_NINE,
                ].indexOf(e.keyCode) === -1)
            || (this.element.nativeElement.selectionStart === 0 && currentValue.indexOf('-') > -1)) {
            e.preventDefault();
        }
    };
    NumericDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[lsnNumeric][ngModel]',
                    providers: [CUSTOM_SELECT_VALUE_ACCESSOR]
                },] }
    ];
    /** @nocollapse */
    NumericDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NumericConfigService }
    ]; };
    NumericDirective.propDecorators = {
        lsnNumeric: [{ type: Input }],
        inputHandler: [{ type: HostListener, args: ['input', ['$event'],] }],
        focusHandler: [{ type: HostListener, args: ['focus', ['$event'],] }],
        blurHandler: [{ type: HostListener, args: ['blur', ['$event'],] }],
        keyDownHandler: [{ type: HostListener, args: ['keydown', ['$event'],] }]
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
        { type: NgModule, args: [{
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
            LEFT_ARROW,
            RIGHT_ARROW,
            BACKSPACE,
            DELETE,
            END,
            ENTER,
            ESCAPE,
            HOME,
            TAB,
        ].indexOf(e.keyCode) !== -1
            // Allow Ctrl+key actions
            || ([
                A,
                C,
                R,
                V,
                X,
            ].indexOf(e.keyCode) !== -1
                && (e.ctrlKey === true || e.metaKey === true))) {
            return; // let it happen, don't do anything
        }
        // Ensure that it is a number or stop the keypress
        if ((([
            ZERO,
            ONE,
            TWO,
            THREE,
            FOUR,
            FIVE,
            SIX,
            SEVEN,
            EIGHT,
            NINE
        ].indexOf(e.keyCode) === -1
            || e.shiftKey)
            &&
                [
                    NUMPAD_ZERO,
                    NUMPAD_ONE,
                    NUMPAD_TWO,
                    NUMPAD_THREE,
                    NUMPAD_FOUR,
                    NUMPAD_FIVE,
                    NUMPAD_SIX,
                    NUMPAD_SEVEN,
                    NUMPAD_EIGHT,
                    NUMPAD_NINE,
                ].indexOf(e.keyCode) === -1)
            || (currentValue.length
                && this.config.maxlength && this.config.maxlength > 0
                && currentValue.length >= this.config.maxlength)) {
            e.preventDefault();
        }
    };
    NumPadDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[lsnNumPad]'
                },] }
    ];
    /** @nocollapse */
    NumPadDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgControl, decorators: [{ type: Optional }] }
    ]; };
    NumPadDirective.propDecorators = {
        lsnNumPad: [{ type: Input }],
        inputHandler: [{ type: HostListener, args: ['input', ['$event'],] }],
        blurHandler: [{ type: HostListener, args: ['blur', ['$event'],] }],
        keyDownHandler: [{ type: HostListener, args: ['keydown', ['$event'],] }]
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
        { type: NgModule, args: [{
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
        { type: Directive, args: [{
                    selector: '[ngModel][lsnLatinToGreek]',
                    providers: [NgModel]
                },] }
    ];
    /** @nocollapse */
    LatinToGreekDirective.ctorParameters = function () { return [
        { type: NgModel },
        { type: ElementRef }
    ]; };
    LatinToGreekDirective.propDecorators = {
        onInputChange: [{ type: HostListener, args: ['ngModelChange', ['$event'],] }]
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
        { type: NgModule, args: [{
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
        { type: Directive, args: [{
                    selector: '[ngModel][lsnCapitalize]',
                    providers: [NgModel]
                },] }
    ];
    /** @nocollapse */
    CapitalizeDirective.ctorParameters = function () { return [
        { type: NgModel }
    ]; };
    CapitalizeDirective.propDecorators = {
        onInputChange: [{ type: HostListener, args: ['ngModelChange', ['$event'],] }]
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
        { type: NgModule, args: [{
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
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MatSelectComponent; }),
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
        this.control = new FormControl();
        this.options = [];
        this.clear = true;
        this.disabled = false;
        this.multiple = false;
        this.errors = [];
        this.destroy$ = new Subject();
        this.panelClosed$ = new Subject();
        this.optionChanges$ = new Subject();
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
            .pipe(takeUntil(this.optionChanges$ || this.destroy$))
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
        if (this.isSearchEnabled && [DOWN_ARROW, END, ENTER, HOME, UP_ARROW].indexOf(event.keyCode) === -1) {
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
                .pipe(takeUntil(this.panelClosed$))
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
        { type: Component, args: [{
                    selector: 'lsn-mat-select',
                    template: "<mat-form-field>\n    <mat-select\n        [formControl]=\"control\"\n        [placeholder]=\"placeholder\"\n        [errorStateMatcher]=\"errorStateMatcher\"\n        [multiple]=\"multiple\"\n        [disableOptionCentering]=\"true\"\n        panelClass=\"app-select-panel\"\n        (blur)=\"onBlur()\"\n        (openedChange)=\"openedChange($event)\"\n    >\n        <input\n            #searchInput\n            *ngIf=\"isSearchEnabled\"\n            matInput\n            type=\"text\"\n            class=\"input-filter mat-select-search\"\n            autocomplete=\"off\"\n            [ngModel]=\"searchTerm\"\n            (ngModelChange)=\"filterOptions($event)\"\n            [placeholder]=\"'FILTER'\"\n            (keydown)=\"handleKeydown($event)\"\n        />\n        <div [ngClass]=\"{'app-select__options': true, 'app-select__options--searchable': isSearchEnabled}\">\n            <mat-option *ngIf=\"!options.length\"></mat-option>\n            <mat-option\n                *ngFor=\"let option of filteredOptions\"\n                [value]=\"option\"\n                [title]=\"bindLabel ? option[bindLabel] : option\"\n            >\n                <span *ngIf=\"!optionTemplate\">{{ bindLabel ? option[bindLabel] : option }}</span>\n                <span *ngIf=\"optionTemplate\">\n                <ng-container *ngTemplateOutlet=\"optionTemplate; context:{option: option}\"></ng-container>\n            </span>\n            </mat-option>\n        </div>\n    </mat-select>\n    <mat-icon class=\"mat-select-clear\" *ngIf=\"isClearEnabled\">\n        <button\n            class=\"btn btn-basic-icon pr-0 pl-0\"\n            [matTooltip]=\"'BUTTON.DELETE'\"\n            (click)=\"clearValue($event)\">\n            <i class=\"icon-close\"></i>\n        </button>\n    </mat-icon>\n    <mat-error appScrollTo=\"\" *ngFor=\"let error of errors\">\n        {{ error.description }}\n    </mat-error>\n</mat-form-field>\n",
                    providers: [CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR],
                    encapsulation: ViewEncapsulation.Emulated,
                    styles: ["app-select .mat-select-placeholder{color:rgba(0,0,0,.6)}app-select .mat-select-value{padding-right:1rem}app-select .mat-select-arrow-wrapper{display:inline}app-select .mat-select-clear{position:absolute;z-index:1;right:.5rem;bottom:.35rem}app-select .mat-select-clear button{color:#989898}app-select .mat-select-clear button:hover{color:#13418f}app-select .mat-select-clear button i{font-size:14px}.app-select-panel{min-height:36px}.app-select-panel .mat-select-search{position:relative;top:0;left:0;right:0;padding:9px 16px;background-color:#fafafa;z-index:1}.app-select-panel .app-select__options{position:relative;overflow:auto;width:100%;max-height:100%}.app-select-panel .app-select__options--searchable{max-height:calc(100% - 35px)}.app-select-panel mat-option .mat-pseudo-checkbox{border:1px solid #d4d7d9}.app-select-panel mat-option .mat-pseudo-checkbox.mat-pseudo-checkbox-checked{border:1px solid #13418f}.app-select-panel mat-option .mat-pseudo-checkbox.mat-pseudo-checkbox-checked::after{top:1px;left:1px;height:6px;width:12px;border:none;box-shadow:-1.5px 1.5px 0 0 currentColor}"]
                }] }
    ];
    MatSelectComponent.propDecorators = {
        control: [{ type: Input }],
        options: [{ type: Input }],
        placeholder: [{ type: Input }],
        bindLabel: [{ type: Input }],
        bindBy: [{ type: Input }],
        bindValue: [{ type: Input }],
        clear: [{ type: Input }],
        disabled: [{ type: Input }],
        multiple: [{ type: Input }],
        errorStateMatcher: [{ type: Input }],
        errors: [{ type: Input }],
        optionTemplate: [{ type: ContentChild, args: [TemplateRef,] }],
        matSelect: [{ type: ViewChild, args: [MatSelect,] }],
        searchInput: [{ type: ViewChild, args: ['searchInput',] }]
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
        { type: NgModule, args: [{
                    declarations: [
                        MatSelectComponent,
                    ],
                    imports: [
                        BrowserModule,
                        FormsModule,
                        ReactiveFormsModule,
                        MatIconModule,
                        MatInputModule,
                        MatSelectModule,
                        MatTooltipModule
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
        { type: NgModule, args: [{
                    declarations: [],
                    imports: [
                        FormsModule,
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

export { LsnLibsModule, LsnCapitalizeModule, LsnLatinToGreekModule, LsnNumericModule, LsnNumpadModule, CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR as ɵh, MatSelectComponent as ɵi, LsnMatSelectModule as ɵg, CapitalizeDirective as ɵa, LatinToGreekDirective as ɵb, CustomNumericConfig as ɵd, NumericConfigService as ɵe, NumericDirective as ɵc, NumPadDirective as ɵf };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNub3ZhLWFuZ3VsYXJtb2R1bGVzLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9AbHNub3ZhL2FuZ3VsYXJtb2R1bGVzL2xpYi9kaXJlY3RpdmVzL251bWVyaWMvbnVtZXJpYy1jb25maWcuc2VydmljZS50cyIsIm5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy9saWIvZGlyZWN0aXZlcy9udW1lcmljL251bWVyaWMuZGlyZWN0aXZlLnRzIiwibmc6Ly9AbHNub3ZhL2FuZ3VsYXJtb2R1bGVzL2xpYi9kaXJlY3RpdmVzL251bWVyaWMvbnVtZXJpYy5tb2R1bGUudHMiLCJuZzovL0Bsc25vdmEvYW5ndWxhcm1vZHVsZXMvbGliL2RpcmVjdGl2ZXMvbnVtcGFkL251bXBhZC5kaXJlY3RpdmUudHMiLCJuZzovL0Bsc25vdmEvYW5ndWxhcm1vZHVsZXMvbGliL2RpcmVjdGl2ZXMvbnVtcGFkL251bXBhZC5tb2R1bGUudHMiLCJuZzovL0Bsc25vdmEvYW5ndWxhcm1vZHVsZXMvbGliL2RpcmVjdGl2ZXMvbGF0aW4tdG8tZ3JlZWsvbGF0aW4tdG8tZ3JlZWsuZGlyZWN0aXZlLnRzIiwibmc6Ly9AbHNub3ZhL2FuZ3VsYXJtb2R1bGVzL2xpYi9kaXJlY3RpdmVzL2xhdGluLXRvLWdyZWVrL2xhdGluLXRvLWdyZWVrLm1vZHVsZS50cyIsIm5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy9saWIvZGlyZWN0aXZlcy9jYXBpdGFsaXplL2NhcGl0YWxpemUuZGlyZWN0aXZlLnRzIiwibmc6Ly9AbHNub3ZhL2FuZ3VsYXJtb2R1bGVzL2xpYi9kaXJlY3RpdmVzL2NhcGl0YWxpemUvY2FwaXRhbGl6ZS5tb2R1bGUudHMiLCJuZzovL0Bsc25vdmEvYW5ndWxhcm1vZHVsZXMvbGliL2NvbXBvbmVudHMvbWF0LXNlbGVjdC9tYXQtc2VsZWN0LmNvbXBvbmVudC50cyIsIm5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy9saWIvY29tcG9uZW50cy9tYXQtc2VsZWN0L21hdC1zZWxlY3QubW9kdWxlLnRzIiwibmc6Ly9AbHNub3ZhL2FuZ3VsYXJtb2R1bGVzL2xpYi9sc24tbGlicy5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZW51bSBOdW1lcmljU2VwYXJhdG9yIHtcbiAgQ09NTUEgPSAnLCcsXG4gIFBFUklPRCA9ICcuJyxcbiAgU1BBQ0UgPSAnICdcbn1cblxuZXhwb3J0IGludGVyZmFjZSBOdW1lcmljQ29uZmlnIHtcbiAgbWluPzogbnVtYmVyO1xuICBtYXg/OiBudW1iZXI7XG4gIG1heExlbmd0aD86IG51bWJlcjtcbiAgcHJlY2lzaW9uPzogbnVtYmVyO1xuICBkZWNpbWFscz86IHN0cmluZztcbiAgdGhvdXNhbmRzPzogc3RyaW5nO1xuICBjb25maWc/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBEZWZhdWx0TnVtZXJpY0NvbmZpZyBpbXBsZW1lbnRzIE51bWVyaWNDb25maWcge1xuICBtaW46IG51bWJlcjtcbiAgbWF4OiBudW1iZXI7XG4gIG1heExlbmd0aDogbnVtYmVyO1xuICBwcmVjaXNpb24gPSAwO1xuICBkZWNpbWFsczogc3RyaW5nID0gTnVtZXJpY1NlcGFyYXRvci5QRVJJT0Q7XG4gIHRob3VzYW5kczogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzID0ge30pIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHByb3BzKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ3VzdG9tTnVtZXJpY0NvbmZpZyB7XG4gIGRlZmF1bHQ/OiBOdW1lcmljQ29uZmlnO1xuICBjdXN0b20/OiB7IFtrZXk6IHN0cmluZ106IE51bWVyaWNDb25maWcgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcyA9IHt9KSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBwcm9wcyk7XG4gIH1cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE51bWVyaWNDb25maWdTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBjb25maWc6IEN1c3RvbU51bWVyaWNDb25maWc7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBDdXN0b21OdW1lcmljQ29uZmlnKSB7XG5cbiAgICBsZXQgbW9kdWxlQ29uZmlnID0gbmV3IEN1c3RvbU51bWVyaWNDb25maWcoKTtcbiAgICBpZiAoY29uZmlnKSB7XG4gICAgICBtb2R1bGVDb25maWcgPSBPYmplY3QuYXNzaWduKG1vZHVsZUNvbmZpZywgY29uZmlnKTtcbiAgICB9XG5cbiAgICBjb25zdCBudW1lcmljQ29uZmlnID0gbW9kdWxlQ29uZmlnLmRlZmF1bHQgfHwge307XG4gICAgY29uc3QgY3VzdG9tQ29uZmlnID0gbW9kdWxlQ29uZmlnLmN1c3RvbSB8fCB7fTtcbiAgICB0aGlzLmNvbmZpZyA9IG5ldyBDdXN0b21OdW1lcmljQ29uZmlnKHtcbiAgICAgIGRlZmF1bHQ6IG5ldyBEZWZhdWx0TnVtZXJpY0NvbmZpZyhudW1lcmljQ29uZmlnKSxcbiAgICAgIGN1c3RvbTogY3VzdG9tQ29uZmlnLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0RGVmYXVsdENvbmZpZygpIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcuZGVmYXVsdDtcbiAgfVxuXG4gIGdldEN1c3RvbUNvbmZpZyhrZXkpIHtcbiAgICBpZiAoIXRoaXMuY29uZmlnLmN1c3RvbVtrZXldKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1tsc25OdW1lcmljXSBJbnZhbGlkIGNvbmZpZyBrZXkgcHJvdmlkZWQuJyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNvbmZpZy5jdXN0b21ba2V5XSB8fCB7fTtcbiAgfVxufVxuIiwiaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIGZvcndhcmRSZWYsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uQ2hhbmdlc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBrZXlib2FyZCBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7TnVtZXJpY0NvbmZpZ1NlcnZpY2UsIE51bWVyaWNDb25maWd9IGZyb20gJy4vbnVtZXJpYy1jb25maWcuc2VydmljZSc7XG5cbmNvbnN0IENVU1RPTV9TRUxFQ1RfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE51bWVyaWNEaXJlY3RpdmUpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2xzbk51bWVyaWNdW25nTW9kZWxdJyxcbiAgcHJvdmlkZXJzOiBbQ1VTVE9NX1NFTEVDVF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgTnVtZXJpY0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBASW5wdXQoKSBsc25OdW1lcmljOiBOdW1lcmljQ29uZmlnID0ge307XG4gIGVsZW1lbnQ6IEVsZW1lbnRSZWY7XG4gIHByb3RlY3RlZCBjb25maWc6IE51bWVyaWNDb25maWc7XG4gIHB1YmxpYyBvbkNoYW5nZSA9IChfOiBhbnkpID0+IHt9O1xuICBwdWJsaWMgb25Ub3VjaCA9ICgpID0+IHt9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBjb25maWdTZXJ2aWNlOiBOdW1lcmljQ29uZmlnU2VydmljZVxuICApIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbDtcbiAgICB0aGlzLnNldENvbmZpZygpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgdGhpcy5zZXRDb25maWcoKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2lucHV0JywgWyckZXZlbnQnXSlcbiAgaW5wdXRIYW5kbGVyKCRldmVudCkge1xuICAgIGlmICgkZXZlbnQudGFyZ2V0LnZhbHVlID09PSAnLScpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmhhbmRsZUxlbmd0aCgkZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICBjb25zdCBwYXJzZWRWYWx1ZSA9IHRoaXMucGFyc2VWYWx1ZSh2YWx1ZSk7XG4gICAgY29uc3QgcmFuZ2VWYWx1ZSA9IHRoaXMuaGFuZGxlUmFuZ2UocGFyc2VkVmFsdWUpO1xuICAgIGlmIChwYXJzZWRWYWx1ZSA9PT0gcmFuZ2VWYWx1ZSkge1xuICAgICAgdGhpcy5kaXNwbGF5VmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9bLHwuXS8sIHRoaXMuY29uZmlnLmRlY2ltYWxzKTtcbiAgICAgIHRoaXMub25DaGFuZ2UocGFyc2VkVmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRpc3BsYXlWYWx1ZSA9IHJhbmdlVmFsdWUudG9TdHJpbmcoKS5yZXBsYWNlKC9bLHwuXS8sIHRoaXMuY29uZmlnLmRlY2ltYWxzKTtcbiAgICAgIHRoaXMub25DaGFuZ2UocmFuZ2VWYWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZm9jdXMnLCBbJyRldmVudCddKVxuICBmb2N1c0hhbmRsZXIoKSB7XG4gICAgdGhpcy5zZXRFZGl0TW9kZSgpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignYmx1cicsIFsnJGV2ZW50J10pXG4gIGJsdXJIYW5kbGVyKCkge1xuICAgIHRoaXMuZGlzcGxheVZhbHVlID0gdGhpcy5wcmVwYXJlRGlzcGxheVZhbHVlKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyB3cml0ZVZhbHVlKG1vZGVsVmFsdWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxldCBwYXJzZWRWYWx1ZSA9IHRoaXMucGFyc2VWYWx1ZShtb2RlbFZhbHVlKTtcbiAgICBwYXJzZWRWYWx1ZSA9IHRoaXMuaGFuZGxlUmFuZ2UocGFyc2VkVmFsdWUpO1xuICAgIHRoaXMuZGlzcGxheVZhbHVlID0gdGhpcy5wcmVwYXJlRGlzcGxheVZhbHVlKHBhcnNlZFZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaCA9IGZuO1xuICB9XG5cbiAgZ2V0IGRpc3BsYXlWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gIH1cblxuICBzZXQgZGlzcGxheVZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHNldENvbmZpZygpIHtcbiAgICBjb25zdCBkZWZhdWx0Q29uZmlnID0gdGhpcy5sc25OdW1lcmljLmNvbmZpZ1xuICAgICAgPyB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0Q3VzdG9tQ29uZmlnKHRoaXMubHNuTnVtZXJpYy5jb25maWcpXG4gICAgICA6IHRoaXMuY29uZmlnU2VydmljZS5nZXREZWZhdWx0Q29uZmlnKCk7XG4gICAgdGhpcy5jb25maWcgPSBPYmplY3QuYXNzaWduKHsuLi5kZWZhdWx0Q29uZmlnLCAuLi50aGlzLmxzbk51bWVyaWN9KTtcbiAgICBpZiAodGhpcy5jb25maWcuZGVjaW1hbHMgJiYgdGhpcy5jb25maWcudGhvdXNhbmRzICYmIHRoaXMuY29uZmlnLmRlY2ltYWxzID09PSB0aGlzLmNvbmZpZy50aG91c2FuZHMpIHtcbiAgICAgIHRoaXMuY29uZmlnLnRob3VzYW5kcyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKHRoaXMuY29uZmlnLm1heCAhPT0gdW5kZWZpbmVkICYmIHRoaXMuY29uZmlnLm1heExlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1tsc25OdW1lcmljXSBTZXR0aW5nIGBtYXhMZW5ndGhgIG1ha2VzIGBtYXhgIHJlZHVuZGFudC4nKTtcbiAgICB9XG4gIH1cblxuICBwYXJzZVZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKCF2YWx1ZSAmJiB2YWx1ZSAhPT0gMCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgY29uc3QgbmV3VmFsdWUgPSB2YWx1ZS50b1N0cmluZygpLnJlcGxhY2UoL1ssfC5dLywgJy4nKTtcbiAgICBjb25zdCBwYXJzZWRWYWx1ZSA9IHRoaXMuY29uZmlnLnByZWNpc2lvbiA+IDBcbiAgICAgID8gcGFyc2VGbG9hdChuZXdWYWx1ZSlcbiAgICAgIDogcGFyc2VJbnQobmV3VmFsdWUsIDEwKTtcbiAgICByZXR1cm4gaXNOYU4ocGFyc2VkVmFsdWUpID8gdW5kZWZpbmVkIDogcGFyc2VkVmFsdWU7XG4gIH1cblxuICBoYW5kbGVMZW5ndGgodmFsdWUpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLmNvbmZpZy5tYXhMZW5ndGhcbiAgICAgICYmIHZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoID4gdGhpcy5jb25maWcubWF4TGVuZ3RoXG4gICAgKSB7XG4gICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKS5zdWJzdHIoMCwgdGhpcy5jb25maWcubWF4TGVuZ3RoKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgaGFuZGxlUmFuZ2UodmFsdWUpIHtcbiAgICBpZiAoIXRoaXMuY29uZmlnLm1heExlbmd0aCAmJiB0aGlzLmNvbmZpZy5tYXggIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSA+IHRoaXMuY29uZmlnLm1heCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLm1heDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY29uZmlnLm1pbiAhPT0gdW5kZWZpbmVkICYmIHZhbHVlIDwgdGhpcy5jb25maWcubWluKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25maWcubWluO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBwcmVwYXJlRGlzcGxheVZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKCF2YWx1ZSAmJiB2YWx1ZSAhPT0gMCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBjb25zdCBbd2hvbGUsIGRlY2ltYWxzXSA9IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcidcbiAgICAgID8gdmFsdWUudG9TdHJpbmcoKS5zcGxpdCgnLicpXG4gICAgICA6IHZhbHVlLnRvU3RyaW5nKCkuc3BsaXQodGhpcy5jb25maWcuZGVjaW1hbHMpO1xuICAgIGNvbnN0IGlzTmVnYXRpdmUgPSB3aG9sZVswXSA9PT0gJy0nO1xuICAgIGxldCByZXN1bHQgPSB3aG9sZSA9PT0gJy0nIHx8ICF3aG9sZVxuICAgICAgPyAnMCdcbiAgICAgIDogTWF0aC5hYnMocGFyc2VJbnQod2hvbGUsIDEwKSkudG9TdHJpbmcoKTtcbiAgICBpZiAodGhpcy5jb25maWcudGhvdXNhbmRzKSB7XG4gICAgICByZXN1bHQgPSByZXN1bHQucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgdGhpcy5jb25maWcudGhvdXNhbmRzKTtcbiAgICB9XG4gICAgaWYgKGRlY2ltYWxzICYmIHRoaXMuY29uZmlnLnByZWNpc2lvbiAmJiB0aGlzLmNvbmZpZy5kZWNpbWFscykge1xuICAgICAgcmVzdWx0ID0gcmVzdWx0ICsgdGhpcy5jb25maWcuZGVjaW1hbHMgKyBkZWNpbWFscztcbiAgICB9XG4gICAgcmV0dXJuIGlzTmVnYXRpdmUgJiYgcmVzdWx0ICE9PSAnMCcgPyAnLScgKyByZXN1bHQgOiByZXN1bHQ7XG4gIH1cblxuICBzZXRFZGl0TW9kZSgpIHtcbiAgICBpZiAodGhpcy5jb25maWcudGhvdXNhbmRzKSB7XG4gICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgICAgIGNvbnN0IFt3aG9sZSwgZGVjaW1hbHNdID0gY3VycmVudFZhbHVlLnNwbGl0KHRoaXMuY29uZmlnLmRlY2ltYWxzKTtcbiAgICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cCgnXFxcXCcgKyB0aGlzLmNvbmZpZy50aG91c2FuZHMsICdnJyk7XG4gICAgICBsZXQgcmVzdWx0ID0gd2hvbGUucmVwbGFjZShyZWdleCwgJycpO1xuICAgICAgaWYgKGRlY2ltYWxzICYmIHRoaXMuY29uZmlnLnByZWNpc2lvbiAmJiB0aGlzLmNvbmZpZy5kZWNpbWFscykge1xuICAgICAgICByZXN1bHQgPSByZXN1bHQgKyB0aGlzLmNvbmZpZy5kZWNpbWFscyArIGRlY2ltYWxzO1xuICAgICAgfVxuICAgICAgdGhpcy5kaXNwbGF5VmFsdWUgPSByZXN1bHQ7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gIGtleURvd25IYW5kbGVyKGU6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgICBpZiAoXG4gICAgICAvLyBBbGxvdyBzcGVjaWFsIGtleXNcbiAgICAgIFtcbiAgICAgICAga2V5Ym9hcmQuTEVGVF9BUlJPVyxcbiAgICAgICAga2V5Ym9hcmQuUklHSFRfQVJST1csXG4gICAgICAgIGtleWJvYXJkLkJBQ0tTUEFDRSxcbiAgICAgICAga2V5Ym9hcmQuREVMRVRFLFxuICAgICAgICBrZXlib2FyZC5FTkQsXG4gICAgICAgIGtleWJvYXJkLkVOVEVSLFxuICAgICAgICBrZXlib2FyZC5FU0NBUEUsXG4gICAgICAgIGtleWJvYXJkLkhPTUUsXG4gICAgICAgIGtleWJvYXJkLlRBQixcbiAgICAgIF0uaW5kZXhPZihlLmtleUNvZGUpICE9PSAtMVxuICAgICAgLy8gQWxsb3cgQ3RybCtrZXkgYWN0aW9uc1xuICAgICAgfHwgKFxuICAgICAgICBbXG4gICAgICAgICAga2V5Ym9hcmQuQSxcbiAgICAgICAgICBrZXlib2FyZC5DLFxuICAgICAgICAgIGtleWJvYXJkLlIsXG4gICAgICAgICAga2V5Ym9hcmQuVixcbiAgICAgICAgICBrZXlib2FyZC5YLFxuICAgICAgICBdLmluZGV4T2YoZS5rZXlDb2RlKSAhPT0gLTFcbiAgICAgICAgJiYgKGUuY3RybEtleSA9PT0gdHJ1ZSB8fCBlLm1ldGFLZXkgPT09IHRydWUpXG4gICAgICApXG4gICAgKSB7XG4gICAgICByZXR1cm47ICAvLyBsZXQgaXQgaGFwcGVuLCBkb24ndCBkbyBhbnl0aGluZ1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBtYXhMZW5ndGhcbiAgICBpZiAoXG4gICAgICB0aGlzLmNvbmZpZy5tYXhMZW5ndGggIT09IHVuZGVmaW5lZFxuICAgICAgJiYgY3VycmVudFZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoID49IHRoaXMuY29uZmlnLm1heExlbmd0aFxuICAgICAgJiYgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uRW5kIC0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPT09IDBcbiAgICApIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgbWludXNcbiAgICBpZiAoXG4gICAgICBba2V5Ym9hcmQuREFTSCwga2V5Ym9hcmQuTlVNUEFEX01JTlVTXS5pbmRleE9mKGUua2V5Q29kZSkgIT09IC0xXG4gICAgICAmJiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCA9PT0gMFxuICAgICAgJiYgKCh0aGlzLmNvbmZpZy5taW4gIT09IHVuZGVmaW5lZCAmJiB0aGlzLmNvbmZpZy5taW4gPCAwKSB8fCB0aGlzLmNvbmZpZy5taW4gPT09IHVuZGVmaW5lZClcbiAgICAgICYmIGN1cnJlbnRWYWx1ZS5pbmRleE9mKCctJykgPT09IC0xXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHNlcGFyYXRvclxuICAgIGlmIChcbiAgICAgIHRoaXMuY29uZmlnLnByZWNpc2lvbiA+IDBcbiAgICAgICYmIFtrZXlib2FyZC5DT01NQSwga2V5Ym9hcmQuTlVNUEFEX1BFUklPRCwgMTkwXS5pbmRleE9mKGUua2V5Q29kZSkgIT09IC0xXG4gICAgICAmJiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCA+IDBcbiAgICAgICYmIGN1cnJlbnRWYWx1ZS5sZW5ndGhcbiAgICAgICYmIGN1cnJlbnRWYWx1ZS5pbmRleE9mKCcuJykgPT09IC0xXG4gICAgICAmJiBjdXJyZW50VmFsdWUuaW5kZXhPZignLCcpID09PSAtMVxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBrZXkgYWZ0ZXIgc2VwYXJhdG9yXG4gICAgaWYgKFxuICAgICAgdGhpcy5jb25maWcucHJlY2lzaW9uID4gMFxuICAgICAgJiYgY3VycmVudFZhbHVlLmluZGV4T2YodGhpcy5jb25maWcuZGVjaW1hbHMpID4gLTFcbiAgICAgICYmIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0ID4gY3VycmVudFZhbHVlLmluZGV4T2YodGhpcy5jb25maWcuZGVjaW1hbHMpXG4gICAgKSB7XG4gICAgICBjb25zdCBbLCBkZWNpbWFsc10gPSBjdXJyZW50VmFsdWUuc3BsaXQodGhpcy5jb25maWcuZGVjaW1hbHMpO1xuICAgICAgaWYgKGRlY2ltYWxzICYmIGRlY2ltYWxzLmxlbmd0aCA+PSB0aGlzLmNvbmZpZy5wcmVjaXNpb24pIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEVuc3VyZSB0aGF0IGl0IGlzIGEgbnVtYmVyIG9yIHN0b3AgdGhlIGtleXByZXNzXG4gICAgaWYgKFxuICAgICAgKFxuICAgICAgICAoXG4gICAgICAgICAgW1xuICAgICAgICAgICAga2V5Ym9hcmQuWkVSTyxcbiAgICAgICAgICAgIGtleWJvYXJkLk9ORSxcbiAgICAgICAgICAgIGtleWJvYXJkLlRXTyxcbiAgICAgICAgICAgIGtleWJvYXJkLlRIUkVFLFxuICAgICAgICAgICAga2V5Ym9hcmQuRk9VUixcbiAgICAgICAgICAgIGtleWJvYXJkLkZJVkUsXG4gICAgICAgICAgICBrZXlib2FyZC5TSVgsXG4gICAgICAgICAgICBrZXlib2FyZC5TRVZFTixcbiAgICAgICAgICAgIGtleWJvYXJkLkVJR0hULFxuICAgICAgICAgICAga2V5Ym9hcmQuTklORVxuICAgICAgICAgIF0uaW5kZXhPZihlLmtleUNvZGUpID09PSAtMVxuICAgICAgICAgIHx8IGUuc2hpZnRLZXlcbiAgICAgICAgKVxuICAgICAgICAmJlxuICAgICAgICBbXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX1pFUk8sXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX09ORSxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfVFdPLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9USFJFRSxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfRk9VUixcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfRklWRSxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfU0lYLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9TRVZFTixcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfRUlHSFQsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX05JTkUsXG4gICAgICAgIF0uaW5kZXhPZihlLmtleUNvZGUpID09PSAtMVxuICAgICAgKVxuICAgICAgfHwgKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0ID09PSAwICYmIGN1cnJlbnRWYWx1ZS5pbmRleE9mKCctJykgPiAtMSlcbiAgICApIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7TW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOdW1lcmljRGlyZWN0aXZlfSBmcm9tICcuL251bWVyaWMuZGlyZWN0aXZlJztcbmltcG9ydCB7TnVtZXJpY0NvbmZpZ1NlcnZpY2UsIEN1c3RvbU51bWVyaWNDb25maWd9IGZyb20gJy4vbnVtZXJpYy1jb25maWcuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE51bWVyaWNEaXJlY3RpdmUsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBOdW1lcmljRGlyZWN0aXZlLFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIExzbk51bWVyaWNNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChjb25maWc/OiBDdXN0b21OdW1lcmljQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBMc25OdW1lcmljTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIE51bWVyaWNDb25maWdTZXJ2aWNlLFxuICAgICAgICB7cHJvdmlkZTogQ3VzdG9tTnVtZXJpY0NvbmZpZywgdXNlVmFsdWU6IGNvbmZpZ31cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPcHRpb25hbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBrZXlib2FyZCBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtOZ0NvbnRyb2x9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuY2xhc3MgTnVtUGFkQ29uZmlnIHtcbiAgbWF4bGVuZ3RoOiBudW1iZXI7XG4gIGFsbG93TGVhZGluZ1plcm9zID0gZmFsc2U7XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tsc25OdW1QYWRdJ1xufSlcbmV4cG9ydCBjbGFzcyBOdW1QYWREaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBsc25OdW1QYWQgPSB7fTtcbiAgcHJvdGVjdGVkIGNvbmZpZzogTnVtUGFkQ29uZmlnO1xuICBwcml2YXRlIGRlZmF1bHRDb25maWc6IE51bVBhZENvbmZpZyA9IG5ldyBOdW1QYWRDb25maWcoKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIEBPcHRpb25hbCgpIHByaXZhdGUgbmdDb250cm9sOiBOZ0NvbnRyb2wpIHtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMuY29uZmlnID0gT2JqZWN0LmFzc2lnbih7Li4udGhpcy5kZWZhdWx0Q29uZmlnLCAuLi50aGlzLmxzbk51bVBhZH0pO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignaW5wdXQnLCBbJyRldmVudCddKVxuICBpbnB1dEhhbmRsZXIoJGV2ZW50KSB7XG4gICAgY29uc3QgY3VycmVudFZhbHVlID0gJGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICB0aGlzLnNldFZhbHVlKHRoaXMucGFyc2VOZXdWYWx1ZShjdXJyZW50VmFsdWUpKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInLCBbJyRldmVudCddKVxuICBibHVySGFuZGxlcigkZXZlbnQpIHtcbiAgICBjb25zdCBjdXJyZW50VmFsdWUgPSAkZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIHRoaXMuc2V0VmFsdWUodGhpcy5wYXJzZU5ld1ZhbHVlKGN1cnJlbnRWYWx1ZSwgdHJ1ZSkpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHNldFZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMubmdDb250cm9sICYmIHRoaXMubmdDb250cm9sLmNvbnRyb2wpIHtcbiAgICAgIHRoaXMubmdDb250cm9sLmNvbnRyb2wuc2V0VmFsdWUodmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBwYXJzZU5ld1ZhbHVlKHZhbHVlLCBibHVyRXZlbnQgPSBmYWxzZSkge1xuICAgIGxldCBuZXdWYWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1teMC05XS9nLCAnJyk7XG4gICAgaWYgKG5ld1ZhbHVlID09PSAnJykge1xuICAgICAgcmV0dXJuIGJsdXJFdmVudCA/ICcnIDogbmV3VmFsdWU7XG4gICAgfVxuICAgIGlmICh0aGlzLmNvbmZpZy5tYXhsZW5ndGggJiYgdGhpcy5jb25maWcubWF4bGVuZ3RoID4gMCkge1xuICAgICAgbmV3VmFsdWUgPSBuZXdWYWx1ZS5zdWJzdHJpbmcoMCwgdGhpcy5jb25maWcubWF4bGVuZ3RoKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmNvbmZpZy5hbGxvd0xlYWRpbmdaZXJvcyAmJiBibHVyRXZlbnQpIHtcbiAgICAgIG5ld1ZhbHVlID0gbmV3VmFsdWUucmVwbGFjZSgvXjArLywgJycpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3VmFsdWU7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAga2V5RG93bkhhbmRsZXIoZTogS2V5Ym9hcmRFdmVudCkge1xuICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnZhbHVlO1xuICAgIGlmIChcbiAgICAgIC8vIEFsbG93IHNwZWNpYWwga2V5c1xuICAgICAgW1xuICAgICAgICBrZXlib2FyZC5MRUZUX0FSUk9XLFxuICAgICAgICBrZXlib2FyZC5SSUdIVF9BUlJPVyxcbiAgICAgICAga2V5Ym9hcmQuQkFDS1NQQUNFLFxuICAgICAgICBrZXlib2FyZC5ERUxFVEUsXG4gICAgICAgIGtleWJvYXJkLkVORCxcbiAgICAgICAga2V5Ym9hcmQuRU5URVIsXG4gICAgICAgIGtleWJvYXJkLkVTQ0FQRSxcbiAgICAgICAga2V5Ym9hcmQuSE9NRSxcbiAgICAgICAga2V5Ym9hcmQuVEFCLFxuICAgICAgXS5pbmRleE9mKGUua2V5Q29kZSkgIT09IC0xXG4gICAgICAvLyBBbGxvdyBDdHJsK2tleSBhY3Rpb25zXG4gICAgICB8fCAoXG4gICAgICAgIFtcbiAgICAgICAgICBrZXlib2FyZC5BLFxuICAgICAgICAgIGtleWJvYXJkLkMsXG4gICAgICAgICAga2V5Ym9hcmQuUixcbiAgICAgICAgICBrZXlib2FyZC5WLFxuICAgICAgICAgIGtleWJvYXJkLlgsXG4gICAgICAgIF0uaW5kZXhPZihlLmtleUNvZGUpICE9PSAtMVxuICAgICAgICAmJiAoZS5jdHJsS2V5ID09PSB0cnVlIHx8IGUubWV0YUtleSA9PT0gdHJ1ZSlcbiAgICAgIClcbiAgICApIHtcbiAgICAgIHJldHVybjsgIC8vIGxldCBpdCBoYXBwZW4sIGRvbid0IGRvIGFueXRoaW5nXG4gICAgfVxuXG4gICAgLy8gRW5zdXJlIHRoYXQgaXQgaXMgYSBudW1iZXIgb3Igc3RvcCB0aGUga2V5cHJlc3NcbiAgICBpZiAoXG4gICAgICAoXG4gICAgICAgIChcbiAgICAgICAgICBbXG4gICAgICAgICAgICBrZXlib2FyZC5aRVJPLFxuICAgICAgICAgICAga2V5Ym9hcmQuT05FLFxuICAgICAgICAgICAga2V5Ym9hcmQuVFdPLFxuICAgICAgICAgICAga2V5Ym9hcmQuVEhSRUUsXG4gICAgICAgICAgICBrZXlib2FyZC5GT1VSLFxuICAgICAgICAgICAga2V5Ym9hcmQuRklWRSxcbiAgICAgICAgICAgIGtleWJvYXJkLlNJWCxcbiAgICAgICAgICAgIGtleWJvYXJkLlNFVkVOLFxuICAgICAgICAgICAga2V5Ym9hcmQuRUlHSFQsXG4gICAgICAgICAgICBrZXlib2FyZC5OSU5FXG4gICAgICAgICAgXS5pbmRleE9mKGUua2V5Q29kZSkgPT09IC0xXG4gICAgICAgICAgfHwgZS5zaGlmdEtleVxuICAgICAgICApXG4gICAgICAgICYmXG4gICAgICAgIFtcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfWkVSTyxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfT05FLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9UV08sXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX1RIUkVFLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9GT1VSLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9GSVZFLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9TSVgsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX1NFVkVOLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9FSUdIVCxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfTklORSxcbiAgICAgICAgXS5pbmRleE9mKGUua2V5Q29kZSkgPT09IC0xXG4gICAgICApXG4gICAgICB8fCAoXG4gICAgICAgIGN1cnJlbnRWYWx1ZS5sZW5ndGhcbiAgICAgICAgJiYgdGhpcy5jb25maWcubWF4bGVuZ3RoICYmIHRoaXMuY29uZmlnLm1heGxlbmd0aCA+IDBcbiAgICAgICAgJiYgY3VycmVudFZhbHVlLmxlbmd0aCA+PSB0aGlzLmNvbmZpZy5tYXhsZW5ndGhcbiAgICAgIClcbiAgICApIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOdW1QYWREaXJlY3RpdmV9IGZyb20gJy4vbnVtcGFkLmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE51bVBhZERpcmVjdGl2ZSxcbiAgXSxcbiAgaW1wb3J0czogW10sXG4gIGV4cG9ydHM6IFtcbiAgICBOdW1QYWREaXJlY3RpdmUsXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTHNuTnVtcGFkTW9kdWxlIHtcbn1cbiIsImltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ01vZGVsfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW25nTW9kZWxdW2xzbkxhdGluVG9HcmVla10nLFxuICBwcm92aWRlcnM6IFtOZ01vZGVsXVxufSlcbmV4cG9ydCBjbGFzcyBMYXRpblRvR3JlZWtEaXJlY3RpdmUge1xuXG4gIHByaXZhdGUgbGF0aW5Ub0dyZWVrID0gW1xuICAgIFsvQS9pZywgJ8OOwpEnXSxcbiAgICBbL0IvaWcsICfDjsKSJ10sXG4gICAgWy9HL2lnLCAnw47CkyddLFxuICAgIFsvRC9pZywgJ8OOwpQnXSxcbiAgICBbL0UvaWcsICfDjsKVJ10sXG4gICAgWy9aL2lnLCAnw47CliddLFxuICAgIFsvSC9pZywgJ8OOwpcnXSxcbiAgICBbL1UvaWcsICfDjsKYJ10sXG4gICAgWy9JL2lnLCAnw47CmSddLFxuICAgIFsvSy9pZywgJ8OOwponXSxcbiAgICBbL0wvaWcsICfDjsKbJ10sXG4gICAgWy9NL2lnLCAnw47CnCddLFxuICAgIFsvTi9pZywgJ8OOwp0nXSxcbiAgICBbL0ovaWcsICfDjsKeJ10sXG4gICAgWy9PL2lnLCAnw47CnyddLFxuICAgIFsvUC9pZywgJ8OOwqAnXSxcbiAgICBbL1IvaWcsICfDjsKhJ10sXG4gICAgWy9TL2lnLCAnw47CoyddLFxuICAgIFsvVC9pZywgJ8OOwqQnXSxcbiAgICBbL1kvaWcsICfDjsKlJ10sXG4gICAgWy9GL2lnLCAnw47CpiddLFxuICAgIFsvWC9pZywgJ8OOwqcnXSxcbiAgICBbL0MvaWcsICfDjsKoJ10sXG4gICAgWy9WL2lnLCAnw47CqSddLFxuICAgIFsvVy9pZywgJ1cnXSxcbiAgICBbL1EvaWcsICdRJ11cbiAgXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1vZGVsOiBOZ01vZGVsLCBwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7XG4gIH1cblxuICBwcml2YXRlIGdldENhcmV0KCkge1xuICAgIHJldHVybiB7XG4gICAgICBzdGFydDogdGhpcy5lbC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0LFxuICAgICAgZW5kOiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uRW5kLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIHNldENhcmV0KHN0YXJ0LCBlbmQpIHtcbiAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPSBzdGFydDtcbiAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uRW5kID0gZW5kO1xuICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICB9XG5cblxuICBASG9zdExpc3RlbmVyKCduZ01vZGVsQ2hhbmdlJywgWyckZXZlbnQnXSlcbiAgb25JbnB1dENoYW5nZSgkZXZlbnQpIHtcbiAgICBjb25zdCB7c3RhcnQsIGVuZH0gPSB0aGlzLmdldENhcmV0KCk7XG5cbiAgICBsZXQgdHJhbnNsYXRlZCA9ICRldmVudC50b0xvY2FsZVVwcGVyQ2FzZSgpO1xuICAgIHRoaXMubGF0aW5Ub0dyZWVrLmZvckVhY2gocmVwbGFjZSA9PiB7XG4gICAgICB0cmFuc2xhdGVkID0gdHJhbnNsYXRlZC5yZXBsYWNlKHJlcGxhY2VbMF0sIHJlcGxhY2VbMV0pO1xuICAgIH0pO1xuICAgIHRoaXMubW9kZWwudmFsdWVBY2Nlc3Nvci53cml0ZVZhbHVlKHRyYW5zbGF0ZWQpO1xuICAgIHRoaXMuc2V0Q2FyZXQoc3RhcnQsIGVuZCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0xhdGluVG9HcmVla0RpcmVjdGl2ZX0gZnJvbSAnLi9sYXRpbi10by1ncmVlay5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBMYXRpblRvR3JlZWtEaXJlY3RpdmUsXG4gIF0sXG4gIGltcG9ydHM6IFtdLFxuICBleHBvcnRzOiBbXG4gICAgTGF0aW5Ub0dyZWVrRGlyZWN0aXZlLFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIExzbkxhdGluVG9HcmVla01vZHVsZSB7XG59XG4iLCJpbXBvcnQge0RpcmVjdGl2ZSwgSG9zdExpc3RlbmVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TmdNb2RlbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbmdNb2RlbF1bbHNuQ2FwaXRhbGl6ZV0nLFxuICBwcm92aWRlcnM6IFtOZ01vZGVsXVxufSlcbmV4cG9ydCBjbGFzcyBDYXBpdGFsaXplRGlyZWN0aXZlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RlbDogTmdNb2RlbCkge1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbmdNb2RlbENoYW5nZScsIFsnJGV2ZW50J10pXG4gIG9uSW5wdXRDaGFuZ2UoJGV2ZW50KSB7XG4gICAgdGhpcy5tb2RlbC52YWx1ZUFjY2Vzc29yLndyaXRlVmFsdWUoJGV2ZW50LnRvTG9jYWxlVXBwZXJDYXNlKCkpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDYXBpdGFsaXplRGlyZWN0aXZlfSBmcm9tICcuL2NhcGl0YWxpemUuZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQ2FwaXRhbGl6ZURpcmVjdGl2ZSxcbiAgXSxcbiAgaW1wb3J0czogW10sXG4gIGV4cG9ydHM6IFtcbiAgICBDYXBpdGFsaXplRGlyZWN0aXZlLFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIExzbkNhcGl0YWxpemVNb2R1bGUge1xufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIEZvcm1Db250cm9sLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtFcnJvclN0YXRlTWF0Y2hlciwgTWF0U2VsZWN0fSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQge0RPV05fQVJST1csIEVORCwgRU5URVIsIEhPTUUsIFVQX0FSUk9XfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtTdWJqZWN0fSBmcm9tICdyeGpzJztcbmltcG9ydCB7dGFrZVVudGlsfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbi8qIHRzbGludDpkaXNhYmxlOm5vLXVzZS1iZWZvcmUtZGVjbGFyZSAqL1xuZXhwb3J0IGNvbnN0IENVU1RPTV9TRUxFQ1RfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWF0U2VsZWN0Q29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG4vKiB0c2xpbnQ6ZW5hYmxlOm5vLXVzZS1iZWZvcmUtZGVjbGFyZSAqL1xuXG5jb25zdCBub29wID0gKCkgPT4ge1xufTtcblxuY29uc3QgU0VMRUNUX1NFQVJDSEFCTEVfTUlOX0xJTUlUID0gODtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbHNuLW1hdC1zZWxlY3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vbWF0LXNlbGVjdC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL21hdC1zZWxlY3QuY29tcG9uZW50LnNjc3MnXSxcbiAgcHJvdmlkZXJzOiBbQ1VTVE9NX1NFTEVDVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uRW11bGF0ZWRcbn0pXG5leHBvcnQgY2xhc3MgTWF0U2VsZWN0Q29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBjb250cm9sOiBGb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgpO1xuICBASW5wdXQoKSBvcHRpb25zOiBhbnlbXSA9IFtdO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICBASW5wdXQoKSBiaW5kTGFiZWw6IHN0cmluZztcbiAgQElucHV0KCkgYmluZEJ5OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGJpbmRWYWx1ZTogc3RyaW5nO1xuICBASW5wdXQoKSBjbGVhciA9IHRydWU7XG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XG4gIEBJbnB1dCgpIG11bHRpcGxlID0gZmFsc2U7XG4gIEBJbnB1dCgpIGVycm9yU3RhdGVNYXRjaGVyOiBFcnJvclN0YXRlTWF0Y2hlcjtcbiAgQElucHV0KCkgZXJyb3JzOiBhbnlbXSA9IFtdO1xuXG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIG9wdGlvblRlbXBsYXRlO1xuICBAVmlld0NoaWxkKE1hdFNlbGVjdCkgbWF0U2VsZWN0O1xuICBAVmlld0NoaWxkKCdzZWFyY2hJbnB1dCcpIHNlYXJjaElucHV0O1xuXG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdCgpO1xuICBwcml2YXRlIHBhbmVsQ2xvc2VkJCA9IG5ldyBTdWJqZWN0KCk7XG4gIHByaXZhdGUgb3B0aW9uQ2hhbmdlcyQgPSBuZXcgU3ViamVjdCgpO1xuICBwcml2YXRlIHNlbGVjdGVkT3B0aW9uczogYW55W10gPSBbXTtcbiAgcHVibGljIGZpbHRlcmVkT3B0aW9uczogYW55W107XG4gIHB1YmxpYyBzZWFyY2hUZXJtID0gJyc7XG4gIHByaXZhdGUgX29uVG91Y2hlZDogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIHByaXZhdGUgX29uQ2hhbmdlOiAodmFsdWUpID0+IHZvaWQ7XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5yZXNldE9wdGlvbnMoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMuaGFuZGxlRGlzYWJsZWQoKTtcbiAgICB0aGlzLnJlc2V0T3B0aW9ucygpO1xuICAgIHRoaXMud3JpdGVWYWx1ZSh0aGlzLmNvbnRyb2wudmFsdWUpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gIH1cblxuICBvbkJsdXIoKSB7XG4gICAgdGhpcy5fb25Ub3VjaGVkKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoIXRoaXMubXVsdGlwbGUpIHtcbiAgICAgIHRoaXMuc2V0U2luZ2xlVmFsdWUodmFsdWUpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5tdWx0aXBsZSAmJiBBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgdGhpcy5zZXRNdWx0aXBsZVZhbHVlKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBzZXRTaW5nbGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1thcHAtc2VsZWN0XSBHaXZlbiB2YWx1ZSBpcyBhbiBhcnJheS4gU2hvdWxkIGBtdWx0aXBsZSA9IHRydWVgPycpO1xuICAgIH1cbiAgICBjb25zdCBjb3JyZXNwb25kaW5nT3B0aW9uID0gdGhpcy5maW5kT3B0aW9uKHZhbHVlKTtcbiAgICB0aGlzLmNoYW5nZVZhbHVlKGNvcnJlc3BvbmRpbmdPcHRpb24pO1xuICB9XG5cbiAgc2V0TXVsdGlwbGVWYWx1ZSh2YWx1ZXM6IGFueVtdKSB7XG4gICAgdGhpcy5zZWxlY3RlZE9wdGlvbnMgPSBbXTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZXMpKSB7XG4gICAgICB2YWx1ZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgY29uc3QgY29ycmVzcG9uZGluZ09wdGlvbiA9IHRoaXMuZmluZE9wdGlvbihpdGVtKTtcbiAgICAgICAgaWYgKGNvcnJlc3BvbmRpbmdPcHRpb24pIHtcbiAgICAgICAgICB0aGlzLmhhbmRsZU9wdGlvblNlbGVjdGlvbih7XG4gICAgICAgICAgICBzZWxlY3RlZDogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiBjb3JyZXNwb25kaW5nT3B0aW9uXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLmNoYW5nZVZhbHVlKHRoaXMuc2VsZWN0ZWRPcHRpb25zKTtcbiAgfVxuXG4gIGZpbmRPcHRpb24odmFsdWU6IGFueSkge1xuICAgIGlmICh2YWx1ZSB8fCB2YWx1ZSA9PT0gMCB8fCB2YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMub3B0aW9ucy5maW5kKChvcHRpb24pID0+IHRoaXMuYmluZFZhbHVlXG4gICAgICAgID8gb3B0aW9uW3RoaXMuYmluZFZhbHVlXSA9PT0gdmFsdWVcbiAgICAgICAgOiB0aGlzLmJpbmRCeVxuICAgICAgICAgID8gb3B0aW9uW3RoaXMuYmluZEJ5XSA9PT0gdmFsdWVbdGhpcy5iaW5kQnldXG4gICAgICAgICAgOiBvcHRpb24gPT09IHZhbHVlXG4gICAgICApO1xuICAgICAgcmV0dXJuIHJlc3VsdCB8fCB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGNoYW5nZVZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy5jb250cm9sLnNldFZhbHVlKHZhbHVlKTtcbiAgICBpZiAodGhpcy5fb25DaGFuZ2UpIHtcbiAgICAgIGlmICghdGhpcy5tdWx0aXBsZSkge1xuICAgICAgICB0aGlzLl9vbkNoYW5nZSh0aGlzLnBhcnNlVmFsdWUodmFsdWUpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUubWFwKGl0ZW0gPT4gdGhpcy5wYXJzZVZhbHVlKGl0ZW0pKSA6IHZhbHVlO1xuICAgICAgICB0aGlzLl9vbkNoYW5nZShyZXN1bHQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHBhcnNlVmFsdWUodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0aGlzLmJpbmRWYWx1ZSA/IHZhbHVlW3RoaXMuYmluZFZhbHVlXSA6IHZhbHVlO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5fb25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLl9vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIGJpbmRPcHRpb25TZWxlY3Rpb25DaGFuZ2VzKCkge1xuICAgIHRoaXMubWF0U2VsZWN0Lm9wdGlvblNlbGVjdGlvbkNoYW5nZXNcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLm9wdGlvbkNoYW5nZXMkIHx8IHRoaXMuZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICBjb25zdCB7aXNVc2VySW5wdXQsIHNvdXJjZX0gPSByZXM7XG4gICAgICAgIGlmIChpc1VzZXJJbnB1dCkge1xuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuaGFuZGxlT3B0aW9uU2VsZWN0aW9uKHNvdXJjZSk7XG4gICAgICAgICAgaWYgKCF0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFNpbmdsZVZhbHVlKHJlc3VsdCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0TXVsdGlwbGVWYWx1ZSh0aGlzLnNlbGVjdGVkT3B0aW9ucyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICB9XG5cbiAgaGFuZGxlT3B0aW9uU2VsZWN0aW9uKGV2ZW50KSB7XG4gICAgY29uc3Qge3ZhbHVlLCBzZWxlY3RlZH0gPSBldmVudDtcbiAgICBpZiAoIXRoaXMubXVsdGlwbGUpIHtcbiAgICAgIHJldHVybiBzZWxlY3RlZFxuICAgICAgICA/IHRoaXMucGFyc2VWYWx1ZSh2YWx1ZSlcbiAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkT3B0aW9ucy5wdXNoKHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIF9yZW1vdmUodGhpcy5zZWxlY3RlZE9wdGlvbnMsIChpdGVtKSA9PiB7XG4gICAgICAgIC8vICAgcmV0dXJuIHRoaXMuYmluZFZhbHVlID8gaXRlbVt0aGlzLmJpbmRWYWx1ZV0gPT09IHZhbHVlW3RoaXMuYmluZFZhbHVlXSA6IGl0ZW0gPT09IHZhbHVlO1xuICAgICAgICAvLyB9KTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvbnMgPSB0aGlzLnNlbGVjdGVkT3B0aW9ucy5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5iaW5kVmFsdWUgPyBpdGVtW3RoaXMuYmluZFZhbHVlXSAhPT0gdmFsdWVbdGhpcy5iaW5kVmFsdWVdIDogaXRlbSAhPT0gdmFsdWU7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5zZWxlY3RlZE9wdGlvbnMubWFwKGl0ZW0gPT4gdGhpcy5wYXJzZVZhbHVlKGl0ZW0pKTtcbiAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHJlc3VsdCkgJiYgcmVzdWx0Lmxlbmd0aCA/IHJlc3VsdCA6IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICByZXNldE9wdGlvbnMoKSB7XG4gICAgdGhpcy5zZWFyY2hUZXJtID0gJyc7XG4gICAgdGhpcy5maWx0ZXJlZE9wdGlvbnMgPSBbLi4udGhpcy5vcHRpb25zXTtcbiAgICB0aGlzLm9wdGlvbkNoYW5nZXMkLm5leHQoKTtcbiAgICB0aGlzLmJpbmRPcHRpb25TZWxlY3Rpb25DaGFuZ2VzKCk7XG4gIH1cblxuICBjbGVhclZhbHVlKCRldmVudCkge1xuICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLnNlbGVjdGVkT3B0aW9ucyA9IFtdO1xuICAgIHRoaXMuY2hhbmdlVmFsdWUodW5kZWZpbmVkKTtcbiAgfVxuXG4gIGZpbHRlck9wdGlvbnModmFsdWUpIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuc2VhcmNoVGVybSkge1xuICAgICAgdGhpcy5zZWFyY2hUZXJtID0gdmFsdWU7XG4gICAgICB0aGlzLmZpbHRlcmVkT3B0aW9ucyA9XG4gICAgICAgIHRoaXMub3B0aW9ucy5maWx0ZXIoaXRlbSA9PiB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0udG9Mb2NhbGVVcHBlckNhc2UoKS5pbmRleE9mKHRoaXMuc2VhcmNoVGVybS50b0xvY2FsZVVwcGVyQ2FzZSgpKSAhPT0gLTE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IG9wdGlvblZhbHVlcyA9IE9iamVjdC52YWx1ZXMoaXRlbSk7XG4gICAgICAgICAgcmV0dXJuIG9wdGlvblZhbHVlcy5zb21lKChvcHRpb25WYWx1ZTogc3RyaW5nKSA9PlxuICAgICAgICAgICAgdHlwZW9mIG9wdGlvblZhbHVlID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgJiYgb3B0aW9uVmFsdWUudG9Mb2NhbGVVcHBlckNhc2UoKS5pbmRleE9mKHRoaXMuc2VhcmNoVGVybS50b0xvY2FsZVVwcGVyQ2FzZSgpKSA+IC0xKTtcbiAgICAgICAgfSk7XG4gICAgICB0aGlzLm1hdFNlbGVjdC5fa2V5TWFuYWdlci5zZXRGaXJzdEl0ZW1BY3RpdmUoKTtcblxuICAgICAgdGhpcy5vcHRpb25DaGFuZ2VzJC5uZXh0KCk7XG4gICAgICB0aGlzLmJpbmRPcHRpb25TZWxlY3Rpb25DaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGlzU2VhcmNoRW5hYmxlZCgpIHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh0aGlzLm9wdGlvbnMpICYmIHRoaXMub3B0aW9ucy5sZW5ndGggPiBTRUxFQ1RfU0VBUkNIQUJMRV9NSU5fTElNSVQ7XG4gIH1cblxuICBnZXQgaXNDbGVhckVuYWJsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2xlYXIgJiYgdGhpcy5jb250cm9sLnZhbHVlICYmICF0aGlzLmRpc2FibGVkXG4gICAgICAmJiAoXG4gICAgICAgICh0aGlzLm11bHRpcGxlICYmIEFycmF5LmlzQXJyYXkodGhpcy5jb250cm9sLnZhbHVlKSAmJiB0aGlzLmNvbnRyb2wudmFsdWUubGVuZ3RoKVxuICAgICAgICB8fCAhdGhpcy5tdWx0aXBsZVxuICAgICAgKTtcbiAgfVxuXG4gIGhhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBpZiAodGhpcy5pc1NlYXJjaEVuYWJsZWQgJiYgW0RPV05fQVJST1csIEVORCwgRU5URVIsIEhPTUUsIFVQX0FSUk9XXS5pbmRleE9mKGV2ZW50LmtleUNvZGUpID09PSAtMSkge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRGlzYWJsZWQoKSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuY29udHJvbC5kaXNhYmxlKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY29udHJvbC5lbmFibGUoKTtcbiAgfVxuXG4gIHNjcm9sbFRvQWN0aXZlSXRlbSgpIHtcbiAgICBjb25zdCBhY3RpdmVJdGVtID0gdGhpcy5tYXRTZWxlY3QuX2tleU1hbmFnZXIuYWN0aXZlSXRlbTtcbiAgICBpZiAoIWFjdGl2ZUl0ZW0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgb3B0aW9uID0gYWN0aXZlSXRlbS5fZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IHBhcmVudCA9IG9wdGlvbi5wYXJlbnROb2RlO1xuICAgIGlmIChvcHRpb24ub2Zmc2V0VG9wICsgb3B0aW9uLm9mZnNldEhlaWdodCA+IHBhcmVudC5zY3JvbGxUb3AgKyBwYXJlbnQub2Zmc2V0SGVpZ2h0KSB7XG4gICAgICBwYXJlbnQuc2Nyb2xsVG9wID0gb3B0aW9uLm9mZnNldFRvcCAtIHBhcmVudC5vZmZzZXRIZWlnaHQgKyBvcHRpb24ub2Zmc2V0SGVpZ2h0O1xuICAgIH0gZWxzZSBpZiAob3B0aW9uLm9mZnNldFRvcCA8IHBhcmVudC5zY3JvbGxUb3ApIHtcbiAgICAgIHBhcmVudC5zY3JvbGxUb3AgPSBvcHRpb24ub2Zmc2V0VG9wO1xuICAgIH1cbiAgfVxuXG4gIG9wZW5lZENoYW5nZShpc09wZW4pIHtcbiAgICBpZiAoaXNPcGVuKSB7XG4gICAgICBpZiAodGhpcy5pc1NlYXJjaEVuYWJsZWQpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hJbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICB9XG4gICAgICB0aGlzLm9wdGlvbkNoYW5nZXMkLm5leHQoKTtcbiAgICAgIHRoaXMuYmluZE9wdGlvblNlbGVjdGlvbkNoYW5nZXMoKTtcbiAgICAgIHRoaXMuc2Nyb2xsVG9BY3RpdmVJdGVtKCk7XG4gICAgICBjb25zdCBrZXlNYW5hZ2VyQ2hhbmdlID0gdGhpcy5tYXRTZWxlY3QuX2tleU1hbmFnZXIuY2hhbmdlO1xuICAgICAga2V5TWFuYWdlckNoYW5nZVxuICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5wYW5lbENsb3NlZCQpKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICB0aGlzLnNjcm9sbFRvQWN0aXZlSXRlbSgpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYW5lbENsb3NlZCQubmV4dCgpO1xuICAgICAgdGhpcy5yZXNldE9wdGlvbnMoKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtCcm93c2VyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7XG4gIE1hdEljb25Nb2R1bGUsXG4gIE1hdElucHV0TW9kdWxlLFxuICBNYXRTZWxlY3RNb2R1bGUsXG4gIE1hdFRvb2x0aXBNb2R1bGVcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHtNYXRTZWxlY3RDb21wb25lbnR9IGZyb20gJy4vbWF0LXNlbGVjdC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBNYXRTZWxlY3RDb21wb25lbnQsXG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBCcm93c2VyTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBNYXRTZWxlY3RNb2R1bGUsXG4gICAgTWF0VG9vbHRpcE1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTWF0U2VsZWN0Q29tcG9uZW50LFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIExzbk1hdFNlbGVjdE1vZHVsZSB7XG59XG4iLCJpbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7THNuTnVtZXJpY01vZHVsZX0gZnJvbSAnLi9kaXJlY3RpdmVzL251bWVyaWMvbnVtZXJpYy5tb2R1bGUnO1xuaW1wb3J0IHtMc25OdW1wYWRNb2R1bGV9IGZyb20gJy4vZGlyZWN0aXZlcy9udW1wYWQvbnVtcGFkLm1vZHVsZSc7XG5pbXBvcnQge0xzbkxhdGluVG9HcmVla01vZHVsZX0gZnJvbSAnLi9kaXJlY3RpdmVzL2xhdGluLXRvLWdyZWVrL2xhdGluLXRvLWdyZWVrLm1vZHVsZSc7XG5pbXBvcnQge0xzbkNhcGl0YWxpemVNb2R1bGV9IGZyb20gJy4vZGlyZWN0aXZlcy9jYXBpdGFsaXplL2NhcGl0YWxpemUubW9kdWxlJztcblxuaW1wb3J0IHtMc25NYXRTZWxlY3RNb2R1bGV9IGZyb20gJy4vY29tcG9uZW50cy9tYXQtc2VsZWN0L21hdC1zZWxlY3QubW9kdWxlJztcbmltcG9ydCB7Rm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXSxcbiAgaW1wb3J0czogW1xuICAgIEZvcm1zTW9kdWxlLFxuICAgIExzbkNhcGl0YWxpemVNb2R1bGUsXG4gICAgTHNuTGF0aW5Ub0dyZWVrTW9kdWxlLFxuICAgIExzbk51bWVyaWNNb2R1bGUuZm9yUm9vdCh7XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGRlY2ltYWxzOiAnLicsXG4gICAgICAgIHByZWNpc2lvbjogNCxcbiAgICAgIH0sXG4gICAgICBjdXN0b206IHtcbiAgICAgICAgY3VycmVuY3k6IHtcbiAgICAgICAgICBkZWNpbWFsczogJywnLFxuICAgICAgICAgIHRob3VzYW5kczogJyAnLFxuICAgICAgICAgIHByZWNpc2lvbjogMixcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pLFxuXG4gICAgTHNuTnVtcGFkTW9kdWxlLFxuICAgIExzbk1hdFNlbGVjdE1vZHVsZSxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIExzbkNhcGl0YWxpemVNb2R1bGUsXG4gICAgTHNuTGF0aW5Ub0dyZWVrTW9kdWxlLFxuICAgIExzbk51bWVyaWNNb2R1bGUsXG4gICAgTHNuTnVtcGFkTW9kdWxlLFxuICAgIExzbk1hdFNlbGVjdE1vZHVsZSxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBMc25MaWJzTW9kdWxlIHtcbn1cbiJdLCJuYW1lcyI6WyJrZXlib2FyZC5MRUZUX0FSUk9XIiwia2V5Ym9hcmQuUklHSFRfQVJST1ciLCJrZXlib2FyZC5CQUNLU1BBQ0UiLCJrZXlib2FyZC5ERUxFVEUiLCJrZXlib2FyZC5FTkQiLCJrZXlib2FyZC5FTlRFUiIsImtleWJvYXJkLkVTQ0FQRSIsImtleWJvYXJkLkhPTUUiLCJrZXlib2FyZC5UQUIiLCJrZXlib2FyZC5BIiwia2V5Ym9hcmQuQyIsImtleWJvYXJkLlIiLCJrZXlib2FyZC5WIiwia2V5Ym9hcmQuWCIsImtleWJvYXJkLkRBU0giLCJrZXlib2FyZC5OVU1QQURfTUlOVVMiLCJrZXlib2FyZC5DT01NQSIsImtleWJvYXJkLk5VTVBBRF9QRVJJT0QiLCJrZXlib2FyZC5aRVJPIiwia2V5Ym9hcmQuT05FIiwia2V5Ym9hcmQuVFdPIiwia2V5Ym9hcmQuVEhSRUUiLCJrZXlib2FyZC5GT1VSIiwia2V5Ym9hcmQuRklWRSIsImtleWJvYXJkLlNJWCIsImtleWJvYXJkLlNFVkVOIiwia2V5Ym9hcmQuRUlHSFQiLCJrZXlib2FyZC5OSU5FIiwia2V5Ym9hcmQuTlVNUEFEX1pFUk8iLCJrZXlib2FyZC5OVU1QQURfT05FIiwia2V5Ym9hcmQuTlVNUEFEX1RXTyIsImtleWJvYXJkLk5VTVBBRF9USFJFRSIsImtleWJvYXJkLk5VTVBBRF9GT1VSIiwia2V5Ym9hcmQuTlVNUEFEX0ZJVkUiLCJrZXlib2FyZC5OVU1QQURfU0lYIiwia2V5Ym9hcmQuTlVNUEFEX1NFVkVOIiwia2V5Ym9hcmQuTlVNUEFEX0VJR0hUIiwia2V5Ym9hcmQuTlVNUEFEX05JTkUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7SUFHRSxPQUFRLEdBQUc7SUFDWCxRQUFTLEdBQUc7SUFDWixPQUFRLEdBQUc7O0FBYWI7SUFRRSw4QkFBWSxLQUFVO1FBQVYsc0JBQUEsRUFBQSxVQUFVO1FBSnRCLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxhQUFRLEdBQVcsZ0JBQWdCLENBQUMsTUFBTSxDQUFDO1FBSXpDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQzVCO0lBQ0gsMkJBQUM7Q0FBQSxJQUFBOztJQU1DLDZCQUFZLEtBQVU7UUFB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