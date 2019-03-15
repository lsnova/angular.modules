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
}

export class DefaultNumericConfig implements NumericConfig {
  min: number;
  max: number;
  maxLength: number;
  precision = 0;
  decimals: string = NumericSeparator.PERIOD;
  thousands: string;

  constructor(props = {}) {
    Object.assign(this, props);
  }
}

export class CustomConfig {
  numeric?: NumericConfig;
  custom?: { [key: string]: NumericConfig };

  constructor(props = {}) {
    Object.assign(this, props);
  }
}

@Injectable()
export class ConfigService {
  private config: CustomConfig;

  constructor(config: CustomConfig) {

    let moduleConfig = new CustomConfig();
    if (config) {
      moduleConfig = Object.assign(moduleConfig, config);
    }

    const numericConfig = moduleConfig.numeric || {};
    const customConfig = moduleConfig.custom || {};
    this.config = new CustomConfig({
      numeric: new DefaultNumericConfig(numericConfig),
      custom: customConfig,
    });
  }

  getNumericConfig() {
    return this.config.numeric;
  }

  getCustomConfig(key) {
    return this.config.custom[key] || {};
  }
}
