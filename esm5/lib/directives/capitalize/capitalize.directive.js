/**
 * @fileoverview added by tsickle
 * Generated from: lib/directives/capitalize/capitalize.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, HostListener } from '@angular/core';
import { NgModel } from '@angular/forms';
var CapitalizeDirective = /** @class */ (function () {
    function CapitalizeDirective(model) {
        this.model = model;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    CapitalizeDirective.prototype.onInputChange = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.model.valueAccessor.writeValue($event.toLocaleUpperCase());
    };
    CapitalizeDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[ngModel][lsnCapitalize]',
                    providers: [NgModel]
                },] }
    ];
    /** @nocollapse */
    CapitalizeDirective.ctorParameters = function () { return [
        { type: NgModel }
    ]; };
    CapitalizeDirective.propDecorators = {
        onInputChange: [{ type: HostListener, args: ['ngModelChange', ['$event'],] }]
    };
    return CapitalizeDirective;
}());
export { CapitalizeDirective };
if (false) {
    /**
     * @type {?}
     * @private
     */
    CapitalizeDirective.prototype.model;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FwaXRhbGl6ZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbHNub3ZhL2FuZ3VsYXJtb2R1bGVzLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvY2FwaXRhbGl6ZS9jYXBpdGFsaXplLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUV2QztJQUtFLDZCQUFvQixLQUFjO1FBQWQsVUFBSyxHQUFMLEtBQUssQ0FBUztJQUNsQyxDQUFDOzs7OztJQUdELDJDQUFhOzs7O0lBRGIsVUFDYyxNQUFNO1FBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7O2dCQVhGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsMEJBQTBCO29CQUNwQyxTQUFTLEVBQUUsQ0FBQyxPQUFPLENBQUM7aUJBQ3JCOzs7O2dCQUxPLE9BQU87OztnQ0FVWixZQUFZLFNBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDOztJQUszQywwQkFBQztDQUFBLEFBYkQsSUFhQztTQVRZLG1CQUFtQjs7Ozs7O0lBQ2xCLG9DQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBIb3N0TGlzdGVuZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ01vZGVsfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuZ01vZGVsXVtsc25DYXBpdGFsaXplXScsXG4gIHByb3ZpZGVyczogW05nTW9kZWxdXG59KVxuZXhwb3J0IGNsYXNzIENhcGl0YWxpemVEaXJlY3RpdmUge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1vZGVsOiBOZ01vZGVsKSB7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCduZ01vZGVsQ2hhbmdlJywgWyckZXZlbnQnXSlcbiAgb25JbnB1dENoYW5nZSgkZXZlbnQpIHtcbiAgICB0aGlzLm1vZGVsLnZhbHVlQWNjZXNzb3Iud3JpdGVWYWx1ZSgkZXZlbnQudG9Mb2NhbGVVcHBlckNhc2UoKSk7XG4gIH1cblxufVxuIl19