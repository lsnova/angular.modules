import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})

export class AppComponent {
  title = 'angularmodules';
  numeric1 = 10;
  numeric2 = 123456.789;
  numeric3 = undefined;
  numpadValue = 0;
}
