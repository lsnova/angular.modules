import { Inject, Injectable, Injector, Optional, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ADV_CHATBOT_CONFIG, AdvChatbotEvents } from './adv-chatbot.model';
import { forkJoin, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
export class AdvChatbotHelper {
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
    get events() {
        return this.events$.asObservable();
    }
    get isInitialized() {
        return !!this.widget;
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
}
/** @nocollapse */ AdvChatbotHelper.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: AdvChatbotHelper, deps: [{ token: DOCUMENT }, { token: i0.RendererFactory2 }, { token: ADV_CHATBOT_CONFIG, optional: true }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ AdvChatbotHelper.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: AdvChatbotHelper });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: AdvChatbotHelper, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWR2LWNoYXRib3QuaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbHNuLWxpYnMvYWR2LWNoYXRib3QvYWR2LWNoYXRib3QuaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQWEsZ0JBQWdCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbEcsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFDTCxrQkFBa0IsRUFHbEIsZ0JBQWdCLEVBS2pCLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFDLFFBQVEsRUFBYyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDOztBQUduQyxNQUFNLE9BQU8sZ0JBQWdCO0lBZTNCLFlBQXdDLFFBQVEsRUFDcEMsZ0JBQWtDLEVBQ2dCLFlBQW9DLEVBQzVFLFFBQWtCO1FBSEEsYUFBUSxHQUFSLFFBQVEsQ0FBQTtRQUVjLGlCQUFZLEdBQVosWUFBWSxDQUF3QjtRQUM1RSxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBZDlCLFlBQU8sR0FBRyxJQUFJLE9BQU8sRUFBbUIsQ0FBQztRQUN6QyxrQkFBYSxHQUE2QixFQUFFLENBQUM7UUFjckQsSUFBSSxDQUFDLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2hFLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFO1lBQzVDLEtBQUssTUFBTSxhQUFhLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUU7Z0JBQzNELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FB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QyxnQkFBZ0I7NEZBQWhCLGdCQUFnQjtrQkFENUIsVUFBVTs7MEJBZ0JJLE1BQU07MkJBQUMsUUFBUTs7MEJBRWYsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0b3IsIE9wdGlvbmFsLCBSZW5kZXJlcjIsIFJlbmRlcmVyRmFjdG9yeTJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFEVl9DSEFUQk9UX0NPTkZJRyxcbiAgQWR2Q2hhdGJvdERhdGFQcm92aWRlcixcbiAgQWR2Q2hhdGJvdEV2ZW50LFxuICBBZHZDaGF0Ym90RXZlbnRzLFxuICBBZHZDaGF0Ym90R2xvYmFsLFxuICBBZHZDaGF0Ym90TW9kdWxlQ29uZmlnLFxuICBBZHZDaGF0Ym90V2lkZ2V0LFxuICBBZHZDaGF0Ym90V2lkZ2V0Q29uZmlnXG59IGZyb20gJy4vYWR2LWNoYXRib3QubW9kZWwnO1xuaW1wb3J0IHtmb3JrSm9pbiwgT2JzZXJ2YWJsZSwgU3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge21hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWR2Q2hhdGJvdEhlbHBlciB7XG5cbiAgcHJvdGVjdGVkIHJlbmRlcmVyOiBSZW5kZXJlcjI7XG4gIHByb3RlY3RlZCB3aWRnZXQ6IEFkdkNoYXRib3RXaWRnZXQ7XG4gIHByb3RlY3RlZCBldmVudHMkID0gbmV3IFN1YmplY3Q8QWR2Q2hhdGJvdEV2ZW50PigpO1xuICBwcm90ZWN0ZWQgZGF0YVByb3ZpZGVyczogQWR2Q2hhdGJvdERhdGFQcm92aWRlcltdID0gW107XG5cbiAgZ2V0IGV2ZW50cygpOiBPYnNlcnZhYmxlPEFkdkNoYXRib3RFdmVudD4ge1xuICAgIHJldHVybiB0aGlzLmV2ZW50cyQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBnZXQgaXNJbml0aWFsaXplZCgpIHtcbiAgICByZXR1cm4gISF0aGlzLndpZGdldDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIHByb3RlY3RlZCBkb2N1bWVudCxcbiAgICAgICAgICAgICAgcmVuZGVyZXJGYWN0b3J5MjogUmVuZGVyZXJGYWN0b3J5MixcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChBRFZfQ0hBVEJPVF9DT05GSUcpIHByb3RlY3RlZCBtb2R1bGVDb25maWc6IEFkdkNoYXRib3RNb2R1bGVDb25maWcsXG4gICAgICAgICAgICAgIHByb3RlY3RlZCBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICB0aGlzLnJlbmRlcmVyID0gcmVuZGVyZXJGYWN0b3J5Mi5jcmVhdGVSZW5kZXJlcihkb2N1bWVudCwgbnVsbCk7XG4gICAgaWYgKHRoaXMubW9kdWxlQ29uZmlnPy5kYXRhUHJvdmlkZXJzPy5sZW5ndGgpIHtcbiAgICAgIGZvciAoY29uc3QgcHJvdmlkZXJDbGFzcyBvZiB0aGlzLm1vZHVsZUNvbmZpZy5kYXRhUHJvdmlkZXJzKSB7XG4gICAgICAgIHRoaXMuZGF0YVByb3ZpZGVycy5wdXNoKHRoaXMuaW5qZWN0b3IuZ2V0KHByb3ZpZGVyQ2xhc3MpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyBzZXR1cFNkayhjb25maWc6IEFkdkNoYXRib3RXaWRnZXRDb25maWcsIGF3YWl0Q29uZmlnID0gZmFsc2UpIHtcbiAgICBpZiAoY29uZmlnLnNka1VybCkge1xuICAgICAgYXdhaXQgdGhpcy5sb2FkU2NyaXB0KGNvbmZpZy5zZGtVcmwpO1xuICAgICAgY29uc3QgYWR2R2xvYmFsOiBBZHZDaGF0Ym90R2xvYmFsID0gKHRoaXMuZG9jdW1lbnQuZGVmYXVsdFZpZXcgYXMgYW55KS5BRFY7XG4gICAgICBjb25zdCBjb25maWdQcm9taXNlID0gdGhpcy5zZXRDb25maWcoYWR2R2xvYmFsLCBjb25maWcpO1xuICAgICAgaWYgKGF3YWl0Q29uZmlnKSB7XG4gICAgICAgIGF3YWl0IGNvbmZpZ1Byb21pc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGxvYWRTY3JpcHQoc2NyaXB0VXJsOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSA9PiB7XG4gICAgICBjb25zdCBjaGF0Qm90U2NyaXB0Rm91bmQgPSB0aGlzLmNoZWNrU2NyaXB0TG9hZGVkKHNjcmlwdFVybCk7XG4gICAgICBpZiAoIWNoYXRCb3RTY3JpcHRGb3VuZCkge1xuICAgICAgICBjb25zdCBzY3JpcHQ6IEhUTUxTY3JpcHRFbGVtZW50ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChkb2N1bWVudC5oZWFkLCBzY3JpcHQpO1xuICAgICAgICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgICAgICBzY3JpcHQuYXN5bmMgPSBmYWxzZTtcbiAgICAgICAgc2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuICAgICAgICAvLyBsb2FkIGxpc3RlbmVyIGZpcnN0IGluIGNhc2Ugc2NyaXB0IGlzIGNhY2hlZFxuICAgICAgICBzY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgc2NyaXB0LnNyYyA9IHNjcmlwdFVybDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICB9XG4gICAgfSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIGNoZWNrIGlmIGFueSBzY3JpcHQgb24gcGFnZSBpbmNsdWRlcyBvbmUgd2l0aCBzcmMgPSBhcGlVcmxcbiAgICovXG4gIHByb3RlY3RlZCBjaGVja1NjcmlwdExvYWRlZChzY3JpcHRVcmw6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHNjcmlwdHM6IEhUTUxDb2xsZWN0aW9uID0gdGhpcy5kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0Jyk7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oc2NyaXB0cyk/LnNvbWUoKHNjcmlwdEVsOiBIVE1MU2NyaXB0RWxlbWVudCkgPT4gc2NyaXB0RWwuc3JjPy5pbmNsdWRlcyhzY3JpcHRVcmwpKSA/PyBmYWxzZTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhc3luYyBzZXRDb25maWcoYWR2R2xvYmFsOiBBZHZDaGF0Ym90R2xvYmFsLCBjaGF0Ym90Q29uZmlnOiBBZHZDaGF0Ym90V2lkZ2V0Q29uZmlnKSB7XG4gICAgdGhpcy53aWRnZXQgPSBhd2FpdCBhZHZHbG9iYWwuaW5pdFdpZGdldCh7XG4gICAgICBjaWQ6IGNoYXRib3RDb25maWcuY2lkLFxuICAgICAgYmFzZVVybDogY2hhdGJvdENvbmZpZy5iYXNlVXJsLFxuICAgICAgbGF5b3V0OiBjaGF0Ym90Q29uZmlnLmxheW91dCxcbiAgICAgIHRoZW1lOiBjaGF0Ym90Q29uZmlnLnRoZW1lLFxuICAgICAgdHJhbnNsYXRpb25zOiBjaGF0Ym90Q29uZmlnLnRyYW5zbGF0aW9ucyxcbiAgICAgIGdldEN1c3RvbWVyRGF0YTogZG9uZSA9PiB7XG4gICAgICAgIHRoaXMuZ2V0RGF0YUZvcldpZGdldChjaGF0Ym90Q29uZmlnKVxuICAgICAgICAgIC5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgLy8gY2hlY2sgc3RhdHVzIDIwMD9cbiAgICAgICAgICAgIG5leHQ6IHJlc3AgPT4ge1xuICAgICAgICAgICAgICBkb25lKG51bGwsIHJlc3ApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiBlcnIgPT4gZG9uZShlcnIsIG51bGwpXG4gICAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgbmV3TWVzc2FnZUV2ZW50OiBpc1dpZGdldE9wZW4gPT4ge1xuICAgICAgICB0aGlzLmV2ZW50cyQubmV4dCh7XG4gICAgICAgICAgdHlwZTogQWR2Q2hhdGJvdEV2ZW50cy5uZXdNZXNzYWdlLFxuICAgICAgICAgIHZhbHVlOiAhaXNXaWRnZXRPcGVuIC8vIG1hcmsgbmV3IG1lc3NhZ2UgYXMgdW5yZWFkXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIG1hbnVhbCBjbGljayBvbiBjaGF0Ym90IGljb24sIHNldHVwIHNkayBpZiBub3QgbG9hZGVkXG4gICAqL1xuICBhc3luYyB0b2dnbGVWaXNpYmlsaXR5KGNvbmZpZzogQWR2Q2hhdGJvdFdpZGdldENvbmZpZyk6IFByb21pc2U8YW55PiB7XG4gICAgaWYgKHRoaXMud2lkZ2V0KSB7XG4gICAgICB0aGlzLndpZGdldC50b2dnbGVXaWRnZXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXdhaXQgdGhpcy5zZXR1cFNkayhjb25maWcsIHRydWUpO1xuICAgICAgdGhpcy53aWRnZXQudG9nZ2xlV2lkZ2V0KCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGdldERhdGFGb3JXaWRnZXQoY2hhdGJvdENvbmZpZzogQWR2Q2hhdGJvdFdpZGdldENvbmZpZyk6IE9ic2VydmFibGU8b2JqZWN0PiB7XG4gICAgY29uc3Qgb2JzJDogT2JzZXJ2YWJsZTxvYmplY3Q+W10gPSB0aGlzLmRhdGFQcm92aWRlcnM/Lm1hcChwcm92aWRlciA9PiBwcm92aWRlci5nZXREYXRhKGNoYXRib3RDb25maWcpKTtcbiAgICByZXR1cm4gZm9ya0pvaW4ob2JzJCkucGlwZShcbiAgICAgIG1hcChvdXRwdXRzID0+IE9iamVjdC5hc3NpZ24oe30sIC4uLm91dHB1dHMpKVxuICAgICk7XG4gIH1cbn1cbiJdfQ==