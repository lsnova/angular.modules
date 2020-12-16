import {Injectable} from '@angular/core';

enum NumericSeparator {
  COMMA = ',',
  PERIOD = '.',
  SPACE = ' '
}

export interface NumericConfig {
  min?: number;
  max?: number;
  maxLength?: number;
  precision?: number;
  decimals?: string;
  thousands?: string;
  config?: string;
  step?: number;
}

export class DefaultNumericConfig implements NumericConfig {
  min: number;
  max: number;
  maxLength: number;
  precision = 0;
  decimals: string = NumericSeparator.PERIOD;
  thousands: string;
  step: number;

  constructor(props = {}) {
    Object.assign(this, props);
  }
}

export class CustomNumericConfig {
  default?: NumericConfig;
  custom?: { [key: string]: NumericConfig };

  constructor(props = {}) {
    Object.assign(this, props);
  }
}

@Injectable()
export class NumericConfigService {
  private config: CustomNumericConfig;

  constructor(config: CustomNumericConfig) {

    let moduleConfig = new CustomNumericConfig();
    if (config) {
      moduleConfig = Object.assign(moduleConfig, config);
    }

    const numericConfig = moduleConfig.default || {};
    const customConfig = moduleConfig.custom || {};
    this.config = new CustomNumericConfig({
      default: new DefaultNumericConfig(numericConfig),
      custom: customConfig,
    });
  }

  getDefaultConfig() {
    return this.config.default;
  }

  getCustomConfig(key) {
    if (!this.config.custom[key]) {
      console.warn('[lsnNumeric] Invalid config key provided.');
    }
    return {...this.getDefaultConfig(), ...this.config.custom[key]} || this.getDefaultConfig();
  }
}
