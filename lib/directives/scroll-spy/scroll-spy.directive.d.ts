import { ElementRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class ScrollSpyDirective implements OnInit, OnDestroy {
    private elementRef;
    spySelector: string;
    scrollToSection: Observable<string>;
    spySectionChange: EventEmitter<string>;
    private scrollOffset;
    private currentSection$;
    private disableEmitter;
    subscriptions: Subscription[];
    constructor(elementRef: ElementRef);
    ngOnInit(): void;
    onScroll(): void;
    onResize(): void;
    private scrollTo;
    private findCurrentSection;
    private getSpiedSections;
    private isCurrentSection;
    private setCurrentSection;
    private sectionTopPosition;
    private sectionBottomPosition;
    private scrollTopPosition;
    private scrollBottomPosition;
    private nativeElement;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ScrollSpyDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ScrollSpyDirective, "[lsnScrollSpy]", never, { "spySelector": "spySelector"; "scrollToSection": "scrollToSection"; }, { "spySectionChange": "spySectionChange"; }, never, never, false>;
}
