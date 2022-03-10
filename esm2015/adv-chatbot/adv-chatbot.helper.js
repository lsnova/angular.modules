import { __awaiter } from "tslib";
import { Inject, Injectable, Injector, Optional, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ADV_CHATBOT_CONFIG, AdvChatbotEvents } from './adv-chatbot.model';
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
                        type: AdvChatbotEvents.newMessage,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWR2LWNoYXRib3QuaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbHNuLWxpYnMvYWR2LWNoYXRib3QvYWR2LWNoYXRib3QuaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFhLGdCQUFnQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2xHLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQ0wsa0JBQWtCLEVBR2xCLGdCQUFnQixFQUtqQixNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFBQyxRQUFRLEVBQWMsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUduQyxNQUFNLE9BQU8sZ0JBQWdCO0lBZTNCLFlBQXdDLFFBQVEsRUFDcEMsZ0JBQWtDLEVBQ2dCLFlBQW9DLEVBQzVFLFFBQWtCOztRQUhBLGFBQVEsR0FBUixRQUFRLENBQUE7UUFFYyxpQkFBWSxHQUFaLFlBQVksQ0FBd0I7UUFDNUUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQWQ5QixZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQW1CLENBQUM7UUFDekMsa0JBQWEsR0FBNkIsRUFBRSxDQUFDO1FBY3JELElBQUksQ0FBQyxRQUFRLEdBQUcsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNoRSxnQkFBSSxJQUFJLENBQUMsWUFBWSwwQ0FBRSxhQUFhLDBDQUFFLE1BQU0sRUFBRTtZQUM1QyxLQUFLLE1BQU0sYUFBYSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFO2dCQUMzRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFD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LFFBQVE7WUEvQjZCLGdCQUFnQjs0Q0FpQzVELFFBQVEsWUFBSSxNQUFNLFNBQUMsa0JBQWtCO1lBakN4QixRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIEluamVjdG9yLCBPcHRpb25hbCwgUmVuZGVyZXIyLCBSZW5kZXJlckZhY3RvcnkyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBBRFZfQ0hBVEJPVF9DT05GSUcsXG4gIEFkdkNoYXRib3REYXRhUHJvdmlkZXIsXG4gIEFkdkNoYXRib3RFdmVudCxcbiAgQWR2Q2hhdGJvdEV2ZW50cyxcbiAgQWR2Q2hhdGJvdEdsb2JhbCxcbiAgQWR2Q2hhdGJvdE1vZHVsZUNvbmZpZyxcbiAgQWR2Q2hhdGJvdFdpZGdldCxcbiAgQWR2Q2hhdGJvdFdpZGdldENvbmZpZ1xufSBmcm9tICcuL2Fkdi1jaGF0Ym90Lm1vZGVsJztcbmltcG9ydCB7Zm9ya0pvaW4sIE9ic2VydmFibGUsIFN1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHttYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFkdkNoYXRib3RIZWxwZXIge1xuXG4gIHByb3RlY3RlZCByZW5kZXJlcjogUmVuZGVyZXIyO1xuICBwcm90ZWN0ZWQgd2lkZ2V0OiBBZHZDaGF0Ym90V2lkZ2V0O1xuICBwcm90ZWN0ZWQgZXZlbnRzJCA9IG5ldyBTdWJqZWN0PEFkdkNoYXRib3RFdmVudD4oKTtcbiAgcHJvdGVjdGVkIGRhdGFQcm92aWRlcnM6IEFkdkNoYXRib3REYXRhUHJvdmlkZXJbXSA9IFtdO1xuXG4gIGdldCBldmVudHMoKTogT2JzZXJ2YWJsZTxBZHZDaGF0Ym90RXZlbnQ+IHtcbiAgICByZXR1cm4gdGhpcy5ldmVudHMkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgZ2V0IGlzSW5pdGlhbGl6ZWQoKSB7XG4gICAgcmV0dXJuICEhdGhpcy53aWRnZXQ7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcm90ZWN0ZWQgZG9jdW1lbnQsXG4gICAgICAgICAgICAgIHJlbmRlcmVyRmFjdG9yeTI6IFJlbmRlcmVyRmFjdG9yeTIsXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQURWX0NIQVRCT1RfQ09ORklHKSBwcm90ZWN0ZWQgbW9kdWxlQ29uZmlnOiBBZHZDaGF0Ym90TW9kdWxlQ29uZmlnLFxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgdGhpcy5yZW5kZXJlciA9IHJlbmRlcmVyRmFjdG9yeTIuY3JlYXRlUmVuZGVyZXIoZG9jdW1lbnQsIG51bGwpO1xuICAgIGlmICh0aGlzLm1vZHVsZUNvbmZpZz8uZGF0YVByb3ZpZGVycz8ubGVuZ3RoKSB7XG4gICAgICBmb3IgKGNvbnN0IHByb3ZpZGVyQ2xhc3Mgb2YgdGhpcy5tb2R1bGVDb25maWcuZGF0YVByb3ZpZGVycykge1xuICAgICAgICB0aGlzLmRhdGFQcm92aWRlcnMucHVzaCh0aGlzLmluamVjdG9yLmdldChwcm92aWRlckNsYXNzKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgc2V0dXBTZGsoY29uZmlnOiBBZHZDaGF0Ym90V2lkZ2V0Q29uZmlnLCBhd2FpdENvbmZpZyA9IGZhbHNlKSB7XG4gICAgaWYgKGNvbmZpZy5zZGtVcmwpIHtcbiAgICAgIGF3YWl0IHRoaXMubG9hZFNjcmlwdChjb25maWcuc2RrVXJsKTtcbiAgICAgIGNvbnN0IGFkdkdsb2JhbDogQWR2Q2hhdGJvdEdsb2JhbCA9ICh0aGlzLmRvY3VtZW50LmRlZmF1bHRWaWV3IGFzIGFueSkuQURWO1xuICAgICAgY29uc3QgY29uZmlnUHJvbWlzZSA9IHRoaXMuc2V0Q29uZmlnKGFkdkdsb2JhbCwgY29uZmlnKTtcbiAgICAgIGlmIChhd2FpdENvbmZpZykge1xuICAgICAgICBhd2FpdCBjb25maWdQcm9taXNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBsb2FkU2NyaXB0KHNjcmlwdFVybDogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUgPT4ge1xuICAgICAgY29uc3QgY2hhdEJvdFNjcmlwdEZvdW5kID0gdGhpcy5jaGVja1NjcmlwdExvYWRlZChzY3JpcHRVcmwpO1xuICAgICAgaWYgKCFjaGF0Qm90U2NyaXB0Rm91bmQpIHtcbiAgICAgICAgY29uc3Qgc2NyaXB0OiBIVE1MU2NyaXB0RWxlbWVudCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuaGVhZCwgc2NyaXB0KTtcbiAgICAgICAgc2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiAgICAgICAgc2NyaXB0LmFzeW5jID0gZmFsc2U7XG4gICAgICAgIHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04JztcbiAgICAgICAgLy8gbG9hZCBsaXN0ZW5lciBmaXJzdCBpbiBjYXNlIHNjcmlwdCBpcyBjYWNoZWRcbiAgICAgICAgc2NyaXB0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNjcmlwdC5zcmMgPSBzY3JpcHRVcmw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgfVxuICAgIH0pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjaGVjayBpZiBhbnkgc2NyaXB0IG9uIHBhZ2UgaW5jbHVkZXMgb25lIHdpdGggc3JjID0gYXBpVXJsXG4gICAqL1xuICBwcm90ZWN0ZWQgY2hlY2tTY3JpcHRMb2FkZWQoc2NyaXB0VXJsOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCBzY3JpcHRzOiBIVE1MQ29sbGVjdGlvbiA9IHRoaXMuZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpO1xuICAgIHJldHVybiBBcnJheS5mcm9tKHNjcmlwdHMpPy5zb21lKChzY3JpcHRFbDogSFRNTFNjcmlwdEVsZW1lbnQpID0+IHNjcmlwdEVsLnNyYz8uaW5jbHVkZXMoc2NyaXB0VXJsKSkgPz8gZmFsc2U7XG4gIH1cblxuICBwcm90ZWN0ZWQgYXN5bmMgc2V0Q29uZmlnKGFkdkdsb2JhbDogQWR2Q2hhdGJvdEdsb2JhbCwgY2hhdGJvdENvbmZpZzogQWR2Q2hhdGJvdFdpZGdldENvbmZpZykge1xuICAgIHRoaXMud2lkZ2V0ID0gYXdhaXQgYWR2R2xvYmFsLmluaXRXaWRnZXQoe1xuICAgICAgY2lkOiBjaGF0Ym90Q29uZmlnLmNpZCxcbiAgICAgIGJhc2VVcmw6IGNoYXRib3RDb25maWcuYmFzZVVybCxcbiAgICAgIGxheW91dDogY2hhdGJvdENvbmZpZy5sYXlvdXQsXG4gICAgICB0aGVtZTogY2hhdGJvdENvbmZpZy50aGVtZSxcbiAgICAgIHRyYW5zbGF0aW9uczogY2hhdGJvdENvbmZpZy50cmFuc2xhdGlvbnMsXG4gICAgICBnZXRDdXN0b21lckRhdGE6IGRvbmUgPT4ge1xuICAgICAgICB0aGlzLmdldERhdGFGb3JXaWRnZXQoY2hhdGJvdENvbmZpZylcbiAgICAgICAgICAuc3Vic2NyaWJlKHtcbiAgICAgICAgICAgIC8vIGNoZWNrIHN0YXR1cyAyMDA/XG4gICAgICAgICAgICBuZXh0OiByZXNwID0+IHtcbiAgICAgICAgICAgICAgZG9uZShudWxsLCByZXNwKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZXJyID0+IGRvbmUoZXJyLCBudWxsKVxuICAgICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIG5ld01lc3NhZ2VFdmVudDogaXNXaWRnZXRPcGVuID0+IHtcbiAgICAgICAgdGhpcy5ldmVudHMkLm5leHQoe1xuICAgICAgICAgIHR5cGU6IEFkdkNoYXRib3RFdmVudHMubmV3TWVzc2FnZSxcbiAgICAgICAgICB2YWx1ZTogIWlzV2lkZ2V0T3BlbiAvLyBtYXJrIG5ldyBtZXNzYWdlIGFzIHVucmVhZFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtYW51YWwgY2xpY2sgb24gY2hhdGJvdCBpY29uLCBzZXR1cCBzZGsgaWYgbm90IGxvYWRlZFxuICAgKi9cbiAgYXN5bmMgdG9nZ2xlVmlzaWJpbGl0eShjb25maWc6IEFkdkNoYXRib3RXaWRnZXRDb25maWcpOiBQcm9taXNlPGFueT4ge1xuICAgIGlmICh0aGlzLndpZGdldCkge1xuICAgICAgdGhpcy53aWRnZXQudG9nZ2xlV2lkZ2V0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF3YWl0IHRoaXMuc2V0dXBTZGsoY29uZmlnLCB0cnVlKTtcbiAgICAgIHRoaXMud2lkZ2V0LnRvZ2dsZVdpZGdldCgpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBnZXREYXRhRm9yV2lkZ2V0KGNoYXRib3RDb25maWc6IEFkdkNoYXRib3RXaWRnZXRDb25maWcpOiBPYnNlcnZhYmxlPG9iamVjdD4ge1xuICAgIGNvbnN0IG9icyQ6IE9ic2VydmFibGU8b2JqZWN0PltdID0gdGhpcy5kYXRhUHJvdmlkZXJzPy5tYXAocHJvdmlkZXIgPT4gcHJvdmlkZXIuZ2V0RGF0YShjaGF0Ym90Q29uZmlnKSk7XG4gICAgcmV0dXJuIGZvcmtKb2luKG9icyQpLnBpcGUoXG4gICAgICBtYXAob3V0cHV0cyA9PiBPYmplY3QuYXNzaWduKHt9LCAuLi5vdXRwdXRzKSlcbiAgICApO1xuICB9XG59XG4iXX0=