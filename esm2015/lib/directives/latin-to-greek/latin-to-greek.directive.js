/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgModel } from '@angular/forms';
export class LatinToGreekDirective {
    /**
     * @param {?} model
     * @param {?} el
     */
    constructor(model, el) {
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
    getCaret() {
        return {
            start: this.el.nativeElement.selectionStart,
            end: this.el.nativeElement.selectionEnd,
        };
    }
    /**
     * @private
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    setCaret(start, end) {
        this.el.nativeElement.selectionStart = start;
        this.el.nativeElement.selectionEnd = end;
        this.el.nativeElement.focus();
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onInputChange($event) {
        const { start, end } = this.getCaret();
        /** @type {?} */
        let translated = $event.toLocaleUpperCase();
        this.latinToGreek.forEach(replace => {
            translated = translated.replace(replace[0], replace[1]);
        });
        this.model.valueAccessor.writeValue(translated);
        this.setCaret(start, end);
    }
}
LatinToGreekDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngModel][lsnLatinToGreek]',
                providers: [NgModel]
            },] }
];
/** @nocollapse */
LatinToGreekDirective.ctorParameters = () => [
    { type: NgModel },
    { type: ElementRef }
];
LatinToGreekDirective.propDecorators = {
    onInputChange: [{ type: HostListener, args: ['ngModelChange', ['$event'],] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF0aW4tdG8tZ3JlZWsuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL2xhdGluLXRvLWdyZWVrL2xhdGluLXRvLWdyZWVrLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2xFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQU92QyxNQUFNLE9BQU8scUJBQXFCOzs7OztJQStCaEMsWUFBb0IsS0FBYyxFQUFVLEVBQWM7UUFBdEMsVUFBSyxHQUFMLEtBQUssQ0FBUztRQUFVLE9BQUUsR0FBRixFQUFFLENBQVk7UUE3QmxELGlCQUFZLEdBQUc7WUFDckIsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1NBQ2IsQ0FBQztJQUdGLENBQUM7Ozs7O0lBRU8sUUFBUTtRQUNkLE9BQU87WUFDTCxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsY0FBYztZQUMzQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsWUFBWTtTQUN4QyxDQUFDO0lBQ0osQ0FBQzs7Ozs7OztJQUVPLFFBQVEsQ0FBQyxLQUFLLEVBQUUsR0FBRztRQUN6QixJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBQzdDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7UUFDekMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDaEMsQ0FBQzs7Ozs7SUFJRCxhQUFhLENBQUMsTUFBTTtjQUNaLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBQyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUU7O1lBRWhDLFVBQVUsR0FBRyxNQUFNLENBQUMsaUJBQWlCLEVBQUU7UUFDM0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDbEMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFELENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzVCLENBQUM7OztZQTlERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDRCQUE0QjtnQkFDdEMsU0FBUyxFQUFFLENBQUMsT0FBTyxDQUFDO2FBQ3JCOzs7O1lBTk8sT0FBTztZQURJLFVBQVU7Ozs0QkF3RDFCLFlBQVksU0FBQyxlQUFlLEVBQUUsQ0FBQyxRQUFRLENBQUM7Ozs7Ozs7SUE5Q3pDLDZDQTJCRTs7Ozs7SUFFVSxzQ0FBc0I7Ozs7O0lBQUUsbUNBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05nTW9kZWx9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbmdNb2RlbF1bbHNuTGF0aW5Ub0dyZWVrXScsXG4gIHByb3ZpZGVyczogW05nTW9kZWxdXG59KVxuZXhwb3J0IGNsYXNzIExhdGluVG9HcmVla0RpcmVjdGl2ZSB7XG5cbiAgcHJpdmF0ZSBsYXRpblRvR3JlZWsgPSBbXG4gICAgWy9BL2lnLCAnzpEnXSxcbiAgICBbL0IvaWcsICfOkiddLFxuICAgIFsvRy9pZywgJ86TJ10sXG4gICAgWy9EL2lnLCAnzpQnXSxcbiAgICBbL0UvaWcsICfOlSddLFxuICAgIFsvWi9pZywgJ86WJ10sXG4gICAgWy9IL2lnLCAnzpcnXSxcbiAgICBbL1UvaWcsICfOmCddLFxuICAgIFsvSS9pZywgJ86ZJ10sXG4gICAgWy9LL2lnLCAnzponXSxcbiAgICBbL0wvaWcsICfOmyddLFxuICAgIFsvTS9pZywgJ86cJ10sXG4gICAgWy9OL2lnLCAnzp0nXSxcbiAgICBbL0ovaWcsICfOniddLFxuICAgIFsvTy9pZywgJ86fJ10sXG4gICAgWy9QL2lnLCAnzqAnXSxcbiAgICBbL1IvaWcsICfOoSddLFxuICAgIFsvUy9pZywgJ86jJ10sXG4gICAgWy9UL2lnLCAnzqQnXSxcbiAgICBbL1kvaWcsICfOpSddLFxuICAgIFsvRi9pZywgJ86mJ10sXG4gICAgWy9YL2lnLCAnzqcnXSxcbiAgICBbL0MvaWcsICfOqCddLFxuICAgIFsvVi9pZywgJ86pJ10sXG4gICAgWy9XL2lnLCAnVyddLFxuICAgIFsvUS9pZywgJ1EnXVxuICBdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbW9kZWw6IE5nTW9kZWwsIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q2FyZXQoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXJ0OiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQsXG4gICAgICBlbmQ6IHRoaXMuZWwubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25FbmQsXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0Q2FyZXQoc3RhcnQsIGVuZCkge1xuICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCA9IHN0YXJ0O1xuICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25FbmQgPSBlbmQ7XG4gICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gIH1cblxuXG4gIEBIb3N0TGlzdGVuZXIoJ25nTW9kZWxDaGFuZ2UnLCBbJyRldmVudCddKVxuICBvbklucHV0Q2hhbmdlKCRldmVudCkge1xuICAgIGNvbnN0IHtzdGFydCwgZW5kfSA9IHRoaXMuZ2V0Q2FyZXQoKTtcblxuICAgIGxldCB0cmFuc2xhdGVkID0gJGV2ZW50LnRvTG9jYWxlVXBwZXJDYXNlKCk7XG4gICAgdGhpcy5sYXRpblRvR3JlZWsuZm9yRWFjaChyZXBsYWNlID0+IHtcbiAgICAgIHRyYW5zbGF0ZWQgPSB0cmFuc2xhdGVkLnJlcGxhY2UocmVwbGFjZVswXSwgcmVwbGFjZVsxXSk7XG4gICAgfSk7XG4gICAgdGhpcy5tb2RlbC52YWx1ZUFjY2Vzc29yLndyaXRlVmFsdWUodHJhbnNsYXRlZCk7XG4gICAgdGhpcy5zZXRDYXJldChzdGFydCwgZW5kKTtcbiAgfVxuXG59XG4iXX0=