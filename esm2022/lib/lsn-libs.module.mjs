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
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: LsnLibsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    /** @nocollapse */ static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.2.14", ngImport: i0, type: LsnLibsModule, imports: [FormsModule,
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
            LsnScrollSpyModule] }); }
    /** @nocollapse */ static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: LsnLibsModule, imports: [FormsModule,
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
            LsnScrollSpyModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: LsnLibsModule, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNuLWxpYnMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbHNuLWxpYnMvc3JjL2xpYi9sc24tbGlicy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUNyRSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDbEUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sbURBQW1ELENBQUM7QUFDeEYsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sMkNBQTJDLENBQUM7QUFDOUUsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sMkNBQTJDLENBQUM7QUFDN0UsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLCtDQUErQyxDQUFDO0FBQ2hGLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQzs7O0FBb0N4RSxNQUFNLE9BQU8sYUFBYTtrSUFBYixhQUFhO21JQUFiLGFBQWEsWUEvQnRCLFdBQVc7WUFDWCxtQkFBbUI7WUFDbkIscUJBQXFCLHVCQWNyQixlQUFlO1lBQ2YsZUFBZTtZQUNmLGlCQUFpQjtZQUNqQixrQkFBa0IsYUFHbEIsbUJBQW1CO1lBQ25CLHFCQUFxQjtZQUNyQixnQkFBZ0I7WUFDaEIsZUFBZTtZQUNmLGVBQWU7WUFDZixpQkFBaUI7WUFDakIsa0JBQWtCO21JQUdULGFBQWEsWUEvQnRCLFdBQVc7WUFDWCxtQkFBbUI7WUFDbkIscUJBQXFCO1lBQ3JCLGdCQUFnQixDQUFDLE9BQU8sQ0FBQztnQkFDdkIsT0FBTyxFQUFFO29CQUNQLFFBQVEsRUFBRSxHQUFHO29CQUNiLFNBQVMsRUFBRSxDQUFDO2lCQUNiO2dCQUNELE1BQU0sRUFBRTtvQkFDTixRQUFRLEVBQUU7d0JBQ1IsUUFBUSxFQUFFLEdBQUc7d0JBQ2IsU0FBUyxFQUFFLEdBQUc7d0JBQ2QsU0FBUyxFQUFFLENBQUM7cUJBQ2I7aUJBQ0Y7YUFDRixDQUFDO1lBQ0YsZUFBZTtZQUNmLGVBQWU7WUFDZixpQkFBaUI7WUFDakIsa0JBQWtCLEVBR2xCLG1CQUFtQjtZQUNuQixxQkFBcUI7WUFDckIsZ0JBQWdCO1lBQ2hCLGVBQWU7WUFDZixlQUFlO1lBQ2YsaUJBQWlCO1lBQ2pCLGtCQUFrQjs7NEZBR1QsYUFBYTtrQkFsQ3pCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFLEVBQUU7b0JBQ2hCLE9BQU8sRUFBRTt3QkFDUCxXQUFXO3dCQUNYLG1CQUFtQjt3QkFDbkIscUJBQXFCO3dCQUNyQixnQkFBZ0IsQ0FBQyxPQUFPLENBQUM7NEJBQ3ZCLE9BQU8sRUFBRTtnQ0FDUCxRQUFRLEVBQUUsR0FBRztnQ0FDYixTQUFTLEVBQUUsQ0FBQzs2QkFDYjs0QkFDRCxNQUFNLEVBQUU7Z0NBQ04sUUFBUSxFQUFFO29DQUNSLFFBQVEsRUFBRSxHQUFHO29DQUNiLFNBQVMsRUFBRSxHQUFHO29DQUNkLFNBQVMsRUFBRSxDQUFDO2lDQUNiOzZCQUNGO3lCQUNGLENBQUM7d0JBQ0YsZUFBZTt3QkFDZixlQUFlO3dCQUNmLGlCQUFpQjt3QkFDakIsa0JBQWtCO3FCQUNuQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsbUJBQW1CO3dCQUNuQixxQkFBcUI7d0JBQ3JCLGdCQUFnQjt3QkFDaEIsZUFBZTt3QkFDZixlQUFlO3dCQUNmLGlCQUFpQjt3QkFDakIsa0JBQWtCO3FCQUNuQjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtMc25OdW1lcmljTW9kdWxlfSBmcm9tICcuL2RpcmVjdGl2ZXMvbnVtZXJpYy9udW1lcmljLm1vZHVsZSc7XG5pbXBvcnQge0xzbk51bXBhZE1vZHVsZX0gZnJvbSAnLi9kaXJlY3RpdmVzL251bXBhZC9udW1wYWQubW9kdWxlJztcbmltcG9ydCB7THNuTGF0aW5Ub0dyZWVrTW9kdWxlfSBmcm9tICcuL2RpcmVjdGl2ZXMvbGF0aW4tdG8tZ3JlZWsvbGF0aW4tdG8tZ3JlZWsubW9kdWxlJztcbmltcG9ydCB7THNuQ2FwaXRhbGl6ZU1vZHVsZX0gZnJvbSAnLi9kaXJlY3RpdmVzL2NhcGl0YWxpemUvY2FwaXRhbGl6ZS5tb2R1bGUnO1xuaW1wb3J0IHtMc25TY3JvbGxTcHlNb2R1bGV9IGZyb20gJy4vZGlyZWN0aXZlcy9zY3JvbGwtc3B5L3Njcm9sbC1zcHkubW9kdWxlJztcbmltcG9ydCB7Rm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7THNuQ3Jvc3NUYWJNb2R1bGV9IGZyb20gJy4vc2VydmljZXMvbHNuLWNyb3NzLXRhYi9sc24tY3Jvc3MtdGFiLm1vZHVsZSc7XG5pbXBvcnQge0xzbkNvb2tpZU1vZHVsZX0gZnJvbSAnLi9zZXJ2aWNlcy9sc24tY29va2llL2xzbi1jb29raWUubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXSxcbiAgaW1wb3J0czogW1xuICAgIEZvcm1zTW9kdWxlLFxuICAgIExzbkNhcGl0YWxpemVNb2R1bGUsXG4gICAgTHNuTGF0aW5Ub0dyZWVrTW9kdWxlLFxuICAgIExzbk51bWVyaWNNb2R1bGUuZm9yUm9vdCh7XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGRlY2ltYWxzOiAnLicsXG4gICAgICAgIHByZWNpc2lvbjogNCxcbiAgICAgIH0sXG4gICAgICBjdXN0b206IHtcbiAgICAgICAgY3VycmVuY3k6IHtcbiAgICAgICAgICBkZWNpbWFsczogJywnLFxuICAgICAgICAgIHRob3VzYW5kczogJyAnLFxuICAgICAgICAgIHByZWNpc2lvbjogMixcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pLFxuICAgIExzbk51bXBhZE1vZHVsZSxcbiAgICBMc25Db29raWVNb2R1bGUsXG4gICAgTHNuQ3Jvc3NUYWJNb2R1bGUsXG4gICAgTHNuU2Nyb2xsU3B5TW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBMc25DYXBpdGFsaXplTW9kdWxlLFxuICAgIExzbkxhdGluVG9HcmVla01vZHVsZSxcbiAgICBMc25OdW1lcmljTW9kdWxlLFxuICAgIExzbk51bXBhZE1vZHVsZSxcbiAgICBMc25Db29raWVNb2R1bGUsXG4gICAgTHNuQ3Jvc3NUYWJNb2R1bGUsXG4gICAgTHNuU2Nyb2xsU3B5TW9kdWxlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTHNuTGlic01vZHVsZSB7XG59XG4iXX0=