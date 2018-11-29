import { NgModel } from '@angular/forms';
export declare class LatinToGreekDirective {
    private model;
    private latinToGreek;
    constructor(model: NgModel);
    onInputChange($event: any): void;
}
