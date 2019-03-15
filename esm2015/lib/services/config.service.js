/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
/** @enum {string} */
const NumericSeparator = {
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
export class DefaultNumericConfig {
    /**
     * @param {?=} props
     */
    constructor(props = {}) {
        this.precision = 0;
        this.decimals = NumericSeparator.PERIOD;
        Object.assign(this, props);
    }
}
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
export class CustomConfig {
    /**
     * @param {?=} props
     */
    constructor(props = {}) {
        Object.assign(this, props);
    }
}
if (false) {
    /** @type {?} */
    CustomConfig.prototype.numeric;
    /** @type {?} */
    CustomConfig.prototype.custom;
}
export class ConfigService {
    /**
     * @param {?} config
     */
    constructor(config) {
        /** @type {?} */
        let moduleConfig = new CustomConfig();
        if (config) {
            moduleConfig = Object.assign(moduleConfig, config);
        }
        /** @type {?} */
        const numericConfig = moduleConfig.numeric || {};
        /** @type {?} */
        const customConfig = moduleConfig.custom || {};
        this.config = new CustomConfig({
            numeric: new DefaultNumericConfig(numericConfig),
            custom: customConfig,
        });
    }
    /**
     * @return {?}
     */
    getNumericConfig() {
        return this.config.numeric;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    getCustomConfig(key) {
        return this.config.custom[key] || {};
    }
}
ConfigService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ConfigService.ctorParameters = () => [
    { type: CustomConfig }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    ConfigService.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbHNub3ZhL2FuZ3VsYXJtb2R1bGVzLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2NvbmZpZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7SUFHdkMsT0FBUSxHQUFHO0lBQ1gsUUFBUyxHQUFHO0lBQ1osT0FBUSxHQUFHOzs7OztBQUdiLG1DQVFDOzs7SUFQQyw0QkFBYTs7SUFDYiw0QkFBYTs7SUFDYixrQ0FBbUI7O0lBQ25CLGtDQUFtQjs7SUFDbkIsaUNBQWtCOztJQUNsQixrQ0FBbUI7O0lBQ25CLCtCQUFnQjs7QUFHbEIsTUFBTSxPQUFPLG9CQUFvQjs7OztJQVEvQixZQUFZLEtBQUssR0FBRyxFQUFFO1FBSnRCLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxhQUFRLEdBQVcsZ0JBQWdCLENBQUMsTUFBTSxDQUFDO1FBSXpDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7Q0FDRjs7O0lBVkMsbUNBQVk7O0lBQ1osbUNBQVk7O0lBQ1oseUNBQWtCOztJQUNsQix5Q0FBYzs7SUFDZCx3Q0FBMkM7O0lBQzNDLHlDQUFrQjs7QUFPcEIsTUFBTSxPQUFPLFlBQVk7Ozs7SUFJdkIsWUFBWSxLQUFLLEdBQUcsRUFBRTtRQUNwQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0NBQ0Y7OztJQU5DLCtCQUF3Qjs7SUFDeEIsOEJBQTBDOztBQVE1QyxNQUFNLE9BQU8sYUFBYTs7OztJQUd4QixZQUFZLE1BQW9COztZQUUxQixZQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUU7UUFDckMsSUFBSSxNQUFNLEVBQUU7WUFDVixZQUFZLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDcEQ7O2NBRUssYUFBYSxHQUFHLFlBQVksQ0FBQyxPQUFPLElBQUksRUFBRTs7Y0FDMUMsWUFBWSxHQUFHLFlBQVksQ0FBQyxNQUFNLElBQUksRUFBRTtRQUM5QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksWUFBWSxDQUFDO1lBQzdCLE9BQU8sRUFBRSxJQUFJLG9CQUFvQixDQUFDLGFBQWEsQ0FBQztZQUNoRCxNQUFNLEVBQUUsWUFBWTtTQUNyQixDQUFDLENBQUM7SUFDTCxDQUFDOzs7O0lBRUQsZ0JBQWdCO1FBQ2QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUM3QixDQUFDOzs7OztJQUVELGVBQWUsQ0FBQyxHQUFHO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3ZDLENBQUM7OztZQXpCRixVQUFVOzs7O1lBSVcsWUFBWTs7Ozs7OztJQUZoQywrQkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5lbnVtIE51bWVyaWNTZXBhcmF0b3Ige1xuICBDT01NQSA9ICcsJyxcbiAgUEVSSU9EID0gJy4nLFxuICBTUEFDRSA9ICcgJ1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE51bWVyaWNDb25maWcge1xuICBtaW4/OiBudW1iZXI7XG4gIG1heD86IG51bWJlcjtcbiAgbWF4TGVuZ3RoPzogbnVtYmVyO1xuICBwcmVjaXNpb24/OiBudW1iZXI7XG4gIGRlY2ltYWxzPzogc3RyaW5nO1xuICB0aG91c2FuZHM/OiBzdHJpbmc7XG4gIGNvbmZpZz86IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIERlZmF1bHROdW1lcmljQ29uZmlnIGltcGxlbWVudHMgTnVtZXJpY0NvbmZpZyB7XG4gIG1pbjogbnVtYmVyO1xuICBtYXg6IG51bWJlcjtcbiAgbWF4TGVuZ3RoOiBudW1iZXI7XG4gIHByZWNpc2lvbiA9IDA7XG4gIGRlY2ltYWxzOiBzdHJpbmcgPSBOdW1lcmljU2VwYXJhdG9yLlBFUklPRDtcbiAgdGhvdXNhbmRzOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJvcHMgPSB7fSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgcHJvcHMpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDdXN0b21Db25maWcge1xuICBudW1lcmljPzogTnVtZXJpY0NvbmZpZztcbiAgY3VzdG9tPzogeyBba2V5OiBzdHJpbmddOiBOdW1lcmljQ29uZmlnIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMgPSB7fSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgcHJvcHMpO1xuICB9XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb25maWdTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBjb25maWc6IEN1c3RvbUNvbmZpZztcblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IEN1c3RvbUNvbmZpZykge1xuXG4gICAgbGV0IG1vZHVsZUNvbmZpZyA9IG5ldyBDdXN0b21Db25maWcoKTtcbiAgICBpZiAoY29uZmlnKSB7XG4gICAgICBtb2R1bGVDb25maWcgPSBPYmplY3QuYXNzaWduKG1vZHVsZUNvbmZpZywgY29uZmlnKTtcbiAgICB9XG5cbiAgICBjb25zdCBudW1lcmljQ29uZmlnID0gbW9kdWxlQ29uZmlnLm51bWVyaWMgfHwge307XG4gICAgY29uc3QgY3VzdG9tQ29uZmlnID0gbW9kdWxlQ29uZmlnLmN1c3RvbSB8fCB7fTtcbiAgICB0aGlzLmNvbmZpZyA9IG5ldyBDdXN0b21Db25maWcoe1xuICAgICAgbnVtZXJpYzogbmV3IERlZmF1bHROdW1lcmljQ29uZmlnKG51bWVyaWNDb25maWcpLFxuICAgICAgY3VzdG9tOiBjdXN0b21Db25maWcsXG4gICAgfSk7XG4gIH1cblxuICBnZXROdW1lcmljQ29uZmlnKCkge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5udW1lcmljO1xuICB9XG5cbiAgZ2V0Q3VzdG9tQ29uZmlnKGtleSkge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5jdXN0b21ba2V5XSB8fCB7fTtcbiAgfVxufVxuIl19