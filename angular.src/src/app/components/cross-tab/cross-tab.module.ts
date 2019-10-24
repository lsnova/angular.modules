import {APP_INITIALIZER, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CrossTabComponent} from './cross-tab.component';
import {
  LSN_COOKIE_CONFIG,
  LSN_CROSS_TAB_CONFIG,
  LsnCookieConfig,
  LsnCrossTabConfig,
  LsnCrossTabService,
  lsnCrossTabServiceFactory
} from 'lsn-libs';
import {MaterialModule} from '../../modules/material.module';
import {ReactiveFormsModule} from '@angular/forms';

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
        rootDomain: 'localhost',
        crossTabCookieName: 'ih-crosstab-data'
      })
    },
    {provide: LSN_COOKIE_CONFIG, useValue: new LsnCookieConfig()},
    {
      provide: APP_INITIALIZER,
      deps: [LsnCrossTabService],
      useFactory: lsnCrossTabServiceFactory,
      multi: true
    }
  ],
  exports: [
    CrossTabComponent
  ]
})
export class CrossTabModule {
}
