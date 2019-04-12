import {ModuleWithProviders, NgModule} from '@angular/core';
import {NumericDirective} from './numeric.directive';
import {ConfigService, CustomConfig} from '../../services/config.service';

@NgModule({
  declarations: [
    NumericDirective,
  ],
  exports: [
    NumericDirective,
  ]
})
export class LsnNumericModule {
  static forRoot(config?: CustomConfig): ModuleWithProviders {
    return {
      ngModule: LsnNumericModule,
      providers: [
        ConfigService,
        {provide: CustomConfig, useValue: config}
      ]
    };
  }
}
