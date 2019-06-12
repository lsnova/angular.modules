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
            console.warn('[lsn-mat-select] Given value is an array. Should `multiple = true`?');
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
        if (!Array.isArray(this.options)) {
            this.options = [];
        }
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
    Object.defineProperty(MatSelectComponent.prototype, "errorList", {
        get: /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (Array.isArray(this.errors) && this.errors.length) {
                return this.errors.map(function (item) {
                    return _this.errorLabel ? item[_this.errorLabel] : item;
                });
            }
            if (this.control.errors) {
                return Object.values(this.control.errors);
            }
        },
        enumerable: true,
        configurable: true
    });
    MatSelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'lsn-mat-select',
                    template: "<mat-form-field>\n  <mat-select\n    [formControl]=\"control\"\n    [placeholder]=\"placeholder\"\n    [errorStateMatcher]=\"errorStateMatcher\"\n    [multiple]=\"multiple\"\n    [disableOptionCentering]=\"true\"\n    panelClass=\"lsn-mat-select-panel\"\n    (blur)=\"onBlur()\"\n    (openedChange)=\"openedChange($event)\"\n  >\n    <input\n      #searchInput\n      *ngIf=\"isSearchEnabled\"\n      type=\"text\"\n      class=\"input-filter mat-select-search mat-input-element\"\n      autocomplete=\"off\"\n      [ngModel]=\"searchTerm\"\n      (ngModelChange)=\"filterOptions($event)\"\n      [placeholder]=\"placeholder\"\n      (keydown)=\"handleKeydown($event)\"\n    />\n    <div [ngClass]=\"{'lsn-mat-select__options': true, 'lsn-mat-select__options--searchable': isSearchEnabled}\">\n      <mat-option *ngIf=\"!options.length\"></mat-option>\n      <mat-option\n        *ngFor=\"let option of filteredOptions\"\n        [value]=\"option\"\n        [title]=\"bindLabel ? option[bindLabel] : option\"\n      >\n        <span *ngIf=\"!optionTemplate\">{{ bindLabel ? option[bindLabel] : option }}</span>\n        <span *ngIf=\"optionTemplate\">\n          <ng-container *ngTemplateOutlet=\"optionTemplate; context:{option: option}\"></ng-container>\n        </span>\n      </mat-option>\n    </div>\n  </mat-select>\n  <mat-icon class=\"mat-select-clear\" *ngIf=\"isClearEnabled\">\n    <button\n      class=\"mat-select-clear-btn\"\n      [matTooltip]=\"clearLabel\"\n      (click)=\"clearValue($event)\">\n      <i class=\"mat-select-clear-btn-icon\"></i>\n    </button>\n  </mat-icon>\n  <mat-error *ngFor=\"let error of errorList\">\n    {{ error }}\n  </mat-error>\n</mat-form-field>\n",
                    providers: [CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR],
                    encapsulation: ViewEncapsulation.None,
                    styles: ["lsn-mat-select .mat-select-placeholder{color:rgba(0,0,0,.6)}lsn-mat-select .mat-select-value{padding-right:1rem}lsn-mat-select .mat-select-clear{position:absolute;z-index:1;right:.6rem;bottom:.1rem}lsn-mat-select .mat-select-clear button.mat-select-clear-btn{color:#989898;opacity:.5;border:none;padding:.3rem .2rem;cursor:pointer;outline:0}lsn-mat-select .mat-select-clear button.mat-select-clear-btn:hover{opacity:1}lsn-mat-select .mat-select-clear button.mat-select-clear-btn .mat-select-clear-btn-icon{display:inline-block;width:12px;height:12px}lsn-mat-select .mat-select-clear button.mat-select-clear-btn .mat-select-clear-btn-icon::after,lsn-mat-select .mat-select-clear button.mat-select-clear-btn .mat-select-clear-btn-icon::before{position:absolute;left:.5rem;content:\" \";height:13px;width:1px;background-color:#333}lsn-mat-select .mat-select-clear button.mat-select-clear-btn .mat-select-clear-btn-icon::before{-webkit-transform:rotate(45deg);transform:rotate(45deg)}lsn-mat-select .mat-select-clear button.mat-select-clear-btn .mat-select-clear-btn-icon::after{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.lsn-mat-select-panel{min-height:36px}.lsn-mat-select-panel .mat-select-search{font-family:Roboto,\"Helvetica Neue\",sans-serif;box-sizing:border-box;position:relative;width:100%;padding:9px 16px;background-color:#fafafa;z-index:1}.lsn-mat-select-panel .lsn-mat-select__options{position:relative;overflow:auto;width:100%;max-height:100%}.lsn-mat-select-panel .lsn-mat-select__options--searchable{max-height:calc(100% - 35px)}.lsn-mat-select-panel mat-option .mat-pseudo-checkbox{border:1px solid #d4d7d9}.lsn-mat-select-panel mat-option .mat-pseudo-checkbox.mat-pseudo-checkbox-checked{border:1px solid #13418f}.lsn-mat-select-panel mat-option .mat-pseudo-checkbox.mat-pseudo-checkbox-checked::after{top:1px;left:1px;height:6px;width:12px;border:none;box-shadow:-1.5px 1.5px 0 0 currentColor}"]
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
        clearLabel: [{ type: Input }],
        disabled: [{ type: Input }],
        multiple: [{ type: Input }],
        errorStateMatcher: [{ type: Input }],
        errors: [{ type: Input }],
        errorLabel: [{ type: Input }],
        optionTemplate: [{ type: ContentChild, args: [TemplateRef, { static: false },] }],
        matSelect: [{ type: ViewChild, args: [MatSelect, { static: true },] }],
        searchInput: [{ type: ViewChild, args: ['searchInput', { static: false },] }]
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
    MatSelectComponent.prototype.clearLabel;
    /** @type {?} */
    MatSelectComponent.prototype.disabled;
    /** @type {?} */
    MatSelectComponent.prototype.multiple;
    /** @type {?} */
    MatSelectComponent.prototype.errorStateMatcher;
    /** @type {?} */
    MatSelectComponent.prototype.errors;
    /** @type {?} */
    MatSelectComponent.prototype.errorLabel;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LXNlbGVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbHNub3ZhL2FuZ3VsYXJtb2R1bGVzLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbWF0LXNlbGVjdC9tYXQtc2VsZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBSUwsV0FBVyxFQUNYLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF1QixXQUFXLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRixPQUFPLEVBQUMsaUJBQWlCLEVBQUUsU0FBUyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDL0QsT0FBTyxFQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUM3RSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzdCLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBR3pDLE1BQU0sS0FBTyxvQ0FBb0MsR0FBUTtJQUN2RCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLGtCQUFrQixFQUFsQixDQUFrQixDQUFDO0lBQ2pELEtBQUssRUFBRSxJQUFJO0NBQ1o7OztJQUdLLElBQUksR0FBRztBQUNiLENBQUM7OztJQUVLLDJCQUEyQixHQUFHLENBQUM7QUFFckM7SUFBQTtRQVFXLFlBQU8sR0FBZ0IsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUN6QyxZQUFPLEdBQVUsRUFBRSxDQUFDO1FBS3BCLFVBQUssR0FBRyxJQUFJLENBQUM7UUFFYixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGFBQVEsR0FBRyxLQUFLLENB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OztJQUU1Qiw0Q0FBMkQ7O0lBQzNELHVDQUFrRDs7SUFDbEQseUNBQXlEOzs7OztJQUV6RCxzQ0FBaUM7Ozs7O0lBQ2pDLDBDQUFxQzs7Ozs7SUFDckMsNENBQXVDOzs7OztJQUN2Qyw2Q0FBb0M7O0lBQ3BDLDZDQUE4Qjs7SUFDOUIsd0NBQXVCOzs7OztJQUN2Qix3Q0FBc0M7Ozs7O0lBQ3RDLHVDQUFtQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBGb3JtQ29udHJvbCwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7RXJyb3JTdGF0ZU1hdGNoZXIsIE1hdFNlbGVjdH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHtET1dOX0FSUk9XLCBFTkQsIEVOVEVSLCBIT01FLCBVUF9BUlJPV30gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7U3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge3Rha2VVbnRpbH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vKiB0c2xpbnQ6ZGlzYWJsZTpuby11c2UtYmVmb3JlLWRlY2xhcmUgKi9cbmV4cG9ydCBjb25zdCBDVVNUT01fU0VMRUNUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1hdFNlbGVjdENvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuLyogdHNsaW50OmVuYWJsZTpuby11c2UtYmVmb3JlLWRlY2xhcmUgKi9cblxuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbmNvbnN0IFNFTEVDVF9TRUFSQ0hBQkxFX01JTl9MSU1JVCA9IDg7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xzbi1tYXQtc2VsZWN0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL21hdC1zZWxlY3QuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9tYXQtc2VsZWN0LmNvbXBvbmVudC5zY3NzJ10sXG4gIHByb3ZpZGVyczogW0NVU1RPTV9TRUxFQ1RfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgTWF0U2VsZWN0Q29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBjb250cm9sOiBGb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgpO1xuICBASW5wdXQoKSBvcHRpb25zOiBhbnlbXSA9IFtdO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICBASW5wdXQoKSBiaW5kTGFiZWw6IHN0cmluZztcbiAgQElucHV0KCkgYmluZEJ5OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGJpbmRWYWx1ZTogc3RyaW5nO1xuICBASW5wdXQoKSBjbGVhciA9IHRydWU7XG4gIEBJbnB1dCgpIGNsZWFyTGFiZWw6IHN0cmluZztcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgbXVsdGlwbGUgPSBmYWxzZTtcbiAgQElucHV0KCkgZXJyb3JTdGF0ZU1hdGNoZXI6IEVycm9yU3RhdGVNYXRjaGVyO1xuICBASW5wdXQoKSBlcnJvcnM6IGFueVtdID0gW107XG4gIEBJbnB1dCgpIGVycm9yTGFiZWw6IHN0cmluZztcblxuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmLCB7c3RhdGljOiBmYWxzZX0pIG9wdGlvblRlbXBsYXRlO1xuICBAVmlld0NoaWxkKE1hdFNlbGVjdCwgeyBzdGF0aWM6IHRydWUgfSkgbWF0U2VsZWN0O1xuICBAVmlld0NoaWxkKCdzZWFyY2hJbnB1dCcsIHsgc3RhdGljOiBmYWxzZSB9KSBzZWFyY2hJbnB1dDtcblxuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3QoKTtcbiAgcHJpdmF0ZSBwYW5lbENsb3NlZCQgPSBuZXcgU3ViamVjdCgpO1xuICBwcml2YXRlIG9wdGlvbkNoYW5nZXMkID0gbmV3IFN1YmplY3QoKTtcbiAgcHJpdmF0ZSBzZWxlY3RlZE9wdGlvbnM6IGFueVtdID0gW107XG4gIHB1YmxpYyBmaWx0ZXJlZE9wdGlvbnM6IGFueVtdO1xuICBwdWJsaWMgc2VhcmNoVGVybSA9ICcnO1xuICBwcml2YXRlIF9vblRvdWNoZWQ6ICgpID0+IHZvaWQgPSBub29wO1xuICBwcml2YXRlIF9vbkNoYW5nZTogKHZhbHVlKSA9PiB2b2lkO1xuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucmVzZXRPcHRpb25zKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLmhhbmRsZURpc2FibGVkKCk7XG4gICAgdGhpcy5yZXNldE9wdGlvbnMoKTtcbiAgICB0aGlzLndyaXRlVmFsdWUodGhpcy5jb250cm9sLnZhbHVlKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICB9XG5cbiAgb25CbHVyKCkge1xuICAgIHRoaXMuX29uVG91Y2hlZCgpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKCF0aGlzLm11bHRpcGxlKSB7XG4gICAgICB0aGlzLnNldFNpbmdsZVZhbHVlKHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubXVsdGlwbGUgJiYgQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHRoaXMuc2V0TXVsdGlwbGVWYWx1ZSh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgc2V0U2luZ2xlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgY29uc29sZS53YXJuKCdbbHNuLW1hdC1zZWxlY3RdIEdpdmVuIHZhbHVlIGlzIGFuIGFycmF5LiBTaG91bGQgYG11bHRpcGxlID0gdHJ1ZWA/Jyk7XG4gICAgfVxuICAgIGNvbnN0IGNvcnJlc3BvbmRpbmdPcHRpb24gPSB0aGlzLmZpbmRPcHRpb24odmFsdWUpO1xuICAgIHRoaXMuY2hhbmdlVmFsdWUoY29ycmVzcG9uZGluZ09wdGlvbik7XG4gIH1cblxuICBzZXRNdWx0aXBsZVZhbHVlKHZhbHVlczogYW55W10pIHtcbiAgICB0aGlzLnNlbGVjdGVkT3B0aW9ucyA9IFtdO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlcykpIHtcbiAgICAgIHZhbHVlcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBjb25zdCBjb3JyZXNwb25kaW5nT3B0aW9uID0gdGhpcy5maW5kT3B0aW9uKGl0ZW0pO1xuICAgICAgICBpZiAoY29ycmVzcG9uZGluZ09wdGlvbikge1xuICAgICAgICAgIHRoaXMuaGFuZGxlT3B0aW9uU2VsZWN0aW9uKHtcbiAgICAgICAgICAgIHNlbGVjdGVkOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IGNvcnJlc3BvbmRpbmdPcHRpb25cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuY2hhbmdlVmFsdWUodGhpcy5zZWxlY3RlZE9wdGlvbnMpO1xuICB9XG5cbiAgZmluZE9wdGlvbih2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlIHx8IHZhbHVlID09PSAwIHx8IHZhbHVlID09PSBmYWxzZSkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5vcHRpb25zLmZpbmQoKG9wdGlvbikgPT4gdGhpcy5iaW5kVmFsdWVcbiAgICAgICAgPyBvcHRpb25bdGhpcy5iaW5kVmFsdWVdID09PSB2YWx1ZVxuICAgICAgICA6IHRoaXMuYmluZEJ5XG4gICAgICAgICAgPyBvcHRpb25bdGhpcy5iaW5kQnldID09PSB2YWx1ZVt0aGlzLmJpbmRCeV1cbiAgICAgICAgICA6IG9wdGlvbiA9PT0gdmFsdWVcbiAgICAgICk7XG4gICAgICByZXR1cm4gcmVzdWx0IHx8IHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgY2hhbmdlVmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLmNvbnRyb2wuc2V0VmFsdWUodmFsdWUpO1xuICAgIGlmICh0aGlzLl9vbkNoYW5nZSkge1xuICAgICAgaWYgKCF0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgIHRoaXMuX29uQ2hhbmdlKHRoaXMucGFyc2VWYWx1ZSh2YWx1ZSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5tYXAoaXRlbSA9PiB0aGlzLnBhcnNlVmFsdWUoaXRlbSkpIDogdmFsdWU7XG4gICAgICAgIHRoaXMuX29uQ2hhbmdlKHJlc3VsdCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcGFyc2VWYWx1ZSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHRoaXMuYmluZFZhbHVlID8gdmFsdWVbdGhpcy5iaW5kVmFsdWVdIDogdmFsdWU7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLl9vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMuX29uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgYmluZE9wdGlvblNlbGVjdGlvbkNoYW5nZXMoKSB7XG4gICAgdGhpcy5tYXRTZWxlY3Qub3B0aW9uU2VsZWN0aW9uQ2hhbmdlc1xuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMub3B0aW9uQ2hhbmdlcyQgfHwgdGhpcy5kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgIGNvbnN0IHtpc1VzZXJJbnB1dCwgc291cmNlfSA9IHJlcztcbiAgICAgICAgaWYgKGlzVXNlcklucHV0KSB7XG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5oYW5kbGVPcHRpb25TZWxlY3Rpb24oc291cmNlKTtcbiAgICAgICAgICBpZiAoIXRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U2luZ2xlVmFsdWUocmVzdWx0KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRNdWx0aXBsZVZhbHVlKHRoaXMuc2VsZWN0ZWRPcHRpb25zKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gIH1cblxuICBoYW5kbGVPcHRpb25TZWxlY3Rpb24oZXZlbnQpIHtcbiAgICBjb25zdCB7dmFsdWUsIHNlbGVjdGVkfSA9IGV2ZW50O1xuICAgIGlmICghdGhpcy5tdWx0aXBsZSkge1xuICAgICAgcmV0dXJuIHNlbGVjdGVkXG4gICAgICAgID8gdGhpcy5wYXJzZVZhbHVlKHZhbHVlKVxuICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25zLnB1c2godmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvbnMgPSB0aGlzLnNlbGVjdGVkT3B0aW9ucy5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5iaW5kVmFsdWUgPyBpdGVtW3RoaXMuYmluZFZhbHVlXSAhPT0gdmFsdWVbdGhpcy5iaW5kVmFsdWVdIDogaXRlbSAhPT0gdmFsdWU7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5zZWxlY3RlZE9wdGlvbnMubWFwKGl0ZW0gPT4gdGhpcy5wYXJzZVZhbHVlKGl0ZW0pKTtcbiAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHJlc3VsdCkgJiYgcmVzdWx0Lmxlbmd0aCA/IHJlc3VsdCA6IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICByZXNldE9wdGlvbnMoKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHRoaXMub3B0aW9ucykpIHtcbiAgICAgIHRoaXMub3B0aW9ucyA9IFtdO1xuICAgIH1cbiAgICB0aGlzLnNlYXJjaFRlcm0gPSAnJztcbiAgICB0aGlzLmZpbHRlcmVkT3B0aW9ucyA9IFsuLi50aGlzLm9wdGlvbnNdO1xuICAgIHRoaXMub3B0aW9uQ2hhbmdlcyQubmV4dCgpO1xuICAgIHRoaXMuYmluZE9wdGlvblNlbGVjdGlvbkNoYW5nZXMoKTtcbiAgfVxuXG4gIGNsZWFyVmFsdWUoJGV2ZW50KSB7XG4gICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25zID0gW107XG4gICAgdGhpcy5jaGFuZ2VWYWx1ZSh1bmRlZmluZWQpO1xuICB9XG5cbiAgZmlsdGVyT3B0aW9ucyh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5zZWFyY2hUZXJtKSB7XG4gICAgICB0aGlzLnNlYXJjaFRlcm0gPSB2YWx1ZTtcbiAgICAgIHRoaXMuZmlsdGVyZWRPcHRpb25zID1cbiAgICAgICAgdGhpcy5vcHRpb25zLmZpbHRlcihpdGVtID0+IHtcbiAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS50b0xvY2FsZVVwcGVyQ2FzZSgpLmluZGV4T2YodGhpcy5zZWFyY2hUZXJtLnRvTG9jYWxlVXBwZXJDYXNlKCkpICE9PSAtMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3Qgb3B0aW9uVmFsdWVzID0gT2JqZWN0LnZhbHVlcyhpdGVtKTtcbiAgICAgICAgICByZXR1cm4gb3B0aW9uVmFsdWVzLnNvbWUoKG9wdGlvblZhbHVlOiBzdHJpbmcpID0+XG4gICAgICAgICAgICB0eXBlb2Ygb3B0aW9uVmFsdWUgPT09ICdzdHJpbmcnXG4gICAgICAgICAgICAmJiBvcHRpb25WYWx1ZS50b0xvY2FsZVVwcGVyQ2FzZSgpLmluZGV4T2YodGhpcy5zZWFyY2hUZXJtLnRvTG9jYWxlVXBwZXJDYXNlKCkpID4gLTEpO1xuICAgICAgICB9KTtcbiAgICAgIHRoaXMubWF0U2VsZWN0Ll9rZXlNYW5hZ2VyLnNldEZpcnN0SXRlbUFjdGl2ZSgpO1xuXG4gICAgICB0aGlzLm9wdGlvbkNoYW5nZXMkLm5leHQoKTtcbiAgICAgIHRoaXMuYmluZE9wdGlvblNlbGVjdGlvbkNoYW5nZXMoKTtcbiAgICB9XG4gIH1cblxuICBnZXQgaXNTZWFyY2hFbmFibGVkKCkge1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KHRoaXMub3B0aW9ucykgJiYgdGhpcy5vcHRpb25zLmxlbmd0aCA+IFNFTEVDVF9TRUFSQ0hBQkxFX01JTl9MSU1JVDtcbiAgfVxuXG4gIGdldCBpc0NsZWFyRW5hYmxlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5jbGVhciAmJiB0aGlzLmNvbnRyb2wudmFsdWUgJiYgIXRoaXMuZGlzYWJsZWRcbiAgICAgICYmIChcbiAgICAgICAgKHRoaXMubXVsdGlwbGUgJiYgQXJyYXkuaXNBcnJheSh0aGlzLmNvbnRyb2wudmFsdWUpICYmIHRoaXMuY29udHJvbC52YWx1ZS5sZW5ndGgpXG4gICAgICAgIHx8ICF0aGlzLm11bHRpcGxlXG4gICAgICApO1xuICB9XG5cbiAgaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmICh0aGlzLmlzU2VhcmNoRW5hYmxlZCAmJiBbRE9XTl9BUlJPVywgRU5ELCBFTlRFUiwgSE9NRSwgVVBfQVJST1ddLmluZGV4T2YoZXZlbnQua2V5Q29kZSkgPT09IC0xKSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVEaXNhYmxlZCgpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5jb250cm9sLmRpc2FibGUoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jb250cm9sLmVuYWJsZSgpO1xuICB9XG5cbiAgc2Nyb2xsVG9BY3RpdmVJdGVtKCkge1xuICAgIGNvbnN0IGFjdGl2ZUl0ZW0gPSB0aGlzLm1hdFNlbGVjdC5fa2V5TWFuYWdlci5hY3RpdmVJdGVtO1xuICAgIGlmICghYWN0aXZlSXRlbSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBvcHRpb24gPSBhY3RpdmVJdGVtLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3QgcGFyZW50ID0gb3B0aW9uLnBhcmVudE5vZGU7XG4gICAgaWYgKG9wdGlvbi5vZmZzZXRUb3AgKyBvcHRpb24ub2Zmc2V0SGVpZ2h0ID4gcGFyZW50LnNjcm9sbFRvcCArIHBhcmVudC5vZmZzZXRIZWlnaHQpIHtcbiAgICAgIHBhcmVudC5zY3JvbGxUb3AgPSBvcHRpb24ub2Zmc2V0VG9wIC0gcGFyZW50Lm9mZnNldEhlaWdodCArIG9wdGlvbi5vZmZzZXRIZWlnaHQ7XG4gICAgfSBlbHNlIGlmIChvcHRpb24ub2Zmc2V0VG9wIDwgcGFyZW50LnNjcm9sbFRvcCkge1xuICAgICAgcGFyZW50LnNjcm9sbFRvcCA9IG9wdGlvbi5vZmZzZXRUb3A7XG4gICAgfVxuICB9XG5cbiAgb3BlbmVkQ2hhbmdlKGlzT3Blbikge1xuICAgIGlmIChpc09wZW4pIHtcbiAgICAgIGlmICh0aGlzLmlzU2VhcmNoRW5hYmxlZCkge1xuICAgICAgICB0aGlzLnNlYXJjaElucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMub3B0aW9uQ2hhbmdlcyQubmV4dCgpO1xuICAgICAgdGhpcy5iaW5kT3B0aW9uU2VsZWN0aW9uQ2hhbmdlcygpO1xuICAgICAgdGhpcy5zY3JvbGxUb0FjdGl2ZUl0ZW0oKTtcbiAgICAgIGNvbnN0IGtleU1hbmFnZXJDaGFuZ2UgPSB0aGlzLm1hdFNlbGVjdC5fa2V5TWFuYWdlci5jaGFuZ2U7XG4gICAgICBrZXlNYW5hZ2VyQ2hhbmdlXG4gICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLnBhbmVsQ2xvc2VkJCkpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuc2Nyb2xsVG9BY3RpdmVJdGVtKCk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhbmVsQ2xvc2VkJC5uZXh0KCk7XG4gICAgICB0aGlzLnJlc2V0T3B0aW9ucygpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBlcnJvckxpc3QoKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5lcnJvcnMpICYmIHRoaXMuZXJyb3JzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMuZXJyb3JzLm1hcChpdGVtID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3JMYWJlbCA/IGl0ZW1bdGhpcy5lcnJvckxhYmVsXSA6IGl0ZW07XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY29udHJvbC5lcnJvcnMpIHtcbiAgICAgIHJldHVybiBPYmplY3QudmFsdWVzKHRoaXMuY29udHJvbC5lcnJvcnMpO1xuICAgIH1cbiAgfVxufVxuIl19