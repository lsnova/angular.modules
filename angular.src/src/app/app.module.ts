import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {
  LsnCapitalizeModule,
  LsnLatinToGreekModule,
  LsnNumericModule,
  LsnNumpadModule,
} from '@lsnova/angularmodules';

import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // lib modules
    LsnCapitalizeModule,
    LsnLatinToGreekModule,
    LsnNumericModule.forRoot(),
    LsnNumpadModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
