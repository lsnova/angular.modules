import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AdvChatbotHelper} from './adv-chatbot.helper';
import {Subscription} from 'rxjs';
import {AdvChatbot} from './adv-chatbot.model';

@Component({
  template: ''
})
export abstract class AbstractAdvChatbotComponent implements OnInit, OnDestroy {

  protected eventsSub: Subscription;
  unreadMessages = false;
  abstract audioSrc: string;
  protected audio: HTMLAudioElement;

  constructor(protected chatBotHelper: AdvChatbotHelper,
              protected cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.audio = new Audio(this.audioSrc);
    this.eventsSub = this.chatBotHelper.events
      .subscribe(this.handleEvent.bind(this));
  }

  toggleVisibility(config: AdvChatbot.WidgetConfig) {
    // when opening widget, remove unread messages mark
    this.unreadMessages = false;
    this.chatBotHelper.toggleVisibility(config);
  }

  playAudio() {
    if (this.audio.paused) {
      this.audio.play();
    } else {
      // if audio is playing, reset it (immediately plays again)
      this.audio.currentTime = 0;
    }
  }

  protected handleEvent(event: AdvChatbot.Event) {
    if (event.type === AdvChatbot.Events.newMessage) {
      this.unreadMessages = event.value;
      this.playAudio();
    }
    this.cd.markForCheck();
  }

  ngOnDestroy() {
    this.eventsSub?.unsubscribe();
  }

}
