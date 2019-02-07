import {ModuleWithProviders, NgModule} from '@angular/core';
import {CapitalizeDirective} from './directives/capitalize/capitalize.directive';
import {LatinToGreekDirective} from './directives/latin-to-greek/latin-to-greek.directive';
import {NumericDirective} from './directives/numeric/numeric.directive';
import {NumPadDirective} from './directives/numpad/numpad.directive';
import {ConfigService, CustomConfig} from './services/config.service';

@NgModule({
  declarations: [
    CapitalizeDirective,
    LatinToGreekDirective,
    NumericDirective,
    NumPadDirective,
  ],
  imports: [],
  exports: [
    CapitalizeDirective,
    LatinToGreekDirective,
    NumericDirective,
    NumPadDirective,
  ]
})
export class LsnLibsModule {
  static forRoot(config?: CustomConfig): ModuleWithProviders {
    let moduleConfig = new CustomConfig();
    if (config) {
      moduleConfig = Object.assign(moduleConfig, config);
    }
    return {
      ngModule: LsnLibsModule,
      providers: [
        ConfigService,
        {provide: CustomConfig, useValue: moduleConfig }
      ]
    };
  }
}
