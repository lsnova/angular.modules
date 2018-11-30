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
        let translated = $event;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF0aW4tdG8tZ3JlZWsuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL2xhdGluLXRvLWdyZWVrL2xhdGluLXRvLWdyZWVrLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2xFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQU92QyxNQUFNLE9BQU8scUJBQXFCOzs7OztJQStCaEMsWUFBb0IsS0FBYyxFQUFVLEVBQWM7UUFBdEMsVUFBSyxHQUFMLEtBQUssQ0FBUztRQUFVLE9BQUUsR0FBRixFQUFFLENBQVk7UUE3QmxELGlCQUFZLEdBQUc7WUFDckIsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1NBQ2IsQ0FBQztJQUdGLENBQUM7Ozs7O0lBRU8sUUFBUTtRQUNkLE9BQU87WUFDTCxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsY0FBYztZQUMzQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsWUFBWTtTQUN4QyxDQUFDO0lBQ0osQ0FBQzs7Ozs7OztJQUVPLFFBQVEsQ0FBQyxLQUFLLEVBQUUsR0FBRztRQUN6QixJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBQzdDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7UUFDekMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDaEMsQ0FBQzs7Ozs7SUFJRCxhQUFhLENBQUMsTUFBTTtjQUNaLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBQyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUU7O1lBRWhDLFVBQVUsR0FBRyxNQUFNO1FBQ3ZCLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ2xDLFVBQVUsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxRCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM1QixDQUFDOzs7WUE5REYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSw0QkFBNEI7Z0JBQ3RDLFNBQVMsRUFBRSxDQUFDLE9BQU8sQ0FBQzthQUNyQjs7OztZQU5PLE9BQU87WUFESSxVQUFVOzs7NEJBd0QxQixZQUFZLFNBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDOzs7Ozs7O0lBOUN6Qyw2Q0EyQkU7Ozs7O0lBRVUsc0NBQXNCOzs7OztJQUFFLG1DQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ01vZGVsfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW25nTW9kZWxdW2xzbkxhdGluVG9HcmVla10nLFxuICBwcm92aWRlcnM6IFtOZ01vZGVsXVxufSlcbmV4cG9ydCBjbGFzcyBMYXRpblRvR3JlZWtEaXJlY3RpdmUge1xuXG4gIHByaXZhdGUgbGF0aW5Ub0dyZWVrID0gW1xuICAgIFsvQS9pZywgJ86RJ10sXG4gICAgWy9CL2lnLCAnzpInXSxcbiAgICBbL0cvaWcsICfOkyddLFxuICAgIFsvRC9pZywgJ86UJ10sXG4gICAgWy9FL2lnLCAnzpUnXSxcbiAgICBbL1ovaWcsICfOliddLFxuICAgIFsvSC9pZywgJ86XJ10sXG4gICAgWy9VL2lnLCAnzpgnXSxcbiAgICBbL0kvaWcsICfOmSddLFxuICAgIFsvSy9pZywgJ86aJ10sXG4gICAgWy9ML2lnLCAnzpsnXSxcbiAgICBbL00vaWcsICfOnCddLFxuICAgIFsvTi9pZywgJ86dJ10sXG4gICAgWy9KL2lnLCAnzp4nXSxcbiAgICBbL08vaWcsICfOnyddLFxuICAgIFsvUC9pZywgJ86gJ10sXG4gICAgWy9SL2lnLCAnzqEnXSxcbiAgICBbL1MvaWcsICfOoyddLFxuICAgIFsvVC9pZywgJ86kJ10sXG4gICAgWy9ZL2lnLCAnzqUnXSxcbiAgICBbL0YvaWcsICfOpiddLFxuICAgIFsvWC9pZywgJ86nJ10sXG4gICAgWy9DL2lnLCAnzqgnXSxcbiAgICBbL1YvaWcsICfOqSddLFxuICAgIFsvVy9pZywgJ1cnXSxcbiAgICBbL1EvaWcsICdRJ11cbiAgXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1vZGVsOiBOZ01vZGVsLCBwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7XG4gIH1cblxuICBwcml2YXRlIGdldENhcmV0KCkge1xuICAgIHJldHVybiB7XG4gICAgICBzdGFydDogdGhpcy5lbC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0LFxuICAgICAgZW5kOiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uRW5kLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIHNldENhcmV0KHN0YXJ0LCBlbmQpIHtcbiAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPSBzdGFydDtcbiAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uRW5kID0gZW5kO1xuICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICB9XG5cblxuICBASG9zdExpc3RlbmVyKCduZ01vZGVsQ2hhbmdlJywgWyckZXZlbnQnXSlcbiAgb25JbnB1dENoYW5nZSgkZXZlbnQpIHtcbiAgICBjb25zdCB7c3RhcnQsIGVuZH0gPSB0aGlzLmdldENhcmV0KCk7XG5cbiAgICBsZXQgdHJhbnNsYXRlZCA9ICRldmVudDtcbiAgICB0aGlzLmxhdGluVG9HcmVlay5mb3JFYWNoKHJlcGxhY2UgPT4ge1xuICAgICAgdHJhbnNsYXRlZCA9IHRyYW5zbGF0ZWQucmVwbGFjZShyZXBsYWNlWzBdLCByZXBsYWNlWzFdKTtcbiAgICB9KTtcbiAgICB0aGlzLm1vZGVsLnZhbHVlQWNjZXNzb3Iud3JpdGVWYWx1ZSh0cmFuc2xhdGVkKTtcbiAgICB0aGlzLnNldENhcmV0KHN0YXJ0LCBlbmQpO1xuICB9XG5cbn1cbiJdfQ==