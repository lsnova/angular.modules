import {NgModule} from '@angular/core';
import {CapitalizeDirective} from './capitalize.directive';

@NgModule({
  declarations: [
    CapitalizeDirective,
  ],
  imports: [],
  exports: [
    CapitalizeDirective,
  ]
})
export class LsnCapitalizeModule {
}
