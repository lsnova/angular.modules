import {NgModule} from '@angular/core';
import {CapitalizeDirective} from './directives/capitalize/capitalize.directive';
import {LatinToGreekDirective} from "./directives/latin-to-greek/latin-to-greek.directive";
import {NumericDirective} from './directives/numeric/numeric.directive';
import {NumPadDirective} from './directives/numpad/numpad.directive';

@NgModule({
  declarations: [
    CapitalizeDirective,
    LatinToGreekDirective,
    NumericDirective,
    NumPadDirective,
  ],
  imports: [],
  exports: [
    CapitalizeDirective,
    LatinToGreekDirective,
    NumericDirective,
    NumPadDirective,
  ]
})
export class LsnLibsModule {
}
