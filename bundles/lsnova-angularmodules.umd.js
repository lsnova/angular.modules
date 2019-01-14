(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/cdk/keycodes')) :
    typeof define === 'function' && define.amd ? define('@lsnova/angularmodules', ['exports', '@angular/core', '@angular/forms', '@angular/cdk/keycodes'], factory) :
    (factory((global.lsnova = global.lsnova || {}, global.lsnova.angularmodules = {}),global.ng.core,global.ng.forms,global.ng.cdk.keycodes));
}(this, (function (exports,core,forms,keyboard) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CapitalizeDirective = /** @class */ (function () {
        function CapitalizeDirective(model) {
            this.model = model;
        }
        /**
         * @param {?} $event
         * @return {?}
         */
        CapitalizeDirective.prototype.onInputChange = /**
         * @param {?} $event
         * @return {?}
         */
            function ($event) {
                this.model.valueAccessor.writeValue($event.toLocaleUpperCase());
            };
        CapitalizeDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[ngModel][lsnCapitalize]',
                        providers: [forms.NgModel]
                    },] }
        ];
        /** @nocollapse */
        CapitalizeDirective.ctorParameters = function () {
            return [
                { type: forms.NgModel }
            ];
        };
        CapitalizeDirective.propDecorators = {
            onInputChange: [{ type: core.HostListener, args: ['ngModelChange', ['$event'],] }]
        };
        return CapitalizeDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var LatinToGreekDirective = /** @class */ (function () {
        function LatinToGreekDirective(model, el) {
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
        /**
         * @private
         * @return {?}
         */
        LatinToGreekDirective.prototype.getCaret = /**
         * @private
         * @return {?}
         */
            function () {
                return {
                    start: this.el.nativeElement.selectionStart,
                    end: this.el.nativeElement.selectionEnd,
                };
            };
        /**
         * @private
         * @param {?} start
         * @param {?} end
         * @return {?}
         */
        LatinToGreekDirective.prototype.setCaret = /**
         * @private
         * @param {?} start
         * @param {?} end
         * @return {?}
         */
            function (start, end) {
                this.el.nativeElement.selectionStart = start;
                this.el.nativeElement.selectionEnd = end;
                this.el.nativeElement.focus();
            };
        /**
         * @param {?} $event
         * @return {?}
         */
        LatinToGreekDirective.prototype.onInputChange = /**
         * @param {?} $event
         * @return {?}
         */
            function ($event) {
                var _a = this.getCaret(), start = _a.start, end = _a.end;
                /** @type {?} */
                var translated = $event.toLocaleUpperCase();
                this.latinToGreek.forEach(function (replace) {
                    translated = translated.replace(replace[0], replace[1]);
                });
                this.model.valueAccessor.writeValue(translated);
                this.setCaret(start, end);
            };
        LatinToGreekDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[ngModel][lsnLatinToGreek]',
                        providers: [forms.NgModel]
                    },] }
        ];
        /** @nocollapse */
        LatinToGreekDirective.ctorParameters = function () {
            return [
                { type: forms.NgModel },
                { type: core.ElementRef }
            ];
        };
        LatinToGreekDirective.propDecorators = {
            onInputChange: [{ type: core.HostListener, args: ['ngModelChange', ['$event'],] }]
        };
        return LatinToGreekDirective;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
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
                this.config = Object.assign(__assign({}, this.defaultConfig, this.lsnNumeric));
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
                if (blurEvent === void 0) {
                    blurEvent = false;
                }
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
                    var _a = __read(currentValue.split(this.config.separator), 2), decimals = _a[1];
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
            { type: core.Directive, args: [{
                        selector: '[lsnNumeric]'
                    },] }
        ];
        /** @nocollapse */
        NumericDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: forms.NgControl }
            ];
        };
        NumericDirective.propDecorators = {
            lsnNumeric: [{ type: core.Input }],
            inputHandler: [{ type: core.HostListener, args: ['input', ['$event'],] }],
            blurHandler: [{ type: core.HostListener, args: ['blur', ['$event'],] }],
            keyDownHandler: [{ type: core.HostListener, args: ['keydown', ['$event'],] }]
        };
        return NumericDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NumPadConfig = /** @class */ (function () {
        function NumPadConfig() {
            this.allowLeadingZeros = false;
        }
        return NumPadConfig;
    }());
    var NumPadDirective = /** @class */ (function () {
        function NumPadDirective(element, ngControl) {
            this.element = element;
            this.ngControl = ngControl;
            this.lsnNumPad = {};
            this.defaultConfig = new NumPadConfig();
        }
        /**
         * @return {?}
         */
        NumPadDirective.prototype.ngOnChanges = /**
         * @return {?}
         */
            function () {
                this.config = Object.assign(__assign({}, this.defaultConfig, this.lsnNumPad));
            };
        /**
         * @param {?} $event
         * @return {?}
         */
        NumPadDirective.prototype.inputHandler = /**
         * @param {?} $event
         * @return {?}
         */
            function ($event) {
                /** @type {?} */
                var currentValue = $event.target.value;
                this.setValue(this.parseNewValue(currentValue));
            };
        /**
         * @param {?} $event
         * @return {?}
         */
        NumPadDirective.prototype.blurHandler = /**
         * @param {?} $event
         * @return {?}
         */
            function ($event) {
                /** @type {?} */
                var currentValue = $event.target.value;
                this.setValue(this.parseNewValue(currentValue, true));
            };
        /**
         * @protected
         * @param {?} value
         * @return {?}
         */
        NumPadDirective.prototype.setValue = /**
         * @protected
         * @param {?} value
         * @return {?}
         */
            function (value) {
                if (this.ngControl && this.ngControl.control) {
                    this.ngControl.control.setValue(value);
                }
                else {
                    this.element.nativeElement.value = value;
                }
            };
        /**
         * @protected
         * @param {?} value
         * @param {?=} blurEvent
         * @return {?}
         */
        NumPadDirective.prototype.parseNewValue = /**
         * @protected
         * @param {?} value
         * @param {?=} blurEvent
         * @return {?}
         */
            function (value, blurEvent) {
                if (blurEvent === void 0) {
                    blurEvent = false;
                }
                /** @type {?} */
                var newValue = value.replace(/[^0-9]/g, '');
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
            };
        /**
         * @param {?} e
         * @return {?}
         */
        NumPadDirective.prototype.keyDownHandler = /**
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
                        && currentValue.length >= this.config.maxlength)) {
                    e.preventDefault();
                }
            };
        NumPadDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[lsnNumPad]'
                    },] }
        ];
        /** @nocollapse */
        NumPadDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: forms.NgControl, decorators: [{ type: core.Optional }] }
            ];
        };
        NumPadDirective.propDecorators = {
            lsnNumPad: [{ type: core.Input }],
            inputHandler: [{ type: core.HostListener, args: ['input', ['$event'],] }],
            blurHandler: [{ type: core.HostListener, args: ['blur', ['$event'],] }],
            keyDownHandler: [{ type: core.HostListener, args: ['keydown', ['$event'],] }]
        };
        return NumPadDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var LsnLibsModule = /** @class */ (function () {
        function LsnLibsModule() {
        }
        LsnLibsModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            CapitalizeDirective,
                            LatinToGreekDirective,
                            NumericDirective,
                            NumPadDirective,
                        ],
                        imports: [],
                        exports: [
                            CapitalizeDirective,
                            LatinToGreekDirective,
                            NumericDirective,
                            NumPadDirective,
                        ]
                    },] }
        ];
        return LsnLibsModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.LsnLibsModule = LsnLibsModule;
    exports.CapitalizeDirective = CapitalizeDirective;
    exports.LatinToGreekDirective = LatinToGreekDirective;
    exports.NumericDirective = NumericDirective;
    exports.NumPadDirective = NumPadDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNub3ZhLWFuZ3VsYXJtb2R1bGVzLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy9saWIvZGlyZWN0aXZlcy9jYXBpdGFsaXplL2NhcGl0YWxpemUuZGlyZWN0aXZlLnRzIiwibmc6Ly9AbHNub3ZhL2FuZ3VsYXJtb2R1bGVzL2xpYi9kaXJlY3RpdmVzL2xhdGluLXRvLWdyZWVrL2xhdGluLXRvLWdyZWVrLmRpcmVjdGl2ZS50cyIsIi4uLy4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCJuZzovL0Bsc25vdmEvYW5ndWxhcm1vZHVsZXMvbGliL2RpcmVjdGl2ZXMvbnVtZXJpYy9udW1lcmljLmRpcmVjdGl2ZS50cyIsIm5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy9saWIvZGlyZWN0aXZlcy9udW1wYWQvbnVtcGFkLmRpcmVjdGl2ZS50cyIsIm5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy9saWIvbHNuLWxpYnMubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBIb3N0TGlzdGVuZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ01vZGVsfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuZ01vZGVsXVtsc25DYXBpdGFsaXplXScsXG4gIHByb3ZpZGVyczogW05nTW9kZWxdXG59KVxuZXhwb3J0IGNsYXNzIENhcGl0YWxpemVEaXJlY3RpdmUge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1vZGVsOiBOZ01vZGVsKSB7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCduZ01vZGVsQ2hhbmdlJywgWyckZXZlbnQnXSlcbiAgb25JbnB1dENoYW5nZSgkZXZlbnQpIHtcbiAgICB0aGlzLm1vZGVsLnZhbHVlQWNjZXNzb3Iud3JpdGVWYWx1ZSgkZXZlbnQudG9Mb2NhbGVVcHBlckNhc2UoKSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05nTW9kZWx9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbmdNb2RlbF1bbHNuTGF0aW5Ub0dyZWVrXScsXG4gIHByb3ZpZGVyczogW05nTW9kZWxdXG59KVxuZXhwb3J0IGNsYXNzIExhdGluVG9HcmVla0RpcmVjdGl2ZSB7XG5cbiAgcHJpdmF0ZSBsYXRpblRvR3JlZWsgPSBbXG4gICAgWy9BL2lnLCAnw47CkSddLFxuICAgIFsvQi9pZywgJ8OOwpInXSxcbiAgICBbL0cvaWcsICfDjsKTJ10sXG4gICAgWy9EL2lnLCAnw47ClCddLFxuICAgIFsvRS9pZywgJ8OOwpUnXSxcbiAgICBbL1ovaWcsICfDjsKWJ10sXG4gICAgWy9IL2lnLCAnw47ClyddLFxuICAgIFsvVS9pZywgJ8OOwpgnXSxcbiAgICBbL0kvaWcsICfDjsKZJ10sXG4gICAgWy9LL2lnLCAnw47CmiddLFxuICAgIFsvTC9pZywgJ8OOwpsnXSxcbiAgICBbL00vaWcsICfDjsKcJ10sXG4gICAgWy9OL2lnLCAnw47CnSddLFxuICAgIFsvSi9pZywgJ8OOwp4nXSxcbiAgICBbL08vaWcsICfDjsKfJ10sXG4gICAgWy9QL2lnLCAnw47CoCddLFxuICAgIFsvUi9pZywgJ8OOwqEnXSxcbiAgICBbL1MvaWcsICfDjsKjJ10sXG4gICAgWy9UL2lnLCAnw47CpCddLFxuICAgIFsvWS9pZywgJ8OOwqUnXSxcbiAgICBbL0YvaWcsICfDjsKmJ10sXG4gICAgWy9YL2lnLCAnw47CpyddLFxuICAgIFsvQy9pZywgJ8OOwqgnXSxcbiAgICBbL1YvaWcsICfDjsKpJ10sXG4gICAgWy9XL2lnLCAnVyddLFxuICAgIFsvUS9pZywgJ1EnXVxuICBdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbW9kZWw6IE5nTW9kZWwsIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q2FyZXQoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXJ0OiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQsXG4gICAgICBlbmQ6IHRoaXMuZWwubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25FbmQsXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0Q2FyZXQoc3RhcnQsIGVuZCkge1xuICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCA9IHN0YXJ0O1xuICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25FbmQgPSBlbmQ7XG4gICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gIH1cblxuXG4gIEBIb3N0TGlzdGVuZXIoJ25nTW9kZWxDaGFuZ2UnLCBbJyRldmVudCddKVxuICBvbklucHV0Q2hhbmdlKCRldmVudCkge1xuICAgIGNvbnN0IHtzdGFydCwgZW5kfSA9IHRoaXMuZ2V0Q2FyZXQoKTtcblxuICAgIGxldCB0cmFuc2xhdGVkID0gJGV2ZW50LnRvTG9jYWxlVXBwZXJDYXNlKCk7XG4gICAgdGhpcy5sYXRpblRvR3JlZWsuZm9yRWFjaChyZXBsYWNlID0+IHtcbiAgICAgIHRyYW5zbGF0ZWQgPSB0cmFuc2xhdGVkLnJlcGxhY2UocmVwbGFjZVswXSwgcmVwbGFjZVsxXSk7XG4gICAgfSk7XG4gICAgdGhpcy5tb2RlbC52YWx1ZUFjY2Vzc29yLndyaXRlVmFsdWUodHJhbnNsYXRlZCk7XG4gICAgdGhpcy5zZXRDYXJldChzdGFydCwgZW5kKTtcbiAgfVxuXG59XG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkNoYW5nZXN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMga2V5Ym9hcmQgZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7TmdDb250cm9sfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmVudW0gTnVtZXJpY1NlcGFyYXRvciB7XG4gIENPTU1BID0gJywnLFxuICBQRVJJT0QgPSAnLidcbn1cblxuY2xhc3MgTnVtZXJpY0NvbmZpZyB7XG4gIG1pbjogbnVtYmVyO1xuICBtYXg6IG51bWJlcjtcbiAgcHJlY2lzaW9uID0gMDtcbiAgc2VwYXJhdG9yOiBOdW1lcmljU2VwYXJhdG9yID0gTnVtZXJpY1NlcGFyYXRvci5QRVJJT0Q7XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tsc25OdW1lcmljXSdcbn0pXG5leHBvcnQgY2xhc3MgTnVtZXJpY0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGxzbk51bWVyaWMgPSB7fTtcbiAgZWxlbWVudDogYW55O1xuICBwcm90ZWN0ZWQgY29uZmlnOiBOdW1lcmljQ29uZmlnO1xuICBwcml2YXRlIGRlZmF1bHRDb25maWc6IE51bWVyaWNDb25maWcgPSBuZXcgTnVtZXJpY0NvbmZpZygpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgbmdDb250cm9sOiBOZ0NvbnRyb2wpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbDtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMuY29uZmlnID0gT2JqZWN0LmFzc2lnbih7Li4udGhpcy5kZWZhdWx0Q29uZmlnLCAuLi50aGlzLmxzbk51bWVyaWN9KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2lucHV0JywgWyckZXZlbnQnXSlcbiAgaW5wdXRIYW5kbGVyKCRldmVudCkge1xuICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9ICRldmVudC50YXJnZXQudmFsdWU7XG4gICAgdGhpcy5uZ0NvbnRyb2wuY29udHJvbC5zZXRWYWx1ZSh0aGlzLnBhcnNlTmV3VmFsdWUoY3VycmVudFZhbHVlKSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdibHVyJywgWyckZXZlbnQnXSlcbiAgYmx1ckhhbmRsZXIoJGV2ZW50KSB7XG4gICAgY29uc3QgY3VycmVudFZhbHVlID0gJGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICB0aGlzLm5nQ29udHJvbC5jb250cm9sLnNldFZhbHVlKHRoaXMucGFyc2VOZXdWYWx1ZShjdXJyZW50VmFsdWUsIHRydWUpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBwYXJzZU5ld1ZhbHVlKHZhbHVlLCBibHVyRXZlbnQgPSBmYWxzZSkge1xuICAgIGxldCBuZXdWYWx1ZSA9IHZhbHVlO1xuICAgIGlmIChuZXdWYWx1ZSA9PT0gJycgfHwgbmV3VmFsdWUgPT09ICctJykge1xuICAgICAgcmV0dXJuIGJsdXJFdmVudCA/ICcnIDogbmV3VmFsdWU7XG4gICAgfVxuICAgIGlmICh0aGlzLmNvbmZpZy5wcmVjaXNpb24gPiAwKSB7XG4gICAgICBuZXdWYWx1ZSA9IG5ld1ZhbHVlLnJlcGxhY2UoL1ssfC5dLywgdGhpcy5jb25maWcuc2VwYXJhdG9yKTtcbiAgICAgIGlmIChcbiAgICAgICAgW3RoaXMuY29uZmlnLnNlcGFyYXRvciwgJzAnXS5pbmRleE9mKG5ld1ZhbHVlLnNsaWNlKC0xKSkgPiAtMVxuICAgICAgICAmJiAhYmx1ckV2ZW50XG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIG5ld1ZhbHVlO1xuICAgICAgfVxuICAgICAgbmV3VmFsdWUgPSBwYXJzZUZsb2F0KG5ld1ZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3VmFsdWUgPSBwYXJzZUludChuZXdWYWx1ZSwgMTApO1xuICAgIH1cbiAgICBpZiAodGhpcy5jb25maWcubWF4ICE9PSB1bmRlZmluZWQgJiYgbmV3VmFsdWUgPiB0aGlzLmNvbmZpZy5tYXgpIHtcbiAgICAgIG5ld1ZhbHVlID0gdGhpcy5jb25maWcubWF4O1xuICAgIH0gZWxzZSBpZiAodGhpcy5jb25maWcubWluICE9PSB1bmRlZmluZWQgJiYgbmV3VmFsdWUgPCB0aGlzLmNvbmZpZy5taW4pIHtcbiAgICAgIG5ld1ZhbHVlID0gdGhpcy5jb25maWcubWluO1xuICAgIH1cbiAgICByZXR1cm4gaXNOYU4obmV3VmFsdWUpID8gJycgOiBuZXdWYWx1ZTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICBrZXlEb3duSGFuZGxlcihlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgY29uc3QgY3VycmVudFZhbHVlID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgaWYgKFxuICAgICAgLy8gQWxsb3cgc3BlY2lhbCBrZXlzXG4gICAgICBbXG4gICAgICAgIGtleWJvYXJkLkxFRlRfQVJST1csXG4gICAgICAgIGtleWJvYXJkLlJJR0hUX0FSUk9XLFxuICAgICAgICBrZXlib2FyZC5CQUNLU1BBQ0UsXG4gICAgICAgIGtleWJvYXJkLkRFTEVURSxcbiAgICAgICAga2V5Ym9hcmQuRU5ELFxuICAgICAgICBrZXlib2FyZC5FTlRFUixcbiAgICAgICAga2V5Ym9hcmQuRVNDQVBFLFxuICAgICAgICBrZXlib2FyZC5IT01FLFxuICAgICAgICBrZXlib2FyZC5UQUIsXG4gICAgICBdLmluZGV4T2YoZS5rZXlDb2RlKSAhPT0gLTFcbiAgICAgIC8vIEFsbG93IEN0cmwra2V5IGFjdGlvbnNcbiAgICAgIHx8IChcbiAgICAgICAgW1xuICAgICAgICAgIGtleWJvYXJkLkEsXG4gICAgICAgICAga2V5Ym9hcmQuQyxcbiAgICAgICAgICBrZXlib2FyZC5SLFxuICAgICAgICAgIGtleWJvYXJkLlYsXG4gICAgICAgICAga2V5Ym9hcmQuWCxcbiAgICAgICAgXS5pbmRleE9mKGUua2V5Q29kZSkgIT09IC0xXG4gICAgICAgICYmIChlLmN0cmxLZXkgPT09IHRydWUgfHwgZS5tZXRhS2V5ID09PSB0cnVlKVxuICAgICAgKVxuICAgICkge1xuICAgICAgcmV0dXJuOyAgLy8gbGV0IGl0IGhhcHBlbiwgZG9uJ3QgZG8gYW55dGhpbmdcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgbWludXNcbiAgICBpZiAoXG4gICAgICBba2V5Ym9hcmQuREFTSCwga2V5Ym9hcmQuTlVNUEFEX01JTlVTXS5pbmRleE9mKGUua2V5Q29kZSkgIT09IC0xXG4gICAgICAmJiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCA9PT0gMFxuICAgICAgJiYgKCh0aGlzLmNvbmZpZy5taW4gIT09IHVuZGVmaW5lZCAmJiB0aGlzLmNvbmZpZy5taW4gPCAwKSB8fCB0aGlzLmNvbmZpZy5taW4gPT09IHVuZGVmaW5lZClcbiAgICAgICYmICgodGhpcy5jb25maWcubWF4ICE9PSB1bmRlZmluZWQgJiYgdGhpcy5jb25maWcubWF4IDwgMCkgfHwgdGhpcy5jb25maWcubWF4ID09PSB1bmRlZmluZWQpXG4gICAgICAmJiBjdXJyZW50VmFsdWUuaW5kZXhPZignLScpID09PSAtMVxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBzZXBhcmF0b3JcbiAgICBpZiAoXG4gICAgICB0aGlzLmNvbmZpZy5wcmVjaXNpb24gPiAwXG4gICAgICAmJiBba2V5Ym9hcmQuQ09NTUEsIGtleWJvYXJkLk5VTVBBRF9QRVJJT0QsIDE5MF0uaW5kZXhPZihlLmtleUNvZGUpICE9PSAtMVxuICAgICAgJiYgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPiAwXG4gICAgICAmJiBjdXJyZW50VmFsdWUubGVuZ3RoXG4gICAgICAmJiBjdXJyZW50VmFsdWUuaW5kZXhPZih0aGlzLmNvbmZpZy5zZXBhcmF0b3IpID09PSAtMVxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBrZXkgYWZ0ZXIgc2VwYXJhdG9yXG4gICAgaWYgKFxuICAgICAgdGhpcy5jb25maWcucHJlY2lzaW9uID4gMFxuICAgICAgJiYgY3VycmVudFZhbHVlLmluZGV4T2YodGhpcy5jb25maWcuc2VwYXJhdG9yKSA+IC0xXG4gICAgICAmJiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCA+IGN1cnJlbnRWYWx1ZS5pbmRleE9mKHRoaXMuY29uZmlnLnNlcGFyYXRvcilcbiAgICApIHtcbiAgICAgIGNvbnN0IFssIGRlY2ltYWxzXSA9IGN1cnJlbnRWYWx1ZS5zcGxpdCh0aGlzLmNvbmZpZy5zZXBhcmF0b3IpO1xuICAgICAgaWYgKGRlY2ltYWxzICYmIGRlY2ltYWxzLmxlbmd0aCA+PSB0aGlzLmNvbmZpZy5wcmVjaXNpb24pIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEVuc3VyZSB0aGF0IGl0IGlzIGEgbnVtYmVyIG9yIHN0b3AgdGhlIGtleXByZXNzXG4gICAgaWYgKFxuICAgICAgKFxuICAgICAgICAoXG4gICAgICAgICAgW1xuICAgICAgICAgICAga2V5Ym9hcmQuWkVSTyxcbiAgICAgICAgICAgIGtleWJvYXJkLk9ORSxcbiAgICAgICAgICAgIGtleWJvYXJkLlRXTyxcbiAgICAgICAgICAgIGtleWJvYXJkLlRIUkVFLFxuICAgICAgICAgICAga2V5Ym9hcmQuRk9VUixcbiAgICAgICAgICAgIGtleWJvYXJkLkZJVkUsXG4gICAgICAgICAgICBrZXlib2FyZC5TSVgsXG4gICAgICAgICAgICBrZXlib2FyZC5TRVZFTixcbiAgICAgICAgICAgIGtleWJvYXJkLkVJR0hULFxuICAgICAgICAgICAga2V5Ym9hcmQuTklORVxuICAgICAgICAgIF0uaW5kZXhPZihlLmtleUNvZGUpID09PSAtMVxuICAgICAgICAgIHx8IGUuc2hpZnRLZXlcbiAgICAgICAgKVxuICAgICAgICAmJlxuICAgICAgICBbXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX1pFUk8sXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX09ORSxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfVFdPLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9USFJFRSxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfRk9VUixcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfRklWRSxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfU0lYLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9TRVZFTixcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfRUlHSFQsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX05JTkUsXG4gICAgICAgIF0uaW5kZXhPZihlLmtleUNvZGUpID09PSAtMVxuICAgICAgKVxuICAgICAgfHwgKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0ID09PSAwICYmIGN1cnJlbnRWYWx1ZS5pbmRleE9mKCctJykgPiAtMSlcbiAgICApIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkNoYW5nZXMsIE9wdGlvbmFsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIGtleWJvYXJkIGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge05nQ29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5jbGFzcyBOdW1QYWRDb25maWcge1xuICBtYXhsZW5ndGg6IG51bWJlcjtcbiAgYWxsb3dMZWFkaW5nWmVyb3MgPSBmYWxzZTtcbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2xzbk51bVBhZF0nXG59KVxuZXhwb3J0IGNsYXNzIE51bVBhZERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGxzbk51bVBhZCA9IHt9O1xuICBwcm90ZWN0ZWQgY29uZmlnOiBOdW1QYWRDb25maWc7XG4gIHByaXZhdGUgZGVmYXVsdENvbmZpZzogTnVtUGFkQ29uZmlnID0gbmV3IE51bVBhZENvbmZpZygpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZiwgQE9wdGlvbmFsKCkgcHJpdmF0ZSBuZ0NvbnRyb2w6IE5nQ29udHJvbCkge1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgdGhpcy5jb25maWcgPSBPYmplY3QuYXNzaWduKHsuLi50aGlzLmRlZmF1bHRDb25maWcsIC4uLnRoaXMubHNuTnVtUGFkfSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdpbnB1dCcsIFsnJGV2ZW50J10pXG4gIGlucHV0SGFuZGxlcigkZXZlbnQpIHtcbiAgICBjb25zdCBjdXJyZW50VmFsdWUgPSAkZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIHRoaXMuc2V0VmFsdWUodGhpcy5wYXJzZU5ld1ZhbHVlKGN1cnJlbnRWYWx1ZSkpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignYmx1cicsIFsnJGV2ZW50J10pXG4gIGJsdXJIYW5kbGVyKCRldmVudCkge1xuICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9ICRldmVudC50YXJnZXQudmFsdWU7XG4gICAgdGhpcy5zZXRWYWx1ZSh0aGlzLnBhcnNlTmV3VmFsdWUoY3VycmVudFZhbHVlLCB0cnVlKSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc2V0VmFsdWUodmFsdWUpIHtcbiAgICBpZiAodGhpcy5uZ0NvbnRyb2wgJiYgdGhpcy5uZ0NvbnRyb2wuY29udHJvbCkge1xuICAgICAgdGhpcy5uZ0NvbnRyb2wuY29udHJvbC5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIHBhcnNlTmV3VmFsdWUodmFsdWUsIGJsdXJFdmVudCA9IGZhbHNlKSB7XG4gICAgbGV0IG5ld1ZhbHVlID0gdmFsdWUucmVwbGFjZSgvW14wLTldL2csICcnKTtcbiAgICBpZiAobmV3VmFsdWUgPT09ICcnKSB7XG4gICAgICByZXR1cm4gYmx1ckV2ZW50ID8gJycgOiBuZXdWYWx1ZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY29uZmlnLm1heGxlbmd0aCAmJiB0aGlzLmNvbmZpZy5tYXhsZW5ndGggPiAwKSB7XG4gICAgICBuZXdWYWx1ZSA9IG5ld1ZhbHVlLnN1YnN0cmluZygwLCB0aGlzLmNvbmZpZy5tYXhsZW5ndGgpO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuY29uZmlnLmFsbG93TGVhZGluZ1plcm9zICYmIGJsdXJFdmVudCkge1xuICAgICAgbmV3VmFsdWUgPSBuZXdWYWx1ZS5yZXBsYWNlKC9eMCsvLCAnJyk7XG4gICAgfVxuICAgIHJldHVybiBuZXdWYWx1ZTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICBrZXlEb3duSGFuZGxlcihlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgY29uc3QgY3VycmVudFZhbHVlID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgaWYgKFxuICAgICAgLy8gQWxsb3cgc3BlY2lhbCBrZXlzXG4gICAgICBbXG4gICAgICAgIGtleWJvYXJkLkxFRlRfQVJST1csXG4gICAgICAgIGtleWJvYXJkLlJJR0hUX0FSUk9XLFxuICAgICAgICBrZXlib2FyZC5CQUNLU1BBQ0UsXG4gICAgICAgIGtleWJvYXJkLkRFTEVURSxcbiAgICAgICAga2V5Ym9hcmQuRU5ELFxuICAgICAgICBrZXlib2FyZC5FTlRFUixcbiAgICAgICAga2V5Ym9hcmQuRVNDQVBFLFxuICAgICAgICBrZXlib2FyZC5IT01FLFxuICAgICAgICBrZXlib2FyZC5UQUIsXG4gICAgICBdLmluZGV4T2YoZS5rZXlDb2RlKSAhPT0gLTFcbiAgICAgIC8vIEFsbG93IEN0cmwra2V5IGFjdGlvbnNcbiAgICAgIHx8IChcbiAgICAgICAgW1xuICAgICAgICAgIGtleWJvYXJkLkEsXG4gICAgICAgICAga2V5Ym9hcmQuQyxcbiAgICAgICAgICBrZXlib2FyZC5SLFxuICAgICAgICAgIGtleWJvYXJkLlYsXG4gICAgICAgICAga2V5Ym9hcmQuWCxcbiAgICAgICAgXS5pbmRleE9mKGUua2V5Q29kZSkgIT09IC0xXG4gICAgICAgICYmIChlLmN0cmxLZXkgPT09IHRydWUgfHwgZS5tZXRhS2V5ID09PSB0cnVlKVxuICAgICAgKVxuICAgICkge1xuICAgICAgcmV0dXJuOyAgLy8gbGV0IGl0IGhhcHBlbiwgZG9uJ3QgZG8gYW55dGhpbmdcbiAgICB9XG5cbiAgICAvLyBFbnN1cmUgdGhhdCBpdCBpcyBhIG51bWJlciBvciBzdG9wIHRoZSBrZXlwcmVzc1xuICAgIGlmIChcbiAgICAgIChcbiAgICAgICAgKFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIGtleWJvYXJkLlpFUk8sXG4gICAgICAgICAgICBrZXlib2FyZC5PTkUsXG4gICAgICAgICAgICBrZXlib2FyZC5UV08sXG4gICAgICAgICAgICBrZXlib2FyZC5USFJFRSxcbiAgICAgICAgICAgIGtleWJvYXJkLkZPVVIsXG4gICAgICAgICAgICBrZXlib2FyZC5GSVZFLFxuICAgICAgICAgICAga2V5Ym9hcmQuU0lYLFxuICAgICAgICAgICAga2V5Ym9hcmQuU0VWRU4sXG4gICAgICAgICAgICBrZXlib2FyZC5FSUdIVCxcbiAgICAgICAgICAgIGtleWJvYXJkLk5JTkVcbiAgICAgICAgICBdLmluZGV4T2YoZS5rZXlDb2RlKSA9PT0gLTFcbiAgICAgICAgICB8fCBlLnNoaWZ0S2V5XG4gICAgICAgIClcbiAgICAgICAgJiZcbiAgICAgICAgW1xuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9aRVJPLFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9PTkUsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX1RXTyxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfVEhSRUUsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX0ZPVVIsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX0ZJVkUsXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX1NJWCxcbiAgICAgICAgICBrZXlib2FyZC5OVU1QQURfU0VWRU4sXG4gICAgICAgICAga2V5Ym9hcmQuTlVNUEFEX0VJR0hULFxuICAgICAgICAgIGtleWJvYXJkLk5VTVBBRF9OSU5FLFxuICAgICAgICBdLmluZGV4T2YoZS5rZXlDb2RlKSA9PT0gLTFcbiAgICAgIClcbiAgICAgIHx8IChcbiAgICAgICAgY3VycmVudFZhbHVlLmxlbmd0aFxuICAgICAgICAmJiB0aGlzLmNvbmZpZy5tYXhsZW5ndGggJiYgdGhpcy5jb25maWcubWF4bGVuZ3RoID4gMFxuICAgICAgICAmJiBjdXJyZW50VmFsdWUubGVuZ3RoID49IHRoaXMuY29uZmlnLm1heGxlbmd0aFxuICAgICAgKVxuICAgICkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NhcGl0YWxpemVEaXJlY3RpdmV9IGZyb20gJy4vZGlyZWN0aXZlcy9jYXBpdGFsaXplL2NhcGl0YWxpemUuZGlyZWN0aXZlJztcbmltcG9ydCB7TGF0aW5Ub0dyZWVrRGlyZWN0aXZlfSBmcm9tIFwiLi9kaXJlY3RpdmVzL2xhdGluLXRvLWdyZWVrL2xhdGluLXRvLWdyZWVrLmRpcmVjdGl2ZVwiO1xuaW1wb3J0IHtOdW1lcmljRGlyZWN0aXZlfSBmcm9tICcuL2RpcmVjdGl2ZXMvbnVtZXJpYy9udW1lcmljLmRpcmVjdGl2ZSc7XG5pbXBvcnQge051bVBhZERpcmVjdGl2ZX0gZnJvbSAnLi9kaXJlY3RpdmVzL251bXBhZC9udW1wYWQuZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQ2FwaXRhbGl6ZURpcmVjdGl2ZSxcbiAgICBMYXRpblRvR3JlZWtEaXJlY3RpdmUsXG4gICAgTnVtZXJpY0RpcmVjdGl2ZSxcbiAgICBOdW1QYWREaXJlY3RpdmUsXG4gIF0sXG4gIGltcG9ydHM6IFtdLFxuICBleHBvcnRzOiBbXG4gICAgQ2FwaXRhbGl6ZURpcmVjdGl2ZSxcbiAgICBMYXRpblRvR3JlZWtEaXJlY3RpdmUsXG4gICAgTnVtZXJpY0RpcmVjdGl2ZSxcbiAgICBOdW1QYWREaXJlY3RpdmUsXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTHNuTGlic01vZHVsZSB7XG59XG4iXSwibmFtZXMiOlsiRGlyZWN0aXZlIiwiTmdNb2RlbCIsIkhvc3RMaXN0ZW5lciIsIkVsZW1lbnRSZWYiLCJrZXlib2FyZC5MRUZUX0FSUk9XIiwia2V5Ym9hcmQuUklHSFRfQVJST1ciLCJrZXlib2FyZC5CQUNLU1BBQ0UiLCJrZXlib2FyZC5ERUxFVEUiLCJrZXlib2FyZC5FTkQiLCJrZXlib2FyZC5FTlRFUiIsImtleWJvYXJkLkVTQ0FQRSIsImtleWJvYXJkLkhPTUUiLCJrZXlib2FyZC5UQUIiLCJrZXlib2FyZC5BIiwia2V5Ym9hcmQuQyIsImtleWJvYXJkLlIiLCJrZXlib2FyZC5WIiwia2V5Ym9hcmQuWCIsImtleWJvYXJkLkRBU0giLCJrZXlib2FyZC5OVU1QQURfTUlOVVMiLCJrZXlib2FyZC5DT01NQSIsImtleWJvYXJkLk5VTVBBRF9QRVJJT0QiLCJrZXlib2FyZC5aRVJPIiwia2V5Ym9hcmQuT05FIiwia2V5Ym9hcmQuVFdPIiwia2V5Ym9hcmQuVEhSRUUiLCJrZXlib2FyZC5GT1VSIiwia2V5Ym9hcmQuRklWRSIsImtleWJvYXJkLlNJWCIsImtleWJvYXJkLlNFVkVOIiwia2V5Ym9hcmQuRUlHSFQiLCJrZXlib2FyZC5OSU5FIiwia2V5Ym9hcmQuTlVNUEFEX1pFUk8iLCJrZXlib2FyZC5OVU1QQURfT05FIiwia2V5Ym9hcmQuTlVNUEFEX1RXTyIsImtleWJvYXJkLk5VTVBBRF9USFJFRSIsImtleWJvYXJkLk5VTVBBRF9GT1VSIiwia2V5Ym9hcmQuTlVNUEFEX0ZJVkUiLCJrZXlib2FyZC5OVU1QQURfU0lYIiwia2V5Ym9hcmQuTlVNUEFEX1NFVkVOIiwia2V5Ym9hcmQuTlVNUEFEX0VJR0hUIiwia2V5Ym9hcmQuTlVNUEFEX05JTkUiLCJOZ0NvbnRyb2wiLCJJbnB1dCIsIk9wdGlvbmFsIiwiTmdNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtRQVFFLDZCQUFvQixLQUFjO1lBQWQsVUFBSyxHQUFMLEtBQUssQ0FBUztTQUNqQzs7Ozs7UUFHRCwyQ0FBYTs7OztZQURiLFVBQ2MsTUFBTTtnQkFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7YUFDakU7O29CQVhGQSxjQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFFLDBCQUEwQjt3QkFDcEMsU0FBUyxFQUFFLENBQUNDLGFBQU8sQ0FBQztxQkFDckI7Ozs7O3dCQUxPQSxhQUFPOzs7O29DQVVaQyxpQkFBWSxTQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7UUFLM0MsMEJBQUM7S0FiRDs7Ozs7O0FDSEE7UUF1Q0UsK0JBQW9C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