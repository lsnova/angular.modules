import { Directive, ElementRef, EventEmitter, forwardRef, HostListener, Input, Output, } from '@angular/core';
import * as keyboard from '@angular/cdk/keycodes';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NumericConfigService } from './numeric-config.service';
import * as i0 from "@angular/core";
import * as i1 from "./numeric-config.service";
const CUSTOM_SELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NumericDirective),
    multi: true
};
export var NumericMessage;
(function (NumericMessage) {
    NumericMessage[NumericMessage["ADDITIONAL_DECIMAL_SEPARATOR"] = 0] = "ADDITIONAL_DECIMAL_SEPARATOR";
    NumericMessage[NumericMessage["RANGE_EXCEEDED"] = 1] = "RANGE_EXCEEDED";
})(NumericMessage || (NumericMessage = {}));
const initialConfigValue = {};
export class NumericDirective {
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
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: NumericDirective, deps: [{ token: i0.ElementRef }, { token: i1.NumericConfigService }], target: i0.ɵɵFactoryTarget.Directive }); }
    /** @nocollapse */ static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.1.1", type: NumericDirective, selector: "[lsnNumeric]", inputs: { lsnNumeric: "lsnNumeric" }, outputs: { lsnNumericMessages: "lsnNumericMessages" }, host: { listeners: { "input": "inputHandler($event)", "focus": "focusHandler()", "blur": "blurHandler()", "keydown": "keyDownHandler($event)" } }, providers: [CUSTOM_SELECT_VALUE_ACCESSOR], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: NumericDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[lsnNumeric]',
                    providers: [CUSTOM_SELECT_VALUE_ACCESSOR]
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NumericConfigService }]; }, propDecorators: { lsnNumeric: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtZXJpYy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9sc24tbGlicy9zcmMvbGliL2RpcmVjdGl2ZXMvbnVtZXJpYy9udW1lcmljLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sS0FBSyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDbEQsT0FBTyxFQUF1QixpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZFLE9BQU8sRUFBZ0Isb0JBQW9CLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQzs7O0FBRTdFLE1BQU0sNEJBQTRCLEdBQVE7SUFDeEMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDO0lBQy9DLEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQUVGLE1BQU0sQ0FBTixJQUFZLGNBR1g7QUFIRCxXQUFZLGNBQWM7SUFDeEIsbUdBQTRCLENBQUE7SUFDNUIsdUVBQWMsQ0FBQTtBQUNoQixDQUFDLEVBSFcsY0FBYyxLQUFkLGNBQWMsUUFHekI7QUFFRCxNQUFNLGtCQUFrQixHQUFrQixFQUFFLENBQUM7QUFNN0MsTUFBTSxPQUFPLGdCQUFnQjtJQUUzQixJQUNJLFVBQVUsQ0FBQyxRQUF1QjtRQUNwQyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxLQUFLLGtCQUFrQixDQUFDO1FBQzVELE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxXQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDMUYsSUFBSSxD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QjtzQkFBM0IsTUFBTTtnQkFpQlAsWUFBWTtzQkFEWCxZQUFZO3VCQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFhakMsWUFBWTtzQkFEWCxZQUFZO3VCQUFDLE9BQU8sRUFBRSxFQUFFO2dCQU16QixXQUFXO3NCQURWLFlBQVk7dUJBQUMsTUFBTSxFQUFFLEVBQUU7Z0JBd0t4QixjQUFjO3NCQURiLFlBQVk7dUJBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsXG4gIE91dHB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBrZXlib2FyZCBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7TnVtZXJpY0NvbmZpZywgTnVtZXJpY0NvbmZpZ1NlcnZpY2V9IGZyb20gJy4vbnVtZXJpYy1jb25maWcuc2VydmljZSc7XG5cbmNvbnN0IENVU1RPTV9TRUxFQ1RfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE51bWVyaWNEaXJlY3RpdmUpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuZXhwb3J0IGVudW0gTnVtZXJpY01lc3NhZ2Uge1xuICBBRERJVElPTkFMX0RFQ0lNQUxfU0VQQVJBVE9SLFxuICBSQU5HRV9FWENFRURFRFxufVxuXG5jb25zdCBpbml0aWFsQ29uZmlnVmFsdWU6IE51bWVyaWNDb25maWcgPSB7fTtcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2xzbk51bWVyaWNdJyxcbiAgcHJvdmlkZXJzOiBbQ1VTVE9NX1NFTEVDVF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgTnVtZXJpY0RpcmVjdGl2ZSBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgcHJvdGVjdGVkIF9sc25OdW1lcmljOiBOdW1lcmljQ29uZmlnID0gaW5pdGlhbENvbmZpZ1ZhbHVlO1xuICBASW5wdXQoKVxuICBzZXQgbHNuTnVtZXJpYyhuZXdWYWx1ZTogTnVtZXJpY0NvbmZpZykge1xuICAgIGNvbnN0IGZpcnN0Q2hhbmdlID0gdGhpcy5fbHNuTnVtZXJpYyA9PT0gaW5pdGlhbENvbmZpZ1ZhbHVlO1xuICAgIGNvbnN0IHNob3VsZFBhcnNlQ29uZmlnID0gIWZpcnN0Q2hhbmdlICYmICF0aGlzLmlzQ29uZmlnRXF1YWwodGhpcy5fbHNuTnVtZXJpYywgbmV3VmFsdWUpO1xuICAgIHRoaXMuX2xzbk51bWVyaWMgPSBuZXdWYWx1ZTtcbiAgICB0aGlzLnNldENvbmZpZygpO1xuICAgIGlmIChzaG91bGRQYXJzZUNvbmZpZykge1xuICAgICAgdGhpcy5ibHVySGFuZGxlcigpO1xuICAgIH1cbiAgfVxuICBnZXQgbHNuTnVtZXJpYygpIHtcbiAgICByZXR1cm4gdGhpcy5fbHNuTnVtZXJpYztcbiAgfVxuICBAT3V0cHV0KCkgbHNuTnVtZXJpY01lc3NhZ2VzID0gbmV3IEV2ZW50RW1pdHRlcjxOdW1lcmljTWVzc2FnZT4oKTtcbiAgZWxlbWVudDogRWxlbWVudFJlZjtcbiAgcHJvdGVjdGVkIGNvbmZpZzogTnVtZXJpY0NvbmZpZztcbiAgcHVibGljIG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge1xuICB9XG4gIHB1YmxpYyBvblRvdWNoID0gKCkgPT4ge1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGNvbmZpZ1NlcnZpY2U6IE51bWVyaWNDb25maWdTZXJ2aWNlLFxuICApIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbDtcbiAgICB0aGlzLnNldENvbmZpZygpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignaW5wdXQnLCBbJyRldmVudCddKVxuICBpbnB1dEhhbmRsZXIoJGV2ZW50KSB7XG4gICAgaWYgKCRldmVudC50YXJnZXQudmFsdWUgPT09ICctJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgdmFsdWUgPSB0aGlzLnJlbW92ZUludmFsaWRDaGFyYWN0ZXJzKCRldmVudC50YXJnZXQudmFsdWUpO1xuICAgIHZhbHVlID0gdGhpcy5oYW5kbGVXaG9sZXNMZW5ndGgodmFsdWUpO1xuICAgIGNvbnN0IHBhcnNlZFZhbHVlID0gdGhpcy5wYXJzZVZhbHVlKHZhbHVlKTtcbiAgICB0aGlzLmRpc3BsYXlWYWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1ssfC5dLywgdGhpcy5jb25maWcuZGVjaW1hbHMpO1xuICAgIHRoaXMub25DaGFuZ2UocGFyc2VkVmFsdWUpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZm9jdXMnLCBbXSlcbiAgZm9jdXNIYW5kbGVyKCkge1xuICAgIHRoaXMuc2V0RWRpdE1vZGUoKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInLCBbXSlcbiAgYmx1ckhhbmRsZXIoKSB7XG4gICAgY29uc3QgcGFyc2VkVmFsdWU6IG51bWJlciA9IHRoaXMucGFyc2VWYWx1ZSh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC52YWx1ZSk7XG4gICAgY29uc3QgcmFuZ2VWYWx1ZSA9IHRoaXMuaGFuZGxlUmFuZ2UocGFyc2VkVmFsdWUpO1xuICAgIGlmIChyYW5nZVZhbHVlICE9PSBwYXJzZWRWYWx1ZSl7XG4gICAgICB0aGlzLmxzbk51bWVyaWNNZXNzYWdlcy5lbWl0KE51bWVyaWNNZXNzYWdlLlJBTkdFX0VYQ0VFREVEKTtcbiAgICB9XG4gICAgLy8gY29ycmVjdCBlbnRlcmVkIHZhbHVlIG9uIGJsdXIgdG8gcHJvcGVyIHJhbmdlIHZhbHVlXG4gICAgaWYgKHBhcnNlZFZhbHVlICE9PSByYW5nZVZhbHVlKSB7XG4gICAgICB0aGlzLmRpc3BsYXlWYWx1ZSA9IHJhbmdlVmFsdWUudG9TdHJpbmcoKS5yZXBsYWNlKC9bLHwuXS8sIHRoaXMuY29uZmlnLmRlY2ltYWxzKTtcbiAgICAgIHRoaXMub25DaGFuZ2UocmFuZ2VWYWx1ZSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNvbmZpZy5zdGVwICYmICFpc05hTihwYXJzZWRWYWx1ZSkpIHtcbiAgICAgIC8vIGNvcnJlY3QgZW50ZXJlZCB2YWx1ZSBvbiBibHVyIHRvIHByb3BlciBzdGVwIHZhbHVlXG4gICAgICBjb25zdCBzdGVwVmFsdWUgPSB0aGlzLmhhbmRsZVN0ZXAocGFyc2VkVmFsdWUpO1xuICAgICAgdGhpcy5kaXNwbGF5VmFsdWUgPSBzdGVwVmFsdWUudG9TdHJpbmcoKS5yZXBsYWNlKC9bLHwuXS8sIHRoaXMuY29uZmlnLmRlY2ltYWxzKTtcbiAgICAgIHRoaXMub25DaGFuZ2Uoc3RlcFZhbHVlKTtcbiAgICB9XG4gICAgdGhpcy5kaXNwbGF5VmFsdWUgPSB0aGlzLnByZXBhcmVEaXNwbGF5VmFsdWUodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWUpO1xuICAgIGlmICh0aGlzLm9uVG91Y2gpIHtcbiAgICAgIC8vIGlmIHVzZXIgc2V0cyB1cGRhdGVPbiB0byAnYmx1cicsIHdlIGhhdmUgdG8gY2FsbCBvblRvdWNoIGZvciBpdCB0byB3b3JrIHByb3Blcmx5XG4gICAgICB0aGlzLm9uVG91Y2goKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgd3JpdGVWYWx1ZShtb2RlbFZhbHVlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBwYXJzZWRWYWx1ZSA9IHRoaXMucGFyc2VWYWx1ZShtb2RlbFZhbHVlKTtcbiAgICB0aGlzLmRpc3BsYXlWYWx1ZSA9IHRoaXMucHJlcGFyZURpc3BsYXlWYWx1ZShwYXJzZWRWYWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2ggPSBmbjtcbiAgfVxuXG4gIGdldCBkaXNwbGF5VmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnZhbHVlO1xuICB9XG5cbiAgc2V0IGRpc3BsYXlWYWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBzZXRDb25maWcoKSB7XG4gICAgY29uc3QgZGVmYXVsdENvbmZpZyA9IHRoaXMubHNuTnVtZXJpYy5jb25maWdcbiAgICAgID8gdGhpcy5jb25maWdTZXJ2aWNlLmdldEN1c3RvbUNvbmZpZyh0aGlzLmxzbk51bWVyaWMuY29uZmlnKVxuICAgICAgOiB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0RGVmYXVsdENvbmZpZygpO1xuICAgIHRoaXMuY29uZmlnID0gT2JqZWN0LmFzc2lnbih7Li4uZGVmYXVsdENvbmZpZywgLi4udGhpcy5sc25OdW1lcmljfSk7XG4gICAgaWYgKHRoaXMuY29uZmlnLmRlY2ltYWxzICYmIHRoaXMuY29uZmlnLnRob3VzYW5kcyAmJiB0aGlzLmNvbmZpZy5kZWNpbWFscyA9PT0gdGhpcy5jb25maWcudGhvdXNhbmRzKSB7XG4gICAgICB0aGlzLmNvbmZpZy50aG91c2FuZHMgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGlmICh0aGlzLmNvbmZpZy5tYXggIT09IHVuZGVmaW5lZCAmJiB0aGlzLmNvbmZpZy5tYXhMZW5ndGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc29sZS53YXJuKCdbbHNuTnVtZXJpY10gU2V0dGluZyBgbWF4TGVuZ3RoYCBtYWtlcyBgbWF4YCByZWR1bmRhbnQuJyk7XG4gICAgfVxuICB9XG5cbiAgcGFyc2VWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICghdmFsdWUgJiYgdmFsdWUgIT09IDApIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGNvbnN0IG5ld1ZhbHVlID0gdmFsdWUudG9TdHJpbmcoKS5yZXBsYWNlKC9bLHwuXS8sICcuJyk7XG4gICAgY29uc3QgcGFyc2VkVmFsdWUgPSB0aGlzLmNvbmZpZy5wcmVjaXNpb24gPiAwXG4gICAgICA/IHBhcnNlRmxvYXQobmV3VmFsdWUpXG4gICAgICA6IHBhcnNlSW50KG5ld1ZhbHVlLCAxMCk7XG4gICAgcmV0dXJuIGlzTmFOKHBhcnNlZFZhbHVlKSA/IHVuZGVmaW5lZCA6IHBhcnNlZFZhbHVlO1xuICB9XG5cbiAgaGFuZGxlV2hvbGVzTGVuZ3RoKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMuY29uZmlnLm1heExlbmd0aCkge1xuICAgICAgY29uc3QgbmVnYXRpdmVTaWduID0gdmFsdWUudG9TdHJpbmcoKS5zdGFydHNXaXRoKCctJykgPyAnLScgOiAnJztcbiAgICAgIGNvbnN0IGFic29sdXRlVmFsdWUgPSB2YWx1ZS50b1N0cmluZygpXG4gICAgICAgIC5yZXBsYWNlKC9eLS8sICcnKVxuICAgICAgICAucmVwbGFjZSgvWyx8Ll0vLCB0aGlzLmNvbmZpZy5kZWNpbWFscyk7XG4gICAgICBpZiAoYWJzb2x1dGVWYWx1ZS50b1N0cmluZygpLmluY2x1ZGVzKHRoaXMuY29uZmlnLmRlY2ltYWxzKSkge1xuICAgICAgICBjb25zdCBbd2hvbGVzLCBkZWNpbWFsc10gPSBhYnNvbHV0ZVZhbHVlLnRvU3RyaW5nKCkuc3BsaXQodGhpcy5jb25maWcuZGVjaW1hbHMpO1xuICAgICAgICBjb25zdCBwcm9wZXJEZWNpbWFscyA9IHRoaXMucmVtb3ZlSW52YWxpZENoYXJhY3RlcnMoZGVjaW1hbHMsIHRydWUpO1xuICAgICAgICByZXR1cm4gbmVnYXRpdmVTaWduICsgd2hvbGVzLnN1YnN0cigwLCB0aGlzLmNvbmZpZy5tYXhMZW5ndGgpICsgdGhpcy5jb25maWcuZGVjaW1hbHMgKyBwcm9wZXJEZWNpbWFscztcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZWdhdGl2ZVNpZ24gKyBhYnNvbHV0ZVZhbHVlLnRvU3RyaW5nKCkuc3Vic3RyKDAsIHRoaXMuY29uZmlnLm1heExlbmd0aCk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHJlbW92ZUludmFsaWRDaGFyYWN0ZXJzKHZhbHVlLCBhbGxvd0RlY2ltYWxzT25seSA9IGZhbHNlKSB7XG4gICAgcmV0dXJuIHRoaXMuY2xlYW5VcChcbiAgICAgIGFsbG93RGVjaW1hbHNPbmx5XG4gICAgICAgID8gdmFsdWUucmVwbGFjZSgvW15cXC0wLTldL2csICcnKVxuICAgICAgICA6IHZhbHVlLnJlcGxhY2UoL1teXFwtMC05LC5dL2csICcnKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGNsZWFuVXAoaW5wdXQpIHtcbiAgICAvLyBubyBwcmVjaXNpb24gYXQgYWxsXG4gICAgbGV0IHZhbHVlID0gaW5wdXQucmVwbGFjZSgvWyx8Ll0vZywgJy4nKTtcbiAgICBjb25zdCBmaXJzdEluZGV4ID0gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB2YWx1ZSBpbnN0YW5jZW9mIFN0cmluZ1xuICAgICAgPyB2YWx1ZS5pbmRleE9mKCcuJylcbiAgICAgIDogLTE7XG4gICAgaWYgKGZpcnN0SW5kZXggPT09IC0xKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgLy8gcmVtb3ZlIGV2ZXJ5dGhpbmcgYWZ0ZXIgc2Vjb25kIGNvbW1hXG4gICAgY29uc3Qgc2Vjb25kSW5kZXggPSB2YWx1ZS5zdWJzdHIoZmlyc3RJbmRleCArIDEpLmluZGV4T2YoJy4nKTtcbiAgICBpZiAoc2Vjb25kSW5kZXggIT09IC0xKSB7XG4gICAgICB0aGlzLmxzbk51bWVyaWNNZXNzYWdlcy5lbWl0KE51bWVyaWNNZXNzYWdlLkFERElUSU9OQUxfREVDSU1BTF9TRVBBUkFUT1IpO1xuICAgICAgdmFsdWUgPSB2YWx1ZS5zdWJzdHIoMCwgZmlyc3RJbmRleCArIHNlY29uZEluZGV4ICsgMSk7XG4gICAgfVxuXG4gICAgLy8gcmVtb3ZlIGFkZGl0aW9uYWwgcHJlY2lzaW9uXG4gICAgaWYgKHRoaXMuY29uZmlnLnByZWNpc2lvbiA9PT0gMCkge1xuICAgICAgcmV0dXJuIHZhbHVlLnN1YnN0cigwLCBmaXJzdEluZGV4KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY29uZmlnLnByZWNpc2lvbikge1xuICAgICAgcmV0dXJuIHZhbHVlLnN1YnN0cigwLCBmaXJzdEluZGV4ICsgdGhpcy5jb25maWcucHJlY2lzaW9uICsgMSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIGhhbmRsZVJhbmdlKHZhbHVlKSB7XG4gICAgaWYgKCF0aGlzLmNvbmZpZy5tYXhMZW5ndGggJiYgdGhpcy5jb25maWcubWF4ICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgPiB0aGlzLmNvbmZpZy5tYXgpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5tYXg7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNvbmZpZy5taW4gIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSA8IHRoaXMuY29uZmlnLm1pbikge1xuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLm1pbjtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgaGFuZGxlU3RlcCh2YWx1ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSAvIHRoaXMuY29uZmlnLnN0ZXApICogdGhpcy5jb25maWcuc3RlcDtcbiAgfVxuXG4gIHByZXBhcmVEaXNwbGF5VmFsdWUodmFsdWUpIHtcbiAgICBpZiAoIXZhbHVlICYmIHZhbHVlICE9PSAwKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGNvbnN0IFt3aG9sZSwgZGVjaW1hbHNdID0gdGhpcy5nZXRXaG9sZUFuZERlY2ltYWxQYXJ0cyh2YWx1ZSk7XG4gICAgY29uc3QgaXNOZWdhdGl2ZSA9IHdob2xlWzBdID09PSAnLScgfHwgd2hvbGUgPCAwO1xuICAgIGxldCByZXN1bHQgPSB3aG9sZSA9PT0gJy0nIHx8ICF3aG9sZVxuICAgICAgPyAnMCdcbiAgICAgIDogdGhpcy5nZXRXaG9sZURpc3BsYXlWYWx1ZSh3aG9sZSk7XG4gICAgaWYgKHRoaXMuY29uZmlnLnRob3VzYW5kcykge1xuICAgICAgcmVzdWx0ID0gcmVzdWx0LnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csIHRoaXMuY29uZmlnLnRob3VzYW5kcyk7XG4gICAgfVxuICAgIGlmICh0aGlzLmNvbmZpZy5wcmVjaXNpb24gJiYgdGhpcy5jb25maWcuZGVjaW1hbHMpIHtcbiAgICAgIGlmICh0aGlzLmNvbmZpZy5hbHdheXNEaXNwbGF5RGVjaW1hbHMgJiYgdGhpcy5zaG91bGRBZGREZWZhdWx0RGVjaW1hbHMoZGVjaW1hbHMpKSB7XG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdCArIHRoaXMuY29uZmlnLmRlY2ltYWxzICsgdGhpcy5kZWZhdWx0RGVjaW1hbHMoZGVjaW1hbHMsIHRoaXMuY29uZmlnLnByZWNpc2lvbik7XG4gICAgICB9IGVsc2UgaWYgKGRlY2ltYWxzKSB7XG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdCArIHRoaXMuY29uZmlnLmRlY2ltYWxzICsgZGVjaW1hbHM7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpc05lZ2F0aXZlICYmIHJlc3VsdCAhPT0gJzAnID8gJy0nICsgcmVzdWx0IDogcmVzdWx0O1xuICB9XG5cbiAgc2V0RWRpdE1vZGUoKSB7XG4gICAgaWYgKHRoaXMuY29uZmlnLnRob3VzYW5kcykge1xuICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgICBjb25zdCBbd2hvbGUsIGRlY2ltYWxzXSA9IGN1cnJlbnRWYWx1ZS5zcGxpdCh0aGlzLmNvbmZpZy5kZWNpbWFscyk7XG4gICAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoJ1xcXFwnICsgdGhpcy5jb25maWcudGhvdXNhbmRzLCAnZycpO1xuICAgICAgbGV0IHJlc3VsdCA9IHdob2xlLnJlcGxhY2UocmVnZXgsICcnKTtcbiAgICAgIGlmIChkZWNpbWFscyAmJiB0aGlzLmNvbmZpZy5wcmVjaXNpb24gJiYgdGhpcy5jb25maWcuZGVjaW1hbHMpIHtcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0ICsgdGhpcy5jb25maWcuZGVjaW1hbHMgKyBkZWNpbWFscztcbiAgICAgIH1cbiAgICAgIHRoaXMuZGlzcGxheVZhbHVlID0gcmVzdWx0O1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICBrZXlEb3duSGFuZGxlcihlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgY29uc3QgY3VycmVudFZhbHVlID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgaWYgKFxuICAgICAgLy8gQWxsb3cgc3BlY2lhbCBrZXlzXG4gICAgICBbXG4gICAgICAgIGtleWJvYXJkLkxFRlRfQVJST1csXG4gICAgICAgIGtleWJvYXJkLlJJR0hUX0FSUk9XLFxuICAgICAgICBrZXlib2FyZC5CQUNLU1BBQ0UsXG4gICAgICAgIGtleWJvYXJkLkRFTEVURSxcbiAgICAgICAga2V5Ym9hcmQuRU5ELFxuICAgICAgICBrZXlib2FyZC5FTlRFUixcbiAgICAgICAga2V5Ym9hcmQuRVNDQVBFLFxuICAgICAgICBrZXlib2FyZC5IT01FLFxuICAgICAgICBrZXlib2FyZC5UQUIsXG4gICAgICBdLmluZGV4T2YoZS5rZXlDb2RlKSAhPT0gLTFcbiAgICAgIC8vIEFsbG93IEN0cmwra2V5IGFjdGlvbnNcbiAgICAgIHx8IChcbiAgICAgICAgW1xuICAgICAgICAgIGtleWJvYXJkLkEsXG4gICAgICAgICAga2V5Ym9hcmQuQyxcbiAgICAgICAgICBrZXlib2FyZC5SLFxuICAgICAgICAgIGtleWJvYXJkLlYsXG4gICAgICAgICAga2V5Ym9hcmQuWCxcbiAgICAgICAgXS5pbmRleE9mKGUua2V5Q29kZSkgIT09IC0xXG4gICAgICAgICYmIChlLmN0cmxLZXkgPT09IHRydWUgfHwgZS5tZXRhS2V5ID09PSB0cnVlKVxuICAgICAgKVxuICAgICkge1xuICAgICAgcmV0dXJuOyAgLy8gbGV0IGl0IGhhcHBlbiwgZG9uJ3QgZG8gYW55dGhpbmdcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgbWF4TGVuZ3RoXG4gICAgY29uc3QgYWJzb2x1dGVWYWx1ZSA9IGN1cnJlbnRWYWx1ZS50b1N0cmluZygpLnJlcGxhY2UoL14tLywgJycpO1xuICAgIGNvbnN0IFt3aG9sZXNdID0gYWJzb2x1dGVWYWx1ZS50b1N0cmluZygpLnNwbGl0KHRoaXMuY29uZmlnLmRlY2ltYWxzKTtcbiAgICBpZiAoXG4gICAgICB0aGlzLmNvbmZpZy5tYXhMZW5ndGggIT09IHVuZGVmaW5lZFxuICAgICAgJiYgKFxuICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCA8IHdob2xlcy5sZW5ndGhcbiAgICAgICAgJiYgd2hvbGVzLmxlbmd0aCA+PSB0aGlzLmNvbmZpZy5tYXhMZW5ndGhcbiAgICAgICAgJiYgW2tleWJvYXJkLkRBU0gsIGtleWJvYXJkLk5VTVBBRF9NSU5VU10uaW5kZXhPZihlLmtleUNvZGUpID09PSAtMVxuICAgICAgKVxuICAgICAgJiYgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uRW5kIC0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPT09IDBcbiAgICApIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgbWludXNcbiAgICBpZiAoXG4gICAgICBba2V5Ym9hcmQuREFTSCwga2V5Ym9hcmQuTlVNUEFEX01JTlVTXS5pbmRleE9mKGUua2V5Q29kZSkgIT09IC0xXG4gICAgICAmJiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCA9PT0gMFxuICAgICAgJiYgKCh0aGlzLmNvbmZpZy5taW4gIT09IHVuZGVmaW5lZCAmJiB0aGlzLmNvbmZpZy5taW4gPCAwKSB8fCB0aGlzLmNvbmZpZy5taW4gPT09IHVuZGVmaW5lZClcbiAgICAgICYmIGN1cnJlbnRWYWx1ZS5pbmRleE9mKCctJykgPT09IC0xXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHNlcGFyYXRvclxuICAgIGlmIChcbiAgICAgIHRoaXMuY29uZmlnLnByZWNpc2lvbiA+IDBcbiAgICAgICYmIFtrZXlib2FyZC5DT01NQSwga2V5Ym9hcmQuTlVNUEFEX1BFUklPRCwgMTkwXS5pbmRleE9mKGUua2V5Q29kZSkgIT09IC0xXG4gICAgICAmJiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCA+IDBcbiAgICAgICYmIGN1cnJlbnRWYWx1ZS5sZW5ndGhcbiAgICAgICYmIGN1cnJlbnRWYWx1ZS5pbmRleE9mKCcuJykgPT09IC0xXG4gICAgICAmJiBjdXJyZW50VmFsdWUuaW5kZXhPZignLCcpID09PSAtMVxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBrZXkgYWZ0ZXIgc2VwYXJhdG9yXG4gICAgaWYgKFxuICAgICAgdGhpcy5jb25maWcucHJlY2lzaW9uID4gMFxuICAgICAgJiYgY3VycmVudFZhbHVlLmluZGV4T2YodGhpcy5jb25maWcuZGVjaW1hbHMpID4gLTFcbiAgICAgICYmIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0ID4gY3VycmVudFZhbHVlLmluZGV4T2YodGhpcy5jb25maWcuZGVjaW1hbHMpXG4gICAgKSB7XG4gICAgICBjb25zdCBbLCBkZWNpbWFsc10gPSBjdXJyZW50VmFsdWUuc3BsaXQodGhpcy5jb25maWcuZGVjaW1hbHMpO1xuICAgICAgaWYgKGRlY2ltYWxzICYmIGRlY2ltYWxzLmxlbmd0aCA+PSB0aGlzLmNvbmZpZy5wcmVjaXNpb24pIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBFbnN1cmUgdGhhdCBpdCBpcyBhIG51bWJlciBvciBzdG9wIHRoZSBrZXlwcmVzc1xuICAgIGlmIChcbiAgICAgIChcbiAgICAgICAgKFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIGtleWJvYXJkLlpFUk8sXG4gICAgICAgICAgICBrZXlib2FyZC5PTkUsXG4gICAgICAgICAgICBrZXlib2FyZC5UV08sXG4gICAgICAgICAgICBrZXlib2FyZC5USFJFRSxcbiAgICAgICAgICAgIGtleWJvYXJkLkZPVVIsXG4gICAgICAgICAgICBrZXlib2FyZC5GSVZFLFxuICAgICAgICAgICAga2V5Ym9hcmQuU0lYLFxuICAgICAgICAgICAga2V5Ym9hcmQuU0VWRU4sXG4gICAgICAgICAgICBrZXlib2FyZC5FSUdIVCxcbiAgICAgICAgICAgIGtleWJvYXJkLk5JTkVcbiAgICAgICAgICBdLmluZGV4T2YoZS5rZXlDb2RlKSA9PT0gLTFcbiAgICAgICAgICB8fCBlLnNoaWZ0S2V5XG4gICAgICAgIClcbiAgICAgICAgJiZcbiAgICAgICAgW1xuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9aRVJPLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9PTkUsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX1RXTyxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfVEhSRUUsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX0ZPVVIsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX0ZJVkUsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX1NJWCxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfU0VWRU4sXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX0VJR0hULFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9OSU5FLFxuICAgICAgICBdLmluZGV4T2YoZS5rZXlDb2RlKSA9PT0gLTFcbiAgICAgIClcbiAgICAgIHx8IChcbiAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPT09IDBcbiAgICAgICAgJiYgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uRW5kID09PSAwXG4gICAgICAgICYmIGN1cnJlbnRWYWx1ZS5pbmRleE9mKCctJykgPiAtMVxuICAgICAgKVxuICAgICkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBwYXJzZSB3aG9sZSBwYXJ0IG9mIGEgbnVtYmVyIHRvIGRpc3BsYXkgdmFsdWUgKGJhc2VkIG9uIGdpdmVuIGNvbmZpZylcbiAgICovXG4gIHByb3RlY3RlZCBnZXRXaG9sZURpc3BsYXlWYWx1ZSh3aG9sZTogc3RyaW5nIHwgbnVtYmVyKTogc3RyaW5nIHtcbiAgICBjb25zdCBwYXJzZWRXaG9sZTogbnVtYmVyID0gTWF0aC5hYnModHlwZW9mIHdob2xlICE9PSAnbnVtYmVyJyA/IHBhcnNlSW50KHdob2xlLCAxMCkgOiB3aG9sZSk7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLm5vU2NpZW50aWZpY05vdGF0aW9uXG4gICAgICA/IHBhcnNlZFdob2xlLnRvTG9jYWxlU3RyaW5nKCdmdWxsd2lkZScsIHt1c2VHcm91cGluZzogZmFsc2V9KVxuICAgICAgOiBwYXJzZWRXaG9sZS50b1N0cmluZygpO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCB3aG9sZSBhbmQgZGVjaW1hbCBwYXJ0IG9mIGEgbnVtYmVyXG4gICAqIHR5cGUgb2YgcmV0dXJuIHZhbHVlcyBtYXkgdmFyeSwgaXQgaXMgaW50ZW50aW9uYWxcbiAgICogdGhlIHJldHVybmVkIGFycmF5IHNob3VsZCBoYXZlIHNpemUgb2YgMShvbmx5IHdob2xlIG51bWJlcikgb3IgMih3aG9sZSBhbmQgZGVjaW1hbClcbiAgICovXG4gIHByb3RlY3RlZCBnZXRXaG9sZUFuZERlY2ltYWxQYXJ0cyh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyKTogQXJyYXk8bnVtYmVyIHwgc3RyaW5nPiB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIGlmICh0aGlzLmNvbmZpZy5ub1NjaWVudGlmaWNOb3RhdGlvbiAmJiAodmFsdWUgPiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUiB8fCB2YWx1ZSA8IE51bWJlci5NSU5fU0FGRV9JTlRFR0VSKSkge1xuICAgICAgICBjb25zdCBkZWNpbWFscyA9IHZhbHVlICUgMTtcbiAgICAgICAgcmV0dXJuIFtNYXRoLmZsb29yKHZhbHVlKSwgZGVjaW1hbHMgIT09IDAgPyAnJyArIGRlY2ltYWxzIDogdW5kZWZpbmVkXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpLnNwbGl0KCcuJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpLnNwbGl0KHRoaXMuY29uZmlnLmRlY2ltYWxzKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgZGVmYXVsdERlY2ltYWxzKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgPSAnJywgcHJlY2lzaW9uOiBudW1iZXIgPSAwKTogc3RyaW5nIHtcbiAgICBsZXQgcmVzdWx0ID0gJycgKyB2YWx1ZTtcbiAgICB3aGlsZSAocmVzdWx0Lmxlbmd0aCA8IHByZWNpc2lvbikge1xuICAgICAgcmVzdWx0ICs9ICcwJztcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByb3RlY3RlZCBzaG91bGRBZGREZWZhdWx0RGVjaW1hbHMoZGVjaW1hbHM6IHN0cmluZyB8IG51bWJlciB8IHVuZGVmaW5lZCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhZGVjaW1hbHMgfHwgKCcnICsgZGVjaW1hbHMpLmxlbmd0aCAhPT0gdGhpcy5jb25maWcucHJlY2lzaW9uO1xuICB9XG5cbiAgaXNDb25maWdFcXVhbChjb25maWcxPzogTnVtZXJpY0NvbmZpZywgY29uZmlnMj86IE51bWVyaWNDb25maWcpOiBib29sZWFuIHtcbiAgICBpZiAoKGNvbmZpZzEgJiYgIWNvbmZpZzIpIHx8ICghY29uZmlnMSAmJiBjb25maWcyKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoIWNvbmZpZzEgJiYgIWNvbmZpZzIpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSBpZiAoT2JqZWN0LmtleXMoY29uZmlnMSkubGVuZ3RoID09PSBPYmplY3Qua2V5cyhjb25maWcyKS5sZW5ndGgpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5MSBpbiBjb25maWcxKSB7XG4gICAgICAgIGlmIChjb25maWcxLmhhc093blByb3BlcnR5KGtleTEpICYmIGNvbmZpZzFba2V5MV0gIT09IGNvbmZpZzJba2V5MV0pIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG59XG4iXX0=