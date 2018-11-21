/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import * as keyboard from '@angular/cdk/keycodes';
import { NgControl } from '@angular/forms';
/** @enum {string} */
var NumericSeparator = {
    COMMA: ',',
    PERIOD: '.',
};
var NumericConfig = /** @class */ (function () {
    function NumericConfig() {
        this.precision = 0;
        this.separator = NumericSeparator.PERIOD;
    }
    return NumericConfig;
}());
if (false) {
    /** @type {?} */
    NumericConfig.prototype.min;
    /** @type {?} */
    NumericConfig.prototype.max;
    /** @type {?} */
    NumericConfig.prototype.precision;
    /** @type {?} */
    NumericConfig.prototype.separator;
}
var NumericDirective = /** @class */ (function () {
    function NumericDirective(el, ngControl) {
        this.el = el;
        this.ngControl = ngControl;
        this.lsnNumeric = {};
        this.defaultConfig = new NumericConfig();
        this.element = el;
    }
    /**
     * @return {?}
     */
    NumericDirective.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        this.config = Object.assign(tslib_1.__assign({}, this.defaultConfig, this.lsnNumeric));
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
        /** @type {?} */
        var currentValue = $event.target.value;
        this.ngControl.control.setValue(this.parseNewValue(currentValue));
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    NumericDirective.prototype.blurHandler = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        /** @type {?} */
        var currentValue = $event.target.value;
        this.ngControl.control.setValue(this.parseNewValue(currentValue, true));
    };
    /**
     * @protected
     * @param {?} value
     * @param {?=} blurEvent
     * @return {?}
     */
    NumericDirective.prototype.parseNewValue = /**
     * @protected
     * @param {?} value
     * @param {?=} blurEvent
     * @return {?}
     */
    function (value, blurEvent) {
        if (blurEvent === void 0) { blurEvent = false; }
        /** @type {?} */
        var newValue = value;
        if (newValue === '' || newValue === '-') {
            return blurEvent ? '' : newValue;
        }
        if (this.config.precision > 0) {
            newValue = newValue.replace(/[,|.]/, this.config.separator);
            if ([this.config.separator, '0'].indexOf(newValue.slice(-1)) > -1
                && !blurEvent) {
                return newValue;
            }
            newValue = parseFloat(newValue);
        }
        else {
            newValue = parseInt(newValue, 10);
        }
        if (this.config.max !== undefined && newValue > this.config.max) {
            newValue = this.config.max;
        }
        else if (this.config.min !== undefined && newValue < this.config.min) {
            newValue = this.config.min;
        }
        return isNaN(newValue) ? '' : newValue;
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
        // Handle minus
        if ([keyboard.DASH, keyboard.NUMPAD_MINUS].indexOf(e.keyCode) !== -1
            && this.element.nativeElement.selectionStart === 0
            && ((this.config.min !== undefined && this.config.min < 0) || this.config.min === undefined)
            && ((this.config.max !== undefined && this.config.max < 0) || this.config.max === undefined)
            && currentValue.indexOf('-') === -1) {
            return;
        }
        // Handle separator
        if (this.config.precision > 0
            && [keyboard.COMMA, keyboard.NUMPAD_PERIOD, 190].indexOf(e.keyCode) !== -1
            && this.element.nativeElement.selectionStart > 0
            && currentValue.length
            && currentValue.indexOf(this.config.separator) === -1) {
            return;
        }
        // Handle key after separator
        if (this.config.precision > 0
            && currentValue.indexOf(this.config.separator) > -1
            && this.element.nativeElement.selectionStart > currentValue.indexOf(this.config.separator)) {
            var _a = tslib_1.__read(currentValue.split(this.config.separator), 2), decimals = _a[1];
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
            || (this.element.nativeElement.selectionStart === 0 && currentValue.indexOf('-') > -1)) {
            e.preventDefault();
        }
    };
    NumericDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[lsnNumeric]'
                },] }
    ];
    /** @nocollapse */
    NumericDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgControl }
    ]; };
    NumericDirective.propDecorators = {
        lsnNumeric: [{ type: Input }],
        inputHandler: [{ type: HostListener, args: ['input', ['$event'],] }],
        blurHandler: [{ type: HostListener, args: ['blur', ['$event'],] }],
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
    /**
     * @type {?}
     * @private
     */
    NumericDirective.prototype.defaultConfig;
    /**
     * @type {?}
     * @private
     */
    NumericDirective.prototype.el;
    /**
     * @type {?}
     * @private
     */
    NumericDirective.prototype.ngControl;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtZXJpYy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sc24tbW9kdWxlcy8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL251bWVyaWMvbnVtZXJpYy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFZLE1BQU0sZUFBZSxDQUFDO0FBQ3BGLE9BQU8sS0FBSyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDbEQsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDOzs7SUFHdkMsT0FBUSxHQUFHO0lBQ1gsUUFBUyxHQUFHOztBQUdkO0lBQUE7UUFHRSxjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsY0FBUyxHQUFxQixnQkFBZ0IsQ0FBQyxNQUFNLENBQUM7SUFDeEQsQ0FBQztJQUFELG9CQUFDO0FBQUQsQ0FBQyxBQUxELElBS0M7OztJQUpDLDRCQUFZOztJQUNaLDRCQUFZOztJQUNaLGtDQUFjOztJQUNkLGtDQUFzRDs7QUFJeEQ7SUFTRSwwQkFBb0IsRUFBYyxFQUFVLFNBQW9CO1FBQTVDLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBTHZELGVBQVUsR0FBRyxFQUFFLENBQUM7UUFHakIsa0JBQWEsR0FBa0IsSUFBSSxhQUFhLEVBQUUsQ0FBQztRQUd6RCxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNwQixDQUFDOzs7O0lBRUQsc0NBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxzQkFBSyxJQUFJLENBQUMsYUFBYSxFQUFLLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUMzRSxDQUFDOzs7OztJQUdELHVDQUFZOzs7O0lBRFosVUFDYSxNQUFNOztZQUNYLFlBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFD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QUFXO29CQUNwQixRQUFRLENBQUMsVUFBVTtvQkFDbkIsUUFBUSxDQUFDLFlBQVk7b0JBQ3JCLFFBQVEsQ0FBQyxZQUFZO29CQUNyQixRQUFRLENBQUMsV0FBVztpQkFDckIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUM1QjtlQUNFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsY0FBYyxLQUFLLENBQUMsSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQ3RGO1lBQ0EsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3BCO0lBQ0gsQ0FBQzs7Z0JBM0pGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsY0FBYztpQkFDekI7Ozs7Z0JBbkJrQixVQUFVO2dCQUVyQixTQUFTOzs7NkJBbUJkLEtBQUs7K0JBYUwsWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQzs4QkFNaEMsWUFBWSxTQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQztpQ0ErQi9CLFlBQVksU0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUM7O0lBc0dyQyx1QkFBQztDQUFBLEFBNUpELElBNEpDO1NBekpZLGdCQUFnQjs7O0lBQzNCLHNDQUF5Qjs7SUFDekIsbUNBQWE7Ozs7O0lBQ2Isa0NBQWdDOzs7OztJQUNoQyx5Q0FBMkQ7Ozs7O0lBRS9DLDhCQUFzQjs7Ozs7SUFBRSxxQ0FBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25DaGFuZ2VzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIGtleWJvYXJkIGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge05nQ29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5lbnVtIE51bWVyaWNTZXBhcmF0b3Ige1xuICBDT01NQSA9ICcsJyxcbiAgUEVSSU9EID0gJy4nXG59XG5cbmNsYXNzIE51bWVyaWNDb25maWcge1xuICBtaW46IG51bWJlcjtcbiAgbWF4OiBudW1iZXI7XG4gIHByZWNpc2lvbiA9IDA7XG4gIHNlcGFyYXRvcjogTnVtZXJpY1NlcGFyYXRvciA9IE51bWVyaWNTZXBhcmF0b3IuUEVSSU9EO1xufVxuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tsc25OdW1lcmljXSdcbn0pXG5leHBvcnQgY2xhc3MgTnVtZXJpY0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGxzbk51bWVyaWMgPSB7fTtcbiAgZWxlbWVudDogYW55O1xuICBwcm90ZWN0ZWQgY29uZmlnOiBOdW1lcmljQ29uZmlnO1xuICBwcml2YXRlIGRlZmF1bHRDb25maWc6IE51bWVyaWNDb25maWcgPSBuZXcgTnVtZXJpY0NvbmZpZygpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgbmdDb250cm9sOiBOZ0NvbnRyb2wpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbDtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMuY29uZmlnID0gT2JqZWN0LmFzc2lnbih7Li4udGhpcy5kZWZhdWx0Q29uZmlnLCAuLi50aGlzLmxzbk51bWVyaWN9KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2lucHV0JywgWyckZXZlbnQnXSlcbiAgaW5wdXRIYW5kbGVyKCRldmVudCkge1xuICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9ICRldmVudC50YXJnZXQudmFsdWU7XG4gICAgdGhpcy5uZ0NvbnRyb2wuY29udHJvbC5zZXRWYWx1ZSh0aGlzLnBhcnNlTmV3VmFsdWUoY3VycmVudFZhbHVlKSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdibHVyJywgWyckZXZlbnQnXSlcbiAgYmx1ckhhbmRsZXIoJGV2ZW50KSB7XG4gICAgY29uc3QgY3VycmVudFZhbHVlID0gJGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICB0aGlzLm5nQ29udHJvbC5jb250cm9sLnNldFZhbHVlKHRoaXMucGFyc2VOZXdWYWx1ZShjdXJyZW50VmFsdWUsIHRydWUpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBwYXJzZU5ld1ZhbHVlKHZhbHVlLCBibHVyRXZlbnQgPSBmYWxzZSkge1xuICAgIGxldCBuZXdWYWx1ZSA9IHZhbHVlO1xuICAgIGlmIChuZXdWYWx1ZSA9PT0gJycgfHwgbmV3VmFsdWUgPT09ICctJykge1xuICAgICAgcmV0dXJuIGJsdXJFdmVudCA/ICcnIDogbmV3VmFsdWU7XG4gICAgfVxuICAgIGlmICh0aGlzLmNvbmZpZy5wcmVjaXNpb24gPiAwKSB7XG4gICAgICBuZXdWYWx1ZSA9IG5ld1ZhbHVlLnJlcGxhY2UoL1ssfC5dLywgdGhpcy5jb25maWcuc2VwYXJhdG9yKTtcbiAgICAgIGlmIChcbiAgICAgICAgW3RoaXMuY29uZmlnLnNlcGFyYXRvciwgJzAnXS5pbmRleE9mKG5ld1ZhbHVlLnNsaWNlKC0xKSkgPiAtMVxuICAgICAgICAmJiAhYmx1ckV2ZW50XG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIG5ld1ZhbHVlO1xuICAgICAgfVxuICAgICAgbmV3VmFsdWUgPSBwYXJzZUZsb2F0KG5ld1ZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3VmFsdWUgPSBwYXJzZUludChuZXdWYWx1ZSwgMTApO1xuICAgIH1cbiAgICBpZiAodGhpcy5jb25maWcubWF4ICE9PSB1bmRlZmluZWQgJiYgbmV3VmFsdWUgPiB0aGlzLmNvbmZpZy5tYXgpIHtcbiAgICAgIG5ld1ZhbHVlID0gdGhpcy5jb25maWcubWF4O1xuICAgIH0gZWxzZSBpZiAodGhpcy5jb25maWcubWluICE9PSB1bmRlZmluZWQgJiYgbmV3VmFsdWUgPCB0aGlzLmNvbmZpZy5taW4pIHtcbiAgICAgIG5ld1ZhbHVlID0gdGhpcy5jb25maWcubWluO1xuICAgIH1cbiAgICByZXR1cm4gaXNOYU4obmV3VmFsdWUpID8gJycgOiBuZXdWYWx1ZTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICBrZXlEb3duSGFuZGxlcihlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgY29uc3QgY3VycmVudFZhbHVlID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgaWYgKFxuICAgICAgLy8gQWxsb3cgc3BlY2lhbCBrZXlzXG4gICAgICBbXG4gICAgICAgIGtleWJvYXJkLkxFRlRfQVJST1csXG4gICAgICAgIGtleWJvYXJkLlJJR0hUX0FSUk9XLFxuICAgICAgICBrZXlib2FyZC5CQUNLU1BBQ0UsXG4gICAgICAgIGtleWJvYXJkLkRFTEVURSxcbiAgICAgICAga2V5Ym9hcmQuRU5ELFxuICAgICAgICBrZXlib2FyZC5FTlRFUixcbiAgICAgICAga2V5Ym9hcmQuRVNDQVBFLFxuICAgICAgICBrZXlib2FyZC5IT01FLFxuICAgICAgICBrZXlib2FyZC5UQUIsXG4gICAgICBdLmluZGV4T2YoZS5rZXlDb2RlKSAhPT0gLTFcbiAgICAgIC8vIEFsbG93IEN0cmwra2V5IGFjdGlvbnNcbiAgICAgIHx8IChcbiAgICAgICAgW1xuICAgICAgICAgIGtleWJvYXJkLkEsXG4gICAgICAgICAga2V5Ym9hcmQuQyxcbiAgICAgICAgICBrZXlib2FyZC5SLFxuICAgICAgICAgIGtleWJvYXJkLlYsXG4gICAgICAgICAga2V5Ym9hcmQuWCxcbiAgICAgICAgXS5pbmRleE9mKGUua2V5Q29kZSkgIT09IC0xXG4gICAgICAgICYmIChlLmN0cmxLZXkgPT09IHRydWUgfHwgZS5tZXRhS2V5ID09PSB0cnVlKVxuICAgICAgKVxuICAgICkge1xuICAgICAgcmV0dXJuOyAgLy8gbGV0IGl0IGhhcHBlbiwgZG9uJ3QgZG8gYW55dGhpbmdcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgbWludXNcbiAgICBpZiAoXG4gICAgICBba2V5Ym9hcmQuREFTSCwga2V5Ym9hcmQuTlVNUEFEX01JTlVTXS5pbmRleE9mKGUua2V5Q29kZSkgIT09IC0xXG4gICAgICAmJiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCA9PT0gMFxuICAgICAgJiYgKCh0aGlzLmNvbmZpZy5taW4gIT09IHVuZGVmaW5lZCAmJiB0aGlzLmNvbmZpZy5taW4gPCAwKSB8fCB0aGlzLmNvbmZpZy5taW4gPT09IHVuZGVmaW5lZClcbiAgICAgICYmICgodGhpcy5jb25maWcubWF4ICE9PSB1bmRlZmluZWQgJiYgdGhpcy5jb25maWcubWF4IDwgMCkgfHwgdGhpcy5jb25maWcubWF4ID09PSB1bmRlZmluZWQpXG4gICAgICAmJiBjdXJyZW50VmFsdWUuaW5kZXhPZignLScpID09PSAtMVxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBzZXBhcmF0b3JcbiAgICBpZiAoXG4gICAgICB0aGlzLmNvbmZpZy5wcmVjaXNpb24gPiAwXG4gICAgICAmJiBba2V5Ym9hcmQuQ09NTUEsIGtleWJvYXJkLk5VTVBBRF9QRVJJT0QsIDE5MF0uaW5kZXhPZihlLmtleUNvZGUpICE9PSAtMVxuICAgICAgJiYgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPiAwXG4gICAgICAmJiBjdXJyZW50VmFsdWUubGVuZ3RoXG4gICAgICAmJiBjdXJyZW50VmFsdWUuaW5kZXhPZih0aGlzLmNvbmZpZy5zZXBhcmF0b3IpID09PSAtMVxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBrZXkgYWZ0ZXIgc2VwYXJhdG9yXG4gICAgaWYgKFxuICAgICAgdGhpcy5jb25maWcucHJlY2lzaW9uID4gMFxuICAgICAgJiYgY3VycmVudFZhbHVlLmluZGV4T2YodGhpcy5jb25maWcuc2VwYXJhdG9yKSA+IC0xXG4gICAgICAmJiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCA+IGN1cnJlbnRWYWx1ZS5pbmRleE9mKHRoaXMuY29uZmlnLnNlcGFyYXRvcilcbiAgICApIHtcbiAgICAgIGNvbnN0IFssIGRlY2ltYWxzXSA9IGN1cnJlbnRWYWx1ZS5zcGxpdCh0aGlzLmNvbmZpZy5zZXBhcmF0b3IpO1xuICAgICAgaWYgKGRlY2ltYWxzICYmIGRlY2ltYWxzLmxlbmd0aCA+PSB0aGlzLmNvbmZpZy5wcmVjaXNpb24pIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEVuc3VyZSB0aGF0IGl0IGlzIGEgbnVtYmVyIG9yIHN0b3AgdGhlIGtleXByZXNzXG4gICAgaWYgKFxuICAgICAgKFxuICAgICAgICAoXG4gICAgICAgICAgW1xuICAgICAgICAgICAga2V5Ym9hcmQuWkVSTyxcbiAgICAgICAgICAgIGtleWJvYXJkLk9ORSxcbiAgICAgICAgICAgIGtleWJvYXJkLlRXTyxcbiAgICAgICAgICAgIGtleWJvYXJkLlRIUkVFLFxuICAgICAgICAgICAga2V5Ym9hcmQuRk9VUixcbiAgICAgICAgICAgIGtleWJvYXJkLkZJVkUsXG4gICAgICAgICAgICBrZXlib2FyZC5TSVgsXG4gICAgICAgICAgICBrZXlib2FyZC5TRVZFTixcbiAgICAgICAgICAgIGtleWJvYXJkLkVJR0hULFxuICAgICAgICAgICAga2V5Ym9hcmQuTklORVxuICAgICAgICAgIF0uaW5kZXhPZihlLmtleUNvZGUpID09PSAtMVxuICAgICAgICAgIHx8IGUuc2hpZnRLZXlcbiAgICAgICAgKVxuICAgICAgICAmJlxuICAgICAgICBbXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX1pFUk8sXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX09ORSxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfVFdPLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9USFJFRSxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfRk9VUixcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfRklWRSxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfU0lYLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9TRVZFTixcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfRUlHSFQsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX05JTkUsXG4gICAgICAgIF0uaW5kZXhPZihlLmtleUNvZGUpID09PSAtMVxuICAgICAgKVxuICAgICAgfHwgKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0ID09PSAwICYmIGN1cnJlbnRWYWx1ZS5pbmRleE9mKCctJykgPiAtMSlcbiAgICApIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==