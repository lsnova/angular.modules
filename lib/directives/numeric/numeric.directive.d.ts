import { ElementRef, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NumericConfig, NumericConfigService } from './numeric-config.service';
import * as i0 from "@angular/core";
export declare enum NumericMessage {
    ADDITIONAL_DECIMAL_SEPARATOR = 0,
    RANGE_EXCEEDED = 1
}
export declare class NumericDirective implements ControlValueAccessor {
    private el;
    private configService;
    protected _lsnNumeric: NumericConfig;
    set lsnNumeric(newValue: NumericConfig);
    get lsnNumeric(): NumericConfig;
    lsnNumericMessages: EventEmitter<NumericMessage>;
    element: ElementRef;
    protected config: NumericConfig;
    onChange: (_: any) => void;
    onTouch: () => void;
    constructor(el: ElementRef, configService: NumericConfigService);
    inputHandler($event: any): void;
    focusHandler(): void;
    blurHandler(): void;
    writeValue(modelValue: string): Promise<void>;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    get displayValue(): any;
    set displayValue(value: any);
    setConfig(): void;
    parseValue(value: any): number;
    handleWholesLength(value: any): any;
    removeInvalidCharacters(value: any, allowDecimalsOnly?: boolean): any;
    private cleanUp;
    handleRange(value: any): any;
    handleStep(value: number): number;
    prepareDisplayValue(value: any): string;
    setEditMode(): void;
    keyDownHandler(e: KeyboardEvent): void;
    setDisabledState(isDisabled: boolean): void;
    /**
     * parse whole part of a number to display value (based on given config)
     */
    protected getWholeDisplayValue(whole: string | number): string;
    /**
     * get whole and decimal part of a number
     * type of return values may vary, it is intentional
     * the returned array should have size of 1(only whole number) or 2(whole and decimal)
     */
    protected getWholeAndDecimalParts(value: string | number): Array<number | string>;
    protected defaultDecimals(value?: string | number, precision?: number): string;
    protected shouldAddDefaultDecimals(decimals: string | number | undefined): boolean;
    isConfigEqual(config1?: NumericConfig, config2?: NumericConfig): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NumericDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NumericDirective, "[lsnNumeric]", never, { "lsnNumeric": { "alias": "lsnNumeric"; "required": false; }; }, { "lsnNumericMessages": "lsnNumericMessages"; }, never, never, false, never>;
}
