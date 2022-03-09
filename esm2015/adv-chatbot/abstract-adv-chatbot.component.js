import { ChangeDetectorRef, Component } from '@angular/core';
import { AdvChatbotHelper } from './adv-chatbot.helper';
import { AdvChatbot } from './adv-chatbot.model';
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
        if (event.type === AdvChatbot.Events.newMessage) {
            this.unreadMessages = event.value;
            this.playAudio();
        }
        this.cd.markForCheck();
    }
    ngOnDestroy() {
        var _a;
        (_a = this.eventsSub) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
}
AbstractAdvChatbotComponent.decorators = [
    { type: Component, args: [{
                template: ''
            },] }
];
/** @nocollapse */
AbstractAdvChatbotComponent.ctorParameters = () => [
    { type: AdvChatbotHelper },
    { type: ChangeDetectorRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtYWR2LWNoYXRib3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbHNuLWxpYnMvYWR2LWNoYXRib3QvYWJzdHJhY3QtYWR2LWNoYXRib3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxpQkFBaUIsRUFBRSxTQUFTLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBQzlFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRXRELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUsvQyxNQUFNLE9BQWdCLDJCQUEyQjtJQU8vQyxZQUFzQixhQUErQixFQUMvQixFQUFxQjtRQURyQixrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFDL0IsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFMM0MsbUJBQWMsR0FBRyxLQUFLLENBQUM7SUFNdkIsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTTthQUN2QyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsTUFBK0I7UUFDOUMsbURBQW1EO1FBQ25ELElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBQzVCLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELFNBQVM7UUFDUCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDbkI7YUFBTTtZQUNMLDBEQUEwRDtZQUMxRCxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7U0FDNUI7SUFDSCxDQUFDO0lBRVMsV0FBVyxDQUFDLEtBQXVCO1FBQzNDLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRTtZQUMvQyxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFDbEMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ2xCO1FBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsV0FBVzs7UUFDVCxNQUFBLElBQUksQ0FBQyxTQUFTLDBDQUFFLFdBQVcsR0FBRztJQUNoQyxDQUFDOzs7WUE3Q0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxFQUFFO2FBQ2I7Ozs7WUFOTyxnQkFBZ0I7WUFEaEIsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBPbkRlc3Ryb3ksIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0FkdkNoYXRib3RIZWxwZXJ9IGZyb20gJy4vYWR2LWNoYXRib3QuaGVscGVyJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7QWR2Q2hhdGJvdH0gZnJvbSAnLi9hZHYtY2hhdGJvdC5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICB0ZW1wbGF0ZTogJydcbn0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RBZHZDaGF0Ym90Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gIHByb3RlY3RlZCBldmVudHNTdWI6IFN1YnNjcmlwdGlvbjtcbiAgdW5yZWFkTWVzc2FnZXMgPSBmYWxzZTtcbiAgYWJzdHJhY3QgYXVkaW9TcmM6IHN0cmluZztcbiAgcHJvdGVjdGVkIGF1ZGlvOiBIVE1MQXVkaW9FbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBjaGF0Qm90SGVscGVyOiBBZHZDaGF0Ym90SGVscGVyLFxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmF1ZGlvID0gbmV3IEF1ZGlvKHRoaXMuYXVkaW9TcmMpO1xuICAgIHRoaXMuZXZlbnRzU3ViID0gdGhpcy5jaGF0Qm90SGVscGVyLmV2ZW50c1xuICAgICAgLnN1YnNjcmliZSh0aGlzLmhhbmRsZUV2ZW50LmJpbmQodGhpcykpO1xuICB9XG5cbiAgdG9nZ2xlVmlzaWJpbGl0eShjb25maWc6IEFkdkNoYXRib3QuV2lkZ2V0Q29uZmlnKSB7XG4gICAgLy8gd2hlbiBvcGVuaW5nIHdpZGdldCwgcmVtb3ZlIHVucmVhZCBtZXNzYWdlcyBtYXJrXG4gICAgdGhpcy51bnJlYWRNZXNzYWdlcyA9IGZhbHNlO1xuICAgIHRoaXMuY2hhdEJvdEhlbHBlci50b2dnbGVWaXNpYmlsaXR5KGNvbmZpZyk7XG4gIH1cblxuICBwbGF5QXVkaW8oKSB7XG4gICAgaWYgKHRoaXMuYXVkaW8ucGF1c2VkKSB7XG4gICAgICB0aGlzLmF1ZGlvLnBsYXkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaWYgYXVkaW8gaXMgcGxheWluZywgcmVzZXQgaXQgKGltbWVkaWF0ZWx5IHBsYXlzIGFnYWluKVxuICAgICAgdGhpcy5hdWRpby5jdXJyZW50VGltZSA9IDA7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGhhbmRsZUV2ZW50KGV2ZW50OiBBZHZDaGF0Ym90LkV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LnR5cGUgPT09IEFkdkNoYXRib3QuRXZlbnRzLm5ld01lc3NhZ2UpIHtcbiAgICAgIHRoaXMudW5yZWFkTWVzc2FnZXMgPSBldmVudC52YWx1ZTtcbiAgICAgIHRoaXMucGxheUF1ZGlvKCk7XG4gICAgfVxuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmV2ZW50c1N1Yj8udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG59XG4iXX0=