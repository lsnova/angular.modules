import {Directive, ElementRef, HostListener, Input, OnChanges, Optional} from '@angular/core';
import * as keyboard from '@angular/cdk/keycodes';
import {NgControl} from '@angular/forms';

class NumPadConfig {
  maxlength: number;
  allowLeadingZeros = false;
}

@Directive({
  selector: '[lsnNumPad]',
  standalone: false
})
export class NumPadDirective implements OnChanges {
  @Input() lsnNumPad = {};
  protected config: NumPadConfig;
  private defaultConfig: NumPadConfig = new NumPadConfig();

  constructor(private element: ElementRef, @Optional() private ngControl: NgControl) {
  }

  ngOnChanges() {
    this.config = Object.assign({...this.defaultConfig, ...this.lsnNumPad});
  }

  @HostListener('input', ['$event'])
  inputHandler($event) {
    const currentValue = $event.target.value;
    this.setValue(this.parseNewValue(currentValue));
  }

  @HostListener('blur', ['$event'])
  blurHandler($event) {
    const currentValue = $event.target.value;
    this.setValue(this.parseNewValue(currentValue, true));
  }

  protected setValue(value) {
    if (this.ngControl && this.ngControl.control) {
      this.ngControl.control.setValue(value);
    } else {
      this.element.nativeElement.value = value;
    }
  }

  protected parseNewValue(value, blurEvent = false) {
    let newValue = value.replace(/[^0-9]/g, '');
    if (newValue === '') {
      return blurEvent ? '' : newValue;
    }
    if (this.config.maxlength && this.config.maxlength > 0) {
      newValue = newValue.substring(0, this.config.maxlength);
    }
    if (!this.config.allowLeadingZeros && blurEvent) {
      newValue = newValue.replace(/^0+/, '');
    }
    return newValue;
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
        currentValue.length
        && this.config.maxlength && this.config.maxlength > 0
        && currentValue.length >= this.config.maxlength
        && this.element.nativeElement.selectionEnd - this.element.nativeElement.selectionStart === 0
      )
    ) {
      e.preventDefault();
    }
  }
}
