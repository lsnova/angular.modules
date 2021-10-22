import {ModuleWithProviders, NgModule} from '@angular/core';
import {NumericDirective} from './numeric.directive';
import {NumericConfigService, CustomNumericConfig} from './numeric-config.service';

@NgModule({
  declarations: [
    NumericDirective,
  ],
  exports: [
    NumericDirective,
  ]
})
export class LsnNumericModule {
  static forRoot(config?: CustomNumericConfig): ModuleWithProviders<LsnNumericModule> {
    return {
      ngModule: LsnNumericModule,
      providers: [
        NumericConfigService,
        {provide: CustomNumericConfig, useValue: config}
      ]
    };
  }
}
