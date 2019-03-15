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
        var moduleConfig = new CustomConfig();
        if (config) {
            moduleConfig = Object.assign(moduleConfig, config);
        }
        /** @type {?} */
        var numericConfig = moduleConfig.numeric || {};
        /** @type {?} */
        var customConfig = moduleConfig.custom || {};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbHNub3ZhL2FuZ3VsYXJtb2R1bGVzLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2NvbmZpZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7SUFHdkMsT0FBUSxHQUFHO0lBQ1gsUUFBUyxHQUFHO0lBQ1osT0FBUSxHQUFHOzs7OztBQUdiLG1DQVFDOzs7SUFQQyw0QkFBYTs7SUFDYiw0QkFBYTs7SUFDYixrQ0FBbUI7O0lBQ25CLGtDQUFtQjs7SUFDbkIsaUNBQWtCOztJQUNsQixrQ0FBbUI7O0lBQ25CLCtCQUFnQjs7QUFHbEI7SUFRRSw4QkFBWSxLQUFVO1FBQVYsc0JBQUEsRUFBQSxVQUFVO1FBSnRCLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxhQUFRLEdBQVcsZ0JBQWdCLENBQUMsTUFBTSxDQUFDO1FBSXpDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDSCwyQkFBQztBQUFELENBQUMsQUFYRCxJQVdDOzs7O0lBVkMsbUNBQVk7O0lBQ1osbUNBQVk7O0lBQ1oseUNBQWtCOztJQUNsQix5Q0FBYzs7SUFDZCx3Q0FBMkM7O0lBQzNDLHlDQUFrQjs7QUFPcEI7SUFJRSxzQkFBWSxLQUFVO1FBQVYsc0JBQUEsRUFBQSxVQUFVO1FBQ3BCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDSCxtQkFBQztBQUFELENBQUMsQUFQRCxJQU9DOzs7O0lBTkMsK0JBQXdCOztJQUN4Qiw4QkFBMEM7O0FBTzVDO0lBSUUsdUJBQVksTUFBb0I7O1lBRTFCLFlBQVksR0FBRyxJQUFJLFlBQVksRUFBRTtRQUNyQyxJQUFJLE1BQU0sRUFBRTtZQUNWLFlBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztTQUNwRDs7WUFFSyxhQUFhLEdBQUcsWUFBWSxDQUFDLE9BQU8sSUFBSSxFQUFFOztZQUMxQyxZQUFZLEdBQUcsWUFBWSxDQUFDLE1BQU0sSUFBSSxFQUFFO1FBQzlDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxZQUFZLENBQUM7WUFDN0IsT0FBTyxFQUFFLElBQUksb0JBQW9CLENBQUMsYUFBYSxDQUFDO1lBQ2hELE1BQU0sRUFBRSxZQUFZO1NBQ3JCLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFRCx3Q0FBZ0I7OztJQUFoQjtRQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDN0IsQ0FBQzs7Ozs7SUFFRCx1Q0FBZTs7OztJQUFmLFVBQWdCLEdBQUc7UUFDakIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdkMsQ0FBQzs7Z0JBekJGLFVBQVU7Ozs7Z0JBSVcsWUFBWTs7SUFzQmxDLG9CQUFDO0NBQUEsQUExQkQsSUEwQkM7U0F6QlksYUFBYTs7Ozs7O0lBQ3hCLCtCQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmVudW0gTnVtZXJpY1NlcGFyYXRvciB7XG4gIENPTU1BID0gJywnLFxuICBQRVJJT0QgPSAnLicsXG4gIFNQQUNFID0gJyAnXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTnVtZXJpY0NvbmZpZyB7XG4gIG1pbj86IG51bWJlcjtcbiAgbWF4PzogbnVtYmVyO1xuICBtYXhMZW5ndGg/OiBudW1iZXI7XG4gIHByZWNpc2lvbj86IG51bWJlcjtcbiAgZGVjaW1hbHM/OiBzdHJpbmc7XG4gIHRob3VzYW5kcz86IHN0cmluZztcbiAgY29uZmlnPzogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgRGVmYXVsdE51bWVyaWNDb25maWcgaW1wbGVtZW50cyBOdW1lcmljQ29uZmlnIHtcbiAgbWluOiBudW1iZXI7XG4gIG1heDogbnVtYmVyO1xuICBtYXhMZW5ndGg6IG51bWJlcjtcbiAgcHJlY2lzaW9uID0gMDtcbiAgZGVjaW1hbHM6IHN0cmluZyA9IE51bWVyaWNTZXBhcmF0b3IuUEVSSU9EO1xuICB0aG91c2FuZHM6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcm9wcyA9IHt9KSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBwcm9wcyk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEN1c3RvbUNvbmZpZyB7XG4gIG51bWVyaWM/OiBOdW1lcmljQ29uZmlnO1xuICBjdXN0b20/OiB7IFtrZXk6IHN0cmluZ106IE51bWVyaWNDb25maWcgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcyA9IHt9KSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBwcm9wcyk7XG4gIH1cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbmZpZ1NlcnZpY2Uge1xuICBwcml2YXRlIGNvbmZpZzogQ3VzdG9tQ29uZmlnO1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogQ3VzdG9tQ29uZmlnKSB7XG5cbiAgICBsZXQgbW9kdWxlQ29uZmlnID0gbmV3IEN1c3RvbUNvbmZpZygpO1xuICAgIGlmIChjb25maWcpIHtcbiAgICAgIG1vZHVsZUNvbmZpZyA9IE9iamVjdC5hc3NpZ24obW9kdWxlQ29uZmlnLCBjb25maWcpO1xuICAgIH1cblxuICAgIGNvbnN0IG51bWVyaWNDb25maWcgPSBtb2R1bGVDb25maWcubnVtZXJpYyB8fCB7fTtcbiAgICBjb25zdCBjdXN0b21Db25maWcgPSBtb2R1bGVDb25maWcuY3VzdG9tIHx8IHt9O1xuICAgIHRoaXMuY29uZmlnID0gbmV3IEN1c3RvbUNvbmZpZyh7XG4gICAgICBudW1lcmljOiBuZXcgRGVmYXVsdE51bWVyaWNDb25maWcobnVtZXJpY0NvbmZpZyksXG4gICAgICBjdXN0b206IGN1c3RvbUNvbmZpZyxcbiAgICB9KTtcbiAgfVxuXG4gIGdldE51bWVyaWNDb25maWcoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLm51bWVyaWM7XG4gIH1cblxuICBnZXRDdXN0b21Db25maWcoa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmN1c3RvbVtrZXldIHx8IHt9O1xuICB9XG59XG4iXX0=