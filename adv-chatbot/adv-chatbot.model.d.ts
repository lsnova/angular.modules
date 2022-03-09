import { InjectionToken, Type } from '@angular/core';
import { Observable } from 'rxjs';
export declare const ADV_CHATBOT_CONFIG: InjectionToken<AdvChatbot.ModuleConfig>;
export declare namespace AdvChatbot {
    interface ModuleConfig {
        dataProviders?: Type<DataProvider>[];
    }
    interface Global {
        initWidget: (config: GlobalConfig) => Promise<any>;
    }
    interface Widget {
        toggleWidget: () => void;
        hideWidget: () => void;
        showWidget: () => void;
    }
    enum Events {
        newMessage = "newMessage"
    }
    interface Event {
        type: Events;
        value: any;
    }
    interface DataProvider {
        getData(chatBotConfig: WidgetConfig): Observable<object>;
    }
    class WidgetConfig {
        enabled?: boolean;
        sdkUrl?: string;
        cid?: string;
        baseUrl?: string;
        audioFile?: string;
        layout?: any;
        theme?: {
            [key: string]: string;
        };
        translations?: {
            [key: string]: string;
        };
    }
    interface GlobalConfig extends WidgetConfig {
        getCustomerData: (done: (err: any, data: any) => void) => void;
        newMessageEvent: (boolean: any) => void;
    }
}
