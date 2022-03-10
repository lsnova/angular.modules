import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ADV_CHATBOT_CONFIG } from './adv-chatbot.model';
import { AdvChatbotHelper } from './adv-chatbot.helper';
export class LsnAdvChatbotModule {
    static forRoot(config = {}) {
        return {
            ngModule: LsnAdvChatbotModule,
            providers: [
                { provide: ADV_CHATBOT_CONFIG, useValue: config },
                AdvChatbotHelper
            ]
        };
    }
}
LsnAdvChatbotModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWR2LWNoYXRib3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbHNuLWxpYnMvYWR2LWNoYXRib3QvYWR2LWNoYXRib3QubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBc0IsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsa0JBQWtCLEVBQXlCLE1BQU0scUJBQXFCLENBQUM7QUFDL0UsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFPdEQsTUFBTSxPQUFPLG1CQUFtQjtJQUM5QixNQUFNLENBQUMsT0FBTyxDQUFDLFNBQWlDLEVBQUU7UUFDaEQsT0FBTztZQUNMLFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsU0FBUyxFQUFFO2dCQUNULEVBQUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUM7Z0JBQy9DLGdCQUFnQjthQUNqQjtTQUNGLENBQUM7SUFDSixDQUFDOzs7WUFkRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7aUJBQ2I7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0FEVl9DSEFUQk9UX0NPTkZJRywgQWR2Q2hhdGJvdE1vZHVsZUNvbmZpZ30gZnJvbSAnLi9hZHYtY2hhdGJvdC5tb2RlbCc7XG5pbXBvcnQge0FkdkNoYXRib3RIZWxwZXJ9IGZyb20gJy4vYWR2LWNoYXRib3QuaGVscGVyJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIExzbkFkdkNoYXRib3RNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IEFkdkNoYXRib3RNb2R1bGVDb25maWcgPSB7fSk6IE1vZHVsZVdpdGhQcm92aWRlcnM8THNuQWR2Q2hhdGJvdE1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTHNuQWR2Q2hhdGJvdE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7cHJvdmlkZTogQURWX0NIQVRCT1RfQ09ORklHLCB1c2VWYWx1ZTogY29uZmlnfSxcbiAgICAgICAgQWR2Q2hhdGJvdEhlbHBlclxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdfQ==