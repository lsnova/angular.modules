/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, forwardRef, HostListener, Input } from '@angular/core';
import * as keyboard from '@angular/cdk/keycodes';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NumericConfigService } from './numeric-config.service';
/** @type {?} */
const CUSTOM_SELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NumericDirective),
    multi: true
};
export class NumericDirective {
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
        /** @type {?} */
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
}
NumericDirective.decorators = [
    { type: Directive, args: [{
                selector: '[lsnNumeric]',
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
if (false) {
    /** @type {?} */
    NumericDirective.prototype.lsnNumeric;
    /** @type {?} */
    NumericDirective.prototype.element;
    /**
     * @type {?}
     * @protected
     */
    NumericDirective.prototype.config;
    /** @type {?} */
    NumericDirective.prototype.onChange;
    /** @type {?} */
    NumericDirective.prototype.onTouch;
    /**
     * @type {?}
     * @private
     */
    NumericDirective.prototype.el;
    /**
     * @type {?}
     * @private
     */
    NumericDirective.prototype.configService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtZXJpYy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbHNub3ZhL2FuZ3VsYXJtb2R1bGVzLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvbnVtZXJpYy9udW1lcmljLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFZLE1BQU0sZUFBZSxDQUFDO0FBQ2hHLE9BQU8sS0FBSyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDbEQsT0FBTyxFQUF1QixpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZFLE9BQU8sRUFBZ0Isb0JBQW9CLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQzs7TUFFdkUsNEJBQTRCLEdBQVE7SUFDeEMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDO0lBQy9DLEtBQUssRUFBRSxJQUFJO0NBQ1o7QUFNRCxNQUFNLE9BQU8sZ0JBQWdCOzs7OztJQVMzQixZQUNVLEVBQWMsRUFDZCxhQUFtQztRQURuQyxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQ2Qsa0JBQWEsR0FBYixhQUFhLENBQXNCO1FBVnBDLGVBQVUsR0FBa0IsRUFBRSxDQUFDO1FBR2pDLGFBQVEsR0FBRyxDQUFDLENBQU0sRUFBRSxFQUFFO1FBQzdCLENBQUMsQ0FBQztRQUNLLFlBQU8sR0FBRyxHQUFHLEVBQUU7UUFDdEIsQ0FBQyxDQUFDO1FBTUEsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25CLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25CLENBQUM7Ozs7O0lBR0QsWUFBWSxDQUFDLE1BQU07UUFDakIsSUFBSSxNQUFN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QyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxZQUFZLEtBQUssQ0FBQzttQkFDN0MsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FDbEMsRUFDRDtZQUNBLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUNwQjtJQUNILENBQUM7OztZQTFSRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO2FBQzFDOzs7O1lBZGtCLFVBQVU7WUFHTixvQkFBb0I7Ozt5QkFheEMsS0FBSzsyQkFvQkwsWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQzsyQkFrQmhDLFlBQVksU0FBQyxPQUFPLEVBQUUsRUFBRTswQkFLeEIsWUFBWSxTQUFDLE1BQU0sRUFBRSxFQUFFOzZCQW1IdkIsWUFBWSxTQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7OztJQTlKbkMsc0NBQXdDOztJQUN4QyxtQ0FBb0I7Ozs7O0lBQ3BCLGtDQUFnQzs7SUFDaEMsb0NBQ0U7O0lBQ0YsbUNBQ0U7Ozs7O0lBR0EsOEJBQXNCOzs7OztJQUN0Qix5Q0FBMkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgZm9yd2FyZFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25DaGFuZ2VzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIGtleWJvYXJkIGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtOdW1lcmljQ29uZmlnLCBOdW1lcmljQ29uZmlnU2VydmljZX0gZnJvbSAnLi9udW1lcmljLWNvbmZpZy5zZXJ2aWNlJztcblxuY29uc3QgQ1VTVE9NX1NFTEVDVF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTnVtZXJpY0RpcmVjdGl2ZSksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbHNuTnVtZXJpY10nLFxuICBwcm92aWRlcnM6IFtDVVNUT01fU0VMRUNUX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBOdW1lcmljRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzLCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIEBJbnB1dCgpIGxzbk51bWVyaWM6IE51bWVyaWNDb25maWcgPSB7fTtcbiAgZWxlbWVudDogRWxlbWVudFJlZjtcbiAgcHJvdGVjdGVkIGNvbmZpZzogTnVtZXJpY0NvbmZpZztcbiAgcHVibGljIG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge1xuICB9O1xuICBwdWJsaWMgb25Ub3VjaCA9ICgpID0+IHtcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgY29uZmlnU2VydmljZTogTnVtZXJpY0NvbmZpZ1NlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZWw7XG4gICAgdGhpcy5zZXRDb25maWcoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMuc2V0Q29uZmlnKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdpbnB1dCcsIFsnJGV2ZW50J10pXG4gIGlucHV0SGFuZGxlcigkZXZlbnQpIHtcbiAgICBpZiAoJGV2ZW50LnRhcmdldC52YWx1ZSA9PT0gJy0nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCB2YWx1ZSA9IHRoaXMucmVtb3ZlSW52YWxpZENoYXJhY3RlcnMoJGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgdmFsdWUgPSB0aGlzLmhhbmRsZVdob2xlc0xlbmd0aCh2YWx1ZSk7XG4gICAgY29uc3QgcGFyc2VkVmFsdWUgPSB0aGlzLnBhcnNlVmFsdWUodmFsdWUpO1xuICAgIGNvbnN0IHJhbmdlVmFsdWUgPSB0aGlzLmhhbmRsZVJhbmdlKHBhcnNlZFZhbHVlKTtcbiAgICBpZiAocGFyc2VkVmFsdWUgPT09IHJhbmdlVmFsdWUpIHtcbiAgICAgIHRoaXMuZGlzcGxheVZhbHVlID0gdmFsdWUucmVwbGFjZSgvWyx8Ll0vLCB0aGlzLmNvbmZpZy5kZWNpbWFscyk7XG4gICAgICB0aGlzLm9uQ2hhbmdlKHBhcnNlZFZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kaXNwbGF5VmFsdWUgPSByYW5nZVZhbHVlLnRvU3RyaW5nKCkucmVwbGFjZSgvWyx8Ll0vLCB0aGlzLmNvbmZpZy5kZWNpbWFscyk7XG4gICAgICB0aGlzLm9uQ2hhbmdlKHJhbmdlVmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzJywgW10pXG4gIGZvY3VzSGFuZGxlcigpIHtcbiAgICB0aGlzLnNldEVkaXRNb2RlKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdibHVyJywgW10pXG4gIGJsdXJIYW5kbGVyKCkge1xuICAgIHRoaXMuZGlzcGxheVZhbHVlID0gdGhpcy5wcmVwYXJlRGlzcGxheVZhbHVlKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyB3cml0ZVZhbHVlKG1vZGVsVmFsdWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxldCBwYXJzZWRWYWx1ZSA9IHRoaXMucGFyc2VWYWx1ZShtb2RlbFZhbHVlKTtcbiAgICBwYXJzZWRWYWx1ZSA9IHRoaXMuaGFuZGxlUmFuZ2UocGFyc2VkVmFsdWUpO1xuICAgIHRoaXMuZGlzcGxheVZhbHVlID0gdGhpcy5wcmVwYXJlRGlzcGxheVZhbHVlKHBhcnNlZFZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaCA9IGZuO1xuICB9XG5cbiAgZ2V0IGRpc3BsYXlWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gIH1cblxuICBzZXQgZGlzcGxheVZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHNldENvbmZpZygpIHtcbiAgICBjb25zdCBkZWZhdWx0Q29uZmlnID0gdGhpcy5sc25OdW1lcmljLmNvbmZpZ1xuICAgICAgPyB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0Q3VzdG9tQ29uZmlnKHRoaXMubHNuTnVtZXJpYy5jb25maWcpXG4gICAgICA6IHRoaXMuY29uZmlnU2VydmljZS5nZXREZWZhdWx0Q29uZmlnKCk7XG4gICAgdGhpcy5jb25maWcgPSBPYmplY3QuYXNzaWduKHsuLi5kZWZhdWx0Q29uZmlnLCAuLi50aGlzLmxzbk51bWVyaWN9KTtcbiAgICBpZiAodGhpcy5jb25maWcuZGVjaW1hbHMgJiYgdGhpcy5jb25maWcudGhvdXNhbmRzICYmIHRoaXMuY29uZmlnLmRlY2ltYWxzID09PSB0aGlzLmNvbmZpZy50aG91c2FuZHMpIHtcbiAgICAgIHRoaXMuY29uZmlnLnRob3VzYW5kcyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKHRoaXMuY29uZmlnLm1heCAhPT0gdW5kZWZpbmVkICYmIHRoaXMuY29uZmlnLm1heExlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1tsc25OdW1lcmljXSBTZXR0aW5nIGBtYXhMZW5ndGhgIG1ha2VzIGBtYXhgIHJlZHVuZGFudC4nKTtcbiAgICB9XG4gIH1cblxuICBwYXJzZVZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKCF2YWx1ZSAmJiB2YWx1ZSAhPT0gMCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgY29uc3QgbmV3VmFsdWUgPSB2YWx1ZS50b1N0cmluZygpLnJlcGxhY2UoL1ssfC5dLywgJy4nKTtcbiAgICBjb25zdCBwYXJzZWRWYWx1ZSA9IHRoaXMuY29uZmlnLnByZWNpc2lvbiA+IDBcbiAgICAgID8gcGFyc2VGbG9hdChuZXdWYWx1ZSlcbiAgICAgIDogcGFyc2VJbnQobmV3VmFsdWUsIDEwKTtcbiAgICByZXR1cm4gaXNOYU4ocGFyc2VkVmFsdWUpID8gdW5kZWZpbmVkIDogcGFyc2VkVmFsdWU7XG4gIH1cblxuICBoYW5kbGVXaG9sZXNMZW5ndGgodmFsdWUpIHtcbiAgICBpZiAodGhpcy5jb25maWcubWF4TGVuZ3RoKSB7XG4gICAgICBjb25zdCBuZWdhdGl2ZVNpZ24gPSB2YWx1ZS50b1N0cmluZygpLnN0YXJ0c1dpdGgoJy0nKSA/ICctJyA6ICcnO1xuICAgICAgY29uc3QgYWJzb2x1dGVWYWx1ZSA9IHZhbHVlLnRvU3RyaW5nKClcbiAgICAgICAgLnJlcGxhY2UoL14tLywgJycpXG4gICAgICAgIC5yZXBsYWNlKC9bLHwuXS8sIHRoaXMuY29uZmlnLmRlY2ltYWxzKTtcbiAgICAgIGlmIChhYnNvbHV0ZVZhbHVlLnRvU3RyaW5nKCkuaW5jbHVkZXModGhpcy5jb25maWcuZGVjaW1hbHMpKSB7XG4gICAgICAgIGNvbnN0IFt3aG9sZXMsIGRlY2ltYWxzXSA9IGFic29sdXRlVmFsdWUudG9TdHJpbmcoKS5zcGxpdCh0aGlzLmNvbmZpZy5kZWNpbWFscyk7XG4gICAgICAgIGNvbnN0IHByb3BlckRlY2ltYWxzID0gdGhpcy5yZW1vdmVJbnZhbGlkQ2hhcmFjdGVycyhkZWNpbWFscywgdHJ1ZSk7XG4gICAgICAgIHJldHVybiBuZWdhdGl2ZVNpZ24gKyB3aG9sZXMuc3Vic3RyKDAsIHRoaXMuY29uZmlnLm1heExlbmd0aCkgKyB0aGlzLmNvbmZpZy5kZWNpbWFscyArIHByb3BlckRlY2ltYWxzO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5lZ2F0aXZlU2lnbiArIGFic29sdXRlVmFsdWUudG9TdHJpbmcoKS5zdWJzdHIoMCwgdGhpcy5jb25maWcubWF4TGVuZ3RoKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcmVtb3ZlSW52YWxpZENoYXJhY3RlcnModmFsdWUsIGFsbG93RGVjaW1hbHNPbmx5ID0gZmFsc2UpIHtcbiAgICByZXR1cm4gYWxsb3dEZWNpbWFsc09ubHlcbiAgICAgID8gdmFsdWUucmVwbGFjZSgvW14wLTldL2csICcnKVxuICAgICAgOiB2YWx1ZS5yZXBsYWNlKC9bXlxcLTAtOSwuXS9nLCAnJyk7XG4gIH1cblxuICBoYW5kbGVSYW5nZSh2YWx1ZSkge1xuICAgIGlmICghdGhpcy5jb25maWcubWF4TGVuZ3RoICYmIHRoaXMuY29uZmlnLm1heCAhPT0gdW5kZWZpbmVkICYmIHZhbHVlID4gdGhpcy5jb25maWcubWF4KSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25maWcubWF4O1xuICAgIH0gZWxzZSBpZiAodGhpcy5jb25maWcubWluICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgPCB0aGlzLmNvbmZpZy5taW4pIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5taW47XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHByZXBhcmVEaXNwbGF5VmFsdWUodmFsdWUpIHtcbiAgICBpZiAoIXZhbHVlICYmIHZhbHVlICE9PSAwKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGNvbnN0IFt3aG9sZSwgZGVjaW1hbHNdID0gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJ1xuICAgICAgPyB2YWx1ZS50b1N0cmluZygpLnNwbGl0KCcuJylcbiAgICAgIDogdmFsdWUudG9TdHJpbmcoKS5zcGxpdCh0aGlzLmNvbmZpZy5kZWNpbWFscyk7XG4gICAgY29uc3QgaXNOZWdhdGl2ZSA9IHdob2xlWzBdID09PSAnLSc7XG4gICAgbGV0IHJlc3VsdCA9IHdob2xlID09PSAnLScgfHwgIXdob2xlXG4gICAgICA/ICcwJ1xuICAgICAgOiBNYXRoLmFicyhwYXJzZUludCh3aG9sZSwgMTApKS50b1N0cmluZygpO1xuICAgIGlmICh0aGlzLmNvbmZpZy50aG91c2FuZHMpIHtcbiAgICAgIHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCB0aGlzLmNvbmZpZy50aG91c2FuZHMpO1xuICAgIH1cbiAgICBpZiAoZGVjaW1hbHMgJiYgdGhpcy5jb25maWcucHJlY2lzaW9uICYmIHRoaXMuY29uZmlnLmRlY2ltYWxzKSB7XG4gICAgICByZXN1bHQgPSByZXN1bHQgKyB0aGlzLmNvbmZpZy5kZWNpbWFscyArIGRlY2ltYWxzO1xuICAgIH1cbiAgICByZXR1cm4gaXNOZWdhdGl2ZSAmJiByZXN1bHQgIT09ICcwJyA/ICctJyArIHJlc3VsdCA6IHJlc3VsdDtcbiAgfVxuXG4gIHNldEVkaXRNb2RlKCkge1xuICAgIGlmICh0aGlzLmNvbmZpZy50aG91c2FuZHMpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnZhbHVlO1xuICAgICAgY29uc3QgW3dob2xlLCBkZWNpbWFsc10gPSBjdXJyZW50VmFsdWUuc3BsaXQodGhpcy5jb25maWcuZGVjaW1hbHMpO1xuICAgICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKCdcXFxcJyArIHRoaXMuY29uZmlnLnRob3VzYW5kcywgJ2cnKTtcbiAgICAgIGxldCByZXN1bHQgPSB3aG9sZS5yZXBsYWNlKHJlZ2V4LCAnJyk7XG4gICAgICBpZiAoZGVjaW1hbHMgJiYgdGhpcy5jb25maWcucHJlY2lzaW9uICYmIHRoaXMuY29uZmlnLmRlY2ltYWxzKSB7XG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdCArIHRoaXMuY29uZmlnLmRlY2ltYWxzICsgZGVjaW1hbHM7XG4gICAgICB9XG4gICAgICB0aGlzLmRpc3BsYXlWYWx1ZSA9IHJlc3VsdDtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAga2V5RG93bkhhbmRsZXIoZTogS2V5Ym9hcmRFdmVudCkge1xuICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnZhbHVlO1xuICAgIGlmIChcbiAgICAgIC8vIEFsbG93IHNwZWNpYWwga2V5c1xuICAgICAgW1xuICAgICAgICBrZXlib2FyZC5MRUZUX0FSUk9XLFxuICAgICAgICBrZXlib2FyZC5SSUdIVF9BUlJPVyxcbiAgICAgICAga2V5Ym9hcmQuQkFDS1NQQUNFLFxuICAgICAgICBrZXlib2FyZC5ERUxFVEUsXG4gICAgICAgIGtleWJvYXJkLkVORCxcbiAgICAgICAga2V5Ym9hcmQuRU5URVIsXG4gICAgICAgIGtleWJvYXJkLkVTQ0FQRSxcbiAgICAgICAga2V5Ym9hcmQuSE9NRSxcbiAgICAgICAga2V5Ym9hcmQuVEFCLFxuICAgICAgXS5pbmRleE9mKGUua2V5Q29kZSkgIT09IC0xXG4gICAgICAvLyBBbGxvdyBDdHJsK2tleSBhY3Rpb25zXG4gICAgICB8fCAoXG4gICAgICAgIFtcbiAgICAgICAgICBrZXlib2FyZC5BLFxuICAgICAgICAgIGtleWJvYXJkLkMsXG4gICAgICAgICAga2V5Ym9hcmQuUixcbiAgICAgICAgICBrZXlib2FyZC5WLFxuICAgICAgICAgIGtleWJvYXJkLlgsXG4gICAgICAgIF0uaW5kZXhPZihlLmtleUNvZGUpICE9PSAtMVxuICAgICAgICAmJiAoZS5jdHJsS2V5ID09PSB0cnVlIHx8IGUubWV0YUtleSA9PT0gdHJ1ZSlcbiAgICAgIClcbiAgICApIHtcbiAgICAgIHJldHVybjsgIC8vIGxldCBpdCBoYXBwZW4sIGRvbid0IGRvIGFueXRoaW5nXG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIG1heExlbmd0aFxuICAgIGNvbnN0IGFic29sdXRlVmFsdWUgPSBjdXJyZW50VmFsdWUudG9TdHJpbmcoKS5yZXBsYWNlKC9eLS8sICcnKTtcbiAgICBjb25zdCBbd2hvbGVzXSA9IGFic29sdXRlVmFsdWUudG9TdHJpbmcoKS5zcGxpdCh0aGlzLmNvbmZpZy5kZWNpbWFscyk7XG4gICAgaWYgKFxuICAgICAgdGhpcy5jb25maWcubWF4TGVuZ3RoICE9PSB1bmRlZmluZWRcbiAgICAgICYmIChcbiAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPCB3aG9sZXMubGVuZ3RoXG4gICAgICAgICYmIHdob2xlcy5sZW5ndGggPj0gdGhpcy5jb25maWcubWF4TGVuZ3RoXG4gICAgICAgICYmIFtrZXlib2FyZC5EQVNILCBrZXlib2FyZC5OVU1QQURfTUlOVVNdLmluZGV4T2YoZS5rZXlDb2RlKSA9PT0gLTFcbiAgICAgIClcbiAgICAgICYmIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvbkVuZCAtIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0ID09PSAwXG4gICAgKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIG1pbnVzXG4gICAgaWYgKFxuICAgICAgW2tleWJvYXJkLkRBU0gsIGtleWJvYXJkLk5VTVBBRF9NSU5VU10uaW5kZXhPZihlLmtleUNvZGUpICE9PSAtMVxuICAgICAgJiYgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPT09IDBcbiAgICAgICYmICgodGhpcy5jb25maWcubWluICE9PSB1bmRlZmluZWQgJiYgdGhpcy5jb25maWcubWluIDwgMCkgfHwgdGhpcy5jb25maWcubWluID09PSB1bmRlZmluZWQpXG4gICAgICAmJiBjdXJyZW50VmFsdWUuaW5kZXhPZignLScpID09PSAtMVxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBzZXBhcmF0b3JcbiAgICBpZiAoXG4gICAgICB0aGlzLmNvbmZpZy5wcmVjaXNpb24gPiAwXG4gICAgICAmJiBba2V5Ym9hcmQuQ09NTUEsIGtleWJvYXJkLk5VTVBBRF9QRVJJT0QsIDE5MF0uaW5kZXhPZihlLmtleUNvZGUpICE9PSAtMVxuICAgICAgJiYgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPiAwXG4gICAgICAmJiBjdXJyZW50VmFsdWUubGVuZ3RoXG4gICAgICAmJiBjdXJyZW50VmFsdWUuaW5kZXhPZignLicpID09PSAtMVxuICAgICAgJiYgY3VycmVudFZhbHVlLmluZGV4T2YoJywnKSA9PT0gLTFcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUga2V5IGFmdGVyIHNlcGFyYXRvclxuICAgIGlmIChcbiAgICAgIHRoaXMuY29uZmlnLnByZWNpc2lvbiA+IDBcbiAgICAgICYmIGN1cnJlbnRWYWx1ZS5pbmRleE9mKHRoaXMuY29uZmlnLmRlY2ltYWxzKSA+IC0xXG4gICAgICAmJiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCA+IGN1cnJlbnRWYWx1ZS5pbmRleE9mKHRoaXMuY29uZmlnLmRlY2ltYWxzKVxuICAgICkge1xuICAgICAgY29uc3QgWywgZGVjaW1hbHNdID0gY3VycmVudFZhbHVlLnNwbGl0KHRoaXMuY29uZmlnLmRlY2ltYWxzKTtcbiAgICAgIGlmIChkZWNpbWFscyAmJiBkZWNpbWFscy5sZW5ndGggPj0gdGhpcy5jb25maWcucHJlY2lzaW9uKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gRW5zdXJlIHRoYXQgaXQgaXMgYSBudW1iZXIgb3Igc3RvcCB0aGUga2V5cHJlc3NcbiAgICBpZiAoXG4gICAgICAoXG4gICAgICAgIChcbiAgICAgICAgICBbXG4gICAgICAgICAgICBrZXlib2FyZC5aRVJPLFxuICAgICAgICAgICAga2V5Ym9hcmQuT05FLFxuICAgICAgICAgICAga2V5Ym9hcmQuVFdPLFxuICAgICAgICAgICAga2V5Ym9hcmQuVEhSRUUsXG4gICAgICAgICAgICBrZXlib2FyZC5GT1VSLFxuICAgICAgICAgICAga2V5Ym9hcmQuRklWRSxcbiAgICAgICAgICAgIGtleWJvYXJkLlNJWCxcbiAgICAgICAgICAgIGtleWJvYXJkLlNFVkVOLFxuICAgICAgICAgICAga2V5Ym9hcmQuRUlHSFQsXG4gICAgICAgICAgICBrZXlib2FyZC5OSU5FXG4gICAgICAgICAgXS5pbmRleE9mKGUua2V5Q29kZSkgPT09IC0xXG4gICAgICAgICAgfHwgZS5zaGlmdEtleVxuICAgICAgICApXG4gICAgICAgICYmXG4gICAgICAgIFtcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfWkVSTyxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfT05FLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9UV08sXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX1RIUkVFLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9GT1VSLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9GSVZFLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9TSVgsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX1NFVkVOLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9FSUdIVCxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfTklORSxcbiAgICAgICAgXS5pbmRleE9mKGUua2V5Q29kZSkgPT09IC0xXG4gICAgICApXG4gICAgICB8fCAoXG4gICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0ID09PSAwXG4gICAgICAgICYmIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvbkVuZCA9PT0gMFxuICAgICAgICAmJiBjdXJyZW50VmFsdWUuaW5kZXhPZignLScpID4gLTFcbiAgICAgIClcbiAgICApIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==