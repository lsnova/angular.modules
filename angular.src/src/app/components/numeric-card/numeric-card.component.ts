import {Component} from '@angular/core';
import {NumericConfig, NumericMessage} from 'lsn-libs';

@Component({
  selector: 'app-numeric-card',
  templateUrl: './numeric-card.component.html',
  styles: [],
  standalone: false
})
export class NumericCardComponent {
  numeric1 = 10;
  numeric2 = 123456.789;
  numeric3 = undefined;
  numeric4 = 1;
  numeric5 = undefined;
  numeric6 = undefined;
  numeric7 = -1_000_000_000_000_000_000_000;
  numeric8 = 0;
  numeric9 = 1;
  dynamicConfig1: NumericConfig = {min: 0, max: 10};
  dynamicConfig2: NumericConfig = {min: 3, max: 5};
  currentDynamicConfig = this.dynamicConfig1;

  message($event: NumericMessage) {
    switch ($event) {
      case NumericMessage.ADDITIONAL_DECIMAL_SEPARATOR:
        console.log('additional decimal separator!');
        break;
      case NumericMessage.RANGE_EXCEEDED:
        console.log('range exceeded!');
        break;
    }
  }

  toggleDynamicConfig(){
    this.currentDynamicConfig = this.currentDynamicConfig === this.dynamicConfig1 ? this.dynamicConfig2 : this.dynamicConfig1;
  }
}
