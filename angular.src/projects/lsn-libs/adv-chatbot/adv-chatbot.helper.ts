import {Inject, Injectable, Injector, Optional, Renderer2, RendererFactory2} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {ADV_CHATBOT_CONFIG, AdvChatbot} from './adv-chatbot.model';
import {forkJoin, Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class AdvChatbotHelper {

  protected renderer: Renderer2;
  protected widget: AdvChatbot.Widget;
  protected events$ = new Subject<AdvChatbot.Event>();
  protected dataProviders: AdvChatbot.DataProvider[] = [];

  get events(): Observable<AdvChatbot.Event> {
    return this.events$.asObservable();
  }

  get isInitialized() {
    return !!this.widget;
  }

  constructor(@Inject(DOCUMENT) protected document,
              rendererFactory2: RendererFactory2,
              @Optional() @Inject(ADV_CHATBOT_CONFIG) protected moduleConfig: AdvChatbot.ModuleConfig,
              protected injector: Injector) {
    this.renderer = rendererFactory2.createRenderer(document, null);
    if (this.moduleConfig?.dataProviders?.length) {
      for (const providerClass of this.moduleConfig.dataProviders) {
        this.dataProviders.push(this.injector.get(providerClass));
      }
    }
  }

  async setupSdk(config: AdvChatbot.WidgetConfig, awaitConfig = false) {
    if (config.sdkUrl) {
      await this.loadScript(config.sdkUrl);
      const advGlobal: AdvChatbot.Global = (this.document.defaultView as any).ADV;
      const configPromise = this.setConfig(advGlobal, config);
      if (awaitConfig) {
        await configPromise;
      }
    }
  }

  protected loadScript(scriptUrl: string): Promise<any> {
    return new Promise((resolve => {
      const chatBotScriptFound = this.checkScriptLoaded(scriptUrl);
      if (!chatBotScriptFound) {
        const script: HTMLScriptElement = this.renderer.createElement('script');
        this.renderer.appendChild(document.head, script);
        script.type = 'text/javascript';
        script.async = false;
        script.charset = 'utf-8';
        // load listener first in case script is cached
        script.addEventListener('load', () => {
          resolve(true);
        });
        script.src = scriptUrl;
      } else {
        resolve(true);
      }
    }));
  }

  /**
   * check if any script on page includes one with src = apiUrl
   */
  protected checkScriptLoaded(scriptUrl: string): boolean {
    const scripts: HTMLCollection = this.document.getElementsByTagName('script');
    return Array.from(scripts)?.some((scriptEl: HTMLScriptElement) => scriptEl.src?.includes(scriptUrl)) ?? false;
  }

  protected async setConfig(advGlobal: AdvChatbot.Global, chatbotConfig: AdvChatbot.WidgetConfig) {
    this.widget = await advGlobal.initWidget({
      cid: chatbotConfig.cid,
      baseUrl: chatbotConfig.baseUrl,
      layout: chatbotConfig.layout,
      theme: chatbotConfig.theme,
      translations: chatbotConfig.translations,
      getCustomerData: done => {
        this.getDataForWidget(chatbotConfig)
          .subscribe({
            // check status 200?
            next: resp => {
              done(null, resp);
            },
            error: err => done(err, null)
          });
      },
      newMessageEvent: isWidgetOpen => {
        this.events$.next({
          type: AdvChatbot.Events.newMessage,
          value: !isWidgetOpen // mark new message as unread
        });
      }
    });
  }

  /**
   * manual click on chatbot icon, setup sdk if not loaded
   */
  async toggleVisibility(config: AdvChatbot.WidgetConfig): Promise<any> {
    if (this.widget) {
      this.widget.toggleWidget();
    } else {
      await this.setupSdk(config, true);
      this.widget.toggleWidget();
    }
  }

  protected getDataForWidget(chatbotConfig: AdvChatbot.WidgetConfig): Observable<object> {
    const obs$: Observable<object>[] = this.dataProviders?.map(provider => provider.getData(chatbotConfig));
    return forkJoin(obs$).pipe(
      map(outputs => Object.assign({}, ...outputs))
    );
  }
}
