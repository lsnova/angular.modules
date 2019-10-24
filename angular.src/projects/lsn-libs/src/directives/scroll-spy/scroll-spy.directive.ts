import { Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, tap } from 'rxjs/operators';

@Directive({
  selector: '[lsnScrollSpy]'
})
export class ScrollSpyDirective implements OnInit, OnDestroy {

  @Input()
  spySelector: string;

  @Input()
  scrollToSection: Observable<string>;

  @Output()
  spySectionChange = new EventEmitter<string>();

  private scrollOffset: number;
  private currentSection$: Subject<string>;
  private disableEmitter = false;

  subscriptions: Subscription[] = [];

  constructor(private elementRef: ElementRef) {
    this.currentSection$ = new Subject();
  }

  ngOnInit(): void {
    this.scrollOffset = this.nativeElement().offsetTop;

    // emit event on section change
    const sectionChangeSub = this.currentSection$.pipe(
      distinctUntilChanged(),
      tap((sectionId) => this.spySectionChange.emit(sectionId))
    ).subscribe();

    // scroll to given section
    const scrollToSub = this.scrollToSection.pipe(
      filter((section) => !!section),
      tap((section) => this.scrollTo(section))
    ).subscribe();

    this.subscriptions.push(sectionChangeSub, scrollToSub);
  }

  @HostListener('scroll')
  onScroll() {
    const section: HTMLElement = this.findCurrentSection();
    if (section) {
      this.setCurrentSection(section.id);
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.onScroll();
  }

  private scrollTo(sectionId) {
    this.disableEmitter = true;

    this.nativeElement().querySelector('#' + sectionId).scrollIntoView();

    // set timeout to enforce scroll event execute before enabling back the emitter
    setTimeout(() => {
      this.disableEmitter = false;
    }, 0);
  }

  private findCurrentSection(): HTMLElement {
    const scrollMiddle = (this.scrollTopPosition() + this.scrollBottomPosition()) / 2;
    const spiedSections = this.getSpiedSections();
    return spiedSections.find((section) => this.isCurrentSection(section, scrollMiddle));
  }

  private getSpiedSections(): HTMLElement[] {
    return Array.from(this.nativeElement().querySelectorAll(this.spySelector));
  }

  private isCurrentSection(section: HTMLElement, scrollMiddle: number): boolean {
    return this.sectionTopPosition(section) <= scrollMiddle
      && this.sectionBottomPosition(section) > scrollMiddle;
  }

  private setCurrentSection(sectionId: string) {
    if (!this.disableEmitter) {
      this.currentSection$.next(sectionId);
    }
  }

  private sectionTopPosition(section: HTMLElement) {
    return section.offsetTop;
  }

  private sectionBottomPosition(section: HTMLElement) {
    return section.offsetTop + section.offsetHeight;
  }

  private scrollTopPosition() {
    return this.scrollOffset + this.nativeElement().scrollTop;
  }

  private scrollBottomPosition() {
    return this.scrollOffset + this.nativeElement().scrollTop + this.nativeElement().offsetHeight;
  }

  private nativeElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
