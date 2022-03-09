import {InjectionToken, Type} from '@angular/core';
import {Observable} from 'rxjs';

export const ADV_CHATBOT_CONFIG = new InjectionToken<AdvChatbot.ModuleConfig>('AdvChatbotModuleConfig');

export namespace AdvChatbot {

  export interface ModuleConfig {
    dataProviders?: Type<DataProvider>[];
  }

  export interface Global {
    initWidget: (config: GlobalConfig) => Promise<any>;
  }

  export interface Widget {
    toggleWidget: () => void;
    hideWidget: () => void;
    showWidget: () => void;
  }

  export enum Events {
    newMessage = 'newMessage'
  }

  export interface Event {
    type: Events;
    value: any;
  }

  export interface DataProvider {
    getData(chatBotConfig: WidgetConfig): Observable<object>;
  }

  export class WidgetConfig {
    enabled?: boolean;
    sdkUrl?: string;
    cid?: string;
    baseUrl?: string;
    audioFile?: string;
    layout?: any;
    theme?: { [key: string]: string };
    translations?: { [key: string]: string };
  }

  export interface GlobalConfig extends WidgetConfig {
    getCustomerData: (done: (err, data) => void) => void;
    newMessageEvent: (boolean) => void;
  }

}
