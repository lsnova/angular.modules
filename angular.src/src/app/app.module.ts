import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {LsnLibsModule, LsnScrollSpyModule} from 'lsn-libs';

import {MaterialModule} from './modules/material.module';
import {AppComponent} from './app.component';
import {NumericCardComponent} from './components/numeric-card/numeric-card.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {NumpadCardComponent} from './components/numpad-card/numpad-card.component';
import {CrossTabModule} from './components/cross-tab/cross-tab.module';
import {ScrollSpyComponent} from './components/scroll-spy/scroll-spy.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NumericCardComponent,
    NumpadCardComponent,
    ScrollSpyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    // lib modules
    LsnLibsModule,
    CrossTabModule,
    LsnScrollSpyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
