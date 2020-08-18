/**
 * @fileoverview added by tsickle
 * Generated from: lib/directives/scroll-spy/scroll-spy.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, tap } from 'rxjs/operators';
export class ScrollSpyDirective {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.spySectionChange = new EventEmitter();
        this.disableEmitter = false;
        this.subscriptions = [];
        this.currentSection$ = new Subject();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.scrollOffset = this.nativeElement().offsetTop;
        // emit event on section change
        /** @type {?} */
        const sectionChangeSub = this.currentSection$.pipe(distinctUntilChanged(), tap((/**
         * @param {?} sectionId
         * @return {?}
         */
        (sectionId) => this.spySectionChange.emit(sectionId)))).subscribe();
        // scroll to given section
        /** @type {?} */
        const scrollToSub = this.scrollToSection.pipe(filter((/**
         * @param {?} section
         * @return {?}
         */
        (section) => !!section)), tap((/**
         * @param {?} section
         * @return {?}
         */
        (section) => this.scrollTo(section)))).subscribe();
        this.subscriptions.push(sectionChangeSub, scrollToSub);
    }
    /**
     * @return {?}
     */
    onScroll() {
        /** @type {?} */
        const section = this.findCurrentSection();
        if (section) {
            this.setCurrentSection(section.id);
        }
    }
    /**
     * @return {?}
     */
    onResize() {
        this.onScroll();
    }
    /**
     * @private
     * @param {?} sectionId
     * @return {?}
     */
    scrollTo(sectionId) {
        this.disableEmitter = true;
        this.nativeElement().querySelector('#' + sectionId).scrollIntoView();
        // set timeout to enforce scroll event execute before enabling back the emitter
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.disableEmitter = false;
        }), 0);
    }
    /**
     * @private
     * @return {?}
     */
    findCurrentSection() {
        /** @type {?} */
        const scrollMiddle = (this.scrollTopPosition() + this.scrollBottomPosition()) / 2;
        /** @type {?} */
        const spiedSections = this.getSpiedSections();
        return spiedSections.find((/**
         * @param {?} section
         * @return {?}
         */
        (section) => this.isCurrentSection(section, scrollMiddle)));
    }
    /**
     * @private
     * @return {?}
     */
    getSpiedSections() {
        return Array.from(this.nativeElement().querySelectorAll(this.spySelector));
    }
    /**
     * @private
     * @param {?} section
     * @param {?} scrollMiddle
     * @return {?}
     */
    isCurrentSection(section, scrollMiddle) {
        return this.sectionTopPosition(section) <= scrollMiddle
            && this.sectionBottomPosition(section) > scrollMiddle;
    }
    /**
     * @private
     * @param {?} sectionId
     * @return {?}
     */
    setCurrentSection(sectionId) {
        if (!this.disableEmitter) {
            this.currentSection$.next(sectionId);
        }
    }
    /**
     * @private
     * @param {?} section
     * @return {?}
     */
    sectionTopPosition(section) {
        return section.offsetTop;
    }
    /**
     * @private
     * @param {?} section
     * @return {?}
     */
    sectionBottomPosition(section) {
        return section.offsetTop + section.offsetHeight;
    }
    /**
     * @private
     * @return {?}
     */
    scrollTopPosition() {
        return this.scrollOffset + this.nativeElement().scrollTop;
    }
    /**
     * @private
     * @return {?}
     */
    scrollBottomPosition() {
        return this.scrollOffset + this.nativeElement().scrollTop + this.nativeElement().offsetHeight;
    }
    /**
     * @private
     * @return {?}
     */
    nativeElement() {
        return this.elementRef.nativeElement;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        sub => sub.unsubscribe()));
    }
}
ScrollSpyDirective.decorators = [
    { type: Directive, args: [{
                selector: '[lsnScrollSpy]'
            },] }
];
/** @nocollapse */
ScrollSpyDirective.ctorParameters = () => [
    { type: ElementRef }
];
ScrollSpyDirective.propDecorators = {
    spySelector: [{ type: Input }],
    scrollToSection: [{ type: Input }],
    spySectionChange: [{ type: Output }],
    onScroll: [{ type: HostListener, args: ['scroll',] }],
    onResize: [{ type: HostListener, args: ['window:resize',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLXNweS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbHNub3ZhL2FuZ3VsYXJtb2R1bGVzLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvc2Nyb2xsLXNweS9zY3JvbGwtc3B5LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEgsT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFLbkUsTUFBTSxPQUFPLGtCQUFrQjs7OztJQWlCN0IsWUFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQVIxQyxxQkFBZ0IsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBSXRDLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBRS9CLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztRQUdqQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFDdkMsQ0FBQzs7OztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxTQUFTLENBQUM7OztjQUc3QyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FDaEQsb0JBQW9CLEVBQUUsRUFDdEIsR0FBRzs7OztRQUFDLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFDLENBQzFELENBQUMsU0FBUyxFQUFFOzs7Y0FHUCxXQUFXLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJ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QUFDO0lBQ3ZDLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPOzs7O1FBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQUMsQ0FBQztJQUN2RCxDQUFDOzs7WUE3R0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxnQkFBZ0I7YUFDM0I7Ozs7WUFObUIsVUFBVTs7OzBCQVMzQixLQUFLOzhCQUdMLEtBQUs7K0JBR0wsTUFBTTt1QkErQk4sWUFBWSxTQUFDLFFBQVE7dUJBUXJCLFlBQVksU0FBQyxlQUFlOzs7O0lBN0M3Qix5Q0FDb0I7O0lBRXBCLDZDQUNvQzs7SUFFcEMsOENBQzhDOzs7OztJQUU5QywwQ0FBNkI7Ozs7O0lBQzdCLDZDQUF5Qzs7Ozs7SUFDekMsNENBQStCOztJQUUvQiwyQ0FBbUM7Ozs7O0lBRXZCLHdDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBmaWx0ZXIsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2xzblNjcm9sbFNweV0nXG59KVxuZXhwb3J0IGNsYXNzIFNjcm9sbFNweURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICBASW5wdXQoKVxuICBzcHlTZWxlY3Rvcjogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHNjcm9sbFRvU2VjdGlvbjogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuXG4gIEBPdXRwdXQoKVxuICBzcHlTZWN0aW9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgcHJpdmF0ZSBzY3JvbGxPZmZzZXQ6IG51bWJlcjtcbiAgcHJpdmF0ZSBjdXJyZW50U2VjdGlvbiQ6IFN1YmplY3Q8c3RyaW5nPjtcbiAgcHJpdmF0ZSBkaXNhYmxlRW1pdHRlciA9IGZhbHNlO1xuXG4gIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5jdXJyZW50U2VjdGlvbiQgPSBuZXcgU3ViamVjdCgpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zY3JvbGxPZmZzZXQgPSB0aGlzLm5hdGl2ZUVsZW1lbnQoKS5vZmZzZXRUb3A7XG5cbiAgICAvLyBlbWl0IGV2ZW50IG9uIHNlY3Rpb24gY2hhbmdlXG4gICAgY29uc3Qgc2VjdGlvbkNoYW5nZVN1YiA9IHRoaXMuY3VycmVudFNlY3Rpb24kLnBpcGUoXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgdGFwKChzZWN0aW9uSWQpID0+IHRoaXMuc3B5U2VjdGlvbkNoYW5nZS5lbWl0KHNlY3Rpb25JZCkpXG4gICAgKS5zdWJzY3JpYmUoKTtcblxuICAgIC8vIHNjcm9sbCB0byBnaXZlbiBzZWN0aW9uXG4gICAgY29uc3Qgc2Nyb2xsVG9TdWIgPSB0aGlzLnNjcm9sbFRvU2VjdGlvbi5waXBlKFxuICAgICAgZmlsdGVyKChzZWN0aW9uKSA9PiAhIXNlY3Rpb24pLFxuICAgICAgdGFwKChzZWN0aW9uKSA9PiB0aGlzLnNjcm9sbFRvKHNlY3Rpb24pKVxuICAgICkuc3Vic2NyaWJlKCk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChzZWN0aW9uQ2hhbmdlU3ViLCBzY3JvbGxUb1N1Yik7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdzY3JvbGwnKVxuICBvblNjcm9sbCgpIHtcbiAgICBjb25zdCBzZWN0aW9uOiBIVE1MRWxlbWVudCA9IHRoaXMuZmluZEN1cnJlbnRTZWN0aW9uKCk7XG4gICAgaWYgKHNlY3Rpb24pIHtcbiAgICAgIHRoaXMuc2V0Q3VycmVudFNlY3Rpb24oc2VjdGlvbi5pZCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScpXG4gIG9uUmVzaXplKCkge1xuICAgIHRoaXMub25TY3JvbGwoKTtcbiAgfVxuXG4gIHByaXZhdGUgc2Nyb2xsVG8oc2VjdGlvbklkKSB7XG4gICAgdGhpcy5kaXNhYmxlRW1pdHRlciA9IHRydWU7XG5cbiAgICB0aGlzLm5hdGl2ZUVsZW1lbnQoKS5xdWVyeVNlbGVjdG9yKCcjJyArIHNlY3Rpb25JZCkuc2Nyb2xsSW50b1ZpZXcoKTtcblxuICAgIC8vIHNldCB0aW1lb3V0IHRvIGVuZm9yY2Ugc2Nyb2xsIGV2ZW50IGV4ZWN1dGUgYmVmb3JlIGVuYWJsaW5nIGJhY2sgdGhlIGVtaXR0ZXJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuZGlzYWJsZUVtaXR0ZXIgPSBmYWxzZTtcbiAgICB9LCAwKTtcbiAgfVxuXG4gIHByaXZhdGUgZmluZEN1cnJlbnRTZWN0aW9uKCk6IEhUTUxFbGVtZW50IHtcbiAgICBjb25zdCBzY3JvbGxNaWRkbGUgPSAodGhpcy5zY3JvbGxUb3BQb3NpdGlvbigpICsgdGhpcy5zY3JvbGxCb3R0b21Qb3NpdGlvbigpKSAvIDI7XG4gICAgY29uc3Qgc3BpZWRTZWN0aW9ucyA9IHRoaXMuZ2V0U3BpZWRTZWN0aW9ucygpO1xuICAgIHJldHVybiBzcGllZFNlY3Rpb25zLmZpbmQoKHNlY3Rpb24pID0+IHRoaXMuaXNDdXJyZW50U2VjdGlvbihzZWN0aW9uLCBzY3JvbGxNaWRkbGUpKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0U3BpZWRTZWN0aW9ucygpOiBIVE1MRWxlbWVudFtdIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLm5hdGl2ZUVsZW1lbnQoKS5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuc3B5U2VsZWN0b3IpKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNDdXJyZW50U2VjdGlvbihzZWN0aW9uOiBIVE1MRWxlbWVudCwgc2Nyb2xsTWlkZGxlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zZWN0aW9uVG9wUG9zaXRpb24oc2VjdGlvbikgPD0gc2Nyb2xsTWlkZGxlXG4gICAgICAmJiB0aGlzLnNlY3Rpb25Cb3R0b21Qb3NpdGlvbihzZWN0aW9uKSA+IHNjcm9sbE1pZGRsZTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0Q3VycmVudFNlY3Rpb24oc2VjdGlvbklkOiBzdHJpbmcpIHtcbiAgICBpZiAoIXRoaXMuZGlzYWJsZUVtaXR0ZXIpIHtcbiAgICAgIHRoaXMuY3VycmVudFNlY3Rpb24kLm5leHQoc2VjdGlvbklkKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNlY3Rpb25Ub3BQb3NpdGlvbihzZWN0aW9uOiBIVE1MRWxlbWVudCkge1xuICAgIHJldHVybiBzZWN0aW9uLm9mZnNldFRvcDtcbiAgfVxuXG4gIHByaXZhdGUgc2VjdGlvbkJvdHRvbVBvc2l0aW9uKHNlY3Rpb246IEhUTUxFbGVtZW50KSB7XG4gICAgcmV0dXJuIHNlY3Rpb24ub2Zmc2V0VG9wICsgc2VjdGlvbi5vZmZzZXRIZWlnaHQ7XG4gIH1cblxuICBwcml2YXRlIHNjcm9sbFRvcFBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnNjcm9sbE9mZnNldCArIHRoaXMubmF0aXZlRWxlbWVudCgpLnNjcm9sbFRvcDtcbiAgfVxuXG4gIHByaXZhdGUgc2Nyb2xsQm90dG9tUG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuc2Nyb2xsT2Zmc2V0ICsgdGhpcy5uYXRpdmVFbGVtZW50KCkuc2Nyb2xsVG9wICsgdGhpcy5uYXRpdmVFbGVtZW50KCkub2Zmc2V0SGVpZ2h0O1xuICB9XG5cbiAgcHJpdmF0ZSBuYXRpdmVFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG59XG4iXX0=