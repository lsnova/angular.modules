import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LsnCookieModule} from '../lsn-cookie/lsn-cookie.module';

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
