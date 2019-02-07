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
        const numericConfig = config.numeric || {};
        /** @type {?} */
        const customConfig = config.custom || {};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbHNub3ZhL2FuZ3VsYXJtb2R1bGVzLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2NvbmZpZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7SUFHdkMsT0FBUSxHQUFHO0lBQ1gsUUFBUyxHQUFHO0lBQ1osT0FBUSxHQUFHOzs7OztBQUdiLG1DQU9DOzs7SUFOQyw0QkFBYTs7SUFDYiw0QkFBYTs7SUFDYixrQ0FBbUI7O0lBQ25CLGlDQUFrQjs7SUFDbEIsa0NBQW1COztJQUNuQiwrQkFBZ0I7O0FBR2xCLE1BQU0sT0FBTyxvQkFBb0I7Ozs7SUFPL0IsWUFBWSxLQUFLLEdBQUcsRUFBRTtRQUp0QixjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsYUFBUSxHQUFXLGdCQUFnQixDQUFDLE1BQU0sQ0FBQztRQUl6QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0NBQ0Y7OztJQVRDLG1DQUFZOztJQUNaLG1DQUFZOztJQUNaLHlDQUFjOztJQUNkLHdDQUEyQzs7SUFDM0MseUNBQWtCOztBQU9wQixNQUFNLE9BQU8sWUFBWTs7OztJQUl2QixZQUFZLEtBQUssR0FBRyxFQUFFO1FBQ3BCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7Q0FDRjs7O0lBTkMsK0JBQXdCOztJQUN4Qiw4QkFBd0M7O0FBUTFDLE1BQU0sT0FBTyxhQUFhOzs7O0lBR3hCLFlBQVksTUFBb0I7O2NBQ3hCLGFBQWEsR0FBRyxNQUFNLENBQUMsT0FBTyxJQUFJLEVBQUU7O2NBQ3BDLFlBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFJLEVBQUU7UUFDeEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLFlBQVksQ0FBQztZQUM3QixPQUFPLEVBQUUsSUFBSSxvQkFBb0IsQ0FBQyxhQUFhLENBQUM7WUFDaEQsTUFBTSxFQUFFLFlBQVk7U0FDckIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVELGdCQUFnQjtRQUNkLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDN0IsQ0FBQzs7Ozs7SUFFRCxlQUFlLENBQUMsR0FBRztRQUNqQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QyxDQUFDOzs7WUFuQkYsVUFBVTs7OztZQUlXLFlBQVk7Ozs7Ozs7SUFGaEMsK0JBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZW51bSBOdW1lcmljU2VwYXJhdG9yIHtcbiAgQ09NTUEgPSAnLCcsXG4gIFBFUklPRCA9ICcuJyxcbiAgU1BBQ0UgPSAnICdcbn1cblxuZXhwb3J0IGludGVyZmFjZSBOdW1lcmljQ29uZmlnIHtcbiAgbWluPzogbnVtYmVyO1xuICBtYXg/OiBudW1iZXI7XG4gIHByZWNpc2lvbj86IG51bWJlcjtcbiAgZGVjaW1hbHM/OiBzdHJpbmc7XG4gIHRob3VzYW5kcz86IHN0cmluZztcbiAgY29uZmlnPzogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgRGVmYXVsdE51bWVyaWNDb25maWcgaW1wbGVtZW50cyBOdW1lcmljQ29uZmlnIHtcbiAgbWluOiBudW1iZXI7XG4gIG1heDogbnVtYmVyO1xuICBwcmVjaXNpb24gPSAwO1xuICBkZWNpbWFsczogc3RyaW5nID0gTnVtZXJpY1NlcGFyYXRvci5QRVJJT0Q7XG4gIHRob3VzYW5kczogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzID0ge30pIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHByb3BzKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ3VzdG9tQ29uZmlnIHtcbiAgbnVtZXJpYz86IE51bWVyaWNDb25maWc7XG4gIGN1c3RvbT86IHtba2V5OiBzdHJpbmddOiBOdW1lcmljQ29uZmlnfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcyA9IHt9KSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBwcm9wcyk7XG4gIH1cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbmZpZ1NlcnZpY2Uge1xuICBwcml2YXRlIGNvbmZpZzogQ3VzdG9tQ29uZmlnO1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogQ3VzdG9tQ29uZmlnKSB7XG4gICAgY29uc3QgbnVtZXJpY0NvbmZpZyA9IGNvbmZpZy5udW1lcmljIHx8IHt9O1xuICAgIGNvbnN0IGN1c3RvbUNvbmZpZyA9IGNvbmZpZy5jdXN0b20gfHwge307XG4gICAgdGhpcy5jb25maWcgPSBuZXcgQ3VzdG9tQ29uZmlnKHtcbiAgICAgIG51bWVyaWM6IG5ldyBEZWZhdWx0TnVtZXJpY0NvbmZpZyhudW1lcmljQ29uZmlnKSxcbiAgICAgIGN1c3RvbTogY3VzdG9tQ29uZmlnLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0TnVtZXJpY0NvbmZpZygpIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcubnVtZXJpYztcbiAgfVxuXG4gIGdldEN1c3RvbUNvbmZpZyhrZXkpIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcuY3VzdG9tW2tleV0gfHwge307XG4gIH1cbn1cbiJdfQ==