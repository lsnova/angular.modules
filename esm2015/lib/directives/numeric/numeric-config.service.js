/**
 * @fileoverview added by tsickle
 * Generated from: lib/directives/numeric/numeric-config.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
/** @enum {string} */
const NumericSeparator = {
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
    /** @type {?|undefined} */
    NumericConfig.prototype.noScientificNotation;
    /** @type {?|undefined} */
    NumericConfig.prototype.alwaysDisplayDecimals;
}
export class DefaultNumericConfig {
    /**
     * @param {?=} props
     */
    constructor(props = {}) {
        this.precision = 0;
        this.decimals = NumericSeparator.PERIOD;
        this.noScientificNotation = false;
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
    /** @type {?} */
    DefaultNumericConfig.prototype.step;
    /** @type {?} */
    DefaultNumericConfig.prototype.noScientificNotation;
}
export class CustomNumericConfig {
    /**
     * @param {?=} props
     */
    constructor(props = {}) {
        Object.assign(this, props);
    }
}
if (false) {
    /** @type {?} */
    CustomNumericConfig.prototype.default;
    /** @type {?} */
    CustomNumericConfig.prototype.custom;
}
export class NumericConfigService {
    /**
     * @param {?} config
     */
    constructor(config) {
        /** @type {?} */
        let moduleConfig = new CustomNumericConfig();
        if (config) {
            moduleConfig = Object.assign(moduleConfig, config);
        }
        /** @type {?} */
        const numericConfig = moduleConfig.default || {};
        /** @type {?} */
        const customConfig = moduleConfig.custom || {};
        this.config = new CustomNumericConfig({
            default: new DefaultNumericConfig(numericConfig),
            custom: customConfig,
        });
    }
    /**
     * @return {?}
     */
    getDefaultConfig() {
        return this.config.default;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    getCustomConfig(key) {
        if (!this.config.custom[key]) {
            console.warn('[lsnNumeric] Invalid config key provided.');
        }
        return Object.assign(Object.assign({}, this.getDefaultConfig()), this.config.custom[key]) || this.getDefaultConfig();
    }
}
NumericConfigService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NumericConfigService.ctorParameters = () => [
    { type: CustomNumericConfig }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    NumericConfigService.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtZXJpYy1jb25maWcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bsc25vdmEvYW5ndWxhcm1vZHVsZXMvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9udW1lcmljL251bWVyaWMtY29uZmlnLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQUV6QyxNQUFLLGdCQUFnQjtJQUNuQixLQUFLLEtBQU07SUFDWCxNQUFNLEtBQU07SUFDWixLQUFLLEtBQU07RUFDWjs7OztBQUVELG1DQVdDOzs7SUFWQyw0QkFBYTs7SUFDYiw0QkFBYTs7SUFDYixrQ0FBbUI7O0lBQ25CLGtDQUFtQjs7SUFDbkIsaUNBQWtCOztJQUNsQixrQ0FBbUI7O0lBQ25CLCtCQUFnQjs7SUFDaEIsNkJBQWM7O0lBQ2QsNkNBQStCOztJQUMvQiw4Q0FBZ0M7O0FBR2xDLE1BQU0sT0FBTyxvQkFBb0I7Ozs7SUFVL0IsWUFBWSxLQUFLLEdBQUcsRUFBRTtRQU50QixjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsYUFBUSxHQUFXLGdCQUFnQixDQUFDLE1BQU0sQ0FBQztRQUczQyx5QkFBb0IsR0FBRyxLQUFLLENBQUM7UUFHM0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztDQUNGOzs7SUFaQyxtQ0FBWTs7SUFDWixtQ0FBWTs7SUFDWix5Q0FBa0I7O0lBQ2xCLHlDQUFjOztJQUNkLHdDQUEyQzs7SUFDM0MseUNBQWtCOztJQUNsQixvQ0FBYTs7SUFDYixvREFBNkI7O0FBTy9CLE1BQU0sT0FBTyxtQkFBbUI7Ozs7SUFJOUIsWUFBWSxLQUFLLEdBQUcsRUFBRTtRQUNwQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0NBQ0Y7OztJQU5DLHNDQUF3Qjs7SUFDeEIscUNBQTBDOztBQVE1QyxNQUFNLE9BQU8sb0JBQW9COzs7O0lBRy9CLFlBQVksTUFBMkI7O1lBRWpDLFlBQVksR0FBRyxJQUFJLG1CQUFtQixFQUFFO1FBQzVDLElBQUksTUFBTSxFQUFFO1lBQ1YsWUFBWSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3BEOztjQUVLLGFBQWEsR0FBRyxZQUFZLENBQUMsT0FBTyxJQUFJLEVBQUU7O2NBQzFDLFlBQVksR0FBRyxZQUFZLENBQUMsTUFBTSxJQUFJLEVBQUU7UUFDOUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLG1CQUFtQixDQUFDO1lBQ3BDLE9BQU8sRUFBRSxJQUFJLG9CQUFvQixDQUFDLGFBQWEsQ0FBQztZQUNoRCxNQUFNLEVBQUUsWUFBWTtTQUNyQixDQUFDLENBQUM7SUFDTCxDQUFDOzs7O0lBRUQsZ0JBQWdCO1FBQ2QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUM3QixDQUFDOzs7OztJQUVELGVBQWUsQ0FBQyxHQUFHO1FBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUM1QixPQUFPLENBQUMsSUFBSSxDQUFDLDJDQUEyQyxDQUFDLENBQUM7U0FDM0Q7UUFDRCxPQUFPLGdDQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxHQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzdGLENBQUM7OztZQTVCRixVQUFVOzs7O1lBSVcsbUJBQW1COzs7Ozs7O0lBRnZDLHNDQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmVudW0gTnVtZXJpY1NlcGFyYXRvciB7XG4gIENPTU1BID0gJywnLFxuICBQRVJJT0QgPSAnLicsXG4gIFNQQUNFID0gJyAnXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTnVtZXJpY0NvbmZpZyB7XG4gIG1pbj86IG51bWJlcjtcbiAgbWF4PzogbnVtYmVyO1xuICBtYXhMZW5ndGg/OiBudW1iZXI7XG4gIHByZWNpc2lvbj86IG51bWJlcjtcbiAgZGVjaW1hbHM/OiBzdHJpbmc7XG4gIHRob3VzYW5kcz86IHN0cmluZztcbiAgY29uZmlnPzogc3RyaW5nO1xuICBzdGVwPzogbnVtYmVyO1xuICBub1NjaWVudGlmaWNOb3RhdGlvbj86IGJvb2xlYW47XG4gIGFsd2F5c0Rpc3BsYXlEZWNpbWFscz86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBEZWZhdWx0TnVtZXJpY0NvbmZpZyBpbXBsZW1lbnRzIE51bWVyaWNDb25maWcge1xuICBtaW46IG51bWJlcjtcbiAgbWF4OiBudW1iZXI7XG4gIG1heExlbmd0aDogbnVtYmVyO1xuICBwcmVjaXNpb24gPSAwO1xuICBkZWNpbWFsczogc3RyaW5nID0gTnVtZXJpY1NlcGFyYXRvci5QRVJJT0Q7XG4gIHRob3VzYW5kczogc3RyaW5nO1xuICBzdGVwOiBudW1iZXI7XG4gIG5vU2NpZW50aWZpY05vdGF0aW9uID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJvcHMgPSB7fSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgcHJvcHMpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDdXN0b21OdW1lcmljQ29uZmlnIHtcbiAgZGVmYXVsdD86IE51bWVyaWNDb25maWc7XG4gIGN1c3RvbT86IHsgW2tleTogc3RyaW5nXTogTnVtZXJpY0NvbmZpZyB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzID0ge30pIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHByb3BzKTtcbiAgfVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTnVtZXJpY0NvbmZpZ1NlcnZpY2Uge1xuICBwcml2YXRlIGNvbmZpZzogQ3VzdG9tTnVtZXJpY0NvbmZpZztcblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IEN1c3RvbU51bWVyaWNDb25maWcpIHtcblxuICAgIGxldCBtb2R1bGVDb25maWcgPSBuZXcgQ3VzdG9tTnVtZXJpY0NvbmZpZygpO1xuICAgIGlmIChjb25maWcpIHtcbiAgICAgIG1vZHVsZUNvbmZpZyA9IE9iamVjdC5hc3NpZ24obW9kdWxlQ29uZmlnLCBjb25maWcpO1xuICAgIH1cblxuICAgIGNvbnN0IG51bWVyaWNDb25maWcgPSBtb2R1bGVDb25maWcuZGVmYXVsdCB8fCB7fTtcbiAgICBjb25zdCBjdXN0b21Db25maWcgPSBtb2R1bGVDb25maWcuY3VzdG9tIHx8IHt9O1xuICAgIHRoaXMuY29uZmlnID0gbmV3IEN1c3RvbU51bWVyaWNDb25maWcoe1xuICAgICAgZGVmYXVsdDogbmV3IERlZmF1bHROdW1lcmljQ29uZmlnKG51bWVyaWNDb25maWcpLFxuICAgICAgY3VzdG9tOiBjdXN0b21Db25maWcsXG4gICAgfSk7XG4gIH1cblxuICBnZXREZWZhdWx0Q29uZmlnKCkge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5kZWZhdWx0O1xuICB9XG5cbiAgZ2V0Q3VzdG9tQ29uZmlnKGtleSkge1xuICAgIGlmICghdGhpcy5jb25maWcuY3VzdG9tW2tleV0pIHtcbiAgICAgIGNvbnNvbGUud2FybignW2xzbk51bWVyaWNdIEludmFsaWQgY29uZmlnIGtleSBwcm92aWRlZC4nKTtcbiAgICB9XG4gICAgcmV0dXJuIHsuLi50aGlzLmdldERlZmF1bHRDb25maWcoKSwgLi4udGhpcy5jb25maWcuY3VzdG9tW2tleV19IHx8IHRoaXMuZ2V0RGVmYXVsdENvbmZpZygpO1xuICB9XG59XG4iXX0=