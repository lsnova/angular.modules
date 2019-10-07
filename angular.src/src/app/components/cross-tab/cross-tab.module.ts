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
        cookieCleanFreq: 5000,
        cookieReadFreq: 100,
        msgTtl: 15000,
        rootDomain: 'localhost:4200',
        crossTabCookieName: 'ih-crosstab-data'
      })
    },
    {provide: LSN_COOKIE_CONFIG, useValue: new LsnCookieConfig()},
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
