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
export declare class CustomConfig {
    numeric?: NumericConfig;
    custom?: {
        [key: string]: NumericConfig;
    };
    constructor(props?: {});
}
export declare class ConfigService {
    private config;
    constructor(config: CustomConfig);
    getNumericConfig(): NumericConfig;
    getCustomConfig(key: any): NumericConfig;
}
