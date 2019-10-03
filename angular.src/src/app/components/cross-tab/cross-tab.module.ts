import {APP_INITIALIZER, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CrossTabComponent} from './cross-tab.component';
import {
  LSN_COOKIE_CONFIG,
  LSN_CROSS_TAB_CONFIG,
  LsnCookieConfig,
  LsnCrossTabConfig
} from '../../../../projects/lsn-libs/src/lib/services/lsn-cross-tab';
import {MaterialModule} from '../../modules/material.module';
import {LsnCrossTabService} from '../../../../projects/lsn-libs/src/lib/services/lsn-cross-tab/lsn-cross-tab.service';
import {ReactiveFormsModule} from '@angular/forms';

function crossTabServiceFactory(lsnCrossTabService: LsnCrossTabService) {
  return () => lsnCrossTabService.run();
}

@NgModule({
  declarations: [CrossTabComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: LSN_CROSS_TAB_CONFIG, useValue: new LsnCrossTabConfig({
        COOKIE_CLEAN_FREQ: 5000,
        COOKIE_READ_FREQ: 100,
        MSG_TTL: 15000,
        ROOT_DOMAIN: 'localhost:4200',
        SSO_REFRESH_URL: '/api/apm/v1/touch.php3'
      })
    },
    {provide: LSN_COOKIE_CONFIG, useValue: new LsnCookieConfig({CROSS_TAB: 'ih-crosstab-data'})},
    {
      provide: APP_INITIALIZER,
      deps: [LsnCrossTabService],
      useFactory: crossTabServiceFactory,
      multi: true
    }
  ],
  exports: [
    CrossTabComponent
  ]
})
export class CrossTabModule {
}
