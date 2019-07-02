import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

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
export class ScrollSpyComponent implements OnInit {
  scrollToSection$: Subject<string>;

  constructor() {
      this.scrollToSection$ = new Subject<string>();
  }

  ngOnInit() {
  }

  sectionChanged(sectionId: string) {
    this.sections()
      .forEach(section => section.selected = false);

    const section = this.sections()
      .find(section => section.id === sectionId);
    section.selected = true;
  }

  sections() {
    return SECTIONS;
  }

  goToSection(sectionId: string) {
      this.scrollToSection$.next(sectionId);
      this.sectionChanged(sectionId);
  }
}
