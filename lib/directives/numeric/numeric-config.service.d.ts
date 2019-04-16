export interface NumericConfig {
    min?: number;
    max?: number;
    maxLength?: number;
    precision?: number;
    decimals?: string;
    thousands?: string;
    config?: string;
}
export declare class DefaultNumericConfig implements NumericConfig {
    min: number;
    max: number;
    maxLength: number;
    precision: number;
    decimals: string;
    thousands: string;
    constructor(props?: {});
}
export declare class CustomNumericConfig {
    default?: NumericConfig;
    custom?: {
        [key: string]: NumericConfig;
    };
    constructor(props?: {});
}
export declare class NumericConfigService {
    private config;
    constructor(config: CustomNumericConfig);
    getDefaultConfig(): NumericConfig;
    getCustomConfig(key: any): NumericConfig;
}
