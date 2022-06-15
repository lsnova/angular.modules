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
}
/** @nocollapse */ CapitalizeDirective.ɵfac = function CapitalizeDirective_Factory(t) { return new (t || CapitalizeDirective)(i0.ɵɵdirectiveInject(i1.NgModel)); };
/** @nocollapse */ CapitalizeDirective.ɵdir = /** @pureOrBreakMyCode */ i0.ɵɵdefineDirective({ type: CapitalizeDirective, selectors: [["", "ngModel", "", "lsnCapitalize", ""]], hostBindings: function CapitalizeDirective_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("ngModelChange", function CapitalizeDirective_ngModelChange_HostBindingHandler($event) { return ctx.onInputChange($event); });
    } }, features: [i0.ɵɵProvidersFeature([NgModel])] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CapitalizeDirective, [{
        type: Directive,
        args: [{
                selector: '[ngModel][lsnCapitalize]',
                providers: [NgModel]
            }]
    }], function () { return [{ type: i1.NgModel }]; }, { onInputChange: [{
            type: HostListener,
            args: ['ngModelChange', ['$event']]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FwaXRhbGl6ZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9sc24tbGlicy9zcmMvbGliL2RpcmVjdGl2ZXMvY2FwaXRhbGl6ZS9jYXBpdGFsaXplLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7OztBQU12QyxNQUFNLE9BQU8sbUJBQW1CO0lBQzlCLFlBQW9CLEtBQWM7UUFBZCxVQUFLLEdBQUwsS0FBSyxDQUFTO0lBQ2xDLENBQUM7SUFHRCxhQUFhLENBQUMsTUFBTTtRQUNsQixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztJQUNsRSxDQUFDOzt5R0FQVSxtQkFBbUI7cUdBQW5CLG1CQUFtQjtzSEFBbkIseUJBQXFCOzBDQUZyQixDQUFDLE9BQU8sQ0FBQzt1RkFFVCxtQkFBbUI7Y0FKL0IsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSwwQkFBMEI7Z0JBQ3BDLFNBQVMsRUFBRSxDQUFDLE9BQU8sQ0FBQzthQUNyQjswREFNQyxhQUFhO2tCQURaLFlBQVk7bUJBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05nTW9kZWx9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW25nTW9kZWxdW2xzbkNhcGl0YWxpemVdJyxcbiAgcHJvdmlkZXJzOiBbTmdNb2RlbF1cbn0pXG5leHBvcnQgY2xhc3MgQ2FwaXRhbGl6ZURpcmVjdGl2ZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbW9kZWw6IE5nTW9kZWwpIHtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ25nTW9kZWxDaGFuZ2UnLCBbJyRldmVudCddKVxuICBvbklucHV0Q2hhbmdlKCRldmVudCkge1xuICAgIHRoaXMubW9kZWwudmFsdWVBY2Nlc3Nvci53cml0ZVZhbHVlKCRldmVudC50b0xvY2FsZVVwcGVyQ2FzZSgpKTtcbiAgfVxuXG59XG4iXX0=