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
        /** @type {?} */
        var moduleConfig = new CustomConfig();
        if (config) {
            moduleConfig = Object.assign(moduleConfig, config);
        }
        return {
            ngModule: LsnLibsModule,
            providers: [
                ConfigService,
                { provide: CustomConfig, useValue: moduleConfig }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNuLWxpYnMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy8iLCJzb3VyY2VzIjpbImxpYi9sc24tbGlicy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBc0IsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDhDQUE4QyxDQUFDO0FBQ2pGLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNEQUFzRCxDQUFDO0FBQzNGLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBQ3hFLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUNyRSxPQUFPLEVBQUMsYUFBYSxFQUFFLFlBQVksRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRXRFO0lBQUE7SUE2QkEsQ0FBQzs7Ozs7SUFiUSxxQkFBTzs7OztJQUFkLFVBQWUsTUFBcUI7O1lBQzlCLFlBQVksR0FBRyxJQUFJLFlBQVksRUFBRTtRQUNyQyxJQUFJLE1BQU0sRUFBRTtZQUNWLFlBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztTQUNwRDtRQUNELE9BQU87WUFDTCxRQUFRLEVBQUUsYUFBYTtZQUN2QixTQUFTLEVBQUU7Z0JBQ1QsYUFBYTtnQkFDYixFQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRTthQUNqRDtTQUNGLENBQUM7SUFDSixDQUFDOztnQkE1QkYsUUFBUSxTQUFDO29CQUNSLFlBQVksRUFBRTt3QkFDWixtQkFBbUI7d0JBQ25CLHFCQUFxQjt3QkFDckIsZ0JBQWdCO3dCQUNoQixlQUFlO3FCQUNoQjtvQkFDRCxPQUFPLEVBQUUsRUFBRTtvQkFDWCxPQUFPLEVBQUU7d0JBQ1AsbUJBQW1CO3dCQUNuQixxQkFBcUI7d0JBQ3JCLGdCQUFnQjt3QkFDaEIsZUFBZTtxQkFDaEI7aUJBQ0Y7O0lBZUQsb0JBQUM7Q0FBQSxBQTdCRCxJQTZCQztTQWRZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q2FwaXRhbGl6ZURpcmVjdGl2ZX0gZnJvbSAnLi9kaXJlY3RpdmVzL2NhcGl0YWxpemUvY2FwaXRhbGl6ZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHtMYXRpblRvR3JlZWtEaXJlY3RpdmV9IGZyb20gJy4vZGlyZWN0aXZlcy9sYXRpbi10by1ncmVlay9sYXRpbi10by1ncmVlay5kaXJlY3RpdmUnO1xuaW1wb3J0IHtOdW1lcmljRGlyZWN0aXZlfSBmcm9tICcuL2RpcmVjdGl2ZXMvbnVtZXJpYy9udW1lcmljLmRpcmVjdGl2ZSc7XG5pbXBvcnQge051bVBhZERpcmVjdGl2ZX0gZnJvbSAnLi9kaXJlY3RpdmVzL251bXBhZC9udW1wYWQuZGlyZWN0aXZlJztcbmltcG9ydCB7Q29uZmlnU2VydmljZSwgQ3VzdG9tQ29uZmlnfSBmcm9tICcuL3NlcnZpY2VzL2NvbmZpZy5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQ2FwaXRhbGl6ZURpcmVjdGl2ZSxcbiAgICBMYXRpblRvR3JlZWtEaXJlY3RpdmUsXG4gICAgTnVtZXJpY0RpcmVjdGl2ZSxcbiAgICBOdW1QYWREaXJlY3RpdmUsXG4gIF0sXG4gIGltcG9ydHM6IFtdLFxuICBleHBvcnRzOiBbXG4gICAgQ2FwaXRhbGl6ZURpcmVjdGl2ZSxcbiAgICBMYXRpblRvR3JlZWtEaXJlY3RpdmUsXG4gICAgTnVtZXJpY0RpcmVjdGl2ZSxcbiAgICBOdW1QYWREaXJlY3RpdmUsXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTHNuTGlic01vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZz86IEN1c3RvbUNvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIGxldCBtb2R1bGVDb25maWcgPSBuZXcgQ3VzdG9tQ29uZmlnKCk7XG4gICAgaWYgKGNvbmZpZykge1xuICAgICAgbW9kdWxlQ29uZmlnID0gT2JqZWN0LmFzc2lnbihtb2R1bGVDb25maWcsIGNvbmZpZyk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTHNuTGlic01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBDb25maWdTZXJ2aWNlLFxuICAgICAgICB7cHJvdmlkZTogQ3VzdG9tQ29uZmlnLCB1c2VWYWx1ZTogbW9kdWxlQ29uZmlnIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXX0=