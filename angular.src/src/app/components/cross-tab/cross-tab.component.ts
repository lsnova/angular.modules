import {Component, OnInit} from '@angular/core';
import {LsnCookieService, LsnCrossTabService} from 'lsn-libs';
import {FormControl, FormGroup} from '@angular/forms';

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

  constructor(private lsnCrossTabService: LsnCrossTabService) {
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
