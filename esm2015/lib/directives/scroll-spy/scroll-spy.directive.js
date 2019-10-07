/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        const sectionChangeSub = this.currentSection$.pipe(distinctUntilChanged(), tap((sectionId) => this.spySectionChange.emit(sectionId))).subscribe();
        // scroll to given section
        /** @type {?} */
        const scrollToSub = this.scrollToSection.pipe(filter((section) => !!section), tap((section) => this.scrollTo(section))).subscribe();
        this.subscriptions.push(sectionChangeSub, scrollToSub);
    }
    /**
     * @private
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
     * @private
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
        setTimeout(() => {
            this.disableEmitter = false;
        }, 0);
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
        return spiedSections.find((section) => this.isCurrentSection(section, scrollMiddle));
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
        this.subscriptions.forEach(sub => sub.unsubscribe());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLXNweS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbHNub3ZhL2FuZ3VsYXJtb2R1bGVzLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvc2Nyb2xsLXNweS9zY3JvbGwtc3B5LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDekQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUtuRSxNQUFNLE9BQU8sa0JBQWtCOzs7O0lBaUI3QixZQUFvQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBUjFDLHFCQUFnQixHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFJdEMsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFFL0Isa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBR2pDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUN2QyxDQUFDOzs7O0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLFNBQVMsQ0FBQzs7O2NBRzdDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUNoRCxvQkFBb0IsRUFBRSxFQUN0QixHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FDMUQsQ0FBQyxTQUFTLEVBQUU7OztjQUdQLFdBQVcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FD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Qzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7OztZQTdHRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjthQUMzQjs7OztZQU5tQixVQUFVOzs7MEJBUzNCLEtBQUs7OEJBR0wsS0FBSzsrQkFHTCxNQUFNO3VCQStCTixZQUFZLFNBQUMsUUFBUTt1QkFRckIsWUFBWSxTQUFDLGVBQWU7Ozs7SUE3QzdCLHlDQUNvQjs7SUFFcEIsNkNBQ29DOztJQUVwQyw4Q0FDOEM7Ozs7O0lBRTlDLDBDQUE2Qjs7Ozs7SUFDN0IsNkNBQXlDOzs7OztJQUN6Qyw0Q0FBK0I7O0lBRS9CLDJDQUFtQzs7Ozs7SUFFdkIsd0NBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpbHRlciwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbHNuU2Nyb2xsU3B5XSdcbn0pXG5leHBvcnQgY2xhc3MgU2Nyb2xsU3B5RGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpXG4gIHNweVNlbGVjdG9yOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgc2Nyb2xsVG9TZWN0aW9uOiBPYnNlcnZhYmxlPHN0cmluZz47XG5cbiAgQE91dHB1dCgpXG4gIHNweVNlY3Rpb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBwcml2YXRlIHNjcm9sbE9mZnNldDogbnVtYmVyO1xuICBwcml2YXRlIGN1cnJlbnRTZWN0aW9uJDogU3ViamVjdDxzdHJpbmc+O1xuICBwcml2YXRlIGRpc2FibGVFbWl0dGVyID0gZmFsc2U7XG5cbiAgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLmN1cnJlbnRTZWN0aW9uJCA9IG5ldyBTdWJqZWN0KCk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNjcm9sbE9mZnNldCA9IHRoaXMubmF0aXZlRWxlbWVudCgpLm9mZnNldFRvcDtcblxuICAgIC8vIGVtaXQgZXZlbnQgb24gc2VjdGlvbiBjaGFuZ2VcbiAgICBjb25zdCBzZWN0aW9uQ2hhbmdlU3ViID0gdGhpcy5jdXJyZW50U2VjdGlvbiQucGlwZShcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICB0YXAoKHNlY3Rpb25JZCkgPT4gdGhpcy5zcHlTZWN0aW9uQ2hhbmdlLmVtaXQoc2VjdGlvbklkKSlcbiAgICApLnN1YnNjcmliZSgpO1xuXG4gICAgLy8gc2Nyb2xsIHRvIGdpdmVuIHNlY3Rpb25cbiAgICBjb25zdCBzY3JvbGxUb1N1YiA9IHRoaXMuc2Nyb2xsVG9TZWN0aW9uLnBpcGUoXG4gICAgICBmaWx0ZXIoKHNlY3Rpb24pID0+ICEhc2VjdGlvbiksXG4gICAgICB0YXAoKHNlY3Rpb24pID0+IHRoaXMuc2Nyb2xsVG8oc2VjdGlvbikpXG4gICAgKS5zdWJzY3JpYmUoKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHNlY3Rpb25DaGFuZ2VTdWIsIHNjcm9sbFRvU3ViKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3Njcm9sbCcpXG4gIHByaXZhdGUgb25TY3JvbGwoKSB7XG4gICAgY29uc3Qgc2VjdGlvbjogSFRNTEVsZW1lbnQgPSB0aGlzLmZpbmRDdXJyZW50U2VjdGlvbigpO1xuICAgIGlmIChzZWN0aW9uKSB7XG4gICAgICB0aGlzLnNldEN1cnJlbnRTZWN0aW9uKHNlY3Rpb24uaWQpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnKVxuICBwcml2YXRlIG9uUmVzaXplKCkge1xuICAgIHRoaXMub25TY3JvbGwoKTtcbiAgfVxuXG4gIHByaXZhdGUgc2Nyb2xsVG8oc2VjdGlvbklkKSB7XG4gICAgdGhpcy5kaXNhYmxlRW1pdHRlciA9IHRydWU7XG5cbiAgICB0aGlzLm5hdGl2ZUVsZW1lbnQoKS5xdWVyeVNlbGVjdG9yKCcjJyArIHNlY3Rpb25JZCkuc2Nyb2xsSW50b1ZpZXcoKTtcblxuICAgIC8vIHNldCB0aW1lb3V0IHRvIGVuZm9yY2Ugc2Nyb2xsIGV2ZW50IGV4ZWN1dGUgYmVmb3JlIGVuYWJsaW5nIGJhY2sgdGhlIGVtaXR0ZXJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuZGlzYWJsZUVtaXR0ZXIgPSBmYWxzZTtcbiAgICB9LCAwKTtcbiAgfVxuXG4gIHByaXZhdGUgZmluZEN1cnJlbnRTZWN0aW9uKCk6IEhUTUxFbGVtZW50IHtcbiAgICBjb25zdCBzY3JvbGxNaWRkbGUgPSAodGhpcy5zY3JvbGxUb3BQb3NpdGlvbigpICsgdGhpcy5zY3JvbGxCb3R0b21Qb3NpdGlvbigpKSAvIDI7XG4gICAgY29uc3Qgc3BpZWRTZWN0aW9ucyA9IHRoaXMuZ2V0U3BpZWRTZWN0aW9ucygpO1xuICAgIHJldHVybiBzcGllZFNlY3Rpb25zLmZpbmQoKHNlY3Rpb24pID0+IHRoaXMuaXNDdXJyZW50U2VjdGlvbihzZWN0aW9uLCBzY3JvbGxNaWRkbGUpKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0U3BpZWRTZWN0aW9ucygpOiBIVE1MRWxlbWVudFtdIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLm5hdGl2ZUVsZW1lbnQoKS5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuc3B5U2VsZWN0b3IpKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNDdXJyZW50U2VjdGlvbihzZWN0aW9uOiBIVE1MRWxlbWVudCwgc2Nyb2xsTWlkZGxlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zZWN0aW9uVG9wUG9zaXRpb24oc2VjdGlvbikgPD0gc2Nyb2xsTWlkZGxlXG4gICAgICAmJiB0aGlzLnNlY3Rpb25Cb3R0b21Qb3NpdGlvbihzZWN0aW9uKSA+IHNjcm9sbE1pZGRsZTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0Q3VycmVudFNlY3Rpb24oc2VjdGlvbklkOiBzdHJpbmcpIHtcbiAgICBpZiAoIXRoaXMuZGlzYWJsZUVtaXR0ZXIpIHtcbiAgICAgIHRoaXMuY3VycmVudFNlY3Rpb24kLm5leHQoc2VjdGlvbklkKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNlY3Rpb25Ub3BQb3NpdGlvbihzZWN0aW9uOiBIVE1MRWxlbWVudCkge1xuICAgIHJldHVybiBzZWN0aW9uLm9mZnNldFRvcDtcbiAgfVxuXG4gIHByaXZhdGUgc2VjdGlvbkJvdHRvbVBvc2l0aW9uKHNlY3Rpb246IEhUTUxFbGVtZW50KSB7XG4gICAgcmV0dXJuIHNlY3Rpb24ub2Zmc2V0VG9wICsgc2VjdGlvbi5vZmZzZXRIZWlnaHQ7XG4gIH1cblxuICBwcml2YXRlIHNjcm9sbFRvcFBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnNjcm9sbE9mZnNldCArIHRoaXMubmF0aXZlRWxlbWVudCgpLnNjcm9sbFRvcDtcbiAgfVxuXG4gIHByaXZhdGUgc2Nyb2xsQm90dG9tUG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuc2Nyb2xsT2Zmc2V0ICsgdGhpcy5uYXRpdmVFbGVtZW50KCkuc2Nyb2xsVG9wICsgdGhpcy5uYXRpdmVFbGVtZW50KCkub2Zmc2V0SGVpZ2h0O1xuICB9XG5cbiAgcHJpdmF0ZSBuYXRpdmVFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG59XG4iXX0=