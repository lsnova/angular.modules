/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LsnNumericModule } from './directives/numeric/numeric.module';
import { LsnNumpadModule } from './directives/numpad/numpad.module';
import { LsnLatinToGreekModule } from './directives/latin-to-greek/latin-to-greek.module';
import { LsnCapitalizeModule } from './directives/capitalize/capitalize.module';
import { LsnMatSelectModule } from './components/mat-select/mat-select.module';
import { LsnScrollSpyModule } from './directives/scroll-spy/scroll-spy.module';
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
                        LsnScrollSpyModule
                    ],
                    exports: [
                        LsnCapitalizeModule,
                        LsnLatinToGreekModule,
                        LsnNumericModule,
                        LsnNumpadModule,
                        LsnMatSelectModule,
                        LsnScrollSpyModule
                    ]
                },] }
    ];
    return LsnLibsModule;
}());
export { LsnLibsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNuLWxpYnMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy8iLCJzb3VyY2VzIjpbImxpYi9sc24tbGlicy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQ3JFLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUNsRSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxtREFBbUQsQ0FBQztBQUN4RixPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSwyQ0FBMkMsQ0FBQztBQUU5RSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSwyQ0FBMkMsQ0FBQztBQUM3RSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSwyQ0FBMkMsQ0FBQztBQUU3RTtJQUFBO0lBaUNBLENBQUM7O2dCQWpDQSxRQUFRLFNBQUM7b0JBQ1IsWUFBWSxFQUFFLEVBQUU7b0JBQ2hCLE9BQU8sRUFBRTt3QkFDUCxXQUFXO3dCQUNYLG1CQUFtQjt3QkFDbkIscUJBQXFCO3dCQUNyQixnQkFBZ0IsQ0FBQyxPQUFPLENBQUM7NEJBQ3ZCLE9BQU8sRUFBRTtnQ0FDUCxRQUFRLEVBQUUsR0FBRztnQ0FDYixTQUFTLEVBQUUsQ0FBQzs2QkFDYjs0QkFDRCxNQUFNLEVBQUU7Z0NBQ04sUUFBUSxFQUFFO29DQUNSLFFBQVEsRUFBRSxHQUFHO29DQUNiLFNBQVMsRUFBRSxHQUFHO29DQUNkLFNBQVMsRUFBRSxDQUFDO2lDQUNiOzZCQUNGO3lCQUNGLENBQUM7d0JBQ0YsZUFBZTt3QkFDZixrQkFBa0I7d0JBQ2xCLGtCQUFrQjtxQkFDbkI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLG1CQUFtQjt3QkFDbkIscUJBQXFCO3dCQUNyQixnQkFBZ0I7d0JBQ2hCLGVBQWU7d0JBQ2Ysa0JBQWtCO3dCQUNsQixrQkFBa0I7cUJBQ25CO2lCQUNGOztJQUVELG9CQUFDO0NBQUEsQUFqQ0QsSUFpQ0M7U0FEWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Zvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0xzbk51bWVyaWNNb2R1bGV9IGZyb20gJy4vZGlyZWN0aXZlcy9udW1lcmljL251bWVyaWMubW9kdWxlJztcbmltcG9ydCB7THNuTnVtcGFkTW9kdWxlfSBmcm9tICcuL2RpcmVjdGl2ZXMvbnVtcGFkL251bXBhZC5tb2R1bGUnO1xuaW1wb3J0IHtMc25MYXRpblRvR3JlZWtNb2R1bGV9IGZyb20gJy4vZGlyZWN0aXZlcy9sYXRpbi10by1ncmVlay9sYXRpbi10by1ncmVlay5tb2R1bGUnO1xuaW1wb3J0IHtMc25DYXBpdGFsaXplTW9kdWxlfSBmcm9tICcuL2RpcmVjdGl2ZXMvY2FwaXRhbGl6ZS9jYXBpdGFsaXplLm1vZHVsZSc7XG5cbmltcG9ydCB7THNuTWF0U2VsZWN0TW9kdWxlfSBmcm9tICcuL2NvbXBvbmVudHMvbWF0LXNlbGVjdC9tYXQtc2VsZWN0Lm1vZHVsZSc7XG5pbXBvcnQge0xzblNjcm9sbFNweU1vZHVsZX0gZnJvbSAnLi9kaXJlY3RpdmVzL3Njcm9sbC1zcHkvc2Nyb2xsLXNweS5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtdLFxuICBpbXBvcnRzOiBbXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgTHNuQ2FwaXRhbGl6ZU1vZHVsZSxcbiAgICBMc25MYXRpblRvR3JlZWtNb2R1bGUsXG4gICAgTHNuTnVtZXJpY01vZHVsZS5mb3JSb290KHtcbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgZGVjaW1hbHM6ICcuJyxcbiAgICAgICAgcHJlY2lzaW9uOiA0LFxuICAgICAgfSxcbiAgICAgIGN1c3RvbToge1xuICAgICAgICBjdXJyZW5jeToge1xuICAgICAgICAgIGRlY2ltYWxzOiAnLCcsXG4gICAgICAgICAgdGhvdXNhbmRzOiAnICcsXG4gICAgICAgICAgcHJlY2lzaW9uOiAyLFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSksXG4gICAgTHNuTnVtcGFkTW9kdWxlLFxuICAgIExzbk1hdFNlbGVjdE1vZHVsZSxcbiAgICBMc25TY3JvbGxTcHlNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIExzbkNhcGl0YWxpemVNb2R1bGUsXG4gICAgTHNuTGF0aW5Ub0dyZWVrTW9kdWxlLFxuICAgIExzbk51bWVyaWNNb2R1bGUsXG4gICAgTHNuTnVtcGFkTW9kdWxlLFxuICAgIExzbk1hdFNlbGVjdE1vZHVsZSxcbiAgICBMc25TY3JvbGxTcHlNb2R1bGVcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBMc25MaWJzTW9kdWxlIHtcbn1cbiJdfQ==