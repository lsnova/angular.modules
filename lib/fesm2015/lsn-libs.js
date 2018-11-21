import { Directive, ElementRef, HostListener, Input, NgModule } from '@angular/core';
import { LEFT_ARROW, RIGHT_ARROW, BACKSPACE, DELETE, END, ENTER, ESCAPE, HOME, TAB, A, C, R, V, X, DASH, NUMPAD_MINUS, COMMA, NUMPAD_PERIOD, ZERO, ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE, NUMPAD_ZERO, NUMPAD_ONE, NUMPAD_TWO, NUMPAD_THREE, NUMPAD_FOUR, NUMPAD_FIVE, NUMPAD_SIX, NUMPAD_SEVEN, NUMPAD_EIGHT, NUMPAD_NINE } from '@angular/cdk/keycodes';
import { NgControl } from '@angular/forms';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const NumericSeparator = {
    COMMA: ',',
    PERIOD: '.',
};
class NumericConfig {
    constructor() {
        this.precision = 0;
        this.separator = NumericSeparator.PERIOD;
    }
}
class NumericDirective {
    /**
     * @param {?} el
     * @param {?} ngControl
     */
    constructor(el, ngControl) {
        this.el = el;
        this.ngControl = ngControl;
        this.lsnNumeric = {};
        this.defaultConfig = new NumericConfig();
        this.element = el;
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this.config = Object.assign(Object.assign({}, this.defaultConfig, this.lsnNumeric));
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    inputHandler($event) {
        /** @type {?} */
        const currentValue = $event.target.value;
        this.ngControl.control.setValue(this.parseNewValue(currentValue));
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    blurHandler($event) {
        /** @type {?} */
        const currentValue = $event.target.value;
        this.ngControl.control.setValue(this.parseNewValue(currentValue, true));
    }
    /**
     * @protected
     * @param {?} value
     * @param {?=} blurEvent
     * @return {?}
     */
    parseNewValue(value, blurEvent = false) {
        /** @type {?} */
        let newValue = value;
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
        // Handle minus
        if ([DASH, NUMPAD_MINUS].indexOf(e.keyCode) !== -1
            && this.element.nativeElement.selectionStart === 0
            && ((this.config.min !== undefined && this.config.min < 0) || this.config.min === undefined)
            && ((this.config.max !== undefined && this.config.max < 0) || this.config.max === undefined)
            && currentValue.indexOf('-') === -1) {
            return;
        }
        // Handle separator
        if (this.config.precision > 0
            && [COMMA, NUMPAD_PERIOD, 190].indexOf(e.keyCode) !== -1
            && this.element.nativeElement.selectionStart > 0
            && currentValue.length
            && currentValue.indexOf(this.config.separator) === -1) {
            return;
        }
        // Handle key after separator
        if (this.config.precision > 0
            && currentValue.indexOf(this.config.separator) > -1
            && this.element.nativeElement.selectionStart > currentValue.indexOf(this.config.separator)) {
            const [, decimals] = currentValue.split(this.config.separator);
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
                selector: '[lsnNumeric]'
            },] }
];
/** @nocollapse */
NumericDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NgControl }
];
NumericDirective.propDecorators = {
    lsnNumeric: [{ type: Input }],
    inputHandler: [{ type: HostListener, args: ['input', ['$event'],] }],
    blurHandler: [{ type: HostListener, args: ['blur', ['$event'],] }],
    keyDownHandler: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LsnLibsModule {
}
LsnLibsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    NumericDirective,
                ],
                imports: [],
                exports: [
                    NumericDirective,
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

export { LsnLibsModule, NumericDirective as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNuLWxpYnMuanMubWFwIiwic291cmNlcyI6WyJuZzovL2xzbi1saWJzL2xpYi9kaXJlY3RpdmVzL251bWVyaWMvbnVtZXJpYy5kaXJlY3RpdmUudHMiLCJuZzovL2xzbi1saWJzL2xpYi9sc24tbGlicy5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uQ2hhbmdlc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBrZXlib2FyZCBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtOZ0NvbnRyb2x9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuZW51bSBOdW1lcmljU2VwYXJhdG9yIHtcbiAgQ09NTUEgPSAnLCcsXG4gIFBFUklPRCA9ICcuJ1xufVxuXG5jbGFzcyBOdW1lcmljQ29uZmlnIHtcbiAgbWluOiBudW1iZXI7XG4gIG1heDogbnVtYmVyO1xuICBwcmVjaXNpb24gPSAwO1xuICBzZXBhcmF0b3I6IE51bWVyaWNTZXBhcmF0b3IgPSBOdW1lcmljU2VwYXJhdG9yLlBFUklPRDtcbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2xzbk51bWVyaWNdJ1xufSlcbmV4cG9ydCBjbGFzcyBOdW1lcmljRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgbHNuTnVtZXJpYyA9IHt9O1xuICBlbGVtZW50OiBhbnk7XG4gIHByb3RlY3RlZCBjb25maWc6IE51bWVyaWNDb25maWc7XG4gIHByaXZhdGUgZGVmYXVsdENvbmZpZzogTnVtZXJpY0NvbmZpZyA9IG5ldyBOdW1lcmljQ29uZmlnKCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBuZ0NvbnRyb2w6IE5nQ29udHJvbCkge1xuICAgIHRoaXMuZWxlbWVudCA9IGVsO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgdGhpcy5jb25maWcgPSBPYmplY3QuYXNzaWduKHsuLi50aGlzLmRlZmF1bHRDb25maWcsIC4uLnRoaXMubHNuTnVtZXJpY30pO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignaW5wdXQnLCBbJyRldmVudCddKVxuICBpbnB1dEhhbmRsZXIoJGV2ZW50KSB7XG4gICAgY29uc3QgY3VycmVudFZhbHVlID0gJGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICB0aGlzLm5nQ29udHJvbC5jb250cm9sLnNldFZhbHVlKHRoaXMucGFyc2VOZXdWYWx1ZShjdXJyZW50VmFsdWUpKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInLCBbJyRldmVudCddKVxuICBibHVySGFuZGxlcigkZXZlbnQpIHtcbiAgICBjb25zdCBjdXJyZW50VmFsdWUgPSAkZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIHRoaXMubmdDb250cm9sLmNvbnRyb2wuc2V0VmFsdWUodGhpcy5wYXJzZU5ld1ZhbHVlKGN1cnJlbnRWYWx1ZSwgdHJ1ZSkpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHBhcnNlTmV3VmFsdWUodmFsdWUsIGJsdXJFdmVudCA9IGZhbHNlKSB7XG4gICAgbGV0IG5ld1ZhbHVlID0gdmFsdWU7XG4gICAgaWYgKG5ld1ZhbHVlID09PSAnJyB8fCBuZXdWYWx1ZSA9PT0gJy0nKSB7XG4gICAgICByZXR1cm4gYmx1ckV2ZW50ID8gJycgOiBuZXdWYWx1ZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY29uZmlnLnByZWNpc2lvbiA+IDApIHtcbiAgICAgIG5ld1ZhbHVlID0gbmV3VmFsdWUucmVwbGFjZSgvWyx8Ll0vLCB0aGlzLmNvbmZpZy5zZXBhcmF0b3IpO1xuICAgICAgaWYgKFxuICAgICAgICBbdGhpcy5jb25maWcuc2VwYXJhdG9yLCAnMCddLmluZGV4T2YobmV3VmFsdWUuc2xpY2UoLTEpKSA+IC0xXG4gICAgICAgICYmICFibHVyRXZlbnRcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gbmV3VmFsdWU7XG4gICAgICB9XG4gICAgICBuZXdWYWx1ZSA9IHBhcnNlRmxvYXQobmV3VmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdWYWx1ZSA9IHBhcnNlSW50KG5ld1ZhbHVlLCAxMCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmNvbmZpZy5tYXggIT09IHVuZGVmaW5lZCAmJiBuZXdWYWx1ZSA+IHRoaXMuY29uZmlnLm1heCkge1xuICAgICAgbmV3VmFsdWUgPSB0aGlzLmNvbmZpZy5tYXg7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNvbmZpZy5taW4gIT09IHVuZGVmaW5lZCAmJiBuZXdWYWx1ZSA8IHRoaXMuY29uZmlnLm1pbikge1xuICAgICAgbmV3VmFsdWUgPSB0aGlzLmNvbmZpZy5taW47XG4gICAgfVxuICAgIHJldHVybiBpc05hTihuZXdWYWx1ZSkgPyAnJyA6IG5ld1ZhbHVlO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gIGtleURvd25IYW5kbGVyKGU6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgICBpZiAoXG4gICAgICAvLyBBbGxvdyBzcGVjaWFsIGtleXNcbiAgICAgIFtcbiAgICAgICAga2V5Ym9hcmQuTEVGVF9BUlJPVyxcbiAgICAgICAga2V5Ym9hcmQuUklHSFRfQVJST1csXG4gICAgICAgIGtleWJvYXJkLkJBQ0tTUEFDRSxcbiAgICAgICAga2V5Ym9hcmQuREVMRVRFLFxuICAgICAgICBrZXlib2FyZC5FTkQsXG4gICAgICAgIGtleWJvYXJkLkVOVEVSLFxuICAgICAgICBrZXlib2FyZC5FU0NBUEUsXG4gICAgICAgIGtleWJvYXJkLkhPTUUsXG4gICAgICAgIGtleWJvYXJkLlRBQixcbiAgICAgIF0uaW5kZXhPZihlLmtleUNvZGUpICE9PSAtMVxuICAgICAgLy8gQWxsb3cgQ3RybCtrZXkgYWN0aW9uc1xuICAgICAgfHwgKFxuICAgICAgICBbXG4gICAgICAgICAga2V5Ym9hcmQuQSxcbiAgICAgICAgICBrZXlib2FyZC5DLFxuICAgICAgICAgIGtleWJvYXJkLlIsXG4gICAgICAgICAga2V5Ym9hcmQuVixcbiAgICAgICAgICBrZXlib2FyZC5YLFxuICAgICAgICBdLmluZGV4T2YoZS5rZXlDb2RlKSAhPT0gLTFcbiAgICAgICAgJiYgKGUuY3RybEtleSA9PT0gdHJ1ZSB8fCBlLm1ldGFLZXkgPT09IHRydWUpXG4gICAgICApXG4gICAgKSB7XG4gICAgICByZXR1cm47ICAvLyBsZXQgaXQgaGFwcGVuLCBkb24ndCBkbyBhbnl0aGluZ1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBtaW51c1xuICAgIGlmIChcbiAgICAgIFtrZXlib2FyZC5EQVNILCBrZXlib2FyZC5OVU1QQURfTUlOVVNdLmluZGV4T2YoZS5rZXlDb2RlKSAhPT0gLTFcbiAgICAgICYmIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0ID09PSAwXG4gICAgICAmJiAoKHRoaXMuY29uZmlnLm1pbiAhPT0gdW5kZWZpbmVkICYmIHRoaXMuY29uZmlnLm1pbiA8IDApIHx8IHRoaXMuY29uZmlnLm1pbiA9PT0gdW5kZWZpbmVkKVxuICAgICAgJiYgKCh0aGlzLmNvbmZpZy5tYXggIT09IHVuZGVmaW5lZCAmJiB0aGlzLmNvbmZpZy5tYXggPCAwKSB8fCB0aGlzLmNvbmZpZy5tYXggPT09IHVuZGVmaW5lZClcbiAgICAgICYmIGN1cnJlbnRWYWx1ZS5pbmRleE9mKCctJykgPT09IC0xXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHNlcGFyYXRvclxuICAgIGlmIChcbiAgICAgIHRoaXMuY29uZmlnLnByZWNpc2lvbiA+IDBcbiAgICAgICYmIFtrZXlib2FyZC5DT01NQSwga2V5Ym9hcmQuTlVNUEFEX1BFUklPRCwgMTkwXS5pbmRleE9mKGUua2V5Q29kZSkgIT09IC0xXG4gICAgICAmJiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCA+IDBcbiAgICAgICYmIGN1cnJlbnRWYWx1ZS5sZW5ndGhcbiAgICAgICYmIGN1cnJlbnRWYWx1ZS5pbmRleE9mKHRoaXMuY29uZmlnLnNlcGFyYXRvcikgPT09IC0xXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIGtleSBhZnRlciBzZXBhcmF0b3JcbiAgICBpZiAoXG4gICAgICB0aGlzLmNvbmZpZy5wcmVjaXNpb24gPiAwXG4gICAgICAmJiBjdXJyZW50VmFsdWUuaW5kZXhPZih0aGlzLmNvbmZpZy5zZXBhcmF0b3IpID4gLTFcbiAgICAgICYmIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0ID4gY3VycmVudFZhbHVlLmluZGV4T2YodGhpcy5jb25maWcuc2VwYXJhdG9yKVxuICAgICkge1xuICAgICAgY29uc3QgWywgZGVjaW1hbHNdID0gY3VycmVudFZhbHVlLnNwbGl0KHRoaXMuY29uZmlnLnNlcGFyYXRvcik7XG4gICAgICBpZiAoZGVjaW1hbHMgJiYgZGVjaW1hbHMubGVuZ3RoID49IHRoaXMuY29uZmlnLnByZWNpc2lvbikge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRW5zdXJlIHRoYXQgaXQgaXMgYSBudW1iZXIgb3Igc3RvcCB0aGUga2V5cHJlc3NcbiAgICBpZiAoXG4gICAgICAoXG4gICAgICAgIChcbiAgICAgICAgICBbXG4gICAgICAgICAgICBrZXlib2FyZC5aRVJPLFxuICAgICAgICAgICAga2V5Ym9hcmQuT05FLFxuICAgICAgICAgICAga2V5Ym9hcmQuVFdPLFxuICAgICAgICAgICAga2V5Ym9hcmQuVEhSRUUsXG4gICAgICAgICAgICBrZXlib2FyZC5GT1VSLFxuICAgICAgICAgICAga2V5Ym9hcmQuRklWRSxcbiAgICAgICAgICAgIGtleWJvYXJkLlNJWCxcbiAgICAgICAgICAgIGtleWJvYXJkLlNFVkVOLFxuICAgICAgICAgICAga2V5Ym9hcmQuRUlHSFQsXG4gICAgICAgICAgICBrZXlib2FyZC5OSU5FXG4gICAgICAgICAgXS5pbmRleE9mKGUua2V5Q29kZSkgPT09IC0xXG4gICAgICAgICAgfHwgZS5zaGlmdEtleVxuICAgICAgICApXG4gICAgICAgICYmXG4gICAgICAgIFtcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfWkVSTyxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfT05FLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9UV08sXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX1RIUkVFLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9GT1VSLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9GSVZFLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9TSVgsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX1NFVkVOLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9FSUdIVCxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfTklORSxcbiAgICAgICAgXS5pbmRleE9mKGUua2V5Q29kZSkgPT09IC0xXG4gICAgICApXG4gICAgICB8fCAodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPT09IDAgJiYgY3VycmVudFZhbHVlLmluZGV4T2YoJy0nKSA+IC0xKVxuICAgICkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge051bWVyaWNEaXJlY3RpdmV9IGZyb20gJy4vZGlyZWN0aXZlcy9udW1lcmljL251bWVyaWMuZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTnVtZXJpY0RpcmVjdGl2ZSxcbiAgXSxcbiAgaW1wb3J0czogW10sXG4gIGV4cG9ydHM6IFtcbiAgICBOdW1lcmljRGlyZWN0aXZlLFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIExzbkxpYnNNb2R1bGUge1xufVxuIl0sIm5hbWVzIjpbImtleWJvYXJkLkxFRlRfQVJST1ciLCJrZXlib2FyZC5SSUdIVF9BUlJPVyIsImtleWJvYXJkLkJBQ0tTUEFDRSIsImtleWJvYXJkLkRFTEVURSIsImtleWJvYXJkLkVORCIsImtleWJvYXJkLkVOVEVSIiwia2V5Ym9hcmQuRVNDQVBFIiwia2V5Ym9hcmQuSE9NRSIsImtleWJvYXJkLlRBQiIsImtleWJvYXJkLkEiLCJrZXlib2FyZC5DIiwia2V5Ym9hcmQuUiIsImtleWJvYXJkLlYiLCJrZXlib2FyZC5YIiwia2V5Ym9hcmQuREFTSCIsImtleWJvYXJkLk5VTVBBRF9NSU5VUyIsImtleWJvYXJkLkNPTU1BIiwia2V5Ym9hcmQuTlVNUEFEX1BFUklPRCIsImtleWJvYXJkLlpFUk8iLCJrZXlib2FyZC5PTkUiLCJrZXlib2FyZC5UV08iLCJrZXlib2FyZC5USFJFRSIsImtleWJvYXJkLkZPVVIiLCJrZXlib2FyZC5GSVZFIiwia2V5Ym9hcmQuU0lYIiwia2V5Ym9hcmQuU0VWRU4iLCJrZXlib2FyZC5FSUdIVCIsImtleWJvYXJkLk5JTkUiLCJrZXlib2FyZC5OVU1QQURfWkVSTyIsImtleWJvYXJkLk5VTVBBRF9PTkUiLCJrZXlib2FyZC5OVU1QQURfVFdPIiwia2V5Ym9hcmQuTlVNUEFEX1RIUkVFIiwia2V5Ym9hcmQuTlVNUEFEX0ZPVVIiLCJrZXlib2FyZC5OVU1QQURfRklWRSIsImtleWJvYXJkLk5VTVBBRF9TSVgiLCJrZXlib2FyZC5OVU1QQURfU0VWRU4iLCJrZXlib2FyZC5OVU1QQURfRUlHSFQiLCJrZXlib2FyZC5OVU1QQURfTklORSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7SUFLRSxPQUFRLEdBQUc7SUFDWCxRQUFTLEdBQUc7O0FBR2QsTUFBTSxhQUFhO0lBQW5CO1FBR0UsY0FBUyxHQUFHLENBQUMsQ0FBQztRQUNkLGNB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