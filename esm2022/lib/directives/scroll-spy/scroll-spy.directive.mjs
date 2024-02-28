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
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: ScrollSpyDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    /** @nocollapse */ static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.2.1", type: ScrollSpyDirective, selector: "[lsnScrollSpy]", inputs: { spySelector: "spySelector", scrollToSection: "scrollToSection" }, outputs: { spySectionChange: "spySectionChange" }, host: { listeners: { "scroll": "onScroll()", "window:resize": "onResize()" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: ScrollSpyDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[lsnScrollSpy]'
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { spySelector: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLXNweS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9sc24tbGlicy9zcmMvbGliL2RpcmVjdGl2ZXMvc2Nyb2xsLXNweS9zY3JvbGwtc3B5LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BILE9BQU8sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUN6RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQUtuRSxNQUFNLE9BQU8sa0JBQWtCO0lBaUI3QixZQUFvQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBUjFDLHFCQUFnQixHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFJdEMsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFFL0Isa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBR2pDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLFNBQVMsQ0FBQztRQUVuRCwrQkFBK0I7UUFDL0IsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FDaEQsb0JBQW9CLEVBQUUsRUFDdEIsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQzFELENBQUMsU0FBUyxFQUFFLENBQUM7UUFFZCwwQkFBMEI7UUFDMUIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQzNDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUM5QixHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FDekMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUVkLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFHRCxRQUFRO1FBQ04sTUFBTSxPQUFPLEdBQWdCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQ3ZELElBQUksT0FBTyxFQUFFLENBQUM7WUFDWixJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLENBQUM7SUFDSCxDQUFDO0lBR0QsUUFBUTtRQUNOLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRU8sUUFBUSxDQUFDLFNBQVM7UUFDeEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFFM0IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFckUsK0VBQStFO1FBQy9FLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUM5QixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDO0lBRU8sa0JBQWtCO1FBQ3hCLE1BQU0sWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEYsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDOUMsT0FBTyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUM7SUFDdkYsQ0FBQztJQUVPLGdCQUFnQjtRQUN0QixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxPQUFvQixFQUFFLFlBQW9CO1FBQ2pFLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxJQUFJLFlBQVk7ZUFDbEQsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxHQUFHLFlBQVksQ0FBQztJQUMxRCxDQUFDO0lBRU8saUJBQWlCLENBQUMsU0FBaUI7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN6QixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2QyxDQUFDO0lBQ0gsQ0FBQztJQUVPLGtCQUFrQixDQUFDLE9BQW9CO1FBQzdDLE9BQU8sT0FBTyxDQUFDLFNBQVMsQ0FBQztJQUMzQixDQUFDO0lBRU8scUJBQXFCLENBQUMsT0FBb0I7UUFDaEQsT0FBTyxPQUFPLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7SUFDbEQsQ0FBQztJQUVPLGlCQUFpQjtRQUN2QixPQUFPLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLFNBQVMsQ0FBQztJQUM1RCxDQUFDO0lBRU8sb0JBQW9CO1FBQzFCLE9BQU8sSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxZQUFZLENBQUM7SUFDaEcsQ0FBQztJQUVPLGFBQWE7UUFDbkIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztJQUN2QyxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDdkQsQ0FBQztpSUExR1Usa0JBQWtCO3FIQUFsQixrQkFBa0I7OzJGQUFsQixrQkFBa0I7a0JBSDlCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtpQkFDM0I7K0VBSUMsV0FBVztzQkFEVixLQUFLO2dCQUlOLGVBQWU7c0JBRGQsS0FBSztnQkFJTixnQkFBZ0I7c0JBRGYsTUFBTTtnQkFnQ1AsUUFBUTtzQkFEUCxZQUFZO3VCQUFDLFFBQVE7Z0JBU3RCLFFBQVE7c0JBRFAsWUFBWTt1QkFBQyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpbHRlciwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbHNuU2Nyb2xsU3B5XSdcbn0pXG5leHBvcnQgY2xhc3MgU2Nyb2xsU3B5RGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpXG4gIHNweVNlbGVjdG9yOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgc2Nyb2xsVG9TZWN0aW9uOiBPYnNlcnZhYmxlPHN0cmluZz47XG5cbiAgQE91dHB1dCgpXG4gIHNweVNlY3Rpb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBwcml2YXRlIHNjcm9sbE9mZnNldDogbnVtYmVyO1xuICBwcml2YXRlIGN1cnJlbnRTZWN0aW9uJDogU3ViamVjdDxzdHJpbmc+O1xuICBwcml2YXRlIGRpc2FibGVFbWl0dGVyID0gZmFsc2U7XG5cbiAgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLmN1cnJlbnRTZWN0aW9uJCA9IG5ldyBTdWJqZWN0KCk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNjcm9sbE9mZnNldCA9IHRoaXMubmF0aXZlRWxlbWVudCgpLm9mZnNldFRvcDtcblxuICAgIC8vIGVtaXQgZXZlbnQgb24gc2VjdGlvbiBjaGFuZ2VcbiAgICBjb25zdCBzZWN0aW9uQ2hhbmdlU3ViID0gdGhpcy5jdXJyZW50U2VjdGlvbiQucGlwZShcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICB0YXAoKHNlY3Rpb25JZCkgPT4gdGhpcy5zcHlTZWN0aW9uQ2hhbmdlLmVtaXQoc2VjdGlvbklkKSlcbiAgICApLnN1YnNjcmliZSgpO1xuXG4gICAgLy8gc2Nyb2xsIHRvIGdpdmVuIHNlY3Rpb25cbiAgICBjb25zdCBzY3JvbGxUb1N1YiA9IHRoaXMuc2Nyb2xsVG9TZWN0aW9uLnBpcGUoXG4gICAgICBmaWx0ZXIoKHNlY3Rpb24pID0+ICEhc2VjdGlvbiksXG4gICAgICB0YXAoKHNlY3Rpb24pID0+IHRoaXMuc2Nyb2xsVG8oc2VjdGlvbikpXG4gICAgKS5zdWJzY3JpYmUoKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHNlY3Rpb25DaGFuZ2VTdWIsIHNjcm9sbFRvU3ViKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3Njcm9sbCcpXG4gIG9uU2Nyb2xsKCkge1xuICAgIGNvbnN0IHNlY3Rpb246IEhUTUxFbGVtZW50ID0gdGhpcy5maW5kQ3VycmVudFNlY3Rpb24oKTtcbiAgICBpZiAoc2VjdGlvbikge1xuICAgICAgdGhpcy5zZXRDdXJyZW50U2VjdGlvbihzZWN0aW9uLmlkKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJylcbiAgb25SZXNpemUoKSB7XG4gICAgdGhpcy5vblNjcm9sbCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzY3JvbGxUbyhzZWN0aW9uSWQpIHtcbiAgICB0aGlzLmRpc2FibGVFbWl0dGVyID0gdHJ1ZTtcblxuICAgIHRoaXMubmF0aXZlRWxlbWVudCgpLnF1ZXJ5U2VsZWN0b3IoJyMnICsgc2VjdGlvbklkKS5zY3JvbGxJbnRvVmlldygpO1xuXG4gICAgLy8gc2V0IHRpbWVvdXQgdG8gZW5mb3JjZSBzY3JvbGwgZXZlbnQgZXhlY3V0ZSBiZWZvcmUgZW5hYmxpbmcgYmFjayB0aGUgZW1pdHRlclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5kaXNhYmxlRW1pdHRlciA9IGZhbHNlO1xuICAgIH0sIDApO1xuICB9XG5cbiAgcHJpdmF0ZSBmaW5kQ3VycmVudFNlY3Rpb24oKTogSFRNTEVsZW1lbnQge1xuICAgIGNvbnN0IHNjcm9sbE1pZGRsZSA9ICh0aGlzLnNjcm9sbFRvcFBvc2l0aW9uKCkgKyB0aGlzLnNjcm9sbEJvdHRvbVBvc2l0aW9uKCkpIC8gMjtcbiAgICBjb25zdCBzcGllZFNlY3Rpb25zID0gdGhpcy5nZXRTcGllZFNlY3Rpb25zKCk7XG4gICAgcmV0dXJuIHNwaWVkU2VjdGlvbnMuZmluZCgoc2VjdGlvbikgPT4gdGhpcy5pc0N1cnJlbnRTZWN0aW9uKHNlY3Rpb24sIHNjcm9sbE1pZGRsZSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRTcGllZFNlY3Rpb25zKCk6IEhUTUxFbGVtZW50W10ge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMubmF0aXZlRWxlbWVudCgpLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5zcHlTZWxlY3RvcikpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0N1cnJlbnRTZWN0aW9uKHNlY3Rpb246IEhUTUxFbGVtZW50LCBzY3JvbGxNaWRkbGU6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNlY3Rpb25Ub3BQb3NpdGlvbihzZWN0aW9uKSA8PSBzY3JvbGxNaWRkbGVcbiAgICAgICYmIHRoaXMuc2VjdGlvbkJvdHRvbVBvc2l0aW9uKHNlY3Rpb24pID4gc2Nyb2xsTWlkZGxlO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRDdXJyZW50U2VjdGlvbihzZWN0aW9uSWQ6IHN0cmluZykge1xuICAgIGlmICghdGhpcy5kaXNhYmxlRW1pdHRlcikge1xuICAgICAgdGhpcy5jdXJyZW50U2VjdGlvbiQubmV4dChzZWN0aW9uSWQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2VjdGlvblRvcFBvc2l0aW9uKHNlY3Rpb246IEhUTUxFbGVtZW50KSB7XG4gICAgcmV0dXJuIHNlY3Rpb24ub2Zmc2V0VG9wO1xuICB9XG5cbiAgcHJpdmF0ZSBzZWN0aW9uQm90dG9tUG9zaXRpb24oc2VjdGlvbjogSFRNTEVsZW1lbnQpIHtcbiAgICByZXR1cm4gc2VjdGlvbi5vZmZzZXRUb3AgKyBzZWN0aW9uLm9mZnNldEhlaWdodDtcbiAgfVxuXG4gIHByaXZhdGUgc2Nyb2xsVG9wUG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuc2Nyb2xsT2Zmc2V0ICsgdGhpcy5uYXRpdmVFbGVtZW50KCkuc2Nyb2xsVG9wO1xuICB9XG5cbiAgcHJpdmF0ZSBzY3JvbGxCb3R0b21Qb3NpdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5zY3JvbGxPZmZzZXQgKyB0aGlzLm5hdGl2ZUVsZW1lbnQoKS5zY3JvbGxUb3AgKyB0aGlzLm5hdGl2ZUVsZW1lbnQoKS5vZmZzZXRIZWlnaHQ7XG4gIH1cblxuICBwcml2YXRlIG5hdGl2ZUVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gIH1cbn1cbiJdfQ==