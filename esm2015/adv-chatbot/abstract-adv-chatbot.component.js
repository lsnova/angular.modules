import { ChangeDetectorRef, Component } from '@angular/core';
import { AdvChatbotHelper } from './adv-chatbot.helper';
import { AdvChatbotEvents } from "./adv-chatbot.model";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtYWR2LWNoYXRib3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbHNuLWxpYnMvYWR2LWNoYXRib3QvYWJzdHJhY3QtYWR2LWNoYXRib3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxpQkFBaUIsRUFBRSxTQUFTLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBQzlFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRXRELE9BQU8sRUFBa0IsZ0JBQWdCLEVBQXlCLE1BQU0scUJBQXFCLENBQUM7QUFLOUYsTUFBTSxPQUFnQiwyQkFBMkI7SUFPL0MsWUFBc0IsYUFBK0IsRUFDL0IsRUFBcUI7UUFEckIsa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBQy9CLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBTDNDLG1CQUFjLEdBQUcsS0FBSyxDQUFDO0lBTXZCLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU07YUFDdkMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELGdCQUFnQixDQUFDLE1BQThCO1FBQzdDLG1EQUFtRDtRQUNuRCxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxTQUFTO1FBQ1AsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ25CO2FBQU07WUFDTCwwREFBMEQ7WUFDMUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1NBQzVCO0lBQ0gsQ0FBQztJQUVTLFdBQVcsQ0FBQyxLQUFzQjtRQUMxQyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssZ0JBQWdCLENBQUMsVUFBVSxFQUFFO1lBQzlDLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztZQUNsQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDbEI7UUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxXQUFXOztRQUNULE1BQUEsSUFBSSxDQUFDLFNBQVMsMENBQUUsV0FBVyxHQUFHO0lBQ2hDLENBQUM7OztZQTdDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLEVBQUU7YUFDYjs7OztZQU5PLGdCQUFnQjtZQURoQixpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIE9uRGVzdHJveSwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QWR2Q2hhdGJvdEhlbHBlcn0gZnJvbSAnLi9hZHYtY2hhdGJvdC5oZWxwZXInO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtBZHZDaGF0Ym90RXZlbnQsIEFkdkNoYXRib3RFdmVudHMsIEFkdkNoYXRib3RXaWRnZXRDb25maWd9IGZyb20gXCIuL2Fkdi1jaGF0Ym90Lm1vZGVsXCI7XG5cbkBDb21wb25lbnQoe1xuICB0ZW1wbGF0ZTogJydcbn0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RBZHZDaGF0Ym90Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gIHByb3RlY3RlZCBldmVudHNTdWI6IFN1YnNjcmlwdGlvbjtcbiAgdW5yZWFkTWVzc2FnZXMgPSBmYWxzZTtcbiAgYWJzdHJhY3QgYXVkaW9TcmM6IHN0cmluZztcbiAgcHJvdGVjdGVkIGF1ZGlvOiBIVE1MQXVkaW9FbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBjaGF0Qm90SGVscGVyOiBBZHZDaGF0Ym90SGVscGVyLFxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmF1ZGlvID0gbmV3IEF1ZGlvKHRoaXMuYXVkaW9TcmMpO1xuICAgIHRoaXMuZXZlbnRzU3ViID0gdGhpcy5jaGF0Qm90SGVscGVyLmV2ZW50c1xuICAgICAgLnN1YnNjcmliZSh0aGlzLmhhbmRsZUV2ZW50LmJpbmQodGhpcykpO1xuICB9XG5cbiAgdG9nZ2xlVmlzaWJpbGl0eShjb25maWc6IEFkdkNoYXRib3RXaWRnZXRDb25maWcpIHtcbiAgICAvLyB3aGVuIG9wZW5pbmcgd2lkZ2V0LCByZW1vdmUgdW5yZWFkIG1lc3NhZ2VzIG1hcmtcbiAgICB0aGlzLnVucmVhZE1lc3NhZ2VzID0gZmFsc2U7XG4gICAgdGhpcy5jaGF0Qm90SGVscGVyLnRvZ2dsZVZpc2liaWxpdHkoY29uZmlnKTtcbiAgfVxuXG4gIHBsYXlBdWRpbygpIHtcbiAgICBpZiAodGhpcy5hdWRpby5wYXVzZWQpIHtcbiAgICAgIHRoaXMuYXVkaW8ucGxheSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpZiBhdWRpbyBpcyBwbGF5aW5nLCByZXNldCBpdCAoaW1tZWRpYXRlbHkgcGxheXMgYWdhaW4pXG4gICAgICB0aGlzLmF1ZGlvLmN1cnJlbnRUaW1lID0gMDtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgaGFuZGxlRXZlbnQoZXZlbnQ6IEFkdkNoYXRib3RFdmVudCkge1xuICAgIGlmIChldmVudC50eXBlID09PSBBZHZDaGF0Ym90RXZlbnRzLm5ld01lc3NhZ2UpIHtcbiAgICAgIHRoaXMudW5yZWFkTWVzc2FnZXMgPSBldmVudC52YWx1ZTtcbiAgICAgIHRoaXMucGxheUF1ZGlvKCk7XG4gICAgfVxuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmV2ZW50c1N1Yj8udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG59XG4iXX0=