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
export class LsnLibsModule {
    /**
     * @param {?=} config
     * @return {?}
     */
    static forRoot(config) {
        /** @type {?} */
        let moduleConfig = new CustomConfig();
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
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNuLWxpYnMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy8iLCJzb3VyY2VzIjpbImxpYi9sc24tbGlicy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBc0IsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDhDQUE4QyxDQUFDO0FBQ2pGLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNEQUFzRCxDQUFDO0FBQzNGLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBQ3hFLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUNyRSxPQUFPLEVBQUMsYUFBYSxFQUFFLFlBQVksRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBaUJ0RSxNQUFNLE9BQU8sYUFBYTs7Ozs7SUFDeEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFxQjs7WUFDOUIsWUFBWSxHQUFHLElBQUksWUFBWSxFQUFFO1FBQ3JDLElBQUksTUFBTSxFQUFFO1lBQ1YsWUFBWSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3BEO1FBQ0QsT0FBTztZQUNMLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFNBQVMsRUFBRTtnQkFDVCxhQUFhO2dCQUNiLEVBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFO2FBQ2pEO1NBQ0YsQ0FBQztJQUNKLENBQUM7OztZQTVCRixRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFO29CQUNaLG1CQUFtQjtvQkFDbkIscUJBQXFCO29CQUNyQixnQkFBZ0I7b0JBQ2hCLGVBQWU7aUJBQ2hCO2dCQUNELE9BQU8sRUFBRSxFQUFFO2dCQUNYLE9BQU8sRUFBRTtvQkFDUCxtQkFBbUI7b0JBQ25CLHFCQUFxQjtvQkFDckIsZ0JBQWdCO29CQUNoQixlQUFlO2lCQUNoQjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NhcGl0YWxpemVEaXJlY3RpdmV9IGZyb20gJy4vZGlyZWN0aXZlcy9jYXBpdGFsaXplL2NhcGl0YWxpemUuZGlyZWN0aXZlJztcbmltcG9ydCB7TGF0aW5Ub0dyZWVrRGlyZWN0aXZlfSBmcm9tICcuL2RpcmVjdGl2ZXMvbGF0aW4tdG8tZ3JlZWsvbGF0aW4tdG8tZ3JlZWsuZGlyZWN0aXZlJztcbmltcG9ydCB7TnVtZXJpY0RpcmVjdGl2ZX0gZnJvbSAnLi9kaXJlY3RpdmVzL251bWVyaWMvbnVtZXJpYy5kaXJlY3RpdmUnO1xuaW1wb3J0IHtOdW1QYWREaXJlY3RpdmV9IGZyb20gJy4vZGlyZWN0aXZlcy9udW1wYWQvbnVtcGFkLmRpcmVjdGl2ZSc7XG5pbXBvcnQge0NvbmZpZ1NlcnZpY2UsIEN1c3RvbUNvbmZpZ30gZnJvbSAnLi9zZXJ2aWNlcy9jb25maWcuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIENhcGl0YWxpemVEaXJlY3RpdmUsXG4gICAgTGF0aW5Ub0dyZWVrRGlyZWN0aXZlLFxuICAgIE51bWVyaWNEaXJlY3RpdmUsXG4gICAgTnVtUGFkRGlyZWN0aXZlLFxuICBdLFxuICBpbXBvcnRzOiBbXSxcbiAgZXhwb3J0czogW1xuICAgIENhcGl0YWxpemVEaXJlY3RpdmUsXG4gICAgTGF0aW5Ub0dyZWVrRGlyZWN0aXZlLFxuICAgIE51bWVyaWNEaXJlY3RpdmUsXG4gICAgTnVtUGFkRGlyZWN0aXZlLFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIExzbkxpYnNNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChjb25maWc/OiBDdXN0b21Db25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICBsZXQgbW9kdWxlQ29uZmlnID0gbmV3IEN1c3RvbUNvbmZpZygpO1xuICAgIGlmIChjb25maWcpIHtcbiAgICAgIG1vZHVsZUNvbmZpZyA9IE9iamVjdC5hc3NpZ24obW9kdWxlQ29uZmlnLCBjb25maWcpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IExzbkxpYnNNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgQ29uZmlnU2VydmljZSxcbiAgICAgICAge3Byb3ZpZGU6IEN1c3RvbUNvbmZpZywgdXNlVmFsdWU6IG1vZHVsZUNvbmZpZyB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIl19