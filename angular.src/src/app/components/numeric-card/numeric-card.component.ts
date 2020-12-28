import {Component} from '@angular/core';
import {NumericMessage} from 'lsn-libs';

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
  numeric5 = undefined;
  numeric6 = undefined;

  message($event: NumericMessage) {
    switch ($event) {
      case NumericMessage.ADDITIONAL_DECIMAL_SEPARATOR:
        console.log('additional decimal separator!');
    }
  }
}
