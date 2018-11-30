/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgModel } from '@angular/forms';
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
        var translated = $event;
        this.latinToGreek.forEach(function (replace) {
            translated = translated.replace(replace[0], replace[1]);
        });
        this.model.valueAccessor.writeValue(translated);
        this.setCaret(start, end);
    };
    LatinToGreekDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[ngModel][lsnLatinToGreek]',
                    providers: [NgModel]
                },] }
    ];
    /** @nocollapse */
    LatinToGreekDirective.ctorParameters = function () { return [
        { type: NgModel },
        { type: ElementRef }
    ]; };
    LatinToGreekDirective.propDecorators = {
        onInputChange: [{ type: HostListener, args: ['ngModelChange', ['$event'],] }]
    };
    return LatinToGreekDirective;
}());
export { LatinToGreekDirective };
if (false) {
    /**
     * @type {?}
     * @private
     */
    LatinToGreekDirective.prototype.latinToGreek;
    /**
     * @type {?}
     * @private
     */
    LatinToGreekDirective.prototype.model;
    /**
     * @type {?}
     * @private
     */
    LatinToGreekDirective.prototype.el;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF0aW4tdG8tZ3JlZWsuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL2xhdGluLXRvLWdyZWVrL2xhdGluLXRvLWdyZWVrLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2xFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUd2QztJQW1DRSwrQkFBb0IsS0FBYyxFQUFVLEVBQWM7UUFBdEMsVUFBSyxHQUFMLEtBQUssQ0FBUztRQUFVLE9BQUUsR0FBRixFQUFFLENBQVk7UUE3QmxELGlCQUFZLEdBQUc7WUFDckIsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1NBQ2IsQ0FBQztJQUdGLENBQUM7Ozs7O0lBRU8sd0NBQVE7Ozs7SUFBaEI7UUFDRSxPQUFPO1lBQ0wsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLGNBQWM7WUFDM0MsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFlBQVk7U0FDeEMsQ0FBQztJQUNKLENBQUM7Ozs7Ozs7SUFFTyx3Q0FBUTs7Ozs7O0lBQWhCLFVBQWlCLEtBQUssRUFBRSxHQUFHO1FBQ3pCLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDN0MsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztRQUN6QyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNoQyxDQUFDOzs7OztJQUlELDZDQUFhOzs7O0lBRGIsVUFDYyxNQUFNO1FBQ1osSUFBQSxvQkFBOEIsRUFBN0IsZ0JBQUssRUFBRSxZQUFzQjs7WUFFaEMsVUFBVSxHQUFHLE1BQU07UUFDdkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPO1lBQy9CLFVBQVUsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxRCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM1QixDQUFDOztnQkE5REYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSw0QkFBNEI7b0JBQ3RDLFNBQVMsRUFBRSxDQUFDLE9BQU8sQ0FBQztpQkFDckI7Ozs7Z0JBTk8sT0FBTztnQkFESSxVQUFVOzs7Z0NBd0QxQixZQUFZLFNBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDOztJQVkzQyw0QkFBQztDQUFBLEFBaEVELElBZ0VDO1NBNURZLHFCQUFxQjs7Ozs7O0lBRWhDLDZDQTJCRTs7Ozs7SUFFVSxzQ0FBc0I7Ozs7O0lBQUUsbUNBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05nTW9kZWx9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbmdNb2RlbF1bbHNuTGF0aW5Ub0dyZWVrXScsXG4gIHByb3ZpZGVyczogW05nTW9kZWxdXG59KVxuZXhwb3J0IGNsYXNzIExhdGluVG9HcmVla0RpcmVjdGl2ZSB7XG5cbiAgcHJpdmF0ZSBsYXRpblRvR3JlZWsgPSBbXG4gICAgWy9BL2lnLCAnzpEnXSxcbiAgICBbL0IvaWcsICfOkiddLFxuICAgIFsvRy9pZywgJ86TJ10sXG4gICAgWy9EL2lnLCAnzpQnXSxcbiAgICBbL0UvaWcsICfOlSddLFxuICAgIFsvWi9pZywgJ86WJ10sXG4gICAgWy9IL2lnLCAnzpcnXSxcbiAgICBbL1UvaWcsICfOmCddLFxuICAgIFsvSS9pZywgJ86ZJ10sXG4gICAgWy9LL2lnLCAnzponXSxcbiAgICBbL0wvaWcsICfOmyddLFxuICAgIFsvTS9pZywgJ86cJ10sXG4gICAgWy9OL2lnLCAnzp0nXSxcbiAgICBbL0ovaWcsICfOniddLFxuICAgIFsvTy9pZywgJ86fJ10sXG4gICAgWy9QL2lnLCAnzqAnXSxcbiAgICBbL1IvaWcsICfOoSddLFxuICAgIFsvUy9pZywgJ86jJ10sXG4gICAgWy9UL2lnLCAnzqQnXSxcbiAgICBbL1kvaWcsICfOpSddLFxuICAgIFsvRi9pZywgJ86mJ10sXG4gICAgWy9YL2lnLCAnzqcnXSxcbiAgICBbL0MvaWcsICfOqCddLFxuICAgIFsvVi9pZywgJ86pJ10sXG4gICAgWy9XL2lnLCAnVyddLFxuICAgIFsvUS9pZywgJ1EnXVxuICBdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbW9kZWw6IE5nTW9kZWwsIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q2FyZXQoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXJ0OiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQsXG4gICAgICBlbmQ6IHRoaXMuZWwubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25FbmQsXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0Q2FyZXQoc3RhcnQsIGVuZCkge1xuICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCA9IHN0YXJ0O1xuICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25FbmQgPSBlbmQ7XG4gICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gIH1cblxuXG4gIEBIb3N0TGlzdGVuZXIoJ25nTW9kZWxDaGFuZ2UnLCBbJyRldmVudCddKVxuICBvbklucHV0Q2hhbmdlKCRldmVudCkge1xuICAgIGNvbnN0IHtzdGFydCwgZW5kfSA9IHRoaXMuZ2V0Q2FyZXQoKTtcblxuICAgIGxldCB0cmFuc2xhdGVkID0gJGV2ZW50O1xuICAgIHRoaXMubGF0aW5Ub0dyZWVrLmZvckVhY2gocmVwbGFjZSA9PiB7XG4gICAgICB0cmFuc2xhdGVkID0gdHJhbnNsYXRlZC5yZXBsYWNlKHJlcGxhY2VbMF0sIHJlcGxhY2VbMV0pO1xuICAgIH0pO1xuICAgIHRoaXMubW9kZWwudmFsdWVBY2Nlc3Nvci53cml0ZVZhbHVlKHRyYW5zbGF0ZWQpO1xuICAgIHRoaXMuc2V0Q2FyZXQoc3RhcnQsIGVuZCk7XG4gIH1cblxufVxuIl19