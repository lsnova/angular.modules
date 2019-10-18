import {NgModule} from '@angular/core';
import {LsnNumericModule} from './directives/numeric/numeric.module';
import {LsnNumpadModule} from './directives/numpad/numpad.module';
import {LsnLatinToGreekModule} from './directives/latin-to-greek/latin-to-greek.module';
import {LsnCapitalizeModule} from './directives/capitalize/capitalize.module';
import {LsnMatSelectModule} from './components/mat-select/mat-select.module';
import {LsnScrollSpyModule} from './directives/scroll-spy';
import {FormsModule} from '@angular/forms';
import {LsnCrossTabModule} from './services/lsn-cross-tab/lsn-cross-tab.module';

@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    LsnCapitalizeModule,
    LsnLatinToGreekModule,
    LsnNumericModule.forRoot({
      default: {
        decimals: '.',
        precision: 4,
      },
      custom: {
        currency: {
          decimals: ',',
          thousands: ' ',
          precision: 2,
        }
      }
    }),
    LsnNumpadModule,
    LsnMatSelectModule,
    LsnScrollSpyModule,
    LsnCrossTabModule
  ],
  exports: [
    LsnCapitalizeModule,
    LsnLatinToGreekModule,
    LsnNumericModule,
    LsnNumpadModule,
    LsnMatSelectModule,
    LsnScrollSpyModule,
    LsnCrossTabModule
  ]
})
export class LsnLibsModule {
}
