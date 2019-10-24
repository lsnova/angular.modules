import {NgModule} from '@angular/core';
import {LsnNumericModule} from '@lsnova/angularmodules/directives/numeric';
import {LsnNumpadModule} from '@lsnova/angularmodules/directives/numpad';
import {LsnLatinToGreekModule} from '@lsnova/angularmodules/directives/latin-to-greek';
import {LsnCapitalizeModule} from '@lsnova/angularmodules/directives/capitalize';
import {LsnMatSelectModule} from '@lsnova/angularmodules/components/mat-select';
import {LsnScrollSpyModule} from '@lsnova/angularmodules/directives/scroll-spy';
import {FormsModule} from '@angular/forms';
import {LsnCrossTabModule} from '@lsnova/angularmodules/services/lsn-cross-tab';
import {LsnCookieModule} from '@lsnova/angularmodules/services/lsn-cookie';

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
    LsnCookieModule,
    LsnCrossTabModule,
    LsnScrollSpyModule
  ],
  exports: [
    LsnCapitalizeModule,
    LsnLatinToGreekModule,
    LsnNumericModule,
    LsnNumpadModule,
    LsnMatSelectModule,
    LsnCookieModule,
    LsnCrossTabModule,
    LsnScrollSpyModule
  ]
})
export class LsnLibsModule {
}
