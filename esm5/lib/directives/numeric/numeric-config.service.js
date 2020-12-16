/**
 * @fileoverview added by tsickle
 * Generated from: lib/directives/numeric/numeric-config.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __assign } from "tslib";
import { Injectable } from '@angular/core';
/** @enum {string} */
var NumericSeparator = {
    COMMA: ",",
    PERIOD: ".",
    SPACE: " ",
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
    /** @type {?|undefined} */
    NumericConfig.prototype.step;
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
    /** @type {?} */
    DefaultNumericConfig.prototype.step;
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
        return __assign(__assign({}, this.getDefaultConfig()), this.config.custom[key]) || this.getDefaultConfig();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtZXJpYy1jb25maWcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bsc25vdmEvYW5ndWxhcm1vZHVsZXMvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9udW1lcmljL251bWVyaWMtY29uZmlnLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7QUFFekMsSUFBSyxnQkFBZ0I7SUFDbkIsS0FBSyxLQUFNO0lBQ1gsTUFBTSxLQUFNO0lBQ1osS0FBSyxLQUFNO0VBQ1o7Ozs7QUFFRCxtQ0FTQzs7O0lBUkMsNEJBQWE7O0lBQ2IsNEJBQWE7O0lBQ2Isa0NBQW1COztJQUNuQixrQ0FBbUI7O0lBQ25CLGlDQUFrQjs7SUFDbEIsa0NBQW1COztJQUNuQiwrQkFBZ0I7O0lBQ2hCLDZCQUFjOztBQUdoQjtJQVNFLDhCQUFZLEtBQVU7UUFBVixzQkFBQSxFQUFBLFVBQVU7UUFMdEIsY0FBUyxHQUFHLENBQUMsQ0FBQztRQUNkLGFBQVEsR0FBVyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUM7UUFLekMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUNILDJCQUFDO0FBQUQsQ0FBQyxBQVpELElBWUM7Ozs7SUFYQyxtQ0FBWTs7SUFDWixtQ0FBWTs7SUFDWix5Q0FBa0I7O0lBQ2xCLHlDQUFjOztJQUNkLHdDQUEyQzs7SUFDM0MseUNBQWtCOztJQUNsQixvQ0FBYTs7QUFPZjtJQUlFLDZCQUFZLEtBQVU7UUFBVixzQkFBQSxFQUFBLFVBQVU7UUFDcEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUNILDBCQUFDO0FBQUQsQ0FBQyxBQVBELElBT0M7Ozs7SUFOQyxzQ0FBd0I7O0lBQ3hCLHFDQUEwQzs7QUFPNUM7SUFJRSw4QkFBWSxNQUEyQjs7WUFFakMsWUFBWSxHQUFHLElBQUksbUJBQW1CLEVBQUU7UUFDNUMsSUFBSSxNQUFNLEVBQUU7WUFDVixZQUFZLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDcEQ7O1lBRUssYUFBYSxHQUFHLFlBQVksQ0FBQyxPQUFPLElBQUksRUFBRTs7WUFDMUMsWUFBWSxHQUFHLFlBQVksQ0FBQyxNQUFNLElBQUksRUFBRTtRQUM5QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksbUJBQW1CLENBQUM7WUFDcEMsT0FBTyxFQUFFLElBQUksb0JBQW9CLENBQUMsYUFBYSxDQUFDO1lBQ2hELE1BQU0sRUFBRSxZQUFZO1NBQ3JCLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFRCwrQ0FBZ0I7OztJQUFoQjtRQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDN0IsQ0FBQzs7Ozs7SUFFRCw4Q0FBZTs7OztJQUFmLFVBQWdCLEdBQUc7UUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzVCLE9BQU8sQ0FBQyxJQUFJLENBQUMsMkNBQTJDLENBQUMsQ0FBQztTQUMzRDtRQUNELE9BQU8sc0JBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFLEdBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDN0YsQ0FBQzs7Z0JBNUJGLFVBQVU7Ozs7Z0JBSVcsbUJBQW1COztJQXlCekMsMkJBQUM7Q0FBQSxBQTdCRCxJQTZCQztTQTVCWSxvQkFBb0I7Ozs7OztJQUMvQixzQ0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5lbnVtIE51bWVyaWNTZXBhcmF0b3Ige1xuICBDT01NQSA9ICcsJyxcbiAgUEVSSU9EID0gJy4nLFxuICBTUEFDRSA9ICcgJ1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE51bWVyaWNDb25maWcge1xuICBtaW4/OiBudW1iZXI7XG4gIG1heD86IG51bWJlcjtcbiAgbWF4TGVuZ3RoPzogbnVtYmVyO1xuICBwcmVjaXNpb24/OiBudW1iZXI7XG4gIGRlY2ltYWxzPzogc3RyaW5nO1xuICB0aG91c2FuZHM/OiBzdHJpbmc7XG4gIGNvbmZpZz86IHN0cmluZztcbiAgc3RlcD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIERlZmF1bHROdW1lcmljQ29uZmlnIGltcGxlbWVudHMgTnVtZXJpY0NvbmZpZyB7XG4gIG1pbjogbnVtYmVyO1xuICBtYXg6IG51bWJlcjtcbiAgbWF4TGVuZ3RoOiBudW1iZXI7XG4gIHByZWNpc2lvbiA9IDA7XG4gIGRlY2ltYWxzOiBzdHJpbmcgPSBOdW1lcmljU2VwYXJhdG9yLlBFUklPRDtcbiAgdGhvdXNhbmRzOiBzdHJpbmc7XG4gIHN0ZXA6IG51bWJlcjtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcyA9IHt9KSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBwcm9wcyk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEN1c3RvbU51bWVyaWNDb25maWcge1xuICBkZWZhdWx0PzogTnVtZXJpY0NvbmZpZztcbiAgY3VzdG9tPzogeyBba2V5OiBzdHJpbmddOiBOdW1lcmljQ29uZmlnIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMgPSB7fSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgcHJvcHMpO1xuICB9XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOdW1lcmljQ29uZmlnU2VydmljZSB7XG4gIHByaXZhdGUgY29uZmlnOiBDdXN0b21OdW1lcmljQ29uZmlnO1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogQ3VzdG9tTnVtZXJpY0NvbmZpZykge1xuXG4gICAgbGV0IG1vZHVsZUNvbmZpZyA9IG5ldyBDdXN0b21OdW1lcmljQ29uZmlnKCk7XG4gICAgaWYgKGNvbmZpZykge1xuICAgICAgbW9kdWxlQ29uZmlnID0gT2JqZWN0LmFzc2lnbihtb2R1bGVDb25maWcsIGNvbmZpZyk7XG4gICAgfVxuXG4gICAgY29uc3QgbnVtZXJpY0NvbmZpZyA9IG1vZHVsZUNvbmZpZy5kZWZhdWx0IHx8IHt9O1xuICAgIGNvbnN0IGN1c3RvbUNvbmZpZyA9IG1vZHVsZUNvbmZpZy5jdXN0b20gfHwge307XG4gICAgdGhpcy5jb25maWcgPSBuZXcgQ3VzdG9tTnVtZXJpY0NvbmZpZyh7XG4gICAgICBkZWZhdWx0OiBuZXcgRGVmYXVsdE51bWVyaWNDb25maWcobnVtZXJpY0NvbmZpZyksXG4gICAgICBjdXN0b206IGN1c3RvbUNvbmZpZyxcbiAgICB9KTtcbiAgfVxuXG4gIGdldERlZmF1bHRDb25maWcoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmRlZmF1bHQ7XG4gIH1cblxuICBnZXRDdXN0b21Db25maWcoa2V5KSB7XG4gICAgaWYgKCF0aGlzLmNvbmZpZy5jdXN0b21ba2V5XSkge1xuICAgICAgY29uc29sZS53YXJuKCdbbHNuTnVtZXJpY10gSW52YWxpZCBjb25maWcga2V5IHByb3ZpZGVkLicpO1xuICAgIH1cbiAgICByZXR1cm4gey4uLnRoaXMuZ2V0RGVmYXVsdENvbmZpZygpLCAuLi50aGlzLmNvbmZpZy5jdXN0b21ba2V5XX0gfHwgdGhpcy5nZXREZWZhdWx0Q29uZmlnKCk7XG4gIH1cbn1cbiJdfQ==