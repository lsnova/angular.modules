import { Injectable, NgModule, Directive, ElementRef, HostListener, Input, Component, defineInjectable } from '@angular/core';
import { LEFT_ARROW, RIGHT_ARROW, BACKSPACE, DELETE, END, ENTER, ESCAPE, HOME, TAB, A, C, R, V, X, DASH, NUMPAD_MINUS, COMMA, NUMPAD_PERIOD, ZERO, ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE, NUMPAD_ZERO, NUMPAD_ONE, NUMPAD_TWO, NUMPAD_THREE, NUMPAD_FOUR, NUMPAD_FIVE, NUMPAD_SIX, NUMPAD_SEVEN, NUMPAD_EIGHT, NUMPAD_NINE } from '@angular/cdk/keycodes';
import { NgControl } from '@angular/forms';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LsnModulesService {
    constructor() { }
}
LsnModulesService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
LsnModulesService.ctorParameters = () => [];
/** @nocollapse */ LsnModulesService.ngInjectableDef = defineInjectable({ factory: function LsnModulesService_Factory() { return new LsnModulesService(); }, token: LsnModulesService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LsnModulesComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
LsnModulesComponent.decorators = [
    { type: Component, args: [{
                selector: 'lsn-lsn-modules',
                template: `
    <p>
      lsn-modules works!
    </p>
  `
            }] }
];
/** @nocollapse */
LsnModulesComponent.ctorParameters = () => [];

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
class LsnModulesModule {
}
LsnModulesModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    LsnModulesComponent,
                    NumericDirective,
                ],
                imports: [],
                exports: [
                    LsnModulesComponent,
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

export { LsnModulesService, LsnModulesComponent, LsnModulesModule, NumericDirective };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNuLW1vZHVsZXMuanMubWFwIiwic291cmNlcyI6WyJuZzovL2xzbi1tb2R1bGVzL2xpYi9sc24tbW9kdWxlcy5zZXJ2aWNlLnRzIiwibmc6Ly9sc24tbW9kdWxlcy9saWIvbHNuLW1vZHVsZXMuY29tcG9uZW50LnRzIiwibmc6Ly9sc24tbW9kdWxlcy9saWIvZGlyZWN0aXZlcy9udW1lcmljL251bWVyaWMuZGlyZWN0aXZlLnRzIiwibmc6Ly9sc24tbW9kdWxlcy9saWIvbHNuLW1vZHVsZXMubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTHNuTW9kdWxlc1NlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsc24tbHNuLW1vZHVsZXMnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxwPlxuICAgICAgbHNuLW1vZHVsZXMgd29ya3MhXG4gICAgPC9wPlxuICBgLFxuICBzdHlsZXM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIExzbk1vZHVsZXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uQ2hhbmdlc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBrZXlib2FyZCBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtOZ0NvbnRyb2x9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuZW51bSBOdW1lcmljU2VwYXJhdG9yIHtcbiAgQ09NTUEgPSAnLCcsXG4gIFBFUklPRCA9ICcuJ1xufVxuXG5jbGFzcyBOdW1lcmljQ29uZmlnIHtcbiAgbWluOiBudW1iZXI7XG4gIG1heDogbnVtYmVyO1xuICBwcmVjaXNpb24gPSAwO1xuICBzZXBhcmF0b3I6IE51bWVyaWNTZXBhcmF0b3IgPSBOdW1lcmljU2VwYXJhdG9yLlBFUklPRDtcbn1cblxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbHNuTnVtZXJpY10nXG59KVxuZXhwb3J0IGNsYXNzIE51bWVyaWNEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBsc25OdW1lcmljID0ge307XG4gIGVsZW1lbnQ6IGFueTtcbiAgcHJvdGVjdGVkIGNvbmZpZzogTnVtZXJpY0NvbmZpZztcbiAgcHJpdmF0ZSBkZWZhdWx0Q29uZmlnOiBOdW1lcmljQ29uZmlnID0gbmV3IE51bWVyaWNDb25maWcoKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIG5nQ29udHJvbDogTmdDb250cm9sKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZWw7XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLmNvbmZpZyA9IE9iamVjdC5hc3NpZ24oey4uLnRoaXMuZGVmYXVsdENvbmZpZywgLi4udGhpcy5sc25OdW1lcmljfSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdpbnB1dCcsIFsnJGV2ZW50J10pXG4gIGlucHV0SGFuZGxlcigkZXZlbnQpIHtcbiAgICBjb25zdCBjdXJyZW50VmFsdWUgPSAkZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIHRoaXMubmdDb250cm9sLmNvbnRyb2wuc2V0VmFsdWUodGhpcy5wYXJzZU5ld1ZhbHVlKGN1cnJlbnRWYWx1ZSkpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignYmx1cicsIFsnJGV2ZW50J10pXG4gIGJsdXJIYW5kbGVyKCRldmVudCkge1xuICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9ICRldmVudC50YXJnZXQudmFsdWU7XG4gICAgdGhpcy5uZ0NvbnRyb2wuY29udHJvbC5zZXRWYWx1ZSh0aGlzLnBhcnNlTmV3VmFsdWUoY3VycmVudFZhbHVlLCB0cnVlKSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcGFyc2VOZXdWYWx1ZSh2YWx1ZSwgYmx1ckV2ZW50ID0gZmFsc2UpIHtcbiAgICBsZXQgbmV3VmFsdWUgPSB2YWx1ZTtcbiAgICBpZiAobmV3VmFsdWUgPT09ICcnIHx8IG5ld1ZhbHVlID09PSAnLScpIHtcbiAgICAgIHJldHVybiBibHVyRXZlbnQgPyAnJyA6IG5ld1ZhbHVlO1xuICAgIH1cbiAgICBpZiAodGhpcy5jb25maWcucHJlY2lzaW9uID4gMCkge1xuICAgICAgbmV3VmFsdWUgPSBuZXdWYWx1ZS5yZXBsYWNlKC9bLHwuXS8sIHRoaXMuY29uZmlnLnNlcGFyYXRvcik7XG4gICAgICBpZiAoXG4gICAgICAgIFt0aGlzLmNvbmZpZy5zZXBhcmF0b3IsICcwJ10uaW5kZXhPZihuZXdWYWx1ZS5zbGljZSgtMSkpID4gLTFcbiAgICAgICAgJiYgIWJsdXJFdmVudFxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBuZXdWYWx1ZTtcbiAgICAgIH1cbiAgICAgIG5ld1ZhbHVlID0gcGFyc2VGbG9hdChuZXdWYWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld1ZhbHVlID0gcGFyc2VJbnQobmV3VmFsdWUsIDEwKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY29uZmlnLm1heCAhPT0gdW5kZWZpbmVkICYmIG5ld1ZhbHVlID4gdGhpcy5jb25maWcubWF4KSB7XG4gICAgICBuZXdWYWx1ZSA9IHRoaXMuY29uZmlnLm1heDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY29uZmlnLm1pbiAhPT0gdW5kZWZpbmVkICYmIG5ld1ZhbHVlIDwgdGhpcy5jb25maWcubWluKSB7XG4gICAgICBuZXdWYWx1ZSA9IHRoaXMuY29uZmlnLm1pbjtcbiAgICB9XG4gICAgcmV0dXJuIGlzTmFOKG5ld1ZhbHVlKSA/ICcnIDogbmV3VmFsdWU7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAga2V5RG93bkhhbmRsZXIoZTogS2V5Ym9hcmRFdmVudCkge1xuICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnZhbHVlO1xuICAgIGlmIChcbiAgICAgIC8vIEFsbG93IHNwZWNpYWwga2V5c1xuICAgICAgW1xuICAgICAgICBrZXlib2FyZC5MRUZUX0FSUk9XLFxuICAgICAgICBrZXlib2FyZC5SSUdIVF9BUlJPVyxcbiAgICAgICAga2V5Ym9hcmQuQkFDS1NQQUNFLFxuICAgICAgICBrZXlib2FyZC5ERUxFVEUsXG4gICAgICAgIGtleWJvYXJkLkVORCxcbiAgICAgICAga2V5Ym9hcmQuRU5URVIsXG4gICAgICAgIGtleWJvYXJkLkVTQ0FQRSxcbiAgICAgICAga2V5Ym9hcmQuSE9NRSxcbiAgICAgICAga2V5Ym9hcmQuVEFCLFxuICAgICAgXS5pbmRleE9mKGUua2V5Q29kZSkgIT09IC0xXG4gICAgICAvLyBBbGxvdyBDdHJsK2tleSBhY3Rpb25zXG4gICAgICB8fCAoXG4gICAgICAgIFtcbiAgICAgICAgICBrZXlib2FyZC5BLFxuICAgICAgICAgIGtleWJvYXJkLkMsXG4gICAgICAgICAga2V5Ym9hcmQuUixcbiAgICAgICAgICBrZXlib2FyZC5WLFxuICAgICAgICAgIGtleWJvYXJkLlgsXG4gICAgICAgIF0uaW5kZXhPZihlLmtleUNvZGUpICE9PSAtMVxuICAgICAgICAmJiAoZS5jdHJsS2V5ID09PSB0cnVlIHx8IGUubWV0YUtleSA9PT0gdHJ1ZSlcbiAgICAgIClcbiAgICApIHtcbiAgICAgIHJldHVybjsgIC8vIGxldCBpdCBoYXBwZW4sIGRvbid0IGRvIGFueXRoaW5nXG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIG1pbnVzXG4gICAgaWYgKFxuICAgICAgW2tleWJvYXJkLkRBU0gsIGtleWJvYXJkLk5VTVBBRF9NSU5VU10uaW5kZXhPZihlLmtleUNvZGUpICE9PSAtMVxuICAgICAgJiYgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPT09IDBcbiAgICAgICYmICgodGhpcy5jb25maWcubWluICE9PSB1bmRlZmluZWQgJiYgdGhpcy5jb25maWcubWluIDwgMCkgfHwgdGhpcy5jb25maWcubWluID09PSB1bmRlZmluZWQpXG4gICAgICAmJiAoKHRoaXMuY29uZmlnLm1heCAhPT0gdW5kZWZpbmVkICYmIHRoaXMuY29uZmlnLm1heCA8IDApIHx8IHRoaXMuY29uZmlnLm1heCA9PT0gdW5kZWZpbmVkKVxuICAgICAgJiYgY3VycmVudFZhbHVlLmluZGV4T2YoJy0nKSA9PT0gLTFcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgc2VwYXJhdG9yXG4gICAgaWYgKFxuICAgICAgdGhpcy5jb25maWcucHJlY2lzaW9uID4gMFxuICAgICAgJiYgW2tleWJvYXJkLkNPTU1BLCBrZXlib2FyZC5OVU1QQURfUEVSSU9ELCAxOTBdLmluZGV4T2YoZS5rZXlDb2RlKSAhPT0gLTFcbiAgICAgICYmIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0ID4gMFxuICAgICAgJiYgY3VycmVudFZhbHVlLmxlbmd0aFxuICAgICAgJiYgY3VycmVudFZhbHVlLmluZGV4T2YodGhpcy5jb25maWcuc2VwYXJhdG9yKSA9PT0gLTFcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUga2V5IGFmdGVyIHNlcGFyYXRvclxuICAgIGlmIChcbiAgICAgIHRoaXMuY29uZmlnLnByZWNpc2lvbiA+IDBcbiAgICAgICYmIGN1cnJlbnRWYWx1ZS5pbmRleE9mKHRoaXMuY29uZmlnLnNlcGFyYXRvcikgPiAtMVxuICAgICAgJiYgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPiBjdXJyZW50VmFsdWUuaW5kZXhPZih0aGlzLmNvbmZpZy5zZXBhcmF0b3IpXG4gICAgKSB7XG4gICAgICBjb25zdCBbLCBkZWNpbWFsc10gPSBjdXJyZW50VmFsdWUuc3BsaXQodGhpcy5jb25maWcuc2VwYXJhdG9yKTtcbiAgICAgIGlmIChkZWNpbWFscyAmJiBkZWNpbWFscy5sZW5ndGggPj0gdGhpcy5jb25maWcucHJlY2lzaW9uKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBFbnN1cmUgdGhhdCBpdCBpcyBhIG51bWJlciBvciBzdG9wIHRoZSBrZXlwcmVzc1xuICAgIGlmIChcbiAgICAgIChcbiAgICAgICAgKFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIGtleWJvYXJkLlpFUk8sXG4gICAgICAgICAgICBrZXlib2FyZC5PTkUsXG4gICAgICAgICAgICBrZXlib2FyZC5UV08sXG4gICAgICAgICAgICBrZXlib2FyZC5USFJFRSxcbiAgICAgICAgICAgIGtleWJvYXJkLkZPVVIsXG4gICAgICAgICAgICBrZXlib2FyZC5GSVZFLFxuICAgICAgICAgICAga2V5Ym9hcmQuU0lYLFxuICAgICAgICAgICAga2V5Ym9hcmQuU0VWRU4sXG4gICAgICAgICAgICBrZXlib2FyZC5FSUdIVCxcbiAgICAgICAgICAgIGtleWJvYXJkLk5JTkVcbiAgICAgICAgICBdLmluZGV4T2YoZS5rZXlDb2RlKSA9PT0gLTFcbiAgICAgICAgICB8fCBlLnNoaWZ0S2V5XG4gICAgICAgIClcbiAgICAgICAgJiZcbiAgICAgICAgW1xuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9aRVJPLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9PTkUsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX1RXTyxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfVEhSRUUsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX0ZPVVIsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX0ZJVkUsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX1NJWCxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfU0VWRU4sXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX0VJR0hULFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9OSU5FLFxuICAgICAgICBdLmluZGV4T2YoZS5rZXlDb2RlKSA9PT0gLTFcbiAgICAgIClcbiAgICAgIHx8ICh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCA9PT0gMCAmJiBjdXJyZW50VmFsdWUuaW5kZXhPZignLScpID4gLTEpXG4gICAgKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7THNuTW9kdWxlc0NvbXBvbmVudH0gZnJvbSAnLi9sc24tbW9kdWxlcy5jb21wb25lbnQnO1xuaW1wb3J0IHtOdW1lcmljRGlyZWN0aXZlfSBmcm9tICcuL2RpcmVjdGl2ZXMvbnVtZXJpYy9udW1lcmljLmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIExzbk1vZHVsZXNDb21wb25lbnQsXG4gICAgTnVtZXJpY0RpcmVjdGl2ZSxcbiAgXSxcbiAgaW1wb3J0czogW10sXG4gIGV4cG9ydHM6IFtcbiAgICBMc25Nb2R1bGVzQ29tcG9uZW50LFxuICAgIE51bWVyaWNEaXJlY3RpdmUsXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTHNuTW9kdWxlc01vZHVsZSB7XG59XG4iXSwibmFtZXMiOlsia2V5Ym9hcmQuTEVGVF9BUlJPVyIsImtleWJvYXJkLlJJR0hUX0FSUk9XIiwia2V5Ym9hcmQuQkFDS1NQQUNFIiwia2V5Ym9hcmQuREVMRVRFIiwia2V5Ym9hcmQuRU5EIiwia2V5Ym9hcmQuRU5URVIiLCJrZXlib2FyZC5FU0NBUEUiLCJrZXlib2FyZC5IT01FIiwia2V5Ym9hcmQuVEFCIiwia2V5Ym9hcmQuQSIsImtleWJvYXJkLkMiLCJrZXlib2FyZC5SIiwia2V5Ym9hcmQuViIsImtleWJvYXJkLlgiLCJrZXlib2FyZC5EQVNIIiwia2V5Ym9hcmQuTlVNUEFEX01JTlVTIiwia2V5Ym9hcmQuQ09NTUEiLCJrZXlib2FyZC5OVU1QQURfUEVSSU9EIiwia2V5Ym9hcmQuWkVSTyIsImtleWJvYXJkLk9ORSIsImtleWJvYXJkLlRXTyIsImtleWJvYXJkLlRIUkVFIiwia2V5Ym9hcmQuRk9VUiIsImtleWJvYXJkLkZJVkUiLCJrZXlib2FyZC5TSVgiLCJrZXlib2FyZC5TRVZFTiIsImtleWJvYXJkLkVJR0hUIiwia2V5Ym9hcmQuTklORSIsImtleWJvYXJkLk5VTVBBRF9aRVJPIiwia2V5Ym9hcmQuTlVNUEFEX09ORSIsImtleWJvYXJkLk5VTVBBRF9UV08iLCJrZXlib2FyZC5OVU1QQURfVEhSRUUiLCJrZXlib2FyZC5OVU1QQURfRk9VUiIsImtleWJvYXJkLk5VTVBBRF9GSVZFIiwia2V5Ym9hcmQuTlVNUEFEX1NJWCIsImtleWJvYXJkLk5VTVBBRF9TRVZFTiIsImtleWJvYXJkLk5VTVBBRF9FSUdIVCIsImtleWJvYXJkLk5VTVBBRF9OSU5FIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLE1BS2EsaUJBQWlCO0lBRTVCLGlCQUFpQjs7O1lBTGxCLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7Ozs7Ozs7OztBQ0pELE1BV2EsbUJBQW1CO0lBRTlCLGlCQUFpQjs7OztJQUVqQixRQUFRO0tBQ1A7OztZQWRGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixRQUFRLEVBQUU7Ozs7R0FJVDthQUVGOzs7Ozs7Ozs7QUNWRDs7SUFLRSxPQUFRLEdBQUc7SUFDWCxRQUFTLEdBQUc7O0FBR2QsTUFBTSxhQUFhO0lBQW5CO1FBR0UsY0FBUyxHQUFHLENBQUMsQ0FBQztRQUNkLGNBQVMsR0FBcUIsZ0JBQWdCLENBQUMs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