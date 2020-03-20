import {NgModule} from '@angular/core';
import {LsnNumericModule} from './directives/numeric/numeric.module';
import {LsnNumpadModule} from './directives/numpad/numpad.module';
import {LsnLatinToGreekModule} from './directives/latin-to-greek/latin-to-greek.module';
import {LsnCapitalizeModule} from './directives/capitalize/capitalize.module';
import {LsnScrollSpyModule} from './directives/scroll-spy/scroll-spy.module';
import {FormsModule} from '@angular/forms';
import {LsnCrossTabModule} from './services/lsn-cross-tab/lsn-cross-tab.module';
import {LsnCookieModule} from './services/lsn-cookie/lsn-cookie.module';

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
    LsnCookieModule,
    LsnCrossTabModule,
    LsnScrollSpyModule
  ],
  exports: [
    LsnCapitalizeModule,
    LsnLatinToGreekModule,
    LsnNumericModule,
    LsnNumpadModule,
    LsnCookieModule,
    LsnCrossTabModule,
    LsnScrollSpyModule
  ]
})
export class LsnLibsModule {
}
