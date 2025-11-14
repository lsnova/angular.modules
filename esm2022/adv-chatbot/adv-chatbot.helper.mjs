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
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AdvChatbotHelper, deps: [{ token: DOCUMENT }, { token: i0.RendererFactory2 }, { token: ADV_CHATBOT_CONFIG, optional: true }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable }); }
    /** @nocollapse */ static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AdvChatbotHelper }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AdvChatbotHelper, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.RendererFactory2 }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [ADV_CHATBOT_CONFIG]
                }] }, { type: i0.Injector }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWR2LWNoYXRib3QuaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbHNuLWxpYnMvYWR2LWNoYXRib3QvYWR2LWNoYXRib3QuaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQWEsZ0JBQWdCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbEcsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFDTCxrQkFBa0IsRUFHbEIsZ0JBQWdCLEVBS2pCLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFDLFFBQVEsRUFBYyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDOztBQUduQyxNQUFNLE9BQU8sZ0JBQWdCO0lBTzNCLElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQsSUFBSSxhQUFhO1FBQ2YsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQsWUFBd0MsUUFBUSxFQUNwQyxnQkFBa0MsRUFDZ0IsWUFBb0MsRUFDNUUsUUFBa0I7UUFIQSxhQUFRLEdBQVIsUUFBUSxDQUFBO1FBRWMsaUJBQVksR0FBWixZQUFZLENBQXdCO1FBQzVFLGFBQVEsR0FBUixRQUFRLENBQVU7UUFkOUIsWUFBTyxHQUFHLElBQUksT0FBTyxFQUFtQixDQUFDO1FBQ3pDLGtCQUFhLEdBQTZCLEVBQUUsQ0FBQztRQWNyRCxJQUFJLENBQUMsUUFBUSxHQUFHLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDaEUsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFF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LE9BQU8sQ0FBQyxDQUFDLENBQzlDLENBQUM7SUFDSixDQUFDO2tJQTdHVSxnQkFBZ0Isa0JBZVAsUUFBUSw2Q0FFSSxrQkFBa0I7c0lBakJ2QyxnQkFBZ0I7OzRGQUFoQixnQkFBZ0I7a0JBRDVCLFVBQVU7OzBCQWdCSSxNQUFNOzJCQUFDLFFBQVE7OzBCQUVmLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIEluamVjdG9yLCBPcHRpb25hbCwgUmVuZGVyZXIyLCBSZW5kZXJlckZhY3RvcnkyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBBRFZfQ0hBVEJPVF9DT05GSUcsXG4gIEFkdkNoYXRib3REYXRhUHJvdmlkZXIsXG4gIEFkdkNoYXRib3RFdmVudCxcbiAgQWR2Q2hhdGJvdEV2ZW50cyxcbiAgQWR2Q2hhdGJvdEdsb2JhbCxcbiAgQWR2Q2hhdGJvdE1vZHVsZUNvbmZpZyxcbiAgQWR2Q2hhdGJvdFdpZGdldCxcbiAgQWR2Q2hhdGJvdFdpZGdldENvbmZpZ1xufSBmcm9tICcuL2Fkdi1jaGF0Ym90Lm1vZGVsJztcbmltcG9ydCB7Zm9ya0pvaW4sIE9ic2VydmFibGUsIFN1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHttYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFkdkNoYXRib3RIZWxwZXIge1xuXG4gIHByb3RlY3RlZCByZW5kZXJlcjogUmVuZGVyZXIyO1xuICBwcm90ZWN0ZWQgd2lkZ2V0OiBBZHZDaGF0Ym90V2lkZ2V0O1xuICBwcm90ZWN0ZWQgZXZlbnRzJCA9IG5ldyBTdWJqZWN0PEFkdkNoYXRib3RFdmVudD4oKTtcbiAgcHJvdGVjdGVkIGRhdGFQcm92aWRlcnM6IEFkdkNoYXRib3REYXRhUHJvdmlkZXJbXSA9IFtdO1xuXG4gIGdldCBldmVudHMoKTogT2JzZXJ2YWJsZTxBZHZDaGF0Ym90RXZlbnQ+IHtcbiAgICByZXR1cm4gdGhpcy5ldmVudHMkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgZ2V0IGlzSW5pdGlhbGl6ZWQoKSB7XG4gICAgcmV0dXJuICEhdGhpcy53aWRnZXQ7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcm90ZWN0ZWQgZG9jdW1lbnQsXG4gICAgICAgICAgICAgIHJlbmRlcmVyRmFjdG9yeTI6IFJlbmRlcmVyRmFjdG9yeTIsXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQURWX0NIQVRCT1RfQ09ORklHKSBwcm90ZWN0ZWQgbW9kdWxlQ29uZmlnOiBBZHZDaGF0Ym90TW9kdWxlQ29uZmlnLFxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgdGhpcy5yZW5kZXJlciA9IHJlbmRlcmVyRmFjdG9yeTIuY3JlYXRlUmVuZGVyZXIoZG9jdW1lbnQsIG51bGwpO1xuICAgIGlmICh0aGlzLm1vZHVsZUNvbmZpZz8uZGF0YVByb3ZpZGVycz8ubGVuZ3RoKSB7XG4gICAgICBmb3IgKGNvbnN0IHByb3ZpZGVyQ2xhc3Mgb2YgdGhpcy5tb2R1bGVDb25maWcuZGF0YVByb3ZpZGVycykge1xuICAgICAgICB0aGlzLmRhdGFQcm92aWRlcnMucHVzaCh0aGlzLmluamVjdG9yLmdldChwcm92aWRlckNsYXNzKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgc2V0dXBTZGsoY29uZmlnOiBBZHZDaGF0Ym90V2lkZ2V0Q29uZmlnLCBhd2FpdENvbmZpZyA9IGZhbHNlKSB7XG4gICAgaWYgKGNvbmZpZy5zZGtVcmwpIHtcbiAgICAgIGF3YWl0IHRoaXMubG9hZFNjcmlwdChjb25maWcuc2RrVXJsKTtcbiAgICAgIGNvbnN0IGFkdkdsb2JhbDogQWR2Q2hhdGJvdEdsb2JhbCA9ICh0aGlzLmRvY3VtZW50LmRlZmF1bHRWaWV3IGFzIGFueSkuQURWO1xuICAgICAgY29uc3QgY29uZmlnUHJvbWlzZSA9IHRoaXMuc2V0Q29uZmlnKGFkdkdsb2JhbCwgY29uZmlnKTtcbiAgICAgIGlmIChhd2FpdENvbmZpZykge1xuICAgICAgICBhd2FpdCBjb25maWdQcm9taXNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBsb2FkU2NyaXB0KHNjcmlwdFVybDogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUgPT4ge1xuICAgICAgY29uc3QgY2hhdEJvdFNjcmlwdEZvdW5kID0gdGhpcy5jaGVja1NjcmlwdExvYWRlZChzY3JpcHRVcmwpO1xuICAgICAgaWYgKCFjaGF0Qm90U2NyaXB0Rm91bmQpIHtcbiAgICAgICAgY29uc3Qgc2NyaXB0OiBIVE1MU2NyaXB0RWxlbWVudCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuaGVhZCwgc2NyaXB0KTtcbiAgICAgICAgc2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiAgICAgICAgc2NyaXB0LmFzeW5jID0gZmFsc2U7XG4gICAgICAgIHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04JztcbiAgICAgICAgLy8gbG9hZCBsaXN0ZW5lciBmaXJzdCBpbiBjYXNlIHNjcmlwdCBpcyBjYWNoZWRcbiAgICAgICAgc2NyaXB0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNjcmlwdC5zcmMgPSBzY3JpcHRVcmw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgfVxuICAgIH0pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjaGVjayBpZiBhbnkgc2NyaXB0IG9uIHBhZ2UgaW5jbHVkZXMgb25lIHdpdGggc3JjID0gYXBpVXJsXG4gICAqL1xuICBwcm90ZWN0ZWQgY2hlY2tTY3JpcHRMb2FkZWQoc2NyaXB0VXJsOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCBzY3JpcHRzOiBIVE1MQ29sbGVjdGlvbiA9IHRoaXMuZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpO1xuICAgIHJldHVybiBBcnJheS5mcm9tKHNjcmlwdHMpPy5zb21lKChzY3JpcHRFbDogSFRNTFNjcmlwdEVsZW1lbnQpID0+IHNjcmlwdEVsLnNyYz8uaW5jbHVkZXMoc2NyaXB0VXJsKSkgPz8gZmFsc2U7XG4gIH1cblxuICBwcm90ZWN0ZWQgYXN5bmMgc2V0Q29uZmlnKGFkdkdsb2JhbDogQWR2Q2hhdGJvdEdsb2JhbCwgY2hhdGJvdENvbmZpZzogQWR2Q2hhdGJvdFdpZGdldENvbmZpZykge1xuICAgIHRoaXMud2lkZ2V0ID0gYXdhaXQgYWR2R2xvYmFsLmluaXRXaWRnZXQoe1xuICAgICAgY2lkOiBjaGF0Ym90Q29uZmlnLmNpZCxcbiAgICAgIGJhc2VVcmw6IGNoYXRib3RDb25maWcuYmFzZVVybCxcbiAgICAgIGxheW91dDogY2hhdGJvdENvbmZpZy5sYXlvdXQsXG4gICAgICB0aGVtZTogY2hhdGJvdENvbmZpZy50aGVtZSxcbiAgICAgIHRyYW5zbGF0aW9uczogY2hhdGJvdENvbmZpZy50cmFuc2xhdGlvbnMsXG4gICAgICBnZXRDdXN0b21lckRhdGE6IGRvbmUgPT4ge1xuICAgICAgICB0aGlzLmdldERhdGFGb3JXaWRnZXQoY2hhdGJvdENvbmZpZylcbiAgICAgICAgICAuc3Vic2NyaWJlKHtcbiAgICAgICAgICAgIC8vIGNoZWNrIHN0YXR1cyAyMDA/XG4gICAgICAgICAgICBuZXh0OiByZXNwID0+IHtcbiAgICAgICAgICAgICAgZG9uZShudWxsLCByZXNwKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZXJyID0+IGRvbmUoZXJyLCBudWxsKVxuICAgICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIG5ld01lc3NhZ2VFdmVudDogaXNXaWRnZXRPcGVuID0+IHtcbiAgICAgICAgdGhpcy5ldmVudHMkLm5leHQoe1xuICAgICAgICAgIHR5cGU6IEFkdkNoYXRib3RFdmVudHMubmV3TWVzc2FnZSxcbiAgICAgICAgICB2YWx1ZTogIWlzV2lkZ2V0T3BlbiAvLyBtYXJrIG5ldyBtZXNzYWdlIGFzIHVucmVhZFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtYW51YWwgY2xpY2sgb24gY2hhdGJvdCBpY29uLCBzZXR1cCBzZGsgaWYgbm90IGxvYWRlZFxuICAgKi9cbiAgYXN5bmMgdG9nZ2xlVmlzaWJpbGl0eShjb25maWc6IEFkdkNoYXRib3RXaWRnZXRDb25maWcpOiBQcm9taXNlPGFueT4ge1xuICAgIGlmICh0aGlzLndpZGdldCkge1xuICAgICAgdGhpcy53aWRnZXQudG9nZ2xlV2lkZ2V0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF3YWl0IHRoaXMuc2V0dXBTZGsoY29uZmlnLCB0cnVlKTtcbiAgICAgIHRoaXMud2lkZ2V0LnRvZ2dsZVdpZGdldCgpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBnZXREYXRhRm9yV2lkZ2V0KGNoYXRib3RDb25maWc6IEFkdkNoYXRib3RXaWRnZXRDb25maWcpOiBPYnNlcnZhYmxlPG9iamVjdD4ge1xuICAgIGNvbnN0IG9icyQ6IE9ic2VydmFibGU8b2JqZWN0PltdID0gdGhpcy5kYXRhUHJvdmlkZXJzPy5tYXAocHJvdmlkZXIgPT4gcHJvdmlkZXIuZ2V0RGF0YShjaGF0Ym90Q29uZmlnKSk7XG4gICAgcmV0dXJuIGZvcmtKb2luKG9icyQpLnBpcGUoXG4gICAgICBtYXAob3V0cHV0cyA9PiBPYmplY3QuYXNzaWduKHt9LCAuLi5vdXRwdXRzKSlcbiAgICApO1xuICB9XG59XG4iXX0=