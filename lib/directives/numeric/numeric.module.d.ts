import { ModuleWithProviders } from '@angular/core';
import { CustomNumericConfig } from './numeric-config.service';
import * as i0 from "@angular/core";
import * as i1 from "./numeric.directive";
export declare class LsnNumericModule {
    static forRoot(config?: CustomNumericConfig): ModuleWithProviders<LsnNumericModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<LsnNumericModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<LsnNumericModule, [typeof i1.NumericDirective], never, [typeof i1.NumericDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<LsnNumericModule>;
}
