import {NgModule} from '@angular/core';
import {NumericDirective} from './directives/numeric/numeric.directive';
import {NumPadDirective} from './directives/numpad/numpad.directive';

@NgModule({
  declarations: [
    NumericDirective,
    NumPadDirective,
  ],
  imports: [],
  exports: [
    NumericDirective,
    NumPadDirective,
  ]
})
export class LsnLibsModule {
}
