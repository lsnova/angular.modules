import { Directive, HostListener } from '@angular/core';
import { NgModel } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
export class CapitalizeDirective {
    constructor(model) {
        this.model = model;
    }
    onInputChange($event) {
        this.model.valueAccessor.writeValue($event.toLocaleUpperCase());
    }
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: CapitalizeDirective, deps: [{ token: i1.NgModel }], target: i0.ɵɵFactoryTarget.Directive }); }
    /** @nocollapse */ static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.2.14", type: CapitalizeDirective, selector: "[ngModel][lsnCapitalize]", host: { listeners: { "ngModelChange": "onInputChange($event)" } }, providers: [NgModel], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: CapitalizeDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngModel][lsnCapitalize]',
                    providers: [NgModel]
                }]
        }], ctorParameters: () => [{ type: i1.NgModel }], propDecorators: { onInputChange: [{
                type: HostListener,
                args: ['ngModelChange', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FwaXRhbGl6ZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9sc24tbGlicy9zcmMvbGliL2RpcmVjdGl2ZXMvY2FwaXRhbGl6ZS9jYXBpdGFsaXplLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7OztBQU12QyxNQUFNLE9BQU8sbUJBQW1CO0lBQzlCLFlBQW9CLEtBQWM7UUFBZCxVQUFLLEdBQUwsS0FBSyxDQUFTO0lBQ2xDLENBQUM7SUFHRCxhQUFhLENBQUMsTUFBTTtRQUNsQixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztJQUNsRSxDQUFDO2tJQVBVLG1CQUFtQjtzSEFBbkIsbUJBQW1CLHNIQUZuQixDQUFDLE9BQU8sQ0FBQzs7NEZBRVQsbUJBQW1CO2tCQUovQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSwwQkFBMEI7b0JBQ3BDLFNBQVMsRUFBRSxDQUFDLE9BQU8sQ0FBQztpQkFDckI7NEVBTUMsYUFBYTtzQkFEWixZQUFZO3VCQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBIb3N0TGlzdGVuZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ01vZGVsfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuZ01vZGVsXVtsc25DYXBpdGFsaXplXScsXG4gIHByb3ZpZGVyczogW05nTW9kZWxdXG59KVxuZXhwb3J0IGNsYXNzIENhcGl0YWxpemVEaXJlY3RpdmUge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1vZGVsOiBOZ01vZGVsKSB7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCduZ01vZGVsQ2hhbmdlJywgWyckZXZlbnQnXSlcbiAgb25JbnB1dENoYW5nZSgkZXZlbnQpIHtcbiAgICB0aGlzLm1vZGVsLnZhbHVlQWNjZXNzb3Iud3JpdGVWYWx1ZSgkZXZlbnQudG9Mb2NhbGVVcHBlckNhc2UoKSk7XG4gIH1cblxufVxuIl19