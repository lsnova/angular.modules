import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ADV_CHATBOT_CONFIG, AdvChatbotModuleConfig} from './adv-chatbot.model';
import {AdvChatbotHelper} from './adv-chatbot.helper';

@NgModule({
  imports: [
    CommonModule
  ]
})
export class LsnAdvChatbotModule {
  static forRoot(config: AdvChatbotModuleConfig = {}): ModuleWithProviders<LsnAdvChatbotModule> {
    return {
      ngModule: LsnAdvChatbotModule,
      providers: [
        {provide: ADV_CHATBOT_CONFIG, useValue: config},
        AdvChatbotHelper
      ]
    };
  }
}
