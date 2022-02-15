import { NgModule } from '@angular/core';
import { LsnNumericModule } from './directives/numeric/numeric.module';
import { LsnNumpadModule } from './directives/numpad/numpad.module';
import { LsnLatinToGreekModule } from './directives/latin-to-greek/latin-to-greek.module';
import { LsnCapitalizeModule } from './directives/capitalize/capitalize.module';
import { LsnScrollSpyModule } from './directives/scroll-spy/scroll-spy.module';
import { FormsModule } from '@angular/forms';
import { LsnCrossTabModule } from './services/lsn-cross-tab/lsn-cross-tab.module';
import { LsnCookieModule } from './services/lsn-cookie/lsn-cookie.module';
export class LsnLibsModule {
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
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNuLWxpYnMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbHNuLWxpYnMvc3JjL2xpYi9sc24tbGlicy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUNyRSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDbEUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sbURBQW1ELENBQUM7QUFDeEYsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sMkNBQTJDLENBQUM7QUFDOUUsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sMkNBQTJDLENBQUM7QUFDN0UsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLCtDQUErQyxDQUFDO0FBQ2hGLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQW9DeEUsTUFBTSxPQUFPLGFBQWE7OztZQWxDekIsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRSxFQUFFO2dCQUNoQixPQUFPLEVBQUU7b0JBQ1AsV0FBVztvQkFDWCxtQkFBbUI7b0JBQ25CLHFCQUFxQjtvQkFDckIsZ0JBQWdCLENBQUMsT0FBTyxDQUFDO3dCQUN2QixPQUFPLEVBQUU7NEJBQ1AsUUFBUSxFQUFFLEdBQUc7NEJBQ2IsU0FBUyxFQUFFLENBQUM7eUJBQ2I7d0JBQ0QsTUFBTSxFQUFFOzRCQUNOLFFBQVEsRUFBRTtnQ0FDUixRQUFRLEVBQUUsR0FBRztnQ0FDYixTQUFTLEVBQUUsR0FBRztnQ0FDZCxTQUFTLEVBQUUsQ0FBQzs2QkFDYjt5QkFDRjtxQkFDRixDQUFDO29CQUNGLGVBQWU7b0JBQ2YsZUFBZTtvQkFDZixpQkFBaUI7b0JBQ2pCLGtCQUFrQjtpQkFDbkI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLG1CQUFtQjtvQkFDbkIscUJBQXFCO29CQUNyQixnQkFBZ0I7b0JBQ2hCLGVBQWU7b0JBQ2YsZUFBZTtvQkFDZixpQkFBaUI7b0JBQ2pCLGtCQUFrQjtpQkFDbkI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtMc25OdW1lcmljTW9kdWxlfSBmcm9tICcuL2RpcmVjdGl2ZXMvbnVtZXJpYy9udW1lcmljLm1vZHVsZSc7XG5pbXBvcnQge0xzbk51bXBhZE1vZHVsZX0gZnJvbSAnLi9kaXJlY3RpdmVzL251bXBhZC9udW1wYWQubW9kdWxlJztcbmltcG9ydCB7THNuTGF0aW5Ub0dyZWVrTW9kdWxlfSBmcm9tICcuL2RpcmVjdGl2ZXMvbGF0aW4tdG8tZ3JlZWsvbGF0aW4tdG8tZ3JlZWsubW9kdWxlJztcbmltcG9ydCB7THNuQ2FwaXRhbGl6ZU1vZHVsZX0gZnJvbSAnLi9kaXJlY3RpdmVzL2NhcGl0YWxpemUvY2FwaXRhbGl6ZS5tb2R1bGUnO1xuaW1wb3J0IHtMc25TY3JvbGxTcHlNb2R1bGV9IGZyb20gJy4vZGlyZWN0aXZlcy9zY3JvbGwtc3B5L3Njcm9sbC1zcHkubW9kdWxlJztcbmltcG9ydCB7Rm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7THNuQ3Jvc3NUYWJNb2R1bGV9IGZyb20gJy4vc2VydmljZXMvbHNuLWNyb3NzLXRhYi9sc24tY3Jvc3MtdGFiLm1vZHVsZSc7XG5pbXBvcnQge0xzbkNvb2tpZU1vZHVsZX0gZnJvbSAnLi9zZXJ2aWNlcy9sc24tY29va2llL2xzbi1jb29raWUubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXSxcbiAgaW1wb3J0czogW1xuICAgIEZvcm1zTW9kdWxlLFxuICAgIExzbkNhcGl0YWxpemVNb2R1bGUsXG4gICAgTHNuTGF0aW5Ub0dyZWVrTW9kdWxlLFxuICAgIExzbk51bWVyaWNNb2R1bGUuZm9yUm9vdCh7XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGRlY2ltYWxzOiAnLicsXG4gICAgICAgIHByZWNpc2lvbjogNCxcbiAgICAgIH0sXG4gICAgICBjdXN0b206IHtcbiAgICAgICAgY3VycmVuY3k6IHtcbiAgICAgICAgICBkZWNpbWFsczogJywnLFxuICAgICAgICAgIHRob3VzYW5kczogJyAnLFxuICAgICAgICAgIHByZWNpc2lvbjogMixcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pLFxuICAgIExzbk51bXBhZE1vZHVsZSxcbiAgICBMc25Db29raWVNb2R1bGUsXG4gICAgTHNuQ3Jvc3NUYWJNb2R1bGUsXG4gICAgTHNuU2Nyb2xsU3B5TW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBMc25DYXBpdGFsaXplTW9kdWxlLFxuICAgIExzbkxhdGluVG9HcmVla01vZHVsZSxcbiAgICBMc25OdW1lcmljTW9kdWxlLFxuICAgIExzbk51bXBhZE1vZHVsZSxcbiAgICBMc25Db29raWVNb2R1bGUsXG4gICAgTHNuQ3Jvc3NUYWJNb2R1bGUsXG4gICAgTHNuU2Nyb2xsU3B5TW9kdWxlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTHNuTGlic01vZHVsZSB7XG59XG4iXX0=