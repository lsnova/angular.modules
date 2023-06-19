import { NgModule } from '@angular/core';
import { NumericDirective } from './numeric.directive';
import { NumericConfigService, CustomNumericConfig } from './numeric-config.service';
import * as i0 from "@angular/core";
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
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: LsnNumericModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    /** @nocollapse */ static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.1.1", ngImport: i0, type: LsnNumericModule, declarations: [NumericDirective], exports: [NumericDirective] }); }
    /** @nocollapse */ static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: LsnNumericModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: LsnNumericModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        NumericDirective,
                    ],
                    exports: [
                        NumericDirective,
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtZXJpYy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9sc24tbGlicy9zcmMvbGliL2RpcmVjdGl2ZXMvbnVtZXJpYy9udW1lcmljLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQXNCLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1RCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRCxPQUFPLEVBQUMsb0JBQW9CLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQzs7QUFVbkYsTUFBTSxPQUFPLGdCQUFnQjtJQUMzQixNQUFNLENBQUMsT0FBTyxDQUFDLE1BQTRCO1FBQ3pDLE9BQU87WUFDTCxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFNBQVMsRUFBRTtnQkFDVCxvQkFBb0I7Z0JBQ3BCLEVBQUMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUM7YUFDakQ7U0FDRixDQUFDO0lBQ0osQ0FBQztpSUFUVSxnQkFBZ0I7a0lBQWhCLGdCQUFnQixpQkFOekIsZ0JBQWdCLGFBR2hCLGdCQUFnQjtrSUFHUCxnQkFBZ0I7OzJGQUFoQixnQkFBZ0I7a0JBUjVCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFO3dCQUNaLGdCQUFnQjtxQkFDakI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGdCQUFnQjtxQkFDakI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TnVtZXJpY0RpcmVjdGl2ZX0gZnJvbSAnLi9udW1lcmljLmRpcmVjdGl2ZSc7XG5pbXBvcnQge051bWVyaWNDb25maWdTZXJ2aWNlLCBDdXN0b21OdW1lcmljQ29uZmlnfSBmcm9tICcuL251bWVyaWMtY29uZmlnLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOdW1lcmljRGlyZWN0aXZlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTnVtZXJpY0RpcmVjdGl2ZSxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBMc25OdW1lcmljTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnPzogQ3VzdG9tTnVtZXJpY0NvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnM8THNuTnVtZXJpY01vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTHNuTnVtZXJpY01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBOdW1lcmljQ29uZmlnU2VydmljZSxcbiAgICAgICAge3Byb3ZpZGU6IEN1c3RvbU51bWVyaWNDb25maWcsIHVzZVZhbHVlOiBjb25maWd9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIl19