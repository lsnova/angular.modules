/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
/** @enum {string} */
var NumericSeparator = {
    COMMA: ',',
    PERIOD: '.',
    SPACE: ' ',
};
/**
 * @record
 */
export function NumericConfig() { }
if (false) {
    /** @type {?|undefined} */
    NumericConfig.prototype.min;
    /** @type {?|undefined} */
    NumericConfig.prototype.max;
    /** @type {?|undefined} */
    NumericConfig.prototype.maxLength;
    /** @type {?|undefined} */
    NumericConfig.prototype.precision;
    /** @type {?|undefined} */
    NumericConfig.prototype.decimals;
    /** @type {?|undefined} */
    NumericConfig.prototype.thousands;
    /** @type {?|undefined} */
    NumericConfig.prototype.config;
}
var DefaultNumericConfig = /** @class */ (function () {
    function DefaultNumericConfig(props) {
        if (props === void 0) { props = {}; }
        this.precision = 0;
        this.decimals = NumericSeparator.PERIOD;
        Object.assign(this, props);
    }
    return DefaultNumericConfig;
}());
export { DefaultNumericConfig };
if (false) {
    /** @type {?} */
    DefaultNumericConfig.prototype.min;
    /** @type {?} */
    DefaultNumericConfig.prototype.max;
    /** @type {?} */
    DefaultNumericConfig.prototype.maxLength;
    /** @type {?} */
    DefaultNumericConfig.prototype.precision;
    /** @type {?} */
    DefaultNumericConfig.prototype.decimals;
    /** @type {?} */
    DefaultNumericConfig.prototype.thousands;
}
var CustomNumericConfig = /** @class */ (function () {
    function CustomNumericConfig(props) {
        if (props === void 0) { props = {}; }
        Object.assign(this, props);
    }
    return CustomNumericConfig;
}());
export { CustomNumericConfig };
if (false) {
    /** @type {?} */
    CustomNumericConfig.prototype.default;
    /** @type {?} */
    CustomNumericConfig.prototype.custom;
}
var NumericConfigService = /** @class */ (function () {
    function NumericConfigService(config) {
        /** @type {?} */
        var moduleConfig = new CustomNumericConfig();
        if (config) {
            moduleConfig = Object.assign(moduleConfig, config);
        }
        /** @type {?} */
        var numericConfig = moduleConfig.default || {};
        /** @type {?} */
        var customConfig = moduleConfig.custom || {};
        this.config = new CustomNumericConfig({
            default: new DefaultNumericConfig(numericConfig),
            custom: customConfig,
        });
    }
    /**
     * @return {?}
     */
    NumericConfigService.prototype.getDefaultConfig = /**
     * @return {?}
     */
    function () {
        return this.config.default;
    };
    /**
     * @param {?} key
     * @return {?}
     */
    NumericConfigService.prototype.getCustomConfig = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        if (!this.config.custom[key]) {
            console.warn('[lsnNumeric] Invalid config key provided.');
        }
        return this.config.custom[key] || {};
    };
    NumericConfigService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    NumericConfigService.ctorParameters = function () { return [
        { type: CustomNumericConfig }
    ]; };
    return NumericConfigService;
}());
export { NumericConfigService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    NumericConfigService.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtZXJpYy1jb25maWcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bsc25vdmEvYW5ndWxhcm1vZHVsZXMvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9udW1lcmljL251bWVyaWMtY29uZmlnLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7OztJQUd2QyxPQUFRLEdBQUc7SUFDWCxRQUFTLEdBQUc7SUFDWixPQUFRLEdBQUc7Ozs7O0FBR2IsbUNBUUM7OztJQVBDLDRCQUFhOztJQUNiLDRCQUFhOztJQUNiLGtDQUFtQjs7SUFDbkIsa0NBQW1COztJQUNuQixpQ0FBa0I7O0lBQ2xCLGtDQUFtQjs7SUFDbkIsK0JBQWdCOztBQUdsQjtJQVFFLDhCQUFZLEtBQVU7UUFBVixzQkFBQSxFQUFBLFVBQVU7UUFKdEIsY0FBUyxHQUFHLENBQUMsQ0FBQztRQUNkLGFBQVEsR0FBVyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUM7UUFJekMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUNILDJCQUFDO0FBQUQsQ0FBQyxBQVhELElBV0M7Ozs7SUFWQyxtQ0FBWTs7SUFDWixtQ0FBWTs7SUFDWix5Q0FBa0I7O0lBQ2xCLHlDQUFjOztJQUNkLHdDQUEyQzs7SUFDM0MseUNBQWtCOztBQU9wQjtJQUlFLDZCQUFZLEtBQVU7UUFBVixzQkFBQSxFQUFBLFVBQVU7UUFDcEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUNILDBCQUFDO0FBQUQsQ0FBQyxBQVBELElBT0M7Ozs7SUFOQyxzQ0FBd0I7O0lBQ3hCLHFDQUEwQzs7QUFPNUM7SUFJRSw4QkFBWSxNQUEyQjs7WUFFakMsWUFBWSxHQUFHLElBQUksbUJBQW1CLEVBQUU7UUFDNUMsSUFBSSxNQUFNLEVBQUU7WUFDVixZQUFZLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDcEQ7O1lBRUssYUFBYSxHQUFHLFlBQVksQ0FBQyxPQUFPLElBQUksRUFBRTs7WUFDMUMsWUFBWSxHQUFHLFlBQVksQ0FBQyxNQUFNLElBQUksRUFBRTtRQUM5QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksbUJBQW1CLENBQUM7WUFDcEMsT0FBTyxFQUFFLElBQUksb0JBQW9CLENBQUMsYUFBYSxDQUFDO1lBQ2hELE1BQU0sRUFBRSxZQUFZO1NBQ3JCLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFRCwrQ0FBZ0I7OztJQUFoQjtRQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDN0IsQ0FBQzs7Ozs7SUFFRCw4Q0FBZTs7OztJQUFmLFVBQWdCLEdBQUc7UUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzVCLE9BQU8sQ0FBQyxJQUFJLENBQUMsMkNBQTJDLENBQUMsQ0FBQztTQUMzRDtRQUNELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3ZDLENBQUM7O2dCQTVCRixVQUFVOzs7O2dCQUlXLG1CQUFtQjs7SUF5QnpDLDJCQUFDO0NBQUEsQUE3QkQsSUE2QkM7U0E1Qlksb0JBQW9COzs7Ozs7SUFDL0Isc0NBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZW51bSBOdW1lcmljU2VwYXJhdG9yIHtcbiAgQ09NTUEgPSAnLCcsXG4gIFBFUklPRCA9ICcuJyxcbiAgU1BBQ0UgPSAnICdcbn1cblxuZXhwb3J0IGludGVyZmFjZSBOdW1lcmljQ29uZmlnIHtcbiAgbWluPzogbnVtYmVyO1xuICBtYXg/OiBudW1iZXI7XG4gIG1heExlbmd0aD86IG51bWJlcjtcbiAgcHJlY2lzaW9uPzogbnVtYmVyO1xuICBkZWNpbWFscz86IHN0cmluZztcbiAgdGhvdXNhbmRzPzogc3RyaW5nO1xuICBjb25maWc/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBEZWZhdWx0TnVtZXJpY0NvbmZpZyBpbXBsZW1lbnRzIE51bWVyaWNDb25maWcge1xuICBtaW46IG51bWJlcjtcbiAgbWF4OiBudW1iZXI7XG4gIG1heExlbmd0aDogbnVtYmVyO1xuICBwcmVjaXNpb24gPSAwO1xuICBkZWNpbWFsczogc3RyaW5nID0gTnVtZXJpY1NlcGFyYXRvci5QRVJJT0Q7XG4gIHRob3VzYW5kczogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzID0ge30pIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHByb3BzKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ3VzdG9tTnVtZXJpY0NvbmZpZyB7XG4gIGRlZmF1bHQ/OiBOdW1lcmljQ29uZmlnO1xuICBjdXN0b20/OiB7IFtrZXk6IHN0cmluZ106IE51bWVyaWNDb25maWcgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcyA9IHt9KSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBwcm9wcyk7XG4gIH1cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE51bWVyaWNDb25maWdTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBjb25maWc6IEN1c3RvbU51bWVyaWNDb25maWc7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBDdXN0b21OdW1lcmljQ29uZmlnKSB7XG5cbiAgICBsZXQgbW9kdWxlQ29uZmlnID0gbmV3IEN1c3RvbU51bWVyaWNDb25maWcoKTtcbiAgICBpZiAoY29uZmlnKSB7XG4gICAgICBtb2R1bGVDb25maWcgPSBPYmplY3QuYXNzaWduKG1vZHVsZUNvbmZpZywgY29uZmlnKTtcbiAgICB9XG5cbiAgICBjb25zdCBudW1lcmljQ29uZmlnID0gbW9kdWxlQ29uZmlnLmRlZmF1bHQgfHwge307XG4gICAgY29uc3QgY3VzdG9tQ29uZmlnID0gbW9kdWxlQ29uZmlnLmN1c3RvbSB8fCB7fTtcbiAgICB0aGlzLmNvbmZpZyA9IG5ldyBDdXN0b21OdW1lcmljQ29uZmlnKHtcbiAgICAgIGRlZmF1bHQ6IG5ldyBEZWZhdWx0TnVtZXJpY0NvbmZpZyhudW1lcmljQ29uZmlnKSxcbiAgICAgIGN1c3RvbTogY3VzdG9tQ29uZmlnLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0RGVmYXVsdENvbmZpZygpIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcuZGVmYXVsdDtcbiAgfVxuXG4gIGdldEN1c3RvbUNvbmZpZyhrZXkpIHtcbiAgICBpZiAoIXRoaXMuY29uZmlnLmN1c3RvbVtrZXldKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1tsc25OdW1lcmljXSBJbnZhbGlkIGNvbmZpZyBrZXkgcHJvdmlkZWQuJyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNvbmZpZy5jdXN0b21ba2V5XSB8fCB7fTtcbiAgfVxufVxuIl19