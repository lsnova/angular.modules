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
import { FormsModule } from '@angular/forms';
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
                    ],
                    exports: [
                        LsnCapitalizeModule,
                        LsnLatinToGreekModule,
                        LsnNumericModule,
                        LsnNumpadModule,
                        LsnMatSelectModule,
                    ]
                },] }
    ];
    return LsnLibsModule;
}());
export { LsnLibsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNuLWxpYnMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy8iLCJzb3VyY2VzIjpbImxpYi9sc24tbGlicy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDckUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBQ2xFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLG1EQUFtRCxDQUFDO0FBQ3hGLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDJDQUEyQyxDQUFDO0FBRTlFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLDJDQUEyQyxDQUFDO0FBQzdFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQztJQUFBO0lBZ0NBLENBQUM7O2dCQWhDQSxRQUFRLFNBQUM7b0JBQ1IsWUFBWSxFQUFFLEVBQUU7b0JBQ2hCLE9BQU8sRUFBRTt3QkFDUCxXQUFXO3dCQUNYLG1CQUFtQjt3QkFDbkIscUJBQXFCO3dCQUNyQixnQkFBZ0IsQ0FBQyxPQUFPLENBQUM7NEJBQ3ZCLE9BQU8sRUFBRTtnQ0FDUCxRQUFRLEVBQUUsR0FBRztnQ0FDYixTQUFTLEVBQUUsQ0FBQzs2QkFDYjs0QkFDRCxNQUFNLEVBQUU7Z0NBQ04sUUFBUSxFQUFFO29DQUNSLFFBQVEsRUFBRSxHQUFHO29DQUNiLFNBQVMsRUFBRSxHQUFHO29DQUNkLFNBQVMsRUFBRSxDQUFDO2lDQUNiOzZCQUNGO3lCQUNGLENBQUM7d0JBRUYsZUFBZTt3QkFDZixrQkFBa0I7cUJBQ25CO29CQUNELE9BQU8sRUFBRTt3QkFDUCxtQkFBbUI7d0JBQ25CLHFCQUFxQjt3QkFDckIsZ0JBQWdCO3dCQUNoQixlQUFlO3dCQUNmLGtCQUFrQjtxQkFDbkI7aUJBQ0Y7O0lBRUQsb0JBQUM7Q0FBQSxBQWhDRCxJQWdDQztTQURZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7THNuTnVtZXJpY01vZHVsZX0gZnJvbSAnLi9kaXJlY3RpdmVzL251bWVyaWMvbnVtZXJpYy5tb2R1bGUnO1xuaW1wb3J0IHtMc25OdW1wYWRNb2R1bGV9IGZyb20gJy4vZGlyZWN0aXZlcy9udW1wYWQvbnVtcGFkLm1vZHVsZSc7XG5pbXBvcnQge0xzbkxhdGluVG9HcmVla01vZHVsZX0gZnJvbSAnLi9kaXJlY3RpdmVzL2xhdGluLXRvLWdyZWVrL2xhdGluLXRvLWdyZWVrLm1vZHVsZSc7XG5pbXBvcnQge0xzbkNhcGl0YWxpemVNb2R1bGV9IGZyb20gJy4vZGlyZWN0aXZlcy9jYXBpdGFsaXplL2NhcGl0YWxpemUubW9kdWxlJztcblxuaW1wb3J0IHtMc25NYXRTZWxlY3RNb2R1bGV9IGZyb20gJy4vY29tcG9uZW50cy9tYXQtc2VsZWN0L21hdC1zZWxlY3QubW9kdWxlJztcbmltcG9ydCB7Rm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXSxcbiAgaW1wb3J0czogW1xuICAgIEZvcm1zTW9kdWxlLFxuICAgIExzbkNhcGl0YWxpemVNb2R1bGUsXG4gICAgTHNuTGF0aW5Ub0dyZWVrTW9kdWxlLFxuICAgIExzbk51bWVyaWNNb2R1bGUuZm9yUm9vdCh7XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGRlY2ltYWxzOiAnLicsXG4gICAgICAgIHByZWNpc2lvbjogNCxcbiAgICAgIH0sXG4gICAgICBjdXN0b206IHtcbiAgICAgICAgY3VycmVuY3k6IHtcbiAgICAgICAgICBkZWNpbWFsczogJywnLFxuICAgICAgICAgIHRob3VzYW5kczogJyAnLFxuICAgICAgICAgIHByZWNpc2lvbjogMixcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pLFxuXG4gICAgTHNuTnVtcGFkTW9kdWxlLFxuICAgIExzbk1hdFNlbGVjdE1vZHVsZSxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIExzbkNhcGl0YWxpemVNb2R1bGUsXG4gICAgTHNuTGF0aW5Ub0dyZWVrTW9kdWxlLFxuICAgIExzbk51bWVyaWNNb2R1bGUsXG4gICAgTHNuTnVtcGFkTW9kdWxlLFxuICAgIExzbk1hdFNlbGVjdE1vZHVsZSxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBMc25MaWJzTW9kdWxlIHtcbn1cbiJdfQ==