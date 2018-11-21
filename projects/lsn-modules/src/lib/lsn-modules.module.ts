import {NgModule} from '@angular/core';
import {LsnModulesComponent} from './lsn-modules.component';
import {NumericDirective} from './directives/numeric/numeric.directive';

@NgModule({
  declarations: [
    LsnModulesComponent,
    NumericDirective,
  ],
  imports: [],
  exports: [
    LsnModulesComponent,
    NumericDirective,
  ]
})
export class LsnModulesModule {
}
