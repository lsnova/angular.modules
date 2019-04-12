import {NgModule} from '@angular/core';
import {LsnNumericModule} from './directives/numeric/numeric.module';
import {LsnNumpadModule} from './directives/numpad/numpad.module';
import {LsnLatinToGreekModule} from './directives/latin-to-greek/latin-to-greek.module';
import {LsnCapitalizeModule} from './directives/capitalize/capitalize.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    LsnCapitalizeModule,
    LsnLatinToGreekModule,
    LsnNumericModule.forRoot(),
    LsnNumpadModule,
  ],
  exports: []
})
export class LsnLibsModule {
}
