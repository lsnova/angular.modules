import {Directive, ElementRef, forwardRef, HostListener, Input, OnChanges} from '@angular/core';
import * as keyboard from '@angular/cdk/keycodes';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NumericConfig, NumericConfigService} from './numeric-config.service';

const CUSTOM_SELECT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NumericDirective),
  multi: true
};

@Directive({
  selector: '[ngModel][lsnNumeric]',
  providers: [CUSTOM_SELECT_VALUE_ACCESSOR]
})
export class NumericDirective implements OnChanges, ControlValueAccessor {
  @Input() lsnNumeric: NumericConfig = {};
  element: ElementRef;
  protected config: NumericConfig;
  public onChange = (_: any) => {
  };
  public onTouch = () => {
  };

  constructor(
    private el: ElementRef,
    private configService: NumericConfigService
  ) {
    this.element = el;
    this.setConfig();
  }

  ngOnChanges() {
    this.setConfig();
  }

  @HostListener('input', ['$event'])
  inputHandler($event) {
    if ($event.target.value === '-') {
      return;
    }
    let value = this.removeInvalidCharacters($event.target.value);
    value = this.handleWholesLength(value);
    const parsedValue = this.parseValue(value);
    const rangeValue = this.handleRange(parsedValue);
    if (parsedValue === rangeValue) {
      this.displayValue = value.replace(/[,|.]/, this.config.decimals);
      this.onChange(parsedValue);
    } else {
      this.displayValue = rangeValue.toString().replace(/[,|.]/, this.config.decimals);
      this.onChange(rangeValue);
    }
  }

  @HostListener('focus', [])
  focusHandler() {
    this.setEditMode();
  }

  @HostListener('blur', [])
  blurHandler() {
    this.displayValue = this.prepareDisplayValue(this.element.nativeElement.value);
  }

  public async writeValue(modelValue: string): Promise<void> {
    let parsedValue = this.parseValue(modelValue);
    parsedValue = this.handleRange(parsedValue);
    this.displayValue = this.prepareDisplayValue(parsedValue);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  get displayValue() {
    return this.element.nativeElement.value;
  }

  set displayValue(value) {
    this.element.nativeElement.value = value;
  }

  setConfig() {
    const defaultConfig = this.lsnNumeric.config
      ? this.configService.getCustomConfig(this.lsnNumeric.config)
      : this.configService.getDefaultConfig();
    this.config = Object.assign({...defaultConfig, ...this.lsnNumeric});
    if (this.config.decimals && this.config.thousands && this.config.decimals === this.config.thousands) {
      this.config.thousands = undefined;
    }
    if (this.config.max !== undefined && this.config.maxLength !== undefined) {
      console.warn('[lsnNumeric] Setting `maxLength` makes `max` redundant.');
    }
  }

  parseValue(value) {
    if (!value && value !== 0) {
      return undefined;
    }
    const newValue = value.toString().replace(/[,|.]/, '.');
    const parsedValue = this.config.precision > 0
      ? parseFloat(newValue)
      : parseInt(newValue, 10);
    return isNaN(parsedValue) ? undefined : parsedValue;
  }

  handleWholesLength(value) {
    if (this.config.maxLength) {
      const negativeSign = value.toString().startsWith('-') ? '-' : '';
      const absoluteValue = value.toString()
        .replace(/^-/, '')
        .replace(/[,|.]/, this.config.decimals);
      if (absoluteValue.toString().includes(this.config.decimals)) {
        const [wholes, decimals] = absoluteValue.toString().split(this.config.decimals);
        const properDecimals = this.removeInvalidCharacters(decimals, true);
        return negativeSign + wholes.substr(0, this.config.maxLength) + this.config.decimals + properDecimals;
      }
      return negativeSign + absoluteValue.toString().substr(0, this.config.maxLength);
    }
    return value;
  }

  removeInvalidCharacters(value, allowDecimalsOnly = false) {
    return allowDecimalsOnly
      ? value.replace(/[^0-9]/g, '')
      : value.replace(/[^\-0-9,.]/g, '');
  }

  handleRange(value) {
    if (!this.config.maxLength && this.config.max !== undefined && value > this.config.max) {
      return this.config.max;
    } else if (this.config.min !== undefined && value < this.config.min) {
      return this.config.min;
    }
    return value;
  }

  prepareDisplayValue(value) {
    if (!value && value !== 0) {
      return '';
    }
    const [whole, decimals] = typeof value === 'number'
      ? value.toString().split('.')
      : value.toString().split(this.config.decimals);
    const isNegative = whole[0] === '-';
    let result = whole === '-' || !whole
      ? '0'
      : Math.abs(parseInt(whole, 10)).toString();
    if (this.config.thousands) {
      result = result.replace(/\B(?=(\d{3})+(?!\d))/g, this.config.thousands);
    }
    if (decimals && this.config.precision && this.config.decimals) {
      result = result + this.config.decimals + decimals;
    }
    return isNegative && result !== '0' ? '-' + result : result;
  }

  setEditMode() {
    if (this.config.thousands) {
      const currentValue = this.element.nativeElement.value;
      const [whole, decimals] = currentValue.split(this.config.decimals);
      const regex = new RegExp('\\' + this.config.thousands, 'g');
      let result = whole.replace(regex, '');
      if (decimals && this.config.precision && this.config.decimals) {
        result = result + this.config.decimals + decimals;
      }
      this.displayValue = result;
    }
  }

  @HostListener('keydown', ['$event'])
  keyDownHandler(e: KeyboardEvent) {
    const currentValue = this.element.nativeElement.value;
    if (
      // Allow special keys
      [
        keyboard.LEFT_ARROW,
        keyboard.RIGHT_ARROW,
        keyboard.BACKSPACE,
        keyboard.DELETE,
        keyboard.END,
        keyboard.ENTER,
        keyboard.ESCAPE,
        keyboard.HOME,
        keyboard.TAB,
      ].indexOf(e.keyCode) !== -1
      // Allow Ctrl+key actions
      || (
        [
          keyboard.A,
          keyboard.C,
          keyboard.R,
          keyboard.V,
          keyboard.X,
        ].indexOf(e.keyCode) !== -1
        && (e.ctrlKey === true || e.metaKey === true)
      )
    ) {
      return;  // let it happen, don't do anything
    }

    // Handle maxLength
    const absoluteValue = currentValue.toString().replace(/^-/, '');
    const [wholes] = absoluteValue.toString().split(this.config.decimals);
    if (
      this.config.maxLength !== undefined
      && (
        this.element.nativeElement.selectionStart < wholes.length
        && wholes.length >= this.config.maxLength
        && [keyboard.DASH, keyboard.NUMPAD_MINUS].indexOf(e.keyCode) === -1
      )
      && this.element.nativeElement.selectionEnd - this.element.nativeElement.selectionStart === 0
    ) {
      e.preventDefault();
    }

    // Handle minus
    if (
      [keyboard.DASH, keyboard.NUMPAD_MINUS].indexOf(e.keyCode) !== -1
      && this.element.nativeElement.selectionStart === 0
      && ((this.config.min !== undefined && this.config.min < 0) || this.config.min === undefined)
      && currentValue.indexOf('-') === -1
    ) {
      return;
    }

    // Handle separator
    if (
      this.config.precision > 0
      && [keyboard.COMMA, keyboard.NUMPAD_PERIOD, 190].indexOf(e.keyCode) !== -1
      && this.element.nativeElement.selectionStart > 0
      && currentValue.length
      && currentValue.indexOf('.') === -1
      && currentValue.indexOf(',') === -1
    ) {
      return;
    }

    // Handle key after separator
    if (
      this.config.precision > 0
      && currentValue.indexOf(this.config.decimals) > -1
      && this.element.nativeElement.selectionStart > currentValue.indexOf(this.config.decimals)
    ) {
      const [, decimals] = currentValue.split(this.config.decimals);
      if (decimals && decimals.length >= this.config.precision) {
        e.preventDefault();
      }
    }
    // Ensure that it is a number or stop the keypress
    if (
      (
        (
          [
            keyboard.ZERO,
            keyboard.ONE,
            keyboard.TWO,
            keyboard.THREE,
            keyboard.FOUR,
            keyboard.FIVE,
            keyboard.SIX,
            keyboard.SEVEN,
            keyboard.EIGHT,
            keyboard.NINE
          ].indexOf(e.keyCode) === -1
          || e.shiftKey
        )
        &&
        [
          keyboard.NUMPAD_ZERO,
          keyboard.NUMPAD_ONE,
          keyboard.NUMPAD_TWO,
          keyboard.NUMPAD_THREE,
          keyboard.NUMPAD_FOUR,
          keyboard.NUMPAD_FIVE,
          keyboard.NUMPAD_SIX,
          keyboard.NUMPAD_SEVEN,
          keyboard.NUMPAD_EIGHT,
          keyboard.NUMPAD_NINE,
        ].indexOf(e.keyCode) === -1
      )
      || (
        this.element.nativeElement.selectionStart === 0
        && this.element.nativeElement.selectionEnd === 0
        && currentValue.indexOf('-') > -1
      )
    ) {
      e.preventDefault();
    }
  }
}
