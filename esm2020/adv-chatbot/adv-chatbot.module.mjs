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
/** @nocollapse */ LsnAdvChatbotModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: LsnAdvChatbotModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ LsnAdvChatbotModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.12", ngImport: i0, type: LsnAdvChatbotModule, imports: [CommonModule] });
/** @nocollapse */ LsnAdvChatbotModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: LsnAdvChatbotModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: LsnAdvChatbotModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWR2LWNoYXRib3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbHNuLWxpYnMvYWR2LWNoYXRib3QvYWR2LWNoYXRib3QubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBc0IsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsa0JBQWtCLEVBQXlCLE1BQU0scUJBQXFCLENBQUM7QUFDL0UsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7O0FBT3RELE1BQU0sT0FBTyxtQkFBbUI7SUFDOUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFpQyxFQUFFO1FBQ2hELE9BQU87WUFDTCxRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLFNBQVMsRUFBRTtnQkFDVCxFQUFDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFDO2dCQUMvQyxnQkFBZ0I7YUFDakI7U0FDRixDQUFDO0lBQ0osQ0FBQzs7b0lBVFUsbUJBQW1CO3FJQUFuQixtQkFBbUIsWUFINUIsWUFBWTtxSUFHSCxtQkFBbUIsWUFINUIsWUFBWTs0RkFHSCxtQkFBbUI7a0JBTC9CLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7cUJBQ2I7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtBRFZfQ0hBVEJPVF9DT05GSUcsIEFkdkNoYXRib3RNb2R1bGVDb25maWd9IGZyb20gJy4vYWR2LWNoYXRib3QubW9kZWwnO1xuaW1wb3J0IHtBZHZDaGF0Ym90SGVscGVyfSBmcm9tICcuL2Fkdi1jaGF0Ym90LmhlbHBlcic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBMc25BZHZDaGF0Ym90TW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBBZHZDaGF0Ym90TW9kdWxlQ29uZmlnID0ge30pOiBNb2R1bGVXaXRoUHJvdmlkZXJzPExzbkFkdkNoYXRib3RNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IExzbkFkdkNoYXRib3RNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge3Byb3ZpZGU6IEFEVl9DSEFUQk9UX0NPTkZJRywgdXNlVmFsdWU6IGNvbmZpZ30sXG4gICAgICAgIEFkdkNoYXRib3RIZWxwZXJcbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXX0=