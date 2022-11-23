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
/** @nocollapse */ ScrollSpyDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: ScrollSpyDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ ScrollSpyDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.2.12", type: ScrollSpyDirective, selector: "[lsnScrollSpy]", inputs: { spySelector: "spySelector", scrollToSection: "scrollToSection" }, outputs: { spySectionChange: "spySectionChange" }, host: { listeners: { "scroll": "onScroll()", "window:resize": "onResize()" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: ScrollSpyDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[lsnScrollSpy]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { spySelector: [{
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
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLXNweS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9sc24tbGlicy9zcmMvbGliL2RpcmVjdGl2ZXMvc2Nyb2xsLXNweS9zY3JvbGwtc3B5LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BILE9BQU8sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUN6RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQUtuRSxNQUFNLE9BQU8sa0JBQWtCO0lBaUI3QixZQUFvQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBUjFDLHFCQUFnQixHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFJdEMsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFFL0Isa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBR2pDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLFNBQVMsQ0FBQztRQUVuRCwrQkFBK0I7UUFDL0IsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FDaEQsb0JBQW9CLEVBQUUsRUFDdEIsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQzFELENBQUMsU0FBUyxFQUFFLENBQUM7UUFFZCwwQkFBMEI7UUFDMUIsTUFB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QUFhLENBQUM7SUFDdkMsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7O21JQTFHVSxrQkFBa0I7dUhBQWxCLGtCQUFrQjs0RkFBbEIsa0JBQWtCO2tCQUg5QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7aUJBQzNCO2lHQUlDLFdBQVc7c0JBRFYsS0FBSztnQkFJTixlQUFlO3NCQURkLEtBQUs7Z0JBSU4sZ0JBQWdCO3NCQURmLE1BQU07Z0JBZ0NQLFFBQVE7c0JBRFAsWUFBWTt1QkFBQyxRQUFRO2dCQVN0QixRQUFRO3NCQURQLFlBQVk7dUJBQUMsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBmaWx0ZXIsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2xzblNjcm9sbFNweV0nXG59KVxuZXhwb3J0IGNsYXNzIFNjcm9sbFNweURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICBASW5wdXQoKVxuICBzcHlTZWxlY3Rvcjogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHNjcm9sbFRvU2VjdGlvbjogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuXG4gIEBPdXRwdXQoKVxuICBzcHlTZWN0aW9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgcHJpdmF0ZSBzY3JvbGxPZmZzZXQ6IG51bWJlcjtcbiAgcHJpdmF0ZSBjdXJyZW50U2VjdGlvbiQ6IFN1YmplY3Q8c3RyaW5nPjtcbiAgcHJpdmF0ZSBkaXNhYmxlRW1pdHRlciA9IGZhbHNlO1xuXG4gIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5jdXJyZW50U2VjdGlvbiQgPSBuZXcgU3ViamVjdCgpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zY3JvbGxPZmZzZXQgPSB0aGlzLm5hdGl2ZUVsZW1lbnQoKS5vZmZzZXRUb3A7XG5cbiAgICAvLyBlbWl0IGV2ZW50IG9uIHNlY3Rpb24gY2hhbmdlXG4gICAgY29uc3Qgc2VjdGlvbkNoYW5nZVN1YiA9IHRoaXMuY3VycmVudFNlY3Rpb24kLnBpcGUoXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgdGFwKChzZWN0aW9uSWQpID0+IHRoaXMuc3B5U2VjdGlvbkNoYW5nZS5lbWl0KHNlY3Rpb25JZCkpXG4gICAgKS5zdWJzY3JpYmUoKTtcblxuICAgIC8vIHNjcm9sbCB0byBnaXZlbiBzZWN0aW9uXG4gICAgY29uc3Qgc2Nyb2xsVG9TdWIgPSB0aGlzLnNjcm9sbFRvU2VjdGlvbi5waXBlKFxuICAgICAgZmlsdGVyKChzZWN0aW9uKSA9PiAhIXNlY3Rpb24pLFxuICAgICAgdGFwKChzZWN0aW9uKSA9PiB0aGlzLnNjcm9sbFRvKHNlY3Rpb24pKVxuICAgICkuc3Vic2NyaWJlKCk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChzZWN0aW9uQ2hhbmdlU3ViLCBzY3JvbGxUb1N1Yik7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdzY3JvbGwnKVxuICBvblNjcm9sbCgpIHtcbiAgICBjb25zdCBzZWN0aW9uOiBIVE1MRWxlbWVudCA9IHRoaXMuZmluZEN1cnJlbnRTZWN0aW9uKCk7XG4gICAgaWYgKHNlY3Rpb24pIHtcbiAgICAgIHRoaXMuc2V0Q3VycmVudFNlY3Rpb24oc2VjdGlvbi5pZCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScpXG4gIG9uUmVzaXplKCkge1xuICAgIHRoaXMub25TY3JvbGwoKTtcbiAgfVxuXG4gIHByaXZhdGUgc2Nyb2xsVG8oc2VjdGlvbklkKSB7XG4gICAgdGhpcy5kaXNhYmxlRW1pdHRlciA9IHRydWU7XG5cbiAgICB0aGlzLm5hdGl2ZUVsZW1lbnQoKS5xdWVyeVNlbGVjdG9yKCcjJyArIHNlY3Rpb25JZCkuc2Nyb2xsSW50b1ZpZXcoKTtcblxuICAgIC8vIHNldCB0aW1lb3V0IHRvIGVuZm9yY2Ugc2Nyb2xsIGV2ZW50IGV4ZWN1dGUgYmVmb3JlIGVuYWJsaW5nIGJhY2sgdGhlIGVtaXR0ZXJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuZGlzYWJsZUVtaXR0ZXIgPSBmYWxzZTtcbiAgICB9LCAwKTtcbiAgfVxuXG4gIHByaXZhdGUgZmluZEN1cnJlbnRTZWN0aW9uKCk6IEhUTUxFbGVtZW50IHtcbiAgICBjb25zdCBzY3JvbGxNaWRkbGUgPSAodGhpcy5zY3JvbGxUb3BQb3NpdGlvbigpICsgdGhpcy5zY3JvbGxCb3R0b21Qb3NpdGlvbigpKSAvIDI7XG4gICAgY29uc3Qgc3BpZWRTZWN0aW9ucyA9IHRoaXMuZ2V0U3BpZWRTZWN0aW9ucygpO1xuICAgIHJldHVybiBzcGllZFNlY3Rpb25zLmZpbmQoKHNlY3Rpb24pID0+IHRoaXMuaXNDdXJyZW50U2VjdGlvbihzZWN0aW9uLCBzY3JvbGxNaWRkbGUpKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0U3BpZWRTZWN0aW9ucygpOiBIVE1MRWxlbWVudFtdIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLm5hdGl2ZUVsZW1lbnQoKS5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuc3B5U2VsZWN0b3IpKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNDdXJyZW50U2VjdGlvbihzZWN0aW9uOiBIVE1MRWxlbWVudCwgc2Nyb2xsTWlkZGxlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zZWN0aW9uVG9wUG9zaXRpb24oc2VjdGlvbikgPD0gc2Nyb2xsTWlkZGxlXG4gICAgICAmJiB0aGlzLnNlY3Rpb25Cb3R0b21Qb3NpdGlvbihzZWN0aW9uKSA+IHNjcm9sbE1pZGRsZTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0Q3VycmVudFNlY3Rpb24oc2VjdGlvbklkOiBzdHJpbmcpIHtcbiAgICBpZiAoIXRoaXMuZGlzYWJsZUVtaXR0ZXIpIHtcbiAgICAgIHRoaXMuY3VycmVudFNlY3Rpb24kLm5leHQoc2VjdGlvbklkKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNlY3Rpb25Ub3BQb3NpdGlvbihzZWN0aW9uOiBIVE1MRWxlbWVudCkge1xuICAgIHJldHVybiBzZWN0aW9uLm9mZnNldFRvcDtcbiAgfVxuXG4gIHByaXZhdGUgc2VjdGlvbkJvdHRvbVBvc2l0aW9uKHNlY3Rpb246IEhUTUxFbGVtZW50KSB7XG4gICAgcmV0dXJuIHNlY3Rpb24ub2Zmc2V0VG9wICsgc2VjdGlvbi5vZmZzZXRIZWlnaHQ7XG4gIH1cblxuICBwcml2YXRlIHNjcm9sbFRvcFBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnNjcm9sbE9mZnNldCArIHRoaXMubmF0aXZlRWxlbWVudCgpLnNjcm9sbFRvcDtcbiAgfVxuXG4gIHByaXZhdGUgc2Nyb2xsQm90dG9tUG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuc2Nyb2xsT2Zmc2V0ICsgdGhpcy5uYXRpdmVFbGVtZW50KCkuc2Nyb2xsVG9wICsgdGhpcy5uYXRpdmVFbGVtZW50KCkub2Zmc2V0SGVpZ2h0O1xuICB9XG5cbiAgcHJpdmF0ZSBuYXRpdmVFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG59XG4iXX0=