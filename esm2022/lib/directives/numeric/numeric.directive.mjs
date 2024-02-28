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
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: NumericDirective, deps: [{ token: i0.ElementRef }, { token: i1.NumericConfigService }], target: i0.ɵɵFactoryTarget.Directive }); }
    /** @nocollapse */ static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.2.1", type: NumericDirective, selector: "[lsnNumeric]", inputs: { lsnNumeric: "lsnNumeric" }, outputs: { lsnNumericMessages: "lsnNumericMessages" }, host: { listeners: { "input": "inputHandler($event)", "focus": "focusHandler()", "blur": "blurHandler()", "keydown": "keyDownHandler($event)" } }, providers: [CUSTOM_SELECT_VALUE_ACCESSOR], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: NumericDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[lsnNumeric]',
                    providers: [CUSTOM_SELECT_VALUE_ACCESSOR]
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1.NumericConfigService }], propDecorators: { lsnNumeric: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtZXJpYy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9sc24tbGlicy9zcmMvbGliL2RpcmVjdGl2ZXMvbnVtZXJpYy9udW1lcmljLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sS0FBSyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDbEQsT0FBTyxFQUF1QixpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZFLE9BQU8sRUFBZ0Isb0JBQW9CLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQzs7O0FBRTdFLE1BQU0sNEJBQTRCLEdBQVE7SUFDeEMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDO0lBQy9DLEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQUVGLE1BQU0sQ0FBTixJQUFZLGNBR1g7QUFIRCxXQUFZLGNBQWM7SUFDeEIsbUdBQTRCLENBQUE7SUFDNUIsdUVBQWMsQ0FBQTtBQUNoQixDQUFDLEVBSFcsY0FBYyxLQUFkLGNBQWMsUUFHekI7QUFFRCxNQUFNLGtCQUFrQixHQUFrQixFQUFFLENBQUM7QUFNN0MsTUFBTSxPQUFPLGdCQUFnQjtJQUUzQixJQUNJLFVBQVUsQ0FBQyxRQUF1QjtRQUNwQyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxLQUFLLGtCQUFrQixDQUFDO1FBQzVELE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxXQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDMUYsSUFBSSxD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SSxPQUFPLEVBQUUsQ0FBQztnQkFDM0IsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztvQkFDcEUsT0FBTyxLQUFLLENBQUM7Z0JBQ2YsQ0FBQztZQUNILENBQUM7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7YUFBTSxDQUFDO1lBQ04sT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDO0lBQ0gsQ0FBQztpSUEzWVUsZ0JBQWdCO3FIQUFoQixnQkFBZ0IsdVJBRmhCLENBQUMsNEJBQTRCLENBQUM7OzJGQUU5QixnQkFBZ0I7a0JBSjVCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO2lCQUMxQztrSEFJSyxVQUFVO3NCQURiLEtBQUs7Z0JBYUksa0JBQWtCO3NCQUEzQixNQUFNO2dCQWlCUCxZQUFZO3NCQURYLFlBQVk7dUJBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQWFqQyxZQUFZO3NCQURYLFlBQVk7dUJBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBTXpCLFdBQVc7c0JBRFYsWUFBWTt1QkFBQyxNQUFNLEVBQUUsRUFBRTtnQkF3S3hCLGNBQWM7c0JBRGIsWUFBWTt1QkFBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIGtleWJvYXJkIGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtOdW1lcmljQ29uZmlnLCBOdW1lcmljQ29uZmlnU2VydmljZX0gZnJvbSAnLi9udW1lcmljLWNvbmZpZy5zZXJ2aWNlJztcblxuY29uc3QgQ1VTVE9NX1NFTEVDVF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTnVtZXJpY0RpcmVjdGl2ZSksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5leHBvcnQgZW51bSBOdW1lcmljTWVzc2FnZSB7XG4gIEFERElUSU9OQUxfREVDSU1BTF9TRVBBUkFUT1IsXG4gIFJBTkdFX0VYQ0VFREVEXG59XG5cbmNvbnN0IGluaXRpYWxDb25maWdWYWx1ZTogTnVtZXJpY0NvbmZpZyA9IHt9O1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbHNuTnVtZXJpY10nLFxuICBwcm92aWRlcnM6IFtDVVNUT01fU0VMRUNUX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBOdW1lcmljRGlyZWN0aXZlIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBwcm90ZWN0ZWQgX2xzbk51bWVyaWM6IE51bWVyaWNDb25maWcgPSBpbml0aWFsQ29uZmlnVmFsdWU7XG4gIEBJbnB1dCgpXG4gIHNldCBsc25OdW1lcmljKG5ld1ZhbHVlOiBOdW1lcmljQ29uZmlnKSB7XG4gICAgY29uc3QgZmlyc3RDaGFuZ2UgPSB0aGlzLl9sc25OdW1lcmljID09PSBpbml0aWFsQ29uZmlnVmFsdWU7XG4gICAgY29uc3Qgc2hvdWxkUGFyc2VDb25maWcgPSAhZmlyc3RDaGFuZ2UgJiYgIXRoaXMuaXNDb25maWdFcXVhbCh0aGlzLl9sc25OdW1lcmljLCBuZXdWYWx1ZSk7XG4gICAgdGhpcy5fbHNuTnVtZXJpYyA9IG5ld1ZhbHVlO1xuICAgIHRoaXMuc2V0Q29uZmlnKCk7XG4gICAgaWYgKHNob3VsZFBhcnNlQ29uZmlnKSB7XG4gICAgICB0aGlzLmJsdXJIYW5kbGVyKCk7XG4gICAgfVxuICB9XG4gIGdldCBsc25OdW1lcmljKCkge1xuICAgIHJldHVybiB0aGlzLl9sc25OdW1lcmljO1xuICB9XG4gIEBPdXRwdXQoKSBsc25OdW1lcmljTWVzc2FnZXMgPSBuZXcgRXZlbnRFbWl0dGVyPE51bWVyaWNNZXNzYWdlPigpO1xuICBlbGVtZW50OiBFbGVtZW50UmVmO1xuICBwcm90ZWN0ZWQgY29uZmlnOiBOdW1lcmljQ29uZmlnO1xuICBwdWJsaWMgb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7XG4gIH1cbiAgcHVibGljIG9uVG91Y2ggPSAoKSA9PiB7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgY29uZmlnU2VydmljZTogTnVtZXJpY0NvbmZpZ1NlcnZpY2UsXG4gICkge1xuICAgIHRoaXMuZWxlbWVudCA9IGVsO1xuICAgIHRoaXMuc2V0Q29uZmlnKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdpbnB1dCcsIFsnJGV2ZW50J10pXG4gIGlucHV0SGFuZGxlcigkZXZlbnQpIHtcbiAgICBpZiAoJGV2ZW50LnRhcmdldC52YWx1ZSA9PT0gJy0nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCB2YWx1ZSA9IHRoaXMucmVtb3ZlSW52YWxpZENoYXJhY3RlcnMoJGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgdmFsdWUgPSB0aGlzLmhhbmRsZVdob2xlc0xlbmd0aCh2YWx1ZSk7XG4gICAgY29uc3QgcGFyc2VkVmFsdWUgPSB0aGlzLnBhcnNlVmFsdWUodmFsdWUpO1xuICAgIHRoaXMuZGlzcGxheVZhbHVlID0gdmFsdWUucmVwbGFjZSgvWyx8Ll0vLCB0aGlzLmNvbmZpZy5kZWNpbWFscyk7XG4gICAgdGhpcy5vbkNoYW5nZShwYXJzZWRWYWx1ZSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdmb2N1cycsIFtdKVxuICBmb2N1c0hhbmRsZXIoKSB7XG4gICAgdGhpcy5zZXRFZGl0TW9kZSgpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignYmx1cicsIFtdKVxuICBibHVySGFuZGxlcigpIHtcbiAgICBjb25zdCBwYXJzZWRWYWx1ZTogbnVtYmVyID0gdGhpcy5wYXJzZVZhbHVlKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnZhbHVlKTtcbiAgICBjb25zdCByYW5nZVZhbHVlID0gdGhpcy5oYW5kbGVSYW5nZShwYXJzZWRWYWx1ZSk7XG4gICAgaWYgKHJhbmdlVmFsdWUgIT09IHBhcnNlZFZhbHVlKXtcbiAgICAgIHRoaXMubHNuTnVtZXJpY01lc3NhZ2VzLmVtaXQoTnVtZXJpY01lc3NhZ2UuUkFOR0VfRVhDRUVERUQpO1xuICAgIH1cbiAgICAvLyBjb3JyZWN0IGVudGVyZWQgdmFsdWUgb24gYmx1ciB0byBwcm9wZXIgcmFuZ2UgdmFsdWVcbiAgICBpZiAocGFyc2VkVmFsdWUgIT09IHJhbmdlVmFsdWUpIHtcbiAgICAgIHRoaXMuZGlzcGxheVZhbHVlID0gcmFuZ2VWYWx1ZS50b1N0cmluZygpLnJlcGxhY2UoL1ssfC5dLywgdGhpcy5jb25maWcuZGVjaW1hbHMpO1xuICAgICAgdGhpcy5vbkNoYW5nZShyYW5nZVZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY29uZmlnLnN0ZXAgJiYgIWlzTmFOKHBhcnNlZFZhbHVlKSkge1xuICAgICAgLy8gY29ycmVjdCBlbnRlcmVkIHZhbHVlIG9uIGJsdXIgdG8gcHJvcGVyIHN0ZXAgdmFsdWVcbiAgICAgIGNvbnN0IHN0ZXBWYWx1ZSA9IHRoaXMuaGFuZGxlU3RlcChwYXJzZWRWYWx1ZSk7XG4gICAgICB0aGlzLmRpc3BsYXlWYWx1ZSA9IHN0ZXBWYWx1ZS50b1N0cmluZygpLnJlcGxhY2UoL1ssfC5dLywgdGhpcy5jb25maWcuZGVjaW1hbHMpO1xuICAgICAgdGhpcy5vbkNoYW5nZShzdGVwVmFsdWUpO1xuICAgIH1cbiAgICB0aGlzLmRpc3BsYXlWYWx1ZSA9IHRoaXMucHJlcGFyZURpc3BsYXlWYWx1ZSh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC52YWx1ZSk7XG4gICAgaWYgKHRoaXMub25Ub3VjaCkge1xuICAgICAgLy8gaWYgdXNlciBzZXRzIHVwZGF0ZU9uIHRvICdibHVyJywgd2UgaGF2ZSB0byBjYWxsIG9uVG91Y2ggZm9yIGl0IHRvIHdvcmsgcHJvcGVybHlcbiAgICAgIHRoaXMub25Ub3VjaCgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyB3cml0ZVZhbHVlKG1vZGVsVmFsdWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHBhcnNlZFZhbHVlID0gdGhpcy5wYXJzZVZhbHVlKG1vZGVsVmFsdWUpO1xuICAgIHRoaXMuZGlzcGxheVZhbHVlID0gdGhpcy5wcmVwYXJlRGlzcGxheVZhbHVlKHBhcnNlZFZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaCA9IGZuO1xuICB9XG5cbiAgZ2V0IGRpc3BsYXlWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gIH1cblxuICBzZXQgZGlzcGxheVZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHNldENvbmZpZygpIHtcbiAgICBjb25zdCBkZWZhdWx0Q29uZmlnID0gdGhpcy5sc25OdW1lcmljLmNvbmZpZ1xuICAgICAgPyB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0Q3VzdG9tQ29uZmlnKHRoaXMubHNuTnVtZXJpYy5jb25maWcpXG4gICAgICA6IHRoaXMuY29uZmlnU2VydmljZS5nZXREZWZhdWx0Q29uZmlnKCk7XG4gICAgdGhpcy5jb25maWcgPSBPYmplY3QuYXNzaWduKHsuLi5kZWZhdWx0Q29uZmlnLCAuLi50aGlzLmxzbk51bWVyaWN9KTtcbiAgICBpZiAodGhpcy5jb25maWcuZGVjaW1hbHMgJiYgdGhpcy5jb25maWcudGhvdXNhbmRzICYmIHRoaXMuY29uZmlnLmRlY2ltYWxzID09PSB0aGlzLmNvbmZpZy50aG91c2FuZHMpIHtcbiAgICAgIHRoaXMuY29uZmlnLnRob3VzYW5kcyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKHRoaXMuY29uZmlnLm1heCAhPT0gdW5kZWZpbmVkICYmIHRoaXMuY29uZmlnLm1heExlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1tsc25OdW1lcmljXSBTZXR0aW5nIGBtYXhMZW5ndGhgIG1ha2VzIGBtYXhgIHJlZHVuZGFudC4nKTtcbiAgICB9XG4gIH1cblxuICBwYXJzZVZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKCF2YWx1ZSAmJiB2YWx1ZSAhPT0gMCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgY29uc3QgbmV3VmFsdWUgPSB2YWx1ZS50b1N0cmluZygpLnJlcGxhY2UoL1ssfC5dLywgJy4nKTtcbiAgICBjb25zdCBwYXJzZWRWYWx1ZSA9IHRoaXMuY29uZmlnLnByZWNpc2lvbiA+IDBcbiAgICAgID8gcGFyc2VGbG9hdChuZXdWYWx1ZSlcbiAgICAgIDogcGFyc2VJbnQobmV3VmFsdWUsIDEwKTtcbiAgICByZXR1cm4gaXNOYU4ocGFyc2VkVmFsdWUpID8gdW5kZWZpbmVkIDogcGFyc2VkVmFsdWU7XG4gIH1cblxuICBoYW5kbGVXaG9sZXNMZW5ndGgodmFsdWUpIHtcbiAgICBpZiAodGhpcy5jb25maWcubWF4TGVuZ3RoKSB7XG4gICAgICBjb25zdCBuZWdhdGl2ZVNpZ24gPSB2YWx1ZS50b1N0cmluZygpLnN0YXJ0c1dpdGgoJy0nKSA/ICctJyA6ICcnO1xuICAgICAgY29uc3QgYWJzb2x1dGVWYWx1ZSA9IHZhbHVlLnRvU3RyaW5nKClcbiAgICAgICAgLnJlcGxhY2UoL14tLywgJycpXG4gICAgICAgIC5yZXBsYWNlKC9bLHwuXS8sIHRoaXMuY29uZmlnLmRlY2ltYWxzKTtcbiAgICAgIGlmIChhYnNvbHV0ZVZhbHVlLnRvU3RyaW5nKCkuaW5jbHVkZXModGhpcy5jb25maWcuZGVjaW1hbHMpKSB7XG4gICAgICAgIGNvbnN0IFt3aG9sZXMsIGRlY2ltYWxzXSA9IGFic29sdXRlVmFsdWUudG9TdHJpbmcoKS5zcGxpdCh0aGlzLmNvbmZpZy5kZWNpbWFscyk7XG4gICAgICAgIGNvbnN0IHByb3BlckRlY2ltYWxzID0gdGhpcy5yZW1vdmVJbnZhbGlkQ2hhcmFjdGVycyhkZWNpbWFscywgdHJ1ZSk7XG4gICAgICAgIHJldHVybiBuZWdhdGl2ZVNpZ24gKyB3aG9sZXMuc3Vic3RyKDAsIHRoaXMuY29uZmlnLm1heExlbmd0aCkgKyB0aGlzLmNvbmZpZy5kZWNpbWFscyArIHByb3BlckRlY2ltYWxzO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5lZ2F0aXZlU2lnbiArIGFic29sdXRlVmFsdWUudG9TdHJpbmcoKS5zdWJzdHIoMCwgdGhpcy5jb25maWcubWF4TGVuZ3RoKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcmVtb3ZlSW52YWxpZENoYXJhY3RlcnModmFsdWUsIGFsbG93RGVjaW1hbHNPbmx5ID0gZmFsc2UpIHtcbiAgICByZXR1cm4gdGhpcy5jbGVhblVwKFxuICAgICAgYWxsb3dEZWNpbWFsc09ubHlcbiAgICAgICAgPyB2YWx1ZS5yZXBsYWNlKC9bXlxcLTAtOV0vZywgJycpXG4gICAgICAgIDogdmFsdWUucmVwbGFjZSgvW15cXC0wLTksLl0vZywgJycpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgY2xlYW5VcChpbnB1dCkge1xuICAgIC8vIG5vIHByZWNpc2lvbiBhdCBhbGxcbiAgICBsZXQgdmFsdWUgPSBpbnB1dC5yZXBsYWNlKC9bLHwuXS9nLCAnLicpO1xuICAgIGNvbnN0IGZpcnN0SW5kZXggPSB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHZhbHVlIGluc3RhbmNlb2YgU3RyaW5nXG4gICAgICA/IHZhbHVlLmluZGV4T2YoJy4nKVxuICAgICAgOiAtMTtcbiAgICBpZiAoZmlyc3RJbmRleCA9PT0gLTEpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICAvLyByZW1vdmUgZXZlcnl0aGluZyBhZnRlciBzZWNvbmQgY29tbWFcbiAgICBjb25zdCBzZWNvbmRJbmRleCA9IHZhbHVlLnN1YnN0cihmaXJzdEluZGV4ICsgMSkuaW5kZXhPZignLicpO1xuICAgIGlmIChzZWNvbmRJbmRleCAhPT0gLTEpIHtcbiAgICAgIHRoaXMubHNuTnVtZXJpY01lc3NhZ2VzLmVtaXQoTnVtZXJpY01lc3NhZ2UuQURESVRJT05BTF9ERUNJTUFMX1NFUEFSQVRPUik7XG4gICAgICB2YWx1ZSA9IHZhbHVlLnN1YnN0cigwLCBmaXJzdEluZGV4ICsgc2Vjb25kSW5kZXggKyAxKTtcbiAgICB9XG5cbiAgICAvLyByZW1vdmUgYWRkaXRpb25hbCBwcmVjaXNpb25cbiAgICBpZiAodGhpcy5jb25maWcucHJlY2lzaW9uID09PSAwKSB7XG4gICAgICByZXR1cm4gdmFsdWUuc3Vic3RyKDAsIGZpcnN0SW5kZXgpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jb25maWcucHJlY2lzaW9uKSB7XG4gICAgICByZXR1cm4gdmFsdWUuc3Vic3RyKDAsIGZpcnN0SW5kZXggKyB0aGlzLmNvbmZpZy5wcmVjaXNpb24gKyAxKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgaGFuZGxlUmFuZ2UodmFsdWUpIHtcbiAgICBpZiAoIXRoaXMuY29uZmlnLm1heExlbmd0aCAmJiB0aGlzLmNvbmZpZy5tYXggIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSA+IHRoaXMuY29uZmlnLm1heCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLm1heDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY29uZmlnLm1pbiAhPT0gdW5kZWZpbmVkICYmIHZhbHVlIDwgdGhpcy5jb25maWcubWluKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25maWcubWluO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBoYW5kbGVTdGVwKHZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlIC8gdGhpcy5jb25maWcuc3RlcCkgKiB0aGlzLmNvbmZpZy5zdGVwO1xuICB9XG5cbiAgcHJlcGFyZURpc3BsYXlWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICghdmFsdWUgJiYgdmFsdWUgIT09IDApIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgY29uc3QgW3dob2xlLCBkZWNpbWFsc10gPSB0aGlzLmdldFdob2xlQW5kRGVjaW1hbFBhcnRzKHZhbHVlKTtcbiAgICBjb25zdCBpc05lZ2F0aXZlID0gd2hvbGVbMF0gPT09ICctJyB8fCAod2hvbGUgYXMgbnVtYmVyKSA8IDA7XG4gICAgbGV0IHJlc3VsdCA9IHdob2xlID09PSAnLScgfHwgIXdob2xlXG4gICAgICA/ICcwJ1xuICAgICAgOiB0aGlzLmdldFdob2xlRGlzcGxheVZhbHVlKHdob2xlKTtcbiAgICBpZiAodGhpcy5jb25maWcudGhvdXNhbmRzKSB7XG4gICAgICByZXN1bHQgPSByZXN1bHQucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgdGhpcy5jb25maWcudGhvdXNhbmRzKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY29uZmlnLnByZWNpc2lvbiAmJiB0aGlzLmNvbmZpZy5kZWNpbWFscykge1xuICAgICAgaWYgKHRoaXMuY29uZmlnLmFsd2F5c0Rpc3BsYXlEZWNpbWFscyAmJiB0aGlzLnNob3VsZEFkZERlZmF1bHREZWNpbWFscyhkZWNpbWFscykpIHtcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0ICsgdGhpcy5jb25maWcuZGVjaW1hbHMgKyB0aGlzLmRlZmF1bHREZWNpbWFscyhkZWNpbWFscywgdGhpcy5jb25maWcucHJlY2lzaW9uKTtcbiAgICAgIH0gZWxzZSBpZiAoZGVjaW1hbHMpIHtcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0ICsgdGhpcy5jb25maWcuZGVjaW1hbHMgKyBkZWNpbWFscztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGlzTmVnYXRpdmUgJiYgcmVzdWx0ICE9PSAnMCcgPyAnLScgKyByZXN1bHQgOiByZXN1bHQ7XG4gIH1cblxuICBzZXRFZGl0TW9kZSgpIHtcbiAgICBpZiAodGhpcy5jb25maWcudGhvdXNhbmRzKSB7XG4gICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgICAgIGNvbnN0IFt3aG9sZSwgZGVjaW1hbHNdID0gY3VycmVudFZhbHVlLnNwbGl0KHRoaXMuY29uZmlnLmRlY2ltYWxzKTtcbiAgICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cCgnXFxcXCcgKyB0aGlzLmNvbmZpZy50aG91c2FuZHMsICdnJyk7XG4gICAgICBsZXQgcmVzdWx0ID0gd2hvbGUucmVwbGFjZShyZWdleCwgJycpO1xuICAgICAgaWYgKGRlY2ltYWxzICYmIHRoaXMuY29uZmlnLnByZWNpc2lvbiAmJiB0aGlzLmNvbmZpZy5kZWNpbWFscykge1xuICAgICAgICByZXN1bHQgPSByZXN1bHQgKyB0aGlzLmNvbmZpZy5kZWNpbWFscyArIGRlY2ltYWxzO1xuICAgICAgfVxuICAgICAgdGhpcy5kaXNwbGF5VmFsdWUgPSByZXN1bHQ7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gIGtleURvd25IYW5kbGVyKGU6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgICBpZiAoXG4gICAgICAvLyBBbGxvdyBzcGVjaWFsIGtleXNcbiAgICAgIFtcbiAgICAgICAga2V5Ym9hcmQuTEVGVF9BUlJPVyxcbiAgICAgICAga2V5Ym9hcmQuUklHSFRfQVJST1csXG4gICAgICAgIGtleWJvYXJkLkJBQ0tTUEFDRSxcbiAgICAgICAga2V5Ym9hcmQuREVMRVRFLFxuICAgICAgICBrZXlib2FyZC5FTkQsXG4gICAgICAgIGtleWJvYXJkLkVOVEVSLFxuICAgICAgICBrZXlib2FyZC5FU0NBUEUsXG4gICAgICAgIGtleWJvYXJkLkhPTUUsXG4gICAgICAgIGtleWJvYXJkLlRBQixcbiAgICAgIF0uaW5kZXhPZihlLmtleUNvZGUpICE9PSAtMVxuICAgICAgLy8gQWxsb3cgQ3RybCtrZXkgYWN0aW9uc1xuICAgICAgfHwgKFxuICAgICAgICBbXG4gICAgICAgICAga2V5Ym9hcmQuQSxcbiAgICAgICAgICBrZXlib2FyZC5DLFxuICAgICAgICAgIGtleWJvYXJkLlIsXG4gICAgICAgICAga2V5Ym9hcmQuVixcbiAgICAgICAgICBrZXlib2FyZC5YLFxuICAgICAgICBdLmluZGV4T2YoZS5rZXlDb2RlKSAhPT0gLTFcbiAgICAgICAgJiYgKGUuY3RybEtleSA9PT0gdHJ1ZSB8fCBlLm1ldGFLZXkgPT09IHRydWUpXG4gICAgICApXG4gICAgKSB7XG4gICAgICByZXR1cm47ICAvLyBsZXQgaXQgaGFwcGVuLCBkb24ndCBkbyBhbnl0aGluZ1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBtYXhMZW5ndGhcbiAgICBjb25zdCBhYnNvbHV0ZVZhbHVlID0gY3VycmVudFZhbHVlLnRvU3RyaW5nKCkucmVwbGFjZSgvXi0vLCAnJyk7XG4gICAgY29uc3QgW3dob2xlc10gPSBhYnNvbHV0ZVZhbHVlLnRvU3RyaW5nKCkuc3BsaXQodGhpcy5jb25maWcuZGVjaW1hbHMpO1xuICAgIGlmIChcbiAgICAgIHRoaXMuY29uZmlnLm1heExlbmd0aCAhPT0gdW5kZWZpbmVkXG4gICAgICAmJiAoXG4gICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0IDwgd2hvbGVzLmxlbmd0aFxuICAgICAgICAmJiB3aG9sZXMubGVuZ3RoID49IHRoaXMuY29uZmlnLm1heExlbmd0aFxuICAgICAgICAmJiBba2V5Ym9hcmQuREFTSCwga2V5Ym9hcmQuTlVNUEFEX01JTlVTXS5pbmRleE9mKGUua2V5Q29kZSkgPT09IC0xXG4gICAgICApXG4gICAgICAmJiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25FbmQgLSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCA9PT0gMFxuICAgICkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBtaW51c1xuICAgIGlmIChcbiAgICAgIFtrZXlib2FyZC5EQVNILCBrZXlib2FyZC5OVU1QQURfTUlOVVNdLmluZGV4T2YoZS5rZXlDb2RlKSAhPT0gLTFcbiAgICAgICYmIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0ID09PSAwXG4gICAgICAmJiAoKHRoaXMuY29uZmlnLm1pbiAhPT0gdW5kZWZpbmVkICYmIHRoaXMuY29uZmlnLm1pbiA8IDApIHx8IHRoaXMuY29uZmlnLm1pbiA9PT0gdW5kZWZpbmVkKVxuICAgICAgJiYgY3VycmVudFZhbHVlLmluZGV4T2YoJy0nKSA9PT0gLTFcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgc2VwYXJhdG9yXG4gICAgaWYgKFxuICAgICAgdGhpcy5jb25maWcucHJlY2lzaW9uID4gMFxuICAgICAgJiYgW2tleWJvYXJkLkNPTU1BLCBrZXlib2FyZC5OVU1QQURfUEVSSU9ELCAxOTBdLmluZGV4T2YoZS5rZXlDb2RlKSAhPT0gLTFcbiAgICAgICYmIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0ID4gMFxuICAgICAgJiYgY3VycmVudFZhbHVlLmxlbmd0aFxuICAgICAgJiYgY3VycmVudFZhbHVlLmluZGV4T2YoJy4nKSA9PT0gLTFcbiAgICAgICYmIGN1cnJlbnRWYWx1ZS5pbmRleE9mKCcsJykgPT09IC0xXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIGtleSBhZnRlciBzZXBhcmF0b3JcbiAgICBpZiAoXG4gICAgICB0aGlzLmNvbmZpZy5wcmVjaXNpb24gPiAwXG4gICAgICAmJiBjdXJyZW50VmFsdWUuaW5kZXhPZih0aGlzLmNvbmZpZy5kZWNpbWFscykgPiAtMVxuICAgICAgJiYgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPiBjdXJyZW50VmFsdWUuaW5kZXhPZih0aGlzLmNvbmZpZy5kZWNpbWFscylcbiAgICApIHtcbiAgICAgIGNvbnN0IFssIGRlY2ltYWxzXSA9IGN1cnJlbnRWYWx1ZS5zcGxpdCh0aGlzLmNvbmZpZy5kZWNpbWFscyk7XG4gICAgICBpZiAoZGVjaW1hbHMgJiYgZGVjaW1hbHMubGVuZ3RoID49IHRoaXMuY29uZmlnLnByZWNpc2lvbikge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIEVuc3VyZSB0aGF0IGl0IGlzIGEgbnVtYmVyIG9yIHN0b3AgdGhlIGtleXByZXNzXG4gICAgaWYgKFxuICAgICAgKFxuICAgICAgICAoXG4gICAgICAgICAgW1xuICAgICAgICAgICAga2V5Ym9hcmQuWkVSTyxcbiAgICAgICAgICAgIGtleWJvYXJkLk9ORSxcbiAgICAgICAgICAgIGtleWJvYXJkLlRXTyxcbiAgICAgICAgICAgIGtleWJvYXJkLlRIUkVFLFxuICAgICAgICAgICAga2V5Ym9hcmQuRk9VUixcbiAgICAgICAgICAgIGtleWJvYXJkLkZJVkUsXG4gICAgICAgICAgICBrZXlib2FyZC5TSVgsXG4gICAgICAgICAgICBrZXlib2FyZC5TRVZFTixcbiAgICAgICAgICAgIGtleWJvYXJkLkVJR0hULFxuICAgICAgICAgICAga2V5Ym9hcmQuTklORVxuICAgICAgICAgIF0uaW5kZXhPZihlLmtleUNvZGUpID09PSAtMVxuICAgICAgICAgIHx8IGUuc2hpZnRLZXlcbiAgICAgICAgKVxuICAgICAgICAmJlxuICAgICAgICBbXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX1pFUk8sXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX09ORSxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfVFdPLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9USFJFRSxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfRk9VUixcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfRklWRSxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfU0lYLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9TRVZFTixcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfRUlHSFQsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX05JTkUsXG4gICAgICAgIF0uaW5kZXhPZihlLmtleUNvZGUpID09PSAtMVxuICAgICAgKVxuICAgICAgfHwgKFxuICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCA9PT0gMFxuICAgICAgICAmJiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25FbmQgPT09IDBcbiAgICAgICAgJiYgY3VycmVudFZhbHVlLmluZGV4T2YoJy0nKSA+IC0xXG4gICAgICApXG4gICAgKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICB9XG5cbiAgLyoqXG4gICAqIHBhcnNlIHdob2xlIHBhcnQgb2YgYSBudW1iZXIgdG8gZGlzcGxheSB2YWx1ZSAoYmFzZWQgb24gZ2l2ZW4gY29uZmlnKVxuICAgKi9cbiAgcHJvdGVjdGVkIGdldFdob2xlRGlzcGxheVZhbHVlKHdob2xlOiBzdHJpbmcgfCBudW1iZXIpOiBzdHJpbmcge1xuICAgIGNvbnN0IHBhcnNlZFdob2xlOiBudW1iZXIgPSBNYXRoLmFicyh0eXBlb2Ygd2hvbGUgIT09ICdudW1iZXInID8gcGFyc2VJbnQod2hvbGUsIDEwKSA6IHdob2xlKTtcbiAgICByZXR1cm4gdGhpcy5jb25maWcubm9TY2llbnRpZmljTm90YXRpb25cbiAgICAgID8gcGFyc2VkV2hvbGUudG9Mb2NhbGVTdHJpbmcoJ2Z1bGx3aWRlJywge3VzZUdyb3VwaW5nOiBmYWxzZX0pXG4gICAgICA6IHBhcnNlZFdob2xlLnRvU3RyaW5nKCk7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IHdob2xlIGFuZCBkZWNpbWFsIHBhcnQgb2YgYSBudW1iZXJcbiAgICogdHlwZSBvZiByZXR1cm4gdmFsdWVzIG1heSB2YXJ5LCBpdCBpcyBpbnRlbnRpb25hbFxuICAgKiB0aGUgcmV0dXJuZWQgYXJyYXkgc2hvdWxkIGhhdmUgc2l6ZSBvZiAxKG9ubHkgd2hvbGUgbnVtYmVyKSBvciAyKHdob2xlIGFuZCBkZWNpbWFsKVxuICAgKi9cbiAgcHJvdGVjdGVkIGdldFdob2xlQW5kRGVjaW1hbFBhcnRzKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIpOiBBcnJheTxudW1iZXIgfCBzdHJpbmc+IHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgaWYgKHRoaXMuY29uZmlnLm5vU2NpZW50aWZpY05vdGF0aW9uICYmICh2YWx1ZSA+IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSIHx8IHZhbHVlIDwgTnVtYmVyLk1JTl9TQUZFX0lOVEVHRVIpKSB7XG4gICAgICAgIGNvbnN0IGRlY2ltYWxzID0gdmFsdWUgJSAxO1xuICAgICAgICByZXR1cm4gW01hdGguZmxvb3IodmFsdWUpLCBkZWNpbWFscyAhPT0gMCA/ICcnICsgZGVjaW1hbHMgOiB1bmRlZmluZWRdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCkuc3BsaXQoJy4nKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCkuc3BsaXQodGhpcy5jb25maWcuZGVjaW1hbHMpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBkZWZhdWx0RGVjaW1hbHModmFsdWU6IHN0cmluZyB8IG51bWJlciA9ICcnLCBwcmVjaXNpb246IG51bWJlciA9IDApOiBzdHJpbmcge1xuICAgIGxldCByZXN1bHQgPSAnJyArIHZhbHVlO1xuICAgIHdoaWxlIChyZXN1bHQubGVuZ3RoIDwgcHJlY2lzaW9uKSB7XG4gICAgICByZXN1bHQgKz0gJzAnO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJvdGVjdGVkIHNob3VsZEFkZERlZmF1bHREZWNpbWFscyhkZWNpbWFsczogc3RyaW5nIHwgbnVtYmVyIHwgdW5kZWZpbmVkKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICFkZWNpbWFscyB8fCAoJycgKyBkZWNpbWFscykubGVuZ3RoICE9PSB0aGlzLmNvbmZpZy5wcmVjaXNpb247XG4gIH1cblxuICBpc0NvbmZpZ0VxdWFsKGNvbmZpZzE/OiBOdW1lcmljQ29uZmlnLCBjb25maWcyPzogTnVtZXJpY0NvbmZpZyk6IGJvb2xlYW4ge1xuICAgIGlmICgoY29uZmlnMSAmJiAhY29uZmlnMikgfHwgKCFjb25maWcxICYmIGNvbmZpZzIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIGlmICghY29uZmlnMSAmJiAhY29uZmlnMikge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIGlmIChPYmplY3Qua2V5cyhjb25maWcxKS5sZW5ndGggPT09IE9iamVjdC5rZXlzKGNvbmZpZzIpLmxlbmd0aCkge1xuICAgICAgZm9yIChjb25zdCBrZXkxIGluIGNvbmZpZzEpIHtcbiAgICAgICAgaWYgKGNvbmZpZzEuaGFzT3duUHJvcGVydHkoa2V5MSkgJiYgY29uZmlnMVtrZXkxXSAhPT0gY29uZmlnMltrZXkxXSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==