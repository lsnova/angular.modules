import { Inject, Injectable, Injector, Optional, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ADV_CHATBOT_CONFIG, AdvChatbotEvents } from './adv-chatbot.model';
import { forkJoin, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
export class AdvChatbotHelper {
    get events() {
        return this.events$.asObservable();
    }
    get isInitialized() {
        return !!this.widget;
    }
    constructor(document, rendererFactory2, moduleConfig, injector) {
        this.document = document;
        this.moduleConfig = moduleConfig;
        this.injector = injector;
        this.events$ = new Subject();
        this.dataProviders = [];
        this.renderer = rendererFactory2.createRenderer(document, null);
        if (this.moduleConfig?.dataProviders?.length) {
            for (const providerClass of this.moduleConfig.dataProviders) {
                this.dataProviders.push(this.injector.get(providerClass));
            }
        }
    }
    async setupSdk(config, awaitConfig = false) {
        if (config.sdkUrl) {
            await this.loadScript(config.sdkUrl);
            const advGlobal = this.document.defaultView.ADV;
            const configPromise = this.setConfig(advGlobal, config);
            if (awaitConfig) {
                await configPromise;
            }
        }
    }
    loadScript(scriptUrl) {
        return new Promise((resolve => {
            const chatBotScriptFound = this.checkScriptLoaded(scriptUrl);
            if (!chatBotScriptFound) {
                const script = this.renderer.createElement('script');
                this.renderer.appendChild(document.head, script);
                script.type = 'text/javascript';
                script.async = false;
                script.charset = 'utf-8';
                // load listener first in case script is cached
                script.addEventListener('load', () => {
                    resolve(true);
                });
                script.src = scriptUrl;
            }
            else {
                resolve(true);
            }
        }));
    }
    /**
     * check if any script on page includes one with src = apiUrl
     */
    checkScriptLoaded(scriptUrl) {
        const scripts = this.document.getElementsByTagName('script');
        return Array.from(scripts)?.some((scriptEl) => scriptEl.src?.includes(scriptUrl)) ?? false;
    }
    async setConfig(advGlobal, chatbotConfig) {
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
                    type: AdvChatbotEvents.newMessage,
                    value: !isWidgetOpen // mark new message as unread
                });
            }
        });
    }
    /**
     * manual click on chatbot icon, setup sdk if not loaded
     */
    async toggleVisibility(config) {
        if (this.widget) {
            this.widget.toggleWidget();
        }
        else {
            await this.setupSdk(config, true);
            this.widget.toggleWidget();
        }
    }
    getDataForWidget(chatbotConfig) {
        const obs$ = this.dataProviders?.map(provider => provider.getData(chatbotConfig));
        return forkJoin(obs$).pipe(map(outputs => Object.assign({}, ...outputs)));
    }
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: AdvChatbotHelper, deps: [{ token: DOCUMENT }, { token: i0.RendererFactory2 }, { token: ADV_CHATBOT_CONFIG, optional: true }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable }); }
    /** @nocollapse */ static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: AdvChatbotHelper }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: AdvChatbotHelper, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.RendererFactory2 }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [ADV_CHATBOT_CONFIG]
                }] }, { type: i0.Injector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWR2LWNoYXRib3QuaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbHNuLWxpYnMvYWR2LWNoYXRib3QvYWR2LWNoYXRib3QuaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQWEsZ0JBQWdCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbEcsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFDTCxrQkFBa0IsRUFHbEIsZ0JBQWdCLEVBS2pCLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFDLFFBQVEsRUFBYyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDOztBQUduQyxNQUFNLE9BQU8sZ0JBQWdCO0lBTzNCLElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQsSUFBSSxhQUFhO1FBQ2YsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQsWUFBd0MsUUFBUSxFQUNwQyxnQkFBa0MsRUFDZ0IsWUFBb0MsRUFDNUUsUUFBa0I7UUFIQSxhQUFRLEdBQVIsUUFBUSxDQUFBO1FBRWMsaUJBQVksR0FBWixZQUFZLENBQXdCO1FBQzVFLGFBQVEsR0FBUixRQUFRLENBQVU7UUFkOUIsWUFBTyxHQUFHLElBQUksT0FBTyxFQUFtQixDQUFDO1FBQ3pDLGtCQUFhLEdBQTZCLEVBQUUsQ0FBQztRQWNyRCxJQUFJLENBQUMsUUFBUSxHQUFHLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDaEUsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFF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Z0JBQWdCOzsyRkFBaEIsZ0JBQWdCO2tCQUQ1QixVQUFVOzswQkFnQkksTUFBTTsyQkFBQyxRQUFROzswQkFFZixRQUFROzswQkFBSSxNQUFNOzJCQUFDLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3RvciwgT3B0aW9uYWwsIFJlbmRlcmVyMiwgUmVuZGVyZXJGYWN0b3J5Mn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQURWX0NIQVRCT1RfQ09ORklHLFxuICBBZHZDaGF0Ym90RGF0YVByb3ZpZGVyLFxuICBBZHZDaGF0Ym90RXZlbnQsXG4gIEFkdkNoYXRib3RFdmVudHMsXG4gIEFkdkNoYXRib3RHbG9iYWwsXG4gIEFkdkNoYXRib3RNb2R1bGVDb25maWcsXG4gIEFkdkNoYXRib3RXaWRnZXQsXG4gIEFkdkNoYXRib3RXaWRnZXRDb25maWdcbn0gZnJvbSAnLi9hZHYtY2hhdGJvdC5tb2RlbCc7XG5pbXBvcnQge2ZvcmtKb2luLCBPYnNlcnZhYmxlLCBTdWJqZWN0fSBmcm9tICdyeGpzJztcbmltcG9ydCB7bWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBZHZDaGF0Ym90SGVscGVyIHtcblxuICBwcm90ZWN0ZWQgcmVuZGVyZXI6IFJlbmRlcmVyMjtcbiAgcHJvdGVjdGVkIHdpZGdldDogQWR2Q2hhdGJvdFdpZGdldDtcbiAgcHJvdGVjdGVkIGV2ZW50cyQgPSBuZXcgU3ViamVjdDxBZHZDaGF0Ym90RXZlbnQ+KCk7XG4gIHByb3RlY3RlZCBkYXRhUHJvdmlkZXJzOiBBZHZDaGF0Ym90RGF0YVByb3ZpZGVyW10gPSBbXTtcblxuICBnZXQgZXZlbnRzKCk6IE9ic2VydmFibGU8QWR2Q2hhdGJvdEV2ZW50PiB7XG4gICAgcmV0dXJuIHRoaXMuZXZlbnRzJC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGdldCBpc0luaXRpYWxpemVkKCkge1xuICAgIHJldHVybiAhIXRoaXMud2lkZ2V0O1xuICB9XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgcHJvdGVjdGVkIGRvY3VtZW50LFxuICAgICAgICAgICAgICByZW5kZXJlckZhY3RvcnkyOiBSZW5kZXJlckZhY3RvcnkyLFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEFEVl9DSEFUQk9UX0NPTkZJRykgcHJvdGVjdGVkIG1vZHVsZUNvbmZpZzogQWR2Q2hhdGJvdE1vZHVsZUNvbmZpZyxcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgIHRoaXMucmVuZGVyZXIgPSByZW5kZXJlckZhY3RvcnkyLmNyZWF0ZVJlbmRlcmVyKGRvY3VtZW50LCBudWxsKTtcbiAgICBpZiAodGhpcy5tb2R1bGVDb25maWc/LmRhdGFQcm92aWRlcnM/Lmxlbmd0aCkge1xuICAgICAgZm9yIChjb25zdCBwcm92aWRlckNsYXNzIG9mIHRoaXMubW9kdWxlQ29uZmlnLmRhdGFQcm92aWRlcnMpIHtcbiAgICAgICAgdGhpcy5kYXRhUHJvdmlkZXJzLnB1c2godGhpcy5pbmplY3Rvci5nZXQocHJvdmlkZXJDbGFzcykpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHNldHVwU2RrKGNvbmZpZzogQWR2Q2hhdGJvdFdpZGdldENvbmZpZywgYXdhaXRDb25maWcgPSBmYWxzZSkge1xuICAgIGlmIChjb25maWcuc2RrVXJsKSB7XG4gICAgICBhd2FpdCB0aGlzLmxvYWRTY3JpcHQoY29uZmlnLnNka1VybCk7XG4gICAgICBjb25zdCBhZHZHbG9iYWw6IEFkdkNoYXRib3RHbG9iYWwgPSAodGhpcy5kb2N1bWVudC5kZWZhdWx0VmlldyBhcyBhbnkpLkFEVjtcbiAgICAgIGNvbnN0IGNvbmZpZ1Byb21pc2UgPSB0aGlzLnNldENvbmZpZyhhZHZHbG9iYWwsIGNvbmZpZyk7XG4gICAgICBpZiAoYXdhaXRDb25maWcpIHtcbiAgICAgICAgYXdhaXQgY29uZmlnUHJvbWlzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgbG9hZFNjcmlwdChzY3JpcHRVcmw6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlID0+IHtcbiAgICAgIGNvbnN0IGNoYXRCb3RTY3JpcHRGb3VuZCA9IHRoaXMuY2hlY2tTY3JpcHRMb2FkZWQoc2NyaXB0VXJsKTtcbiAgICAgIGlmICghY2hhdEJvdFNjcmlwdEZvdW5kKSB7XG4gICAgICAgIGNvbnN0IHNjcmlwdDogSFRNTFNjcmlwdEVsZW1lbnQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmhlYWQsIHNjcmlwdCk7XG4gICAgICAgIHNjcmlwdC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XG4gICAgICAgIHNjcmlwdC5hc3luYyA9IGZhbHNlO1xuICAgICAgICBzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG4gICAgICAgIC8vIGxvYWQgbGlzdGVuZXIgZmlyc3QgaW4gY2FzZSBzY3JpcHQgaXMgY2FjaGVkXG4gICAgICAgIHNjcmlwdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBzY3JpcHQuc3JjID0gc2NyaXB0VXJsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgIH1cbiAgICB9KSk7XG4gIH1cblxuICAvKipcbiAgICogY2hlY2sgaWYgYW55IHNjcmlwdCBvbiBwYWdlIGluY2x1ZGVzIG9uZSB3aXRoIHNyYyA9IGFwaVVybFxuICAgKi9cbiAgcHJvdGVjdGVkIGNoZWNrU2NyaXB0TG9hZGVkKHNjcmlwdFVybDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3Qgc2NyaXB0czogSFRNTENvbGxlY3Rpb24gPSB0aGlzLmRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKTtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShzY3JpcHRzKT8uc29tZSgoc2NyaXB0RWw6IEhUTUxTY3JpcHRFbGVtZW50KSA9PiBzY3JpcHRFbC5zcmM/LmluY2x1ZGVzKHNjcmlwdFVybCkpID8/IGZhbHNlO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFzeW5jIHNldENvbmZpZyhhZHZHbG9iYWw6IEFkdkNoYXRib3RHbG9iYWwsIGNoYXRib3RDb25maWc6IEFkdkNoYXRib3RXaWRnZXRDb25maWcpIHtcbiAgICB0aGlzLndpZGdldCA9IGF3YWl0IGFkdkdsb2JhbC5pbml0V2lkZ2V0KHtcbiAgICAgIGNpZDogY2hhdGJvdENvbmZpZy5jaWQsXG4gICAgICBiYXNlVXJsOiBjaGF0Ym90Q29uZmlnLmJhc2VVcmwsXG4gICAgICBsYXlvdXQ6IGNoYXRib3RDb25maWcubGF5b3V0LFxuICAgICAgdGhlbWU6IGNoYXRib3RDb25maWcudGhlbWUsXG4gICAgICB0cmFuc2xhdGlvbnM6IGNoYXRib3RDb25maWcudHJhbnNsYXRpb25zLFxuICAgICAgZ2V0Q3VzdG9tZXJEYXRhOiBkb25lID0+IHtcbiAgICAgICAgdGhpcy5nZXREYXRhRm9yV2lkZ2V0KGNoYXRib3RDb25maWcpXG4gICAgICAgICAgLnN1YnNjcmliZSh7XG4gICAgICAgICAgICAvLyBjaGVjayBzdGF0dXMgMjAwP1xuICAgICAgICAgICAgbmV4dDogcmVzcCA9PiB7XG4gICAgICAgICAgICAgIGRvbmUobnVsbCwgcmVzcCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6IGVyciA9PiBkb25lKGVyciwgbnVsbClcbiAgICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBuZXdNZXNzYWdlRXZlbnQ6IGlzV2lkZ2V0T3BlbiA9PiB7XG4gICAgICAgIHRoaXMuZXZlbnRzJC5uZXh0KHtcbiAgICAgICAgICB0eXBlOiBBZHZDaGF0Ym90RXZlbnRzLm5ld01lc3NhZ2UsXG4gICAgICAgICAgdmFsdWU6ICFpc1dpZGdldE9wZW4gLy8gbWFyayBuZXcgbWVzc2FnZSBhcyB1bnJlYWRcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogbWFudWFsIGNsaWNrIG9uIGNoYXRib3QgaWNvbiwgc2V0dXAgc2RrIGlmIG5vdCBsb2FkZWRcbiAgICovXG4gIGFzeW5jIHRvZ2dsZVZpc2liaWxpdHkoY29uZmlnOiBBZHZDaGF0Ym90V2lkZ2V0Q29uZmlnKTogUHJvbWlzZTxhbnk+IHtcbiAgICBpZiAodGhpcy53aWRnZXQpIHtcbiAgICAgIHRoaXMud2lkZ2V0LnRvZ2dsZVdpZGdldCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhd2FpdCB0aGlzLnNldHVwU2RrKGNvbmZpZywgdHJ1ZSk7XG4gICAgICB0aGlzLndpZGdldC50b2dnbGVXaWRnZXQoKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0RGF0YUZvcldpZGdldChjaGF0Ym90Q29uZmlnOiBBZHZDaGF0Ym90V2lkZ2V0Q29uZmlnKTogT2JzZXJ2YWJsZTxvYmplY3Q+IHtcbiAgICBjb25zdCBvYnMkOiBPYnNlcnZhYmxlPG9iamVjdD5bXSA9IHRoaXMuZGF0YVByb3ZpZGVycz8ubWFwKHByb3ZpZGVyID0+IHByb3ZpZGVyLmdldERhdGEoY2hhdGJvdENvbmZpZykpO1xuICAgIHJldHVybiBmb3JrSm9pbihvYnMkKS5waXBlKFxuICAgICAgbWFwKG91dHB1dHMgPT4gT2JqZWN0LmFzc2lnbih7fSwgLi4ub3V0cHV0cykpXG4gICAgKTtcbiAgfVxufVxuIl19