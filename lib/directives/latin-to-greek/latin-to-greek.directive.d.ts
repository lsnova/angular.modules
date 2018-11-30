import { ElementRef } from '@angular/core';
import { NgModel } from '@angular/forms';
export declare class LatinToGreekDirective {
    private model;
    private el;
    private latinToGreek;
    constructor(model: NgModel, el: ElementRef);
    private getCaret;
    private setCaret;
    onInputChange($event: any): void;
}
