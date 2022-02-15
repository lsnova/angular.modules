import { NgModule } from '@angular/core';
import { NumericDirective } from './numeric.directive';
import { NumericConfigService, CustomNumericConfig } from './numeric-config.service';
export class LsnNumericModule {
    static forRoot(config) {
        return {
            ngModule: LsnNumericModule,
            providers: [
                NumericConfigService,
                { provide: CustomNumericConfig, useValue: config }
            ]
        };
    }
}
LsnNumericModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    NumericDirective,
                ],
                exports: [
                    NumericDirective,
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtZXJpYy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9sc24tbGlicy9zcmMvbGliL2RpcmVjdGl2ZXMvbnVtZXJpYy9udW1lcmljLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQXNCLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1RCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRCxPQUFPLEVBQUMsb0JBQW9CLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQVVuRixNQUFNLE9BQU8sZ0JBQWdCO0lBQzNCLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBNEI7UUFDekMsT0FBTztZQUNMLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsU0FBUyxFQUFFO2dCQUNULG9CQUFvQjtnQkFDcEIsRUFBQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBQzthQUNqRDtTQUNGLENBQUM7SUFDSixDQUFDOzs7WUFqQkYsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRTtvQkFDWixnQkFBZ0I7aUJBQ2pCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxnQkFBZ0I7aUJBQ2pCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TnVtZXJpY0RpcmVjdGl2ZX0gZnJvbSAnLi9udW1lcmljLmRpcmVjdGl2ZSc7XG5pbXBvcnQge051bWVyaWNDb25maWdTZXJ2aWNlLCBDdXN0b21OdW1lcmljQ29uZmlnfSBmcm9tICcuL251bWVyaWMtY29uZmlnLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOdW1lcmljRGlyZWN0aXZlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTnVtZXJpY0RpcmVjdGl2ZSxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBMc25OdW1lcmljTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnPzogQ3VzdG9tTnVtZXJpY0NvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnM8THNuTnVtZXJpY01vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTHNuTnVtZXJpY01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBOdW1lcmljQ29uZmlnU2VydmljZSxcbiAgICAgICAge3Byb3ZpZGU6IEN1c3RvbU51bWVyaWNDb25maWcsIHVzZVZhbHVlOiBjb25maWd9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIl19