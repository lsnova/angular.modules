import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LsnCrossTabService} from './lsn-cross-tab.service';
import {LsnCookieService} from 'projects/lsn-libs/src/services/lsn-cookie';

@NgModule({
  providers: [LsnCrossTabService, LsnCookieService],
  imports: [
    CommonModule
  ]
})
export class LsnCrossTabModule {
}
