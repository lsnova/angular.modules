import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ADV_CHATBOT_CONFIG } from './adv-chatbot.model';
import { AdvChatbotHelper } from './adv-chatbot.helper';
import * as i0 from "@angular/core";
export class LsnAdvChatbotModule {
    static forRoot(config = {}) {
        return {
            ngModule: LsnAdvChatbotModule,
            providers: [
                { provide: ADV_CHATBOT_CONFIG, useValue: config },
                AdvChatbotHelper
            ]
        };
    }
}
/** @nocollapse */ LsnAdvChatbotModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: LsnAdvChatbotModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ LsnAdvChatbotModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: LsnAdvChatbotModule, imports: [CommonModule] });
/** @nocollapse */ LsnAdvChatbotModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: LsnAdvChatbotModule, imports: [[
            CommonModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: LsnAdvChatbotModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWR2LWNoYXRib3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbHNuLWxpYnMvYWR2LWNoYXRib3QvYWR2LWNoYXRib3QubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBc0IsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsa0JBQWtCLEVBQXlCLE1BQU0scUJBQXFCLENBQUM7QUFDL0UsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7O0FBT3RELE1BQU0sT0FBTyxtQkFBbUI7SUFDOUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFpQyxFQUFFO1FBQ2hELE9BQU87WUFDTCxRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLFNBQVMsRUFBRTtnQkFDVCxFQUFDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFDO2dCQUMvQyxnQkFBZ0I7YUFDakI7U0FDRixDQUFDO0lBQ0osQ0FBQzs7b0lBVFUsbUJBQW1CO3FJQUFuQixtQkFBbUIsWUFINUIsWUFBWTtxSUFHSCxtQkFBbUIsWUFKckI7WUFDUCxZQUFZO1NBQ2I7NEZBRVUsbUJBQW1CO2tCQUwvQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3FCQUNiO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7QURWX0NIQVRCT1RfQ09ORklHLCBBZHZDaGF0Ym90TW9kdWxlQ29uZmlnfSBmcm9tICcuL2Fkdi1jaGF0Ym90Lm1vZGVsJztcbmltcG9ydCB7QWR2Q2hhdGJvdEhlbHBlcn0gZnJvbSAnLi9hZHYtY2hhdGJvdC5oZWxwZXInO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTHNuQWR2Q2hhdGJvdE1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogQWR2Q2hhdGJvdE1vZHVsZUNvbmZpZyA9IHt9KTogTW9kdWxlV2l0aFByb3ZpZGVyczxMc25BZHZDaGF0Ym90TW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBMc25BZHZDaGF0Ym90TW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtwcm92aWRlOiBBRFZfQ0hBVEJPVF9DT05GSUcsIHVzZVZhbHVlOiBjb25maWd9LFxuICAgICAgICBBZHZDaGF0Ym90SGVscGVyXG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIl19