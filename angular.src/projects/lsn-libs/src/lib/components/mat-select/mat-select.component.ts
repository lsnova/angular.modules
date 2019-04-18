import {
  Component,
  ContentChild,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ErrorStateMatcher, MatSelect} from '@angular/material';
import {DOWN_ARROW, END, ENTER, HOME, UP_ARROW} from '@angular/cdk/keycodes';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

/* tslint:disable:no-use-before-declare */
export const CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MatSelectComponent),
  multi: true
};
/* tslint:enable:no-use-before-declare */

const noop = () => {
};

const SELECT_SEARCHABLE_MIN_LIMIT = 8;

@Component({
  selector: 'lsn-mat-select',
  templateUrl: './mat-select.component.html',
  styleUrls: ['./mat-select.component.scss'],
  providers: [CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None
})
export class MatSelectComponent implements ControlValueAccessor, OnInit, OnChanges, OnDestroy {
  @Input() control: FormControl = new FormControl();
  @Input() options: any[] = [];
  @Input() placeholder: string;
  @Input() clearLabel: string;
  @Input() bindLabel: string;
  @Input() bindBy: string;
  @Input() bindValue: string;
  @Input() clear = true;
  @Input() disabled = false;
  @Input() multiple = false;
  @Input() errorStateMatcher: ErrorStateMatcher;
  @Input() errors: any[] = [];

  @ContentChild(TemplateRef) optionTemplate;
  @ViewChild(MatSelect) matSelect;
  @ViewChild('searchInput') searchInput;

  private destroy$ = new Subject();
  private panelClosed$ = new Subject();
  private optionChanges$ = new Subject();
  private selectedOptions: any[] = [];
  public filteredOptions: any[];
  public searchTerm = '';
  private _onTouched: () => void = noop;
  private _onChange: (value) => void;

  ngOnInit() {
    this.resetOptions();
  }

  ngOnChanges() {
    this.handleDisabled();
    this.resetOptions();
    this.writeValue(this.control.value);
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  onBlur() {
    this._onTouched();
  }

  writeValue(value: any) {
    if (!this.multiple) {
      this.setSingleValue(value);
    } else if (this.multiple && Array.isArray(value)) {
      this.setMultipleValue(value);
    }
  }

  setSingleValue(value: any) {
    if (Array.isArray(value)) {
      console.warn('[lsn-mat-select] Given value is an array. Should `multiple = true`?');
    }
    const correspondingOption = this.findOption(value);
    this.changeValue(correspondingOption);
  }

  setMultipleValue(values: any[]) {
    this.selectedOptions = [];
    if (Array.isArray(values)) {
      values.forEach(item => {
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

  findOption(value: any) {
    if (value || value === 0 || value === false) {
      const result = this.options.find((option) => this.bindValue
        ? option[this.bindValue] === value
        : this.bindBy
          ? option[this.bindBy] === value[this.bindBy]
          : option === value
      );
      return result || value;
    }
    return undefined;
  }

  changeValue(value) {
    this.control.setValue(value);
    if (this._onChange) {
      if (!this.multiple) {
        this._onChange(this.parseValue(value));
      } else {
        const result = Array.isArray(value) ? value.map(item => this.parseValue(item)) : value;
        this._onChange(result);
      }
    }
  }

  parseValue(value) {
    return value !== undefined && value !== null && this.bindValue ? value[this.bindValue] : value;
  }

  registerOnChange(fn: any) {
    this._onChange = fn;
  }

  registerOnTouched(fn: any) {
    this._onTouched = fn;
  }

  bindOptionSelectionChanges() {
    this.matSelect.optionSelectionChanges
      .pipe(takeUntil(this.optionChanges$ || this.destroy$))
      .subscribe(res => {
        const {isUserInput, source} = res;
        if (isUserInput) {
          const result = this.handleOptionSelection(source);
          if (!this.multiple) {
            this.setSingleValue(result);
          } else {
            this.setMultipleValue(this.selectedOptions);
          }
        }
      });

  }

  handleOptionSelection(event) {
    const {value, selected} = event;
    if (!this.multiple) {
      return selected
        ? this.parseValue(value)
        : undefined;
    } else {
      if (selected) {
        this.selectedOptions.push(value);
      } else {
        this.selectedOptions = this.selectedOptions.filter((item) => {
          return this.bindValue ? item[this.bindValue] !== value[this.bindValue] : item !== value;
        });
      }
      const result = this.selectedOptions.map(item => this.parseValue(item));
      return Array.isArray(result) && result.length ? result : undefined;
    }
  }

  resetOptions() {
    if (!Array.isArray(this.options)) {
      this.options = [];
    }
    this.searchTerm = '';
    this.filteredOptions = [...this.options];
    this.optionChanges$.next();
    this.bindOptionSelectionChanges();
  }

  clearValue($event) {
    $event.stopPropagation();
    this.selectedOptions = [];
    this.changeValue(undefined);
  }

  filterOptions(value) {
    if (value !== this.searchTerm) {
      this.searchTerm = value;
      this.filteredOptions =
        this.options.filter(item => {
          if (typeof item === 'string') {
            return item.toLocaleUpperCase().indexOf(this.searchTerm.toLocaleUpperCase()) !== -1;
          }
          const optionValues = Object.values(item);
          return optionValues.some((optionValue: string) =>
            typeof optionValue === 'string'
            && optionValue.toLocaleUpperCase().indexOf(this.searchTerm.toLocaleUpperCase()) > -1);
        });
      this.matSelect._keyManager.setFirstItemActive();

      this.optionChanges$.next();
      this.bindOptionSelectionChanges();
    }
  }

  get isSearchEnabled() {
    return Array.isArray(this.options) && this.options.length > SELECT_SEARCHABLE_MIN_LIMIT;
  }

  get isClearEnabled() {
    return this.clear && this.control.value && !this.disabled
      && (
        (this.multiple && Array.isArray(this.control.value) && this.control.value.length)
        || !this.multiple
      );
  }

  handleKeydown(event: KeyboardEvent) {
    if (this.isSearchEnabled && [DOWN_ARROW, END, ENTER, HOME, UP_ARROW].indexOf(event.keyCode) === -1) {
      event.stopPropagation();
    }
  }

  handleDisabled() {
    if (this.disabled) {
      this.control.disable();
      return;
    }
    this.control.enable();
  }

  scrollToActiveItem() {
    const activeItem = this.matSelect._keyManager.activeItem;
    if (!activeItem) {
      return;
    }
    const option = activeItem._element.nativeElement;
    const parent = option.parentNode;
    if (option.offsetTop + option.offsetHeight > parent.scrollTop + parent.offsetHeight) {
      parent.scrollTop = option.offsetTop - parent.offsetHeight + option.offsetHeight;
    } else if (option.offsetTop < parent.scrollTop) {
      parent.scrollTop = option.offsetTop;
    }
  }

  openedChange(isOpen) {
    if (isOpen) {
      if (this.isSearchEnabled) {
        this.searchInput.nativeElement.focus();
      }
      this.optionChanges$.next();
      this.bindOptionSelectionChanges();
      this.scrollToActiveItem();
      const keyManagerChange = this.matSelect._keyManager.change;
      keyManagerChange
        .pipe(takeUntil(this.panelClosed$))
        .subscribe(() => {
          this.scrollToActiveItem();
        });
    } else {
      this.panelClosed$.next();
      this.resetOptions();
    }
  }
}
