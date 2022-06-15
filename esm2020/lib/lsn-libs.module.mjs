import { NgModule } from '@angular/core';
import { LsnNumericModule } from './directives/numeric/numeric.module';
import { LsnNumpadModule } from './directives/numpad/numpad.module';
import { LsnLatinToGreekModule } from './directives/latin-to-greek/latin-to-greek.module';
import { LsnCapitalizeModule } from './directives/capitalize/capitalize.module';
import { LsnScrollSpyModule } from './directives/scroll-spy/scroll-spy.module';
import { FormsModule } from '@angular/forms';
import { LsnCrossTabModule } from './services/lsn-cross-tab/lsn-cross-tab.module';
import { LsnCookieModule } from './services/lsn-cookie/lsn-cookie.module';
import * as i0 from "@angular/core";
import * as i1 from "./directives/numeric/numeric.module";
export class LsnLibsModule {
}
/** @nocollapse */ LsnLibsModule.ɵfac = function LsnLibsModule_Factory(t) { return new (t || LsnLibsModule)(); };
/** @nocollapse */ LsnLibsModule.ɵmod = /** @pureOrBreakMyCode */ i0.ɵɵdefineNgModule({ type: LsnLibsModule });
/** @nocollapse */ LsnLibsModule.ɵinj = /** @pureOrBreakMyCode */ i0.ɵɵdefineInjector({ imports: [[
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
            LsnCookieModule,
            LsnCrossTabModule,
            LsnScrollSpyModule
        ], LsnCapitalizeModule,
        LsnLatinToGreekModule,
        LsnNumericModule,
        LsnNumpadModule,
        LsnCookieModule,
        LsnCrossTabModule,
        LsnScrollSpyModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LsnLibsModule, [{
        type: NgModule,
        args: [{
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
                    LsnCookieModule,
                    LsnCrossTabModule,
                    LsnScrollSpyModule
                ],
                exports: [
                    LsnCapitalizeModule,
                    LsnLatinToGreekModule,
                    LsnNumericModule,
                    LsnNumpadModule,
                    LsnCookieModule,
                    LsnCrossTabModule,
                    LsnScrollSpyModule
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(LsnLibsModule, { imports: [FormsModule,
        LsnCapitalizeModule,
        LsnLatinToGreekModule, i1.LsnNumericModule, LsnNumpadModule,
        LsnCookieModule,
        LsnCrossTabModule,
        LsnScrollSpyModule], exports: [LsnCapitalizeModule,
        LsnLatinToGreekModule,
        LsnNumericModule,
        LsnNumpadModule,
        LsnCookieModule,
        LsnCrossTabModule,
        LsnScrollSpyModule] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNuLWxpYnMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbHNuLWxpYnMvc3JjL2xpYi9sc24tbGlicy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUNyRSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDbEUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sbURBQW1ELENBQUM7QUFDeEYsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sMkNBQTJDLENBQUM7QUFDOUUsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sMkNBQTJDLENBQUM7QUFDN0UsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLCtDQUErQyxDQUFDO0FBQ2hGLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQzs7O0FBb0N4RSxNQUFNLE9BQU8sYUFBYTs7NkZBQWIsYUFBYTs4RkFBYixhQUFhO2tHQWhDZjtZQUNQLFdBQVc7WUFDWCxtQkFBbUI7WUFDbkIscUJBQXFCO1lBQ3JCLGdCQUFnQixDQUFDLE9BQU8sQ0FBQztnQkFDdkIsT0FBTyxFQUFFO29CQUNQLFFBQVEsRUFBRSxHQUFHO29CQUNiLFNBQVMsRUFBRSxDQUFDO2lCQUNiO2dCQUNELE1BQU0sRUFBRTtvQkFDTixRQUFRLEVBQUU7d0JBQ1IsUUFBUSxFQUFFLEdBQUc7d0JBQ2IsU0FBUyxFQUFFLEdBQUc7d0JBQ2QsU0FBUyxFQUFFLENBQUM7cUJBQ2I7aUJBQ0Y7YUFDRixDQUFDO1lBQ0YsZUFBZTtZQUNmLGVBQWU7WUFDZixpQkFBaUI7WUFDakIsa0JBQWtCO1NBQ25CLEVBRUMsbUJBQW1CO1FBQ25CLHFCQUFxQjtRQUNyQixnQkFBZ0I7UUFDaEIsZUFBZTtRQUNmLGVBQWU7UUFDZixpQkFBaUI7UUFDakIsa0JBQWtCO3VGQUdULGFBQWE7Y0FsQ3pCLFFBQVE7ZUFBQztnQkFDUixZQUFZLEVBQUUsRUFBRTtnQkFDaEIsT0FBTyxFQUFFO29CQUNQLFdBQVc7b0JBQ1gsbUJBQW1CO29CQUNuQixxQkFBcUI7b0JBQ3JCLGdCQUFnQixDQUFDLE9BQU8sQ0FBQzt3QkFDdkIsT0FBTyxFQUFFOzRCQUNQLFFBQVEsRUFBRSxHQUFHOzRCQUNiLFNBQVMsRUFBRSxDQUFDO3lCQUNiO3dCQUNELE1BQU0sRUFBRTs0QkFDTixRQUFRLEVBQUU7Z0NBQ1IsUUFBUSxFQUFFLEdBQUc7Z0NBQ2IsU0FBUyxFQUFFLEdBQUc7Z0NBQ2QsU0FBUyxFQUFFLENBQUM7NkJBQ2I7eUJBQ0Y7cUJBQ0YsQ0FBQztvQkFDRixlQUFlO29CQUNmLGVBQWU7b0JBQ2YsaUJBQWlCO29CQUNqQixrQkFBa0I7aUJBQ25CO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxtQkFBbUI7b0JBQ25CLHFCQUFxQjtvQkFDckIsZ0JBQWdCO29CQUNoQixlQUFlO29CQUNmLGVBQWU7b0JBQ2YsaUJBQWlCO29CQUNqQixrQkFBa0I7aUJBQ25CO2FBQ0Y7O3dGQUNZLGFBQWEsY0EvQnRCLFdBQVc7UUFDWCxtQkFBbUI7UUFDbkIscUJBQXFCLHVCQWNyQixlQUFlO1FBQ2YsZUFBZTtRQUNmLGlCQUFpQjtRQUNqQixrQkFBa0IsYUFHbEIsbUJBQW1CO1FBQ25CLHFCQUFxQjtRQUNyQixnQkFBZ0I7UUFDaEIsZUFBZTtRQUNmLGVBQWU7UUFDZixpQkFBaUI7UUFDakIsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0xzbk51bWVyaWNNb2R1bGV9IGZyb20gJy4vZGlyZWN0aXZlcy9udW1lcmljL251bWVyaWMubW9kdWxlJztcbmltcG9ydCB7THNuTnVtcGFkTW9kdWxlfSBmcm9tICcuL2RpcmVjdGl2ZXMvbnVtcGFkL251bXBhZC5tb2R1bGUnO1xuaW1wb3J0IHtMc25MYXRpblRvR3JlZWtNb2R1bGV9IGZyb20gJy4vZGlyZWN0aXZlcy9sYXRpbi10by1ncmVlay9sYXRpbi10by1ncmVlay5tb2R1bGUnO1xuaW1wb3J0IHtMc25DYXBpdGFsaXplTW9kdWxlfSBmcm9tICcuL2RpcmVjdGl2ZXMvY2FwaXRhbGl6ZS9jYXBpdGFsaXplLm1vZHVsZSc7XG5pbXBvcnQge0xzblNjcm9sbFNweU1vZHVsZX0gZnJvbSAnLi9kaXJlY3RpdmVzL3Njcm9sbC1zcHkvc2Nyb2xsLXNweS5tb2R1bGUnO1xuaW1wb3J0IHtGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtMc25Dcm9zc1RhYk1vZHVsZX0gZnJvbSAnLi9zZXJ2aWNlcy9sc24tY3Jvc3MtdGFiL2xzbi1jcm9zcy10YWIubW9kdWxlJztcbmltcG9ydCB7THNuQ29va2llTW9kdWxlfSBmcm9tICcuL3NlcnZpY2VzL2xzbi1jb29raWUvbHNuLWNvb2tpZS5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtdLFxuICBpbXBvcnRzOiBbXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgTHNuQ2FwaXRhbGl6ZU1vZHVsZSxcbiAgICBMc25MYXRpblRvR3JlZWtNb2R1bGUsXG4gICAgTHNuTnVtZXJpY01vZHVsZS5mb3JSb290KHtcbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgZGVjaW1hbHM6ICcuJyxcbiAgICAgICAgcHJlY2lzaW9uOiA0LFxuICAgICAgfSxcbiAgICAgIGN1c3RvbToge1xuICAgICAgICBjdXJyZW5jeToge1xuICAgICAgICAgIGRlY2ltYWxzOiAnLCcsXG4gICAgICAgICAgdGhvdXNhbmRzOiAnICcsXG4gICAgICAgICAgcHJlY2lzaW9uOiAyLFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSksXG4gICAgTHNuTnVtcGFkTW9kdWxlLFxuICAgIExzbkNvb2tpZU1vZHVsZSxcbiAgICBMc25Dcm9zc1RhYk1vZHVsZSxcbiAgICBMc25TY3JvbGxTcHlNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIExzbkNhcGl0YWxpemVNb2R1bGUsXG4gICAgTHNuTGF0aW5Ub0dyZWVrTW9kdWxlLFxuICAgIExzbk51bWVyaWNNb2R1bGUsXG4gICAgTHNuTnVtcGFkTW9kdWxlLFxuICAgIExzbkNvb2tpZU1vZHVsZSxcbiAgICBMc25Dcm9zc1RhYk1vZHVsZSxcbiAgICBMc25TY3JvbGxTcHlNb2R1bGVcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBMc25MaWJzTW9kdWxlIHtcbn1cbiJdfQ==