import {Directive, ElementRef, forwardRef, HostListener, Input, OnChanges} from '@angular/core';
import * as keyboard from '@angular/cdk/keycodes';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';

enum NumericSeparator {
  COMMA = ',',
  PERIOD = '.',
  SPACE = ' '
}

class NumericConfig {
  min: number;
  max: number;
  precision = 0;
  decimals: NumericSeparator = NumericSeparator.PERIOD;
  thousands: NumericSeparator;
}

@Directive({
  selector: '[lsnNumeric]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumericDirective),
      multi: true
    },
  ]
})
export class NumericDirective implements OnChanges, ControlValueAccessor {
  @Input() lsnNumeric = {};
  element: ElementRef;
  protected config: NumericConfig;
  private defaultConfig: NumericConfig = new NumericConfig();
  public onChange = (_: any) => {
  }
  public onTouch = () => {
  }

  constructor(private el: ElementRef) {
    this.element = el;
  }

  ngOnChanges() {
    this.config = Object.assign({...this.defaultConfig, ...this.lsnNumeric});
  }

  public async writeValue(modelValue: string): Promise<void> {
    this.element.nativeElement.value = modelValue;
    this.addThousandsSepartor();
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

  @HostListener('input', ['$event'])
  inputHandler($event) {
    const currentValue = $event.target.value;
    const newValue = currentValue.replace(/[,|.]/, '.');
    let parsedValue = this.config.precision > 0
      ? parseFloat(newValue)
      : parseInt(newValue, 10);
    if (this.config.max !== undefined && parsedValue > this.config.max) {
      parsedValue = this.config.max;
    } else if (this.config.min !== undefined && parsedValue < this.config.min) {
      parsedValue = this.config.min;
    }
    if (this.config.decimals) {
      this.displayValue = newValue.replace(/[.]/, this.config.decimals);
    }
    this.onChange(parsedValue);
  }

  @HostListener('focus', ['$event'])
  focusHandler() {
    this.removeThousandsSepartor();
  }

  @HostListener('blur', ['$event'])
  blurHandler() {
    this.addThousandsSepartor();
  }

  addThousandsSepartor() {
    if (this.config.thousands) {
      const currentValue = this.element.nativeElement.value;
      const [whole, decimals] = currentValue.split(this.config.decimals);
      let result = whole.replace(/\B(?=(\d{3})+(?!\d))/g, this.config.thousands);
      if (decimals && this.config.precision && this.config.decimals) {
        result = result + this.config.decimals + decimals;
      }
      this.displayValue = result;
    }
  }

  removeThousandsSepartor() {
    if (this.config.thousands) {
      const currentValue = this.element.nativeElement.value;
      const [whole, decimals] = currentValue.split(this.config.decimals);
      const regex = new RegExp(this.config.thousands, 'g');
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

    // Handle minus
    if (
      [keyboard.DASH, keyboard.NUMPAD_MINUS].indexOf(e.keyCode) !== -1
      && this.element.nativeElement.selectionStart === 0
      && ((this.config.min !== undefined && this.config.min < 0) || this.config.min === undefined)
      && ((this.config.max !== undefined && this.config.max < 0) || this.config.max === undefined)
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
      || (this.element.nativeElement.selectionStart === 0 && currentValue.indexOf('-') > -1)
    ) {
      e.preventDefault();
    }
  }
}
