/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNuLWxpYnMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy8iLCJzb3VyY2VzIjpbImxpYi9sc24tbGlicy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDckUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBQ2xFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLG1EQUFtRCxDQUFDO0FBQ3hGLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDJDQUEyQyxDQUFDO0FBQzlFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLDJDQUEyQyxDQUFDO0FBQzdFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSwrQ0FBK0MsQ0FBQztBQUNoRixPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFvQ3hFLE1BQU0sT0FBTyxhQUFhOzs7WUFsQ3pCLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUUsRUFBRTtnQkFDaEIsT0FBTyxFQUFFO29CQUNQLFdBQVc7b0JBQ1gsbUJBQW1CO29CQUNuQixxQkFBcUI7b0JBQ3JCLGdCQUFnQixDQUFDLE9BQU8sQ0FBQzt3QkFDdkIsT0FBTyxFQUFFOzRCQUNQLFFBQVEsRUFBRSxHQUFHOzRCQUNiLFNBQVMsRUFBRSxDQUFDO3lCQUNiO3dCQUNELE1BQU0sRUFBRTs0QkFDTixRQUFRLEVBQUU7Z0NBQ1IsUUFBUSxFQUFFLEdBQUc7Z0NBQ2IsU0FBUyxFQUFFLEdBQUc7Z0NBQ2QsU0FBUyxFQUFFLENBQUM7NkJBQ2I7eUJBQ0Y7cUJBQ0YsQ0FBQztvQkFDRixlQUFlO29CQUNmLGVBQWU7b0JBQ2YsaUJBQWlCO29CQUNqQixrQkFBa0I7aUJBQ25CO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxtQkFBbUI7b0JBQ25CLHFCQUFxQjtvQkFDckIsZ0JBQWdCO29CQUNoQixlQUFlO29CQUNmLGVBQWU7b0JBQ2YsaUJBQWlCO29CQUNqQixrQkFBa0I7aUJBQ25CO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7THNuTnVtZXJpY01vZHVsZX0gZnJvbSAnLi9kaXJlY3RpdmVzL251bWVyaWMvbnVtZXJpYy5tb2R1bGUnO1xuaW1wb3J0IHtMc25OdW1wYWRNb2R1bGV9IGZyb20gJy4vZGlyZWN0aXZlcy9udW1wYWQvbnVtcGFkLm1vZHVsZSc7XG5pbXBvcnQge0xzbkxhdGluVG9HcmVla01vZHVsZX0gZnJvbSAnLi9kaXJlY3RpdmVzL2xhdGluLXRvLWdyZWVrL2xhdGluLXRvLWdyZWVrLm1vZHVsZSc7XG5pbXBvcnQge0xzbkNhcGl0YWxpemVNb2R1bGV9IGZyb20gJy4vZGlyZWN0aXZlcy9jYXBpdGFsaXplL2NhcGl0YWxpemUubW9kdWxlJztcbmltcG9ydCB7THNuU2Nyb2xsU3B5TW9kdWxlfSBmcm9tICcuL2RpcmVjdGl2ZXMvc2Nyb2xsLXNweS9zY3JvbGwtc3B5Lm1vZHVsZSc7XG5pbXBvcnQge0Zvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0xzbkNyb3NzVGFiTW9kdWxlfSBmcm9tICcuL3NlcnZpY2VzL2xzbi1jcm9zcy10YWIvbHNuLWNyb3NzLXRhYi5tb2R1bGUnO1xuaW1wb3J0IHtMc25Db29raWVNb2R1bGV9IGZyb20gJy4vc2VydmljZXMvbHNuLWNvb2tpZS9sc24tY29va2llLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW10sXG4gIGltcG9ydHM6IFtcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBMc25DYXBpdGFsaXplTW9kdWxlLFxuICAgIExzbkxhdGluVG9HcmVla01vZHVsZSxcbiAgICBMc25OdW1lcmljTW9kdWxlLmZvclJvb3Qoe1xuICAgICAgZGVmYXVsdDoge1xuICAgICAgICBkZWNpbWFsczogJy4nLFxuICAgICAgICBwcmVjaXNpb246IDQsXG4gICAgICB9LFxuICAgICAgY3VzdG9tOiB7XG4gICAgICAgIGN1cnJlbmN5OiB7XG4gICAgICAgICAgZGVjaW1hbHM6ICcsJyxcbiAgICAgICAgICB0aG91c2FuZHM6ICcgJyxcbiAgICAgICAgICBwcmVjaXNpb246IDIsXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KSxcbiAgICBMc25OdW1wYWRNb2R1bGUsXG4gICAgTHNuQ29va2llTW9kdWxlLFxuICAgIExzbkNyb3NzVGFiTW9kdWxlLFxuICAgIExzblNjcm9sbFNweU1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTHNuQ2FwaXRhbGl6ZU1vZHVsZSxcbiAgICBMc25MYXRpblRvR3JlZWtNb2R1bGUsXG4gICAgTHNuTnVtZXJpY01vZHVsZSxcbiAgICBMc25OdW1wYWRNb2R1bGUsXG4gICAgTHNuQ29va2llTW9kdWxlLFxuICAgIExzbkNyb3NzVGFiTW9kdWxlLFxuICAgIExzblNjcm9sbFNweU1vZHVsZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIExzbkxpYnNNb2R1bGUge1xufVxuIl19