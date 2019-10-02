import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CrossTabComponent} from './cross-tab.component';
import {
  LSN_COOKIE_CONFIG,
  LSN_CROSS_TAB_CONFIG,
  LsnCookieConfig,
  LsnCrossTabConfig
} from '../../../../projects/lsn-libs/src/lib/services/lsn-cross-tab';

@NgModule({
  declarations: [CrossTabComponent],
  imports: [
    CommonModule
  ],
  providers: [
    {provide: LSN_CROSS_TAB_CONFIG, useValue: new LsnCrossTabConfig()},
    {provide: LSN_COOKIE_CONFIG, useValue: new LsnCookieConfig()}
  ],
  exports: [
    CrossTabComponent
  ]
})
export class CrossTabModule {
}
