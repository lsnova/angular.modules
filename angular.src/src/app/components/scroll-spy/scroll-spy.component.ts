import { Component } from '@angular/core';
import { Subject } from 'rxjs';

interface ISection {
  id: string;
  selected: boolean;
}

const SECTIONS: ISection[] = [
  {id: 'section1', selected: true},
  {id: 'section2', selected: false},
  {id: 'section3', selected: false},
  {id: 'section4', selected: false},
  {id: 'section5', selected: false},
  {id: 'section6', selected: false}
];


@Component({
  selector: 'app-scroll-spy',
  templateUrl: './scroll-spy.component.html',
  styleUrls: ['./scroll-spy.component.scss']
})
export class ScrollSpyComponent {
  scrollToSection$: Subject<string>;
  sections: ISection[];

  constructor() {
    this.scrollToSection$ = new Subject<string>();
    this.sections = [...SECTIONS];
  }

  sectionChanged(sectionId: string) {
    this.sections = [...SECTIONS];

    this.sections = this.sections.map(section => ({
      ...section,
      selected: section.id === sectionId
    }));
  }

  goToSection(sectionId: string) {
    this.scrollToSection$.next(sectionId);
    this.sectionChanged(sectionId);
  }
}
