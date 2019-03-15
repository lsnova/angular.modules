import { ElementRef, OnChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ConfigService, NumericConfig } from '../../services/config.service';
export declare class NumericDirective implements OnChanges, ControlValueAccessor {
    private el;
    private configService;
    lsnNumeric: NumericConfig;
    element: ElementRef;
    protected config: NumericConfig;
    onChange: (_: any) => void;
    onTouch: () => void;
    constructor(el: ElementRef, configService: ConfigService);
    ngOnChanges(): void;
    inputHandler($event: any): void;
    focusHandler(): void;
    blurHandler(): void;
    writeValue(modelValue: string): Promise<void>;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    displayValue: any;
    setConfig(): void;
    parseValue(value: any): number;
    handleLength(value: any): any;
    handleRange(value: any): any;
    prepareDisplayValue(value: any): string;
    setEditMode(): void;
    keyDownHandler(e: KeyboardEvent): void;
}
