import {Directive, HostListener} from '@angular/core';
import {NgModel} from '@angular/forms';

@Directive({
  selector: '[ngModel][lsnCapitalize]',
  providers: [NgModel],
  standalone: false
})
export class CapitalizeDirective {
  constructor(private model: NgModel) {
  }

  @HostListener('ngModelChange', ['$event'])
  onInputChange($event) {
    this.model.valueAccessor.writeValue($event.toLocaleUpperCase());
  }

}
