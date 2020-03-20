import { Injectable, forwardRef, Directive, ElementRef, Input, HostListener, NgModule, Optional, EventEmitter, Output, InjectionToken, Inject, ɵɵdefineInjectable, ɵɵinject } from '@angular/core';
import { __awaiter } from 'tslib';
import { LEFT_ARROW, RIGHT_ARROW, BACKSPACE, DELETE, END, ENTER, ESCAPE, HOME, TAB, A, C, R, V, X, DASH, NUMPAD_MINUS, COMMA, NUMPAD_PERIOD, ZERO, ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE, NUMPAD_ZERO, NUMPAD_ONE, NUMPAD_TWO, NUMPAD_THREE, NUMPAD_FOUR, NUMPAD_FIVE, NUMPAD_SIX, NUMPAD_SEVEN, NUMPAD_EIGHT, NUMPAD_NINE } from '@angular/cdk/keycodes';
import { NG_VALUE_ACCESSOR, NgControl, NgModel, FormsModule } from '@angular/forms';
import { Subject, interval } from 'rxjs';
import { distinctUntilChanged, tap, filter } from 'rxjs/operators';
import { CommonModule, DOCUMENT } from '@angular/common';

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
class CustomNumericConfig {
    /**
     * @param {?=} props
     */
    constructor(props = {}) {
        Object.assign(this, props);
    }
}
class NumericConfigService {
    /**
     * @param {?} config
     */
    constructor(config) {
        /** @type {?} */
        let moduleConfig = new CustomNumericConfig();
        if (config) {
            moduleConfig = Object.assign(moduleConfig, config);
        }
        /** @type {?} */
        const numericConfig = moduleConfig.default || {};
        /** @type {?} */
        const customConfig = moduleConfig.custom || {};
        this.config = new CustomNumericConfig({
            default: new DefaultNumericConfig(numericConfig),
            custom: customConfig,
        });
    }
    /**
     * @return {?}
     */
    getDefaultConfig() {
        return this.config.default;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    getCustomConfig(key) {
        if (!this.config.custom[key]) {
            console.warn('[lsnNumeric] Invalid config key provided.');
        }
        return Object.assign({}, this.getDefaultConfig(), this.config.custom[key]) || this.getDefaultConfig();
    }
}
NumericConfigService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NumericConfigService.ctorParameters = () => [
    { type: CustomNumericConfig }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const CUSTOM_SELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NumericDirective),
    multi: true
};
class NumericDirective {
    /**
     * @param {?} el
     * @param {?} configService
     */
    constructor(el, configService) {
        this.el = el;
        this.configService = configService;
        this.lsnNumeric = {};
        this.onChange = (_) => {
        };
        this.onTouch = () => {
        };
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
        let value = this.removeInvalidCharacters($event.target.value);
        value = this.handleWholesLength(value);
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
            : this.configService.getDefaultConfig();
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
    handleWholesLength(value) {
        if (this.config.maxLength) {
            /** @type {?} */
            const negativeSign = value.toString().startsWith('-') ? '-' : '';
            /** @type {?} */
            const absoluteValue = value.toString()
                .replace(/^-/, '')
                .replace(/[,|.]/, this.config.decimals);
            if (absoluteValue.toString().includes(this.config.decimals)) {
                const [wholes, decimals] = absoluteValue.toString().split(this.config.decimals);
                /** @type {?} */
                const properDecimals = this.removeInvalidCharacters(decimals, true);
                return negativeSign + wholes.substr(0, this.config.maxLength) + this.config.decimals + properDecimals;
            }
            return negativeSign + absoluteValue.toString().substr(0, this.config.maxLength);
        }
        return value;
    }
    /**
     * @param {?} value
     * @param {?=} allowDecimalsOnly
     * @return {?}
     */
    removeInvalidCharacters(value, allowDecimalsOnly = false) {
        return allowDecimalsOnly
            ? value.replace(/[^0-9]/g, '')
            : value.replace(/[^\-0-9,.]/g, '');
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
        /** @type {?} */
        const absoluteValue = currentValue.toString().replace(/^-/, '');
        const [wholes] = absoluteValue.toString().split(this.config.decimals);
        if (this.config.maxLength !== undefined
            && (this.element.nativeElement.selectionStart < wholes.length
                && wholes.length >= this.config.maxLength
                && [DASH, NUMPAD_MINUS].indexOf(e.keyCode) === -1)
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
            || (this.element.nativeElement.selectionStart === 0
                && this.element.nativeElement.selectionEnd === 0
                && currentValue.indexOf('-') > -1)) {
            e.preventDefault();
        }
    }
}
NumericDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngModel][lsnNumeric]',
                providers: [CUSTOM_SELECT_VALUE_ACCESSOR]
            },] }
];
/** @nocollapse */
NumericDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NumericConfigService }
];
NumericDirective.propDecorators = {
    lsnNumeric: [{ type: Input }],
    inputHandler: [{ type: HostListener, args: ['input', ['$event'],] }],
    focusHandler: [{ type: HostListener, args: ['focus', [],] }],
    blurHandler: [{ type: HostListener, args: ['blur', [],] }],
    keyDownHandler: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LsnNumericModule {
    /**
     * @param {?=} config
     * @return {?}
     */
    static forRoot(config) {
        return {
            ngModule: LsnNumericModule,
            providers: [
                NumericConfigService,
                { provide: CustomNumericConfig, useValue: config }
            ]
        };
    }
}
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
class LsnNumpadModule {
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
class LsnLatinToGreekModule {
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
class LsnCapitalizeModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ScrollSpyDirective {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.spySectionChange = new EventEmitter();
        this.disableEmitter = false;
        this.subscriptions = [];
        this.currentSection$ = new Subject();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.scrollOffset = this.nativeElement().offsetTop;
        // emit event on section change
        /** @type {?} */
        const sectionChangeSub = this.currentSection$.pipe(distinctUntilChanged(), tap((sectionId) => this.spySectionChange.emit(sectionId))).subscribe();
        // scroll to given section
        /** @type {?} */
        const scrollToSub = this.scrollToSection.pipe(filter((section) => !!section), tap((section) => this.scrollTo(section))).subscribe();
        this.subscriptions.push(sectionChangeSub, scrollToSub);
    }
    /**
     * @return {?}
     */
    onScroll() {
        /** @type {?} */
        const section = this.findCurrentSection();
        if (section) {
            this.setCurrentSection(section.id);
        }
    }
    /**
     * @return {?}
     */
    onResize() {
        this.onScroll();
    }
    /**
     * @private
     * @param {?} sectionId
     * @return {?}
     */
    scrollTo(sectionId) {
        this.disableEmitter = true;
        this.nativeElement().querySelector('#' + sectionId).scrollIntoView();
        // set timeout to enforce scroll event execute before enabling back the emitter
        setTimeout(() => {
            this.disableEmitter = false;
        }, 0);
    }
    /**
     * @private
     * @return {?}
     */
    findCurrentSection() {
        /** @type {?} */
        const scrollMiddle = (this.scrollTopPosition() + this.scrollBottomPosition()) / 2;
        /** @type {?} */
        const spiedSections = this.getSpiedSections();
        return spiedSections.find((section) => this.isCurrentSection(section, scrollMiddle));
    }
    /**
     * @private
     * @return {?}
     */
    getSpiedSections() {
        return Array.from(this.nativeElement().querySelectorAll(this.spySelector));
    }
    /**
     * @private
     * @param {?} section
     * @param {?} scrollMiddle
     * @return {?}
     */
    isCurrentSection(section, scrollMiddle) {
        return this.sectionTopPosition(section) <= scrollMiddle
            && this.sectionBottomPosition(section) > scrollMiddle;
    }
    /**
     * @private
     * @param {?} sectionId
     * @return {?}
     */
    setCurrentSection(sectionId) {
        if (!this.disableEmitter) {
            this.currentSection$.next(sectionId);
        }
    }
    /**
     * @private
     * @param {?} section
     * @return {?}
     */
    sectionTopPosition(section) {
        return section.offsetTop;
    }
    /**
     * @private
     * @param {?} section
     * @return {?}
     */
    sectionBottomPosition(section) {
        return section.offsetTop + section.offsetHeight;
    }
    /**
     * @private
     * @return {?}
     */
    scrollTopPosition() {
        return this.scrollOffset + this.nativeElement().scrollTop;
    }
    /**
     * @private
     * @return {?}
     */
    scrollBottomPosition() {
        return this.scrollOffset + this.nativeElement().scrollTop + this.nativeElement().offsetHeight;
    }
    /**
     * @private
     * @return {?}
     */
    nativeElement() {
        return this.elementRef.nativeElement;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}
ScrollSpyDirective.decorators = [
    { type: Directive, args: [{
                selector: '[lsnScrollSpy]'
            },] }
];
/** @nocollapse */
ScrollSpyDirective.ctorParameters = () => [
    { type: ElementRef }
];
ScrollSpyDirective.propDecorators = {
    spySelector: [{ type: Input }],
    scrollToSection: [{ type: Input }],
    spySectionChange: [{ type: Output }],
    onScroll: [{ type: HostListener, args: ['scroll',] }],
    onResize: [{ type: HostListener, args: ['window:resize',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LsnScrollSpyModule {
}
LsnScrollSpyModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    ScrollSpyDirective,
                ],
                imports: [],
                exports: [
                    ScrollSpyDirective,
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LsnCookieModule {
}
LsnCookieModule.decorators = [
    { type: NgModule, args: [{
                declarations: [],
                imports: [
                    CommonModule
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} lsnCrossTabService
 * @return {?}
 */
function lsnCrossTabServiceFactory(lsnCrossTabService) {
    return () => lsnCrossTabService.run();
}
class LsnCrossTabModule {
}
LsnCrossTabModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    LsnCookieModule
                ],
                exports: [
                    LsnCookieModule
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LsnLibsModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LsnCrossTabConfig {
    /**
     * @param {?=} __0
     */
    constructor({ cookieCleanFreq = null, cookieReadFreq = null, msgTtl = null, rootDomain = null, crossTabCookieName = null } = {}) {
        this.cookieCleanFreq = cookieCleanFreq;
        this.cookieReadFreq = cookieReadFreq;
        this.msgTtl = msgTtl;
        this.rootDomain = rootDomain;
        this.crossTabCookieName = crossTabCookieName;
    }
}
/** @type {?} */
const LSN_CROSS_TAB_CONFIG = new InjectionToken('LsnCrossTabConfig');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class LsnCrossTabMessage {
    /**
     * @param {?=} __0
     */
    constructor({ created = null, code = null, tabId = null, attrs = null } = {}) {
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
    static compare(firstMessage, secondMessage) {
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
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LsnCookieConfig {
    /**
     * @param {?=} __0
     */
    constructor({ secureCookies = null, domainCookies = null } = {}) {
        this.secureCookies = secureCookies;
        this.domainCookies = domainCookies;
    }
}
/** @type {?} */
const LSN_COOKIE_CONFIG = new InjectionToken('LsnCookieConfig');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LsnCookieService {
    /**
     * @param {?} cookieConfig
     * @param {?} document
     */
    constructor(cookieConfig, document) {
        this.cookieConfig = cookieConfig;
        this.document = document;
    }
    /**
     * Sets cookie with given key to given value, cookie options are optional, if not set, some properties
     * (secure and domain) will be set from global cookie config
     * @param {?} cookieKey
     * @param {?} cookieValue
     * @param {?=} cookieOptions
     * @return {?}
     */
    set(cookieKey, cookieValue, cookieOptions) {
        /** @type {?} */
        const options = Object.assign({}, cookieOptions, { secure: cookieOptions && cookieOptions.secure ? cookieOptions.secure : this.cookieConfig.secureCookies });
        if (!this.cookieConfig.domainCookies) {
            options.domain = false;
        }
        /** @type {?} */
        const value = JSON.stringify(cookieValue);
        /** @type {?} */
        let expiresFor;
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
    }
    /**
     * Key provided - returns value of given cookie or undefined if non existent
     * Key not provided - returns all cookies as Object or undefined if there are no cookies
     * Cookie values are JSON.parsed, if error occurs during parsing, string value is assigned
     * @param {?=} cookieKey
     * @return {?}
     */
    get(cookieKey) {
        /** @type {?} */
        const cookieStringList = this.document.cookie ? this.document.cookie.split('; ') : [];
        /** @type {?} */
        const cookieObject = cookieStringList
            .map(cookieString => {
            /** @type {?} */
            const pos = cookieString.indexOf('=');
            return {
                name: cookieString.substr(0, pos),
                value: decodeURIComponent(cookieString.substr(pos + 1))
            };
        }).filter(cookie => {
            return typeof cookie.value !== 'undefined' && (cookieKey === undefined || cookieKey === cookie.name);
        }).reduce((previousValue, currentValue) => {
            /** @type {?} */
            let value = null;
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
    }
    /**
     * @param {?} cookieKey
     * @param {?=} cookieOptions
     * @return {?}
     */
    remove(cookieKey, cookieOptions = {}) {
        /** @type {?} */
        const cookie = this.get(cookieKey);
        if (cookie) {
            cookieOptions.expires = -1;
            this.set(cookieKey, '', cookieOptions);
            return true;
        }
        else {
            return false;
        }
    }
}
LsnCookieService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
LsnCookieService.ctorParameters = () => [
    { type: LsnCookieConfig, decorators: [{ type: Inject, args: [LSN_COOKIE_CONFIG,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
/** @nocollapse */ LsnCookieService.ngInjectableDef = ɵɵdefineInjectable({ factory: function LsnCookieService_Factory() { return new LsnCookieService(ɵɵinject(LSN_COOKIE_CONFIG), ɵɵinject(DOCUMENT)); }, token: LsnCookieService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LsnCrossTabService {
    /**
     * @param {?} lsnCookieService
     * @param {?} crossTabConfig
     */
    constructor(lsnCookieService, crossTabConfig) {
        this.lsnCookieService = lsnCookieService;
        this.crossTabConfig = crossTabConfig;
        /**
         * Checks if message with given id was already read
         */
        this.messageWasRead = (msg) => this.messagesReadSet.has(this.getMessageId(msg));
        this.getMessageId = (message) => message.tabId + message.created + message.code;
        this.messageToPlainObject = (msg) => Object.keys(msg)
            .reduce((minifiedObj, key) => {
            /** @type {?} */
            const value = msg[key];
            if (!(key === 'attrs' && (value === null || value === {}))) {
                minifiedObj[key] = value;
                return minifiedObj;
            }
            else {
                return minifiedObj;
            } // tslint:disable
        }, {}); // tslint:enable
        this.getCookie = () => this.cookie;
        this.crossTabCookieName = crossTabConfig.crossTabCookieName;
        this.messageSubject = new Subject();
        this.tabId = Math.random() + '';
        this.messagesReadSet = new Set();
        this.tabOpenTime = Date.now();
    }
    /**
     * This function sets up subscriptions for reading and cleaning cross tab cookie
     * @return {?}
     */
    run() {
        if (!this.cookieReadSubscription) {
            this.cookieReadSubscription = interval(this.crossTabConfig.cookieReadFreq)
                .subscribe(() => this.readMessages());
        }
        if (!this.cookieCleanSubscription) {
            this.cookieCleanSubscription = interval(this.crossTabConfig.cookieCleanFreq)
                .subscribe(() => this.cleanCookie());
        }
    }
    /**
     * This Observable emits messages that were sent by other tabs
     * @return {?}
     */
    get messages$() {
        return this.messageSubject;
    }
    /**
     * Sends message to other tabs by adding this message to cross tab cookie
     * @param {?} data
     * @return {?}
     */
    sendMessage(data) {
        /** @type {?} */
        let message;
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
    }
    // tslint:enable
    /**
     * Appends given message to cross tab cookie value
     * @private
     * @param {?} msg
     * @return {?}
     */
    updateCookie(msg) {
        /** @type {?} */
        const cookieData = this.cookie;
        cookieData.push(msg);
        this.cookie = cookieData;
    }
    /**
     * @private
     * @return {?}
     */
    get cookie() {
        return this.lsnCookieService.get(this.crossTabConfig.crossTabCookieName) || [];
    }
    /**
     * @private
     * @param {?} cookieData
     * @return {?}
     */
    set cookie(cookieData) {
        this.lsnCookieService.set(this.crossTabCookieName, cookieData, {
            domain: this.crossTabConfig.rootDomain,
            path: '/'
        });
    }
    /**
     * Removes messages from cross tab cookie that are older than supplied config.msgTtl time
     * @private
     * @return {?}
     */
    cleanCookie() {
        /** @type {?} */
        const currentCookie = this.cookie;
        if (currentCookie === null) {
            return;
        }
        /** @type {?} */
        const timestamp = new Date().getTime();
        /** @type {?} */
        const cleanedCookie = currentCookie.filter(this.cleanCookieFilter(timestamp, this.crossTabConfig.msgTtl));
        // previous implementation, cookie might have been modified in the other tab?
        if (!this.areCookiesEqual(currentCookie, this.cookie)) {
            return;
        }
        this.cookie = cleanedCookie;
    }
    /**
     * Callback invoked after every cookie read interval
     * @private
     * @return {?}
     */
    readMessages() {
        if (this.cookie) {
            this.cookie.forEach((msgData) => {
                if (msgData.created > this.tabOpenTime) {
                    /** @type {?} */
                    const msgCopy = Object.assign({}, msgData);
                    if (!this.messageWasRead(msgCopy)) {
                        this.messagesReadSet.add(this.getMessageId(msgCopy));
                        this.messageSubject.next(msgCopy);
                    }
                }
            });
        }
    }
    /**
     * Removes all subscriptions that this service is subscribe to (intervals are cleared)
     * @return {?}
     */
    unsubscribe() {
        this.cookieReadSubscription.unsubscribe();
        this.cookieCleanSubscription.unsubscribe();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.unsubscribe();
    }
    /**
     * Sorts two cookie arrays and compares each element
     * @private
     * @param {?} firstCookie
     * @param {?} secondCookie
     * @return {?}
     */
    areCookiesEqual(firstCookie, secondCookie) {
        if (firstCookie.length !== secondCookie.length) {
            return false;
        }
        else if (firstCookie.length === 0 && secondCookie.length === 0) {
            return true;
        }
        firstCookie.sort(this.messageComparer);
        secondCookie.sort(this.messageComparer);
        /** @type {?} */
        let index = 0;
        /** @type {?} */
        let areCookiesEqual = true;
        for (const message of firstCookie) {
            if (LsnCrossTabMessage.compare(message, secondCookie[index])) {
                areCookiesEqual = false;
            }
            else {
                ++index;
            }
        }
        return areCookiesEqual;
    }
    /**
     * Compares two messages by properties in order: 'created', 'code', 'tabId';
     * @private
     * @param {?} firstCookieValue
     * @param {?} secondCookieValue
     * @return {?}
     */
    messageComparer(firstCookieValue, secondCookieValue) {
        /** @type {?} */
        let result = firstCookieValue.created < secondCookieValue.created ? -1 : secondCookieValue.created < firstCookieValue.created ? 1 : 0;
        if (result === 0) {
            result = firstCookieValue.code < secondCookieValue.code ? -1 : secondCookieValue.code < firstCookieValue.code ? 1 : 0;
            if (result === 0) {
                result = firstCookieValue.tabId < secondCookieValue.tabId ? -1 : secondCookieValue.tabId < firstCookieValue.tabId ? 1 : 0;
            }
        }
        return result;
    }
    /**
     * Function determines whether given message is to be removed from the cross tab cookie
     * @private
     * @param {?} timestamp
     * @param {?} msgTtl
     * @return {?}
     */
    cleanCookieFilter(timestamp, msgTtl) {
        return (cookieMessage) => timestamp - cookieMessage.created <= msgTtl;
    }
}
LsnCrossTabService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
LsnCrossTabService.ctorParameters = () => [
    { type: LsnCookieService },
    { type: LsnCrossTabConfig, decorators: [{ type: Inject, args: [LSN_CROSS_TAB_CONFIG,] }] }
];
/** @nocollapse */ LsnCrossTabService.ngInjectableDef = ɵɵdefineInjectable({ factory: function LsnCrossTabService_Factory() { return new LsnCrossTabService(ɵɵinject(LsnCookieService), ɵɵinject(LSN_CROSS_TAB_CONFIG)); }, token: LsnCrossTabService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { LSN_COOKIE_CONFIG, LSN_CROSS_TAB_CONFIG, LsnCapitalizeModule, LsnCookieConfig, LsnCookieModule, LsnCookieService, LsnCrossTabConfig, LsnCrossTabMessage, LsnCrossTabModule, LsnCrossTabService, LsnLatinToGreekModule, LsnLibsModule, LsnNumericModule, LsnNumpadModule, LsnScrollSpyModule, lsnCrossTabServiceFactory, CapitalizeDirective as ɵa, LatinToGreekDirective as ɵb, NumericDirective as ɵc, CustomNumericConfig as ɵd, NumericConfigService as ɵe, NumPadDirective as ɵf, ScrollSpyDirective as ɵg };
//# sourceMappingURL=lsnova-angularmodules.js.map
