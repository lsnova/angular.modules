/**
 * @fileoverview added by tsickle
 * Generated from: lib/directives/scroll-spy/scroll-spy.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        var sectionChangeSub = this.currentSection$.pipe(distinctUntilChanged(), tap((/**
         * @param {?} sectionId
         * @return {?}
         */
        function (sectionId) { return _this.spySectionChange.emit(sectionId); }))).subscribe();
        // scroll to given section
        /** @type {?} */
        var scrollToSub = this.scrollToSection.pipe(filter((/**
         * @param {?} section
         * @return {?}
         */
        function (section) { return !!section; })), tap((/**
         * @param {?} section
         * @return {?}
         */
        function (section) { return _this.scrollTo(section); }))).subscribe();
        this.subscriptions.push(sectionChangeSub, scrollToSub);
    };
    /**
     * @return {?}
     */
    ScrollSpyDirective.prototype.onScroll = /**
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
     * @return {?}
     */
    ScrollSpyDirective.prototype.onResize = /**
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
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.disableEmitter = false;
        }), 0);
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
        return spiedSections.find((/**
         * @param {?} section
         * @return {?}
         */
        function (section) { return _this.isCurrentSection(section, scrollMiddle); }));
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
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLXNweS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbHNub3ZhL2FuZ3VsYXJtb2R1bGVzLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvc2Nyb2xsLXNweS9zY3JvbGwtc3B5LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEgsT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFbkU7SUFvQkUsNEJBQW9CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFSMUMscUJBQWdCLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUl0QyxtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUUvQixrQkFBYSxHQUFtQixFQUFFLENBQUM7UUFHakMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBQ3ZDLENBQUM7Ozs7SUFFRCxxQ0FBUTs7O0lBQVI7UUFBQSxpQkFnQkM7UUFmQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxTQUFTLENBQUM7OztZQUc3QyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FDaEQsb0JBQW9CLEVBQUUsRUFDdEIsR0FBRzs7OztRQUFDLFVBQUMsU0FBUyxJQUFLLE9BQUEsS0FBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBckMsQ0FBcUMsRUFBQyxDQUMxRCxDQUFDLFNBQVMsRUFBRTs7O1lBR1AsV0FBVyxHQUFHLElBQUksQ0FBQyxlQUFlLENB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LFlBQVksR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxZQUFZLENBQUM7SUFDaEcsQ0FBQzs7Ozs7SUFFTywwQ0FBYTs7OztJQUFyQjtRQUNFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7SUFDdkMsQ0FBQzs7OztJQUVELHdDQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTzs7OztRQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFqQixDQUFpQixFQUFDLENBQUM7SUFDdkQsQ0FBQzs7Z0JBN0dGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2lCQUMzQjs7OztnQkFObUIsVUFBVTs7OzhCQVMzQixLQUFLO2tDQUdMLEtBQUs7bUNBR0wsTUFBTTsyQkErQk4sWUFBWSxTQUFDLFFBQVE7MkJBUXJCLFlBQVksU0FBQyxlQUFlOztJQTREL0IseUJBQUM7Q0FBQSxBQTlHRCxJQThHQztTQTNHWSxrQkFBa0I7OztJQUU3Qix5Q0FDb0I7O0lBRXBCLDZDQUNvQzs7SUFFcEMsOENBQzhDOzs7OztJQUU5QywwQ0FBNkI7Ozs7O0lBQzdCLDZDQUF5Qzs7Ozs7SUFDekMsNENBQStCOztJQUUvQiwyQ0FBbUM7Ozs7O0lBRXZCLHdDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBmaWx0ZXIsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2xzblNjcm9sbFNweV0nXG59KVxuZXhwb3J0IGNsYXNzIFNjcm9sbFNweURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICBASW5wdXQoKVxuICBzcHlTZWxlY3Rvcjogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHNjcm9sbFRvU2VjdGlvbjogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuXG4gIEBPdXRwdXQoKVxuICBzcHlTZWN0aW9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgcHJpdmF0ZSBzY3JvbGxPZmZzZXQ6IG51bWJlcjtcbiAgcHJpdmF0ZSBjdXJyZW50U2VjdGlvbiQ6IFN1YmplY3Q8c3RyaW5nPjtcbiAgcHJpdmF0ZSBkaXNhYmxlRW1pdHRlciA9IGZhbHNlO1xuXG4gIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5jdXJyZW50U2VjdGlvbiQgPSBuZXcgU3ViamVjdCgpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zY3JvbGxPZmZzZXQgPSB0aGlzLm5hdGl2ZUVsZW1lbnQoKS5vZmZzZXRUb3A7XG5cbiAgICAvLyBlbWl0IGV2ZW50IG9uIHNlY3Rpb24gY2hhbmdlXG4gICAgY29uc3Qgc2VjdGlvbkNoYW5nZVN1YiA9IHRoaXMuY3VycmVudFNlY3Rpb24kLnBpcGUoXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgdGFwKChzZWN0aW9uSWQpID0+IHRoaXMuc3B5U2VjdGlvbkNoYW5nZS5lbWl0KHNlY3Rpb25JZCkpXG4gICAgKS5zdWJzY3JpYmUoKTtcblxuICAgIC8vIHNjcm9sbCB0byBnaXZlbiBzZWN0aW9uXG4gICAgY29uc3Qgc2Nyb2xsVG9TdWIgPSB0aGlzLnNjcm9sbFRvU2VjdGlvbi5waXBlKFxuICAgICAgZmlsdGVyKChzZWN0aW9uKSA9PiAhIXNlY3Rpb24pLFxuICAgICAgdGFwKChzZWN0aW9uKSA9PiB0aGlzLnNjcm9sbFRvKHNlY3Rpb24pKVxuICAgICkuc3Vic2NyaWJlKCk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChzZWN0aW9uQ2hhbmdlU3ViLCBzY3JvbGxUb1N1Yik7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdzY3JvbGwnKVxuICBvblNjcm9sbCgpIHtcbiAgICBjb25zdCBzZWN0aW9uOiBIVE1MRWxlbWVudCA9IHRoaXMuZmluZEN1cnJlbnRTZWN0aW9uKCk7XG4gICAgaWYgKHNlY3Rpb24pIHtcbiAgICAgIHRoaXMuc2V0Q3VycmVudFNlY3Rpb24oc2VjdGlvbi5pZCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScpXG4gIG9uUmVzaXplKCkge1xuICAgIHRoaXMub25TY3JvbGwoKTtcbiAgfVxuXG4gIHByaXZhdGUgc2Nyb2xsVG8oc2VjdGlvbklkKSB7XG4gICAgdGhpcy5kaXNhYmxlRW1pdHRlciA9IHRydWU7XG5cbiAgICB0aGlzLm5hdGl2ZUVsZW1lbnQoKS5xdWVyeVNlbGVjdG9yKCcjJyArIHNlY3Rpb25JZCkuc2Nyb2xsSW50b1ZpZXcoKTtcblxuICAgIC8vIHNldCB0aW1lb3V0IHRvIGVuZm9yY2Ugc2Nyb2xsIGV2ZW50IGV4ZWN1dGUgYmVmb3JlIGVuYWJsaW5nIGJhY2sgdGhlIGVtaXR0ZXJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuZGlzYWJsZUVtaXR0ZXIgPSBmYWxzZTtcbiAgICB9LCAwKTtcbiAgfVxuXG4gIHByaXZhdGUgZmluZEN1cnJlbnRTZWN0aW9uKCk6IEhUTUxFbGVtZW50IHtcbiAgICBjb25zdCBzY3JvbGxNaWRkbGUgPSAodGhpcy5zY3JvbGxUb3BQb3NpdGlvbigpICsgdGhpcy5zY3JvbGxCb3R0b21Qb3NpdGlvbigpKSAvIDI7XG4gICAgY29uc3Qgc3BpZWRTZWN0aW9ucyA9IHRoaXMuZ2V0U3BpZWRTZWN0aW9ucygpO1xuICAgIHJldHVybiBzcGllZFNlY3Rpb25zLmZpbmQoKHNlY3Rpb24pID0+IHRoaXMuaXNDdXJyZW50U2VjdGlvbihzZWN0aW9uLCBzY3JvbGxNaWRkbGUpKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0U3BpZWRTZWN0aW9ucygpOiBIVE1MRWxlbWVudFtdIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLm5hdGl2ZUVsZW1lbnQoKS5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuc3B5U2VsZWN0b3IpKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNDdXJyZW50U2VjdGlvbihzZWN0aW9uOiBIVE1MRWxlbWVudCwgc2Nyb2xsTWlkZGxlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zZWN0aW9uVG9wUG9zaXRpb24oc2VjdGlvbikgPD0gc2Nyb2xsTWlkZGxlXG4gICAgICAmJiB0aGlzLnNlY3Rpb25Cb3R0b21Qb3NpdGlvbihzZWN0aW9uKSA+IHNjcm9sbE1pZGRsZTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0Q3VycmVudFNlY3Rpb24oc2VjdGlvbklkOiBzdHJpbmcpIHtcbiAgICBpZiAoIXRoaXMuZGlzYWJsZUVtaXR0ZXIpIHtcbiAgICAgIHRoaXMuY3VycmVudFNlY3Rpb24kLm5leHQoc2VjdGlvbklkKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNlY3Rpb25Ub3BQb3NpdGlvbihzZWN0aW9uOiBIVE1MRWxlbWVudCkge1xuICAgIHJldHVybiBzZWN0aW9uLm9mZnNldFRvcDtcbiAgfVxuXG4gIHByaXZhdGUgc2VjdGlvbkJvdHRvbVBvc2l0aW9uKHNlY3Rpb246IEhUTUxFbGVtZW50KSB7XG4gICAgcmV0dXJuIHNlY3Rpb24ub2Zmc2V0VG9wICsgc2VjdGlvbi5vZmZzZXRIZWlnaHQ7XG4gIH1cblxuICBwcml2YXRlIHNjcm9sbFRvcFBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnNjcm9sbE9mZnNldCArIHRoaXMubmF0aXZlRWxlbWVudCgpLnNjcm9sbFRvcDtcbiAgfVxuXG4gIHByaXZhdGUgc2Nyb2xsQm90dG9tUG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuc2Nyb2xsT2Zmc2V0ICsgdGhpcy5uYXRpdmVFbGVtZW50KCkuc2Nyb2xsVG9wICsgdGhpcy5uYXRpdmVFbGVtZW50KCkub2Zmc2V0SGVpZ2h0O1xuICB9XG5cbiAgcHJpdmF0ZSBuYXRpdmVFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG59XG4iXX0=