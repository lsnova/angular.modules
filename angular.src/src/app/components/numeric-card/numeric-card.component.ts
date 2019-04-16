import { Component } from '@angular/core';

@Component({
  selector: 'app-numeric-card',
  templateUrl: './numeric-card.component.html',
  styles: []
})
export class NumericCardComponent {
  numeric1 = 10;
  numeric2 = 123456.789;
  numeric3 = undefined;
  numeric4 = 1;
}
