import {Component} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [
    MatToolbar,
    MatToolbar,
    MatButton
  ]
})
export class NavbarComponent {

}
