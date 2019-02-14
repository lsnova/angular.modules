/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CapitalizeDirective } from './directives/capitalize/capitalize.directive';
import { LatinToGreekDirective } from './directives/latin-to-greek/latin-to-greek.directive';
import { NumericDirective } from './directives/numeric/numeric.directive';
import { NumPadDirective } from './directives/numpad/numpad.directive';
import { ConfigService, CustomConfig } from './services/config.service';
var LsnLibsModule = /** @class */ (function () {
    function LsnLibsModule() {
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    LsnLibsModule.forRoot = /**
     * @param {?=} config
     * @return {?}
     */
    function (config) {
        return {
            ngModule: LsnLibsModule,
            providers: [
                ConfigService,
                { provide: CustomConfig, useValue: config }
            ]
        };
    };
    LsnLibsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        CapitalizeDirective,
                        LatinToGreekDirective,
                        NumericDirective,
                        NumPadDirective,
                    ],
                    imports: [],
                    exports: [
                        CapitalizeDirective,
                        LatinToGreekDirective,
                        NumericDirective,
                        NumPadDirective,
                    ]
                },] }
    ];
    return LsnLibsModule;
}());
export { LsnLibsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNuLWxpYnMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy8iLCJzb3VyY2VzIjpbImxpYi9sc24tbGlicy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBc0IsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDhDQUE4QyxDQUFDO0FBQ2pGLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNEQUFzRCxDQUFDO0FBQzNGLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBQ3hFLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUNyRSxPQUFPLEVBQUMsYUFBYSxFQUFFLFlBQVksRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRXRFO0lBQUE7SUF5QkEsQ0FBQzs7Ozs7SUFUUSxxQkFBTzs7OztJQUFkLFVBQWUsTUFBcUI7UUFDbEMsT0FBTztZQUNMLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFNBQVMsRUFBRTtnQkFDVCxhQUFhO2dCQUNiLEVBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFDO2FBQzFDO1NBQ0YsQ0FBQztJQUNKLENBQUM7O2dCQXhCRixRQUFRLFNBQUM7b0JBQ1IsWUFBWSxFQUFFO3dCQUNaLG1CQUFtQjt3QkFDbkIscUJBQXFCO3dCQUNyQixnQkFBZ0I7d0JBQ2hCLGVBQWU7cUJBQ2hCO29CQUNELE9BQU8sRUFBRSxFQUFFO29CQUNYLE9BQU8sRUFBRTt3QkFDUCxtQkFBbUI7d0JBQ25CLHFCQUFxQjt3QkFDckIsZ0JBQWdCO3dCQUNoQixlQUFlO3FCQUNoQjtpQkFDRjs7SUFXRCxvQkFBQztDQUFBLEFBekJELElBeUJDO1NBVlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDYXBpdGFsaXplRGlyZWN0aXZlfSBmcm9tICcuL2RpcmVjdGl2ZXMvY2FwaXRhbGl6ZS9jYXBpdGFsaXplLmRpcmVjdGl2ZSc7XG5pbXBvcnQge0xhdGluVG9HcmVla0RpcmVjdGl2ZX0gZnJvbSAnLi9kaXJlY3RpdmVzL2xhdGluLXRvLWdyZWVrL2xhdGluLXRvLWdyZWVrLmRpcmVjdGl2ZSc7XG5pbXBvcnQge051bWVyaWNEaXJlY3RpdmV9IGZyb20gJy4vZGlyZWN0aXZlcy9udW1lcmljL251bWVyaWMuZGlyZWN0aXZlJztcbmltcG9ydCB7TnVtUGFkRGlyZWN0aXZlfSBmcm9tICcuL2RpcmVjdGl2ZXMvbnVtcGFkL251bXBhZC5kaXJlY3RpdmUnO1xuaW1wb3J0IHtDb25maWdTZXJ2aWNlLCBDdXN0b21Db25maWd9IGZyb20gJy4vc2VydmljZXMvY29uZmlnLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBDYXBpdGFsaXplRGlyZWN0aXZlLFxuICAgIExhdGluVG9HcmVla0RpcmVjdGl2ZSxcbiAgICBOdW1lcmljRGlyZWN0aXZlLFxuICAgIE51bVBhZERpcmVjdGl2ZSxcbiAgXSxcbiAgaW1wb3J0czogW10sXG4gIGV4cG9ydHM6IFtcbiAgICBDYXBpdGFsaXplRGlyZWN0aXZlLFxuICAgIExhdGluVG9HcmVla0RpcmVjdGl2ZSxcbiAgICBOdW1lcmljRGlyZWN0aXZlLFxuICAgIE51bVBhZERpcmVjdGl2ZSxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBMc25MaWJzTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnPzogQ3VzdG9tQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBMc25MaWJzTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIENvbmZpZ1NlcnZpY2UsXG4gICAgICAgIHtwcm92aWRlOiBDdXN0b21Db25maWcsIHVzZVZhbHVlOiBjb25maWd9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIl19