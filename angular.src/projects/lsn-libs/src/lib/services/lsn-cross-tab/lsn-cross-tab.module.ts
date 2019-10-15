import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LsnCrossTabService} from './lsn-cross-tab.service';
import {LsnCookieModule} from '../lsn-cookie';

@NgModule({
  providers: [LsnCrossTabService],
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
