import { ChangeDetectorRef, Component } from '@angular/core';
import { AdvChatbotHelper } from './adv-chatbot.helper';
import { AdvChatbotEvents } from "./adv-chatbot.model";
import * as i0 from "@angular/core";
import * as i1 from "./adv-chatbot.helper";
export class AbstractAdvChatbotComponent {
    constructor(chatBotHelper, cd) {
        this.chatBotHelper = chatBotHelper;
        this.cd = cd;
        this.unreadMessages = false;
    }
    ngOnInit() {
        this.audio = new Audio(this.audioSrc);
        this.eventsSub = this.chatBotHelper.events
            .subscribe(this.handleEvent.bind(this));
    }
    toggleVisibility(config) {
        // when opening widget, remove unread messages mark
        this.unreadMessages = false;
        this.chatBotHelper.toggleVisibility(config);
    }
    playAudio() {
        if (this.audio.paused) {
            this.audio.play();
        }
        else {
            // if audio is playing, reset it (immediately plays again)
            this.audio.currentTime = 0;
        }
    }
    handleEvent(event) {
        if (event.type === AdvChatbotEvents.newMessage) {
            this.unreadMessages = event.value;
            this.playAudio();
        }
        this.cd.markForCheck();
    }
    ngOnDestroy() {
        this.eventsSub?.unsubscribe();
    }
}
/** @nocollapse */ AbstractAdvChatbotComponent.ɵfac = function AbstractAdvChatbotComponent_Factory(t) { return new (t || AbstractAdvChatbotComponent)(i0.ɵɵdirectiveInject(i1.AdvChatbotHelper), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
/** @nocollapse */ AbstractAdvChatbotComponent.ɵcmp = /** @pureOrBreakMyCode */ i0.ɵɵdefineComponent({ type: AbstractAdvChatbotComponent, selectors: [["ng-component"]], decls: 0, vars: 0, template: function AbstractAdvChatbotComponent_Template(rf, ctx) { }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AbstractAdvChatbotComponent, [{
        type: Component,
        args: [{
                template: ''
            }]
    }], function () { return [{ type: i1.AdvChatbotHelper }, { type: i0.ChangeDetectorRef }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtYWR2LWNoYXRib3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbHNuLWxpYnMvYWR2LWNoYXRib3QvYWJzdHJhY3QtYWR2LWNoYXRib3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxpQkFBaUIsRUFBRSxTQUFTLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBQzlFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRXRELE9BQU8sRUFBa0IsZ0JBQWdCLEVBQXlCLE1BQU0scUJBQXFCLENBQUM7OztBQUs5RixNQUFNLE9BQWdCLDJCQUEyQjtJQU8vQyxZQUFzQixhQUErQixFQUMvQixFQUFxQjtRQURyQixrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFDL0IsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFMM0MsbUJBQWMsR0FBRyxLQUFLLENBQUM7SUFNdkIsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTTthQUN2QyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsTUFBOEI7UUFDN0MsbURBQW1EO1FBQ25ELElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBQzVCLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELFNBQVM7UUFDUCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDbkI7YUFBTTtZQUNMLDBEQUEwRDtZQUMxRCxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7U0FDNUI7SUFDSCxDQUFDO0lBRVMsV0FBVyxDQUFDLEtBQXNCO1FBQzFDLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUU7WUFDOUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNsQjtRQUNELElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsU0FBUyxFQUFFLFdBQVcsRUFBRSxDQUFDO0lBQ2hDLENBQUM7O3lIQTFDbUIsMkJBQTJCOzZHQUEzQiwyQkFBMkI7dUZBQTNCLDJCQUEyQjtjQUhoRCxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLEVBQUU7YUFDYiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgT25EZXN0cm95LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtBZHZDaGF0Ym90SGVscGVyfSBmcm9tICcuL2Fkdi1jaGF0Ym90LmhlbHBlcic7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0FkdkNoYXRib3RFdmVudCwgQWR2Q2hhdGJvdEV2ZW50cywgQWR2Q2hhdGJvdFdpZGdldENvbmZpZ30gZnJvbSBcIi4vYWR2LWNoYXRib3QubW9kZWxcIjtcblxuQENvbXBvbmVudCh7XG4gIHRlbXBsYXRlOiAnJ1xufSlcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdEFkdkNoYXRib3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgcHJvdGVjdGVkIGV2ZW50c1N1YjogU3Vic2NyaXB0aW9uO1xuICB1bnJlYWRNZXNzYWdlcyA9IGZhbHNlO1xuICBhYnN0cmFjdCBhdWRpb1NyYzogc3RyaW5nO1xuICBwcm90ZWN0ZWQgYXVkaW86IEhUTUxBdWRpb0VsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGNoYXRCb3RIZWxwZXI6IEFkdkNoYXRib3RIZWxwZXIsXG4gICAgICAgICAgICAgIHByb3RlY3RlZCBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYXVkaW8gPSBuZXcgQXVkaW8odGhpcy5hdWRpb1NyYyk7XG4gICAgdGhpcy5ldmVudHNTdWIgPSB0aGlzLmNoYXRCb3RIZWxwZXIuZXZlbnRzXG4gICAgICAuc3Vic2NyaWJlKHRoaXMuaGFuZGxlRXZlbnQuYmluZCh0aGlzKSk7XG4gIH1cblxuICB0b2dnbGVWaXNpYmlsaXR5KGNvbmZpZzogQWR2Q2hhdGJvdFdpZGdldENvbmZpZykge1xuICAgIC8vIHdoZW4gb3BlbmluZyB3aWRnZXQsIHJlbW92ZSB1bnJlYWQgbWVzc2FnZXMgbWFya1xuICAgIHRoaXMudW5yZWFkTWVzc2FnZXMgPSBmYWxzZTtcbiAgICB0aGlzLmNoYXRCb3RIZWxwZXIudG9nZ2xlVmlzaWJpbGl0eShjb25maWcpO1xuICB9XG5cbiAgcGxheUF1ZGlvKCkge1xuICAgIGlmICh0aGlzLmF1ZGlvLnBhdXNlZCkge1xuICAgICAgdGhpcy5hdWRpby5wbGF5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIGF1ZGlvIGlzIHBsYXlpbmcsIHJlc2V0IGl0IChpbW1lZGlhdGVseSBwbGF5cyBhZ2FpbilcbiAgICAgIHRoaXMuYXVkaW8uY3VycmVudFRpbWUgPSAwO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBoYW5kbGVFdmVudChldmVudDogQWR2Q2hhdGJvdEV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LnR5cGUgPT09IEFkdkNoYXRib3RFdmVudHMubmV3TWVzc2FnZSkge1xuICAgICAgdGhpcy51bnJlYWRNZXNzYWdlcyA9IGV2ZW50LnZhbHVlO1xuICAgICAgdGhpcy5wbGF5QXVkaW8oKTtcbiAgICB9XG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZXZlbnRzU3ViPy51bnN1YnNjcmliZSgpO1xuICB9XG5cbn1cbiJdfQ==