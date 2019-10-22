import { ElementRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
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
}
