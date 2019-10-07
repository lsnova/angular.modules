/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, tap } from 'rxjs/operators';
var ScrollSpyDirective = /** @class */ (function () {
    function ScrollSpyDirective(elementRef) {
        this.elementRef = elementRef;
        this.spySectionChange = new EventEmitter();
        this.disableEmitter = false;
        this.subscriptions = [];
        this.currentSection$ = new Subject();
    }
    /**
     * @return {?}
     */
    ScrollSpyDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.scrollOffset = this.nativeElement().offsetTop;
        // emit event on section change
        /** @type {?} */
        var sectionChangeSub = this.currentSection$.pipe(distinctUntilChanged(), tap(function (sectionId) { return _this.spySectionChange.emit(sectionId); })).subscribe();
        // scroll to given section
        /** @type {?} */
        var scrollToSub = this.scrollToSection.pipe(filter(function (section) { return !!section; }), tap(function (section) { return _this.scrollTo(section); })).subscribe();
        this.subscriptions.push(sectionChangeSub, scrollToSub);
    };
    /**
     * @private
     * @return {?}
     */
    ScrollSpyDirective.prototype.onScroll = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var section = this.findCurrentSection();
        if (section) {
            this.setCurrentSection(section.id);
        }
    };
    /**
     * @private
     * @return {?}
     */
    ScrollSpyDirective.prototype.onResize = /**
     * @private
     * @return {?}
     */
    function () {
        this.onScroll();
    };
    /**
     * @private
     * @param {?} sectionId
     * @return {?}
     */
    ScrollSpyDirective.prototype.scrollTo = /**
     * @private
     * @param {?} sectionId
     * @return {?}
     */
    function (sectionId) {
        var _this = this;
        this.disableEmitter = true;
        this.nativeElement().querySelector('#' + sectionId).scrollIntoView();
        // set timeout to enforce scroll event execute before enabling back the emitter
        setTimeout(function () {
            _this.disableEmitter = false;
        }, 0);
    };
    /**
     * @private
     * @return {?}
     */
    ScrollSpyDirective.prototype.findCurrentSection = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var scrollMiddle = (this.scrollTopPosition() + this.scrollBottomPosition()) / 2;
        /** @type {?} */
        var spiedSections = this.getSpiedSections();
        return spiedSections.find(function (section) { return _this.isCurrentSection(section, scrollMiddle); });
    };
    /**
     * @private
     * @return {?}
     */
    ScrollSpyDirective.prototype.getSpiedSections = /**
     * @private
     * @return {?}
     */
    function () {
        return Array.from(this.nativeElement().querySelectorAll(this.spySelector));
    };
    /**
     * @private
     * @param {?} section
     * @param {?} scrollMiddle
     * @return {?}
     */
    ScrollSpyDirective.prototype.isCurrentSection = /**
     * @private
     * @param {?} section
     * @param {?} scrollMiddle
     * @return {?}
     */
    function (section, scrollMiddle) {
        return this.sectionTopPosition(section) <= scrollMiddle
            && this.sectionBottomPosition(section) > scrollMiddle;
    };
    /**
     * @private
     * @param {?} sectionId
     * @return {?}
     */
    ScrollSpyDirective.prototype.setCurrentSection = /**
     * @private
     * @param {?} sectionId
     * @return {?}
     */
    function (sectionId) {
        if (!this.disableEmitter) {
            this.currentSection$.next(sectionId);
        }
    };
    /**
     * @private
     * @param {?} section
     * @return {?}
     */
    ScrollSpyDirective.prototype.sectionTopPosition = /**
     * @private
     * @param {?} section
     * @return {?}
     */
    function (section) {
        return section.offsetTop;
    };
    /**
     * @private
     * @param {?} section
     * @return {?}
     */
    ScrollSpyDirective.prototype.sectionBottomPosition = /**
     * @private
     * @param {?} section
     * @return {?}
     */
    function (section) {
        return section.offsetTop + section.offsetHeight;
    };
    /**
     * @private
     * @return {?}
     */
    ScrollSpyDirective.prototype.scrollTopPosition = /**
     * @private
     * @return {?}
     */
    function () {
        return this.scrollOffset + this.nativeElement().scrollTop;
    };
    /**
     * @private
     * @return {?}
     */
    ScrollSpyDirective.prototype.scrollBottomPosition = /**
     * @private
     * @return {?}
     */
    function () {
        return this.scrollOffset + this.nativeElement().scrollTop + this.nativeElement().offsetHeight;
    };
    /**
     * @private
     * @return {?}
     */
    ScrollSpyDirective.prototype.nativeElement = /**
     * @private
     * @return {?}
     */
    function () {
        return this.elementRef.nativeElement;
    };
    /**
     * @return {?}
     */
    ScrollSpyDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    ScrollSpyDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[lsnScrollSpy]'
                },] }
    ];
    /** @nocollapse */
    ScrollSpyDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    ScrollSpyDirective.propDecorators = {
        spySelector: [{ type: Input }],
        scrollToSection: [{ type: Input }],
        spySectionChange: [{ type: Output }],
        onScroll: [{ type: HostListener, args: ['scroll',] }],
        onResize: [{ type: HostListener, args: ['window:resize',] }]
    };
    return ScrollSpyDirective;
}());
export { ScrollSpyDirective };
if (false) {
    /** @type {?} */
    ScrollSpyDirective.prototype.spySelector;
    /** @type {?} */
    ScrollSpyDirective.prototype.scrollToSection;
    /** @type {?} */
    ScrollSpyDirective.prototype.spySectionChange;
    /**
     * @type {?}
     * @private
     */
    ScrollSpyDirective.prototype.scrollOffset;
    /**
     * @type {?}
     * @private
     */
    ScrollSpyDirective.prototype.currentSection$;
    /**
     * @type {?}
     * @private
     */
    ScrollSpyDirective.prototype.disableEmitter;
    /** @type {?} */
    ScrollSpyDirective.prototype.subscriptions;
    /**
     * @type {?}
     * @private
     */
    ScrollSpyDirective.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLXNweS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbHNub3ZhL2FuZ3VsYXJtb2R1bGVzLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvc2Nyb2xsLXNweS9zY3JvbGwtc3B5LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDekQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVuRTtJQW9CRSw0QkFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQVIxQyxxQkFBZ0IsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBSXRDLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBRS9CLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztRQUdqQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFDdkMsQ0FBQzs7OztJQUVELHFDQUFROzs7SUFBUjtRQUFBLGlCQWdCQztRQWZDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLFNBQVMsQ0FBQzs7O1lBRzdDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUNoRCxvQkFBb0IsRUFBRSxFQUN0QixHQUFHLENBQUMsVUFBQyxTQUFTLElBQUssT0FBQSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFyQyxDQUFxQyxDQUFDLENBQzFELENBQUMsU0FBUyxFQUFFOzs7WUFHUCxXQUFXLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJ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RyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxZQUFZLENBQUM7SUFDaEcsQ0FBQzs7Ozs7SUFFTywwQ0FBYTs7OztJQUFyQjtRQUNFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7SUFDdkMsQ0FBQzs7OztJQUVELHdDQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFqQixDQUFpQixDQUFDLENBQUM7SUFDdkQsQ0FBQzs7Z0JBN0dGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2lCQUMzQjs7OztnQkFObUIsVUFBVTs7OzhCQVMzQixLQUFLO2tDQUdMLEtBQUs7bUNBR0wsTUFBTTsyQkErQk4sWUFBWSxTQUFDLFFBQVE7MkJBUXJCLFlBQVksU0FBQyxlQUFlOztJQTREL0IseUJBQUM7Q0FBQSxBQTlHRCxJQThHQztTQTNHWSxrQkFBa0I7OztJQUU3Qix5Q0FDb0I7O0lBRXBCLDZDQUNvQzs7SUFFcEMsOENBQzhDOzs7OztJQUU5QywwQ0FBNkI7Ozs7O0lBQzdCLDZDQUF5Qzs7Ozs7SUFDekMsNENBQStCOztJQUUvQiwyQ0FBbUM7Ozs7O0lBRXZCLHdDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBmaWx0ZXIsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2xzblNjcm9sbFNweV0nXG59KVxuZXhwb3J0IGNsYXNzIFNjcm9sbFNweURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICBASW5wdXQoKVxuICBzcHlTZWxlY3Rvcjogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHNjcm9sbFRvU2VjdGlvbjogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuXG4gIEBPdXRwdXQoKVxuICBzcHlTZWN0aW9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgcHJpdmF0ZSBzY3JvbGxPZmZzZXQ6IG51bWJlcjtcbiAgcHJpdmF0ZSBjdXJyZW50U2VjdGlvbiQ6IFN1YmplY3Q8c3RyaW5nPjtcbiAgcHJpdmF0ZSBkaXNhYmxlRW1pdHRlciA9IGZhbHNlO1xuXG4gIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5jdXJyZW50U2VjdGlvbiQgPSBuZXcgU3ViamVjdCgpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zY3JvbGxPZmZzZXQgPSB0aGlzLm5hdGl2ZUVsZW1lbnQoKS5vZmZzZXRUb3A7XG5cbiAgICAvLyBlbWl0IGV2ZW50IG9uIHNlY3Rpb24gY2hhbmdlXG4gICAgY29uc3Qgc2VjdGlvbkNoYW5nZVN1YiA9IHRoaXMuY3VycmVudFNlY3Rpb24kLnBpcGUoXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgdGFwKChzZWN0aW9uSWQpID0+IHRoaXMuc3B5U2VjdGlvbkNoYW5nZS5lbWl0KHNlY3Rpb25JZCkpXG4gICAgKS5zdWJzY3JpYmUoKTtcblxuICAgIC8vIHNjcm9sbCB0byBnaXZlbiBzZWN0aW9uXG4gICAgY29uc3Qgc2Nyb2xsVG9TdWIgPSB0aGlzLnNjcm9sbFRvU2VjdGlvbi5waXBlKFxuICAgICAgZmlsdGVyKChzZWN0aW9uKSA9PiAhIXNlY3Rpb24pLFxuICAgICAgdGFwKChzZWN0aW9uKSA9PiB0aGlzLnNjcm9sbFRvKHNlY3Rpb24pKVxuICAgICkuc3Vic2NyaWJlKCk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChzZWN0aW9uQ2hhbmdlU3ViLCBzY3JvbGxUb1N1Yik7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdzY3JvbGwnKVxuICBwcml2YXRlIG9uU2Nyb2xsKCkge1xuICAgIGNvbnN0IHNlY3Rpb246IEhUTUxFbGVtZW50ID0gdGhpcy5maW5kQ3VycmVudFNlY3Rpb24oKTtcbiAgICBpZiAoc2VjdGlvbikge1xuICAgICAgdGhpcy5zZXRDdXJyZW50U2VjdGlvbihzZWN0aW9uLmlkKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJylcbiAgcHJpdmF0ZSBvblJlc2l6ZSgpIHtcbiAgICB0aGlzLm9uU2Nyb2xsKCk7XG4gIH1cblxuICBwcml2YXRlIHNjcm9sbFRvKHNlY3Rpb25JZCkge1xuICAgIHRoaXMuZGlzYWJsZUVtaXR0ZXIgPSB0cnVlO1xuXG4gICAgdGhpcy5uYXRpdmVFbGVtZW50KCkucXVlcnlTZWxlY3RvcignIycgKyBzZWN0aW9uSWQpLnNjcm9sbEludG9WaWV3KCk7XG5cbiAgICAvLyBzZXQgdGltZW91dCB0byBlbmZvcmNlIHNjcm9sbCBldmVudCBleGVjdXRlIGJlZm9yZSBlbmFibGluZyBiYWNrIHRoZSBlbWl0dGVyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmRpc2FibGVFbWl0dGVyID0gZmFsc2U7XG4gICAgfSwgMCk7XG4gIH1cblxuICBwcml2YXRlIGZpbmRDdXJyZW50U2VjdGlvbigpOiBIVE1MRWxlbWVudCB7XG4gICAgY29uc3Qgc2Nyb2xsTWlkZGxlID0gKHRoaXMuc2Nyb2xsVG9wUG9zaXRpb24oKSArIHRoaXMuc2Nyb2xsQm90dG9tUG9zaXRpb24oKSkgLyAyO1xuICAgIGNvbnN0IHNwaWVkU2VjdGlvbnMgPSB0aGlzLmdldFNwaWVkU2VjdGlvbnMoKTtcbiAgICByZXR1cm4gc3BpZWRTZWN0aW9ucy5maW5kKChzZWN0aW9uKSA9PiB0aGlzLmlzQ3VycmVudFNlY3Rpb24oc2VjdGlvbiwgc2Nyb2xsTWlkZGxlKSk7XG4gIH1cblxuICBwcml2YXRlIGdldFNwaWVkU2VjdGlvbnMoKTogSFRNTEVsZW1lbnRbXSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5uYXRpdmVFbGVtZW50KCkucXVlcnlTZWxlY3RvckFsbCh0aGlzLnNweVNlbGVjdG9yKSk7XG4gIH1cblxuICBwcml2YXRlIGlzQ3VycmVudFNlY3Rpb24oc2VjdGlvbjogSFRNTEVsZW1lbnQsIHNjcm9sbE1pZGRsZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2VjdGlvblRvcFBvc2l0aW9uKHNlY3Rpb24pIDw9IHNjcm9sbE1pZGRsZVxuICAgICAgJiYgdGhpcy5zZWN0aW9uQm90dG9tUG9zaXRpb24oc2VjdGlvbikgPiBzY3JvbGxNaWRkbGU7XG4gIH1cblxuICBwcml2YXRlIHNldEN1cnJlbnRTZWN0aW9uKHNlY3Rpb25JZDogc3RyaW5nKSB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVFbWl0dGVyKSB7XG4gICAgICB0aGlzLmN1cnJlbnRTZWN0aW9uJC5uZXh0KHNlY3Rpb25JZCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZWN0aW9uVG9wUG9zaXRpb24oc2VjdGlvbjogSFRNTEVsZW1lbnQpIHtcbiAgICByZXR1cm4gc2VjdGlvbi5vZmZzZXRUb3A7XG4gIH1cblxuICBwcml2YXRlIHNlY3Rpb25Cb3R0b21Qb3NpdGlvbihzZWN0aW9uOiBIVE1MRWxlbWVudCkge1xuICAgIHJldHVybiBzZWN0aW9uLm9mZnNldFRvcCArIHNlY3Rpb24ub2Zmc2V0SGVpZ2h0O1xuICB9XG5cbiAgcHJpdmF0ZSBzY3JvbGxUb3BQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5zY3JvbGxPZmZzZXQgKyB0aGlzLm5hdGl2ZUVsZW1lbnQoKS5zY3JvbGxUb3A7XG4gIH1cblxuICBwcml2YXRlIHNjcm9sbEJvdHRvbVBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnNjcm9sbE9mZnNldCArIHRoaXMubmF0aXZlRWxlbWVudCgpLnNjcm9sbFRvcCArIHRoaXMubmF0aXZlRWxlbWVudCgpLm9mZnNldEhlaWdodDtcbiAgfVxuXG4gIHByaXZhdGUgbmF0aXZlRWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxufVxuIl19