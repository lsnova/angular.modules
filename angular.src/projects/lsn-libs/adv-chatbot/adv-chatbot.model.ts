import {InjectionToken, Type} from '@angular/core';
import {Observable} from 'rxjs';

export const ADV_CHATBOT_CONFIG = new InjectionToken<AdvChatbotModuleConfig>('AdvChatbotModuleConfig');

export interface AdvChatbotModuleConfig {
  dataProviders?: Type<AdvChatbotDataProvider>[];
}

export interface AdvChatbotGlobal {
  initWidget: (config: AdvChatbotGlobalConfig) => Promise<any>;
}

export interface AdvChatbotWidget {
  toggleWidget: () => void;
  hideWidget: () => void;
  showWidget: () => void;
}

export enum AdvChatbotEvents {
  newMessage = 'newMessage'
}

export interface AdvChatbotEvent {
  type: AdvChatbotEvents;
  value: any;
}

export interface AdvChatbotDataProvider {
  getData(chatBotConfig: AdvChatbotWidgetConfig): Observable<object>;
}

export class AdvChatbotWidgetConfig {
  enabled?: boolean;
  sdkUrl?: string;
  cid?: string;
  baseUrl?: string;
  audioFile?: string;
  layout?: any;
  theme?: { [key: string]: string };
  translations?: { [key: string]: string };
}

export interface AdvChatbotGlobalConfig extends AdvChatbotWidgetConfig {
  getCustomerData: (done: (err, data) => void) => void;
  newMessageEvent: (boolean) => void;
}

