/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ContentChild, forwardRef, Input, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ErrorStateMatcher, MatSelect } from '@angular/material';
import { DOWN_ARROW, END, ENTER, HOME, UP_ARROW } from '@angular/cdk/keycodes';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
/* tslint:disable:no-use-before-declare */
/** @type {?} */
export const CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MatSelectComponent),
    multi: true
};
/* tslint:enable:no-use-before-declare */
/** @type {?} */
const noop = () => {
};
const ɵ0 = noop;
/** @type {?} */
const SELECT_SEARCHABLE_MIN_LIMIT = 8;
export class MatSelectComponent {
    constructor() {
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
    ngOnInit() {
        this.resetOptions();
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this.handleDisabled();
        this.resetOptions();
        this.writeValue(this.control.value);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroy$.next();
    }
    /**
     * @return {?}
     */
    onBlur() {
        this._onTouched();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (!this.multiple) {
            this.setSingleValue(value);
        }
        else if (this.multiple && Array.isArray(value)) {
            this.setMultipleValue(value);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setSingleValue(value) {
        if (Array.isArray(value)) {
            console.warn('[app-select] Given value is an array. Should `multiple = true`?');
        }
        /** @type {?} */
        const correspondingOption = this.findOption(value);
        this.changeValue(correspondingOption);
    }
    /**
     * @param {?} values
     * @return {?}
     */
    setMultipleValue(values) {
        this.selectedOptions = [];
        if (Array.isArray(values)) {
            values.forEach(item => {
                /** @type {?} */
                const correspondingOption = this.findOption(item);
                if (correspondingOption) {
                    this.handleOptionSelection({
                        selected: true,
                        value: correspondingOption
                    });
                }
            });
        }
        this.changeValue(this.selectedOptions);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    findOption(value) {
        if (value || value === 0 || value === false) {
            /** @type {?} */
            const result = this.options.find((option) => this.bindValue
                ? option[this.bindValue] === value
                : this.bindBy
                    ? option[this.bindBy] === value[this.bindBy]
                    : option === value);
            return result || value;
        }
        return undefined;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    changeValue(value) {
        this.control.setValue(value);
        if (this._onChange) {
            if (!this.multiple) {
                this._onChange(this.parseValue(value));
            }
            else {
                /** @type {?} */
                const result = Array.isArray(value) ? value.map(item => this.parseValue(item)) : value;
                this._onChange(result);
            }
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    parseValue(value) {
        return value !== undefined && value !== null && this.bindValue ? value[this.bindValue] : value;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this._onChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    /**
     * @return {?}
     */
    bindOptionSelectionChanges() {
        this.matSelect.optionSelectionChanges
            .pipe(takeUntil(this.optionChanges$ || this.destroy$))
            .subscribe(res => {
            const { isUserInput, source } = res;
            if (isUserInput) {
                /** @type {?} */
                const result = this.handleOptionSelection(source);
                if (!this.multiple) {
                    this.setSingleValue(result);
                }
                else {
                    this.setMultipleValue(this.selectedOptions);
                }
            }
        });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleOptionSelection(event) {
        const { value, selected } = event;
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
                this.selectedOptions = this.selectedOptions.filter((item) => {
                    return this.bindValue ? item[this.bindValue] !== value[this.bindValue] : item !== value;
                });
            }
            /** @type {?} */
            const result = this.selectedOptions.map(item => this.parseValue(item));
            return Array.isArray(result) && result.length ? result : undefined;
        }
    }
    /**
     * @return {?}
     */
    resetOptions() {
        this.searchTerm = '';
        this.filteredOptions = [...this.options];
        this.optionChanges$.next();
        this.bindOptionSelectionChanges();
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    clearValue($event) {
        $event.stopPropagation();
        this.selectedOptions = [];
        this.changeValue(undefined);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    filterOptions(value) {
        if (value !== this.searchTerm) {
            this.searchTerm = value;
            this.filteredOptions =
                this.options.filter(item => {
                    if (typeof item === 'string') {
                        return item.toLocaleUpperCase().indexOf(this.searchTerm.toLocaleUpperCase()) !== -1;
                    }
                    /** @type {?} */
                    const optionValues = Object.values(item);
                    return optionValues.some((optionValue) => typeof optionValue === 'string'
                        && optionValue.toLocaleUpperCase().indexOf(this.searchTerm.toLocaleUpperCase()) > -1);
                });
            this.matSelect._keyManager.setFirstItemActive();
            this.optionChanges$.next();
            this.bindOptionSelectionChanges();
        }
    }
    /**
     * @return {?}
     */
    get isSearchEnabled() {
        return Array.isArray(this.options) && this.options.length > SELECT_SEARCHABLE_MIN_LIMIT;
    }
    /**
     * @return {?}
     */
    get isClearEnabled() {
        return this.clear && this.control.value && !this.disabled
            && ((this.multiple && Array.isArray(this.control.value) && this.control.value.length)
                || !this.multiple);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleKeydown(event) {
        if (this.isSearchEnabled && [DOWN_ARROW, END, ENTER, HOME, UP_ARROW].indexOf(event.keyCode) === -1) {
            event.stopPropagation();
        }
    }
    /**
     * @return {?}
     */
    handleDisabled() {
        if (this.disabled) {
            this.control.disable();
            return;
        }
        this.control.enable();
    }
    /**
     * @return {?}
     */
    scrollToActiveItem() {
        /** @type {?} */
        const activeItem = this.matSelect._keyManager.activeItem;
        if (!activeItem) {
            return;
        }
        /** @type {?} */
        const option = activeItem._element.nativeElement;
        /** @type {?} */
        const parent = option.parentNode;
        if (option.offsetTop + option.offsetHeight > parent.scrollTop + parent.offsetHeight) {
            parent.scrollTop = option.offsetTop - parent.offsetHeight + option.offsetHeight;
        }
        else if (option.offsetTop < parent.scrollTop) {
            parent.scrollTop = option.offsetTop;
        }
    }
    /**
     * @param {?} isOpen
     * @return {?}
     */
    openedChange(isOpen) {
        if (isOpen) {
            if (this.isSearchEnabled) {
                this.searchInput.nativeElement.focus();
            }
            this.optionChanges$.next();
            this.bindOptionSelectionChanges();
            this.scrollToActiveItem();
            /** @type {?} */
            const keyManagerChange = this.matSelect._keyManager.change;
            keyManagerChange
                .pipe(takeUntil(this.panelClosed$))
                .subscribe(() => {
                this.scrollToActiveItem();
            });
        }
        else {
            this.panelClosed$.next();
            this.resetOptions();
        }
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LXNlbGVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbHNub3ZhL2FuZ3VsYXJtb2R1bGVzLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbWF0LXNlbGVjdC9tYXQtc2VsZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osVUFBVSxFQUNWLEtBQUssRUFJTCxXQUFXLEVBQ1gsU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXVCLFdBQVcsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3BGLE9BQU8sRUFBQyxpQkFBaUIsRUFBRSxTQUFTLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUMvRCxPQUFPLEVBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzdFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDN0IsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDOzs7QUFHekMsTUFBTSxPQUFPLG9DQUFvQyxHQUFRO0lBQ3ZELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztJQUNqRCxLQUFLLEVBQUUsSUFBSTtDQUNaOzs7TUFHSyxJQUFJLEdBQUcsR0FBRyxFQUFFO0FBQ2xCLENBQUM7OztNQUVLLDJCQUEyQixHQUFHLENBQUM7QUFTckMsTUFBTSxPQUFPLGtCQUFrQjtJQVAvQjtRQVFXLFlBQU8sR0FBZ0IsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUN6QyxZQUFPLEdBQVUsRUFBRSxDQUFDO1FBS3BCLFVBQUssR0FBRyxJQUFJLENBQUM7UUFDYixhQUFRLEdBQUcsS0FBSyxDQUFDO1FB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MUMsdUNBQWdDOztJQUNoQyx5Q0FBc0M7Ozs7O0lBRXRDLHNDQUFpQzs7Ozs7SUFDakMsMENBQXFDOzs7OztJQUNyQyw0Q0FBdUM7Ozs7O0lBQ3ZDLDZDQUFvQzs7SUFDcEMsNkNBQThCOztJQUM5Qix3Q0FBdUI7Ozs7O0lBQ3ZCLHdDQUFzQzs7Ozs7SUFDdEMsdUNBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIEZvcm1Db250cm9sLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtFcnJvclN0YXRlTWF0Y2hlciwgTWF0U2VsZWN0fSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQge0RPV05fQVJST1csIEVORCwgRU5URVIsIEhPTUUsIFVQX0FSUk9XfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtTdWJqZWN0fSBmcm9tICdyeGpzJztcbmltcG9ydCB7dGFrZVVudGlsfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbi8qIHRzbGludDpkaXNhYmxlOm5vLXVzZS1iZWZvcmUtZGVjbGFyZSAqL1xuZXhwb3J0IGNvbnN0IENVU1RPTV9TRUxFQ1RfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWF0U2VsZWN0Q29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG4vKiB0c2xpbnQ6ZW5hYmxlOm5vLXVzZS1iZWZvcmUtZGVjbGFyZSAqL1xuXG5jb25zdCBub29wID0gKCkgPT4ge1xufTtcblxuY29uc3QgU0VMRUNUX1NFQVJDSEFCTEVfTUlOX0xJTUlUID0gODtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbHNuLW1hdC1zZWxlY3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vbWF0LXNlbGVjdC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL21hdC1zZWxlY3QuY29tcG9uZW50LnNjc3MnXSxcbiAgcHJvdmlkZXJzOiBbQ1VTVE9NX1NFTEVDVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uRW11bGF0ZWRcbn0pXG5leHBvcnQgY2xhc3MgTWF0U2VsZWN0Q29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBjb250cm9sOiBGb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgpO1xuICBASW5wdXQoKSBvcHRpb25zOiBhbnlbXSA9IFtdO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICBASW5wdXQoKSBiaW5kTGFiZWw6IHN0cmluZztcbiAgQElucHV0KCkgYmluZEJ5OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGJpbmRWYWx1ZTogc3RyaW5nO1xuICBASW5wdXQoKSBjbGVhciA9IHRydWU7XG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XG4gIEBJbnB1dCgpIG11bHRpcGxlID0gZmFsc2U7XG4gIEBJbnB1dCgpIGVycm9yU3RhdGVNYXRjaGVyOiBFcnJvclN0YXRlTWF0Y2hlcjtcbiAgQElucHV0KCkgZXJyb3JzOiBhbnlbXSA9IFtdO1xuXG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIG9wdGlvblRlbXBsYXRlO1xuICBAVmlld0NoaWxkKE1hdFNlbGVjdCkgbWF0U2VsZWN0O1xuICBAVmlld0NoaWxkKCdzZWFyY2hJbnB1dCcpIHNlYXJjaElucHV0O1xuXG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdCgpO1xuICBwcml2YXRlIHBhbmVsQ2xvc2VkJCA9IG5ldyBTdWJqZWN0KCk7XG4gIHByaXZhdGUgb3B0aW9uQ2hhbmdlcyQgPSBuZXcgU3ViamVjdCgpO1xuICBwcml2YXRlIHNlbGVjdGVkT3B0aW9uczogYW55W10gPSBbXTtcbiAgcHVibGljIGZpbHRlcmVkT3B0aW9uczogYW55W107XG4gIHB1YmxpYyBzZWFyY2hUZXJtID0gJyc7XG4gIHByaXZhdGUgX29uVG91Y2hlZDogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIHByaXZhdGUgX29uQ2hhbmdlOiAodmFsdWUpID0+IHZvaWQ7XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5yZXNldE9wdGlvbnMoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMuaGFuZGxlRGlzYWJsZWQoKTtcbiAgICB0aGlzLnJlc2V0T3B0aW9ucygpO1xuICAgIHRoaXMud3JpdGVWYWx1ZSh0aGlzLmNvbnRyb2wudmFsdWUpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gIH1cblxuICBvbkJsdXIoKSB7XG4gICAgdGhpcy5fb25Ub3VjaGVkKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoIXRoaXMubXVsdGlwbGUpIHtcbiAgICAgIHRoaXMuc2V0U2luZ2xlVmFsdWUodmFsdWUpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5tdWx0aXBsZSAmJiBBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgdGhpcy5zZXRNdWx0aXBsZVZhbHVlKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBzZXRTaW5nbGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1thcHAtc2VsZWN0XSBHaXZlbiB2YWx1ZSBpcyBhbiBhcnJheS4gU2hvdWxkIGBtdWx0aXBsZSA9IHRydWVgPycpO1xuICAgIH1cbiAgICBjb25zdCBjb3JyZXNwb25kaW5nT3B0aW9uID0gdGhpcy5maW5kT3B0aW9uKHZhbHVlKTtcbiAgICB0aGlzLmNoYW5nZVZhbHVlKGNvcnJlc3BvbmRpbmdPcHRpb24pO1xuICB9XG5cbiAgc2V0TXVsdGlwbGVWYWx1ZSh2YWx1ZXM6IGFueVtdKSB7XG4gICAgdGhpcy5zZWxlY3RlZE9wdGlvbnMgPSBbXTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZXMpKSB7XG4gICAgICB2YWx1ZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgY29uc3QgY29ycmVzcG9uZGluZ09wdGlvbiA9IHRoaXMuZmluZE9wdGlvbihpdGVtKTtcbiAgICAgICAgaWYgKGNvcnJlc3BvbmRpbmdPcHRpb24pIHtcbiAgICAgICAgICB0aGlzLmhhbmRsZU9wdGlvblNlbGVjdGlvbih7XG4gICAgICAgICAgICBzZWxlY3RlZDogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiBjb3JyZXNwb25kaW5nT3B0aW9uXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLmNoYW5nZVZhbHVlKHRoaXMuc2VsZWN0ZWRPcHRpb25zKTtcbiAgfVxuXG4gIGZpbmRPcHRpb24odmFsdWU6IGFueSkge1xuICAgIGlmICh2YWx1ZSB8fCB2YWx1ZSA9PT0gMCB8fCB2YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMub3B0aW9ucy5maW5kKChvcHRpb24pID0+IHRoaXMuYmluZFZhbHVlXG4gICAgICAgID8gb3B0aW9uW3RoaXMuYmluZFZhbHVlXSA9PT0gdmFsdWVcbiAgICAgICAgOiB0aGlzLmJpbmRCeVxuICAgICAgICAgID8gb3B0aW9uW3RoaXMuYmluZEJ5XSA9PT0gdmFsdWVbdGhpcy5iaW5kQnldXG4gICAgICAgICAgOiBvcHRpb24gPT09IHZhbHVlXG4gICAgICApO1xuICAgICAgcmV0dXJuIHJlc3VsdCB8fCB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGNoYW5nZVZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy5jb250cm9sLnNldFZhbHVlKHZhbHVlKTtcbiAgICBpZiAodGhpcy5fb25DaGFuZ2UpIHtcbiAgICAgIGlmICghdGhpcy5tdWx0aXBsZSkge1xuICAgICAgICB0aGlzLl9vbkNoYW5nZSh0aGlzLnBhcnNlVmFsdWUodmFsdWUpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUubWFwKGl0ZW0gPT4gdGhpcy5wYXJzZVZhbHVlKGl0ZW0pKSA6IHZhbHVlO1xuICAgICAgICB0aGlzLl9vbkNoYW5nZShyZXN1bHQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHBhcnNlVmFsdWUodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0aGlzLmJpbmRWYWx1ZSA/IHZhbHVlW3RoaXMuYmluZFZhbHVlXSA6IHZhbHVlO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5fb25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLl9vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIGJpbmRPcHRpb25TZWxlY3Rpb25DaGFuZ2VzKCkge1xuICAgIHRoaXMubWF0U2VsZWN0Lm9wdGlvblNlbGVjdGlvbkNoYW5nZXNcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLm9wdGlvbkNoYW5nZXMkIHx8IHRoaXMuZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICBjb25zdCB7aXNVc2VySW5wdXQsIHNvdXJjZX0gPSByZXM7XG4gICAgICAgIGlmIChpc1VzZXJJbnB1dCkge1xuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuaGFuZGxlT3B0aW9uU2VsZWN0aW9uKHNvdXJjZSk7XG4gICAgICAgICAgaWYgKCF0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFNpbmdsZVZhbHVlKHJlc3VsdCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0TXVsdGlwbGVWYWx1ZSh0aGlzLnNlbGVjdGVkT3B0aW9ucyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICB9XG5cbiAgaGFuZGxlT3B0aW9uU2VsZWN0aW9uKGV2ZW50KSB7XG4gICAgY29uc3Qge3ZhbHVlLCBzZWxlY3RlZH0gPSBldmVudDtcbiAgICBpZiAoIXRoaXMubXVsdGlwbGUpIHtcbiAgICAgIHJldHVybiBzZWxlY3RlZFxuICAgICAgICA/IHRoaXMucGFyc2VWYWx1ZSh2YWx1ZSlcbiAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkT3B0aW9ucy5wdXNoKHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIF9yZW1vdmUodGhpcy5zZWxlY3RlZE9wdGlvbnMsIChpdGVtKSA9PiB7XG4gICAgICAgIC8vICAgcmV0dXJuIHRoaXMuYmluZFZhbHVlID8gaXRlbVt0aGlzLmJpbmRWYWx1ZV0gPT09IHZhbHVlW3RoaXMuYmluZFZhbHVlXSA6IGl0ZW0gPT09IHZhbHVlO1xuICAgICAgICAvLyB9KTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvbnMgPSB0aGlzLnNlbGVjdGVkT3B0aW9ucy5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5iaW5kVmFsdWUgPyBpdGVtW3RoaXMuYmluZFZhbHVlXSAhPT0gdmFsdWVbdGhpcy5iaW5kVmFsdWVdIDogaXRlbSAhPT0gdmFsdWU7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5zZWxlY3RlZE9wdGlvbnMubWFwKGl0ZW0gPT4gdGhpcy5wYXJzZVZhbHVlKGl0ZW0pKTtcbiAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHJlc3VsdCkgJiYgcmVzdWx0Lmxlbmd0aCA/IHJlc3VsdCA6IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICByZXNldE9wdGlvbnMoKSB7XG4gICAgdGhpcy5zZWFyY2hUZXJtID0gJyc7XG4gICAgdGhpcy5maWx0ZXJlZE9wdGlvbnMgPSBbLi4udGhpcy5vcHRpb25zXTtcbiAgICB0aGlzLm9wdGlvbkNoYW5nZXMkLm5leHQoKTtcbiAgICB0aGlzLmJpbmRPcHRpb25TZWxlY3Rpb25DaGFuZ2VzKCk7XG4gIH1cblxuICBjbGVhclZhbHVlKCRldmVudCkge1xuICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLnNlbGVjdGVkT3B0aW9ucyA9IFtdO1xuICAgIHRoaXMuY2hhbmdlVmFsdWUodW5kZWZpbmVkKTtcbiAgfVxuXG4gIGZpbHRlck9wdGlvbnModmFsdWUpIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuc2VhcmNoVGVybSkge1xuICAgICAgdGhpcy5zZWFyY2hUZXJtID0gdmFsdWU7XG4gICAgICB0aGlzLmZpbHRlcmVkT3B0aW9ucyA9XG4gICAgICAgIHRoaXMub3B0aW9ucy5maWx0ZXIoaXRlbSA9PiB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0udG9Mb2NhbGVVcHBlckNhc2UoKS5pbmRleE9mKHRoaXMuc2VhcmNoVGVybS50b0xvY2FsZVVwcGVyQ2FzZSgpKSAhPT0gLTE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IG9wdGlvblZhbHVlcyA9IE9iamVjdC52YWx1ZXMoaXRlbSk7XG4gICAgICAgICAgcmV0dXJuIG9wdGlvblZhbHVlcy5zb21lKChvcHRpb25WYWx1ZTogc3RyaW5nKSA9PlxuICAgICAgICAgICAgdHlwZW9mIG9wdGlvblZhbHVlID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgJiYgb3B0aW9uVmFsdWUudG9Mb2NhbGVVcHBlckNhc2UoKS5pbmRleE9mKHRoaXMuc2VhcmNoVGVybS50b0xvY2FsZVVwcGVyQ2FzZSgpKSA+IC0xKTtcbiAgICAgICAgfSk7XG4gICAgICB0aGlzLm1hdFNlbGVjdC5fa2V5TWFuYWdlci5zZXRGaXJzdEl0ZW1BY3RpdmUoKTtcblxuICAgICAgdGhpcy5vcHRpb25DaGFuZ2VzJC5uZXh0KCk7XG4gICAgICB0aGlzLmJpbmRPcHRpb25TZWxlY3Rpb25DaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGlzU2VhcmNoRW5hYmxlZCgpIHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh0aGlzLm9wdGlvbnMpICYmIHRoaXMub3B0aW9ucy5sZW5ndGggPiBTRUxFQ1RfU0VBUkNIQUJMRV9NSU5fTElNSVQ7XG4gIH1cblxuICBnZXQgaXNDbGVhckVuYWJsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2xlYXIgJiYgdGhpcy5jb250cm9sLnZhbHVlICYmICF0aGlzLmRpc2FibGVkXG4gICAgICAmJiAoXG4gICAgICAgICh0aGlzLm11bHRpcGxlICYmIEFycmF5LmlzQXJyYXkodGhpcy5jb250cm9sLnZhbHVlKSAmJiB0aGlzLmNvbnRyb2wudmFsdWUubGVuZ3RoKVxuICAgICAgICB8fCAhdGhpcy5tdWx0aXBsZVxuICAgICAgKTtcbiAgfVxuXG4gIGhhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBpZiAodGhpcy5pc1NlYXJjaEVuYWJsZWQgJiYgW0RPV05fQVJST1csIEVORCwgRU5URVIsIEhPTUUsIFVQX0FSUk9XXS5pbmRleE9mKGV2ZW50LmtleUNvZGUpID09PSAtMSkge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRGlzYWJsZWQoKSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuY29udHJvbC5kaXNhYmxlKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY29udHJvbC5lbmFibGUoKTtcbiAgfVxuXG4gIHNjcm9sbFRvQWN0aXZlSXRlbSgpIHtcbiAgICBjb25zdCBhY3RpdmVJdGVtID0gdGhpcy5tYXRTZWxlY3QuX2tleU1hbmFnZXIuYWN0aXZlSXRlbTtcbiAgICBpZiAoIWFjdGl2ZUl0ZW0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgb3B0aW9uID0gYWN0aXZlSXRlbS5fZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IHBhcmVudCA9IG9wdGlvbi5wYXJlbnROb2RlO1xuICAgIGlmIChvcHRpb24ub2Zmc2V0VG9wICsgb3B0aW9uLm9mZnNldEhlaWdodCA+IHBhcmVudC5zY3JvbGxUb3AgKyBwYXJlbnQub2Zmc2V0SGVpZ2h0KSB7XG4gICAgICBwYXJlbnQuc2Nyb2xsVG9wID0gb3B0aW9uLm9mZnNldFRvcCAtIHBhcmVudC5vZmZzZXRIZWlnaHQgKyBvcHRpb24ub2Zmc2V0SGVpZ2h0O1xuICAgIH0gZWxzZSBpZiAob3B0aW9uLm9mZnNldFRvcCA8IHBhcmVudC5zY3JvbGxUb3ApIHtcbiAgICAgIHBhcmVudC5zY3JvbGxUb3AgPSBvcHRpb24ub2Zmc2V0VG9wO1xuICAgIH1cbiAgfVxuXG4gIG9wZW5lZENoYW5nZShpc09wZW4pIHtcbiAgICBpZiAoaXNPcGVuKSB7XG4gICAgICBpZiAodGhpcy5pc1NlYXJjaEVuYWJsZWQpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hJbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICB9XG4gICAgICB0aGlzLm9wdGlvbkNoYW5nZXMkLm5leHQoKTtcbiAgICAgIHRoaXMuYmluZE9wdGlvblNlbGVjdGlvbkNoYW5nZXMoKTtcbiAgICAgIHRoaXMuc2Nyb2xsVG9BY3RpdmVJdGVtKCk7XG4gICAgICBjb25zdCBrZXlNYW5hZ2VyQ2hhbmdlID0gdGhpcy5tYXRTZWxlY3QuX2tleU1hbmFnZXIuY2hhbmdlO1xuICAgICAga2V5TWFuYWdlckNoYW5nZVxuICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5wYW5lbENsb3NlZCQpKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICB0aGlzLnNjcm9sbFRvQWN0aXZlSXRlbSgpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYW5lbENsb3NlZCQubmV4dCgpO1xuICAgICAgdGhpcy5yZXNldE9wdGlvbnMoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==