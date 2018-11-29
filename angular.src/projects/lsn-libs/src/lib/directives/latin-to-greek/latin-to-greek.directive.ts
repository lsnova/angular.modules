import {Directive, HostListener} from '@angular/core';
import {NgModel} from '@angular/forms';


@Directive({
  selector: '[ngModel][lsnLatinToGreek]',
  providers: [NgModel]
})
export class LatinToGreekDirective {

  private latinToGreek = [
    [/A/ig, 'Α'],
    [/B/ig, 'Β'],
    [/G/ig, 'Γ'],
    [/D/ig, 'Δ'],
    [/E/ig, 'Ε'],
    [/Z/ig, 'Ζ'],
    [/H/ig, 'Η'],
    [/U/ig, 'Θ'],
    [/I/ig, 'Ι'],
    [/K/ig, 'Κ'],
    [/L/ig, 'Λ'],
    [/M/ig, 'Μ'],
    [/N/ig, 'Ν'],
    [/J/ig, 'Ξ'],
    [/O/ig, 'Ο'],
    [/P/ig, 'Π'],
    [/R/ig, 'Ρ'],
    [/S/ig, 'Σ'],
    [/T/ig, 'Τ'],
    [/Y/ig, 'Υ'],
    [/F/ig, 'Φ'],
    [/X/ig, 'Χ'],
    [/C/ig, 'Ψ'],
    [/V/ig, 'Ω'],
    [/W/ig, 'W'],
    [/Q/ig, 'Q']
  ];

  constructor(private model: NgModel) {
  }

  @HostListener('ngModelChange', ['$event'])
  onInputChange($event) {
    let translated = $event;
    this.latinToGreek.forEach(replace => {
      translated = translated.replace(replace[0], replace[1]);
    });
    this.model.valueAccessor.writeValue(translated);
  }

}
