import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
export class ScrollSpyDirective {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.spySectionChange = new EventEmitter();
        this.disableEmitter = false;
        this.subscriptions = [];
        this.currentSection$ = new Subject();
    }
    ngOnInit() {
        this.scrollOffset = this.nativeElement().offsetTop;
        // emit event on section change
        const sectionChangeSub = this.currentSection$.pipe(distinctUntilChanged(), tap((sectionId) => this.spySectionChange.emit(sectionId))).subscribe();
        // scroll to given section
        const scrollToSub = this.scrollToSection.pipe(filter((section) => !!section), tap((section) => this.scrollTo(section))).subscribe();
        this.subscriptions.push(sectionChangeSub, scrollToSub);
    }
    onScroll() {
        const section = this.findCurrentSection();
        if (section) {
            this.setCurrentSection(section.id);
        }
    }
    onResize() {
        this.onScroll();
    }
    scrollTo(sectionId) {
        this.disableEmitter = true;
        this.nativeElement().querySelector('#' + sectionId).scrollIntoView();
        // set timeout to enforce scroll event execute before enabling back the emitter
        setTimeout(() => {
            this.disableEmitter = false;
        }, 0);
    }
    findCurrentSection() {
        const scrollMiddle = (this.scrollTopPosition() + this.scrollBottomPosition()) / 2;
        const spiedSections = this.getSpiedSections();
        return spiedSections.find((section) => this.isCurrentSection(section, scrollMiddle));
    }
    getSpiedSections() {
        return Array.from(this.nativeElement().querySelectorAll(this.spySelector));
    }
    isCurrentSection(section, scrollMiddle) {
        return this.sectionTopPosition(section) <= scrollMiddle
            && this.sectionBottomPosition(section) > scrollMiddle;
    }
    setCurrentSection(sectionId) {
        if (!this.disableEmitter) {
            this.currentSection$.next(sectionId);
        }
    }
    sectionTopPosition(section) {
        return section.offsetTop;
    }
    sectionBottomPosition(section) {
        return section.offsetTop + section.offsetHeight;
    }
    scrollTopPosition() {
        return this.scrollOffset + this.nativeElement().scrollTop;
    }
    scrollBottomPosition() {
        return this.scrollOffset + this.nativeElement().scrollTop + this.nativeElement().offsetHeight;
    }
    nativeElement() {
        return this.elementRef.nativeElement;
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}
/** @nocollapse */ ScrollSpyDirective.ɵfac = function ScrollSpyDirective_Factory(t) { return new (t || ScrollSpyDirective)(i0.ɵɵdirectiveInject(i0.ElementRef)); };
/** @nocollapse */ ScrollSpyDirective.ɵdir = /** @pureOrBreakMyCode */ i0.ɵɵdefineDirective({ type: ScrollSpyDirective, selectors: [["", "lsnScrollSpy", ""]], hostBindings: function ScrollSpyDirective_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("scroll", function ScrollSpyDirective_scroll_HostBindingHandler() { return ctx.onScroll(); })("resize", function ScrollSpyDirective_resize_HostBindingHandler() { return ctx.onResize(); }, false, i0.ɵɵresolveWindow);
    } }, inputs: { spySelector: "spySelector", scrollToSection: "scrollToSection" }, outputs: { spySectionChange: "spySectionChange" } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ScrollSpyDirective, [{
        type: Directive,
        args: [{
                selector: '[lsnScrollSpy]'
            }]
    }], function () { return [{ type: i0.ElementRef }]; }, { spySelector: [{
            type: Input
        }], scrollToSection: [{
            type: Input
        }], spySectionChange: [{
            type: Output
        }], onScroll: [{
            type: HostListener,
            args: ['scroll']
        }], onResize: [{
            type: HostListener,
            args: ['window:resize']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLXNweS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9sc24tbGlicy9zcmMvbGliL2RpcmVjdGl2ZXMvc2Nyb2xsLXNweS9zY3JvbGwtc3B5LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BILE9BQU8sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUN6RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQUtuRSxNQUFNLE9BQU8sa0JBQWtCO0lBaUI3QixZQUFvQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBUjFDLHFCQUFnQixHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFJdEMsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFFL0Isa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBR2pDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLFNBQVMsQ0FBQztRQUVuRCwrQkFBK0I7UUFDL0IsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FDaEQsb0JBQW9CLEVBQUUsRUFDdEIsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQzFELENBQUMsU0FBUyxFQUFFLENBQUM7UUFFZCwwQkFBMEI7UUFDMUIsTUFB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QUFhLENBQUM7SUFDdkMsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7O3VHQTFHVSxrQkFBa0I7b0dBQWxCLGtCQUFrQjtpR0FBbEIsY0FBVSxnRkFBVixjQUFVOzt1RkFBVixrQkFBa0I7Y0FIOUIsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxnQkFBZ0I7YUFDM0I7NkRBSUMsV0FBVztrQkFEVixLQUFLO1lBSU4sZUFBZTtrQkFEZCxLQUFLO1lBSU4sZ0JBQWdCO2tCQURmLE1BQU07WUFnQ1AsUUFBUTtrQkFEUCxZQUFZO21CQUFDLFFBQVE7WUFTdEIsUUFBUTtrQkFEUCxZQUFZO21CQUFDLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgZmlsdGVyLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tsc25TY3JvbGxTcHldJ1xufSlcbmV4cG9ydCBjbGFzcyBTY3JvbGxTcHlEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgQElucHV0KClcbiAgc3B5U2VsZWN0b3I6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBzY3JvbGxUb1NlY3Rpb246IE9ic2VydmFibGU8c3RyaW5nPjtcblxuICBAT3V0cHV0KClcbiAgc3B5U2VjdGlvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIHByaXZhdGUgc2Nyb2xsT2Zmc2V0OiBudW1iZXI7XG4gIHByaXZhdGUgY3VycmVudFNlY3Rpb24kOiBTdWJqZWN0PHN0cmluZz47XG4gIHByaXZhdGUgZGlzYWJsZUVtaXR0ZXIgPSBmYWxzZTtcblxuICBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIHRoaXMuY3VycmVudFNlY3Rpb24kID0gbmV3IFN1YmplY3QoKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuc2Nyb2xsT2Zmc2V0ID0gdGhpcy5uYXRpdmVFbGVtZW50KCkub2Zmc2V0VG9wO1xuXG4gICAgLy8gZW1pdCBldmVudCBvbiBzZWN0aW9uIGNoYW5nZVxuICAgIGNvbnN0IHNlY3Rpb25DaGFuZ2VTdWIgPSB0aGlzLmN1cnJlbnRTZWN0aW9uJC5waXBlKFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICAgIHRhcCgoc2VjdGlvbklkKSA9PiB0aGlzLnNweVNlY3Rpb25DaGFuZ2UuZW1pdChzZWN0aW9uSWQpKVxuICAgICkuc3Vic2NyaWJlKCk7XG5cbiAgICAvLyBzY3JvbGwgdG8gZ2l2ZW4gc2VjdGlvblxuICAgIGNvbnN0IHNjcm9sbFRvU3ViID0gdGhpcy5zY3JvbGxUb1NlY3Rpb24ucGlwZShcbiAgICAgIGZpbHRlcigoc2VjdGlvbikgPT4gISFzZWN0aW9uKSxcbiAgICAgIHRhcCgoc2VjdGlvbikgPT4gdGhpcy5zY3JvbGxUbyhzZWN0aW9uKSlcbiAgICApLnN1YnNjcmliZSgpO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goc2VjdGlvbkNoYW5nZVN1Yiwgc2Nyb2xsVG9TdWIpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignc2Nyb2xsJylcbiAgb25TY3JvbGwoKSB7XG4gICAgY29uc3Qgc2VjdGlvbjogSFRNTEVsZW1lbnQgPSB0aGlzLmZpbmRDdXJyZW50U2VjdGlvbigpO1xuICAgIGlmIChzZWN0aW9uKSB7XG4gICAgICB0aGlzLnNldEN1cnJlbnRTZWN0aW9uKHNlY3Rpb24uaWQpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnKVxuICBvblJlc2l6ZSgpIHtcbiAgICB0aGlzLm9uU2Nyb2xsKCk7XG4gIH1cblxuICBwcml2YXRlIHNjcm9sbFRvKHNlY3Rpb25JZCkge1xuICAgIHRoaXMuZGlzYWJsZUVtaXR0ZXIgPSB0cnVlO1xuXG4gICAgdGhpcy5uYXRpdmVFbGVtZW50KCkucXVlcnlTZWxlY3RvcignIycgKyBzZWN0aW9uSWQpLnNjcm9sbEludG9WaWV3KCk7XG5cbiAgICAvLyBzZXQgdGltZW91dCB0byBlbmZvcmNlIHNjcm9sbCBldmVudCBleGVjdXRlIGJlZm9yZSBlbmFibGluZyBiYWNrIHRoZSBlbWl0dGVyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmRpc2FibGVFbWl0dGVyID0gZmFsc2U7XG4gICAgfSwgMCk7XG4gIH1cblxuICBwcml2YXRlIGZpbmRDdXJyZW50U2VjdGlvbigpOiBIVE1MRWxlbWVudCB7XG4gICAgY29uc3Qgc2Nyb2xsTWlkZGxlID0gKHRoaXMuc2Nyb2xsVG9wUG9zaXRpb24oKSArIHRoaXMuc2Nyb2xsQm90dG9tUG9zaXRpb24oKSkgLyAyO1xuICAgIGNvbnN0IHNwaWVkU2VjdGlvbnMgPSB0aGlzLmdldFNwaWVkU2VjdGlvbnMoKTtcbiAgICByZXR1cm4gc3BpZWRTZWN0aW9ucy5maW5kKChzZWN0aW9uKSA9PiB0aGlzLmlzQ3VycmVudFNlY3Rpb24oc2VjdGlvbiwgc2Nyb2xsTWlkZGxlKSk7XG4gIH1cblxuICBwcml2YXRlIGdldFNwaWVkU2VjdGlvbnMoKTogSFRNTEVsZW1lbnRbXSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5uYXRpdmVFbGVtZW50KCkucXVlcnlTZWxlY3RvckFsbCh0aGlzLnNweVNlbGVjdG9yKSk7XG4gIH1cblxuICBwcml2YXRlIGlzQ3VycmVudFNlY3Rpb24oc2VjdGlvbjogSFRNTEVsZW1lbnQsIHNjcm9sbE1pZGRsZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2VjdGlvblRvcFBvc2l0aW9uKHNlY3Rpb24pIDw9IHNjcm9sbE1pZGRsZVxuICAgICAgJiYgdGhpcy5zZWN0aW9uQm90dG9tUG9zaXRpb24oc2VjdGlvbikgPiBzY3JvbGxNaWRkbGU7XG4gIH1cblxuICBwcml2YXRlIHNldEN1cnJlbnRTZWN0aW9uKHNlY3Rpb25JZDogc3RyaW5nKSB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVFbWl0dGVyKSB7XG4gICAgICB0aGlzLmN1cnJlbnRTZWN0aW9uJC5uZXh0KHNlY3Rpb25JZCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZWN0aW9uVG9wUG9zaXRpb24oc2VjdGlvbjogSFRNTEVsZW1lbnQpIHtcbiAgICByZXR1cm4gc2VjdGlvbi5vZmZzZXRUb3A7XG4gIH1cblxuICBwcml2YXRlIHNlY3Rpb25Cb3R0b21Qb3NpdGlvbihzZWN0aW9uOiBIVE1MRWxlbWVudCkge1xuICAgIHJldHVybiBzZWN0aW9uLm9mZnNldFRvcCArIHNlY3Rpb24ub2Zmc2V0SGVpZ2h0O1xuICB9XG5cbiAgcHJpdmF0ZSBzY3JvbGxUb3BQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5zY3JvbGxPZmZzZXQgKyB0aGlzLm5hdGl2ZUVsZW1lbnQoKS5zY3JvbGxUb3A7XG4gIH1cblxuICBwcml2YXRlIHNjcm9sbEJvdHRvbVBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnNjcm9sbE9mZnNldCArIHRoaXMubmF0aXZlRWxlbWVudCgpLnNjcm9sbFRvcCArIHRoaXMubmF0aXZlRWxlbWVudCgpLm9mZnNldEhlaWdodDtcbiAgfVxuXG4gIHByaXZhdGUgbmF0aXZlRWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxufVxuIl19