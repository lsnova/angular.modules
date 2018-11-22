import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {NumericDirective} from '@lsnova/angularmodules';

import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    NumericDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
