import { Directive, HostListener, ElementRef, Injectable, forwardRef, Input, Optional, NgModule } from '@angular/core';
import { NgModel, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { __awaiter } from 'tslib';
import { LEFT_ARROW, RIGHT_ARROW, BACKSPACE, DELETE, END, ENTER, ESCAPE, HOME, TAB, A, C, R, V, X, DASH, NUMPAD_MINUS, COMMA, NUMPAD_PERIOD, ZERO, ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE, NUMPAD_ZERO, NUMPAD_ONE, NUMPAD_TWO, NUMPAD_THREE, NUMPAD_FOUR, NUMPAD_FIVE, NUMPAD_SIX, NUMPAD_SEVEN, NUMPAD_EIGHT, NUMPAD_NINE } from '@angular/cdk/keycodes';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CapitalizeDirective {
    /**
     * @param {?} model
     */
    constructor(model) {
        this.model = model;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onInputChange($event) {
        this.model.valueAccessor.writeValue($event.toLocaleUpperCase());
    }
}
CapitalizeDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngModel][lsnCapitalize]',
                providers: [NgModel]
            },] }
];
/** @nocollapse */
CapitalizeDirective.ctorParameters = () => [
    { type: NgModel }
];
CapitalizeDirective.propDecorators = {
    onInputChange: [{ type: HostListener, args: ['ngModelChange', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LatinToGreekDirective {
    /**
     * @param {?} model
     * @param {?} el
     */
    constructor(model, el) {
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
    getCaret() {
        return {
            start: this.el.nativeElement.selectionStart,
            end: this.el.nativeElement.selectionEnd,
        };
    }
    /**
     * @private
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    setCaret(start, end) {
        this.el.nativeElement.selectionStart = start;
        this.el.nativeElement.selectionEnd = end;
        this.el.nativeElement.focus();
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onInputChange($event) {
        const { start, end } = this.getCaret();
        /** @type {?} */
        let translated = $event.toLocaleUpperCase();
        this.latinToGreek.forEach(replace => {
            translated = translated.replace(replace[0], replace[1]);
        });
        this.model.valueAccessor.writeValue(translated);
        this.setCaret(start, end);
    }
}
LatinToGreekDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngModel][lsnLatinToGreek]',
                providers: [NgModel]
            },] }
];
/** @nocollapse */
LatinToGreekDirective.ctorParameters = () => [
    { type: NgModel },
    { type: ElementRef }
];
LatinToGreekDirective.propDecorators = {
    onInputChange: [{ type: HostListener, args: ['ngModelChange', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const NumericSeparator = {
    COMMA: ',',
    PERIOD: '.',
    SPACE: ' ',
};
class DefaultNumericConfig {
    /**
     * @param {?=} props
     */
    constructor(props = {}) {
        this.precision = 0;
        this.decimals = NumericSeparator.PERIOD;
        Object.assign(this, props);
    }
}
class CustomConfig {
    /**
     * @param {?=} props
     */
    constructor(props = {}) {
        Object.assign(this, props);
    }
}
class ConfigService {
    /**
     * @param {?} config
     */
    constructor(config) {
        /** @type {?} */
        let moduleConfig = new CustomConfig();
        if (config) {
            moduleConfig = Object.assign(moduleConfig, config);
        }
        /** @type {?} */
        const numericConfig = moduleConfig.numeric || {};
        /** @type {?} */
        const customConfig = moduleConfig.custom || {};
        this.config = new CustomConfig({
            numeric: new DefaultNumericConfig(numericConfig),
            custom: customConfig,
        });
    }
    /**
     * @return {?}
     */
    getNumericConfig() {
        return this.config.numeric;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    getCustomConfig(key) {
        return this.config.custom[key] || {};
    }
}
ConfigService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ConfigService.ctorParameters = () => [
    { type: CustomConfig }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NumericDirective {
    /**
     * @param {?} el
     * @param {?} configService
     */
    constructor(el, configService) {
        this.el = el;
        this.configService = configService;
        this.lsnNumeric = {};
        // private modelValue: number;
        this.onChange = (_) => { };
        this.onTouch = () => { };
        this.element = el;
        this.setConfig();
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this.setConfig();
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    inputHandler($event) {
        if ($event.target.value === '-') {
            return;
        }
        /** @type {?} */
        const value = this.handleLength($event.target.value);
        /** @type {?} */
        const parsedValue = this.parseValue(value);
        /** @type {?} */
        const rangeValue = this.handleRange(parsedValue);
        if (parsedValue === rangeValue) {
            this.displayValue = value.replace(/[,|.]/, this.config.decimals);
            this.onChange(parsedValue);
        }
        else {
            this.displayValue = rangeValue.toString().replace(/[,|.]/, this.config.decimals);
            this.onChange(rangeValue);
        }
    }
    /**
     * @return {?}
     */
    focusHandler() {
        this.setEditMode();
    }
    /**
     * @return {?}
     */
    blurHandler() {
        this.displayValue = this.prepareDisplayValue(this.element.nativeElement.value);
    }
    /**
     * @param {?} modelValue
     * @return {?}
     */
    writeValue(modelValue) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            let parsedValue = this.parseValue(modelValue);
            parsedValue = this.handleRange(parsedValue);
            this.displayValue = this.prepareDisplayValue(parsedValue);
        });
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouch = fn;
    }
    /**
     * @return {?}
     */
    get displayValue() {
        return this.element.nativeElement.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set displayValue(value) {
        this.element.nativeElement.value = value;
    }
    /**
     * @return {?}
     */
    setConfig() {
        /** @type {?} */
        const defaultConfig = this.lsnNumeric.config
            ? this.configService.getCustomConfig(this.lsnNumeric.config)
            : this.configService.getNumericConfig();
        this.config = Object.assign(Object.assign({}, defaultConfig, this.lsnNumeric));
        if (this.config.decimals && this.config.thousands && this.config.decimals === this.config.thousands) {
            this.config.thousands = undefined;
        }
        if (this.config.max !== undefined && this.config.maxLength !== undefined) {
            console.warn('[lsnNumeric] Setting `maxLength` makes `max` redundant.');
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    parseValue(value) {
        if (!value && value !== 0) {
            return undefined;
        }
        /** @type {?} */
        const newValue = value.toString().replace(/[,|.]/, '.');
        /** @type {?} */
        const parsedValue = this.config.precision > 0
            ? parseFloat(newValue)
            : parseInt(newValue, 10);
        return isNaN(parsedValue) ? undefined : parsedValue;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    handleLength(value) {
        if (this.config.maxLength
            && value.toString().length > this.config.maxLength) {
            return value.toString().substr(0, this.config.maxLength);
        }
        return value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    handleRange(value) {
        if (!this.config.maxLength && this.config.max !== undefined && value > this.config.max) {
            return this.config.max;
        }
        else if (this.config.min !== undefined && value < this.config.min) {
            return this.config.min;
        }
        return value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    prepareDisplayValue(value) {
        if (!value && value !== 0) {
            return '';
        }
        const [whole, decimals] = typeof value === 'number'
            ? value.toString().split('.')
            : value.toString().split(this.config.decimals);
        /** @type {?} */
        const isNegative = whole[0] === '-';
        /** @type {?} */
        let result = whole === '-' || !whole
            ? '0'
            : Math.abs(parseInt(whole, 10)).toString();
        if (this.config.thousands) {
            result = result.replace(/\B(?=(\d{3})+(?!\d))/g, this.config.thousands);
        }
        if (decimals && this.config.precision && this.config.decimals) {
            result = result + this.config.decimals + decimals;
        }
        return isNegative && result !== '0' ? '-' + result : result;
    }
    /**
     * @return {?}
     */
    setEditMode() {
        if (this.config.thousands) {
            /** @type {?} */
            const currentValue = this.element.nativeElement.value;
            const [whole, decimals] = currentValue.split(this.config.decimals);
            /** @type {?} */
            const regex = new RegExp('\\' + this.config.thousands, 'g');
            /** @type {?} */
            let result = whole.replace(regex, '');
            if (decimals && this.config.precision && this.config.decimals) {
                result = result + this.config.decimals + decimals;
            }
            this.displayValue = result;
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    keyDownHandler(e) {
        /** @type {?} */
        const currentValue = this.element.nativeElement.value;
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
            && currentValue.toString().length >= this.config.maxLength) {
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
            const [, decimals] = currentValue.split(this.config.decimals);
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
    }
}
NumericDirective.decorators = [
    { type: Directive, args: [{
                selector: '[lsnNumeric]',
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => NumericDirective),
                        multi: true
                    },
                ]
            },] }
];
/** @nocollapse */
NumericDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: ConfigService }
];
NumericDirective.propDecorators = {
    lsnNumeric: [{ type: Input }],
    inputHandler: [{ type: HostListener, args: ['input', ['$event'],] }],
    focusHandler: [{ type: HostListener, args: ['focus', ['$event'],] }],
    blurHandler: [{ type: HostListener, args: ['blur', ['$event'],] }],
    keyDownHandler: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NumPadConfig {
    constructor() {
        this.allowLeadingZeros = false;
    }
}
class NumPadDirective {
    /**
     * @param {?} element
     * @param {?} ngControl
     */
    constructor(element, ngControl) {
        this.element = element;
        this.ngControl = ngControl;
        this.lsnNumPad = {};
        this.defaultConfig = new NumPadConfig();
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this.config = Object.assign(Object.assign({}, this.defaultConfig, this.lsnNumPad));
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    inputHandler($event) {
        /** @type {?} */
        const currentValue = $event.target.value;
        this.setValue(this.parseNewValue(currentValue));
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    blurHandler($event) {
        /** @type {?} */
        const currentValue = $event.target.value;
        this.setValue(this.parseNewValue(currentValue, true));
    }
    /**
     * @protected
     * @param {?} value
     * @return {?}
     */
    setValue(value) {
        if (this.ngControl && this.ngControl.control) {
            this.ngControl.control.setValue(value);
        }
        else {
            this.element.nativeElement.value = value;
        }
    }
    /**
     * @protected
     * @param {?} value
     * @param {?=} blurEvent
     * @return {?}
     */
    parseNewValue(value, blurEvent = false) {
        /** @type {?} */
        let newValue = value.replace(/[^0-9]/g, '');
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
    }
    /**
     * @param {?} e
     * @return {?}
     */
    keyDownHandler(e) {
        /** @type {?} */
        const currentValue = this.element.nativeElement.value;
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
    }
}
NumPadDirective.decorators = [
    { type: Directive, args: [{
                selector: '[lsnNumPad]'
            },] }
];
/** @nocollapse */
NumPadDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NgControl, decorators: [{ type: Optional }] }
];
NumPadDirective.propDecorators = {
    lsnNumPad: [{ type: Input }],
    inputHandler: [{ type: HostListener, args: ['input', ['$event'],] }],
    blurHandler: [{ type: HostListener, args: ['blur', ['$event'],] }],
    keyDownHandler: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LsnLibsModule {
    /**
     * @param {?=} config
     * @return {?}
     */
    static forRoot(config) {
        return {
            ngModule: LsnLibsModule,
            providers: [
                ConfigService,
                { provide: CustomConfig, useValue: config }
            ]
        };
    }
}
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { LsnLibsModule, CapitalizeDirective, LatinToGreekDirective, NumericDirective, NumPadDirective, ConfigService as ɵb, CustomConfig as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNub3ZhLWFuZ3VsYXJtb2R1bGVzLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9AbHNub3ZhL2FuZ3VsYXJtb2R1bGVzL2xpYi9kaXJlY3RpdmVzL2NhcGl0YWxpemUvY2FwaXRhbGl6ZS5kaXJlY3RpdmUudHMiLCJuZzovL0Bsc25vdmEvYW5ndWxhcm1vZHVsZXMvbGliL2RpcmVjdGl2ZXMvbGF0aW4tdG8tZ3JlZWsvbGF0aW4tdG8tZ3JlZWsuZGlyZWN0aXZlLnRzIiwibmc6Ly9AbHNub3ZhL2FuZ3VsYXJtb2R1bGVzL2xpYi9zZXJ2aWNlcy9jb25maWcuc2VydmljZS50cyIsIm5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy9saWIvZGlyZWN0aXZlcy9udW1lcmljL251bWVyaWMuZGlyZWN0aXZlLnRzIiwibmc6Ly9AbHNub3ZhL2FuZ3VsYXJtb2R1bGVzL2xpYi9kaXJlY3RpdmVzL251bXBhZC9udW1wYWQuZGlyZWN0aXZlLnRzIiwibmc6Ly9AbHNub3ZhL2FuZ3VsYXJtb2R1bGVzL2xpYi9sc24tbGlicy5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05nTW9kZWx9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW25nTW9kZWxdW2xzbkNhcGl0YWxpemVdJyxcbiAgcHJvdmlkZXJzOiBbTmdNb2RlbF1cbn0pXG5leHBvcnQgY2xhc3MgQ2FwaXRhbGl6ZURpcmVjdGl2ZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbW9kZWw6IE5nTW9kZWwpIHtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ25nTW9kZWxDaGFuZ2UnLCBbJyRldmVudCddKVxuICBvbklucHV0Q2hhbmdlKCRldmVudCkge1xuICAgIHRoaXMubW9kZWwudmFsdWVBY2Nlc3Nvci53cml0ZVZhbHVlKCRldmVudC50b0xvY2FsZVVwcGVyQ2FzZSgpKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TmdNb2RlbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuZ01vZGVsXVtsc25MYXRpblRvR3JlZWtdJyxcbiAgcHJvdmlkZXJzOiBbTmdNb2RlbF1cbn0pXG5leHBvcnQgY2xhc3MgTGF0aW5Ub0dyZWVrRGlyZWN0aXZlIHtcblxuICBwcml2YXRlIGxhdGluVG9HcmVlayA9IFtcbiAgICBbL0EvaWcsICfDjsKRJ10sXG4gICAgWy9CL2lnLCAnw47CkiddLFxuICAgIFsvRy9pZywgJ8OOwpMnXSxcbiAgICBbL0QvaWcsICfDjsKUJ10sXG4gICAgWy9FL2lnLCAnw47ClSddLFxuICAgIFsvWi9pZywgJ8OOwpYnXSxcbiAgICBbL0gvaWcsICfDjsKXJ10sXG4gICAgWy9VL2lnLCAnw47CmCddLFxuICAgIFsvSS9pZywgJ8OOwpknXSxcbiAgICBbL0svaWcsICfDjsKaJ10sXG4gICAgWy9ML2lnLCAnw47CmyddLFxuICAgIFsvTS9pZywgJ8OOwpwnXSxcbiAgICBbL04vaWcsICfDjsKdJ10sXG4gICAgWy9KL2lnLCAnw47CniddLFxuICAgIFsvTy9pZywgJ8OOwp8nXSxcbiAgICBbL1AvaWcsICfDjsKgJ10sXG4gICAgWy9SL2lnLCAnw47CoSddLFxuICAgIFsvUy9pZywgJ8OOwqMnXSxcbiAgICBbL1QvaWcsICfDjsKkJ10sXG4gICAgWy9ZL2lnLCAnw47CpSddLFxuICAgIFsvRi9pZywgJ8OOwqYnXSxcbiAgICBbL1gvaWcsICfDjsKnJ10sXG4gICAgWy9DL2lnLCAnw47CqCddLFxuICAgIFsvVi9pZywgJ8OOwqknXSxcbiAgICBbL1cvaWcsICdXJ10sXG4gICAgWy9RL2lnLCAnUSddXG4gIF07XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RlbDogTmdNb2RlbCwgcHJpdmF0ZSBlbDogRWxlbWVudFJlZikge1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRDYXJldCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhcnQ6IHRoaXMuZWwubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCxcbiAgICAgIGVuZDogdGhpcy5lbC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvbkVuZCxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRDYXJldChzdGFydCwgZW5kKSB7XG4gICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0ID0gc3RhcnQ7XG4gICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvbkVuZCA9IGVuZDtcbiAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG5cbiAgQEhvc3RMaXN0ZW5lcignbmdNb2RlbENoYW5nZScsIFsnJGV2ZW50J10pXG4gIG9uSW5wdXRDaGFuZ2UoJGV2ZW50KSB7XG4gICAgY29uc3Qge3N0YXJ0LCBlbmR9ID0gdGhpcy5nZXRDYXJldCgpO1xuXG4gICAgbGV0IHRyYW5zbGF0ZWQgPSAkZXZlbnQudG9Mb2NhbGVVcHBlckNhc2UoKTtcbiAgICB0aGlzLmxhdGluVG9HcmVlay5mb3JFYWNoKHJlcGxhY2UgPT4ge1xuICAgICAgdHJhbnNsYXRlZCA9IHRyYW5zbGF0ZWQucmVwbGFjZShyZXBsYWNlWzBdLCByZXBsYWNlWzFdKTtcbiAgICB9KTtcbiAgICB0aGlzLm1vZGVsLnZhbHVlQWNjZXNzb3Iud3JpdGVWYWx1ZSh0cmFuc2xhdGVkKTtcbiAgICB0aGlzLnNldENhcmV0KHN0YXJ0LCBlbmQpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmVudW0gTnVtZXJpY1NlcGFyYXRvciB7XG4gIENPTU1BID0gJywnLFxuICBQRVJJT0QgPSAnLicsXG4gIFNQQUNFID0gJyAnXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTnVtZXJpY0NvbmZpZyB7XG4gIG1pbj86IG51bWJlcjtcbiAgbWF4PzogbnVtYmVyO1xuICBtYXhMZW5ndGg/OiBudW1iZXI7XG4gIHByZWNpc2lvbj86IG51bWJlcjtcbiAgZGVjaW1hbHM/OiBzdHJpbmc7XG4gIHRob3VzYW5kcz86IHN0cmluZztcbiAgY29uZmlnPzogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgRGVmYXVsdE51bWVyaWNDb25maWcgaW1wbGVtZW50cyBOdW1lcmljQ29uZmlnIHtcbiAgbWluOiBudW1iZXI7XG4gIG1heDogbnVtYmVyO1xuICBtYXhMZW5ndGg6IG51bWJlcjtcbiAgcHJlY2lzaW9uID0gMDtcbiAgZGVjaW1hbHM6IHN0cmluZyA9IE51bWVyaWNTZXBhcmF0b3IuUEVSSU9EO1xuICB0aG91c2FuZHM6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcm9wcyA9IHt9KSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBwcm9wcyk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEN1c3RvbUNvbmZpZyB7XG4gIG51bWVyaWM/OiBOdW1lcmljQ29uZmlnO1xuICBjdXN0b20/OiB7IFtrZXk6IHN0cmluZ106IE51bWVyaWNDb25maWcgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcyA9IHt9KSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBwcm9wcyk7XG4gIH1cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbmZpZ1NlcnZpY2Uge1xuICBwcml2YXRlIGNvbmZpZzogQ3VzdG9tQ29uZmlnO1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogQ3VzdG9tQ29uZmlnKSB7XG5cbiAgICBsZXQgbW9kdWxlQ29uZmlnID0gbmV3IEN1c3RvbUNvbmZpZygpO1xuICAgIGlmIChjb25maWcpIHtcbiAgICAgIG1vZHVsZUNvbmZpZyA9IE9iamVjdC5hc3NpZ24obW9kdWxlQ29uZmlnLCBjb25maWcpO1xuICAgIH1cblxuICAgIGNvbnN0IG51bWVyaWNDb25maWcgPSBtb2R1bGVDb25maWcubnVtZXJpYyB8fCB7fTtcbiAgICBjb25zdCBjdXN0b21Db25maWcgPSBtb2R1bGVDb25maWcuY3VzdG9tIHx8IHt9O1xuICAgIHRoaXMuY29uZmlnID0gbmV3IEN1c3RvbUNvbmZpZyh7XG4gICAgICBudW1lcmljOiBuZXcgRGVmYXVsdE51bWVyaWNDb25maWcobnVtZXJpY0NvbmZpZyksXG4gICAgICBjdXN0b206IGN1c3RvbUNvbmZpZyxcbiAgICB9KTtcbiAgfVxuXG4gIGdldE51bWVyaWNDb25maWcoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLm51bWVyaWM7XG4gIH1cblxuICBnZXRDdXN0b21Db25maWcoa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmN1c3RvbVtrZXldIHx8IHt9O1xuICB9XG59XG4iLCJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgZm9yd2FyZFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25DaGFuZ2VzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIGtleWJvYXJkIGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtDb25maWdTZXJ2aWNlLCBOdW1lcmljQ29uZmlnfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jb25maWcuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tsc25OdW1lcmljXScsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTnVtZXJpY0RpcmVjdGl2ZSksXG4gICAgICBtdWx0aTogdHJ1ZVxuICAgIH0sXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTnVtZXJpY0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBASW5wdXQoKSBsc25OdW1lcmljOiBOdW1lcmljQ29uZmlnID0ge307XG4gIGVsZW1lbnQ6IEVsZW1lbnRSZWY7XG4gIHByb3RlY3RlZCBjb25maWc6IE51bWVyaWNDb25maWc7XG4gIC8vIHByaXZhdGUgbW9kZWxWYWx1ZTogbnVtYmVyO1xuICBwdWJsaWMgb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7fTtcbiAgcHVibGljIG9uVG91Y2ggPSAoKSA9PiB7fTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIGNvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2UpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbDtcbiAgICB0aGlzLnNldENvbmZpZygpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgdGhpcy5zZXRDb25maWcoKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2lucHV0JywgWyckZXZlbnQnXSlcbiAgaW5wdXRIYW5kbGVyKCRldmVudCkge1xuICAgIGlmICgkZXZlbnQudGFyZ2V0LnZhbHVlID09PSAnLScpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmhhbmRsZUxlbmd0aCgkZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICBjb25zdCBwYXJzZWRWYWx1ZSA9IHRoaXMucGFyc2VWYWx1ZSh2YWx1ZSk7XG4gICAgY29uc3QgcmFuZ2VWYWx1ZSA9IHRoaXMuaGFuZGxlUmFuZ2UocGFyc2VkVmFsdWUpO1xuICAgIGlmIChwYXJzZWRWYWx1ZSA9PT0gcmFuZ2VWYWx1ZSkge1xuICAgICAgdGhpcy5kaXNwbGF5VmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9bLHwuXS8sIHRoaXMuY29uZmlnLmRlY2ltYWxzKTtcbiAgICAgIHRoaXMub25DaGFuZ2UocGFyc2VkVmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRpc3BsYXlWYWx1ZSA9IHJhbmdlVmFsdWUudG9TdHJpbmcoKS5yZXBsYWNlKC9bLHwuXS8sIHRoaXMuY29uZmlnLmRlY2ltYWxzKTtcbiAgICAgIHRoaXMub25DaGFuZ2UocmFuZ2VWYWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZm9jdXMnLCBbJyRldmVudCddKVxuICBmb2N1c0hhbmRsZXIoKSB7XG4gICAgdGhpcy5zZXRFZGl0TW9kZSgpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignYmx1cicsIFsnJGV2ZW50J10pXG4gIGJsdXJIYW5kbGVyKCkge1xuICAgIHRoaXMuZGlzcGxheVZhbHVlID0gdGhpcy5wcmVwYXJlRGlzcGxheVZhbHVlKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyB3cml0ZVZhbHVlKG1vZGVsVmFsdWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxldCBwYXJzZWRWYWx1ZSA9IHRoaXMucGFyc2VWYWx1ZShtb2RlbFZhbHVlKTtcbiAgICBwYXJzZWRWYWx1ZSA9IHRoaXMuaGFuZGxlUmFuZ2UocGFyc2VkVmFsdWUpO1xuICAgIHRoaXMuZGlzcGxheVZhbHVlID0gdGhpcy5wcmVwYXJlRGlzcGxheVZhbHVlKHBhcnNlZFZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaCA9IGZuO1xuICB9XG5cbiAgZ2V0IGRpc3BsYXlWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gIH1cblxuICBzZXQgZGlzcGxheVZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHNldENvbmZpZygpIHtcbiAgICBjb25zdCBkZWZhdWx0Q29uZmlnID0gdGhpcy5sc25OdW1lcmljLmNvbmZpZ1xuICAgICAgPyB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0Q3VzdG9tQ29uZmlnKHRoaXMubHNuTnVtZXJpYy5jb25maWcpXG4gICAgICA6IHRoaXMuY29uZmlnU2VydmljZS5nZXROdW1lcmljQ29uZmlnKCk7XG4gICAgdGhpcy5jb25maWcgPSBPYmplY3QuYXNzaWduKHsuLi5kZWZhdWx0Q29uZmlnLCAuLi50aGlzLmxzbk51bWVyaWN9KTtcbiAgICBpZiAodGhpcy5jb25maWcuZGVjaW1hbHMgJiYgdGhpcy5jb25maWcudGhvdXNhbmRzICYmIHRoaXMuY29uZmlnLmRlY2ltYWxzID09PSB0aGlzLmNvbmZpZy50aG91c2FuZHMpIHtcbiAgICAgIHRoaXMuY29uZmlnLnRob3VzYW5kcyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKHRoaXMuY29uZmlnLm1heCAhPT0gdW5kZWZpbmVkICYmIHRoaXMuY29uZmlnLm1heExlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1tsc25OdW1lcmljXSBTZXR0aW5nIGBtYXhMZW5ndGhgIG1ha2VzIGBtYXhgIHJlZHVuZGFudC4nKTtcbiAgICB9XG4gIH1cblxuICBwYXJzZVZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKCF2YWx1ZSAmJiB2YWx1ZSAhPT0gMCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgY29uc3QgbmV3VmFsdWUgPSB2YWx1ZS50b1N0cmluZygpLnJlcGxhY2UoL1ssfC5dLywgJy4nKTtcbiAgICBjb25zdCBwYXJzZWRWYWx1ZSA9IHRoaXMuY29uZmlnLnByZWNpc2lvbiA+IDBcbiAgICAgID8gcGFyc2VGbG9hdChuZXdWYWx1ZSlcbiAgICAgIDogcGFyc2VJbnQobmV3VmFsdWUsIDEwKTtcbiAgICByZXR1cm4gaXNOYU4ocGFyc2VkVmFsdWUpID8gdW5kZWZpbmVkIDogcGFyc2VkVmFsdWU7XG4gIH1cblxuICBoYW5kbGVMZW5ndGgodmFsdWUpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLmNvbmZpZy5tYXhMZW5ndGhcbiAgICAgICYmIHZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoID4gdGhpcy5jb25maWcubWF4TGVuZ3RoXG4gICAgKSB7XG4gICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKS5zdWJzdHIoMCwgdGhpcy5jb25maWcubWF4TGVuZ3RoKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgaGFuZGxlUmFuZ2UodmFsdWUpIHtcbiAgICBpZiAoIXRoaXMuY29uZmlnLm1heExlbmd0aCAmJiB0aGlzLmNvbmZpZy5tYXggIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSA+IHRoaXMuY29uZmlnLm1heCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLm1heDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY29uZmlnLm1pbiAhPT0gdW5kZWZpbmVkICYmIHZhbHVlIDwgdGhpcy5jb25maWcubWluKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25maWcubWluO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBwcmVwYXJlRGlzcGxheVZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKCF2YWx1ZSAmJiB2YWx1ZSAhPT0gMCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBjb25zdCBbd2hvbGUsIGRlY2ltYWxzXSA9IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcidcbiAgICAgID8gdmFsdWUudG9TdHJpbmcoKS5zcGxpdCgnLicpXG4gICAgICA6IHZhbHVlLnRvU3RyaW5nKCkuc3BsaXQodGhpcy5jb25maWcuZGVjaW1hbHMpO1xuICAgIGNvbnN0IGlzTmVnYXRpdmUgPSB3aG9sZVswXSA9PT0gJy0nO1xuICAgIGxldCByZXN1bHQgPSB3aG9sZSA9PT0gJy0nIHx8ICF3aG9sZVxuICAgICAgPyAnMCdcbiAgICAgIDogTWF0aC5hYnMocGFyc2VJbnQod2hvbGUsIDEwKSkudG9TdHJpbmcoKTtcbiAgICBpZiAodGhpcy5jb25maWcudGhvdXNhbmRzKSB7XG4gICAgICByZXN1bHQgPSByZXN1bHQucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgdGhpcy5jb25maWcudGhvdXNhbmRzKTtcbiAgICB9XG4gICAgaWYgKGRlY2ltYWxzICYmIHRoaXMuY29uZmlnLnByZWNpc2lvbiAmJiB0aGlzLmNvbmZpZy5kZWNpbWFscykge1xuICAgICAgcmVzdWx0ID0gcmVzdWx0ICsgdGhpcy5jb25maWcuZGVjaW1hbHMgKyBkZWNpbWFscztcbiAgICB9XG4gICAgcmV0dXJuIGlzTmVnYXRpdmUgJiYgcmVzdWx0ICE9PSAnMCcgPyAnLScgKyByZXN1bHQgOiByZXN1bHQ7XG4gIH1cblxuICBzZXRFZGl0TW9kZSgpIHtcbiAgICBpZiAodGhpcy5jb25maWcudGhvdXNhbmRzKSB7XG4gICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgICAgIGNvbnN0IFt3aG9sZSwgZGVjaW1hbHNdID0gY3VycmVudFZhbHVlLnNwbGl0KHRoaXMuY29uZmlnLmRlY2ltYWxzKTtcbiAgICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cCgnXFxcXCcgKyB0aGlzLmNvbmZpZy50aG91c2FuZHMsICdnJyk7XG4gICAgICBsZXQgcmVzdWx0ID0gd2hvbGUucmVwbGFjZShyZWdleCwgJycpO1xuICAgICAgaWYgKGRlY2ltYWxzICYmIHRoaXMuY29uZmlnLnByZWNpc2lvbiAmJiB0aGlzLmNvbmZpZy5kZWNpbWFscykge1xuICAgICAgICByZXN1bHQgPSByZXN1bHQgKyB0aGlzLmNvbmZpZy5kZWNpbWFscyArIGRlY2ltYWxzO1xuICAgICAgfVxuICAgICAgdGhpcy5kaXNwbGF5VmFsdWUgPSByZXN1bHQ7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gIGtleURvd25IYW5kbGVyKGU6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgICBpZiAoXG4gICAgICAvLyBBbGxvdyBzcGVjaWFsIGtleXNcbiAgICAgIFtcbiAgICAgICAga2V5Ym9hcmQuTEVGVF9BUlJPVyxcbiAgICAgICAga2V5Ym9hcmQuUklHSFRfQVJST1csXG4gICAgICAgIGtleWJvYXJkLkJBQ0tTUEFDRSxcbiAgICAgICAga2V5Ym9hcmQuREVMRVRFLFxuICAgICAgICBrZXlib2FyZC5FTkQsXG4gICAgICAgIGtleWJvYXJkLkVOVEVSLFxuICAgICAgICBrZXlib2FyZC5FU0NBUEUsXG4gICAgICAgIGtleWJvYXJkLkhPTUUsXG4gICAgICAgIGtleWJvYXJkLlRBQixcbiAgICAgIF0uaW5kZXhPZihlLmtleUNvZGUpICE9PSAtMVxuICAgICAgLy8gQWxsb3cgQ3RybCtrZXkgYWN0aW9uc1xuICAgICAgfHwgKFxuICAgICAgICBbXG4gICAgICAgICAga2V5Ym9hcmQuQSxcbiAgICAgICAgICBrZXlib2FyZC5DLFxuICAgICAgICAgIGtleWJvYXJkLlIsXG4gICAgICAgICAga2V5Ym9hcmQuVixcbiAgICAgICAgICBrZXlib2FyZC5YLFxuICAgICAgICBdLmluZGV4T2YoZS5rZXlDb2RlKSAhPT0gLTFcbiAgICAgICAgJiYgKGUuY3RybEtleSA9PT0gdHJ1ZSB8fCBlLm1ldGFLZXkgPT09IHRydWUpXG4gICAgICApXG4gICAgKSB7XG4gICAgICByZXR1cm47ICAvLyBsZXQgaXQgaGFwcGVuLCBkb24ndCBkbyBhbnl0aGluZ1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBtYXhMZW5ndGhcbiAgICBpZiAoXG4gICAgICB0aGlzLmNvbmZpZy5tYXhMZW5ndGggIT09IHVuZGVmaW5lZFxuICAgICAgJiYgY3VycmVudFZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoID49IHRoaXMuY29uZmlnLm1heExlbmd0aFxuICAgICkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBtaW51c1xuICAgIGlmIChcbiAgICAgIFtrZXlib2FyZC5EQVNILCBrZXlib2FyZC5OVU1QQURfTUlOVVNdLmluZGV4T2YoZS5rZXlDb2RlKSAhPT0gLTFcbiAgICAgICYmIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0ID09PSAwXG4gICAgICAmJiAoKHRoaXMuY29uZmlnLm1pbiAhPT0gdW5kZWZpbmVkICYmIHRoaXMuY29uZmlnLm1pbiA8IDApIHx8IHRoaXMuY29uZmlnLm1pbiA9PT0gdW5kZWZpbmVkKVxuICAgICAgJiYgY3VycmVudFZhbHVlLmluZGV4T2YoJy0nKSA9PT0gLTFcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgc2VwYXJhdG9yXG4gICAgaWYgKFxuICAgICAgdGhpcy5jb25maWcucHJlY2lzaW9uID4gMFxuICAgICAgJiYgW2tleWJvYXJkLkNPTU1BLCBrZXlib2FyZC5OVU1QQURfUEVSSU9ELCAxOTBdLmluZGV4T2YoZS5rZXlDb2RlKSAhPT0gLTFcbiAgICAgICYmIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0ID4gMFxuICAgICAgJiYgY3VycmVudFZhbHVlLmxlbmd0aFxuICAgICAgJiYgY3VycmVudFZhbHVlLmluZGV4T2YoJy4nKSA9PT0gLTFcbiAgICAgICYmIGN1cnJlbnRWYWx1ZS5pbmRleE9mKCcsJykgPT09IC0xXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIGtleSBhZnRlciBzZXBhcmF0b3JcbiAgICBpZiAoXG4gICAgICB0aGlzLmNvbmZpZy5wcmVjaXNpb24gPiAwXG4gICAgICAmJiBjdXJyZW50VmFsdWUuaW5kZXhPZih0aGlzLmNvbmZpZy5kZWNpbWFscykgPiAtMVxuICAgICAgJiYgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPiBjdXJyZW50VmFsdWUuaW5kZXhPZih0aGlzLmNvbmZpZy5kZWNpbWFscylcbiAgICApIHtcbiAgICAgIGNvbnN0IFssIGRlY2ltYWxzXSA9IGN1cnJlbnRWYWx1ZS5zcGxpdCh0aGlzLmNvbmZpZy5kZWNpbWFscyk7XG4gICAgICBpZiAoZGVjaW1hbHMgJiYgZGVjaW1hbHMubGVuZ3RoID49IHRoaXMuY29uZmlnLnByZWNpc2lvbikge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRW5zdXJlIHRoYXQgaXQgaXMgYSBudW1iZXIgb3Igc3RvcCB0aGUga2V5cHJlc3NcbiAgICBpZiAoXG4gICAgICAoXG4gICAgICAgIChcbiAgICAgICAgICBbXG4gICAgICAgICAgICBrZXlib2FyZC5aRVJPLFxuICAgICAgICAgICAga2V5Ym9hcmQuT05FLFxuICAgICAgICAgICAga2V5Ym9hcmQuVFdPLFxuICAgICAgICAgICAga2V5Ym9hcmQuVEhSRUUsXG4gICAgICAgICAgICBrZXlib2FyZC5GT1VSLFxuICAgICAgICAgICAga2V5Ym9hcmQuRklWRSxcbiAgICAgICAgICAgIGtleWJvYXJkLlNJWCxcbiAgICAgICAgICAgIGtleWJvYXJkLlNFVkVOLFxuICAgICAgICAgICAga2V5Ym9hcmQuRUlHSFQsXG4gICAgICAgICAgICBrZXlib2FyZC5OSU5FXG4gICAgICAgICAgXS5pbmRleE9mKGUua2V5Q29kZSkgPT09IC0xXG4gICAgICAgICAgfHwgZS5zaGlmdEtleVxuICAgICAgICApXG4gICAgICAgICYmXG4gICAgICAgIFtcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfWkVSTyxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfT05FLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9UV08sXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX1RIUkVFLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9GT1VSLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9GSVZFLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9TSVgsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX1NFVkVOLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9FSUdIVCxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfTklORSxcbiAgICAgICAgXS5pbmRleE9mKGUua2V5Q29kZSkgPT09IC0xXG4gICAgICApXG4gICAgICB8fCAodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPT09IDAgJiYgY3VycmVudFZhbHVlLmluZGV4T2YoJy0nKSA+IC0xKVxuICAgICkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uQ2hhbmdlcywgT3B0aW9uYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMga2V5Ym9hcmQgZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7TmdDb250cm9sfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmNsYXNzIE51bVBhZENvbmZpZyB7XG4gIG1heGxlbmd0aDogbnVtYmVyO1xuICBhbGxvd0xlYWRpbmdaZXJvcyA9IGZhbHNlO1xufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbHNuTnVtUGFkXSdcbn0pXG5leHBvcnQgY2xhc3MgTnVtUGFkRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgbHNuTnVtUGFkID0ge307XG4gIHByb3RlY3RlZCBjb25maWc6IE51bVBhZENvbmZpZztcbiAgcHJpdmF0ZSBkZWZhdWx0Q29uZmlnOiBOdW1QYWRDb25maWcgPSBuZXcgTnVtUGFkQ29uZmlnKCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLCBAT3B0aW9uYWwoKSBwcml2YXRlIG5nQ29udHJvbDogTmdDb250cm9sKSB7XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLmNvbmZpZyA9IE9iamVjdC5hc3NpZ24oey4uLnRoaXMuZGVmYXVsdENvbmZpZywgLi4udGhpcy5sc25OdW1QYWR9KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2lucHV0JywgWyckZXZlbnQnXSlcbiAgaW5wdXRIYW5kbGVyKCRldmVudCkge1xuICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9ICRldmVudC50YXJnZXQudmFsdWU7XG4gICAgdGhpcy5zZXRWYWx1ZSh0aGlzLnBhcnNlTmV3VmFsdWUoY3VycmVudFZhbHVlKSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdibHVyJywgWyckZXZlbnQnXSlcbiAgYmx1ckhhbmRsZXIoJGV2ZW50KSB7XG4gICAgY29uc3QgY3VycmVudFZhbHVlID0gJGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICB0aGlzLnNldFZhbHVlKHRoaXMucGFyc2VOZXdWYWx1ZShjdXJyZW50VmFsdWUsIHRydWUpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzZXRWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh0aGlzLm5nQ29udHJvbCAmJiB0aGlzLm5nQ29udHJvbC5jb250cm9sKSB7XG4gICAgICB0aGlzLm5nQ29udHJvbC5jb250cm9sLnNldFZhbHVlKHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgcGFyc2VOZXdWYWx1ZSh2YWx1ZSwgYmx1ckV2ZW50ID0gZmFsc2UpIHtcbiAgICBsZXQgbmV3VmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9bXjAtOV0vZywgJycpO1xuICAgIGlmIChuZXdWYWx1ZSA9PT0gJycpIHtcbiAgICAgIHJldHVybiBibHVyRXZlbnQgPyAnJyA6IG5ld1ZhbHVlO1xuICAgIH1cbiAgICBpZiAodGhpcy5jb25maWcubWF4bGVuZ3RoICYmIHRoaXMuY29uZmlnLm1heGxlbmd0aCA+IDApIHtcbiAgICAgIG5ld1ZhbHVlID0gbmV3VmFsdWUuc3Vic3RyaW5nKDAsIHRoaXMuY29uZmlnLm1heGxlbmd0aCk7XG4gICAgfVxuICAgIGlmICghdGhpcy5jb25maWcuYWxsb3dMZWFkaW5nWmVyb3MgJiYgYmx1ckV2ZW50KSB7XG4gICAgICBuZXdWYWx1ZSA9IG5ld1ZhbHVlLnJlcGxhY2UoL14wKy8sICcnKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ld1ZhbHVlO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gIGtleURvd25IYW5kbGVyKGU6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgICBpZiAoXG4gICAgICAvLyBBbGxvdyBzcGVjaWFsIGtleXNcbiAgICAgIFtcbiAgICAgICAga2V5Ym9hcmQuTEVGVF9BUlJPVyxcbiAgICAgICAga2V5Ym9hcmQuUklHSFRfQVJST1csXG4gICAgICAgIGtleWJvYXJkLkJBQ0tTUEFDRSxcbiAgICAgICAga2V5Ym9hcmQuREVMRVRFLFxuICAgICAgICBrZXlib2FyZC5FTkQsXG4gICAgICAgIGtleWJvYXJkLkVOVEVSLFxuICAgICAgICBrZXlib2FyZC5FU0NBUEUsXG4gICAgICAgIGtleWJvYXJkLkhPTUUsXG4gICAgICAgIGtleWJvYXJkLlRBQixcbiAgICAgIF0uaW5kZXhPZihlLmtleUNvZGUpICE9PSAtMVxuICAgICAgLy8gQWxsb3cgQ3RybCtrZXkgYWN0aW9uc1xuICAgICAgfHwgKFxuICAgICAgICBbXG4gICAgICAgICAga2V5Ym9hcmQuQSxcbiAgICAgICAgICBrZXlib2FyZC5DLFxuICAgICAgICAgIGtleWJvYXJkLlIsXG4gICAgICAgICAga2V5Ym9hcmQuVixcbiAgICAgICAgICBrZXlib2FyZC5YLFxuICAgICAgICBdLmluZGV4T2YoZS5rZXlDb2RlKSAhPT0gLTFcbiAgICAgICAgJiYgKGUuY3RybEtleSA9PT0gdHJ1ZSB8fCBlLm1ldGFLZXkgPT09IHRydWUpXG4gICAgICApXG4gICAgKSB7XG4gICAgICByZXR1cm47ICAvLyBsZXQgaXQgaGFwcGVuLCBkb24ndCBkbyBhbnl0aGluZ1xuICAgIH1cblxuICAgIC8vIEVuc3VyZSB0aGF0IGl0IGlzIGEgbnVtYmVyIG9yIHN0b3AgdGhlIGtleXByZXNzXG4gICAgaWYgKFxuICAgICAgKFxuICAgICAgICAoXG4gICAgICAgICAgW1xuICAgICAgICAgICAga2V5Ym9hcmQuWkVSTyxcbiAgICAgICAgICAgIGtleWJvYXJkLk9ORSxcbiAgICAgICAgICAgIGtleWJvYXJkLlRXTyxcbiAgICAgICAgICAgIGtleWJvYXJkLlRIUkVFLFxuICAgICAgICAgICAga2V5Ym9hcmQuRk9VUixcbiAgICAgICAgICAgIGtleWJvYXJkLkZJVkUsXG4gICAgICAgICAgICBrZXlib2FyZC5TSVgsXG4gICAgICAgICAgICBrZXlib2FyZC5TRVZFTixcbiAgICAgICAgICAgIGtleWJvYXJkLkVJR0hULFxuICAgICAgICAgICAga2V5Ym9hcmQuTklORVxuICAgICAgICAgIF0uaW5kZXhPZihlLmtleUNvZGUpID09PSAtMVxuICAgICAgICAgIHx8IGUuc2hpZnRLZXlcbiAgICAgICAgKVxuICAgICAgICAmJlxuICAgICAgICBbXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX1pFUk8sXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX09ORSxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfVFdPLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9USFJFRSxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfRk9VUixcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfRklWRSxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfU0lYLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9TRVZFTixcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfRUlHSFQsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX05JTkUsXG4gICAgICAgIF0uaW5kZXhPZihlLmtleUNvZGUpID09PSAtMVxuICAgICAgKVxuICAgICAgfHwgKFxuICAgICAgICBjdXJyZW50VmFsdWUubGVuZ3RoXG4gICAgICAgICYmIHRoaXMuY29uZmlnLm1heGxlbmd0aCAmJiB0aGlzLmNvbmZpZy5tYXhsZW5ndGggPiAwXG4gICAgICAgICYmIGN1cnJlbnRWYWx1ZS5sZW5ndGggPj0gdGhpcy5jb25maWcubWF4bGVuZ3RoXG4gICAgICApXG4gICAgKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge01vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q2FwaXRhbGl6ZURpcmVjdGl2ZX0gZnJvbSAnLi9kaXJlY3RpdmVzL2NhcGl0YWxpemUvY2FwaXRhbGl6ZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHtMYXRpblRvR3JlZWtEaXJlY3RpdmV9IGZyb20gJy4vZGlyZWN0aXZlcy9sYXRpbi10by1ncmVlay9sYXRpbi10by1ncmVlay5kaXJlY3RpdmUnO1xuaW1wb3J0IHtOdW1lcmljRGlyZWN0aXZlfSBmcm9tICcuL2RpcmVjdGl2ZXMvbnVtZXJpYy9udW1lcmljLmRpcmVjdGl2ZSc7XG5pbXBvcnQge051bVBhZERpcmVjdGl2ZX0gZnJvbSAnLi9kaXJlY3RpdmVzL251bXBhZC9udW1wYWQuZGlyZWN0aXZlJztcbmltcG9ydCB7Q29uZmlnU2VydmljZSwgQ3VzdG9tQ29uZmlnfSBmcm9tICcuL3NlcnZpY2VzL2NvbmZpZy5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQ2FwaXRhbGl6ZURpcmVjdGl2ZSxcbiAgICBMYXRpblRvR3JlZWtEaXJlY3RpdmUsXG4gICAgTnVtZXJpY0RpcmVjdGl2ZSxcbiAgICBOdW1QYWREaXJlY3RpdmUsXG4gIF0sXG4gIGltcG9ydHM6IFtdLFxuICBleHBvcnRzOiBbXG4gICAgQ2FwaXRhbGl6ZURpcmVjdGl2ZSxcbiAgICBMYXRpblRvR3JlZWtEaXJlY3RpdmUsXG4gICAgTnVtZXJpY0RpcmVjdGl2ZSxcbiAgICBOdW1QYWREaXJlY3RpdmUsXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTHNuTGlic01vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZz86IEN1c3RvbUNvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTHNuTGlic01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBDb25maWdTZXJ2aWNlLFxuICAgICAgICB7cHJvdmlkZTogQ3VzdG9tQ29uZmlnLCB1c2VWYWx1ZTogY29uZmlnfVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJrZXlib2FyZC5MRUZUX0FSUk9XIiwia2V5Ym9hcmQuUklHSFRfQVJST1ciLCJrZXlib2FyZC5CQUNLU1BBQ0UiLCJrZXlib2FyZC5ERUxFVEUiLCJrZXlib2FyZC5FTkQiLCJrZXlib2FyZC5FTlRFUiIsImtleWJvYXJkLkVTQ0FQRSIsImtleWJvYXJkLkhPTUUiLCJrZXlib2FyZC5UQUIiLCJrZXlib2FyZC5BIiwia2V5Ym9hcmQuQyIsImtleWJvYXJkLlIiLCJrZXlib2FyZC5WIiwia2V5Ym9hcmQuWCIsImtleWJvYXJkLkRBU0giLCJrZXlib2FyZC5OVU1QQURfTUlOVVMiLCJrZXlib2FyZC5DT01NQSIsImtleWJvYXJkLk5VTVBBRF9QRVJJT0QiLCJrZXlib2FyZC5aRVJPIiwia2V5Ym9hcmQuT05FIiwia2V5Ym9hcmQuVFdPIiwia2V5Ym9hcmQuVEhSRUUiLCJrZXlib2FyZC5GT1VSIiwia2V5Ym9hcmQuRklWRSIsImtleWJvYXJkLlNJWCIsImtleWJvYXJkLlNFVkVOIiwia2V5Ym9hcmQuRUlHSFQiLCJrZXlib2FyZC5OSU5FIiwia2V5Ym9hcmQuTlVNUEFEX1pFUk8iLCJrZXlib2FyZC5OVU1QQURfT05FIiwia2V5Ym9hcmQuTlVNUEFEX1RXTyIsImtleWJvYXJkLk5VTVBBRF9USFJFRSIsImtleWJvYXJkLk5VTVBBRF9GT1VSIiwia2V5Ym9hcmQuTlVNUEFEX0ZJVkUiLCJrZXlib2FyZC5OVU1QQURfU0lYIiwia2V5Ym9hcmQuTlVNUEFEX1NFVkVOIiwia2V5Ym9hcmQuTlVNUEFEX0VJR0hUIiwia2V5Ym9hcmQuTlVNUEFEX05JTkUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE1BT2EsbUJBQW1COzs7O0lBQzlCLFlBQW9CLEtBQWM7UUFBZCxVQUFLLEdBQUwsS0FBSyxDQUFTO0tBQ2pDOzs7OztJQUdELGFBQWEsQ0FBQyxNQUFNO1FBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO0tBQ2pFOzs7WUFYRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDBCQUEwQjtnQkFDcEMsU0FBUyxFQUFFLENBQUMsT0FBTyxDQUFDO2FBQ3JCOzs7O1lBTE8sT0FBTzs7OzRCQVVaLFlBQVksU0FBQyxlQUFlLEVBQUUsQ0FBQyxRQUFRLENBQUM7Ozs7Ozs7QUNYM0MsTUFRYSxxQkFBcUI7Ozs7O0lBK0JoQyxZQUFvQixLQUFjLEVBQVUsRUFBYztRQUF0QyxVQUFLLEdBQUwsS0FBSyxDQUFTO1FBQVUsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQTdCbEQsaUJBQVksR0FBRztZQUNyQixDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7WUFDWixDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7WUFDWixDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7WUFDWixDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7WUFDWixDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7WUFDWixDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7WUFDWixDQUFDLEtBQUssRUFB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