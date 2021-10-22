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
        this.alwaysDisplayDecimals = false;
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
    /** @type {?} */
    DefaultNumericConfig.prototype.alwaysDisplayDecimals;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtZXJpYy1jb25maWcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bsc25vdmEvYW5ndWxhcm1vZHVsZXMvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9udW1lcmljL251bWVyaWMtY29uZmlnLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQUV6QyxNQUFLLGdCQUFnQjtJQUNuQixLQUFLLEtBQU07SUFDWCxNQUFNLEtBQU07SUFDWixLQUFLLEtBQU07RUFDWjs7OztBQUVELG1DQVdDOzs7SUFWQyw0QkFBYTs7SUFDYiw0QkFBYTs7SUFDYixrQ0FBbUI7O0lBQ25CLGtDQUFtQjs7SUFDbkIsaUNBQWtCOztJQUNsQixrQ0FBbUI7O0lBQ25CLCtCQUFnQjs7SUFDaEIsNkJBQWM7O0lBQ2QsNkNBQStCOztJQUMvQiw4Q0FBZ0M7O0FBR2xDLE1BQU0sT0FBTyxvQkFBb0I7Ozs7SUFXL0IsWUFBWSxLQUFLLEdBQUcsRUFBRTtRQVB0QixjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsYUFBUSxHQUFXLGdCQUFnQixDQUFDLE1BQU0sQ0FBQztRQUczQyx5QkFBb0IsR0FBRyxLQUFLLENBQUM7UUFDN0IsMEJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBRzVCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7Q0FDRjs7O0lBYkMsbUNBQVk7O0lBQ1osbUNBQVk7O0lBQ1oseUNBQWtCOztJQUNsQix5Q0FBYzs7SUFDZCx3Q0FBMkM7O0lBQzNDLHlDQUFrQjs7SUFDbEIsb0NBQWE7O0lBQ2Isb0RBQTZCOztJQUM3QixxREFBOEI7O0FBT2hDLE1BQU0sT0FBTyxtQkFBbUI7Ozs7SUFJOUIsWUFBWSxLQUFLLEdBQUcsRUFBRTtRQUNwQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0NBQ0Y7OztJQU5DLHNDQUF3Qjs7SUFDeEIscUNBQTBDOztBQVE1QyxNQUFNLE9BQU8sb0JBQW9COzs7O0lBRy9CLFlBQVksTUFBMkI7O1lBRWpDLFlBQVksR0FBRyxJQUFJLG1CQUFtQixFQUFFO1FBQzVDLElBQUksTUFBTSxFQUFFO1lBQ1YsWUFBWSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3BEOztjQUVLLGFBQWEsR0FBRyxZQUFZLENBQUMsT0FBTyxJQUFJLEVBQUU7O2NBQzFDLFlBQVksR0FBRyxZQUFZLENBQUMsTUFBTSxJQUFJLEVBQUU7UUFDOUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLG1CQUFtQixDQUFDO1lBQ3BDLE9BQU8sRUFBRSxJQUFJLG9CQUFvQixDQUFDLGFBQWEsQ0FBQztZQUNoRCxNQUFNLEVBQUUsWUFBWTtTQUNyQixDQUFDLENBQUM7SUFDTCxDQUFDOzs7O0lBRUQsZ0JBQWdCO1FBQ2QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUM3QixDQUFDOzs7OztJQUVELGVBQWUsQ0FBQyxHQUFHO1FBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUM1QixPQUFPLENBQUMsSUFBSSxDQUFDLDJDQUEyQyxDQUFDLENBQUM7U0FDM0Q7UUFDRCxPQUFPLGdDQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxHQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzdGLENBQUM7OztZQTVCRixVQUFVOzs7O1lBSVcsbUJBQW1COzs7Ozs7O0lBRnZDLHNDQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmVudW0gTnVtZXJpY1NlcGFyYXRvciB7XG4gIENPTU1BID0gJywnLFxuICBQRVJJT0QgPSAnLicsXG4gIFNQQUNFID0gJyAnXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTnVtZXJpY0NvbmZpZyB7XG4gIG1pbj86IG51bWJlcjtcbiAgbWF4PzogbnVtYmVyO1xuICBtYXhMZW5ndGg/OiBudW1iZXI7XG4gIHByZWNpc2lvbj86IG51bWJlcjtcbiAgZGVjaW1hbHM/OiBzdHJpbmc7XG4gIHRob3VzYW5kcz86IHN0cmluZztcbiAgY29uZmlnPzogc3RyaW5nO1xuICBzdGVwPzogbnVtYmVyO1xuICBub1NjaWVudGlmaWNOb3RhdGlvbj86IGJvb2xlYW47XG4gIGFsd2F5c0Rpc3BsYXlEZWNpbWFscz86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBEZWZhdWx0TnVtZXJpY0NvbmZpZyBpbXBsZW1lbnRzIE51bWVyaWNDb25maWcge1xuICBtaW46IG51bWJlcjtcbiAgbWF4OiBudW1iZXI7XG4gIG1heExlbmd0aDogbnVtYmVyO1xuICBwcmVjaXNpb24gPSAwO1xuICBkZWNpbWFsczogc3RyaW5nID0gTnVtZXJpY1NlcGFyYXRvci5QRVJJT0Q7XG4gIHRob3VzYW5kczogc3RyaW5nO1xuICBzdGVwOiBudW1iZXI7XG4gIG5vU2NpZW50aWZpY05vdGF0aW9uID0gZmFsc2U7XG4gIGFsd2F5c0Rpc3BsYXlEZWNpbWFscyA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzID0ge30pIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHByb3BzKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ3VzdG9tTnVtZXJpY0NvbmZpZyB7XG4gIGRlZmF1bHQ/OiBOdW1lcmljQ29uZmlnO1xuICBjdXN0b20/OiB7IFtrZXk6IHN0cmluZ106IE51bWVyaWNDb25maWcgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcyA9IHt9KSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBwcm9wcyk7XG4gIH1cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE51bWVyaWNDb25maWdTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBjb25maWc6IEN1c3RvbU51bWVyaWNDb25maWc7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBDdXN0b21OdW1lcmljQ29uZmlnKSB7XG5cbiAgICBsZXQgbW9kdWxlQ29uZmlnID0gbmV3IEN1c3RvbU51bWVyaWNDb25maWcoKTtcbiAgICBpZiAoY29uZmlnKSB7XG4gICAgICBtb2R1bGVDb25maWcgPSBPYmplY3QuYXNzaWduKG1vZHVsZUNvbmZpZywgY29uZmlnKTtcbiAgICB9XG5cbiAgICBjb25zdCBudW1lcmljQ29uZmlnID0gbW9kdWxlQ29uZmlnLmRlZmF1bHQgfHwge307XG4gICAgY29uc3QgY3VzdG9tQ29uZmlnID0gbW9kdWxlQ29uZmlnLmN1c3RvbSB8fCB7fTtcbiAgICB0aGlzLmNvbmZpZyA9IG5ldyBDdXN0b21OdW1lcmljQ29uZmlnKHtcbiAgICAgIGRlZmF1bHQ6IG5ldyBEZWZhdWx0TnVtZXJpY0NvbmZpZyhudW1lcmljQ29uZmlnKSxcbiAgICAgIGN1c3RvbTogY3VzdG9tQ29uZmlnLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0RGVmYXVsdENvbmZpZygpIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcuZGVmYXVsdDtcbiAgfVxuXG4gIGdldEN1c3RvbUNvbmZpZyhrZXkpIHtcbiAgICBpZiAoIXRoaXMuY29uZmlnLmN1c3RvbVtrZXldKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1tsc25OdW1lcmljXSBJbnZhbGlkIGNvbmZpZyBrZXkgcHJvdmlkZWQuJyk7XG4gICAgfVxuICAgIHJldHVybiB7Li4udGhpcy5nZXREZWZhdWx0Q29uZmlnKCksIC4uLnRoaXMuY29uZmlnLmN1c3RvbVtrZXldfSB8fCB0aGlzLmdldERlZmF1bHRDb25maWcoKTtcbiAgfVxufVxuIl19