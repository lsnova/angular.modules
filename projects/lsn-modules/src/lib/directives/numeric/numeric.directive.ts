import {Directive, ElementRef, HostListener, Input, OnChanges} from '@angular/core';
import * as keyboard from '@angular/cdk/keycodes';
import {NgControl} from '@angular/forms';

enum NumericSeparator {
  COMMA = ',',
  PERIOD = '.'
}

class NumericConfig {
  min: number;
  max: number;
  precision = 0;
  separator: NumericSeparator = NumericSeparator.PERIOD;
}


@Directive({
  selector: '[lsnNumeric]'
})
export class NumericDirective implements OnChanges {
  @Input() lsnNumeric = {};
  element: any;
  protected config: NumericConfig;
  private defaultConfig: NumericConfig = new NumericConfig();

  constructor(private el: ElementRef, private ngControl: NgControl) {
    this.element = el;
  }

  ngOnChanges() {
    this.config = Object.assign({...this.defaultConfig, ...this.lsnNumeric});
  }

  @HostListener('input', ['$event'])
  inputHandler($event) {
    const currentValue = $event.target.value;
    this.ngControl.control.setValue(this.parseNewValue(currentValue));
  }

  @HostListener('blur', ['$event'])
  blurHandler($event) {
    const currentValue = $event.target.value;
    this.ngControl.control.setValue(this.parseNewValue(currentValue, true));
  }

  protected parseNewValue(value, blurEvent = false) {
    let newValue = value;
    if (newValue === '' || newValue === '-') {
      return blurEvent ? '' : newValue;
    }
    if (this.config.precision > 0) {
      newValue = newValue.replace(/[,|.]/, this.config.separator);
      if (
        [this.config.separator, '0'].indexOf(newValue.slice(-1)) > -1
        && !blurEvent
      ) {
        return newValue;
      }
      newValue = parseFloat(newValue);
    } else {
      newValue = parseInt(newValue, 10);
    }
    if (this.config.max !== undefined && newValue > this.config.max) {
      newValue = this.config.max;
    } else if (this.config.min !== undefined && newValue < this.config.min) {
      newValue = this.config.min;
    }
    return isNaN(newValue) ? '' : newValue;
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
      && currentValue.indexOf(this.config.separator) === -1
    ) {
      return;
    }

    // Handle key after separator
    if (
      this.config.precision > 0
      && currentValue.indexOf(this.config.separator) > -1
      && this.element.nativeElement.selectionStart > currentValue.indexOf(this.config.separator)
    ) {
      const [, decimals] = currentValue.split(this.config.separator);
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
