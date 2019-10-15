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
                    LsnScrollSpyModule,
                    LsnCookieModule,
                    LsnCrossTabModule
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNuLWxpYnMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy8iLCJzb3VyY2VzIjpbImxpYi9sc24tbGlicy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDckUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBQ2xFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLG1EQUFtRCxDQUFDO0FBQ3hGLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDJDQUEyQyxDQUFDO0FBQzlFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLDJDQUEyQyxDQUFDO0FBQzdFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzNELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFDeEUsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sK0NBQStDLENBQUM7QUFzQ2hGLE1BQU0sT0FBTyxhQUFhOzs7WUFwQ3pCLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUUsRUFBRTtnQkFDaEIsT0FBTyxFQUFFO29CQUNQLFdBQVc7b0JBQ1gsbUJBQW1CO29CQUNuQixxQkFBcUI7b0JBQ3JCLGdCQUFnQixDQUFDLE9BQU8sQ0FBQzt3QkFDdkIsT0FBTyxFQUFFOzRCQUNQLFFBQVEsRUFBRSxHQUFHOzRCQUNiLFNBQVMsRUFBRSxDQUFDO3lCQUNiO3dCQUNELE1BQU0sRUFBRTs0QkFDTixRQUFRLEVBQUU7Z0NBQ1IsUUFBUSxFQUFFLEdBQUc7Z0NBQ2IsU0FBUyxFQUFFLEdBQUc7Z0NBQ2QsU0FBUyxFQUFFLENBQUM7NkJBQ2I7eUJBQ0Y7cUJBQ0YsQ0FBQztvQkFDRixlQUFlO29CQUNmLGtCQUFrQjtvQkFDbEIsa0JBQWtCO29CQUNsQixlQUFlO29CQUNmLGlCQUFpQjtpQkFDbEI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLG1CQUFtQjtvQkFDbkIscUJBQXFCO29CQUNyQixnQkFBZ0I7b0JBQ2hCLGVBQWU7b0JBQ2Ysa0JBQWtCO29CQUNsQixrQkFBa0I7b0JBQ2xCLGVBQWU7b0JBQ2YsaUJBQWlCO2lCQUNsQjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0xzbk51bWVyaWNNb2R1bGV9IGZyb20gJy4vZGlyZWN0aXZlcy9udW1lcmljL251bWVyaWMubW9kdWxlJztcbmltcG9ydCB7THNuTnVtcGFkTW9kdWxlfSBmcm9tICcuL2RpcmVjdGl2ZXMvbnVtcGFkL251bXBhZC5tb2R1bGUnO1xuaW1wb3J0IHtMc25MYXRpblRvR3JlZWtNb2R1bGV9IGZyb20gJy4vZGlyZWN0aXZlcy9sYXRpbi10by1ncmVlay9sYXRpbi10by1ncmVlay5tb2R1bGUnO1xuaW1wb3J0IHtMc25DYXBpdGFsaXplTW9kdWxlfSBmcm9tICcuL2RpcmVjdGl2ZXMvY2FwaXRhbGl6ZS9jYXBpdGFsaXplLm1vZHVsZSc7XG5pbXBvcnQge0xzbk1hdFNlbGVjdE1vZHVsZX0gZnJvbSAnLi9jb21wb25lbnRzL21hdC1zZWxlY3QvbWF0LXNlbGVjdC5tb2R1bGUnO1xuaW1wb3J0IHtMc25TY3JvbGxTcHlNb2R1bGV9IGZyb20gJy4vZGlyZWN0aXZlcy9zY3JvbGwtc3B5JztcbmltcG9ydCB7Rm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7THNuQ29va2llTW9kdWxlfSBmcm9tICcuL3NlcnZpY2VzL2xzbi1jb29raWUvbHNuLWNvb2tpZS5tb2R1bGUnO1xuaW1wb3J0IHtMc25Dcm9zc1RhYk1vZHVsZX0gZnJvbSAnLi9zZXJ2aWNlcy9sc24tY3Jvc3MtdGFiL2xzbi1jcm9zcy10YWIubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXSxcbiAgaW1wb3J0czogW1xuICAgIEZvcm1zTW9kdWxlLFxuICAgIExzbkNhcGl0YWxpemVNb2R1bGUsXG4gICAgTHNuTGF0aW5Ub0dyZWVrTW9kdWxlLFxuICAgIExzbk51bWVyaWNNb2R1bGUuZm9yUm9vdCh7XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGRlY2ltYWxzOiAnLicsXG4gICAgICAgIHByZWNpc2lvbjogNCxcbiAgICAgIH0sXG4gICAgICBjdXN0b206IHtcbiAgICAgICAgY3VycmVuY3k6IHtcbiAgICAgICAgICBkZWNpbWFsczogJywnLFxuICAgICAgICAgIHRob3VzYW5kczogJyAnLFxuICAgICAgICAgIHByZWNpc2lvbjogMixcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pLFxuICAgIExzbk51bXBhZE1vZHVsZSxcbiAgICBMc25NYXRTZWxlY3RNb2R1bGUsXG4gICAgTHNuU2Nyb2xsU3B5TW9kdWxlLFxuICAgIExzbkNvb2tpZU1vZHVsZSxcbiAgICBMc25Dcm9zc1RhYk1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTHNuQ2FwaXRhbGl6ZU1vZHVsZSxcbiAgICBMc25MYXRpblRvR3JlZWtNb2R1bGUsXG4gICAgTHNuTnVtZXJpY01vZHVsZSxcbiAgICBMc25OdW1wYWRNb2R1bGUsXG4gICAgTHNuTWF0U2VsZWN0TW9kdWxlLFxuICAgIExzblNjcm9sbFNweU1vZHVsZSxcbiAgICBMc25Db29raWVNb2R1bGUsXG4gICAgTHNuQ3Jvc3NUYWJNb2R1bGVcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBMc25MaWJzTW9kdWxlIHtcbn1cbiJdfQ==