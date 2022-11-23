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
/** @nocollapse */ LsnLibsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: LsnLibsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ LsnLibsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.12", ngImport: i0, type: LsnLibsModule, imports: [FormsModule,
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
        LsnScrollSpyModule] });
/** @nocollapse */ LsnLibsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: LsnLibsModule, imports: [FormsModule,
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
        LsnScrollSpyModule, LsnCapitalizeModule,
        LsnLatinToGreekModule,
        LsnNumericModule,
        LsnNumpadModule,
        LsnCookieModule,
        LsnCrossTabModule,
        LsnScrollSpyModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: LsnLibsModule, decorators: [{
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
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNuLWxpYnMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbHNuLWxpYnMvc3JjL2xpYi9sc24tbGlicy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUNyRSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDbEUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sbURBQW1ELENBQUM7QUFDeEYsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sMkNBQTJDLENBQUM7QUFDOUUsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sMkNBQTJDLENBQUM7QUFDN0UsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLCtDQUErQyxDQUFDO0FBQ2hGLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQzs7O0FBb0N4RSxNQUFNLE9BQU8sYUFBYTs7OEhBQWIsYUFBYTsrSEFBYixhQUFhLFlBL0J0QixXQUFXO1FBQ1gsbUJBQW1CO1FBQ25CLHFCQUFxQix1QkFjckIsZUFBZTtRQUNmLGVBQWU7UUFDZixpQkFBaUI7UUFDakIsa0JBQWtCLGFBR2xCLG1CQUFtQjtRQUNuQixxQkFBcUI7UUFDckIsZ0JBQWdCO1FBQ2hCLGVBQWU7UUFDZixlQUFlO1FBQ2YsaUJBQWlCO1FBQ2pCLGtCQUFrQjsrSEFHVCxhQUFhLFlBL0J0QixXQUFXO1FBQ1gsbUJBQW1CO1FBQ25CLHFCQUFxQjtRQUNyQixnQkFBZ0IsQ0FBQyxPQUFPLENBQUM7WUFDdkIsT0FBTyxFQUFFO2dCQUNQLFFBQVEsRUFBRSxHQUFHO2dCQUNiLFNBQVMsRUFBRSxDQUFDO2FBQ2I7WUFDRCxNQUFNLEVBQUU7Z0JBQ04sUUFBUSxFQUFFO29CQUNSLFFBQVEsRUFBRSxHQUFHO29CQUNiLFNBQVMsRUFBRSxHQUFHO29CQUNkLFNBQVMsRUFBRSxDQUFDO2lCQUNiO2FBQ0Y7U0FDRixDQUFDO1FBQ0YsZUFBZTtRQUNmLGVBQWU7UUFDZixpQkFBaUI7UUFDakIsa0JBQWtCLEVBR2xCLG1CQUFtQjtRQUNuQixxQkFBcUI7UUFDckIsZ0JBQWdCO1FBQ2hCLGVBQWU7UUFDZixlQUFlO1FBQ2YsaUJBQWlCO1FBQ2pCLGtCQUFrQjs0RkFHVCxhQUFhO2tCQWxDekIsUUFBUTttQkFBQztvQkFDUixZQUFZLEVBQUUsRUFBRTtvQkFDaEIsT0FBTyxFQUFFO3dCQUNQLFdBQVc7d0JBQ1gsbUJBQW1CO3dCQUNuQixxQkFBcUI7d0JBQ3JCLGdCQUFnQixDQUFDLE9BQU8sQ0FBQzs0QkFDdkIsT0FBTyxFQUFFO2dDQUNQLFFBQVEsRUFBRSxHQUFHO2dDQUNiLFNBQVMsRUFBRSxDQUFDOzZCQUNiOzRCQUNELE1BQU0sRUFBRTtnQ0FDTixRQUFRLEVBQUU7b0NBQ1IsUUFBUSxFQUFFLEdBQUc7b0NBQ2IsU0FBUyxFQUFFLEdBQUc7b0NBQ2QsU0FBUyxFQUFFLENBQUM7aUNBQ2I7NkJBQ0Y7eUJBQ0YsQ0FBQzt3QkFDRixlQUFlO3dCQUNmLGVBQWU7d0JBQ2YsaUJBQWlCO3dCQUNqQixrQkFBa0I7cUJBQ25CO29CQUNELE9BQU8sRUFBRTt3QkFDUCxtQkFBbUI7d0JBQ25CLHFCQUFxQjt3QkFDckIsZ0JBQWdCO3dCQUNoQixlQUFlO3dCQUNmLGVBQWU7d0JBQ2YsaUJBQWlCO3dCQUNqQixrQkFBa0I7cUJBQ25CO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0xzbk51bWVyaWNNb2R1bGV9IGZyb20gJy4vZGlyZWN0aXZlcy9udW1lcmljL251bWVyaWMubW9kdWxlJztcbmltcG9ydCB7THNuTnVtcGFkTW9kdWxlfSBmcm9tICcuL2RpcmVjdGl2ZXMvbnVtcGFkL251bXBhZC5tb2R1bGUnO1xuaW1wb3J0IHtMc25MYXRpblRvR3JlZWtNb2R1bGV9IGZyb20gJy4vZGlyZWN0aXZlcy9sYXRpbi10by1ncmVlay9sYXRpbi10by1ncmVlay5tb2R1bGUnO1xuaW1wb3J0IHtMc25DYXBpdGFsaXplTW9kdWxlfSBmcm9tICcuL2RpcmVjdGl2ZXMvY2FwaXRhbGl6ZS9jYXBpdGFsaXplLm1vZHVsZSc7XG5pbXBvcnQge0xzblNjcm9sbFNweU1vZHVsZX0gZnJvbSAnLi9kaXJlY3RpdmVzL3Njcm9sbC1zcHkvc2Nyb2xsLXNweS5tb2R1bGUnO1xuaW1wb3J0IHtGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtMc25Dcm9zc1RhYk1vZHVsZX0gZnJvbSAnLi9zZXJ2aWNlcy9sc24tY3Jvc3MtdGFiL2xzbi1jcm9zcy10YWIubW9kdWxlJztcbmltcG9ydCB7THNuQ29va2llTW9kdWxlfSBmcm9tICcuL3NlcnZpY2VzL2xzbi1jb29raWUvbHNuLWNvb2tpZS5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtdLFxuICBpbXBvcnRzOiBbXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgTHNuQ2FwaXRhbGl6ZU1vZHVsZSxcbiAgICBMc25MYXRpblRvR3JlZWtNb2R1bGUsXG4gICAgTHNuTnVtZXJpY01vZHVsZS5mb3JSb290KHtcbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgZGVjaW1hbHM6ICcuJyxcbiAgICAgICAgcHJlY2lzaW9uOiA0LFxuICAgICAgfSxcbiAgICAgIGN1c3RvbToge1xuICAgICAgICBjdXJyZW5jeToge1xuICAgICAgICAgIGRlY2ltYWxzOiAnLCcsXG4gICAgICAgICAgdGhvdXNhbmRzOiAnICcsXG4gICAgICAgICAgcHJlY2lzaW9uOiAyLFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSksXG4gICAgTHNuTnVtcGFkTW9kdWxlLFxuICAgIExzbkNvb2tpZU1vZHVsZSxcbiAgICBMc25Dcm9zc1RhYk1vZHVsZSxcbiAgICBMc25TY3JvbGxTcHlNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIExzbkNhcGl0YWxpemVNb2R1bGUsXG4gICAgTHNuTGF0aW5Ub0dyZWVrTW9kdWxlLFxuICAgIExzbk51bWVyaWNNb2R1bGUsXG4gICAgTHNuTnVtcGFkTW9kdWxlLFxuICAgIExzbkNvb2tpZU1vZHVsZSxcbiAgICBMc25Dcm9zc1RhYk1vZHVsZSxcbiAgICBMc25TY3JvbGxTcHlNb2R1bGVcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBMc25MaWJzTW9kdWxlIHtcbn1cbiJdfQ==