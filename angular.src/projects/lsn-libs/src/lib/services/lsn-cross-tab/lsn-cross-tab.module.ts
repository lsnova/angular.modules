import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LsnCrossTabService} from './lsn-cross-tab.service';
import {LsnCookieService} from '../lsn-cookie/lsn-cookie.service';

@NgModule({
    providers: [LsnCrossTabService, LsnCookieService],
    imports: [
        CommonModule
    ]
})
export class LsnCrossTabModule {
}
