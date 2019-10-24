import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LsnCookieModule} from '../lsn-cookie/lsn-cookie.module';
import {LsnCrossTabService} from './lsn-cross-tab.service';

export function lsnCrossTabServiceFactory(lsnCrossTabService: LsnCrossTabService) {
  return () => lsnCrossTabService.run();
}

@NgModule({
  imports: [
    CommonModule,
    LsnCookieModule
  ],
  exports: [
    LsnCookieModule
  ]
})
export class LsnCrossTabModule {
}
