import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {LsnLibsModule} from '@lsnova/angularmodules';

import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    LsnLibsModule.forRoot({
      numeric: {
        decimals: '.',
        precision: 4,
      },
      custom: {
        currency: {
          decimals: ',',
          thousands: ' ',
          precision: 2,
        }
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
