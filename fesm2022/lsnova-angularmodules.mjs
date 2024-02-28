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
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: NumericConfigService, deps: [{ token: CustomNumericConfig }], target: i0.ɵɵFactoryTarget.Injectable }); }
    /** @nocollapse */ static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: NumericConfigService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: NumericConfigService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: CustomNumericConfig }] });

const CUSTOM_SELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NumericDirective),
    multi: true
};
var NumericMessage;
(function (NumericMessage) {
    NumericMessage[NumericMessage["ADDITIONAL_DECIMAL_SEPARATOR"] = 0] = "ADDITIONAL_DECIMAL_SEPARATOR";
    NumericMessage[NumericMessage["RANGE_EXCEEDED"] = 1] = "RANGE_EXCEEDED";
})(NumericMessage || (NumericMessage = {}));
const initialConfigValue = {};
class NumericDirective {
    set lsnNumeric(newValue) {
        const firstChange = this._lsnNumeric === initialConfigValue;
        const shouldParseConfig = !firstChange && !this.isConfigEqual(this._lsnNumeric, newValue);
        this._lsnNumeric = newValue;
        this.setConfig();
        if (shouldParseConfig) {
            this.blurHandler();
        }
    }
    get lsnNumeric() {
        return this._lsnNumeric;
    }
    constructor(el, configService) {
        this.el = el;
        this.configService = configService;
        this._lsnNumeric = initialConfigValue;
        this.lsnNumericMessages = new EventEmitter();
        this.onChange = (_) => {
        };
        this.onTouch = () => {
        };
        this.element = el;
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
        if (rangeValue !== parsedValue) {
            this.lsnNumericMessages.emit(NumericMessage.RANGE_EXCEEDED);
        }
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
    isConfigEqual(config1, config2) {
        if ((config1 && !config2) || (!config1 && config2)) {
            return false;
        }
        else if (!config1 && !config2) {
            return true;
        }
        else if (Object.keys(config1).length === Object.keys(config2).length) {
            for (const key1 in config1) {
                if (config1.hasOwnProperty(key1) && config1[key1] !== config2[key1]) {
                    return false;
                }
            }
            return true;
        }
        else {
            return false;
        }
    }
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: NumericDirective, deps: [{ token: i0.ElementRef }, { token: NumericConfigService }], target: i0.ɵɵFactoryTarget.Directive }); }
    /** @nocollapse */ static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.2.1", type: NumericDirective, selector: "[lsnNumeric]", inputs: { lsnNumeric: "lsnNumeric" }, outputs: { lsnNumericMessages: "lsnNumericMessages" }, host: { listeners: { "input": "inputHandler($event)", "focus": "focusHandler()", "blur": "blurHandler()", "keydown": "keyDownHandler($event)" } }, providers: [CUSTOM_SELECT_VALUE_ACCESSOR], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: NumericDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[lsnNumeric]',
                    providers: [CUSTOM_SELECT_VALUE_ACCESSOR]
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: NumericConfigService }], propDecorators: { lsnNumeric: [{
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
            }] } });

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
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: LsnNumericModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    /** @nocollapse */ static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.1", ngImport: i0, type: LsnNumericModule, declarations: [NumericDirective], exports: [NumericDirective] }); }
    /** @nocollapse */ static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: LsnNumericModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: LsnNumericModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        NumericDirective,
                    ],
                    exports: [
                        NumericDirective,
                    ]
                }]
        }] });

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
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: NumPadDirective, deps: [{ token: i0.ElementRef }, { token: i1.NgControl, optional: true }], target: i0.ɵɵFactoryTarget.Directive }); }
    /** @nocollapse */ static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.2.1", type: NumPadDirective, selector: "[lsnNumPad]", inputs: { lsnNumPad: "lsnNumPad" }, host: { listeners: { "input": "inputHandler($event)", "blur": "blurHandler($event)", "keydown": "keyDownHandler($event)" } }, usesOnChanges: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: NumPadDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[lsnNumPad]'
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1.NgControl, decorators: [{
                    type: Optional
                }] }], propDecorators: { lsnNumPad: [{
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
            }] } });

class LsnNumpadModule {
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: LsnNumpadModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    /** @nocollapse */ static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.1", ngImport: i0, type: LsnNumpadModule, declarations: [NumPadDirective], exports: [NumPadDirective] }); }
    /** @nocollapse */ static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: LsnNumpadModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: LsnNumpadModule, decorators: [{
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
        }] });

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
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: LatinToGreekDirective, deps: [{ token: i1.NgModel }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    /** @nocollapse */ static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.2.1", type: LatinToGreekDirective, selector: "[ngModel][lsnLatinToGreek]", host: { listeners: { "ngModelChange": "onInputChange($event)" } }, providers: [NgModel], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: LatinToGreekDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngModel][lsnLatinToGreek]',
                    providers: [NgModel]
                }]
        }], ctorParameters: () => [{ type: i1.NgModel }, { type: i0.ElementRef }], propDecorators: { onInputChange: [{
                type: HostListener,
                args: ['ngModelChange', ['$event']]
            }] } });

class LsnLatinToGreekModule {
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: LsnLatinToGreekModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    /** @nocollapse */ static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.1", ngImport: i0, type: LsnLatinToGreekModule, declarations: [LatinToGreekDirective], exports: [LatinToGreekDirective] }); }
    /** @nocollapse */ static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: LsnLatinToGreekModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: LsnLatinToGreekModule, decorators: [{
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
        }] });

class CapitalizeDirective {
    constructor(model) {
        this.model = model;
    }
    onInputChange($event) {
        this.model.valueAccessor.writeValue($event.toLocaleUpperCase());
    }
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: CapitalizeDirective, deps: [{ token: i1.NgModel }], target: i0.ɵɵFactoryTarget.Directive }); }
    /** @nocollapse */ static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.2.1", type: CapitalizeDirective, selector: "[ngModel][lsnCapitalize]", host: { listeners: { "ngModelChange": "onInputChange($event)" } }, providers: [NgModel], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: CapitalizeDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngModel][lsnCapitalize]',
                    providers: [NgModel]
                }]
        }], ctorParameters: () => [{ type: i1.NgModel }], propDecorators: { onInputChange: [{
                type: HostListener,
                args: ['ngModelChange', ['$event']]
            }] } });

class LsnCapitalizeModule {
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: LsnCapitalizeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    /** @nocollapse */ static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.1", ngImport: i0, type: LsnCapitalizeModule, declarations: [CapitalizeDirective], exports: [CapitalizeDirective] }); }
    /** @nocollapse */ static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: LsnCapitalizeModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: LsnCapitalizeModule, decorators: [{
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
        }] });

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
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: ScrollSpyDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    /** @nocollapse */ static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.2.1", type: ScrollSpyDirective, selector: "[lsnScrollSpy]", inputs: { spySelector: "spySelector", scrollToSection: "scrollToSection" }, outputs: { spySectionChange: "spySectionChange" }, host: { listeners: { "scroll": "onScroll()", "window:resize": "onResize()" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: ScrollSpyDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[lsnScrollSpy]'
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { spySelector: [{
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
            }] } });

class LsnScrollSpyModule {
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: LsnScrollSpyModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    /** @nocollapse */ static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.1", ngImport: i0, type: LsnScrollSpyModule, declarations: [ScrollSpyDirective], exports: [ScrollSpyDirective] }); }
    /** @nocollapse */ static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: LsnScrollSpyModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: LsnScrollSpyModule, decorators: [{
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
        }] });

class LsnCookieModule {
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: LsnCookieModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    /** @nocollapse */ static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.1", ngImport: i0, type: LsnCookieModule, imports: [CommonModule] }); }
    /** @nocollapse */ static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: LsnCookieModule, imports: [CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: LsnCookieModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [],
                    imports: [
                        CommonModule
                    ]
                }]
        }] });

function lsnCrossTabServiceFactory(lsnCrossTabService) {
    return () => lsnCrossTabService.run();
}
class LsnCrossTabModule {
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: LsnCrossTabModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    /** @nocollapse */ static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.1", ngImport: i0, type: LsnCrossTabModule, imports: [CommonModule,
            LsnCookieModule], exports: [LsnCookieModule] }); }
    /** @nocollapse */ static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: LsnCrossTabModule, imports: [CommonModule,
            LsnCookieModule, LsnCookieModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: LsnCrossTabModule, decorators: [{
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
        }] });

class LsnLibsModule {
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: LsnLibsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    /** @nocollapse */ static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.1", ngImport: i0, type: LsnLibsModule, imports: [FormsModule,
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
            LsnScrollSpyModule] }); }
    /** @nocollapse */ static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: LsnLibsModule, imports: [FormsModule,
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
            LsnScrollSpyModule, LsnCapitalizeModule,
            LsnLatinToGreekModule,
            LsnNumericModule,
            LsnNumpadModule,
            LsnCookieModule,
            LsnCrossTabModule,
            LsnScrollSpyModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: LsnLibsModule, decorators: [{
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
        }] });

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
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: LsnCookieService, deps: [{ token: LSN_COOKIE_CONFIG }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable }); }
    /** @nocollapse */ static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: LsnCookieService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: LsnCookieService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: LsnCookieConfig, decorators: [{
                    type: Inject,
                    args: [LSN_COOKIE_CONFIG]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }] });

class LsnCrossTabService {
    get crossTabCookieName() {
        return this.crossTabConfig.crossTabCookieName;
    }
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
            if (!(key === 'attrs' && (value === null))) {
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
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: LsnCrossTabService, deps: [{ token: LsnCookieService }, { token: LSN_CROSS_TAB_CONFIG, optional: true }], target: i0.ɵɵFactoryTarget.Injectable }); }
    /** @nocollapse */ static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: LsnCrossTabService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: LsnCrossTabService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: LsnCookieService }, { type: LsnCrossTabConfig, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [LSN_CROSS_TAB_CONFIG]
                }] }] });

/*
 * Public API Surface of lsn-libs
 */
// whole module

/**
 * Generated bundle index. Do not edit.
 */

export { CapitalizeDirective, CustomNumericConfig, DefaultNumericConfig, LSN_COOKIE_CONFIG, LSN_CROSS_TAB_CONFIG, LatinToGreekDirective, LsnCapitalizeModule, LsnCookieConfig, LsnCookieModule, LsnCookieService, LsnCrossTabConfig, LsnCrossTabMessage, LsnCrossTabModule, LsnCrossTabService, LsnLatinToGreekModule, LsnLibsModule, LsnNumericModule, LsnNumpadModule, LsnScrollSpyModule, NumPadDirective, NumericConfigService, NumericDirective, NumericMessage, ScrollSpyDirective, lsnCrossTabServiceFactory };
//# sourceMappingURL=lsnova-angularmodules.mjs.map
