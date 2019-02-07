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

  constructor(props = {}) {
    Object.assign(this, props);
  }
}

@Injectable()
export class ConfigService {
  private config: CustomConfig;

  constructor(config: CustomConfig) {
    const numericConfig = config.numeric || {};
    this.config = new CustomConfig({
      numeric: new DefaultNumericConfig(numericConfig)
    });
  }

  getNumericConfig() {
    return this.config.numeric;
  }
}
