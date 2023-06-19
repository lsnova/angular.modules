import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { AdvChatbotHelper } from './adv-chatbot.helper';
import { Subscription } from 'rxjs';
import { AdvChatbotEvent, AdvChatbotWidgetConfig } from "./adv-chatbot.model";
import * as i0 from "@angular/core";
export declare abstract class AbstractAdvChatbotComponent implements OnInit, OnDestroy {
    protected chatBotHelper: AdvChatbotHelper;
    protected cd: ChangeDetectorRef;
    protected eventsSub: Subscription;
    unreadMessages: boolean;
    abstract audioSrc: string;
    protected audio: HTMLAudioElement;
    constructor(chatBotHelper: AdvChatbotHelper, cd: ChangeDetectorRef);
    ngOnInit(): void;
    toggleVisibility(config: AdvChatbotWidgetConfig): void;
    playAudio(): void;
    protected handleEvent(event: AdvChatbotEvent): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AbstractAdvChatbotComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AbstractAdvChatbotComponent, "ng-component", never, {}, {}, never, never, false, never>;
}
