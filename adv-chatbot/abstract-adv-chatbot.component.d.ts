import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { AdvChatbotHelper } from './adv-chatbot.helper';
import { Subscription } from 'rxjs';
import { AdvChatbot } from './adv-chatbot.model';
export declare abstract class AbstractAdvChatbotComponent implements OnInit, OnDestroy {
    protected chatBotHelper: AdvChatbotHelper;
    protected cd: ChangeDetectorRef;
    protected eventsSub: Subscription;
    unreadMessages: boolean;
    abstract audioSrc: string;
    protected audio: HTMLAudioElement;
    constructor(chatBotHelper: AdvChatbotHelper, cd: ChangeDetectorRef);
    ngOnInit(): void;
    toggleVisibility(config: AdvChatbot.WidgetConfig): void;
    playAudio(): void;
    protected handleEvent(event: AdvChatbot.Event): void;
    ngOnDestroy(): void;
}
