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
    DefaultNumericConfig.prototype.precision;
    /** @type {?} */
    DefaultNumericConfig.prototype.decimals;
    /** @type {?} */
    DefaultNumericConfig.prototype.thousands;
}
var CustomConfig = /** @class */ (function () {
    function CustomConfig(props) {
        if (props === void 0) { props = {}; }
        Object.assign(this, props);
    }
    return CustomConfig;
}());
export { CustomConfig };
if (false) {
    /** @type {?} */
    CustomConfig.prototype.numeric;
    /** @type {?} */
    CustomConfig.prototype.custom;
}
var ConfigService = /** @class */ (function () {
    function ConfigService(config) {
        /** @type {?} */
        var numericConfig = config.numeric || {};
        /** @type {?} */
        var customConfig = config.custom || {};
        this.config = new CustomConfig({
            numeric: new DefaultNumericConfig(numericConfig),
            custom: customConfig,
        });
    }
    /**
     * @return {?}
     */
    ConfigService.prototype.getNumericConfig = /**
     * @return {?}
     */
    function () {
        return this.config.numeric;
    };
    /**
     * @param {?} key
     * @return {?}
     */
    ConfigService.prototype.getCustomConfig = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return this.config.custom[key] || {};
    };
    ConfigService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ConfigService.ctorParameters = function () { return [
        { type: CustomConfig }
    ]; };
    return ConfigService;
}());
export { ConfigService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ConfigService.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbHNub3ZhL2FuZ3VsYXJtb2R1bGVzLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2NvbmZpZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7SUFHdkMsT0FBUSxHQUFHO0lBQ1gsUUFBUyxHQUFHO0lBQ1osT0FBUSxHQUFHOzs7OztBQUdiLG1DQU9DOzs7SUFOQyw0QkFBYTs7SUFDYiw0QkFBYTs7SUFDYixrQ0FBbUI7O0lBQ25CLGlDQUFrQjs7SUFDbEIsa0NBQW1COztJQUNuQiwrQkFBZ0I7O0FBR2xCO0lBT0UsOEJBQVksS0FBVTtRQUFWLHNCQUFBLEVBQUEsVUFBVTtRQUp0QixjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsYUFBUSxHQUFXLGdCQUFnQixDQUFDLE1BQU0sQ0FBQztRQUl6QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0gsMkJBQUM7QUFBRCxDQUFDLEFBVkQsSUFVQzs7OztJQVRDLG1DQUFZOztJQUNaLG1DQUFZOztJQUNaLHlDQUFjOztJQUNkLHdDQUEyQzs7SUFDM0MseUNBQWtCOztBQU9wQjtJQUlFLHNCQUFZLEtBQVU7UUFBVixzQkFBQSxFQUFBLFVBQVU7UUFDcEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUNILG1CQUFDO0FBQUQsQ0FBQyxBQVBELElBT0M7Ozs7SUFOQywrQkFBd0I7O0lBQ3hCLDhCQUF3Qzs7QUFPMUM7SUFJRSx1QkFBWSxNQUFvQjs7WUFDeEIsYUFBYSxHQUFHLE1BQU0sQ0FBQyxPQUFPLElBQUksRUFBRTs7WUFDcEMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUksRUFBRTtRQUN4QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksWUFBWSxDQUFDO1lBQzdCLE9BQU8sRUFBRSxJQUFJLG9CQUFvQixDQUFDLGFBQWEsQ0FBQztZQUNoRCxNQUFNLEVBQUUsWUFBWTtTQUNyQixDQUFDLENBQUM7SUFDTCxDQUFDOzs7O0lBRUQsd0NBQWdCOzs7SUFBaEI7UUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQzdCLENBQUM7Ozs7O0lBRUQsdUNBQWU7Ozs7SUFBZixVQUFnQixHQUFHO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3ZDLENBQUM7O2dCQW5CRixVQUFVOzs7O2dCQUlXLFlBQVk7O0lBZ0JsQyxvQkFBQztDQUFBLEFBcEJELElBb0JDO1NBbkJZLGFBQWE7Ozs7OztJQUN4QiwrQkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5lbnVtIE51bWVyaWNTZXBhcmF0b3Ige1xuICBDT01NQSA9ICcsJyxcbiAgUEVSSU9EID0gJy4nLFxuICBTUEFDRSA9ICcgJ1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE51bWVyaWNDb25maWcge1xuICBtaW4/OiBudW1iZXI7XG4gIG1heD86IG51bWJlcjtcbiAgcHJlY2lzaW9uPzogbnVtYmVyO1xuICBkZWNpbWFscz86IHN0cmluZztcbiAgdGhvdXNhbmRzPzogc3RyaW5nO1xuICBjb25maWc/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBEZWZhdWx0TnVtZXJpY0NvbmZpZyBpbXBsZW1lbnRzIE51bWVyaWNDb25maWcge1xuICBtaW46IG51bWJlcjtcbiAgbWF4OiBudW1iZXI7XG4gIHByZWNpc2lvbiA9IDA7XG4gIGRlY2ltYWxzOiBzdHJpbmcgPSBOdW1lcmljU2VwYXJhdG9yLlBFUklPRDtcbiAgdGhvdXNhbmRzOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJvcHMgPSB7fSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgcHJvcHMpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDdXN0b21Db25maWcge1xuICBudW1lcmljPzogTnVtZXJpY0NvbmZpZztcbiAgY3VzdG9tPzoge1trZXk6IHN0cmluZ106IE51bWVyaWNDb25maWd9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzID0ge30pIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHByb3BzKTtcbiAgfVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29uZmlnU2VydmljZSB7XG4gIHByaXZhdGUgY29uZmlnOiBDdXN0b21Db25maWc7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBDdXN0b21Db25maWcpIHtcbiAgICBjb25zdCBudW1lcmljQ29uZmlnID0gY29uZmlnLm51bWVyaWMgfHwge307XG4gICAgY29uc3QgY3VzdG9tQ29uZmlnID0gY29uZmlnLmN1c3RvbSB8fCB7fTtcbiAgICB0aGlzLmNvbmZpZyA9IG5ldyBDdXN0b21Db25maWcoe1xuICAgICAgbnVtZXJpYzogbmV3IERlZmF1bHROdW1lcmljQ29uZmlnKG51bWVyaWNDb25maWcpLFxuICAgICAgY3VzdG9tOiBjdXN0b21Db25maWcsXG4gICAgfSk7XG4gIH1cblxuICBnZXROdW1lcmljQ29uZmlnKCkge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5udW1lcmljO1xuICB9XG5cbiAgZ2V0Q3VzdG9tQ29uZmlnKGtleSkge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5jdXN0b21ba2V5XSB8fCB7fTtcbiAgfVxufVxuIl19