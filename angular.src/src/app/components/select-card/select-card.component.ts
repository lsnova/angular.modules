import {Component} from '@angular/core';
import {ErrorStateMatcher} from '@angular/material';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  control: FormControl;

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    if (control.value && control.value.code === 'SPT') {
      control.setErrors({'sparta': 'This is Sparta!'});
    }
    return control.value && control.value.code === 'SPT';
  }
}

@Component({
  selector: 'app-select-card',
  templateUrl: './select-card.component.html',
  styles: []
})
export class SelectCardComponent {
  countryCodeErrorStateMatcher: MyErrorStateMatcher = new MyErrorStateMatcher();
  options = [
    {code: 'AUS', description: 'Australia'},
    {code: 'BLR', description: 'Belarus'},
    {code: 'BEL', description: 'Belgium'},
    {code: 'CAN', description: 'Canada'},
    {code: 'CYM', description: 'Cayman Islands'},
    {code: 'COD', description: 'Democratic Republic of the Congo'},
    {code: 'FRA', description: 'France'},
    {code: 'IMN', description: 'Isle of Man'},
    {code: 'ITA', description: 'Italy'},
    {code: 'POL', description: 'Poland'},
    {code: 'SPT', description: 'Sparta'},
  ];

  singleOption = null;
  singleOptionCode = null;
  multipleOptions = [];
}
