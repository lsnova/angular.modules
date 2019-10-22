/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { LsnNumericModule } from './directives/numeric/numeric.module';
import { LsnNumpadModule } from './directives/numpad/numpad.module';
import { LsnLatinToGreekModule } from './directives/latin-to-greek/latin-to-greek.module';
import { LsnCapitalizeModule } from './directives/capitalize/capitalize.module';
import { LsnMatSelectModule } from './components/mat-select/mat-select.module';
import { LsnScrollSpyModule } from './directives/scroll-spy/scroll-spy.module';
import { FormsModule } from '@angular/forms';
import { LsnCrossTabModule } from './services/lsn-cross-tab/lsn-cross-tab.module';
import { LsnCookieModule } from './services/lsn-cookie/lsn-cookie.module';
var LsnLibsModule = /** @class */ (function () {
    function LsnLibsModule() {
    }
    LsnLibsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [],
                    imports: [
                        FormsModule,
                        LsnCapitalizeModule,
                        LsnLatinToGreekModule,
                        LsnNumericModule.forRoot({
                            default: {
                                decimals: '.',
                                precision: 4,
                            },
                            custom: {
                                currency: {
                                    decimals: ',',
                                    thousands: ' ',
                                    precision: 2,
                                }
                            }
                        }),
                        LsnNumpadModule,
                        LsnMatSelectModule,
                        LsnCookieModule,
                        LsnCrossTabModule,
                        LsnScrollSpyModule
                    ],
                    exports: [
                        LsnCapitalizeModule,
                        LsnLatinToGreekModule,
                        LsnNumericModule,
                        LsnNumpadModule,
                        LsnMatSelectModule,
                        LsnCookieModule,
                        LsnCrossTabModule,
                        LsnScrollSpyModule
                    ]
                },] }
    ];
    return LsnLibsModule;
}());
export { LsnLibsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNuLWxpYnMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy8iLCJzb3VyY2VzIjpbImxpYi9sc24tbGlicy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDckUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBQ2xFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLG1EQUFtRCxDQUFDO0FBQ3hGLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDJDQUEyQyxDQUFDO0FBQzlFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLDJDQUEyQyxDQUFDO0FBQzdFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLDJDQUEyQyxDQUFDO0FBQzdFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSwrQ0FBK0MsQ0FBQztBQUNoRixPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFFeEU7SUFBQTtJQXFDQSxDQUFDOztnQkFyQ0EsUUFBUSxTQUFDO29CQUNSLFlBQVksRUFBRSxFQUFFO29CQUNoQixPQUFPLEVBQUU7d0JBQ1AsV0FBVzt3QkFDWCxtQkFBbUI7d0JBQ25CLHFCQUFxQjt3QkFDckIsZ0JBQWdCLENBQUMsT0FBTyxDQUFDOzRCQUN2QixPQUFPLEVBQUU7Z0NBQ1AsUUFBUSxFQUFFLEdBQUc7Z0NBQ2IsU0FBUyxFQUFFLENBQUM7NkJBQ2I7NEJBQ0QsTUFBTSxFQUFFO2dDQUNOLFFBQVEsRUFBRTtvQ0FDUixRQUFRLEVBQUUsR0FBRztvQ0FDYixTQUFTLEVBQUUsR0FBRztvQ0FDZCxTQUFTLEVBQUUsQ0FBQztpQ0FDYjs2QkFDRjt5QkFDRixDQUFDO3dCQUNGLGVBQWU7d0JBQ2Ysa0JBQWtCO3dCQUNsQixlQUFlO3dCQUNmLGlCQUFpQjt3QkFDakIsa0JBQWtCO3FCQUNuQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsbUJBQW1CO3dCQUNuQixxQkFBcUI7d0JBQ3JCLGdCQUFnQjt3QkFDaEIsZUFBZTt3QkFDZixrQkFBa0I7d0JBQ2xCLGVBQWU7d0JBQ2YsaUJBQWlCO3dCQUNqQixrQkFBa0I7cUJBQ25CO2lCQUNGOztJQUVELG9CQUFDO0NBQUEsQUFyQ0QsSUFxQ0M7U0FEWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0xzbk51bWVyaWNNb2R1bGV9IGZyb20gJy4vZGlyZWN0aXZlcy9udW1lcmljL251bWVyaWMubW9kdWxlJztcbmltcG9ydCB7THNuTnVtcGFkTW9kdWxlfSBmcm9tICcuL2RpcmVjdGl2ZXMvbnVtcGFkL251bXBhZC5tb2R1bGUnO1xuaW1wb3J0IHtMc25MYXRpblRvR3JlZWtNb2R1bGV9IGZyb20gJy4vZGlyZWN0aXZlcy9sYXRpbi10by1ncmVlay9sYXRpbi10by1ncmVlay5tb2R1bGUnO1xuaW1wb3J0IHtMc25DYXBpdGFsaXplTW9kdWxlfSBmcm9tICcuL2RpcmVjdGl2ZXMvY2FwaXRhbGl6ZS9jYXBpdGFsaXplLm1vZHVsZSc7XG5pbXBvcnQge0xzbk1hdFNlbGVjdE1vZHVsZX0gZnJvbSAnLi9jb21wb25lbnRzL21hdC1zZWxlY3QvbWF0LXNlbGVjdC5tb2R1bGUnO1xuaW1wb3J0IHtMc25TY3JvbGxTcHlNb2R1bGV9IGZyb20gJy4vZGlyZWN0aXZlcy9zY3JvbGwtc3B5L3Njcm9sbC1zcHkubW9kdWxlJztcbmltcG9ydCB7Rm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7THNuQ3Jvc3NUYWJNb2R1bGV9IGZyb20gJy4vc2VydmljZXMvbHNuLWNyb3NzLXRhYi9sc24tY3Jvc3MtdGFiLm1vZHVsZSc7XG5pbXBvcnQge0xzbkNvb2tpZU1vZHVsZX0gZnJvbSAnLi9zZXJ2aWNlcy9sc24tY29va2llL2xzbi1jb29raWUubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXSxcbiAgaW1wb3J0czogW1xuICAgIEZvcm1zTW9kdWxlLFxuICAgIExzbkNhcGl0YWxpemVNb2R1bGUsXG4gICAgTHNuTGF0aW5Ub0dyZWVrTW9kdWxlLFxuICAgIExzbk51bWVyaWNNb2R1bGUuZm9yUm9vdCh7XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGRlY2ltYWxzOiAnLicsXG4gICAgICAgIHByZWNpc2lvbjogNCxcbiAgICAgIH0sXG4gICAgICBjdXN0b206IHtcbiAgICAgICAgY3VycmVuY3k6IHtcbiAgICAgICAgICBkZWNpbWFsczogJywnLFxuICAgICAgICAgIHRob3VzYW5kczogJyAnLFxuICAgICAgICAgIHByZWNpc2lvbjogMixcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pLFxuICAgIExzbk51bXBhZE1vZHVsZSxcbiAgICBMc25NYXRTZWxlY3RNb2R1bGUsXG4gICAgTHNuQ29va2llTW9kdWxlLFxuICAgIExzbkNyb3NzVGFiTW9kdWxlLFxuICAgIExzblNjcm9sbFNweU1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTHNuQ2FwaXRhbGl6ZU1vZHVsZSxcbiAgICBMc25MYXRpblRvR3JlZWtNb2R1bGUsXG4gICAgTHNuTnVtZXJpY01vZHVsZSxcbiAgICBMc25OdW1wYWRNb2R1bGUsXG4gICAgTHNuTWF0U2VsZWN0TW9kdWxlLFxuICAgIExzbkNvb2tpZU1vZHVsZSxcbiAgICBMc25Dcm9zc1RhYk1vZHVsZSxcbiAgICBMc25TY3JvbGxTcHlNb2R1bGVcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBMc25MaWJzTW9kdWxlIHtcbn1cbiJdfQ==