import { Directive, HostListener, ElementRef, Injectable, forwardRef, Input, Optional, NgModule } from '@angular/core';
import { NgModel, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { __assign, __awaiter, __generator, __read } from 'tslib';
import { LEFT_ARROW, RIGHT_ARROW, BACKSPACE, DELETE, END, ENTER, ESCAPE, HOME, TAB, A, C, R, V, X, ZERO, ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE, NUMPAD_ZERO, NUMPAD_ONE, NUMPAD_TWO, NUMPAD_THREE, NUMPAD_FOUR, NUMPAD_FIVE, NUMPAD_SIX, NUMPAD_SEVEN, NUMPAD_EIGHT, NUMPAD_NINE, DASH, NUMPAD_MINUS, COMMA, NUMPAD_PERIOD } from '@angular/cdk/keycodes';

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
var CustomConfig = /** @class */ (function () {
    function CustomConfig(props) {
        if (props === void 0) { props = {}; }
        Object.assign(this, props);
    }
    return CustomConfig;
}());
var ConfigService = /** @class */ (function () {
    function ConfigService(config) {
        /** @type {?} */
        var numericConfig = config.numeric || {};
        /** @type {?} */
        var customConfig = config.custom || {};
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
        { type: Injectable }
    ];
    /** @nocollapse */
    ConfigService.ctorParameters = function () { return [
        { type: CustomConfig }
    ]; };
    return ConfigService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NumericDirective = /** @class */ (function () {
    function NumericDirective(el, configService) {
        this.el = el;
        this.configService = configService;
        this.lsnNumeric = {};
        // private modelValue: number;
        this.onChange = function (_) {
        };
        this.onTouch = function () {
        };
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
        var parsedValue = this.parseValue($event.target.value);
        /** @type {?} */
        var rangeValue = this.handleRange(parsedValue);
        if (parsedValue === rangeValue) {
            this.displayValue = $event.target.value.replace(/[,|.]/, this.config.decimals);
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
            : this.configService.getNumericConfig();
        this.config = Object.assign(__assign({}, defaultConfig, this.lsnNumeric));
        if (this.config.decimals && this.config.thousands && this.config.decimals === this.config.thousands) {
            this.config.thousands = undefined;
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
    NumericDirective.prototype.handleRange = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.config.max !== undefined && value > this.config.max) {
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
            return value;
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
                    selector: '[lsnNumeric]',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return NumericDirective; }),
                            multi: true
                        },
                    ]
                },] }
    ];
    /** @nocollapse */
    NumericDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ConfigService }
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
var LsnLibsModule = /** @class */ (function () {
    function LsnLibsModule() {
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    LsnLibsModule.forRoot = /**
     * @param {?=} config
     * @return {?}
     */
    function (config) {
        /** @type {?} */
        var moduleConfig = new CustomConfig();
        if (config) {
            moduleConfig = Object.assign(moduleConfig, config);
        }
        return {
            ngModule: LsnLibsModule,
            providers: [
                ConfigService,
                { provide: CustomConfig, useValue: moduleConfig }
            ]
        };
    };
    LsnLibsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        CapitalizeDirective,
                        LatinToGreekDirective,
                        NumericDirective,
                        NumPadDirective,
                    ],
                    imports: [],
                    exports: [
                        CapitalizeDirective,
                        LatinToGreekDirective,
                        NumericDirective,
                        NumPadDirective,
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

export { LsnLibsModule, CapitalizeDirective, LatinToGreekDirective, NumericDirective, NumPadDirective, ConfigService as ɵb, CustomConfig as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNub3ZhLWFuZ3VsYXJtb2R1bGVzLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9AbHNub3ZhL2FuZ3VsYXJtb2R1bGVzL2xpYi9kaXJlY3RpdmVzL2NhcGl0YWxpemUvY2FwaXRhbGl6ZS5kaXJlY3RpdmUudHMiLCJuZzovL0Bsc25vdmEvYW5ndWxhcm1vZHVsZXMvbGliL2RpcmVjdGl2ZXMvbGF0aW4tdG8tZ3JlZWsvbGF0aW4tdG8tZ3JlZWsuZGlyZWN0aXZlLnRzIiwibmc6Ly9AbHNub3ZhL2FuZ3VsYXJtb2R1bGVzL2xpYi9zZXJ2aWNlcy9jb25maWcuc2VydmljZS50cyIsIm5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy9saWIvZGlyZWN0aXZlcy9udW1lcmljL251bWVyaWMuZGlyZWN0aXZlLnRzIiwibmc6Ly9AbHNub3ZhL2FuZ3VsYXJtb2R1bGVzL2xpYi9kaXJlY3RpdmVzL251bXBhZC9udW1wYWQuZGlyZWN0aXZlLnRzIiwibmc6Ly9AbHNub3ZhL2FuZ3VsYXJtb2R1bGVzL2xpYi9sc24tbGlicy5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05nTW9kZWx9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW25nTW9kZWxdW2xzbkNhcGl0YWxpemVdJyxcbiAgcHJvdmlkZXJzOiBbTmdNb2RlbF1cbn0pXG5leHBvcnQgY2xhc3MgQ2FwaXRhbGl6ZURpcmVjdGl2ZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbW9kZWw6IE5nTW9kZWwpIHtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ25nTW9kZWxDaGFuZ2UnLCBbJyRldmVudCddKVxuICBvbklucHV0Q2hhbmdlKCRldmVudCkge1xuICAgIHRoaXMubW9kZWwudmFsdWVBY2Nlc3Nvci53cml0ZVZhbHVlKCRldmVudC50b0xvY2FsZVVwcGVyQ2FzZSgpKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TmdNb2RlbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuZ01vZGVsXVtsc25MYXRpblRvR3JlZWtdJyxcbiAgcHJvdmlkZXJzOiBbTmdNb2RlbF1cbn0pXG5leHBvcnQgY2xhc3MgTGF0aW5Ub0dyZWVrRGlyZWN0aXZlIHtcblxuICBwcml2YXRlIGxhdGluVG9HcmVlayA9IFtcbiAgICBbL0EvaWcsICfDjsKRJ10sXG4gICAgWy9CL2lnLCAnw47CkiddLFxuICAgIFsvRy9pZywgJ8OOwpMnXSxcbiAgICBbL0QvaWcsICfDjsKUJ10sXG4gICAgWy9FL2lnLCAnw47ClSddLFxuICAgIFsvWi9pZywgJ8OOwpYnXSxcbiAgICBbL0gvaWcsICfDjsKXJ10sXG4gICAgWy9VL2lnLCAnw47CmCddLFxuICAgIFsvSS9pZywgJ8OOwpknXSxcbiAgICBbL0svaWcsICfDjsKaJ10sXG4gICAgWy9ML2lnLCAnw47CmyddLFxuICAgIFsvTS9pZywgJ8OOwpwnXSxcbiAgICBbL04vaWcsICfDjsKdJ10sXG4gICAgWy9KL2lnLCAnw47CniddLFxuICAgIFsvTy9pZywgJ8OOwp8nXSxcbiAgICBbL1AvaWcsICfDjsKgJ10sXG4gICAgWy9SL2lnLCAnw47CoSddLFxuICAgIFsvUy9pZywgJ8OOwqMnXSxcbiAgICBbL1QvaWcsICfDjsKkJ10sXG4gICAgWy9ZL2lnLCAnw47CpSddLFxuICAgIFsvRi9pZywgJ8OOwqYnXSxcbiAgICBbL1gvaWcsICfDjsKnJ10sXG4gICAgWy9DL2lnLCAnw47CqCddLFxuICAgIFsvVi9pZywgJ8OOwqknXSxcbiAgICBbL1cvaWcsICdXJ10sXG4gICAgWy9RL2lnLCAnUSddXG4gIF07XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RlbDogTmdNb2RlbCwgcHJpdmF0ZSBlbDogRWxlbWVudFJlZikge1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRDYXJldCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhcnQ6IHRoaXMuZWwubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCxcbiAgICAgIGVuZDogdGhpcy5lbC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvbkVuZCxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRDYXJldChzdGFydCwgZW5kKSB7XG4gICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0ID0gc3RhcnQ7XG4gICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvbkVuZCA9IGVuZDtcbiAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG5cbiAgQEhvc3RMaXN0ZW5lcignbmdNb2RlbENoYW5nZScsIFsnJGV2ZW50J10pXG4gIG9uSW5wdXRDaGFuZ2UoJGV2ZW50KSB7XG4gICAgY29uc3Qge3N0YXJ0LCBlbmR9ID0gdGhpcy5nZXRDYXJldCgpO1xuXG4gICAgbGV0IHRyYW5zbGF0ZWQgPSAkZXZlbnQudG9Mb2NhbGVVcHBlckNhc2UoKTtcbiAgICB0aGlzLmxhdGluVG9HcmVlay5mb3JFYWNoKHJlcGxhY2UgPT4ge1xuICAgICAgdHJhbnNsYXRlZCA9IHRyYW5zbGF0ZWQucmVwbGFjZShyZXBsYWNlWzBdLCByZXBsYWNlWzFdKTtcbiAgICB9KTtcbiAgICB0aGlzLm1vZGVsLnZhbHVlQWNjZXNzb3Iud3JpdGVWYWx1ZSh0cmFuc2xhdGVkKTtcbiAgICB0aGlzLnNldENhcmV0KHN0YXJ0LCBlbmQpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmVudW0gTnVtZXJpY1NlcGFyYXRvciB7XG4gIENPTU1BID0gJywnLFxuICBQRVJJT0QgPSAnLicsXG4gIFNQQUNFID0gJyAnXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTnVtZXJpY0NvbmZpZyB7XG4gIG1pbj86IG51bWJlcjtcbiAgbWF4PzogbnVtYmVyO1xuICBwcmVjaXNpb24/OiBudW1iZXI7XG4gIGRlY2ltYWxzPzogc3RyaW5nO1xuICB0aG91c2FuZHM/OiBzdHJpbmc7XG4gIGNvbmZpZz86IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIERlZmF1bHROdW1lcmljQ29uZmlnIGltcGxlbWVudHMgTnVtZXJpY0NvbmZpZyB7XG4gIG1pbjogbnVtYmVyO1xuICBtYXg6IG51bWJlcjtcbiAgcHJlY2lzaW9uID0gMDtcbiAgZGVjaW1hbHM6IHN0cmluZyA9IE51bWVyaWNTZXBhcmF0b3IuUEVSSU9EO1xuICB0aG91c2FuZHM6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcm9wcyA9IHt9KSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBwcm9wcyk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEN1c3RvbUNvbmZpZyB7XG4gIG51bWVyaWM/OiBOdW1lcmljQ29uZmlnO1xuICBjdXN0b20/OiB7W2tleTogc3RyaW5nXTogTnVtZXJpY0NvbmZpZ307XG5cbiAgY29uc3RydWN0b3IocHJvcHMgPSB7fSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgcHJvcHMpO1xuICB9XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb25maWdTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBjb25maWc6IEN1c3RvbUNvbmZpZztcblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IEN1c3RvbUNvbmZpZykge1xuICAgIGNvbnN0IG51bWVyaWNDb25maWcgPSBjb25maWcubnVtZXJpYyB8fCB7fTtcbiAgICBjb25zdCBjdXN0b21Db25maWcgPSBjb25maWcuY3VzdG9tIHx8IHt9O1xuICAgIHRoaXMuY29uZmlnID0gbmV3IEN1c3RvbUNvbmZpZyh7XG4gICAgICBudW1lcmljOiBuZXcgRGVmYXVsdE51bWVyaWNDb25maWcobnVtZXJpY0NvbmZpZyksXG4gICAgICBjdXN0b206IGN1c3RvbUNvbmZpZyxcbiAgICB9KTtcbiAgfVxuXG4gIGdldE51bWVyaWNDb25maWcoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLm51bWVyaWM7XG4gIH1cblxuICBnZXRDdXN0b21Db25maWcoa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmN1c3RvbVtrZXldIHx8IHt9O1xuICB9XG59XG4iLCJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgZm9yd2FyZFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25DaGFuZ2VzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIGtleWJvYXJkIGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiwgTmdDb250cm9sfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0NvbmZpZ1NlcnZpY2UsIERlZmF1bHROdW1lcmljQ29uZmlnLCBOdW1lcmljQ29uZmlnfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jb25maWcuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tsc25OdW1lcmljXScsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTnVtZXJpY0RpcmVjdGl2ZSksXG4gICAgICBtdWx0aTogdHJ1ZVxuICAgIH0sXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTnVtZXJpY0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBASW5wdXQoKSBsc25OdW1lcmljOiBOdW1lcmljQ29uZmlnID0ge307XG4gIGVsZW1lbnQ6IEVsZW1lbnRSZWY7XG4gIHByb3RlY3RlZCBjb25maWc6IE51bWVyaWNDb25maWc7XG4gIC8vIHByaXZhdGUgbW9kZWxWYWx1ZTogbnVtYmVyO1xuICBwdWJsaWMgb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7XG4gIH1cbiAgcHVibGljIG9uVG91Y2ggPSAoKSA9PiB7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIGNvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2UpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbDtcbiAgICB0aGlzLnNldENvbmZpZygpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgdGhpcy5zZXRDb25maWcoKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2lucHV0JywgWyckZXZlbnQnXSlcbiAgaW5wdXRIYW5kbGVyKCRldmVudCkge1xuICAgIGlmICgkZXZlbnQudGFyZ2V0LnZhbHVlID09PSAnLScpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgcGFyc2VkVmFsdWUgPSB0aGlzLnBhcnNlVmFsdWUoJGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgY29uc3QgcmFuZ2VWYWx1ZSA9IHRoaXMuaGFuZGxlUmFuZ2UocGFyc2VkVmFsdWUpO1xuICAgIGlmIChwYXJzZWRWYWx1ZSA9PT0gcmFuZ2VWYWx1ZSkge1xuICAgICAgdGhpcy5kaXNwbGF5VmFsdWUgPSAkZXZlbnQudGFyZ2V0LnZhbHVlLnJlcGxhY2UoL1ssfC5dLywgdGhpcy5jb25maWcuZGVjaW1hbHMpO1xuICAgICAgdGhpcy5vbkNoYW5nZShwYXJzZWRWYWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGlzcGxheVZhbHVlID0gcmFuZ2VWYWx1ZS50b1N0cmluZygpLnJlcGxhY2UoL1ssfC5dLywgdGhpcy5jb25maWcuZGVjaW1hbHMpO1xuICAgICAgdGhpcy5vbkNoYW5nZShyYW5nZVZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdmb2N1cycsIFsnJGV2ZW50J10pXG4gIGZvY3VzSGFuZGxlcigpIHtcbiAgICB0aGlzLnNldEVkaXRNb2RlKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdibHVyJywgWyckZXZlbnQnXSlcbiAgYmx1ckhhbmRsZXIoKSB7XG4gICAgdGhpcy5kaXNwbGF5VmFsdWUgPSB0aGlzLnByZXBhcmVEaXNwbGF5VmFsdWUodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHdyaXRlVmFsdWUobW9kZWxWYWx1ZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbGV0IHBhcnNlZFZhbHVlID0gdGhpcy5wYXJzZVZhbHVlKG1vZGVsVmFsdWUpO1xuICAgIHBhcnNlZFZhbHVlID0gdGhpcy5oYW5kbGVSYW5nZShwYXJzZWRWYWx1ZSk7XG4gICAgdGhpcy5kaXNwbGF5VmFsdWUgPSB0aGlzLnByZXBhcmVEaXNwbGF5VmFsdWUocGFyc2VkVmFsdWUpO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoID0gZm47XG4gIH1cblxuICBnZXQgZGlzcGxheVZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgfVxuXG4gIHNldCBkaXNwbGF5VmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgc2V0Q29uZmlnKCkge1xuICAgIGNvbnN0IGRlZmF1bHRDb25maWcgPSB0aGlzLmxzbk51bWVyaWMuY29uZmlnXG4gICAgICA/IHRoaXMuY29uZmlnU2VydmljZS5nZXRDdXN0b21Db25maWcodGhpcy5sc25OdW1lcmljLmNvbmZpZylcbiAgICAgIDogdGhpcy5jb25maWdTZXJ2aWNlLmdldE51bWVyaWNDb25maWcoKTtcbiAgICB0aGlzLmNvbmZpZyA9IE9iamVjdC5hc3NpZ24oey4uLmRlZmF1bHRDb25maWcsIC4uLnRoaXMubHNuTnVtZXJpY30pO1xuICAgIGlmICh0aGlzLmNvbmZpZy5kZWNpbWFscyAmJiB0aGlzLmNvbmZpZy50aG91c2FuZHMgJiYgdGhpcy5jb25maWcuZGVjaW1hbHMgPT09IHRoaXMuY29uZmlnLnRob3VzYW5kcykge1xuICAgICAgdGhpcy5jb25maWcudGhvdXNhbmRzID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIHBhcnNlVmFsdWUodmFsdWUpIHtcbiAgICBpZiAoIXZhbHVlICYmIHZhbHVlICE9PSAwKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBjb25zdCBuZXdWYWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCkucmVwbGFjZSgvWyx8Ll0vLCAnLicpO1xuICAgIGNvbnN0IHBhcnNlZFZhbHVlID0gdGhpcy5jb25maWcucHJlY2lzaW9uID4gMFxuICAgICAgPyBwYXJzZUZsb2F0KG5ld1ZhbHVlKVxuICAgICAgOiBwYXJzZUludChuZXdWYWx1ZSwgMTApO1xuICAgIHJldHVybiBpc05hTihwYXJzZWRWYWx1ZSkgPyB1bmRlZmluZWQgOiBwYXJzZWRWYWx1ZTtcbiAgfVxuXG4gIGhhbmRsZVJhbmdlKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMuY29uZmlnLm1heCAhPT0gdW5kZWZpbmVkICYmIHZhbHVlID4gdGhpcy5jb25maWcubWF4KSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25maWcubWF4O1xuICAgIH0gZWxzZSBpZiAodGhpcy5jb25maWcubWluICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgPCB0aGlzLmNvbmZpZy5taW4pIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5taW47XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHByZXBhcmVEaXNwbGF5VmFsdWUodmFsdWUpIHtcbiAgICBpZiAoIXZhbHVlICYmIHZhbHVlICE9PSAwKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGNvbnN0IFt3aG9sZSwgZGVjaW1hbHNdID0gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJ1xuICAgICAgPyB2YWx1ZS50b1N0cmluZygpLnNwbGl0KCcuJylcbiAgICAgIDogdmFsdWUudG9TdHJpbmcoKS5zcGxpdCh0aGlzLmNvbmZpZy5kZWNpbWFscyk7XG4gICAgY29uc3QgaXNOZWdhdGl2ZSA9IHdob2xlWzBdID09PSAnLSc7XG4gICAgbGV0IHJlc3VsdCA9IHdob2xlID09PSAnLScgfHwgIXdob2xlXG4gICAgICA/ICcwJ1xuICAgICAgOiBNYXRoLmFicyhwYXJzZUludCh3aG9sZSwgMTApKS50b1N0cmluZygpO1xuICAgIGlmICh0aGlzLmNvbmZpZy50aG91c2FuZHMpIHtcbiAgICAgIHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCB0aGlzLmNvbmZpZy50aG91c2FuZHMpO1xuICAgIH1cbiAgICBpZiAoZGVjaW1hbHMgJiYgdGhpcy5jb25maWcucHJlY2lzaW9uICYmIHRoaXMuY29uZmlnLmRlY2ltYWxzKSB7XG4gICAgICByZXN1bHQgPSByZXN1bHQgKyB0aGlzLmNvbmZpZy5kZWNpbWFscyArIGRlY2ltYWxzO1xuICAgIH1cbiAgICByZXR1cm4gaXNOZWdhdGl2ZSAmJiByZXN1bHQgIT09ICcwJyA/ICctJyArIHJlc3VsdCA6IHJlc3VsdDtcbiAgfVxuXG4gIHNldEVkaXRNb2RlKCkge1xuICAgIGlmICh0aGlzLmNvbmZpZy50aG91c2FuZHMpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnZhbHVlO1xuICAgICAgY29uc3QgW3dob2xlLCBkZWNpbWFsc10gPSBjdXJyZW50VmFsdWUuc3BsaXQodGhpcy5jb25maWcuZGVjaW1hbHMpO1xuICAgICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKCdcXFxcJyArIHRoaXMuY29uZmlnLnRob3VzYW5kcywgJ2cnKTtcbiAgICAgIGxldCByZXN1bHQgPSB3aG9sZS5yZXBsYWNlKHJlZ2V4LCAnJyk7XG4gICAgICBpZiAoZGVjaW1hbHMgJiYgdGhpcy5jb25maWcucHJlY2lzaW9uICYmIHRoaXMuY29uZmlnLmRlY2ltYWxzKSB7XG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdCArIHRoaXMuY29uZmlnLmRlY2ltYWxzICsgZGVjaW1hbHM7XG4gICAgICB9XG4gICAgICB0aGlzLmRpc3BsYXlWYWx1ZSA9IHJlc3VsdDtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAga2V5RG93bkhhbmRsZXIoZTogS2V5Ym9hcmRFdmVudCkge1xuICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnZhbHVlO1xuICAgIGlmIChcbiAgICAgIC8vIEFsbG93IHNwZWNpYWwga2V5c1xuICAgICAgW1xuICAgICAgICBrZXlib2FyZC5MRUZUX0FSUk9XLFxuICAgICAgICBrZXlib2FyZC5SSUdIVF9BUlJPVyxcbiAgICAgICAga2V5Ym9hcmQuQkFDS1NQQUNFLFxuICAgICAgICBrZXlib2FyZC5ERUxFVEUsXG4gICAgICAgIGtleWJvYXJkLkVORCxcbiAgICAgICAga2V5Ym9hcmQuRU5URVIsXG4gICAgICAgIGtleWJvYXJkLkVTQ0FQRSxcbiAgICAgICAga2V5Ym9hcmQuSE9NRSxcbiAgICAgICAga2V5Ym9hcmQuVEFCLFxuICAgICAgXS5pbmRleE9mKGUua2V5Q29kZSkgIT09IC0xXG4gICAgICAvLyBBbGxvdyBDdHJsK2tleSBhY3Rpb25zXG4gICAgICB8fCAoXG4gICAgICAgIFtcbiAgICAgICAgICBrZXlib2FyZC5BLFxuICAgICAgICAgIGtleWJvYXJkLkMsXG4gICAgICAgICAga2V5Ym9hcmQuUixcbiAgICAgICAgICBrZXlib2FyZC5WLFxuICAgICAgICAgIGtleWJvYXJkLlgsXG4gICAgICAgIF0uaW5kZXhPZihlLmtleUNvZGUpICE9PSAtMVxuICAgICAgICAmJiAoZS5jdHJsS2V5ID09PSB0cnVlIHx8IGUubWV0YUtleSA9PT0gdHJ1ZSlcbiAgICAgIClcbiAgICApIHtcbiAgICAgIHJldHVybjsgIC8vIGxldCBpdCBoYXBwZW4sIGRvbid0IGRvIGFueXRoaW5nXG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIG1pbnVzXG4gICAgaWYgKFxuICAgICAgW2tleWJvYXJkLkRBU0gsIGtleWJvYXJkLk5VTVBBRF9NSU5VU10uaW5kZXhPZihlLmtleUNvZGUpICE9PSAtMVxuICAgICAgJiYgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPT09IDBcbiAgICAgICYmICgodGhpcy5jb25maWcubWluICE9PSB1bmRlZmluZWQgJiYgdGhpcy5jb25maWcubWluIDwgMCkgfHwgdGhpcy5jb25maWcubWluID09PSB1bmRlZmluZWQpXG4gICAgICAmJiBjdXJyZW50VmFsdWUuaW5kZXhPZignLScpID09PSAtMVxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBzZXBhcmF0b3JcbiAgICBpZiAoXG4gICAgICB0aGlzLmNvbmZpZy5wcmVjaXNpb24gPiAwXG4gICAgICAmJiBba2V5Ym9hcmQuQ09NTUEsIGtleWJvYXJkLk5VTVBBRF9QRVJJT0QsIDE5MF0uaW5kZXhPZihlLmtleUNvZGUpICE9PSAtMVxuICAgICAgJiYgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPiAwXG4gICAgICAmJiBjdXJyZW50VmFsdWUubGVuZ3RoXG4gICAgICAmJiBjdXJyZW50VmFsdWUuaW5kZXhPZignLicpID09PSAtMVxuICAgICAgJiYgY3VycmVudFZhbHVlLmluZGV4T2YoJywnKSA9PT0gLTFcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUga2V5IGFmdGVyIHNlcGFyYXRvclxuICAgIGlmIChcbiAgICAgIHRoaXMuY29uZmlnLnByZWNpc2lvbiA+IDBcbiAgICAgICYmIGN1cnJlbnRWYWx1ZS5pbmRleE9mKHRoaXMuY29uZmlnLmRlY2ltYWxzKSA+IC0xXG4gICAgICAmJiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCA+IGN1cnJlbnRWYWx1ZS5pbmRleE9mKHRoaXMuY29uZmlnLmRlY2ltYWxzKVxuICAgICkge1xuICAgICAgY29uc3QgWywgZGVjaW1hbHNdID0gY3VycmVudFZhbHVlLnNwbGl0KHRoaXMuY29uZmlnLmRlY2ltYWxzKTtcbiAgICAgIGlmIChkZWNpbWFscyAmJiBkZWNpbWFscy5sZW5ndGggPj0gdGhpcy5jb25maWcucHJlY2lzaW9uKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBFbnN1cmUgdGhhdCBpdCBpcyBhIG51bWJlciBvciBzdG9wIHRoZSBrZXlwcmVzc1xuICAgIGlmIChcbiAgICAgIChcbiAgICAgICAgKFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIGtleWJvYXJkLlpFUk8sXG4gICAgICAgICAgICBrZXlib2FyZC5PTkUsXG4gICAgICAgICAgICBrZXlib2FyZC5UV08sXG4gICAgICAgICAgICBrZXlib2FyZC5USFJFRSxcbiAgICAgICAgICAgIGtleWJvYXJkLkZPVVIsXG4gICAgICAgICAgICBrZXlib2FyZC5GSVZFLFxuICAgICAgICAgICAga2V5Ym9hcmQuU0lYLFxuICAgICAgICAgICAga2V5Ym9hcmQuU0VWRU4sXG4gICAgICAgICAgICBrZXlib2FyZC5FSUdIVCxcbiAgICAgICAgICAgIGtleWJvYXJkLk5JTkVcbiAgICAgICAgICBdLmluZGV4T2YoZS5rZXlDb2RlKSA9PT0gLTFcbiAgICAgICAgICB8fCBlLnNoaWZ0S2V5XG4gICAgICAgIClcbiAgICAgICAgJiZcbiAgICAgICAgW1xuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9aRVJPLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9PTkUsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX1RXTyxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfVEhSRUUsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX0ZPVVIsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX0ZJVkUsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX1NJWCxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfU0VWRU4sXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX0VJR0hULFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9OSU5FLFxuICAgICAgICBdLmluZGV4T2YoZS5rZXlDb2RlKSA9PT0gLTFcbiAgICAgIClcbiAgICAgIHx8ICh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCA9PT0gMCAmJiBjdXJyZW50VmFsdWUuaW5kZXhPZignLScpID4gLTEpXG4gICAgKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPcHRpb25hbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBrZXlib2FyZCBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtOZ0NvbnRyb2x9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuY2xhc3MgTnVtUGFkQ29uZmlnIHtcbiAgbWF4bGVuZ3RoOiBudW1iZXI7XG4gIGFsbG93TGVhZGluZ1plcm9zID0gZmFsc2U7XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tsc25OdW1QYWRdJ1xufSlcbmV4cG9ydCBjbGFzcyBOdW1QYWREaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBsc25OdW1QYWQgPSB7fTtcbiAgcHJvdGVjdGVkIGNvbmZpZzogTnVtUGFkQ29uZmlnO1xuICBwcml2YXRlIGRlZmF1bHRDb25maWc6IE51bVBhZENvbmZpZyA9IG5ldyBOdW1QYWRDb25maWcoKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIEBPcHRpb25hbCgpIHByaXZhdGUgbmdDb250cm9sOiBOZ0NvbnRyb2wpIHtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMuY29uZmlnID0gT2JqZWN0LmFzc2lnbih7Li4udGhpcy5kZWZhdWx0Q29uZmlnLCAuLi50aGlzLmxzbk51bVBhZH0pO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignaW5wdXQnLCBbJyRldmVudCddKVxuICBpbnB1dEhhbmRsZXIoJGV2ZW50KSB7XG4gICAgY29uc3QgY3VycmVudFZhbHVlID0gJGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICB0aGlzLnNldFZhbHVlKHRoaXMucGFyc2VOZXdWYWx1ZShjdXJyZW50VmFsdWUpKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInLCBbJyRldmVudCddKVxuICBibHVySGFuZGxlcigkZXZlbnQpIHtcbiAgICBjb25zdCBjdXJyZW50VmFsdWUgPSAkZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIHRoaXMuc2V0VmFsdWUodGhpcy5wYXJzZU5ld1ZhbHVlKGN1cnJlbnRWYWx1ZSwgdHJ1ZSkpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHNldFZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMubmdDb250cm9sICYmIHRoaXMubmdDb250cm9sLmNvbnRyb2wpIHtcbiAgICAgIHRoaXMubmdDb250cm9sLmNvbnRyb2wuc2V0VmFsdWUodmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBwYXJzZU5ld1ZhbHVlKHZhbHVlLCBibHVyRXZlbnQgPSBmYWxzZSkge1xuICAgIGxldCBuZXdWYWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1teMC05XS9nLCAnJyk7XG4gICAgaWYgKG5ld1ZhbHVlID09PSAnJykge1xuICAgICAgcmV0dXJuIGJsdXJFdmVudCA/ICcnIDogbmV3VmFsdWU7XG4gICAgfVxuICAgIGlmICh0aGlzLmNvbmZpZy5tYXhsZW5ndGggJiYgdGhpcy5jb25maWcubWF4bGVuZ3RoID4gMCkge1xuICAgICAgbmV3VmFsdWUgPSBuZXdWYWx1ZS5zdWJzdHJpbmcoMCwgdGhpcy5jb25maWcubWF4bGVuZ3RoKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmNvbmZpZy5hbGxvd0xlYWRpbmdaZXJvcyAmJiBibHVyRXZlbnQpIHtcbiAgICAgIG5ld1ZhbHVlID0gbmV3VmFsdWUucmVwbGFjZSgvXjArLywgJycpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3VmFsdWU7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAga2V5RG93bkhhbmRsZXIoZTogS2V5Ym9hcmRFdmVudCkge1xuICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnZhbHVlO1xuICAgIGlmIChcbiAgICAgIC8vIEFsbG93IHNwZWNpYWwga2V5c1xuICAgICAgW1xuICAgICAgICBrZXlib2FyZC5MRUZUX0FSUk9XLFxuICAgICAgICBrZXlib2FyZC5SSUdIVF9BUlJPVyxcbiAgICAgICAga2V5Ym9hcmQuQkFDS1NQQUNFLFxuICAgICAgICBrZXlib2FyZC5ERUxFVEUsXG4gICAgICAgIGtleWJvYXJkLkVORCxcbiAgICAgICAga2V5Ym9hcmQuRU5URVIsXG4gICAgICAgIGtleWJvYXJkLkVTQ0FQRSxcbiAgICAgICAga2V5Ym9hcmQuSE9NRSxcbiAgICAgICAga2V5Ym9hcmQuVEFCLFxuICAgICAgXS5pbmRleE9mKGUua2V5Q29kZSkgIT09IC0xXG4gICAgICAvLyBBbGxvdyBDdHJsK2tleSBhY3Rpb25zXG4gICAgICB8fCAoXG4gICAgICAgIFtcbiAgICAgICAgICBrZXlib2FyZC5BLFxuICAgICAgICAgIGtleWJvYXJkLkMsXG4gICAgICAgICAga2V5Ym9hcmQuUixcbiAgICAgICAgICBrZXlib2FyZC5WLFxuICAgICAgICAgIGtleWJvYXJkLlgsXG4gICAgICAgIF0uaW5kZXhPZihlLmtleUNvZGUpICE9PSAtMVxuICAgICAgICAmJiAoZS5jdHJsS2V5ID09PSB0cnVlIHx8IGUubWV0YUtleSA9PT0gdHJ1ZSlcbiAgICAgIClcbiAgICApIHtcbiAgICAgIHJldHVybjsgIC8vIGxldCBpdCBoYXBwZW4sIGRvbid0IGRvIGFueXRoaW5nXG4gICAgfVxuXG4gICAgLy8gRW5zdXJlIHRoYXQgaXQgaXMgYSBudW1iZXIgb3Igc3RvcCB0aGUga2V5cHJlc3NcbiAgICBpZiAoXG4gICAgICAoXG4gICAgICAgIChcbiAgICAgICAgICBbXG4gICAgICAgICAgICBrZXlib2FyZC5aRVJPLFxuICAgICAgICAgICAga2V5Ym9hcmQuT05FLFxuICAgICAgICAgICAga2V5Ym9hcmQuVFdPLFxuICAgICAgICAgICAga2V5Ym9hcmQuVEhSRUUsXG4gICAgICAgICAgICBrZXlib2FyZC5GT1VSLFxuICAgICAgICAgICAga2V5Ym9hcmQuRklWRSxcbiAgICAgICAgICAgIGtleWJvYXJkLlNJWCxcbiAgICAgICAgICAgIGtleWJvYXJkLlNFVkVOLFxuICAgICAgICAgICAga2V5Ym9hcmQuRUlHSFQsXG4gICAgICAgICAgICBrZXlib2FyZC5OSU5FXG4gICAgICAgICAgXS5pbmRleE9mKGUua2V5Q29kZSkgPT09IC0xXG4gICAgICAgICAgfHwgZS5zaGlmdEtleVxuICAgICAgICApXG4gICAgICAgICYmXG4gICAgICAgIFtcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfWkVSTyxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfT05FLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9UV08sXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX1RIUkVFLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9GT1VSLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9GSVZFLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9TSVgsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX1NFVkVOLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9FSUdIVCxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfTklORSxcbiAgICAgICAgXS5pbmRleE9mKGUua2V5Q29kZSkgPT09IC0xXG4gICAgICApXG4gICAgICB8fCAoXG4gICAgICAgIGN1cnJlbnRWYWx1ZS5sZW5ndGhcbiAgICAgICAgJiYgdGhpcy5jb25maWcubWF4bGVuZ3RoICYmIHRoaXMuY29uZmlnLm1heGxlbmd0aCA+IDBcbiAgICAgICAgJiYgY3VycmVudFZhbHVlLmxlbmd0aCA+PSB0aGlzLmNvbmZpZy5tYXhsZW5ndGhcbiAgICAgIClcbiAgICApIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7TW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDYXBpdGFsaXplRGlyZWN0aXZlfSBmcm9tICcuL2RpcmVjdGl2ZXMvY2FwaXRhbGl6ZS9jYXBpdGFsaXplLmRpcmVjdGl2ZSc7XG5pbXBvcnQge0xhdGluVG9HcmVla0RpcmVjdGl2ZX0gZnJvbSAnLi9kaXJlY3RpdmVzL2xhdGluLXRvLWdyZWVrL2xhdGluLXRvLWdyZWVrLmRpcmVjdGl2ZSc7XG5pbXBvcnQge051bWVyaWNEaXJlY3RpdmV9IGZyb20gJy4vZGlyZWN0aXZlcy9udW1lcmljL251bWVyaWMuZGlyZWN0aXZlJztcbmltcG9ydCB7TnVtUGFkRGlyZWN0aXZlfSBmcm9tICcuL2RpcmVjdGl2ZXMvbnVtcGFkL251bXBhZC5kaXJlY3RpdmUnO1xuaW1wb3J0IHtDb25maWdTZXJ2aWNlLCBDdXN0b21Db25maWd9IGZyb20gJy4vc2VydmljZXMvY29uZmlnLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBDYXBpdGFsaXplRGlyZWN0aXZlLFxuICAgIExhdGluVG9HcmVla0RpcmVjdGl2ZSxcbiAgICBOdW1lcmljRGlyZWN0aXZlLFxuICAgIE51bVBhZERpcmVjdGl2ZSxcbiAgXSxcbiAgaW1wb3J0czogW10sXG4gIGV4cG9ydHM6IFtcbiAgICBDYXBpdGFsaXplRGlyZWN0aXZlLFxuICAgIExhdGluVG9HcmVla0RpcmVjdGl2ZSxcbiAgICBOdW1lcmljRGlyZWN0aXZlLFxuICAgIE51bVBhZERpcmVjdGl2ZSxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBMc25MaWJzTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnPzogQ3VzdG9tQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgbGV0IG1vZHVsZUNvbmZpZyA9IG5ldyBDdXN0b21Db25maWcoKTtcbiAgICBpZiAoY29uZmlnKSB7XG4gICAgICBtb2R1bGVDb25maWcgPSBPYmplY3QuYXNzaWduKG1vZHVsZUNvbmZpZywgY29uZmlnKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBMc25MaWJzTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIENvbmZpZ1NlcnZpY2UsXG4gICAgICAgIHtwcm92aWRlOiBDdXN0b21Db25maWcsIHVzZVZhbHVlOiBtb2R1bGVDb25maWcgfVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJrZXlib2FyZC5MRUZUX0FSUk9XIiwia2V5Ym9hcmQuUklHSFRfQVJST1ciLCJrZXlib2FyZC5CQUNLU1BBQ0UiLCJrZXlib2FyZC5ERUxFVEUiLCJrZXlib2FyZC5FTkQiLCJrZXlib2FyZC5FTlRFUiIsImtleWJvYXJkLkVTQ0FQRSIsImtleWJvYXJkLkhPTUUiLCJrZXlib2FyZC5UQUIiLCJrZXlib2FyZC5BIiwia2V5Ym9hcmQuQyIsImtleWJvYXJkLlIiLCJrZXlib2FyZC5WIiwia2V5Ym9hcmQuWCIsImtleWJvYXJkLkRBU0giLCJrZXlib2FyZC5OVU1QQURfTUlOVVMiLCJrZXlib2FyZC5DT01NQSIsImtleWJvYXJkLk5VTVBBRF9QRVJJT0QiLCJrZXlib2FyZC5aRVJPIiwia2V5Ym9hcmQuT05FIiwia2V5Ym9hcmQuVFdPIiwia2V5Ym9hcmQuVEhSRUUiLCJrZXlib2FyZC5GT1VSIiwia2V5Ym9hcmQuRklWRSIsImtleWJvYXJkLlNJWCIsImtleWJvYXJkLlNFVkVOIiwia2V5Ym9hcmQuRUlHSFQiLCJrZXlib2FyZC5OSU5FIiwia2V5Ym9hcmQuTlVNUEFEX1pFUk8iLCJrZXlib2FyZC5OVU1QQURfT05FIiwia2V5Ym9hcmQuTlVNUEFEX1RXTyIsImtleWJvYXJkLk5VTVBBRF9USFJFRSIsImtleWJvYXJkLk5VTVBBRF9GT1VSIiwia2V5Ym9hcmQuTlVNUEFEX0ZJVkUiLCJrZXlib2FyZC5OVU1QQURfU0lYIiwia2V5Ym9hcmQuTlVNUEFEX1NFVkVOIiwia2V5Ym9hcmQuTlVNUEFEX0VJR0hUIiwia2V5Ym9hcmQuTlVNUEFEX05JTkUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0lBUUUsNkJBQW9CLEtBQWM7UUFBZCxVQUFLLEdBQUwsS0FBSyxDQUFTO0tBQ2pDOzs7OztJQUdELDJDQUFhOzs7O0lBRGIsVUFDYyxNQUFNO1FBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO0tBQ2pFOztnQkFYRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLDBCQUEwQjtvQkFDcEMsU0FBUyxFQUFFLENBQUMsT0FBTyxDQUFDO2lCQUNyQjs7OztnQkFMTyxPQUFPOzs7Z0NBVVosWUFBWSxTQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7SUFLM0MsMEJBQUM7Q0FiRDs7Ozs7O0FDSEE7SUF1Q0UsK0JBQW9CLEtBQWMsRUFBVSxFQUFjO1FBQXRDLFVBQUssR0FBTCxLQUFLLENBQVM7UUFB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