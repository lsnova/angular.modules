import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {LsnLibsModule} from '@lsnova/angularmodules';

import {MaterialModule} from './modules/material.module';
import {AppComponent} from './app.component';
import {NumericCardComponent} from './components/numeric-card/numeric-card.component';
import {SelectCardComponent} from './components/select-card/select-card.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {NumpadCardComponent} from './components/numpad-card/numpad-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NumericCardComponent,
    NumpadCardComponent,
    SelectCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    // lib modules
    LsnLibsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
