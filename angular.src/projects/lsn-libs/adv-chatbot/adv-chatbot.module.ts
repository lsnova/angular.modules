import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ADV_CHATBOT_CONFIG, AdvChatbot} from './adv-chatbot.model';
import ModuleConfig = AdvChatbot.ModuleConfig;

@NgModule({
  imports: [
    CommonModule
  ]
})
export class AdvChatbotModule {
  static forRoot(config: ModuleConfig = {}): ModuleWithProviders<AdvChatbotModule> {
    return {
      ngModule: AdvChatbotModule,
      providers: [
        {provide: ADV_CHATBOT_CONFIG, useValue: config},
      ]
    };
  }
}
