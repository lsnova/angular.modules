import { ElementRef } from '@angular/core';
import { NgModel } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class LatinToGreekDirective {
    private model;
    private el;
    private latinToGreek;
    constructor(model: NgModel, el: ElementRef);
    private getCaret;
    private setCaret;
    onInputChange($event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LatinToGreekDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<LatinToGreekDirective, "[ngModel][lsnLatinToGreek]", never, {}, {}, never, never, false>;
}
