import { ElementRef, OnChanges } from '@angular/core';
import { NgControl } from '@angular/forms';
declare enum NumericSeparator {
    COMMA = ",",
    PERIOD = "."
}
declare class NumericConfig {
    min: number;
    max: number;
    precision: number;
    separator: NumericSeparator;
}
export declare class NumericDirective implements OnChanges {
    private el;
    private ngControl;
    lsnNumeric: {};
    element: any;
    protected config: NumericConfig;
    private defaultConfig;
    constructor(el: ElementRef, ngControl: NgControl);
    ngOnChanges(): void;
    inputHandler($event: any): void;
    blurHandler($event: any): void;
    protected parseNewValue(value: any, blurEvent?: boolean): any;
    keyDownHandler(e: KeyboardEvent): void;
}
export {};
