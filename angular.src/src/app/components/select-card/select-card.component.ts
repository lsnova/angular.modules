import { Component } from '@angular/core';

@Component({
  selector: 'app-select-card',
  templateUrl: './select-card.component.html',
  styles: []
})
export class SelectCardComponent {
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
  ];

  selectedOption = null;
}
