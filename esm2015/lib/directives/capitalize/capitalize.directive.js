import { Directive, HostListener } from '@angular/core';
import { NgModel } from '@angular/forms';
export class CapitalizeDirective {
    constructor(model) {
        this.model = model;
    }
    onInputChange($event) {
        this.model.valueAccessor.writeValue($event.toLocaleUpperCase());
    }
}
CapitalizeDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngModel][lsnCapitalize]',
                providers: [NgModel]
            },] }
];
/** @nocollapse */
CapitalizeDirective.ctorParameters = () => [
    { type: NgModel }
];
CapitalizeDirective.propDecorators = {
    onInputChange: [{ type: HostListener, args: ['ngModelChange', ['$event'],] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FwaXRhbGl6ZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9sc24tbGlicy9zcmMvbGliL2RpcmVjdGl2ZXMvY2FwaXRhbGl6ZS9jYXBpdGFsaXplLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFNdkMsTUFBTSxPQUFPLG1CQUFtQjtJQUM5QixZQUFvQixLQUFjO1FBQWQsVUFBSyxHQUFMLEtBQUssQ0FBUztJQUNsQyxDQUFDO0lBR0QsYUFBYSxDQUFDLE1BQU07UUFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7SUFDbEUsQ0FBQzs7O1lBWEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSwwQkFBMEI7Z0JBQ3BDLFNBQVMsRUFBRSxDQUFDLE9BQU8sQ0FBQzthQUNyQjs7OztZQUxPLE9BQU87Ozs0QkFVWixZQUFZLFNBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05nTW9kZWx9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW25nTW9kZWxdW2xzbkNhcGl0YWxpemVdJyxcbiAgcHJvdmlkZXJzOiBbTmdNb2RlbF1cbn0pXG5leHBvcnQgY2xhc3MgQ2FwaXRhbGl6ZURpcmVjdGl2ZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbW9kZWw6IE5nTW9kZWwpIHtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ25nTW9kZWxDaGFuZ2UnLCBbJyRldmVudCddKVxuICBvbklucHV0Q2hhbmdlKCRldmVudCkge1xuICAgIHRoaXMubW9kZWwudmFsdWVBY2Nlc3Nvci53cml0ZVZhbHVlKCRldmVudC50b0xvY2FsZVVwcGVyQ2FzZSgpKTtcbiAgfVxuXG59XG4iXX0=