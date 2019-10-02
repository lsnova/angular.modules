import {Component, OnInit} from '@angular/core';
import {LsnCrossTabService} from '../../../../projects/lsn-libs/src/lib/services/lsn-cross-tab/lsn-cross-tab.service';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
  selector: 'app-cross-tab',
  templateUrl: './cross-tab.component.html',
  styles: []
})
export class CrossTabComponent implements OnInit {

  private cookiesSubject: BehaviorSubject<any>;
  cookies$: Observable<any>;
  constructor(private lsnCrossTabService: LsnCrossTabService) {
  }

  ngOnInit() {
    this.cookiesSubject = new BehaviorSubject<any>(null);
    this.cookies$ = this.cookiesSubject.asObservable();
    this.loadCookies();
  }
  loadCookies() {
    this.lsnCrossTabService.sendMessage('some message');
  }

}
