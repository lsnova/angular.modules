import {Component, OnInit} from '@angular/core';
import {LsnCrossTabService} from '../../../../projects/lsn-libs/src/lib/services/lsn-cross-tab/lsn-cross-tab.service';
import {FormControl, FormGroup} from '@angular/forms';
import {LsnCookieService} from "../../../../projects/lsn-libs/src/lib/services/lsn-cookie/lsn-cookie.service";

@Component({
  selector: 'app-cross-tab',
  templateUrl: './cross-tab.component.html',
  styles: []
})
export class CrossTabComponent implements OnInit {
  form = new FormGroup({
    message: new FormControl('')
  });

  readonly messagesReceived: Array<object>;

  constructor(private lsnCrossTabService: LsnCrossTabService, private lsnCookieService: LsnCookieService) {
    this.messagesReceived = [];
  }

  ngOnInit(): void {
    this.lsnCrossTabService.messages$.subscribe((message) =>
      this.messagesReceived.push(message));
  }


  get message() {
    return this.form.get('message');
  }

  sendMessage() {
    this.lsnCrossTabService.sendMessage(this.message.value);
    this.message.reset();
  }

  printCookie() {
    console.log(this.lsnCrossTabService.getCookie());
  }
}
