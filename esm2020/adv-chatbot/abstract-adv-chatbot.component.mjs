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
/** @nocollapse */ AbstractAdvChatbotComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: AbstractAdvChatbotComponent, deps: [{ token: i1.AdvChatbotHelper }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ AbstractAdvChatbotComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: AbstractAdvChatbotComponent, selector: "ng-component", ngImport: i0, template: '', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: AbstractAdvChatbotComponent, decorators: [{
            type: Component,
            args: [{
                    template: ''
                }]
        }], ctorParameters: function () { return [{ type: i1.AdvChatbotHelper }, { type: i0.ChangeDetectorRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtYWR2LWNoYXRib3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbHNuLWxpYnMvYWR2LWNoYXRib3QvYWJzdHJhY3QtYWR2LWNoYXRib3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxpQkFBaUIsRUFBRSxTQUFTLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBQzlFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRXRELE9BQU8sRUFBa0IsZ0JBQWdCLEVBQXlCLE1BQU0scUJBQXFCLENBQUM7OztBQUs5RixNQUFNLE9BQWdCLDJCQUEyQjtJQU8vQyxZQUFzQixhQUErQixFQUMvQixFQUFxQjtRQURyQixrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFDL0IsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFMM0MsbUJBQWMsR0FBRyxLQUFLLENBQUM7SUFNdkIsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTTthQUN2QyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsTUFBOEI7UUFDN0MsbURBQW1EO1FBQ25ELElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBQzVCLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELFNBQVM7UUFDUCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDbkI7YUFBTTtZQUNMLDBEQUEwRDtZQUMxRCxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7U0FDNUI7SUFDSCxDQUFDO0lBRVMsV0FBVyxDQUFDLEtBQXNCO1FBQzFDLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUU7WUFDOUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNsQjtRQUNELElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsU0FBUyxFQUFFLFdBQVcsRUFBRSxDQUFDO0lBQ2hDLENBQUM7OzRJQTFDbUIsMkJBQTJCO2dJQUEzQiwyQkFBMkIsb0RBRnJDLEVBQUU7NEZBRVEsMkJBQTJCO2tCQUhoRCxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxFQUFFO2lCQUNiIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBPbkRlc3Ryb3ksIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0FkdkNoYXRib3RIZWxwZXJ9IGZyb20gJy4vYWR2LWNoYXRib3QuaGVscGVyJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7QWR2Q2hhdGJvdEV2ZW50LCBBZHZDaGF0Ym90RXZlbnRzLCBBZHZDaGF0Ym90V2lkZ2V0Q29uZmlnfSBmcm9tIFwiLi9hZHYtY2hhdGJvdC5tb2RlbFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgdGVtcGxhdGU6ICcnXG59KVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0QWR2Q2hhdGJvdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICBwcm90ZWN0ZWQgZXZlbnRzU3ViOiBTdWJzY3JpcHRpb247XG4gIHVucmVhZE1lc3NhZ2VzID0gZmFsc2U7XG4gIGFic3RyYWN0IGF1ZGlvU3JjOiBzdHJpbmc7XG4gIHByb3RlY3RlZCBhdWRpbzogSFRNTEF1ZGlvRWxlbWVudDtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgY2hhdEJvdEhlbHBlcjogQWR2Q2hhdGJvdEhlbHBlcixcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5hdWRpbyA9IG5ldyBBdWRpbyh0aGlzLmF1ZGlvU3JjKTtcbiAgICB0aGlzLmV2ZW50c1N1YiA9IHRoaXMuY2hhdEJvdEhlbHBlci5ldmVudHNcbiAgICAgIC5zdWJzY3JpYmUodGhpcy5oYW5kbGVFdmVudC5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHRvZ2dsZVZpc2liaWxpdHkoY29uZmlnOiBBZHZDaGF0Ym90V2lkZ2V0Q29uZmlnKSB7XG4gICAgLy8gd2hlbiBvcGVuaW5nIHdpZGdldCwgcmVtb3ZlIHVucmVhZCBtZXNzYWdlcyBtYXJrXG4gICAgdGhpcy51bnJlYWRNZXNzYWdlcyA9IGZhbHNlO1xuICAgIHRoaXMuY2hhdEJvdEhlbHBlci50b2dnbGVWaXNpYmlsaXR5KGNvbmZpZyk7XG4gIH1cblxuICBwbGF5QXVkaW8oKSB7XG4gICAgaWYgKHRoaXMuYXVkaW8ucGF1c2VkKSB7XG4gICAgICB0aGlzLmF1ZGlvLnBsYXkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaWYgYXVkaW8gaXMgcGxheWluZywgcmVzZXQgaXQgKGltbWVkaWF0ZWx5IHBsYXlzIGFnYWluKVxuICAgICAgdGhpcy5hdWRpby5jdXJyZW50VGltZSA9IDA7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGhhbmRsZUV2ZW50KGV2ZW50OiBBZHZDaGF0Ym90RXZlbnQpIHtcbiAgICBpZiAoZXZlbnQudHlwZSA9PT0gQWR2Q2hhdGJvdEV2ZW50cy5uZXdNZXNzYWdlKSB7XG4gICAgICB0aGlzLnVucmVhZE1lc3NhZ2VzID0gZXZlbnQudmFsdWU7XG4gICAgICB0aGlzLnBsYXlBdWRpbygpO1xuICAgIH1cbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5ldmVudHNTdWI/LnVuc3Vic2NyaWJlKCk7XG4gIH1cblxufVxuIl19