import {Injectable} from '@angular/core';

enum NumericSeparator {
  COMMA = ',',
  PERIOD = '.',
  SPACE = ' '
}

export interface NumericConfig {
  min?: number;
  max?: number;
  precision?: number;
  decimals?: string;
  thousands?: string;
  config?: string;
}

export class DefaultNumericConfig implements NumericConfig {
  min: number;
  max: number;
  precision = 0;
  decimals: string = NumericSeparator.PERIOD;
  thousands: string;

  constructor(props = {}) {
    Object.assign(this, props);
  }
}

export class CustomConfig {
  numeric?: NumericConfig;
  custom?: {[key: string]: NumericConfig};

  constructor(props = {}) {
    Object.assign(this, props);
  }
}

@Injectable()
export class ConfigService {
  private config: CustomConfig;

  constructor(config: CustomConfig) {
    const numericConfig = config.numeric || {};
    const customConfig = config.custom || {};
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
