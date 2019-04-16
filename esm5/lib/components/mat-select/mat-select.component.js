/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ContentChild, forwardRef, Input, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ErrorStateMatcher, MatSelect } from '@angular/material';
import { DOWN_ARROW, END, ENTER, HOME, UP_ARROW } from '@angular/cdk/keycodes';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
/* tslint:disable:no-use-before-declare */
/** @type {?} */
export var CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MatSelectComponent; }),
    multi: true
};
/* tslint:enable:no-use-before-declare */
/** @type {?} */
var noop = function () {
};
var ɵ0 = noop;
/** @type {?} */
var SELECT_SEARCHABLE_MIN_LIMIT = 8;
var MatSelectComponent = /** @class */ (function () {
    function MatSelectComponent() {
        this.control = new FormControl();
        this.options = [];
        this.clear = true;
        this.disabled = false;
        this.multiple = false;
        this.errors = [];
        this.destroy$ = new Subject();
        this.panelClosed$ = new Subject();
        this.optionChanges$ = new Subject();
        this.selectedOptions = [];
        this.searchTerm = '';
        this._onTouched = noop;
    }
    /**
     * @return {?}
     */
    MatSelectComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.resetOptions();
    };
    /**
     * @return {?}
     */
    MatSelectComponent.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        this.handleDisabled();
        this.resetOptions();
        this.writeValue(this.control.value);
    };
    /**
     * @return {?}
     */
    MatSelectComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroy$.next();
    };
    /**
     * @return {?}
     */
    MatSelectComponent.prototype.onBlur = /**
     * @return {?}
     */
    function () {
        this._onTouched();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    MatSelectComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!this.multiple) {
            this.setSingleValue(value);
        }
        else if (this.multiple && Array.isArray(value)) {
            this.setMultipleValue(value);
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    MatSelectComponent.prototype.setSingleValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (Array.isArray(value)) {
            console.warn('[app-select] Given value is an array. Should `multiple = true`?');
        }
        /** @type {?} */
        var correspondingOption = this.findOption(value);
        this.changeValue(correspondingOption);
    };
    /**
     * @param {?} values
     * @return {?}
     */
    MatSelectComponent.prototype.setMultipleValue = /**
     * @param {?} values
     * @return {?}
     */
    function (values) {
        var _this = this;
        this.selectedOptions = [];
        if (Array.isArray(values)) {
            values.forEach(function (item) {
                /** @type {?} */
                var correspondingOption = _this.findOption(item);
                if (correspondingOption) {
                    _this.handleOptionSelection({
                        selected: true,
                        value: correspondingOption
                    });
                }
            });
        }
        this.changeValue(this.selectedOptions);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    MatSelectComponent.prototype.findOption = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        if (value || value === 0 || value === false) {
            /** @type {?} */
            var result = this.options.find(function (option) { return _this.bindValue
                ? option[_this.bindValue] === value
                : _this.bindBy
                    ? option[_this.bindBy] === value[_this.bindBy]
                    : option === value; });
            return result || value;
        }
        return undefined;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    MatSelectComponent.prototype.changeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        this.control.setValue(value);
        if (this._onChange) {
            if (!this.multiple) {
                this._onChange(this.parseValue(value));
            }
            else {
                /** @type {?} */
                var result = Array.isArray(value) ? value.map(function (item) { return _this.parseValue(item); }) : value;
                this._onChange(result);
            }
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    MatSelectComponent.prototype.parseValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return value !== undefined && value !== null && this.bindValue ? value[this.bindValue] : value;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    MatSelectComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._onChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    MatSelectComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._onTouched = fn;
    };
    /**
     * @return {?}
     */
    MatSelectComponent.prototype.bindOptionSelectionChanges = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.matSelect.optionSelectionChanges
            .pipe(takeUntil(this.optionChanges$ || this.destroy$))
            .subscribe(function (res) {
            var isUserInput = res.isUserInput, source = res.source;
            if (isUserInput) {
                /** @type {?} */
                var result = _this.handleOptionSelection(source);
                if (!_this.multiple) {
                    _this.setSingleValue(result);
                }
                else {
                    _this.setMultipleValue(_this.selectedOptions);
                }
            }
        });
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MatSelectComponent.prototype.handleOptionSelection = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        var value = event.value, selected = event.selected;
        if (!this.multiple) {
            return selected
                ? this.parseValue(value)
                : undefined;
        }
        else {
            if (selected) {
                this.selectedOptions.push(value);
            }
            else {
                // _remove(this.selectedOptions, (item) => {
                //   return this.bindValue ? item[this.bindValue] === value[this.bindValue] : item === value;
                // });
                this.selectedOptions = this.selectedOptions.filter(function (item) {
                    return _this.bindValue ? item[_this.bindValue] !== value[_this.bindValue] : item !== value;
                });
            }
            /** @type {?} */
            var result = this.selectedOptions.map(function (item) { return _this.parseValue(item); });
            return Array.isArray(result) && result.length ? result : undefined;
        }
    };
    /**
     * @return {?}
     */
    MatSelectComponent.prototype.resetOptions = /**
     * @return {?}
     */
    function () {
        this.searchTerm = '';
        this.filteredOptions = tslib_1.__spread(this.options);
        this.optionChanges$.next();
        this.bindOptionSelectionChanges();
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    MatSelectComponent.prototype.clearValue = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        $event.stopPropagation();
        this.selectedOptions = [];
        this.changeValue(undefined);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    MatSelectComponent.prototype.filterOptions = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        if (value !== this.searchTerm) {
            this.searchTerm = value;
            this.filteredOptions =
                this.options.filter(function (item) {
                    if (typeof item === 'string') {
                        return item.toLocaleUpperCase().indexOf(_this.searchTerm.toLocaleUpperCase()) !== -1;
                    }
                    /** @type {?} */
                    var optionValues = Object.values(item);
                    return optionValues.some(function (optionValue) {
                        return typeof optionValue === 'string'
                            && optionValue.toLocaleUpperCase().indexOf(_this.searchTerm.toLocaleUpperCase()) > -1;
                    });
                });
            this.matSelect._keyManager.setFirstItemActive();
            this.optionChanges$.next();
            this.bindOptionSelectionChanges();
        }
    };
    Object.defineProperty(MatSelectComponent.prototype, "isSearchEnabled", {
        get: /**
         * @return {?}
         */
        function () {
            return Array.isArray(this.options) && this.options.length > SELECT_SEARCHABLE_MIN_LIMIT;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSelectComponent.prototype, "isClearEnabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this.clear && this.control.value && !this.disabled
                && ((this.multiple && Array.isArray(this.control.value) && this.control.value.length)
                    || !this.multiple);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    MatSelectComponent.prototype.handleKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.isSearchEnabled && [DOWN_ARROW, END, ENTER, HOME, UP_ARROW].indexOf(event.keyCode) === -1) {
            event.stopPropagation();
        }
    };
    /**
     * @return {?}
     */
    MatSelectComponent.prototype.handleDisabled = /**
     * @return {?}
     */
    function () {
        if (this.disabled) {
            this.control.disable();
            return;
        }
        this.control.enable();
    };
    /**
     * @return {?}
     */
    MatSelectComponent.prototype.scrollToActiveItem = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var activeItem = this.matSelect._keyManager.activeItem;
        if (!activeItem) {
            return;
        }
        /** @type {?} */
        var option = activeItem._element.nativeElement;
        /** @type {?} */
        var parent = option.parentNode;
        if (option.offsetTop + option.offsetHeight > parent.scrollTop + parent.offsetHeight) {
            parent.scrollTop = option.offsetTop - parent.offsetHeight + option.offsetHeight;
        }
        else if (option.offsetTop < parent.scrollTop) {
            parent.scrollTop = option.offsetTop;
        }
    };
    /**
     * @param {?} isOpen
     * @return {?}
     */
    MatSelectComponent.prototype.openedChange = /**
     * @param {?} isOpen
     * @return {?}
     */
    function (isOpen) {
        var _this = this;
        if (isOpen) {
            if (this.isSearchEnabled) {
                this.searchInput.nativeElement.focus();
            }
            this.optionChanges$.next();
            this.bindOptionSelectionChanges();
            this.scrollToActiveItem();
            /** @type {?} */
            var keyManagerChange = this.matSelect._keyManager.change;
            keyManagerChange
                .pipe(takeUntil(this.panelClosed$))
                .subscribe(function () {
                _this.scrollToActiveItem();
            });
        }
        else {
            this.panelClosed$.next();
            this.resetOptions();
        }
    };
    MatSelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'lsn-mat-select',
                    template: "<mat-form-field>\n    <mat-select\n        [formControl]=\"control\"\n        [placeholder]=\"placeholder\"\n        [errorStateMatcher]=\"errorStateMatcher\"\n        [multiple]=\"multiple\"\n        [disableOptionCentering]=\"true\"\n        panelClass=\"app-select-panel\"\n        (blur)=\"onBlur()\"\n        (openedChange)=\"openedChange($event)\"\n    >\n        <input\n            #searchInput\n            *ngIf=\"isSearchEnabled\"\n            matInput\n            type=\"text\"\n            class=\"input-filter mat-select-search\"\n            autocomplete=\"off\"\n            [ngModel]=\"searchTerm\"\n            (ngModelChange)=\"filterOptions($event)\"\n            [placeholder]=\"'FILTER'\"\n            (keydown)=\"handleKeydown($event)\"\n        />\n        <div [ngClass]=\"{'app-select__options': true, 'app-select__options--searchable': isSearchEnabled}\">\n            <mat-option *ngIf=\"!options.length\"></mat-option>\n            <mat-option\n                *ngFor=\"let option of filteredOptions\"\n                [value]=\"option\"\n                [title]=\"bindLabel ? option[bindLabel] : option\"\n            >\n                <span *ngIf=\"!optionTemplate\">{{ bindLabel ? option[bindLabel] : option }}</span>\n                <span *ngIf=\"optionTemplate\">\n                <ng-container *ngTemplateOutlet=\"optionTemplate; context:{option: option}\"></ng-container>\n            </span>\n            </mat-option>\n        </div>\n    </mat-select>\n    <mat-icon class=\"mat-select-clear\" *ngIf=\"isClearEnabled\">\n        <button\n            class=\"btn btn-basic-icon pr-0 pl-0\"\n            [matTooltip]=\"'BUTTON.DELETE'\"\n            (click)=\"clearValue($event)\">\n            <i class=\"icon-close\"></i>\n        </button>\n    </mat-icon>\n    <mat-error appScrollTo=\"\" *ngFor=\"let error of errors\">\n        {{ error.description }}\n    </mat-error>\n</mat-form-field>\n",
                    providers: [CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR],
                    encapsulation: ViewEncapsulation.Emulated,
                    styles: ["app-select .mat-select-placeholder{color:rgba(0,0,0,.6)}app-select .mat-select-value{padding-right:1rem}app-select .mat-select-arrow-wrapper{display:inline}app-select .mat-select-clear{position:absolute;z-index:1;right:.5rem;bottom:.35rem}app-select .mat-select-clear button{color:#989898}app-select .mat-select-clear button:hover{color:#13418f}app-select .mat-select-clear button i{font-size:14px}.app-select-panel{min-height:36px}.app-select-panel .mat-select-search{position:relative;top:0;left:0;right:0;padding:9px 16px;background-color:#fafafa;z-index:1}.app-select-panel .app-select__options{position:relative;overflow:auto;width:100%;max-height:100%}.app-select-panel .app-select__options--searchable{max-height:calc(100% - 35px)}.app-select-panel mat-option .mat-pseudo-checkbox{border:1px solid #d4d7d9}.app-select-panel mat-option .mat-pseudo-checkbox.mat-pseudo-checkbox-checked{border:1px solid #13418f}.app-select-panel mat-option .mat-pseudo-checkbox.mat-pseudo-checkbox-checked::after{top:1px;left:1px;height:6px;width:12px;border:none;box-shadow:-1.5px 1.5px 0 0 currentColor}"]
                }] }
    ];
    MatSelectComponent.propDecorators = {
        control: [{ type: Input }],
        options: [{ type: Input }],
        placeholder: [{ type: Input }],
        bindLabel: [{ type: Input }],
        bindBy: [{ type: Input }],
        bindValue: [{ type: Input }],
        clear: [{ type: Input }],
        disabled: [{ type: Input }],
        multiple: [{ type: Input }],
        errorStateMatcher: [{ type: Input }],
        errors: [{ type: Input }],
        optionTemplate: [{ type: ContentChild, args: [TemplateRef,] }],
        matSelect: [{ type: ViewChild, args: [MatSelect,] }],
        searchInput: [{ type: ViewChild, args: ['searchInput',] }]
    };
    return MatSelectComponent;
}());
export { MatSelectComponent };
if (false) {
    /** @type {?} */
    MatSelectComponent.prototype.control;
    /** @type {?} */
    MatSelectComponent.prototype.options;
    /** @type {?} */
    MatSelectComponent.prototype.placeholder;
    /** @type {?} */
    MatSelectComponent.prototype.bindLabel;
    /** @type {?} */
    MatSelectComponent.prototype.bindBy;
    /** @type {?} */
    MatSelectComponent.prototype.bindValue;
    /** @type {?} */
    MatSelectComponent.prototype.clear;
    /** @type {?} */
    MatSelectComponent.prototype.disabled;
    /** @type {?} */
    MatSelectComponent.prototype.multiple;
    /** @type {?} */
    MatSelectComponent.prototype.errorStateMatcher;
    /** @type {?} */
    MatSelectComponent.prototype.errors;
    /** @type {?} */
    MatSelectComponent.prototype.optionTemplate;
    /** @type {?} */
    MatSelectComponent.prototype.matSelect;
    /** @type {?} */
    MatSelectComponent.prototype.searchInput;
    /**
     * @type {?}
     * @private
     */
    MatSelectComponent.prototype.destroy$;
    /**
     * @type {?}
     * @private
     */
    MatSelectComponent.prototype.panelClosed$;
    /**
     * @type {?}
     * @private
     */
    MatSelectComponent.prototype.optionChanges$;
    /**
     * @type {?}
     * @private
     */
    MatSelectComponent.prototype.selectedOptions;
    /** @type {?} */
    MatSelectComponent.prototype.filteredOptions;
    /** @type {?} */
    MatSelectComponent.prototype.searchTerm;
    /**
     * @type {?}
     * @private
     */
    MatSelectComponent.prototype._onTouched;
    /**
     * @type {?}
     * @private
     */
    MatSelectComponent.prototype._onChange;
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LXNlbGVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbHNub3ZhL2FuZ3VsYXJtb2R1bGVzLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbWF0LXNlbGVjdC9tYXQtc2VsZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBSUwsV0FBVyxFQUNYLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF1QixXQUFXLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRixPQUFPLEVBQUMsaUJBQWlCLEVBQUUsU0FBUyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDL0QsT0FBTyxFQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUM3RSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzdCLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBR3pDLE1BQU0sS0FBTyxvQ0FBb0MsR0FBUTtJQUN2RCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLGtCQUFrQixFQUFsQixDQUFrQixDQUFDO0lBQ2pELEtBQUssRUFBRSxJQUFJO0NBQ1o7OztJQUdLLElBQUksR0FBRztBQUNiLENBQUM7OztJQUVLLDJCQUEyQixHQUFHLENBQUM7QUFFckM7SUFBQTtRQVFXLFlBQU8sR0FBZ0IsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUN6QyxZQUFPLEdBQVUsRUFBRSxDQUFDO1FBS3BCLFVBQUssR0FBRyxJQUFJLENBQUM7UUFDYixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGFBQVEsR0FBRyxLQUFLLENB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TCxLQUFLO2lDQUVMLFlBQVksU0FBQyxXQUFXOzRCQUN4QixTQUFTLFNBQUMsU0FBUzs4QkFDbkIsU0FBUyxTQUFDLGFBQWE7O0lBcU8xQix5QkFBQztDQUFBLEFBM1BELElBMlBDO1NBcFBZLGtCQUFrQjs7O0lBQzdCLHFDQUFrRDs7SUFDbEQscUNBQTZCOztJQUM3Qix5Q0FBNkI7O0lBQzdCLHVDQUEyQjs7SUFDM0Isb0NBQXdCOztJQUN4Qix1Q0FBMkI7O0lBQzNCLG1DQUFzQjs7SUFDdEIsc0NBQTBCOztJQUMxQixzQ0FBMEI7O0lBQzFCLCtDQUE4Qzs7SUFDOUMsb0NBQTRCOztJQUU1Qiw0Q0FBMEM7O0lBQzFDLHVDQUFnQzs7SUFDaEMseUNBQXNDOzs7OztJQUV0QyxzQ0FBaUM7Ozs7O0lBQ2pDLDBDQUFxQzs7Ozs7SUFDckMsNENBQXVDOzs7OztJQUN2Qyw2Q0FBb0M7O0lBQ3BDLDZDQUE4Qjs7SUFDOUIsd0NBQXVCOzs7OztJQUN2Qix3Q0FBc0M7Ozs7O0lBQ3RDLHVDQUFtQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBGb3JtQ29udHJvbCwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7RXJyb3JTdGF0ZU1hdGNoZXIsIE1hdFNlbGVjdH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHtET1dOX0FSUk9XLCBFTkQsIEVOVEVSLCBIT01FLCBVUF9BUlJPV30gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7U3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge3Rha2VVbnRpbH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vKiB0c2xpbnQ6ZGlzYWJsZTpuby11c2UtYmVmb3JlLWRlY2xhcmUgKi9cbmV4cG9ydCBjb25zdCBDVVNUT01fU0VMRUNUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1hdFNlbGVjdENvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuLyogdHNsaW50OmVuYWJsZTpuby11c2UtYmVmb3JlLWRlY2xhcmUgKi9cblxuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbmNvbnN0IFNFTEVDVF9TRUFSQ0hBQkxFX01JTl9MSU1JVCA9IDg7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xzbi1tYXQtc2VsZWN0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL21hdC1zZWxlY3QuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9tYXQtc2VsZWN0LmNvbXBvbmVudC5zY3NzJ10sXG4gIHByb3ZpZGVyczogW0NVU1RPTV9TRUxFQ1RfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLkVtdWxhdGVkXG59KVxuZXhwb3J0IGNsYXNzIE1hdFNlbGVjdENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgQElucHV0KCkgY29udHJvbDogRm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woKTtcbiAgQElucHV0KCkgb3B0aW9uczogYW55W10gPSBbXTtcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgQElucHV0KCkgYmluZExhYmVsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGJpbmRCeTogc3RyaW5nO1xuICBASW5wdXQoKSBiaW5kVmFsdWU6IHN0cmluZztcbiAgQElucHV0KCkgY2xlYXIgPSB0cnVlO1xuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBtdWx0aXBsZSA9IGZhbHNlO1xuICBASW5wdXQoKSBlcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXI7XG4gIEBJbnB1dCgpIGVycm9yczogYW55W10gPSBbXTtcblxuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSBvcHRpb25UZW1wbGF0ZTtcbiAgQFZpZXdDaGlsZChNYXRTZWxlY3QpIG1hdFNlbGVjdDtcbiAgQFZpZXdDaGlsZCgnc2VhcmNoSW5wdXQnKSBzZWFyY2hJbnB1dDtcblxuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3QoKTtcbiAgcHJpdmF0ZSBwYW5lbENsb3NlZCQgPSBuZXcgU3ViamVjdCgpO1xuICBwcml2YXRlIG9wdGlvbkNoYW5nZXMkID0gbmV3IFN1YmplY3QoKTtcbiAgcHJpdmF0ZSBzZWxlY3RlZE9wdGlvbnM6IGFueVtdID0gW107XG4gIHB1YmxpYyBmaWx0ZXJlZE9wdGlvbnM6IGFueVtdO1xuICBwdWJsaWMgc2VhcmNoVGVybSA9ICcnO1xuICBwcml2YXRlIF9vblRvdWNoZWQ6ICgpID0+IHZvaWQgPSBub29wO1xuICBwcml2YXRlIF9vbkNoYW5nZTogKHZhbHVlKSA9PiB2b2lkO1xuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucmVzZXRPcHRpb25zKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLmhhbmRsZURpc2FibGVkKCk7XG4gICAgdGhpcy5yZXNldE9wdGlvbnMoKTtcbiAgICB0aGlzLndyaXRlVmFsdWUodGhpcy5jb250cm9sLnZhbHVlKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICB9XG5cbiAgb25CbHVyKCkge1xuICAgIHRoaXMuX29uVG91Y2hlZCgpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKCF0aGlzLm11bHRpcGxlKSB7XG4gICAgICB0aGlzLnNldFNpbmdsZVZhbHVlKHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubXVsdGlwbGUgJiYgQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHRoaXMuc2V0TXVsdGlwbGVWYWx1ZSh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgc2V0U2luZ2xlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgY29uc29sZS53YXJuKCdbYXBwLXNlbGVjdF0gR2l2ZW4gdmFsdWUgaXMgYW4gYXJyYXkuIFNob3VsZCBgbXVsdGlwbGUgPSB0cnVlYD8nKTtcbiAgICB9XG4gICAgY29uc3QgY29ycmVzcG9uZGluZ09wdGlvbiA9IHRoaXMuZmluZE9wdGlvbih2YWx1ZSk7XG4gICAgdGhpcy5jaGFuZ2VWYWx1ZShjb3JyZXNwb25kaW5nT3B0aW9uKTtcbiAgfVxuXG4gIHNldE11bHRpcGxlVmFsdWUodmFsdWVzOiBhbnlbXSkge1xuICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25zID0gW107XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWVzKSkge1xuICAgICAgdmFsdWVzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGNvbnN0IGNvcnJlc3BvbmRpbmdPcHRpb24gPSB0aGlzLmZpbmRPcHRpb24oaXRlbSk7XG4gICAgICAgIGlmIChjb3JyZXNwb25kaW5nT3B0aW9uKSB7XG4gICAgICAgICAgdGhpcy5oYW5kbGVPcHRpb25TZWxlY3Rpb24oe1xuICAgICAgICAgICAgc2VsZWN0ZWQ6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogY29ycmVzcG9uZGluZ09wdGlvblxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5jaGFuZ2VWYWx1ZSh0aGlzLnNlbGVjdGVkT3B0aW9ucyk7XG4gIH1cblxuICBmaW5kT3B0aW9uKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgfHwgdmFsdWUgPT09IDAgfHwgdmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICBjb25zdCByZXN1bHQgPSB0aGlzLm9wdGlvbnMuZmluZCgob3B0aW9uKSA9PiB0aGlzLmJpbmRWYWx1ZVxuICAgICAgICA/IG9wdGlvblt0aGlzLmJpbmRWYWx1ZV0gPT09IHZhbHVlXG4gICAgICAgIDogdGhpcy5iaW5kQnlcbiAgICAgICAgICA/IG9wdGlvblt0aGlzLmJpbmRCeV0gPT09IHZhbHVlW3RoaXMuYmluZEJ5XVxuICAgICAgICAgIDogb3B0aW9uID09PSB2YWx1ZVxuICAgICAgKTtcbiAgICAgIHJldHVybiByZXN1bHQgfHwgdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBjaGFuZ2VWYWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuY29udHJvbC5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgaWYgKHRoaXMuX29uQ2hhbmdlKSB7XG4gICAgICBpZiAoIXRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgdGhpcy5fb25DaGFuZ2UodGhpcy5wYXJzZVZhbHVlKHZhbHVlKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLm1hcChpdGVtID0+IHRoaXMucGFyc2VWYWx1ZShpdGVtKSkgOiB2YWx1ZTtcbiAgICAgICAgdGhpcy5fb25DaGFuZ2UocmVzdWx0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwYXJzZVZhbHVlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdGhpcy5iaW5kVmFsdWUgPyB2YWx1ZVt0aGlzLmJpbmRWYWx1ZV0gOiB2YWx1ZTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMuX29uQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5fb25Ub3VjaGVkID0gZm47XG4gIH1cblxuICBiaW5kT3B0aW9uU2VsZWN0aW9uQ2hhbmdlcygpIHtcbiAgICB0aGlzLm1hdFNlbGVjdC5vcHRpb25TZWxlY3Rpb25DaGFuZ2VzXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5vcHRpb25DaGFuZ2VzJCB8fCB0aGlzLmRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgY29uc3Qge2lzVXNlcklucHV0LCBzb3VyY2V9ID0gcmVzO1xuICAgICAgICBpZiAoaXNVc2VySW5wdXQpIHtcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmhhbmRsZU9wdGlvblNlbGVjdGlvbihzb3VyY2UpO1xuICAgICAgICAgIGlmICghdGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTaW5nbGVWYWx1ZShyZXN1bHQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldE11bHRpcGxlVmFsdWUodGhpcy5zZWxlY3RlZE9wdGlvbnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgfVxuXG4gIGhhbmRsZU9wdGlvblNlbGVjdGlvbihldmVudCkge1xuICAgIGNvbnN0IHt2YWx1ZSwgc2VsZWN0ZWR9ID0gZXZlbnQ7XG4gICAgaWYgKCF0aGlzLm11bHRpcGxlKSB7XG4gICAgICByZXR1cm4gc2VsZWN0ZWRcbiAgICAgICAgPyB0aGlzLnBhcnNlVmFsdWUodmFsdWUpXG4gICAgICAgIDogdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvbnMucHVzaCh2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBfcmVtb3ZlKHRoaXMuc2VsZWN0ZWRPcHRpb25zLCAoaXRlbSkgPT4ge1xuICAgICAgICAvLyAgIHJldHVybiB0aGlzLmJpbmRWYWx1ZSA/IGl0ZW1bdGhpcy5iaW5kVmFsdWVdID09PSB2YWx1ZVt0aGlzLmJpbmRWYWx1ZV0gOiBpdGVtID09PSB2YWx1ZTtcbiAgICAgICAgLy8gfSk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25zID0gdGhpcy5zZWxlY3RlZE9wdGlvbnMuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuYmluZFZhbHVlID8gaXRlbVt0aGlzLmJpbmRWYWx1ZV0gIT09IHZhbHVlW3RoaXMuYmluZFZhbHVlXSA6IGl0ZW0gIT09IHZhbHVlO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuc2VsZWN0ZWRPcHRpb25zLm1hcChpdGVtID0+IHRoaXMucGFyc2VWYWx1ZShpdGVtKSk7XG4gICAgICByZXR1cm4gQXJyYXkuaXNBcnJheShyZXN1bHQpICYmIHJlc3VsdC5sZW5ndGggPyByZXN1bHQgOiB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgcmVzZXRPcHRpb25zKCkge1xuICAgIHRoaXMuc2VhcmNoVGVybSA9ICcnO1xuICAgIHRoaXMuZmlsdGVyZWRPcHRpb25zID0gWy4uLnRoaXMub3B0aW9uc107XG4gICAgdGhpcy5vcHRpb25DaGFuZ2VzJC5uZXh0KCk7XG4gICAgdGhpcy5iaW5kT3B0aW9uU2VsZWN0aW9uQ2hhbmdlcygpO1xuICB9XG5cbiAgY2xlYXJWYWx1ZSgkZXZlbnQpIHtcbiAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5zZWxlY3RlZE9wdGlvbnMgPSBbXTtcbiAgICB0aGlzLmNoYW5nZVZhbHVlKHVuZGVmaW5lZCk7XG4gIH1cblxuICBmaWx0ZXJPcHRpb25zKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLnNlYXJjaFRlcm0pIHtcbiAgICAgIHRoaXMuc2VhcmNoVGVybSA9IHZhbHVlO1xuICAgICAgdGhpcy5maWx0ZXJlZE9wdGlvbnMgPVxuICAgICAgICB0aGlzLm9wdGlvbnMuZmlsdGVyKGl0ZW0gPT4ge1xuICAgICAgICAgIGlmICh0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLnRvTG9jYWxlVXBwZXJDYXNlKCkuaW5kZXhPZih0aGlzLnNlYXJjaFRlcm0udG9Mb2NhbGVVcHBlckNhc2UoKSkgIT09IC0xO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBvcHRpb25WYWx1ZXMgPSBPYmplY3QudmFsdWVzKGl0ZW0pO1xuICAgICAgICAgIHJldHVybiBvcHRpb25WYWx1ZXMuc29tZSgob3B0aW9uVmFsdWU6IHN0cmluZykgPT5cbiAgICAgICAgICAgIHR5cGVvZiBvcHRpb25WYWx1ZSA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgICYmIG9wdGlvblZhbHVlLnRvTG9jYWxlVXBwZXJDYXNlKCkuaW5kZXhPZih0aGlzLnNlYXJjaFRlcm0udG9Mb2NhbGVVcHBlckNhc2UoKSkgPiAtMSk7XG4gICAgICAgIH0pO1xuICAgICAgdGhpcy5tYXRTZWxlY3QuX2tleU1hbmFnZXIuc2V0Rmlyc3RJdGVtQWN0aXZlKCk7XG5cbiAgICAgIHRoaXMub3B0aW9uQ2hhbmdlcyQubmV4dCgpO1xuICAgICAgdGhpcy5iaW5kT3B0aW9uU2VsZWN0aW9uQ2hhbmdlcygpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBpc1NlYXJjaEVuYWJsZWQoKSB7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodGhpcy5vcHRpb25zKSAmJiB0aGlzLm9wdGlvbnMubGVuZ3RoID4gU0VMRUNUX1NFQVJDSEFCTEVfTUlOX0xJTUlUO1xuICB9XG5cbiAgZ2V0IGlzQ2xlYXJFbmFibGVkKCkge1xuICAgIHJldHVybiB0aGlzLmNsZWFyICYmIHRoaXMuY29udHJvbC52YWx1ZSAmJiAhdGhpcy5kaXNhYmxlZFxuICAgICAgJiYgKFxuICAgICAgICAodGhpcy5tdWx0aXBsZSAmJiBBcnJheS5pc0FycmF5KHRoaXMuY29udHJvbC52YWx1ZSkgJiYgdGhpcy5jb250cm9sLnZhbHVlLmxlbmd0aClcbiAgICAgICAgfHwgIXRoaXMubXVsdGlwbGVcbiAgICAgICk7XG4gIH1cblxuICBoYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKHRoaXMuaXNTZWFyY2hFbmFibGVkICYmIFtET1dOX0FSUk9XLCBFTkQsIEVOVEVSLCBIT01FLCBVUF9BUlJPV10uaW5kZXhPZihldmVudC5rZXlDb2RlKSA9PT0gLTEpIHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZURpc2FibGVkKCkge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLmNvbnRyb2wuZGlzYWJsZSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmNvbnRyb2wuZW5hYmxlKCk7XG4gIH1cblxuICBzY3JvbGxUb0FjdGl2ZUl0ZW0oKSB7XG4gICAgY29uc3QgYWN0aXZlSXRlbSA9IHRoaXMubWF0U2VsZWN0Ll9rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW07XG4gICAgaWYgKCFhY3RpdmVJdGVtKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG9wdGlvbiA9IGFjdGl2ZUl0ZW0uX2VsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCBwYXJlbnQgPSBvcHRpb24ucGFyZW50Tm9kZTtcbiAgICBpZiAob3B0aW9uLm9mZnNldFRvcCArIG9wdGlvbi5vZmZzZXRIZWlnaHQgPiBwYXJlbnQuc2Nyb2xsVG9wICsgcGFyZW50Lm9mZnNldEhlaWdodCkge1xuICAgICAgcGFyZW50LnNjcm9sbFRvcCA9IG9wdGlvbi5vZmZzZXRUb3AgLSBwYXJlbnQub2Zmc2V0SGVpZ2h0ICsgb3B0aW9uLm9mZnNldEhlaWdodDtcbiAgICB9IGVsc2UgaWYgKG9wdGlvbi5vZmZzZXRUb3AgPCBwYXJlbnQuc2Nyb2xsVG9wKSB7XG4gICAgICBwYXJlbnQuc2Nyb2xsVG9wID0gb3B0aW9uLm9mZnNldFRvcDtcbiAgICB9XG4gIH1cblxuICBvcGVuZWRDaGFuZ2UoaXNPcGVuKSB7XG4gICAgaWYgKGlzT3Blbikge1xuICAgICAgaWYgKHRoaXMuaXNTZWFyY2hFbmFibGVkKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoSW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgfVxuICAgICAgdGhpcy5vcHRpb25DaGFuZ2VzJC5uZXh0KCk7XG4gICAgICB0aGlzLmJpbmRPcHRpb25TZWxlY3Rpb25DaGFuZ2VzKCk7XG4gICAgICB0aGlzLnNjcm9sbFRvQWN0aXZlSXRlbSgpO1xuICAgICAgY29uc3Qga2V5TWFuYWdlckNoYW5nZSA9IHRoaXMubWF0U2VsZWN0Ll9rZXlNYW5hZ2VyLmNoYW5nZTtcbiAgICAgIGtleU1hbmFnZXJDaGFuZ2VcbiAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMucGFuZWxDbG9zZWQkKSlcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5zY3JvbGxUb0FjdGl2ZUl0ZW0oKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGFuZWxDbG9zZWQkLm5leHQoKTtcbiAgICAgIHRoaXMucmVzZXRPcHRpb25zKCk7XG4gICAgfVxuICB9XG59XG4iXX0=