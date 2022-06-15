import * as i0 from '@angular/core';
import { Injectable, forwardRef, EventEmitter, Directive, Input, Output, HostListener, NgModule, Optional, InjectionToken, Inject } from '@angular/core';
import * as keyboard from '@angular/cdk/keycodes';
import * as i1 from '@angular/forms';
import { NG_VALUE_ACCESSOR, NgModel, FormsModule } from '@angular/forms';
import { Subject, interval } from 'rxjs';
import { distinctUntilChanged, tap, filter } from 'rxjs/operators';
import { CommonModule, DOCUMENT } from '@angular/common';

var NumericSeparator;
(function (NumericSeparator) {
    NumericSeparator["COMMA"] = ",";
    NumericSeparator["PERIOD"] = ".";
    NumericSeparator["SPACE"] = " ";
})(NumericSeparator || (NumericSeparator = {}));
class DefaultNumericConfig {
    constructor(props = {}) {
        this.precision = 0;
        this.decimals = NumericSeparator.PERIOD;
        this.noScientificNotation = false;
        this.alwaysDisplayDecimals = false;
        Object.assign(this, props);
    }
}
class CustomNumericConfig {
    constructor(props = {}) {
        Object.assign(this, props);
    }
}
class NumericConfigService {
    constructor(config) {
        let moduleConfig = new CustomNumericConfig();
        if (config) {
            moduleConfig = Object.assign(moduleConfig, config);
        }
        const numericConfig = moduleConfig.default || {};
        const customConfig = moduleConfig.custom || {};
        this.config = new CustomNumericConfig({
            default: new DefaultNumericConfig(numericConfig),
            custom: customConfig,
        });
    }
    getDefaultConfig() {
        return this.config.default;
    }
    getCustomConfig(key) {
        if (!this.config.custom[key]) {
            console.warn('[lsnNumeric] Invalid config key provided.');
        }
        return { ...this.getDefaultConfig(), ...this.config.custom[key] } || this.getDefaultConfig();
    }
}
/** @nocollapse */ NumericConfigService.ɵfac = function NumericConfigService_Factory(t) { return new (t || NumericConfigService)(i0.ɵɵinject(CustomNumericConfig)); };
/** @nocollapse */ NumericConfigService.ɵprov = /** @pureOrBreakMyCode */ i0.ɵɵdefineInjectable({ token: NumericConfigService, factory: NumericConfigService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NumericConfigService, [{
        type: Injectable
    }], function () { return [{ type: CustomNumericConfig }]; }, null); })();

const CUSTOM_SELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NumericDirective),
    multi: true
};
var NumericMessage;
(function (NumericMessage) {
    NumericMessage[NumericMessage["ADDITIONAL_DECIMAL_SEPARATOR"] = 0] = "ADDITIONAL_DECIMAL_SEPARATOR";
})(NumericMessage || (NumericMessage = {}));
class NumericDirective {
    constructor(el, configService) {
        this.el = el;
        this.configService = configService;
        this.lsnNumeric = {};
        this.lsnNumericMessages = new EventEmitter();
        this.onChange = (_) => {
        };
        this.onTouch = () => {
        };
        this.element = el;
        this.setConfig();
    }
    ngOnChanges() {
        this.setConfig();
    }
    inputHandler($event) {
        if ($event.target.value === '-') {
            return;
        }
        let value = this.removeInvalidCharacters($event.target.value);
        value = this.handleWholesLength(value);
        const parsedValue = this.parseValue(value);
        this.displayValue = value.replace(/[,|.]/, this.config.decimals);
        this.onChange(parsedValue);
    }
    focusHandler() {
        this.setEditMode();
    }
    blurHandler() {
        const parsedValue = this.parseValue(this.element.nativeElement.value);
        const rangeValue = this.handleRange(parsedValue);
        // correct entered value on blur to proper range value
        if (parsedValue !== rangeValue) {
            this.displayValue = rangeValue.toString().replace(/[,|.]/, this.config.decimals);
            this.onChange(rangeValue);
        }
        else if (this.config.step && !isNaN(parsedValue)) {
            // correct entered value on blur to proper step value
            const stepValue = this.handleStep(parsedValue);
            this.displayValue = stepValue.toString().replace(/[,|.]/, this.config.decimals);
            this.onChange(stepValue);
        }
        this.displayValue = this.prepareDisplayValue(this.element.nativeElement.value);
        if (this.onTouch) {
            // if user sets updateOn to 'blur', we have to call onTouch for it to work properly
            this.onTouch();
        }
    }
    async writeValue(modelValue) {
        const parsedValue = this.parseValue(modelValue);
        this.displayValue = this.prepareDisplayValue(parsedValue);
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouch = fn;
    }
    get displayValue() {
        return this.element.nativeElement.value;
    }
    set displayValue(value) {
        this.element.nativeElement.value = value;
    }
    setConfig() {
        const defaultConfig = this.lsnNumeric.config
            ? this.configService.getCustomConfig(this.lsnNumeric.config)
            : this.configService.getDefaultConfig();
        this.config = Object.assign({ ...defaultConfig, ...this.lsnNumeric });
        if (this.config.decimals && this.config.thousands && this.config.decimals === this.config.thousands) {
            this.config.thousands = undefined;
        }
        if (this.config.max !== undefined && this.config.maxLength !== undefined) {
            console.warn('[lsnNumeric] Setting `maxLength` makes `max` redundant.');
        }
    }
    parseValue(value) {
        if (!value && value !== 0) {
            return undefined;
        }
        const newValue = value.toString().replace(/[,|.]/, '.');
        const parsedValue = this.config.precision > 0
            ? parseFloat(newValue)
            : parseInt(newValue, 10);
        return isNaN(parsedValue) ? undefined : parsedValue;
    }
    handleWholesLength(value) {
        if (this.config.maxLength) {
            const negativeSign = value.toString().startsWith('-') ? '-' : '';
            const absoluteValue = value.toString()
                .replace(/^-/, '')
                .replace(/[,|.]/, this.config.decimals);
            if (absoluteValue.toString().includes(this.config.decimals)) {
                const [wholes, decimals] = absoluteValue.toString().split(this.config.decimals);
                const properDecimals = this.removeInvalidCharacters(decimals, true);
                return negativeSign + wholes.substr(0, this.config.maxLength) + this.config.decimals + properDecimals;
            }
            return negativeSign + absoluteValue.toString().substr(0, this.config.maxLength);
        }
        return value;
    }
    removeInvalidCharacters(value, allowDecimalsOnly = false) {
        return this.cleanUp(allowDecimalsOnly
            ? value.replace(/[^\-0-9]/g, '')
            : value.replace(/[^\-0-9,.]/g, ''));
    }
    cleanUp(input) {
        // no precision at all
        let value = input.replace(/[,|.]/g, '.');
        const firstIndex = typeof value === 'string' || value instanceof String
            ? value.indexOf('.')
            : -1;
        if (firstIndex === -1) {
            return value;
        }
        // remove everything after second comma
        const secondIndex = value.substr(firstIndex + 1).indexOf('.');
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
    }
    handleRange(value) {
        if (!this.config.maxLength && this.config.max !== undefined && value > this.config.max) {
            return this.config.max;
        }
        else if (this.config.min !== undefined && value < this.config.min) {
            return this.config.min;
        }
        return value;
    }
    handleStep(value) {
        return Math.round(value / this.config.step) * this.config.step;
    }
    prepareDisplayValue(value) {
        if (!value && value !== 0) {
            return '';
        }
        const [whole, decimals] = this.getWholeAndDecimalParts(value);
        const isNegative = whole[0] === '-' || whole < 0;
        let result = whole === '-' || !whole
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
    }
    setEditMode() {
        if (this.config.thousands) {
            const currentValue = this.element.nativeElement.value;
            const [whole, decimals] = currentValue.split(this.config.decimals);
            const regex = new RegExp('\\' + this.config.thousands, 'g');
            let result = whole.replace(regex, '');
            if (decimals && this.config.precision && this.config.decimals) {
                result = result + this.config.decimals + decimals;
            }
            this.displayValue = result;
        }
    }
    keyDownHandler(e) {
        const currentValue = this.element.nativeElement.value;
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
        const absoluteValue = currentValue.toString().replace(/^-/, '');
        const [wholes] = absoluteValue.toString().split(this.config.decimals);
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
            const [, decimals] = currentValue.split(this.config.decimals);
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
    }
    setDisabledState(isDisabled) {
        this.element.nativeElement.disabled = isDisabled;
    }
    /**
     * parse whole part of a number to display value (based on given config)
     */
    getWholeDisplayValue(whole) {
        const parsedWhole = Math.abs(typeof whole !== 'number' ? parseInt(whole, 10) : whole);
        return this.config.noScientificNotation
            ? parsedWhole.toLocaleString('fullwide', { useGrouping: false })
            : parsedWhole.toString();
    }
    /**
     * get whole and decimal part of a number
     * type of return values may vary, it is intentional
     * the returned array should have size of 1(only whole number) or 2(whole and decimal)
     */
    getWholeAndDecimalParts(value) {
        if (typeof value === 'number') {
            if (this.config.noScientificNotation && (value > Number.MAX_SAFE_INTEGER || value < Number.MIN_SAFE_INTEGER)) {
                const decimals = value % 1;
                return [Math.floor(value), decimals !== 0 ? '' + decimals : undefined];
            }
            else {
                return value.toString().split('.');
            }
        }
        else {
            return value.toString().split(this.config.decimals);
        }
    }
    defaultDecimals(value = '', precision = 0) {
        let result = '' + value;
        while (result.length < precision) {
            result += '0';
        }
        return result;
    }
    shouldAddDefaultDecimals(decimals) {
        return !decimals || ('' + decimals).length !== this.config.precision;
    }
}
/** @nocollapse */ NumericDirective.ɵfac = function NumericDirective_Factory(t) { return new (t || NumericDirective)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(NumericConfigService)); };
/** @nocollapse */ NumericDirective.ɵdir = /** @pureOrBreakMyCode */ i0.ɵɵdefineDirective({ type: NumericDirective, selectors: [["", "lsnNumeric", ""]], hostBindings: function NumericDirective_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("input", function NumericDirective_input_HostBindingHandler($event) { return ctx.inputHandler($event); })("focus", function NumericDirective_focus_HostBindingHandler() { return ctx.focusHandler(); })("blur", function NumericDirective_blur_HostBindingHandler() { return ctx.blurHandler(); })("keydown", function NumericDirective_keydown_HostBindingHandler($event) { return ctx.keyDownHandler($event); });
    } }, inputs: { lsnNumeric: "lsnNumeric" }, outputs: { lsnNumericMessages: "lsnNumericMessages" }, features: [i0.ɵɵProvidersFeature([CUSTOM_SELECT_VALUE_ACCESSOR]), i0.ɵɵNgOnChangesFeature] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NumericDirective, [{
        type: Directive,
        args: [{
                selector: '[lsnNumeric]',
                providers: [CUSTOM_SELECT_VALUE_ACCESSOR]
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: NumericConfigService }]; }, { lsnNumeric: [{
            type: Input
        }], lsnNumericMessages: [{
            type: Output
        }], inputHandler: [{
            type: HostListener,
            args: ['input', ['$event']]
        }], focusHandler: [{
            type: HostListener,
            args: ['focus', []]
        }], blurHandler: [{
            type: HostListener,
            args: ['blur', []]
        }], keyDownHandler: [{
            type: HostListener,
            args: ['keydown', ['$event']]
        }] }); })();

class LsnNumericModule {
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
/** @nocollapse */ LsnNumericModule.ɵfac = function LsnNumericModule_Factory(t) { return new (t || LsnNumericModule)(); };
/** @nocollapse */ LsnNumericModule.ɵmod = /** @pureOrBreakMyCode */ i0.ɵɵdefineNgModule({ type: LsnNumericModule });
/** @nocollapse */ LsnNumericModule.ɵinj = /** @pureOrBreakMyCode */ i0.ɵɵdefineInjector({});
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LsnNumericModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    NumericDirective,
                ],
                exports: [
                    NumericDirective,
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(LsnNumericModule, { declarations: [NumericDirective], exports: [NumericDirective] }); })();

class NumPadConfig {
    constructor() {
        this.allowLeadingZeros = false;
    }
}
class NumPadDirective {
    constructor(element, ngControl) {
        this.element = element;
        this.ngControl = ngControl;
        this.lsnNumPad = {};
        this.defaultConfig = new NumPadConfig();
    }
    ngOnChanges() {
        this.config = Object.assign({ ...this.defaultConfig, ...this.lsnNumPad });
    }
    inputHandler($event) {
        const currentValue = $event.target.value;
        this.setValue(this.parseNewValue(currentValue));
    }
    blurHandler($event) {
        const currentValue = $event.target.value;
        this.setValue(this.parseNewValue(currentValue, true));
    }
    setValue(value) {
        if (this.ngControl && this.ngControl.control) {
            this.ngControl.control.setValue(value);
        }
        else {
            this.element.nativeElement.value = value;
        }
    }
    parseNewValue(value, blurEvent = false) {
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
    keyDownHandler(e) {
        const currentValue = this.element.nativeElement.value;
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
    }
}
/** @nocollapse */ NumPadDirective.ɵfac = function NumPadDirective_Factory(t) { return new (t || NumPadDirective)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.NgControl, 8)); };
/** @nocollapse */ NumPadDirective.ɵdir = /** @pureOrBreakMyCode */ i0.ɵɵdefineDirective({ type: NumPadDirective, selectors: [["", "lsnNumPad", ""]], hostBindings: function NumPadDirective_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("input", function NumPadDirective_input_HostBindingHandler($event) { return ctx.inputHandler($event); })("blur", function NumPadDirective_blur_HostBindingHandler($event) { return ctx.blurHandler($event); })("keydown", function NumPadDirective_keydown_HostBindingHandler($event) { return ctx.keyDownHandler($event); });
    } }, inputs: { lsnNumPad: "lsnNumPad" }, features: [i0.ɵɵNgOnChangesFeature] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NumPadDirective, [{
        type: Directive,
        args: [{
                selector: '[lsnNumPad]'
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i1.NgControl, decorators: [{
                type: Optional
            }] }]; }, { lsnNumPad: [{
            type: Input
        }], inputHandler: [{
            type: HostListener,
            args: ['input', ['$event']]
        }], blurHandler: [{
            type: HostListener,
            args: ['blur', ['$event']]
        }], keyDownHandler: [{
            type: HostListener,
            args: ['keydown', ['$event']]
        }] }); })();

class LsnNumpadModule {
}
/** @nocollapse */ LsnNumpadModule.ɵfac = function LsnNumpadModule_Factory(t) { return new (t || LsnNumpadModule)(); };
/** @nocollapse */ LsnNumpadModule.ɵmod = /** @pureOrBreakMyCode */ i0.ɵɵdefineNgModule({ type: LsnNumpadModule });
/** @nocollapse */ LsnNumpadModule.ɵinj = /** @pureOrBreakMyCode */ i0.ɵɵdefineInjector({ imports: [[]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LsnNumpadModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    NumPadDirective,
                ],
                imports: [],
                exports: [
                    NumPadDirective,
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(LsnNumpadModule, { declarations: [NumPadDirective], exports: [NumPadDirective] }); })();

class LatinToGreekDirective {
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
    getCaret() {
        return {
            start: this.el.nativeElement.selectionStart,
            end: this.el.nativeElement.selectionEnd,
        };
    }
    setCaret(start, end) {
        this.el.nativeElement.selectionStart = start;
        this.el.nativeElement.selectionEnd = end;
        this.el.nativeElement.focus();
    }
    onInputChange($event) {
        const { start, end } = this.getCaret();
        let translated = $event.toLocaleUpperCase();
        this.latinToGreek.forEach(replace => {
            translated = translated.replace(replace[0], replace[1]);
        });
        this.model.valueAccessor.writeValue(translated);
        this.setCaret(start, end);
    }
}
/** @nocollapse */ LatinToGreekDirective.ɵfac = function LatinToGreekDirective_Factory(t) { return new (t || LatinToGreekDirective)(i0.ɵɵdirectiveInject(i1.NgModel), i0.ɵɵdirectiveInject(i0.ElementRef)); };
/** @nocollapse */ LatinToGreekDirective.ɵdir = /** @pureOrBreakMyCode */ i0.ɵɵdefineDirective({ type: LatinToGreekDirective, selectors: [["", "ngModel", "", "lsnLatinToGreek", ""]], hostBindings: function LatinToGreekDirective_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("ngModelChange", function LatinToGreekDirective_ngModelChange_HostBindingHandler($event) { return ctx.onInputChange($event); });
    } }, features: [i0.ɵɵProvidersFeature([NgModel])] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LatinToGreekDirective, [{
        type: Directive,
        args: [{
                selector: '[ngModel][lsnLatinToGreek]',
                providers: [NgModel]
            }]
    }], function () { return [{ type: i1.NgModel }, { type: i0.ElementRef }]; }, { onInputChange: [{
            type: HostListener,
            args: ['ngModelChange', ['$event']]
        }] }); })();

class LsnLatinToGreekModule {
}
/** @nocollapse */ LsnLatinToGreekModule.ɵfac = function LsnLatinToGreekModule_Factory(t) { return new (t || LsnLatinToGreekModule)(); };
/** @nocollapse */ LsnLatinToGreekModule.ɵmod = /** @pureOrBreakMyCode */ i0.ɵɵdefineNgModule({ type: LsnLatinToGreekModule });
/** @nocollapse */ LsnLatinToGreekModule.ɵinj = /** @pureOrBreakMyCode */ i0.ɵɵdefineInjector({ imports: [[]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LsnLatinToGreekModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    LatinToGreekDirective,
                ],
                imports: [],
                exports: [
                    LatinToGreekDirective,
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(LsnLatinToGreekModule, { declarations: [LatinToGreekDirective], exports: [LatinToGreekDirective] }); })();

class CapitalizeDirective {
    constructor(model) {
        this.model = model;
    }
    onInputChange($event) {
        this.model.valueAccessor.writeValue($event.toLocaleUpperCase());
    }
}
/** @nocollapse */ CapitalizeDirective.ɵfac = function CapitalizeDirective_Factory(t) { return new (t || CapitalizeDirective)(i0.ɵɵdirectiveInject(i1.NgModel)); };
/** @nocollapse */ CapitalizeDirective.ɵdir = /** @pureOrBreakMyCode */ i0.ɵɵdefineDirective({ type: CapitalizeDirective, selectors: [["", "ngModel", "", "lsnCapitalize", ""]], hostBindings: function CapitalizeDirective_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("ngModelChange", function CapitalizeDirective_ngModelChange_HostBindingHandler($event) { return ctx.onInputChange($event); });
    } }, features: [i0.ɵɵProvidersFeature([NgModel])] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CapitalizeDirective, [{
        type: Directive,
        args: [{
                selector: '[ngModel][lsnCapitalize]',
                providers: [NgModel]
            }]
    }], function () { return [{ type: i1.NgModel }]; }, { onInputChange: [{
            type: HostListener,
            args: ['ngModelChange', ['$event']]
        }] }); })();

class LsnCapitalizeModule {
}
/** @nocollapse */ LsnCapitalizeModule.ɵfac = function LsnCapitalizeModule_Factory(t) { return new (t || LsnCapitalizeModule)(); };
/** @nocollapse */ LsnCapitalizeModule.ɵmod = /** @pureOrBreakMyCode */ i0.ɵɵdefineNgModule({ type: LsnCapitalizeModule });
/** @nocollapse */ LsnCapitalizeModule.ɵinj = /** @pureOrBreakMyCode */ i0.ɵɵdefineInjector({ imports: [[]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LsnCapitalizeModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    CapitalizeDirective,
                ],
                imports: [],
                exports: [
                    CapitalizeDirective,
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(LsnCapitalizeModule, { declarations: [CapitalizeDirective], exports: [CapitalizeDirective] }); })();

class ScrollSpyDirective {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.spySectionChange = new EventEmitter();
        this.disableEmitter = false;
        this.subscriptions = [];
        this.currentSection$ = new Subject();
    }
    ngOnInit() {
        this.scrollOffset = this.nativeElement().offsetTop;
        // emit event on section change
        const sectionChangeSub = this.currentSection$.pipe(distinctUntilChanged(), tap((sectionId) => this.spySectionChange.emit(sectionId))).subscribe();
        // scroll to given section
        const scrollToSub = this.scrollToSection.pipe(filter((section) => !!section), tap((section) => this.scrollTo(section))).subscribe();
        this.subscriptions.push(sectionChangeSub, scrollToSub);
    }
    onScroll() {
        const section = this.findCurrentSection();
        if (section) {
            this.setCurrentSection(section.id);
        }
    }
    onResize() {
        this.onScroll();
    }
    scrollTo(sectionId) {
        this.disableEmitter = true;
        this.nativeElement().querySelector('#' + sectionId).scrollIntoView();
        // set timeout to enforce scroll event execute before enabling back the emitter
        setTimeout(() => {
            this.disableEmitter = false;
        }, 0);
    }
    findCurrentSection() {
        const scrollMiddle = (this.scrollTopPosition() + this.scrollBottomPosition()) / 2;
        const spiedSections = this.getSpiedSections();
        return spiedSections.find((section) => this.isCurrentSection(section, scrollMiddle));
    }
    getSpiedSections() {
        return Array.from(this.nativeElement().querySelectorAll(this.spySelector));
    }
    isCurrentSection(section, scrollMiddle) {
        return this.sectionTopPosition(section) <= scrollMiddle
            && this.sectionBottomPosition(section) > scrollMiddle;
    }
    setCurrentSection(sectionId) {
        if (!this.disableEmitter) {
            this.currentSection$.next(sectionId);
        }
    }
    sectionTopPosition(section) {
        return section.offsetTop;
    }
    sectionBottomPosition(section) {
        return section.offsetTop + section.offsetHeight;
    }
    scrollTopPosition() {
        return this.scrollOffset + this.nativeElement().scrollTop;
    }
    scrollBottomPosition() {
        return this.scrollOffset + this.nativeElement().scrollTop + this.nativeElement().offsetHeight;
    }
    nativeElement() {
        return this.elementRef.nativeElement;
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}
/** @nocollapse */ ScrollSpyDirective.ɵfac = function ScrollSpyDirective_Factory(t) { return new (t || ScrollSpyDirective)(i0.ɵɵdirectiveInject(i0.ElementRef)); };
/** @nocollapse */ ScrollSpyDirective.ɵdir = /** @pureOrBreakMyCode */ i0.ɵɵdefineDirective({ type: ScrollSpyDirective, selectors: [["", "lsnScrollSpy", ""]], hostBindings: function ScrollSpyDirective_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("scroll", function ScrollSpyDirective_scroll_HostBindingHandler() { return ctx.onScroll(); })("resize", function ScrollSpyDirective_resize_HostBindingHandler() { return ctx.onResize(); }, false, i0.ɵɵresolveWindow);
    } }, inputs: { spySelector: "spySelector", scrollToSection: "scrollToSection" }, outputs: { spySectionChange: "spySectionChange" } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ScrollSpyDirective, [{
        type: Directive,
        args: [{
                selector: '[lsnScrollSpy]'
            }]
    }], function () { return [{ type: i0.ElementRef }]; }, { spySelector: [{
            type: Input
        }], scrollToSection: [{
            type: Input
        }], spySectionChange: [{
            type: Output
        }], onScroll: [{
            type: HostListener,
            args: ['scroll']
        }], onResize: [{
            type: HostListener,
            args: ['window:resize']
        }] }); })();

class LsnScrollSpyModule {
}
/** @nocollapse */ LsnScrollSpyModule.ɵfac = function LsnScrollSpyModule_Factory(t) { return new (t || LsnScrollSpyModule)(); };
/** @nocollapse */ LsnScrollSpyModule.ɵmod = /** @pureOrBreakMyCode */ i0.ɵɵdefineNgModule({ type: LsnScrollSpyModule });
/** @nocollapse */ LsnScrollSpyModule.ɵinj = /** @pureOrBreakMyCode */ i0.ɵɵdefineInjector({ imports: [[]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LsnScrollSpyModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    ScrollSpyDirective,
                ],
                imports: [],
                exports: [
                    ScrollSpyDirective,
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(LsnScrollSpyModule, { declarations: [ScrollSpyDirective], exports: [ScrollSpyDirective] }); })();

class LsnCookieModule {
}
/** @nocollapse */ LsnCookieModule.ɵfac = function LsnCookieModule_Factory(t) { return new (t || LsnCookieModule)(); };
/** @nocollapse */ LsnCookieModule.ɵmod = /** @pureOrBreakMyCode */ i0.ɵɵdefineNgModule({ type: LsnCookieModule });
/** @nocollapse */ LsnCookieModule.ɵinj = /** @pureOrBreakMyCode */ i0.ɵɵdefineInjector({ imports: [[
            CommonModule
        ]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LsnCookieModule, [{
        type: NgModule,
        args: [{
                declarations: [],
                imports: [
                    CommonModule
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(LsnCookieModule, { imports: [CommonModule] }); })();

function lsnCrossTabServiceFactory(lsnCrossTabService) {
    return () => lsnCrossTabService.run();
}
class LsnCrossTabModule {
}
/** @nocollapse */ LsnCrossTabModule.ɵfac = function LsnCrossTabModule_Factory(t) { return new (t || LsnCrossTabModule)(); };
/** @nocollapse */ LsnCrossTabModule.ɵmod = /** @pureOrBreakMyCode */ i0.ɵɵdefineNgModule({ type: LsnCrossTabModule });
/** @nocollapse */ LsnCrossTabModule.ɵinj = /** @pureOrBreakMyCode */ i0.ɵɵdefineInjector({ imports: [[
            CommonModule,
            LsnCookieModule
        ], LsnCookieModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LsnCrossTabModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    LsnCookieModule
                ],
                exports: [
                    LsnCookieModule
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(LsnCrossTabModule, { imports: [CommonModule,
        LsnCookieModule], exports: [LsnCookieModule] }); })();

class LsnLibsModule {
}
/** @nocollapse */ LsnLibsModule.ɵfac = function LsnLibsModule_Factory(t) { return new (t || LsnLibsModule)(); };
/** @nocollapse */ LsnLibsModule.ɵmod = /** @pureOrBreakMyCode */ i0.ɵɵdefineNgModule({ type: LsnLibsModule });
/** @nocollapse */ LsnLibsModule.ɵinj = /** @pureOrBreakMyCode */ i0.ɵɵdefineInjector({ imports: [[
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
        ], LsnCapitalizeModule,
        LsnLatinToGreekModule,
        LsnNumericModule,
        LsnNumpadModule,
        LsnCookieModule,
        LsnCrossTabModule,
        LsnScrollSpyModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LsnLibsModule, [{
        type: NgModule,
        args: [{
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
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(LsnLibsModule, { imports: [FormsModule,
        LsnCapitalizeModule,
        LsnLatinToGreekModule, LsnNumericModule, LsnNumpadModule,
        LsnCookieModule,
        LsnCrossTabModule,
        LsnScrollSpyModule], exports: [LsnCapitalizeModule,
        LsnLatinToGreekModule,
        LsnNumericModule,
        LsnNumpadModule,
        LsnCookieModule,
        LsnCrossTabModule,
        LsnScrollSpyModule] }); })();

class LsnCrossTabConfig {
    constructor({ cookieCleanFreq = null, cookieReadFreq = null, msgTtl = null, rootDomain = null, crossTabCookieName = null } = {}) {
        this.cookieCleanFreq = cookieCleanFreq;
        this.cookieReadFreq = cookieReadFreq;
        this.msgTtl = msgTtl;
        this.rootDomain = rootDomain;
        this.crossTabCookieName = crossTabCookieName;
    }
}
const LSN_CROSS_TAB_CONFIG = new InjectionToken('LsnCrossTabConfig');

class LsnCrossTabMessage {
    constructor({ created = null, code = null, tabId = null, attrs = null } = {}) {
        this.created = created;
        this.code = code;
        this.tabId = tabId;
        this.attrs = attrs;
    }
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

class LsnCookieConfig {
    constructor({ secureCookies = null, domainCookies = null } = {}) {
        this.secureCookies = secureCookies;
        this.domainCookies = domainCookies;
    }
}
const LSN_COOKIE_CONFIG = new InjectionToken('LsnCookieConfig');

class LsnCookieService {
    constructor(cookieConfig, document) {
        this.cookieConfig = cookieConfig;
        this.document = document;
    }
    /**
     * Sets cookie with given key to given value, cookie options are optional, if not set, some properties
     * (secure and domain) will be set from global cookie config
     */
    set(cookieKey, cookieValue, cookieOptions) {
        const options = {
            ...cookieOptions,
            secure: cookieOptions && cookieOptions.secure ? cookieOptions.secure : this.cookieConfig.secureCookies
        };
        if (!this.cookieConfig.domainCookies) {
            options.domain = false;
        }
        const value = JSON.stringify(cookieValue);
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
     */
    get(cookieKey) {
        const cookieStringList = this.document.cookie ? this.document.cookie.split('; ') : [];
        const cookieObject = cookieStringList
            .map(cookieString => {
            const pos = cookieString.indexOf('=');
            return {
                name: cookieString.substr(0, pos),
                value: decodeURIComponent(cookieString.substr(pos + 1))
            };
        }).filter(cookie => {
            return typeof cookie.value !== 'undefined' && (cookieKey === undefined || cookieKey === cookie.name);
        }).reduce((previousValue, currentValue) => {
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
    remove(cookieKey, cookieOptions = {}) {
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
/** @nocollapse */ LsnCookieService.ɵfac = function LsnCookieService_Factory(t) { return new (t || LsnCookieService)(i0.ɵɵinject(LSN_COOKIE_CONFIG), i0.ɵɵinject(DOCUMENT)); };
/** @nocollapse */ LsnCookieService.ɵprov = /** @pureOrBreakMyCode */ i0.ɵɵdefineInjectable({ token: LsnCookieService, factory: LsnCookieService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LsnCookieService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: LsnCookieConfig, decorators: [{
                type: Inject,
                args: [LSN_COOKIE_CONFIG]
            }] }, { type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }]; }, null); })();

class LsnCrossTabService {
    constructor(lsnCookieService, crossTabConfig) {
        this.lsnCookieService = lsnCookieService;
        /**
         * Checks if message with given id was already read
         */
        this.messageWasRead = (msg) => this.messagesReadSet.has(this.getMessageId(msg));
        this.getMessageId = (message) => message.tabId + message.created + message.code;
        this.messageToPlainObject = (msg) => Object.keys(msg)
            .reduce((minifiedObj, key) => {
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
        this.crossTabConfig = crossTabConfig || new LsnCrossTabConfig();
        this.messageSubject = new Subject();
        this.tabId = Math.random() + '';
        this.messagesReadSet = new Set();
        this.tabOpenTime = Date.now();
    }
    get crossTabCookieName() {
        return this.crossTabConfig.crossTabCookieName;
    }
    /**
     * This function sets up subscriptions for reading and cleaning cross tab cookie
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
     */
    get messages$() {
        return this.messageSubject;
    }
    /**
     * Manually set cross tab config, for example when config must be provided asynchronously and not with InjectionToken
     */
    setCrossTabConfig(config) {
        this.crossTabConfig = config;
    }
    /**
     * Sends message to other tabs by adding this message to cross tab cookie
     */
    sendMessage(data) {
        let message;
        if (typeof data === 'string') {
            message = new LsnCrossTabMessage({ code: data });
        }
        else if (data instanceof LsnCrossTabMessage) {
            message = data;
        }
        else if (!!data && typeof data === 'object' && !Array.isArray(data)) {
            message = new LsnCrossTabMessage({ ...data });
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
    /**
     * Appends given message to cross tab cookie value
     */
    updateCookie(msg) {
        const cookieData = this.cookie;
        cookieData.push(msg);
        this.cookie = cookieData;
    }
    get cookie() {
        return this.lsnCookieService.get(this.crossTabConfig.crossTabCookieName) || [];
    }
    set cookie(cookieData) {
        this.lsnCookieService.set(this.crossTabCookieName, cookieData, {
            domain: this.crossTabConfig.rootDomain,
            path: '/'
        });
    }
    /**
     * Removes messages from cross tab cookie that are older than supplied config.msgTtl time
     */
    cleanCookie() {
        const currentCookie = this.cookie;
        if (currentCookie === null) {
            return;
        }
        const timestamp = new Date().getTime();
        const cleanedCookie = currentCookie.filter(this.cleanCookieFilter(timestamp, this.crossTabConfig.msgTtl));
        // previous implementation, cookie might have been modified in the other tab?
        if (!this.areCookiesEqual(currentCookie, this.cookie)) {
            return;
        }
        this.cookie = cleanedCookie;
    }
    /**
     * Callback invoked after every cookie read interval
     */
    readMessages() {
        if (this.cookie) {
            this.cookie.forEach((msgData) => {
                if (msgData.created > this.tabOpenTime) {
                    const msgCopy = { ...msgData };
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
     */
    unsubscribe() {
        this.cookieReadSubscription.unsubscribe();
        this.cookieCleanSubscription.unsubscribe();
    }
    ngOnDestroy() {
        this.unsubscribe();
    }
    /**
     * Sorts two cookie arrays and compares each element
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
        let index = 0;
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
     */
    messageComparer(firstCookieValue, secondCookieValue) {
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
     */
    cleanCookieFilter(timestamp, msgTtl) {
        return (cookieMessage) => timestamp - cookieMessage.created <= msgTtl;
    }
}
/** @nocollapse */ LsnCrossTabService.ɵfac = function LsnCrossTabService_Factory(t) { return new (t || LsnCrossTabService)(i0.ɵɵinject(LsnCookieService), i0.ɵɵinject(LSN_CROSS_TAB_CONFIG, 8)); };
/** @nocollapse */ LsnCrossTabService.ɵprov = /** @pureOrBreakMyCode */ i0.ɵɵdefineInjectable({ token: LsnCrossTabService, factory: LsnCrossTabService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LsnCrossTabService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: LsnCookieService }, { type: LsnCrossTabConfig, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [LSN_CROSS_TAB_CONFIG]
            }] }]; }, null); })();

/*
 * Public API Surface of lsn-libs
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CapitalizeDirective, CustomNumericConfig, DefaultNumericConfig, LSN_COOKIE_CONFIG, LSN_CROSS_TAB_CONFIG, LatinToGreekDirective, LsnCapitalizeModule, LsnCookieConfig, LsnCookieModule, LsnCookieService, LsnCrossTabConfig, LsnCrossTabMessage, LsnCrossTabModule, LsnCrossTabService, LsnLatinToGreekModule, LsnLibsModule, LsnNumericModule, LsnNumpadModule, LsnScrollSpyModule, NumPadDirective, NumericConfigService, NumericDirective, NumericMessage, ScrollSpyDirective, lsnCrossTabServiceFactory };
//# sourceMappingURL=lsnova-angularmodules.mjs.map
