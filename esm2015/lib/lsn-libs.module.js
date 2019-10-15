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
import { LsnScrollSpyModule } from './directives/scroll-spy';
import { FormsModule } from '@angular/forms';
import { LsnCookieModule } from './services/lsn-cookie/lsn-cookie.module';
import { LsnCrossTabModule } from './services/lsn-cross-tab/lsn-cross-tab.module';
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
                    LsnMatSelectModule,
                    LsnScrollSpyModule
                ],
                exports: [
                    LsnCapitalizeModule,
                    LsnLatinToGreekModule,
                    LsnNumericModule,
                    LsnNumpadModule,
                    LsnMatSelectModule,
                    LsnScrollSpyModule,
                    LsnCookieModule,
                    LsnCrossTabModule
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNuLWxpYnMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy8iLCJzb3VyY2VzIjpbImxpYi9sc24tbGlicy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDckUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBQ2xFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLG1EQUFtRCxDQUFDO0FBQ3hGLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDJDQUEyQyxDQUFDO0FBQzlFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLDJDQUEyQyxDQUFDO0FBQzdFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzNELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFDeEUsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sK0NBQStDLENBQUM7QUFvQ2hGLE1BQU0sT0FBTyxhQUFhOzs7WUFsQ3pCLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUUsRUFBRTtnQkFDaEIsT0FBTyxFQUFFO29CQUNQLFdBQVc7b0JBQ1gsbUJBQW1CO29CQUNuQixxQkFBcUI7b0JBQ3JCLGdCQUFnQixDQUFDLE9BQU8sQ0FBQzt3QkFDdkIsT0FBTyxFQUFFOzRCQUNQLFFBQVEsRUFBRSxHQUFHOzRCQUNiLFNBQVMsRUFBRSxDQUFDO3lCQUNiO3dCQUNELE1BQU0sRUFBRTs0QkFDTixRQUFRLEVBQUU7Z0NBQ1IsUUFBUSxFQUFFLEdBQUc7Z0NBQ2IsU0FBUyxFQUFFLEdBQUc7Z0NBQ2QsU0FBUyxFQUFFLENBQUM7NkJBQ2I7eUJBQ0Y7cUJBQ0YsQ0FBQztvQkFDRixlQUFlO29CQUNmLGtCQUFrQjtvQkFDbEIsa0JBQWtCO2lCQUNuQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsbUJBQW1CO29CQUNuQixxQkFBcUI7b0JBQ3JCLGdCQUFnQjtvQkFDaEIsZUFBZTtvQkFDZixrQkFBa0I7b0JBQ2xCLGtCQUFrQjtvQkFDbEIsZUFBZTtvQkFDZixpQkFBaUI7aUJBQ2xCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7THNuTnVtZXJpY01vZHVsZX0gZnJvbSAnLi9kaXJlY3RpdmVzL251bWVyaWMvbnVtZXJpYy5tb2R1bGUnO1xuaW1wb3J0IHtMc25OdW1wYWRNb2R1bGV9IGZyb20gJy4vZGlyZWN0aXZlcy9udW1wYWQvbnVtcGFkLm1vZHVsZSc7XG5pbXBvcnQge0xzbkxhdGluVG9HcmVla01vZHVsZX0gZnJvbSAnLi9kaXJlY3RpdmVzL2xhdGluLXRvLWdyZWVrL2xhdGluLXRvLWdyZWVrLm1vZHVsZSc7XG5pbXBvcnQge0xzbkNhcGl0YWxpemVNb2R1bGV9IGZyb20gJy4vZGlyZWN0aXZlcy9jYXBpdGFsaXplL2NhcGl0YWxpemUubW9kdWxlJztcbmltcG9ydCB7THNuTWF0U2VsZWN0TW9kdWxlfSBmcm9tICcuL2NvbXBvbmVudHMvbWF0LXNlbGVjdC9tYXQtc2VsZWN0Lm1vZHVsZSc7XG5pbXBvcnQge0xzblNjcm9sbFNweU1vZHVsZX0gZnJvbSAnLi9kaXJlY3RpdmVzL3Njcm9sbC1zcHknO1xuaW1wb3J0IHtGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtMc25Db29raWVNb2R1bGV9IGZyb20gJy4vc2VydmljZXMvbHNuLWNvb2tpZS9sc24tY29va2llLm1vZHVsZSc7XG5pbXBvcnQge0xzbkNyb3NzVGFiTW9kdWxlfSBmcm9tICcuL3NlcnZpY2VzL2xzbi1jcm9zcy10YWIvbHNuLWNyb3NzLXRhYi5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtdLFxuICBpbXBvcnRzOiBbXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgTHNuQ2FwaXRhbGl6ZU1vZHVsZSxcbiAgICBMc25MYXRpblRvR3JlZWtNb2R1bGUsXG4gICAgTHNuTnVtZXJpY01vZHVsZS5mb3JSb290KHtcbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgZGVjaW1hbHM6ICcuJyxcbiAgICAgICAgcHJlY2lzaW9uOiA0LFxuICAgICAgfSxcbiAgICAgIGN1c3RvbToge1xuICAgICAgICBjdXJyZW5jeToge1xuICAgICAgICAgIGRlY2ltYWxzOiAnLCcsXG4gICAgICAgICAgdGhvdXNhbmRzOiAnICcsXG4gICAgICAgICAgcHJlY2lzaW9uOiAyLFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSksXG4gICAgTHNuTnVtcGFkTW9kdWxlLFxuICAgIExzbk1hdFNlbGVjdE1vZHVsZSxcbiAgICBMc25TY3JvbGxTcHlNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIExzbkNhcGl0YWxpemVNb2R1bGUsXG4gICAgTHNuTGF0aW5Ub0dyZWVrTW9kdWxlLFxuICAgIExzbk51bWVyaWNNb2R1bGUsXG4gICAgTHNuTnVtcGFkTW9kdWxlLFxuICAgIExzbk1hdFNlbGVjdE1vZHVsZSxcbiAgICBMc25TY3JvbGxTcHlNb2R1bGUsXG4gICAgTHNuQ29va2llTW9kdWxlLFxuICAgIExzbkNyb3NzVGFiTW9kdWxlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTHNuTGlic01vZHVsZSB7XG59XG4iXX0=