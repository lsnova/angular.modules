import { ElementRef, OnChanges } from '@angular/core';
import { NgControl } from '@angular/forms';
import * as i0 from "@angular/core";
declare class NumPadConfig {
    maxlength: number;
    allowLeadingZeros: boolean;
}
export declare class NumPadDirective implements OnChanges {
    private element;
    private ngControl;
    lsnNumPad: {};
    protected config: NumPadConfig;
    private defaultConfig;
    constructor(element: ElementRef, ngControl: NgControl);
    ngOnChanges(): void;
    inputHandler($event: any): void;
    blurHandler($event: any): void;
    protected setValue(value: any): void;
    protected parseNewValue(value: any, blurEvent?: boolean): any;
    keyDownHandler(e: KeyboardEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NumPadDirective, [null, { optional: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NumPadDirective, "[lsnNumPad]", never, { "lsnNumPad": { "alias": "lsnNumPad"; "required": false; }; }, {}, never, never, false, never>;
}
export {};
