/**
 * @fileoverview added by tsickle
 * Generated from: lib/directives/numeric/numeric.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __assign, __awaiter, __generator, __read } from "tslib";
import { Directive, ElementRef, forwardRef, HostListener, Input } from '@angular/core';
import * as keyboard from '@angular/cdk/keycodes';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NumericConfigService } from './numeric-config.service';
/** @type {?} */
var CUSTOM_SELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return NumericDirective; })),
    multi: true
};
var NumericDirective = /** @class */ (function () {
    function NumericDirective(el, configService) {
        this.el = el;
        this.configService = configService;
        this.lsnNumeric = {};
        this.onChange = (/**
         * @param {?} _
         * @return {?}
         */
        function (_) {
        });
        this.onTouch = (/**
         * @return {?}
         */
        function () {
        });
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
        var value = this.removeInvalidCharacters($event.target.value);
        value = this.handleWholesLength(value);
        /** @type {?} */
        var parsedValue = this.parseValue(value);
        this.displayValue = value.replace(/[,|.]/, this.config.decimals);
        this.onChange(parsedValue);
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
        /** @type {?} */
        var parsedValue = this.parseValue(this.element.nativeElement.value);
        /** @type {?} */
        var rangeValue = this.handleRange(parsedValue);
        // correct entered value on blur to proper range value
        if (parsedValue !== rangeValue) {
            this.displayValue = rangeValue.toString().replace(/[,|.]/, this.config.decimals);
            this.onChange(rangeValue);
        }
        else if (this.config.step && !isNaN(parsedValue)) {
            // correct entered value on blur to proper step value
            /** @type {?} */
            var stepValue = this.handleStep(parsedValue);
            this.displayValue = stepValue.toString().replace(/[,|.]/, this.config.decimals);
            this.onChange(stepValue);
        }
        this.displayValue = this.prepareDisplayValue(this.element.nativeElement.value);
        if (this.onTouch) {
            // if user sets updateOn to 'blur', we have to call onTouch for it to work properly
            this.onTouch();
        }
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
        this.config = Object.assign(__assign(__assign({}, defaultConfig), this.lsnNumeric));
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
    NumericDirective.prototype.handleWholesLength = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.config.maxLength) {
            /** @type {?} */
            var negativeSign = value.toString().startsWith('-') ? '-' : '';
            /** @type {?} */
            var absoluteValue = value.toString()
                .replace(/^-/, '')
                .replace(/[,|.]/, this.config.decimals);
            if (absoluteValue.toString().includes(this.config.decimals)) {
                var _a = __read(absoluteValue.toString().split(this.config.decimals), 2), wholes = _a[0], decimals = _a[1];
                /** @type {?} */
                var properDecimals = this.removeInvalidCharacters(decimals, true);
                return negativeSign + wholes.substr(0, this.config.maxLength) + this.config.decimals + properDecimals;
            }
            return negativeSign + absoluteValue.toString().substr(0, this.config.maxLength);
        }
        return value;
    };
    /**
     * @param {?} value
     * @param {?=} allowDecimalsOnly
     * @return {?}
     */
    NumericDirective.prototype.removeInvalidCharacters = /**
     * @param {?} value
     * @param {?=} allowDecimalsOnly
     * @return {?}
     */
    function (value, allowDecimalsOnly) {
        if (allowDecimalsOnly === void 0) { allowDecimalsOnly = false; }
        return allowDecimalsOnly
            ? value.replace(/[^0-9]/g, '')
            : value.replace(/[^\-0-9,.]/g, '');
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
    NumericDirective.prototype.handleStep = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return Math.round(value / this.config.step) * this.config.step;
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
        /** @type {?} */
        var absoluteValue = currentValue.toString().replace(/^-/, '');
        var _a = __read(absoluteValue.toString().split(this.config.decimals), 1), wholes = _a[0];
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
            var _b = __read(currentValue.split(this.config.decimals), 2), decimals = _b[1];
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
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    NumericDirective.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.element.nativeElement.disabled = isDisabled;
    };
    NumericDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[lsnNumeric]',
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
        focusHandler: [{ type: HostListener, args: ['focus', [],] }],
        blurHandler: [{ type: HostListener, args: ['blur', [],] }],
        keyDownHandler: [{ type: HostListener, args: ['keydown', ['$event'],] }]
    };
    return NumericDirective;
}());
export { NumericDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtZXJpYy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbHNub3ZhL2FuZ3VsYXJtb2R1bGVzLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvbnVtZXJpYy9udW1lcmljLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUNoRyxPQUFPLEtBQUssUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQ2xELE9BQU8sRUFBdUIsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RSxPQUFPLEVBQWdCLG9CQUFvQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7O0lBRXZFLDRCQUE0QixHQUFRO0lBQ3hDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVU7OztJQUFDLGNBQU0sT0FBQSxnQkFBZ0IsRUFBaEIsQ0FBZ0IsRUFBQztJQUMvQyxLQUFLLEVBQUUsSUFBSTtDQUNaO0FBRUQ7SUFhRSwwQkFDVSxFQUFjLEVBQ2QsYUFBbUM7UUFEbkMsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUNkLGtCQUFhLEdBQWIsYUFBYSxDQUFzQjtRQVZwQyxlQUFVLEdBQWtCLEVBQUUsQ0FBQztRQUdqQyxhQUFROzs7O1FBQUcsVUFBQyxDQUFNO1FBQ3pCLENBQUMsRUFBQztRQUNLLFlBQU87OztRQUFHO1FBQ2pCLENBQUMsRUFBQztRQU1BLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQixDQUFDOzs7O0lBRUQsc0NBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25CLENBQUM7Ozs7O0lBR0QsdUNBQVk7Ozs7SUFEWixVQUNhLE1BQU07UUFDakIsSUFBSSxNQUFNLENBQUMsTUFB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QUFnQzs7SUFDaEMsb0NBQ0U7O0lBQ0YsbUNBQ0U7Ozs7O0lBR0EsOEJBQXNCOzs7OztJQUN0Qix5Q0FBMkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgZm9yd2FyZFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25DaGFuZ2VzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIGtleWJvYXJkIGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtOdW1lcmljQ29uZmlnLCBOdW1lcmljQ29uZmlnU2VydmljZX0gZnJvbSAnLi9udW1lcmljLWNvbmZpZy5zZXJ2aWNlJztcblxuY29uc3QgQ1VTVE9NX1NFTEVDVF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTnVtZXJpY0RpcmVjdGl2ZSksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbHNuTnVtZXJpY10nLFxuICBwcm92aWRlcnM6IFtDVVNUT01fU0VMRUNUX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBOdW1lcmljRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzLCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIEBJbnB1dCgpIGxzbk51bWVyaWM6IE51bWVyaWNDb25maWcgPSB7fTtcbiAgZWxlbWVudDogRWxlbWVudFJlZjtcbiAgcHJvdGVjdGVkIGNvbmZpZzogTnVtZXJpY0NvbmZpZztcbiAgcHVibGljIG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge1xuICB9O1xuICBwdWJsaWMgb25Ub3VjaCA9ICgpID0+IHtcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgY29uZmlnU2VydmljZTogTnVtZXJpY0NvbmZpZ1NlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZWw7XG4gICAgdGhpcy5zZXRDb25maWcoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMuc2V0Q29uZmlnKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdpbnB1dCcsIFsnJGV2ZW50J10pXG4gIGlucHV0SGFuZGxlcigkZXZlbnQpIHtcbiAgICBpZiAoJGV2ZW50LnRhcmdldC52YWx1ZSA9PT0gJy0nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCB2YWx1ZSA9IHRoaXMucmVtb3ZlSW52YWxpZENoYXJhY3RlcnMoJGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgdmFsdWUgPSB0aGlzLmhhbmRsZVdob2xlc0xlbmd0aCh2YWx1ZSk7XG4gICAgY29uc3QgcGFyc2VkVmFsdWUgPSB0aGlzLnBhcnNlVmFsdWUodmFsdWUpO1xuICAgIHRoaXMuZGlzcGxheVZhbHVlID0gdmFsdWUucmVwbGFjZSgvWyx8Ll0vLCB0aGlzLmNvbmZpZy5kZWNpbWFscyk7XG4gICAgdGhpcy5vbkNoYW5nZShwYXJzZWRWYWx1ZSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdmb2N1cycsIFtdKVxuICBmb2N1c0hhbmRsZXIoKSB7XG4gICAgdGhpcy5zZXRFZGl0TW9kZSgpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignYmx1cicsIFtdKVxuICBibHVySGFuZGxlcigpIHtcbiAgICBjb25zdCBwYXJzZWRWYWx1ZTogbnVtYmVyID0gdGhpcy5wYXJzZVZhbHVlKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnZhbHVlKTtcbiAgICBjb25zdCByYW5nZVZhbHVlID0gdGhpcy5oYW5kbGVSYW5nZShwYXJzZWRWYWx1ZSk7XG4gICAgLy8gY29ycmVjdCBlbnRlcmVkIHZhbHVlIG9uIGJsdXIgdG8gcHJvcGVyIHJhbmdlIHZhbHVlXG4gICAgaWYgKHBhcnNlZFZhbHVlICE9PSByYW5nZVZhbHVlKSB7XG4gICAgICB0aGlzLmRpc3BsYXlWYWx1ZSA9IHJhbmdlVmFsdWUudG9TdHJpbmcoKS5yZXBsYWNlKC9bLHwuXS8sIHRoaXMuY29uZmlnLmRlY2ltYWxzKTtcbiAgICAgIHRoaXMub25DaGFuZ2UocmFuZ2VWYWx1ZSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNvbmZpZy5zdGVwICYmICFpc05hTihwYXJzZWRWYWx1ZSkpIHtcbiAgICAgIC8vIGNvcnJlY3QgZW50ZXJlZCB2YWx1ZSBvbiBibHVyIHRvIHByb3BlciBzdGVwIHZhbHVlXG4gICAgICBjb25zdCBzdGVwVmFsdWUgPSB0aGlzLmhhbmRsZVN0ZXAocGFyc2VkVmFsdWUpO1xuICAgICAgdGhpcy5kaXNwbGF5VmFsdWUgPSBzdGVwVmFsdWUudG9TdHJpbmcoKS5yZXBsYWNlKC9bLHwuXS8sIHRoaXMuY29uZmlnLmRlY2ltYWxzKTtcbiAgICAgIHRoaXMub25DaGFuZ2Uoc3RlcFZhbHVlKTtcbiAgICB9XG4gICAgdGhpcy5kaXNwbGF5VmFsdWUgPSB0aGlzLnByZXBhcmVEaXNwbGF5VmFsdWUodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWUpO1xuICAgIGlmICh0aGlzLm9uVG91Y2gpIHtcbiAgICAgIC8vIGlmIHVzZXIgc2V0cyB1cGRhdGVPbiB0byAnYmx1cicsIHdlIGhhdmUgdG8gY2FsbCBvblRvdWNoIGZvciBpdCB0byB3b3JrIHByb3Blcmx5XG4gICAgICB0aGlzLm9uVG91Y2goKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgd3JpdGVWYWx1ZShtb2RlbFZhbHVlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBwYXJzZWRWYWx1ZSA9IHRoaXMucGFyc2VWYWx1ZShtb2RlbFZhbHVlKTtcbiAgICB0aGlzLmRpc3BsYXlWYWx1ZSA9IHRoaXMucHJlcGFyZURpc3BsYXlWYWx1ZShwYXJzZWRWYWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2ggPSBmbjtcbiAgfVxuXG4gIGdldCBkaXNwbGF5VmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnZhbHVlO1xuICB9XG5cbiAgc2V0IGRpc3BsYXlWYWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBzZXRDb25maWcoKSB7XG4gICAgY29uc3QgZGVmYXVsdENvbmZpZyA9IHRoaXMubHNuTnVtZXJpYy5jb25maWdcbiAgICAgID8gdGhpcy5jb25maWdTZXJ2aWNlLmdldEN1c3RvbUNvbmZpZyh0aGlzLmxzbk51bWVyaWMuY29uZmlnKVxuICAgICAgOiB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0RGVmYXVsdENvbmZpZygpO1xuICAgIHRoaXMuY29uZmlnID0gT2JqZWN0LmFzc2lnbih7Li4uZGVmYXVsdENvbmZpZywgLi4udGhpcy5sc25OdW1lcmljfSk7XG4gICAgaWYgKHRoaXMuY29uZmlnLmRlY2ltYWxzICYmIHRoaXMuY29uZmlnLnRob3VzYW5kcyAmJiB0aGlzLmNvbmZpZy5kZWNpbWFscyA9PT0gdGhpcy5jb25maWcudGhvdXNhbmRzKSB7XG4gICAgICB0aGlzLmNvbmZpZy50aG91c2FuZHMgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGlmICh0aGlzLmNvbmZpZy5tYXggIT09IHVuZGVmaW5lZCAmJiB0aGlzLmNvbmZpZy5tYXhMZW5ndGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc29sZS53YXJuKCdbbHNuTnVtZXJpY10gU2V0dGluZyBgbWF4TGVuZ3RoYCBtYWtlcyBgbWF4YCByZWR1bmRhbnQuJyk7XG4gICAgfVxuICB9XG5cbiAgcGFyc2VWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICghdmFsdWUgJiYgdmFsdWUgIT09IDApIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGNvbnN0IG5ld1ZhbHVlID0gdmFsdWUudG9TdHJpbmcoKS5yZXBsYWNlKC9bLHwuXS8sICcuJyk7XG4gICAgY29uc3QgcGFyc2VkVmFsdWUgPSB0aGlzLmNvbmZpZy5wcmVjaXNpb24gPiAwXG4gICAgICA/IHBhcnNlRmxvYXQobmV3VmFsdWUpXG4gICAgICA6IHBhcnNlSW50KG5ld1ZhbHVlLCAxMCk7XG4gICAgcmV0dXJuIGlzTmFOKHBhcnNlZFZhbHVlKSA/IHVuZGVmaW5lZCA6IHBhcnNlZFZhbHVlO1xuICB9XG5cbiAgaGFuZGxlV2hvbGVzTGVuZ3RoKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMuY29uZmlnLm1heExlbmd0aCkge1xuICAgICAgY29uc3QgbmVnYXRpdmVTaWduID0gdmFsdWUudG9TdHJpbmcoKS5zdGFydHNXaXRoKCctJykgPyAnLScgOiAnJztcbiAgICAgIGNvbnN0IGFic29sdXRlVmFsdWUgPSB2YWx1ZS50b1N0cmluZygpXG4gICAgICAgIC5yZXBsYWNlKC9eLS8sICcnKVxuICAgICAgICAucmVwbGFjZSgvWyx8Ll0vLCB0aGlzLmNvbmZpZy5kZWNpbWFscyk7XG4gICAgICBpZiAoYWJzb2x1dGVWYWx1ZS50b1N0cmluZygpLmluY2x1ZGVzKHRoaXMuY29uZmlnLmRlY2ltYWxzKSkge1xuICAgICAgICBjb25zdCBbd2hvbGVzLCBkZWNpbWFsc10gPSBhYnNvbHV0ZVZhbHVlLnRvU3RyaW5nKCkuc3BsaXQodGhpcy5jb25maWcuZGVjaW1hbHMpO1xuICAgICAgICBjb25zdCBwcm9wZXJEZWNpbWFscyA9IHRoaXMucmVtb3ZlSW52YWxpZENoYXJhY3RlcnMoZGVjaW1hbHMsIHRydWUpO1xuICAgICAgICByZXR1cm4gbmVnYXRpdmVTaWduICsgd2hvbGVzLnN1YnN0cigwLCB0aGlzLmNvbmZpZy5tYXhMZW5ndGgpICsgdGhpcy5jb25maWcuZGVjaW1hbHMgKyBwcm9wZXJEZWNpbWFscztcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZWdhdGl2ZVNpZ24gKyBhYnNvbHV0ZVZhbHVlLnRvU3RyaW5nKCkuc3Vic3RyKDAsIHRoaXMuY29uZmlnLm1heExlbmd0aCk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHJlbW92ZUludmFsaWRDaGFyYWN0ZXJzKHZhbHVlLCBhbGxvd0RlY2ltYWxzT25seSA9IGZhbHNlKSB7XG4gICAgcmV0dXJuIGFsbG93RGVjaW1hbHNPbmx5XG4gICAgICA/IHZhbHVlLnJlcGxhY2UoL1teMC05XS9nLCAnJylcbiAgICAgIDogdmFsdWUucmVwbGFjZSgvW15cXC0wLTksLl0vZywgJycpO1xuICB9XG5cbiAgaGFuZGxlUmFuZ2UodmFsdWUpIHtcbiAgICBpZiAoIXRoaXMuY29uZmlnLm1heExlbmd0aCAmJiB0aGlzLmNvbmZpZy5tYXggIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSA+IHRoaXMuY29uZmlnLm1heCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLm1heDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY29uZmlnLm1pbiAhPT0gdW5kZWZpbmVkICYmIHZhbHVlIDwgdGhpcy5jb25maWcubWluKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25maWcubWluO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBoYW5kbGVTdGVwKHZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlIC8gdGhpcy5jb25maWcuc3RlcCkgKiB0aGlzLmNvbmZpZy5zdGVwO1xuICB9XG5cbiAgcHJlcGFyZURpc3BsYXlWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICghdmFsdWUgJiYgdmFsdWUgIT09IDApIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgY29uc3QgW3dob2xlLCBkZWNpbWFsc10gPSB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInXG4gICAgICA/IHZhbHVlLnRvU3RyaW5nKCkuc3BsaXQoJy4nKVxuICAgICAgOiB2YWx1ZS50b1N0cmluZygpLnNwbGl0KHRoaXMuY29uZmlnLmRlY2ltYWxzKTtcbiAgICBjb25zdCBpc05lZ2F0aXZlID0gd2hvbGVbMF0gPT09ICctJztcbiAgICBsZXQgcmVzdWx0ID0gd2hvbGUgPT09ICctJyB8fCAhd2hvbGVcbiAgICAgID8gJzAnXG4gICAgICA6IE1hdGguYWJzKHBhcnNlSW50KHdob2xlLCAxMCkpLnRvU3RyaW5nKCk7XG4gICAgaWYgKHRoaXMuY29uZmlnLnRob3VzYW5kcykge1xuICAgICAgcmVzdWx0ID0gcmVzdWx0LnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csIHRoaXMuY29uZmlnLnRob3VzYW5kcyk7XG4gICAgfVxuICAgIGlmIChkZWNpbWFscyAmJiB0aGlzLmNvbmZpZy5wcmVjaXNpb24gJiYgdGhpcy5jb25maWcuZGVjaW1hbHMpIHtcbiAgICAgIHJlc3VsdCA9IHJlc3VsdCArIHRoaXMuY29uZmlnLmRlY2ltYWxzICsgZGVjaW1hbHM7XG4gICAgfVxuICAgIHJldHVybiBpc05lZ2F0aXZlICYmIHJlc3VsdCAhPT0gJzAnID8gJy0nICsgcmVzdWx0IDogcmVzdWx0O1xuICB9XG5cbiAgc2V0RWRpdE1vZGUoKSB7XG4gICAgaWYgKHRoaXMuY29uZmlnLnRob3VzYW5kcykge1xuICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgICBjb25zdCBbd2hvbGUsIGRlY2ltYWxzXSA9IGN1cnJlbnRWYWx1ZS5zcGxpdCh0aGlzLmNvbmZpZy5kZWNpbWFscyk7XG4gICAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoJ1xcXFwnICsgdGhpcy5jb25maWcudGhvdXNhbmRzLCAnZycpO1xuICAgICAgbGV0IHJlc3VsdCA9IHdob2xlLnJlcGxhY2UocmVnZXgsICcnKTtcbiAgICAgIGlmIChkZWNpbWFscyAmJiB0aGlzLmNvbmZpZy5wcmVjaXNpb24gJiYgdGhpcy5jb25maWcuZGVjaW1hbHMpIHtcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0ICsgdGhpcy5jb25maWcuZGVjaW1hbHMgKyBkZWNpbWFscztcbiAgICAgIH1cbiAgICAgIHRoaXMuZGlzcGxheVZhbHVlID0gcmVzdWx0O1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICBrZXlEb3duSGFuZGxlcihlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgY29uc3QgY3VycmVudFZhbHVlID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgaWYgKFxuICAgICAgLy8gQWxsb3cgc3BlY2lhbCBrZXlzXG4gICAgICBbXG4gICAgICAgIGtleWJvYXJkLkxFRlRfQVJST1csXG4gICAgICAgIGtleWJvYXJkLlJJR0hUX0FSUk9XLFxuICAgICAgICBrZXlib2FyZC5CQUNLU1BBQ0UsXG4gICAgICAgIGtleWJvYXJkLkRFTEVURSxcbiAgICAgICAga2V5Ym9hcmQuRU5ELFxuICAgICAgICBrZXlib2FyZC5FTlRFUixcbiAgICAgICAga2V5Ym9hcmQuRVNDQVBFLFxuICAgICAgICBrZXlib2FyZC5IT01FLFxuICAgICAgICBrZXlib2FyZC5UQUIsXG4gICAgICBdLmluZGV4T2YoZS5rZXlDb2RlKSAhPT0gLTFcbiAgICAgIC8vIEFsbG93IEN0cmwra2V5IGFjdGlvbnNcbiAgICAgIHx8IChcbiAgICAgICAgW1xuICAgICAgICAgIGtleWJvYXJkLkEsXG4gICAgICAgICAga2V5Ym9hcmQuQyxcbiAgICAgICAgICBrZXlib2FyZC5SLFxuICAgICAgICAgIGtleWJvYXJkLlYsXG4gICAgICAgICAga2V5Ym9hcmQuWCxcbiAgICAgICAgXS5pbmRleE9mKGUua2V5Q29kZSkgIT09IC0xXG4gICAgICAgICYmIChlLmN0cmxLZXkgPT09IHRydWUgfHwgZS5tZXRhS2V5ID09PSB0cnVlKVxuICAgICAgKVxuICAgICkge1xuICAgICAgcmV0dXJuOyAgLy8gbGV0IGl0IGhhcHBlbiwgZG9uJ3QgZG8gYW55dGhpbmdcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgbWF4TGVuZ3RoXG4gICAgY29uc3QgYWJzb2x1dGVWYWx1ZSA9IGN1cnJlbnRWYWx1ZS50b1N0cmluZygpLnJlcGxhY2UoL14tLywgJycpO1xuICAgIGNvbnN0IFt3aG9sZXNdID0gYWJzb2x1dGVWYWx1ZS50b1N0cmluZygpLnNwbGl0KHRoaXMuY29uZmlnLmRlY2ltYWxzKTtcbiAgICBpZiAoXG4gICAgICB0aGlzLmNvbmZpZy5tYXhMZW5ndGggIT09IHVuZGVmaW5lZFxuICAgICAgJiYgKFxuICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCA8IHdob2xlcy5sZW5ndGhcbiAgICAgICAgJiYgd2hvbGVzLmxlbmd0aCA+PSB0aGlzLmNvbmZpZy5tYXhMZW5ndGhcbiAgICAgICAgJiYgW2tleWJvYXJkLkRBU0gsIGtleWJvYXJkLk5VTVBBRF9NSU5VU10uaW5kZXhPZihlLmtleUNvZGUpID09PSAtMVxuICAgICAgKVxuICAgICAgJiYgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uRW5kIC0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPT09IDBcbiAgICApIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgbWludXNcbiAgICBpZiAoXG4gICAgICBba2V5Ym9hcmQuREFTSCwga2V5Ym9hcmQuTlVNUEFEX01JTlVTXS5pbmRleE9mKGUua2V5Q29kZSkgIT09IC0xXG4gICAgICAmJiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCA9PT0gMFxuICAgICAgJiYgKCh0aGlzLmNvbmZpZy5taW4gIT09IHVuZGVmaW5lZCAmJiB0aGlzLmNvbmZpZy5taW4gPCAwKSB8fCB0aGlzLmNvbmZpZy5taW4gPT09IHVuZGVmaW5lZClcbiAgICAgICYmIGN1cnJlbnRWYWx1ZS5pbmRleE9mKCctJykgPT09IC0xXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHNlcGFyYXRvclxuICAgIGlmIChcbiAgICAgIHRoaXMuY29uZmlnLnByZWNpc2lvbiA+IDBcbiAgICAgICYmIFtrZXlib2FyZC5DT01NQSwga2V5Ym9hcmQuTlVNUEFEX1BFUklPRCwgMTkwXS5pbmRleE9mKGUua2V5Q29kZSkgIT09IC0xXG4gICAgICAmJiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCA+IDBcbiAgICAgICYmIGN1cnJlbnRWYWx1ZS5sZW5ndGhcbiAgICAgICYmIGN1cnJlbnRWYWx1ZS5pbmRleE9mKCcuJykgPT09IC0xXG4gICAgICAmJiBjdXJyZW50VmFsdWUuaW5kZXhPZignLCcpID09PSAtMVxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBrZXkgYWZ0ZXIgc2VwYXJhdG9yXG4gICAgaWYgKFxuICAgICAgdGhpcy5jb25maWcucHJlY2lzaW9uID4gMFxuICAgICAgJiYgY3VycmVudFZhbHVlLmluZGV4T2YodGhpcy5jb25maWcuZGVjaW1hbHMpID4gLTFcbiAgICAgICYmIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0ID4gY3VycmVudFZhbHVlLmluZGV4T2YodGhpcy5jb25maWcuZGVjaW1hbHMpXG4gICAgKSB7XG4gICAgICBjb25zdCBbLCBkZWNpbWFsc10gPSBjdXJyZW50VmFsdWUuc3BsaXQodGhpcy5jb25maWcuZGVjaW1hbHMpO1xuICAgICAgaWYgKGRlY2ltYWxzICYmIGRlY2ltYWxzLmxlbmd0aCA+PSB0aGlzLmNvbmZpZy5wcmVjaXNpb24pIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBFbnN1cmUgdGhhdCBpdCBpcyBhIG51bWJlciBvciBzdG9wIHRoZSBrZXlwcmVzc1xuICAgIGlmIChcbiAgICAgIChcbiAgICAgICAgKFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIGtleWJvYXJkLlpFUk8sXG4gICAgICAgICAgICBrZXlib2FyZC5PTkUsXG4gICAgICAgICAgICBrZXlib2FyZC5UV08sXG4gICAgICAgICAgICBrZXlib2FyZC5USFJFRSxcbiAgICAgICAgICAgIGtleWJvYXJkLkZPVVIsXG4gICAgICAgICAgICBrZXlib2FyZC5GSVZFLFxuICAgICAgICAgICAga2V5Ym9hcmQuU0lYLFxuICAgICAgICAgICAga2V5Ym9hcmQuU0VWRU4sXG4gICAgICAgICAgICBrZXlib2FyZC5FSUdIVCxcbiAgICAgICAgICAgIGtleWJvYXJkLk5JTkVcbiAgICAgICAgICBdLmluZGV4T2YoZS5rZXlDb2RlKSA9PT0gLTFcbiAgICAgICAgICB8fCBlLnNoaWZ0S2V5XG4gICAgICAgIClcbiAgICAgICAgJiZcbiAgICAgICAgW1xuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9aRVJPLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9PTkUsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX1RXTyxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfVEhSRUUsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX0ZPVVIsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX0ZJVkUsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX1NJWCxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfU0VWRU4sXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX0VJR0hULFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9OSU5FLFxuICAgICAgICBdLmluZGV4T2YoZS5rZXlDb2RlKSA9PT0gLTFcbiAgICAgIClcbiAgICAgIHx8IChcbiAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPT09IDBcbiAgICAgICAgJiYgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uRW5kID09PSAwXG4gICAgICAgICYmIGN1cnJlbnRWYWx1ZS5pbmRleE9mKCctJykgPiAtMVxuICAgICAgKVxuICAgICkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgfVxufVxuIl19