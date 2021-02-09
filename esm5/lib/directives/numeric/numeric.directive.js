/**
 * @fileoverview added by tsickle
 * Generated from: lib/directives/numeric/numeric.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __assign, __awaiter, __generator, __read } from "tslib";
import { Directive, ElementRef, EventEmitter, forwardRef, HostListener, Input, Output } from '@angular/core';
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
/** @enum {number} */
var NumericMessage = {
    ADDITIONAL_DECIMAL_SEPARATOR: 0,
};
export { NumericMessage };
NumericMessage[NumericMessage.ADDITIONAL_DECIMAL_SEPARATOR] = 'ADDITIONAL_DECIMAL_SEPARATOR';
var NumericDirective = /** @class */ (function () {
    function NumericDirective(el, configService) {
        this.el = el;
        this.configService = configService;
        this.lsnNumeric = {};
        this.lsnNumericMessages = new EventEmitter();
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
        return this.cleanUp(allowDecimalsOnly
            ? value.replace(/[^\-0-9]/g, '')
            : value.replace(/[^\-0-9,.]/g, ''));
    };
    /**
     * @private
     * @param {?} input
     * @return {?}
     */
    NumericDirective.prototype.cleanUp = /**
     * @private
     * @param {?} input
     * @return {?}
     */
    function (input) {
        // no precision at all
        /** @type {?} */
        var value = input.replace(/[,|.]/g, '.');
        /** @type {?} */
        var firstIndex = typeof value === 'string' || value instanceof String
            ? value.indexOf('.')
            : -1;
        if (firstIndex === -1) {
            return value;
        }
        // remove everything after second comma
        /** @type {?} */
        var secondIndex = value.substr(firstIndex + 1).indexOf('.');
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
        var _a = __read(this.getWholeAndDecimalParts(value), 2), whole = _a[0], decimals = _a[1];
        /** @type {?} */
        var isNegative = whole[0] === '-' || whole < 0;
        /** @type {?} */
        var result = whole === '-' || !whole
            ? '0'
            : this.getWholeDisplayValue(whole);
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
    /**
     * parse whole part of a number to display value (based on given config)
     */
    /**
     * parse whole part of a number to display value (based on given config)
     * @protected
     * @param {?} whole
     * @return {?}
     */
    NumericDirective.prototype.getWholeDisplayValue = /**
     * parse whole part of a number to display value (based on given config)
     * @protected
     * @param {?} whole
     * @return {?}
     */
    function (whole) {
        /** @type {?} */
        var parsedWhole = Math.abs(typeof whole !== 'number' ? parseInt(whole, 10) : whole);
        return this.config.noScientificNotation
            ? parsedWhole.toLocaleString('fullwide', { useGrouping: false })
            : parsedWhole.toString();
    };
    /**
     * get whole and decimal part of a number
     * type of return values may vary, it is intentional
     * the returned array should have size of 1(only whole number) or 2(whole and decimal)
     */
    /**
     * get whole and decimal part of a number
     * type of return values may vary, it is intentional
     * the returned array should have size of 1(only whole number) or 2(whole and decimal)
     * @protected
     * @param {?} value
     * @return {?}
     */
    NumericDirective.prototype.getWholeAndDecimalParts = /**
     * get whole and decimal part of a number
     * type of return values may vary, it is intentional
     * the returned array should have size of 1(only whole number) or 2(whole and decimal)
     * @protected
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (typeof value === 'number') {
            if (this.config.noScientificNotation && (value > Number.MAX_SAFE_INTEGER || value < Number.MIN_SAFE_INTEGER)) {
                /** @type {?} */
                var decimals = value % 1;
                return [Math.floor(value), decimals !== 0 ? '' + decimals : undefined];
            }
            else {
                return value.toString().split('.');
            }
        }
        else {
            return value.toString().split(this.config.decimals);
        }
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
        lsnNumericMessages: [{ type: Output }],
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
    NumericDirective.prototype.lsnNumericMessages;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtZXJpYy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbHNub3ZhL2FuZ3VsYXJtb2R1bGVzLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvbnVtZXJpYy9udW1lcmljLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3RILE9BQU8sS0FBSyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDbEQsT0FBTyxFQUF1QixpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZFLE9BQU8sRUFBZ0Isb0JBQW9CLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQzs7SUFFdkUsNEJBQTRCLEdBQVE7SUFDeEMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVTs7O0lBQUMsY0FBTSxPQUFBLGdCQUFnQixFQUFoQixDQUFnQixFQUFDO0lBQy9DLEtBQUssRUFBRSxJQUFJO0NBQ1o7O0FBRUQsSUFBWSxjQUFjO0lBQ3hCLDRCQUE0QixHQUFBO0VBQzdCOzs7QUFFRDtJQWNFLDBCQUNVLEVBQWMsRUFDZCxhQUFtQztRQURuQyxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQ2Qsa0JBQWEsR0FBYixhQUFhLENBQXNCO1FBWHBDLGVBQVUsR0FBa0IsRUFBRSxDQUFDO1FBQzlCLHVCQUFrQixHQUFHLElBQUksWUFBWSxFQUFrQixDQUFDO1FBRzNELGFBQVE7Ozs7UUFBRyxVQUFDLENBQU07UUFDekIsQ0FBQyxFQUFBO1FBQ00sWUFBTzs7O1FBQUc7UUFDakIsQ0FBQyxFQUFBO1FBTUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25CLENBQUM7Ozs7SUFFRCxzQ0FBVzs7O0lB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Q0FBQSxBQW5XRCxJQW1XQztTQS9WWSxnQkFBZ0I7OztJQUMzQixzQ0FBd0M7O0lBQ3hDLDhDQUFrRTs7SUFDbEUsbUNBQW9COzs7OztJQUNwQixrQ0FBZ0M7O0lBQ2hDLG9DQUNDOztJQUNELG1DQUNDOzs7OztJQUdDLDhCQUFzQjs7Ozs7SUFDdEIseUNBQTJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMga2V5Ym9hcmQgZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge051bWVyaWNDb25maWcsIE51bWVyaWNDb25maWdTZXJ2aWNlfSBmcm9tICcuL251bWVyaWMtY29uZmlnLnNlcnZpY2UnO1xuXG5jb25zdCBDVVNUT01fU0VMRUNUX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOdW1lcmljRGlyZWN0aXZlKSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbmV4cG9ydCBlbnVtIE51bWVyaWNNZXNzYWdlIHtcbiAgQURESVRJT05BTF9ERUNJTUFMX1NFUEFSQVRPUlxufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbHNuTnVtZXJpY10nLFxuICBwcm92aWRlcnM6IFtDVVNUT01fU0VMRUNUX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBOdW1lcmljRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzLCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIEBJbnB1dCgpIGxzbk51bWVyaWM6IE51bWVyaWNDb25maWcgPSB7fTtcbiAgQE91dHB1dCgpIGxzbk51bWVyaWNNZXNzYWdlcyA9IG5ldyBFdmVudEVtaXR0ZXI8TnVtZXJpY01lc3NhZ2U+KCk7XG4gIGVsZW1lbnQ6IEVsZW1lbnRSZWY7XG4gIHByb3RlY3RlZCBjb25maWc6IE51bWVyaWNDb25maWc7XG4gIHB1YmxpYyBvbkNoYW5nZSA9IChfOiBhbnkpID0+IHtcbiAgfVxuICBwdWJsaWMgb25Ub3VjaCA9ICgpID0+IHtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBjb25maWdTZXJ2aWNlOiBOdW1lcmljQ29uZmlnU2VydmljZVxuICApIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbDtcbiAgICB0aGlzLnNldENvbmZpZygpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgdGhpcy5zZXRDb25maWcoKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2lucHV0JywgWyckZXZlbnQnXSlcbiAgaW5wdXRIYW5kbGVyKCRldmVudCkge1xuICAgIGlmICgkZXZlbnQudGFyZ2V0LnZhbHVlID09PSAnLScpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHZhbHVlID0gdGhpcy5yZW1vdmVJbnZhbGlkQ2hhcmFjdGVycygkZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICB2YWx1ZSA9IHRoaXMuaGFuZGxlV2hvbGVzTGVuZ3RoKHZhbHVlKTtcbiAgICBjb25zdCBwYXJzZWRWYWx1ZSA9IHRoaXMucGFyc2VWYWx1ZSh2YWx1ZSk7XG4gICAgdGhpcy5kaXNwbGF5VmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9bLHwuXS8sIHRoaXMuY29uZmlnLmRlY2ltYWxzKTtcbiAgICB0aGlzLm9uQ2hhbmdlKHBhcnNlZFZhbHVlKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzJywgW10pXG4gIGZvY3VzSGFuZGxlcigpIHtcbiAgICB0aGlzLnNldEVkaXRNb2RlKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdibHVyJywgW10pXG4gIGJsdXJIYW5kbGVyKCkge1xuICAgIGNvbnN0IHBhcnNlZFZhbHVlOiBudW1iZXIgPSB0aGlzLnBhcnNlVmFsdWUodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWUpO1xuICAgIGNvbnN0IHJhbmdlVmFsdWUgPSB0aGlzLmhhbmRsZVJhbmdlKHBhcnNlZFZhbHVlKTtcbiAgICAvLyBjb3JyZWN0IGVudGVyZWQgdmFsdWUgb24gYmx1ciB0byBwcm9wZXIgcmFuZ2UgdmFsdWVcbiAgICBpZiAocGFyc2VkVmFsdWUgIT09IHJhbmdlVmFsdWUpIHtcbiAgICAgIHRoaXMuZGlzcGxheVZhbHVlID0gcmFuZ2VWYWx1ZS50b1N0cmluZygpLnJlcGxhY2UoL1ssfC5dLywgdGhpcy5jb25maWcuZGVjaW1hbHMpO1xuICAgICAgdGhpcy5vbkNoYW5nZShyYW5nZVZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY29uZmlnLnN0ZXAgJiYgIWlzTmFOKHBhcnNlZFZhbHVlKSkge1xuICAgICAgLy8gY29ycmVjdCBlbnRlcmVkIHZhbHVlIG9uIGJsdXIgdG8gcHJvcGVyIHN0ZXAgdmFsdWVcbiAgICAgIGNvbnN0IHN0ZXBWYWx1ZSA9IHRoaXMuaGFuZGxlU3RlcChwYXJzZWRWYWx1ZSk7XG4gICAgICB0aGlzLmRpc3BsYXlWYWx1ZSA9IHN0ZXBWYWx1ZS50b1N0cmluZygpLnJlcGxhY2UoL1ssfC5dLywgdGhpcy5jb25maWcuZGVjaW1hbHMpO1xuICAgICAgdGhpcy5vbkNoYW5nZShzdGVwVmFsdWUpO1xuICAgIH1cbiAgICB0aGlzLmRpc3BsYXlWYWx1ZSA9IHRoaXMucHJlcGFyZURpc3BsYXlWYWx1ZSh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC52YWx1ZSk7XG4gICAgaWYgKHRoaXMub25Ub3VjaCkge1xuICAgICAgLy8gaWYgdXNlciBzZXRzIHVwZGF0ZU9uIHRvICdibHVyJywgd2UgaGF2ZSB0byBjYWxsIG9uVG91Y2ggZm9yIGl0IHRvIHdvcmsgcHJvcGVybHlcbiAgICAgIHRoaXMub25Ub3VjaCgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyB3cml0ZVZhbHVlKG1vZGVsVmFsdWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHBhcnNlZFZhbHVlID0gdGhpcy5wYXJzZVZhbHVlKG1vZGVsVmFsdWUpO1xuICAgIHRoaXMuZGlzcGxheVZhbHVlID0gdGhpcy5wcmVwYXJlRGlzcGxheVZhbHVlKHBhcnNlZFZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaCA9IGZuO1xuICB9XG5cbiAgZ2V0IGRpc3BsYXlWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gIH1cblxuICBzZXQgZGlzcGxheVZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHNldENvbmZpZygpIHtcbiAgICBjb25zdCBkZWZhdWx0Q29uZmlnID0gdGhpcy5sc25OdW1lcmljLmNvbmZpZ1xuICAgICAgPyB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0Q3VzdG9tQ29uZmlnKHRoaXMubHNuTnVtZXJpYy5jb25maWcpXG4gICAgICA6IHRoaXMuY29uZmlnU2VydmljZS5nZXREZWZhdWx0Q29uZmlnKCk7XG4gICAgdGhpcy5jb25maWcgPSBPYmplY3QuYXNzaWduKHsuLi5kZWZhdWx0Q29uZmlnLCAuLi50aGlzLmxzbk51bWVyaWN9KTtcbiAgICBpZiAodGhpcy5jb25maWcuZGVjaW1hbHMgJiYgdGhpcy5jb25maWcudGhvdXNhbmRzICYmIHRoaXMuY29uZmlnLmRlY2ltYWxzID09PSB0aGlzLmNvbmZpZy50aG91c2FuZHMpIHtcbiAgICAgIHRoaXMuY29uZmlnLnRob3VzYW5kcyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKHRoaXMuY29uZmlnLm1heCAhPT0gdW5kZWZpbmVkICYmIHRoaXMuY29uZmlnLm1heExlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1tsc25OdW1lcmljXSBTZXR0aW5nIGBtYXhMZW5ndGhgIG1ha2VzIGBtYXhgIHJlZHVuZGFudC4nKTtcbiAgICB9XG4gIH1cblxuICBwYXJzZVZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKCF2YWx1ZSAmJiB2YWx1ZSAhPT0gMCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgY29uc3QgbmV3VmFsdWUgPSB2YWx1ZS50b1N0cmluZygpLnJlcGxhY2UoL1ssfC5dLywgJy4nKTtcbiAgICBjb25zdCBwYXJzZWRWYWx1ZSA9IHRoaXMuY29uZmlnLnByZWNpc2lvbiA+IDBcbiAgICAgID8gcGFyc2VGbG9hdChuZXdWYWx1ZSlcbiAgICAgIDogcGFyc2VJbnQobmV3VmFsdWUsIDEwKTtcbiAgICByZXR1cm4gaXNOYU4ocGFyc2VkVmFsdWUpID8gdW5kZWZpbmVkIDogcGFyc2VkVmFsdWU7XG4gIH1cblxuICBoYW5kbGVXaG9sZXNMZW5ndGgodmFsdWUpIHtcbiAgICBpZiAodGhpcy5jb25maWcubWF4TGVuZ3RoKSB7XG4gICAgICBjb25zdCBuZWdhdGl2ZVNpZ24gPSB2YWx1ZS50b1N0cmluZygpLnN0YXJ0c1dpdGgoJy0nKSA/ICctJyA6ICcnO1xuICAgICAgY29uc3QgYWJzb2x1dGVWYWx1ZSA9IHZhbHVlLnRvU3RyaW5nKClcbiAgICAgICAgLnJlcGxhY2UoL14tLywgJycpXG4gICAgICAgIC5yZXBsYWNlKC9bLHwuXS8sIHRoaXMuY29uZmlnLmRlY2ltYWxzKTtcbiAgICAgIGlmIChhYnNvbHV0ZVZhbHVlLnRvU3RyaW5nKCkuaW5jbHVkZXModGhpcy5jb25maWcuZGVjaW1hbHMpKSB7XG4gICAgICAgIGNvbnN0IFt3aG9sZXMsIGRlY2ltYWxzXSA9IGFic29sdXRlVmFsdWUudG9TdHJpbmcoKS5zcGxpdCh0aGlzLmNvbmZpZy5kZWNpbWFscyk7XG4gICAgICAgIGNvbnN0IHByb3BlckRlY2ltYWxzID0gdGhpcy5yZW1vdmVJbnZhbGlkQ2hhcmFjdGVycyhkZWNpbWFscywgdHJ1ZSk7XG4gICAgICAgIHJldHVybiBuZWdhdGl2ZVNpZ24gKyB3aG9sZXMuc3Vic3RyKDAsIHRoaXMuY29uZmlnLm1heExlbmd0aCkgKyB0aGlzLmNvbmZpZy5kZWNpbWFscyArIHByb3BlckRlY2ltYWxzO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5lZ2F0aXZlU2lnbiArIGFic29sdXRlVmFsdWUudG9TdHJpbmcoKS5zdWJzdHIoMCwgdGhpcy5jb25maWcubWF4TGVuZ3RoKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcmVtb3ZlSW52YWxpZENoYXJhY3RlcnModmFsdWUsIGFsbG93RGVjaW1hbHNPbmx5ID0gZmFsc2UpIHtcbiAgICByZXR1cm4gdGhpcy5jbGVhblVwKFxuICAgICAgYWxsb3dEZWNpbWFsc09ubHlcbiAgICAgICAgPyB2YWx1ZS5yZXBsYWNlKC9bXlxcLTAtOV0vZywgJycpXG4gICAgICAgIDogdmFsdWUucmVwbGFjZSgvW15cXC0wLTksLl0vZywgJycpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgY2xlYW5VcChpbnB1dCkge1xuICAgIC8vIG5vIHByZWNpc2lvbiBhdCBhbGxcbiAgICBsZXQgdmFsdWUgPSBpbnB1dC5yZXBsYWNlKC9bLHwuXS9nLCAnLicpO1xuICAgIGNvbnN0IGZpcnN0SW5kZXggPSB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHZhbHVlIGluc3RhbmNlb2YgU3RyaW5nXG4gICAgICA/IHZhbHVlLmluZGV4T2YoJy4nKVxuICAgICAgOiAtMTtcbiAgICBpZiAoZmlyc3RJbmRleCA9PT0gLTEpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICAvLyByZW1vdmUgZXZlcnl0aGluZyBhZnRlciBzZWNvbmQgY29tbWFcbiAgICBjb25zdCBzZWNvbmRJbmRleCA9IHZhbHVlLnN1YnN0cihmaXJzdEluZGV4ICsgMSkuaW5kZXhPZignLicpO1xuICAgIGlmIChzZWNvbmRJbmRleCAhPT0gLTEpIHtcbiAgICAgIHRoaXMubHNuTnVtZXJpY01lc3NhZ2VzLmVtaXQoTnVtZXJpY01lc3NhZ2UuQURESVRJT05BTF9ERUNJTUFMX1NFUEFSQVRPUik7XG4gICAgICB2YWx1ZSA9IHZhbHVlLnN1YnN0cigwLCBmaXJzdEluZGV4ICsgc2Vjb25kSW5kZXggKyAxKTtcbiAgICB9XG5cbiAgICAvLyByZW1vdmUgYWRkaXRpb25hbCBwcmVjaXNpb25cbiAgICBpZiAodGhpcy5jb25maWcucHJlY2lzaW9uID09PSAwKSB7XG4gICAgICByZXR1cm4gdmFsdWUuc3Vic3RyKDAsIGZpcnN0SW5kZXgpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jb25maWcucHJlY2lzaW9uKSB7XG4gICAgICByZXR1cm4gdmFsdWUuc3Vic3RyKDAsIGZpcnN0SW5kZXggKyB0aGlzLmNvbmZpZy5wcmVjaXNpb24gKyAxKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgaGFuZGxlUmFuZ2UodmFsdWUpIHtcbiAgICBpZiAoIXRoaXMuY29uZmlnLm1heExlbmd0aCAmJiB0aGlzLmNvbmZpZy5tYXggIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSA+IHRoaXMuY29uZmlnLm1heCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLm1heDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY29uZmlnLm1pbiAhPT0gdW5kZWZpbmVkICYmIHZhbHVlIDwgdGhpcy5jb25maWcubWluKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25maWcubWluO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBoYW5kbGVTdGVwKHZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlIC8gdGhpcy5jb25maWcuc3RlcCkgKiB0aGlzLmNvbmZpZy5zdGVwO1xuICB9XG5cbiAgcHJlcGFyZURpc3BsYXlWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICghdmFsdWUgJiYgdmFsdWUgIT09IDApIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgY29uc3QgW3dob2xlLCBkZWNpbWFsc10gPSB0aGlzLmdldFdob2xlQW5kRGVjaW1hbFBhcnRzKHZhbHVlKTtcbiAgICBjb25zdCBpc05lZ2F0aXZlID0gd2hvbGVbMF0gPT09ICctJyB8fCB3aG9sZSA8IDA7XG4gICAgbGV0IHJlc3VsdCA9IHdob2xlID09PSAnLScgfHwgIXdob2xlXG4gICAgICA/ICcwJ1xuICAgICAgOiB0aGlzLmdldFdob2xlRGlzcGxheVZhbHVlKHdob2xlKTtcbiAgICBpZiAodGhpcy5jb25maWcudGhvdXNhbmRzKSB7XG4gICAgICByZXN1bHQgPSByZXN1bHQucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgdGhpcy5jb25maWcudGhvdXNhbmRzKTtcbiAgICB9XG4gICAgaWYgKGRlY2ltYWxzICYmIHRoaXMuY29uZmlnLnByZWNpc2lvbiAmJiB0aGlzLmNvbmZpZy5kZWNpbWFscykge1xuICAgICAgcmVzdWx0ID0gcmVzdWx0ICsgdGhpcy5jb25maWcuZGVjaW1hbHMgKyBkZWNpbWFscztcbiAgICB9XG4gICAgcmV0dXJuIGlzTmVnYXRpdmUgJiYgcmVzdWx0ICE9PSAnMCcgPyAnLScgKyByZXN1bHQgOiByZXN1bHQ7XG4gIH1cblxuICBzZXRFZGl0TW9kZSgpIHtcbiAgICBpZiAodGhpcy5jb25maWcudGhvdXNhbmRzKSB7XG4gICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgICAgIGNvbnN0IFt3aG9sZSwgZGVjaW1hbHNdID0gY3VycmVudFZhbHVlLnNwbGl0KHRoaXMuY29uZmlnLmRlY2ltYWxzKTtcbiAgICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cCgnXFxcXCcgKyB0aGlzLmNvbmZpZy50aG91c2FuZHMsICdnJyk7XG4gICAgICBsZXQgcmVzdWx0ID0gd2hvbGUucmVwbGFjZShyZWdleCwgJycpO1xuICAgICAgaWYgKGRlY2ltYWxzICYmIHRoaXMuY29uZmlnLnByZWNpc2lvbiAmJiB0aGlzLmNvbmZpZy5kZWNpbWFscykge1xuICAgICAgICByZXN1bHQgPSByZXN1bHQgKyB0aGlzLmNvbmZpZy5kZWNpbWFscyArIGRlY2ltYWxzO1xuICAgICAgfVxuICAgICAgdGhpcy5kaXNwbGF5VmFsdWUgPSByZXN1bHQ7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gIGtleURvd25IYW5kbGVyKGU6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgICBpZiAoXG4gICAgICAvLyBBbGxvdyBzcGVjaWFsIGtleXNcbiAgICAgIFtcbiAgICAgICAga2V5Ym9hcmQuTEVGVF9BUlJPVyxcbiAgICAgICAga2V5Ym9hcmQuUklHSFRfQVJST1csXG4gICAgICAgIGtleWJvYXJkLkJBQ0tTUEFDRSxcbiAgICAgICAga2V5Ym9hcmQuREVMRVRFLFxuICAgICAgICBrZXlib2FyZC5FTkQsXG4gICAgICAgIGtleWJvYXJkLkVOVEVSLFxuICAgICAgICBrZXlib2FyZC5FU0NBUEUsXG4gICAgICAgIGtleWJvYXJkLkhPTUUsXG4gICAgICAgIGtleWJvYXJkLlRBQixcbiAgICAgIF0uaW5kZXhPZihlLmtleUNvZGUpICE9PSAtMVxuICAgICAgLy8gQWxsb3cgQ3RybCtrZXkgYWN0aW9uc1xuICAgICAgfHwgKFxuICAgICAgICBbXG4gICAgICAgICAga2V5Ym9hcmQuQSxcbiAgICAgICAgICBrZXlib2FyZC5DLFxuICAgICAgICAgIGtleWJvYXJkLlIsXG4gICAgICAgICAga2V5Ym9hcmQuVixcbiAgICAgICAgICBrZXlib2FyZC5YLFxuICAgICAgICBdLmluZGV4T2YoZS5rZXlDb2RlKSAhPT0gLTFcbiAgICAgICAgJiYgKGUuY3RybEtleSA9PT0gdHJ1ZSB8fCBlLm1ldGFLZXkgPT09IHRydWUpXG4gICAgICApXG4gICAgKSB7XG4gICAgICByZXR1cm47ICAvLyBsZXQgaXQgaGFwcGVuLCBkb24ndCBkbyBhbnl0aGluZ1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBtYXhMZW5ndGhcbiAgICBjb25zdCBhYnNvbHV0ZVZhbHVlID0gY3VycmVudFZhbHVlLnRvU3RyaW5nKCkucmVwbGFjZSgvXi0vLCAnJyk7XG4gICAgY29uc3QgW3dob2xlc10gPSBhYnNvbHV0ZVZhbHVlLnRvU3RyaW5nKCkuc3BsaXQodGhpcy5jb25maWcuZGVjaW1hbHMpO1xuICAgIGlmIChcbiAgICAgIHRoaXMuY29uZmlnLm1heExlbmd0aCAhPT0gdW5kZWZpbmVkXG4gICAgICAmJiAoXG4gICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0IDwgd2hvbGVzLmxlbmd0aFxuICAgICAgICAmJiB3aG9sZXMubGVuZ3RoID49IHRoaXMuY29uZmlnLm1heExlbmd0aFxuICAgICAgICAmJiBba2V5Ym9hcmQuREFTSCwga2V5Ym9hcmQuTlVNUEFEX01JTlVTXS5pbmRleE9mKGUua2V5Q29kZSkgPT09IC0xXG4gICAgICApXG4gICAgICAmJiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25FbmQgLSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCA9PT0gMFxuICAgICkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBtaW51c1xuICAgIGlmIChcbiAgICAgIFtrZXlib2FyZC5EQVNILCBrZXlib2FyZC5OVU1QQURfTUlOVVNdLmluZGV4T2YoZS5rZXlDb2RlKSAhPT0gLTFcbiAgICAgICYmIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0ID09PSAwXG4gICAgICAmJiAoKHRoaXMuY29uZmlnLm1pbiAhPT0gdW5kZWZpbmVkICYmIHRoaXMuY29uZmlnLm1pbiA8IDApIHx8IHRoaXMuY29uZmlnLm1pbiA9PT0gdW5kZWZpbmVkKVxuICAgICAgJiYgY3VycmVudFZhbHVlLmluZGV4T2YoJy0nKSA9PT0gLTFcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgc2VwYXJhdG9yXG4gICAgaWYgKFxuICAgICAgdGhpcy5jb25maWcucHJlY2lzaW9uID4gMFxuICAgICAgJiYgW2tleWJvYXJkLkNPTU1BLCBrZXlib2FyZC5OVU1QQURfUEVSSU9ELCAxOTBdLmluZGV4T2YoZS5rZXlDb2RlKSAhPT0gLTFcbiAgICAgICYmIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0ID4gMFxuICAgICAgJiYgY3VycmVudFZhbHVlLmxlbmd0aFxuICAgICAgJiYgY3VycmVudFZhbHVlLmluZGV4T2YoJy4nKSA9PT0gLTFcbiAgICAgICYmIGN1cnJlbnRWYWx1ZS5pbmRleE9mKCcsJykgPT09IC0xXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIGtleSBhZnRlciBzZXBhcmF0b3JcbiAgICBpZiAoXG4gICAgICB0aGlzLmNvbmZpZy5wcmVjaXNpb24gPiAwXG4gICAgICAmJiBjdXJyZW50VmFsdWUuaW5kZXhPZih0aGlzLmNvbmZpZy5kZWNpbWFscykgPiAtMVxuICAgICAgJiYgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPiBjdXJyZW50VmFsdWUuaW5kZXhPZih0aGlzLmNvbmZpZy5kZWNpbWFscylcbiAgICApIHtcbiAgICAgIGNvbnN0IFssIGRlY2ltYWxzXSA9IGN1cnJlbnRWYWx1ZS5zcGxpdCh0aGlzLmNvbmZpZy5kZWNpbWFscyk7XG4gICAgICBpZiAoZGVjaW1hbHMgJiYgZGVjaW1hbHMubGVuZ3RoID49IHRoaXMuY29uZmlnLnByZWNpc2lvbikge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIEVuc3VyZSB0aGF0IGl0IGlzIGEgbnVtYmVyIG9yIHN0b3AgdGhlIGtleXByZXNzXG4gICAgaWYgKFxuICAgICAgKFxuICAgICAgICAoXG4gICAgICAgICAgW1xuICAgICAgICAgICAga2V5Ym9hcmQuWkVSTyxcbiAgICAgICAgICAgIGtleWJvYXJkLk9ORSxcbiAgICAgICAgICAgIGtleWJvYXJkLlRXTyxcbiAgICAgICAgICAgIGtleWJvYXJkLlRIUkVFLFxuICAgICAgICAgICAga2V5Ym9hcmQuRk9VUixcbiAgICAgICAgICAgIGtleWJvYXJkLkZJVkUsXG4gICAgICAgICAgICBrZXlib2FyZC5TSVgsXG4gICAgICAgICAgICBrZXlib2FyZC5TRVZFTixcbiAgICAgICAgICAgIGtleWJvYXJkLkVJR0hULFxuICAgICAgICAgICAga2V5Ym9hcmQuTklORVxuICAgICAgICAgIF0uaW5kZXhPZihlLmtleUNvZGUpID09PSAtMVxuICAgICAgICAgIHx8IGUuc2hpZnRLZXlcbiAgICAgICAgKVxuICAgICAgICAmJlxuICAgICAgICBbXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX1pFUk8sXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX09ORSxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfVFdPLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9USFJFRSxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfRk9VUixcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfRklWRSxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfU0lYLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9TRVZFTixcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfRUlHSFQsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX05JTkUsXG4gICAgICAgIF0uaW5kZXhPZihlLmtleUNvZGUpID09PSAtMVxuICAgICAgKVxuICAgICAgfHwgKFxuICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCA9PT0gMFxuICAgICAgICAmJiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25FbmQgPT09IDBcbiAgICAgICAgJiYgY3VycmVudFZhbHVlLmluZGV4T2YoJy0nKSA+IC0xXG4gICAgICApXG4gICAgKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICB9XG5cbiAgLyoqXG4gICAqIHBhcnNlIHdob2xlIHBhcnQgb2YgYSBudW1iZXIgdG8gZGlzcGxheSB2YWx1ZSAoYmFzZWQgb24gZ2l2ZW4gY29uZmlnKVxuICAgKi9cbiAgcHJvdGVjdGVkIGdldFdob2xlRGlzcGxheVZhbHVlKHdob2xlOiBzdHJpbmcgfCBudW1iZXIpOiBzdHJpbmcge1xuICAgIGNvbnN0IHBhcnNlZFdob2xlOiBudW1iZXIgPSBNYXRoLmFicyh0eXBlb2Ygd2hvbGUgIT09ICdudW1iZXInID8gcGFyc2VJbnQod2hvbGUsIDEwKSA6IHdob2xlKTtcbiAgICByZXR1cm4gdGhpcy5jb25maWcubm9TY2llbnRpZmljTm90YXRpb25cbiAgICAgID8gcGFyc2VkV2hvbGUudG9Mb2NhbGVTdHJpbmcoJ2Z1bGx3aWRlJywge3VzZUdyb3VwaW5nOiBmYWxzZX0pXG4gICAgICA6IHBhcnNlZFdob2xlLnRvU3RyaW5nKCk7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IHdob2xlIGFuZCBkZWNpbWFsIHBhcnQgb2YgYSBudW1iZXJcbiAgICogdHlwZSBvZiByZXR1cm4gdmFsdWVzIG1heSB2YXJ5LCBpdCBpcyBpbnRlbnRpb25hbFxuICAgKiB0aGUgcmV0dXJuZWQgYXJyYXkgc2hvdWxkIGhhdmUgc2l6ZSBvZiAxKG9ubHkgd2hvbGUgbnVtYmVyKSBvciAyKHdob2xlIGFuZCBkZWNpbWFsKVxuICAgKi9cbiAgcHJvdGVjdGVkIGdldFdob2xlQW5kRGVjaW1hbFBhcnRzKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIpOiBBcnJheTxudW1iZXIgfCBzdHJpbmc+IHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgaWYgKHRoaXMuY29uZmlnLm5vU2NpZW50aWZpY05vdGF0aW9uICYmICh2YWx1ZSA+IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSIHx8IHZhbHVlIDwgTnVtYmVyLk1JTl9TQUZFX0lOVEVHRVIpKSB7XG4gICAgICAgIGNvbnN0IGRlY2ltYWxzID0gdmFsdWUgJSAxO1xuICAgICAgICByZXR1cm4gW01hdGguZmxvb3IodmFsdWUpLCBkZWNpbWFscyAhPT0gMCA/ICcnICsgZGVjaW1hbHMgOiB1bmRlZmluZWRdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCkuc3BsaXQoJy4nKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCkuc3BsaXQodGhpcy5jb25maWcuZGVjaW1hbHMpO1xuICAgIH1cbiAgfVxufVxuIl19