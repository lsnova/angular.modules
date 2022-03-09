import { __awaiter } from "tslib";
import { Inject, Injectable, Injector, Optional, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ADV_CHATBOT_CONFIG, AdvChatbot } from './adv-chatbot.model';
import { forkJoin, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
export class AdvChatbotHelper {
    constructor(document, rendererFactory2, moduleConfig, injector) {
        var _a, _b;
        this.document = document;
        this.moduleConfig = moduleConfig;
        this.injector = injector;
        this.events$ = new Subject();
        this.dataProviders = [];
        this.renderer = rendererFactory2.createRenderer(document, null);
        if ((_b = (_a = this.moduleConfig) === null || _a === void 0 ? void 0 : _a.dataProviders) === null || _b === void 0 ? void 0 : _b.length) {
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
    setupSdk(config, awaitConfig = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (config.sdkUrl) {
                yield this.loadScript(config.sdkUrl);
                const advGlobal = this.document.defaultView.ADV;
                const configPromise = this.setConfig(advGlobal, config);
                if (awaitConfig) {
                    yield configPromise;
                }
            }
        });
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
        var _a, _b;
        const scripts = this.document.getElementsByTagName('script');
        return (_b = (_a = Array.from(scripts)) === null || _a === void 0 ? void 0 : _a.some((scriptEl) => { var _a; return (_a = scriptEl.src) === null || _a === void 0 ? void 0 : _a.includes(scriptUrl); })) !== null && _b !== void 0 ? _b : false;
    }
    setConfig(advGlobal, chatbotConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            this.widget = yield advGlobal.initWidget({
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
        });
    }
    /**
     * manual click on chatbot icon, setup sdk if not loaded
     */
    toggleVisibility(config) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.widget) {
                this.widget.toggleWidget();
            }
            else {
                yield this.setupSdk(config, true);
                this.widget.toggleWidget();
            }
        });
    }
    getDataForWidget(chatbotConfig) {
        var _a;
        const obs$ = (_a = this.dataProviders) === null || _a === void 0 ? void 0 : _a.map(provider => provider.getData(chatbotConfig));
        return forkJoin(obs$).pipe(map(outputs => Object.assign({}, ...outputs)));
    }
}
AdvChatbotHelper.decorators = [
    { type: Injectable }
];
/** @nocollapse */
AdvChatbotHelper.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: RendererFactory2 },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [ADV_CHATBOT_CONFIG,] }] },
    { type: Injector }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWR2LWNoYXRib3QuaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbHNuLWxpYnMvYWR2LWNoYXRib3QvYWR2LWNoYXRib3QuaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFhLGdCQUFnQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2xHLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsa0JBQWtCLEVBQUUsVUFBVSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDbkUsT0FBTyxFQUFDLFFBQVEsRUFBYyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBR25DLE1BQU0sT0FBTyxnQkFBZ0I7SUFlM0IsWUFBd0MsUUFBUSxFQUNwQyxnQkFBa0MsRUFDZ0IsWUFBcUMsRUFDN0UsUUFBa0I7O1FBSEEsYUFBUSxHQUFSLFFBQVEsQ0FBQTtRQUVjLGlCQUFZLEdBQVosWUFBWSxDQUF5QjtRQUM3RSxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBZDlCLFlBQU8sR0FBRyxJQUFJLE9BQU8sRUFBb0IsQ0FBQztRQUMxQyxrQkFBYSxHQUE4QixFQUFFLENBQUM7UUFjdEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2hFLGdCQUFJLElBQUksQ0FBQyxZQUFZLDBDQUFFLGFBQWEsMENBQUUsTUFBTSxFQUFFO1lBQzVDLEtBQUssTUFBTSxhQUFhLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUU7Z0JBQzNELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FB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U0FBQyxRQUFRO1lBdEI2QixnQkFBZ0I7NENBd0I1RCxRQUFRLFlBQUksTUFBTSxTQUFDLGtCQUFrQjtZQXhCeEIsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3RvciwgT3B0aW9uYWwsIFJlbmRlcmVyMiwgUmVuZGVyZXJGYWN0b3J5Mn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtBRFZfQ0hBVEJPVF9DT05GSUcsIEFkdkNoYXRib3R9IGZyb20gJy4vYWR2LWNoYXRib3QubW9kZWwnO1xuaW1wb3J0IHtmb3JrSm9pbiwgT2JzZXJ2YWJsZSwgU3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge21hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWR2Q2hhdGJvdEhlbHBlciB7XG5cbiAgcHJvdGVjdGVkIHJlbmRlcmVyOiBSZW5kZXJlcjI7XG4gIHByb3RlY3RlZCB3aWRnZXQ6IEFkdkNoYXRib3QuV2lkZ2V0O1xuICBwcm90ZWN0ZWQgZXZlbnRzJCA9IG5ldyBTdWJqZWN0PEFkdkNoYXRib3QuRXZlbnQ+KCk7XG4gIHByb3RlY3RlZCBkYXRhUHJvdmlkZXJzOiBBZHZDaGF0Ym90LkRhdGFQcm92aWRlcltdID0gW107XG5cbiAgZ2V0IGV2ZW50cygpOiBPYnNlcnZhYmxlPEFkdkNoYXRib3QuRXZlbnQ+IHtcbiAgICByZXR1cm4gdGhpcy5ldmVudHMkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgZ2V0IGlzSW5pdGlhbGl6ZWQoKSB7XG4gICAgcmV0dXJuICEhdGhpcy53aWRnZXQ7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcm90ZWN0ZWQgZG9jdW1lbnQsXG4gICAgICAgICAgICAgIHJlbmRlcmVyRmFjdG9yeTI6IFJlbmRlcmVyRmFjdG9yeTIsXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQURWX0NIQVRCT1RfQ09ORklHKSBwcm90ZWN0ZWQgbW9kdWxlQ29uZmlnOiBBZHZDaGF0Ym90Lk1vZHVsZUNvbmZpZyxcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgIHRoaXMucmVuZGVyZXIgPSByZW5kZXJlckZhY3RvcnkyLmNyZWF0ZVJlbmRlcmVyKGRvY3VtZW50LCBudWxsKTtcbiAgICBpZiAodGhpcy5tb2R1bGVDb25maWc/LmRhdGFQcm92aWRlcnM/Lmxlbmd0aCkge1xuICAgICAgZm9yIChjb25zdCBwcm92aWRlckNsYXNzIG9mIHRoaXMubW9kdWxlQ29uZmlnLmRhdGFQcm92aWRlcnMpIHtcbiAgICAgICAgdGhpcy5kYXRhUHJvdmlkZXJzLnB1c2godGhpcy5pbmplY3Rvci5nZXQocHJvdmlkZXJDbGFzcykpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHNldHVwU2RrKGNvbmZpZzogQWR2Q2hhdGJvdC5XaWRnZXRDb25maWcsIGF3YWl0Q29uZmlnID0gZmFsc2UpIHtcbiAgICBpZiAoY29uZmlnLnNka1VybCkge1xuICAgICAgYXdhaXQgdGhpcy5sb2FkU2NyaXB0KGNvbmZpZy5zZGtVcmwpO1xuICAgICAgY29uc3QgYWR2R2xvYmFsOiBBZHZDaGF0Ym90Lkdsb2JhbCA9ICh0aGlzLmRvY3VtZW50LmRlZmF1bHRWaWV3IGFzIGFueSkuQURWO1xuICAgICAgY29uc3QgY29uZmlnUHJvbWlzZSA9IHRoaXMuc2V0Q29uZmlnKGFkdkdsb2JhbCwgY29uZmlnKTtcbiAgICAgIGlmIChhd2FpdENvbmZpZykge1xuICAgICAgICBhd2FpdCBjb25maWdQcm9taXNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBsb2FkU2NyaXB0KHNjcmlwdFVybDogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUgPT4ge1xuICAgICAgY29uc3QgY2hhdEJvdFNjcmlwdEZvdW5kID0gdGhpcy5jaGVja1NjcmlwdExvYWRlZChzY3JpcHRVcmwpO1xuICAgICAgaWYgKCFjaGF0Qm90U2NyaXB0Rm91bmQpIHtcbiAgICAgICAgY29uc3Qgc2NyaXB0OiBIVE1MU2NyaXB0RWxlbWVudCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuaGVhZCwgc2NyaXB0KTtcbiAgICAgICAgc2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiAgICAgICAgc2NyaXB0LmFzeW5jID0gZmFsc2U7XG4gICAgICAgIHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04JztcbiAgICAgICAgLy8gbG9hZCBsaXN0ZW5lciBmaXJzdCBpbiBjYXNlIHNjcmlwdCBpcyBjYWNoZWRcbiAgICAgICAgc2NyaXB0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNjcmlwdC5zcmMgPSBzY3JpcHRVcmw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgfVxuICAgIH0pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjaGVjayBpZiBhbnkgc2NyaXB0IG9uIHBhZ2UgaW5jbHVkZXMgb25lIHdpdGggc3JjID0gYXBpVXJsXG4gICAqL1xuICBwcm90ZWN0ZWQgY2hlY2tTY3JpcHRMb2FkZWQoc2NyaXB0VXJsOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCBzY3JpcHRzOiBIVE1MQ29sbGVjdGlvbiA9IHRoaXMuZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpO1xuICAgIHJldHVybiBBcnJheS5mcm9tKHNjcmlwdHMpPy5zb21lKChzY3JpcHRFbDogSFRNTFNjcmlwdEVsZW1lbnQpID0+IHNjcmlwdEVsLnNyYz8uaW5jbHVkZXMoc2NyaXB0VXJsKSkgPz8gZmFsc2U7XG4gIH1cblxuICBwcm90ZWN0ZWQgYXN5bmMgc2V0Q29uZmlnKGFkdkdsb2JhbDogQWR2Q2hhdGJvdC5HbG9iYWwsIGNoYXRib3RDb25maWc6IEFkdkNoYXRib3QuV2lkZ2V0Q29uZmlnKSB7XG4gICAgdGhpcy53aWRnZXQgPSBhd2FpdCBhZHZHbG9iYWwuaW5pdFdpZGdldCh7XG4gICAgICBjaWQ6IGNoYXRib3RDb25maWcuY2lkLFxuICAgICAgYmFzZVVybDogY2hhdGJvdENvbmZpZy5iYXNlVXJsLFxuICAgICAgbGF5b3V0OiBjaGF0Ym90Q29uZmlnLmxheW91dCxcbiAgICAgIHRoZW1lOiBjaGF0Ym90Q29uZmlnLnRoZW1lLFxuICAgICAgdHJhbnNsYXRpb25zOiBjaGF0Ym90Q29uZmlnLnRyYW5zbGF0aW9ucyxcbiAgICAgIGdldEN1c3RvbWVyRGF0YTogZG9uZSA9PiB7XG4gICAgICAgIHRoaXMuZ2V0RGF0YUZvcldpZGdldChjaGF0Ym90Q29uZmlnKVxuICAgICAgICAgIC5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgLy8gY2hlY2sgc3RhdHVzIDIwMD9cbiAgICAgICAgICAgIG5leHQ6IHJlc3AgPT4ge1xuICAgICAgICAgICAgICBkb25lKG51bGwsIHJlc3ApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiBlcnIgPT4gZG9uZShlcnIsIG51bGwpXG4gICAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgbmV3TWVzc2FnZUV2ZW50OiBpc1dpZGdldE9wZW4gPT4ge1xuICAgICAgICB0aGlzLmV2ZW50cyQubmV4dCh7XG4gICAgICAgICAgdHlwZTogQWR2Q2hhdGJvdC5FdmVudHMubmV3TWVzc2FnZSxcbiAgICAgICAgICB2YWx1ZTogIWlzV2lkZ2V0T3BlbiAvLyBtYXJrIG5ldyBtZXNzYWdlIGFzIHVucmVhZFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtYW51YWwgY2xpY2sgb24gY2hhdGJvdCBpY29uLCBzZXR1cCBzZGsgaWYgbm90IGxvYWRlZFxuICAgKi9cbiAgYXN5bmMgdG9nZ2xlVmlzaWJpbGl0eShjb25maWc6IEFkdkNoYXRib3QuV2lkZ2V0Q29uZmlnKTogUHJvbWlzZTxhbnk+IHtcbiAgICBpZiAodGhpcy53aWRnZXQpIHtcbiAgICAgIHRoaXMud2lkZ2V0LnRvZ2dsZVdpZGdldCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhd2FpdCB0aGlzLnNldHVwU2RrKGNvbmZpZywgdHJ1ZSk7XG4gICAgICB0aGlzLndpZGdldC50b2dnbGVXaWRnZXQoKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0RGF0YUZvcldpZGdldChjaGF0Ym90Q29uZmlnOiBBZHZDaGF0Ym90LldpZGdldENvbmZpZyk6IE9ic2VydmFibGU8b2JqZWN0PiB7XG4gICAgY29uc3Qgb2JzJDogT2JzZXJ2YWJsZTxvYmplY3Q+W10gPSB0aGlzLmRhdGFQcm92aWRlcnM/Lm1hcChwcm92aWRlciA9PiBwcm92aWRlci5nZXREYXRhKGNoYXRib3RDb25maWcpKTtcbiAgICByZXR1cm4gZm9ya0pvaW4ob2JzJCkucGlwZShcbiAgICAgIG1hcChvdXRwdXRzID0+IE9iamVjdC5hc3NpZ24oe30sIC4uLm91dHB1dHMpKVxuICAgICk7XG4gIH1cbn1cbiJdfQ==