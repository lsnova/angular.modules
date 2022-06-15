import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
var NumericSeparator;
(function (NumericSeparator) {
    NumericSeparator["COMMA"] = ",";
    NumericSeparator["PERIOD"] = ".";
    NumericSeparator["SPACE"] = " ";
})(NumericSeparator || (NumericSeparator = {}));
export class DefaultNumericConfig {
    constructor(props = {}) {
        this.precision = 0;
        this.decimals = NumericSeparator.PERIOD;
        this.noScientificNotation = false;
        this.alwaysDisplayDecimals = false;
        Object.assign(this, props);
    }
}
export class CustomNumericConfig {
    constructor(props = {}) {
        Object.assign(this, props);
    }
}
export class NumericConfigService {
    constructor(config) {
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
        return { ...this.getDefaultConfig(), ...this.config.custom[key] } || this.getDefaultConfig();
    }
}
/** @nocollapse */ NumericConfigService.ɵfac = function NumericConfigService_Factory(t) { return new (t || NumericConfigService)(i0.ɵɵinject(CustomNumericConfig)); };
/** @nocollapse */ NumericConfigService.ɵprov = /** @pureOrBreakMyCode */ i0.ɵɵdefineInjectable({ token: NumericConfigService, factory: NumericConfigService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NumericConfigService, [{
        type: Injectable
    }], function () { return [{ type: CustomNumericConfig }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtZXJpYy1jb25maWcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2xzbi1saWJzL3NyYy9saWIvZGlyZWN0aXZlcy9udW1lcmljL251bWVyaWMtY29uZmlnLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7QUFFekMsSUFBSyxnQkFJSjtBQUpELFdBQUssZ0JBQWdCO0lBQ25CLCtCQUFXLENBQUE7SUFDWCxnQ0FBWSxDQUFBO0lBQ1osK0JBQVcsQ0FBQTtBQUNiLENBQUMsRUFKSSxnQkFBZ0IsS0FBaEIsZ0JBQWdCLFFBSXBCO0FBZUQsTUFBTSxPQUFPLG9CQUFvQjtJQVcvQixZQUFZLEtBQUssR0FBRyxFQUFFO1FBUHRCLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxhQUFRLEdBQVcsZ0JBQWdCLENBQUMsTUFBTSxDQUFDO1FBRzNDLHlCQUFvQixHQUFHLEtBQUssQ0FBQztRQUM3QiwwQkFBcUIsR0FBRyxLQUFLLENBQUM7UUFHNUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztDQUNGO0FBRUQsTUFBTSxPQUFPLG1CQUFtQjtJQUk5QixZQUFZLEtBQUssR0FBRyxFQUFFO1FBQ3BCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7Q0FDRjtBQUdELE1BQU0sT0FBTyxvQkFBb0I7SUFHL0IsWUFBWSxNQUEyQjtRQUVyQyxJQUFJLFlBQVksR0FBRyxJQUFJLG1CQUFtQixFQUFFLENBQUM7UUFDN0MsSUFBSSxNQUFNLEVBQUU7WUFDVixZQUFZLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDcEQ7UUFFRCxNQUFNLGFBQWEsR0FBRyxZQUFZLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUNqRCxNQUFNLFlBQVksR0FBRyxZQUFZLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztRQUMvQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksbUJBQW1CLENBQUM7WUFDcEMsT0FBTyxFQUFFLElBQUksb0JBQW9CLENBQUMsYUFBYSxDQUFDO1lBQ2hELE1BQU0sRUFBRSxZQUFZO1NBQ3JCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxnQkFBZ0I7UUFDZCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQzdCLENBQUM7SUFFRCxlQUFlLENBQUMsR0FBRztRQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDNUIsT0FBTyxDQUFDLElBQUksQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO1NBQzNEO1FBQ0QsT0FBTyxFQUFDLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBQyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzdGLENBQUM7OzJHQTNCVSxvQkFBb0IsY0FHWCxtQkFBbUI7eUdBSDVCLG9CQUFvQixXQUFwQixvQkFBb0I7dUZBQXBCLG9CQUFvQjtjQURoQyxVQUFVO3NDQUlXLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmVudW0gTnVtZXJpY1NlcGFyYXRvciB7XG4gIENPTU1BID0gJywnLFxuICBQRVJJT0QgPSAnLicsXG4gIFNQQUNFID0gJyAnXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTnVtZXJpY0NvbmZpZyB7XG4gIG1pbj86IG51bWJlcjtcbiAgbWF4PzogbnVtYmVyO1xuICBtYXhMZW5ndGg/OiBudW1iZXI7XG4gIHByZWNpc2lvbj86IG51bWJlcjtcbiAgZGVjaW1hbHM/OiBzdHJpbmc7XG4gIHRob3VzYW5kcz86IHN0cmluZztcbiAgY29uZmlnPzogc3RyaW5nO1xuICBzdGVwPzogbnVtYmVyO1xuICBub1NjaWVudGlmaWNOb3RhdGlvbj86IGJvb2xlYW47XG4gIGFsd2F5c0Rpc3BsYXlEZWNpbWFscz86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBEZWZhdWx0TnVtZXJpY0NvbmZpZyBpbXBsZW1lbnRzIE51bWVyaWNDb25maWcge1xuICBtaW46IG51bWJlcjtcbiAgbWF4OiBudW1iZXI7XG4gIG1heExlbmd0aDogbnVtYmVyO1xuICBwcmVjaXNpb24gPSAwO1xuICBkZWNpbWFsczogc3RyaW5nID0gTnVtZXJpY1NlcGFyYXRvci5QRVJJT0Q7XG4gIHRob3VzYW5kczogc3RyaW5nO1xuICBzdGVwOiBudW1iZXI7XG4gIG5vU2NpZW50aWZpY05vdGF0aW9uID0gZmFsc2U7XG4gIGFsd2F5c0Rpc3BsYXlEZWNpbWFscyA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzID0ge30pIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHByb3BzKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ3VzdG9tTnVtZXJpY0NvbmZpZyB7XG4gIGRlZmF1bHQ/OiBOdW1lcmljQ29uZmlnO1xuICBjdXN0b20/OiB7IFtrZXk6IHN0cmluZ106IE51bWVyaWNDb25maWcgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcyA9IHt9KSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBwcm9wcyk7XG4gIH1cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE51bWVyaWNDb25maWdTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBjb25maWc6IEN1c3RvbU51bWVyaWNDb25maWc7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBDdXN0b21OdW1lcmljQ29uZmlnKSB7XG5cbiAgICBsZXQgbW9kdWxlQ29uZmlnID0gbmV3IEN1c3RvbU51bWVyaWNDb25maWcoKTtcbiAgICBpZiAoY29uZmlnKSB7XG4gICAgICBtb2R1bGVDb25maWcgPSBPYmplY3QuYXNzaWduKG1vZHVsZUNvbmZpZywgY29uZmlnKTtcbiAgICB9XG5cbiAgICBjb25zdCBudW1lcmljQ29uZmlnID0gbW9kdWxlQ29uZmlnLmRlZmF1bHQgfHwge307XG4gICAgY29uc3QgY3VzdG9tQ29uZmlnID0gbW9kdWxlQ29uZmlnLmN1c3RvbSB8fCB7fTtcbiAgICB0aGlzLmNvbmZpZyA9IG5ldyBDdXN0b21OdW1lcmljQ29uZmlnKHtcbiAgICAgIGRlZmF1bHQ6IG5ldyBEZWZhdWx0TnVtZXJpY0NvbmZpZyhudW1lcmljQ29uZmlnKSxcbiAgICAgIGN1c3RvbTogY3VzdG9tQ29uZmlnLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0RGVmYXVsdENvbmZpZygpIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcuZGVmYXVsdDtcbiAgfVxuXG4gIGdldEN1c3RvbUNvbmZpZyhrZXkpIHtcbiAgICBpZiAoIXRoaXMuY29uZmlnLmN1c3RvbVtrZXldKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1tsc25OdW1lcmljXSBJbnZhbGlkIGNvbmZpZyBrZXkgcHJvdmlkZWQuJyk7XG4gICAgfVxuICAgIHJldHVybiB7Li4udGhpcy5nZXREZWZhdWx0Q29uZmlnKCksIC4uLnRoaXMuY29uZmlnLmN1c3RvbVtrZXldfSB8fCB0aGlzLmdldERlZmF1bHRDb25maWcoKTtcbiAgfVxufVxuIl19