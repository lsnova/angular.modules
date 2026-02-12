import {Component, OnDestroy, OnInit} from '@angular/core';
import {LsnCrossTabService} from 'lsn-libs';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-cross-tab',
  templateUrl: './cross-tab.component.html',
  standalone: false
})
export class CrossTabComponent implements OnInit, OnDestroy {
  form = new FormGroup({
    message: new FormControl('')
  });

  readonly messagesReceived: Array<object>;

  constructor(private lsnCrossTabService: LsnCrossTabService) {
    this.messagesReceived = [];
  }

  ngOnInit(): void {
    this.lsnCrossTabService.run();
    this.lsnCrossTabService.messages$.subscribe((message: object) =>
      this.messagesReceived.push(message));
  }


  get message() {
    return this.form.controls.message;
  }

  sendMessage() {
    this.lsnCrossTabService.sendMessage(this.message.value ?? '');
    this.message.reset();
  }

  printCookie() {
    console.log(this.lsnCrossTabService.getCookie());
  }

  ngOnDestroy() {
    this.lsnCrossTabService.ngOnDestroy();
  }
}
