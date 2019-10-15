/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { InjectionToken } from '@angular/core';
export class LsnCrossTabConfig {
    /**
     * @param {?=} __0
     */
    constructor({ cookieCleanFreq = null, cookieReadFreq = null, msgTtl = null, rootDomain = null, crossTabCookieName = null } = {}) {
        this.cookieCleanFreq = cookieCleanFreq;
        this.cookieReadFreq = cookieReadFreq;
        this.msgTtl = msgTtl;
        this.rootDomain = rootDomain;
        this.crossTabCookieName = crossTabCookieName;
    }
}
if (false) {
    /** @type {?} */
    LsnCrossTabConfig.prototype.cookieCleanFreq;
    /** @type {?} */
    LsnCrossTabConfig.prototype.cookieReadFreq;
    /** @type {?} */
    LsnCrossTabConfig.prototype.msgTtl;
    /** @type {?} */
    LsnCrossTabConfig.prototype.rootDomain;
    /** @type {?} */
    LsnCrossTabConfig.prototype.crossTabCookieName;
}
/** @type {?} */
export const LSN_CROSS_TAB_CONFIG = new InjectionToken('LsnCrossTabConfig');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNuQ3Jvc3NUYWJDb25maWcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbHNub3ZhL2FuZ3VsYXJtb2R1bGVzLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2xzbi1jcm9zcy10YWIvbW9kZWxzL2xzbkNyb3NzVGFiQ29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRTdDLE1BQU0sT0FBTyxpQkFBaUI7Ozs7SUFPNUIsWUFBWSxFQUFDLGVBQWUsR0FBRyxJQUFJLEVBQUUsY0FBYyxHQUFHLElBQUksRUFBRSxNQUFNLEdBQUcsSUFBSSxFQUFFLFVBQVUsR0FBRyxJQUFJLEVBQUUsa0JBQWtCLEdBQUcsSUFBSSxFQUFDLEdBQUcsRUFBRTtRQUMzSCxJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztRQUN2QyxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztRQUNyQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7SUFDL0MsQ0FBQztDQUNGOzs7SUFiQyw0Q0FBd0I7O0lBQ3hCLDJDQUF1Qjs7SUFDdkIsbUNBQWU7O0lBQ2YsdUNBQW1COztJQUNuQiwrQ0FBMkI7OztBQVc3QixNQUFNLE9BQU8sb0JBQW9CLEdBQUcsSUFBSSxjQUFjLENBQW9CLG1CQUFtQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3Rpb25Ub2tlbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBjbGFzcyBMc25Dcm9zc1RhYkNvbmZpZyB7XG4gIGNvb2tpZUNsZWFuRnJlcTogbnVtYmVyO1xuICBjb29raWVSZWFkRnJlcTogbnVtYmVyO1xuICBtc2dUdGw6IG51bWJlcjsgLy8gcmVwcmVzZW50cyBkdXJhdGlvbiBvZiBleGlzdGVuY2Ugb2YgZ2l2ZW4gY3Jvc3MgdGFiIG1lc3NhZ2UsIGFmdGVyIHRoaXMgcGVyaW9kIGZyb20gbWVzc2FnZSBjcmVhdGlvbiwgdGhlIG1lc3NhZ2Ugd2lsbCBiZSBkZWxldGVkIGZyb20gY29va2llXG4gIHJvb3REb21haW46IHN0cmluZztcbiAgY3Jvc3NUYWJDb29raWVOYW1lOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3Ioe2Nvb2tpZUNsZWFuRnJlcSA9IG51bGwsIGNvb2tpZVJlYWRGcmVxID0gbnVsbCwgbXNnVHRsID0gbnVsbCwgcm9vdERvbWFpbiA9IG51bGwsIGNyb3NzVGFiQ29va2llTmFtZSA9IG51bGx9ID0ge30pIHtcbiAgICB0aGlzLmNvb2tpZUNsZWFuRnJlcSA9IGNvb2tpZUNsZWFuRnJlcTtcbiAgICB0aGlzLmNvb2tpZVJlYWRGcmVxID0gY29va2llUmVhZEZyZXE7XG4gICAgdGhpcy5tc2dUdGwgPSBtc2dUdGw7XG4gICAgdGhpcy5yb290RG9tYWluID0gcm9vdERvbWFpbjtcbiAgICB0aGlzLmNyb3NzVGFiQ29va2llTmFtZSA9IGNyb3NzVGFiQ29va2llTmFtZTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgTFNOX0NST1NTX1RBQl9DT05GSUcgPSBuZXcgSW5qZWN0aW9uVG9rZW48THNuQ3Jvc3NUYWJDb25maWc+KCdMc25Dcm9zc1RhYkNvbmZpZycpO1xuIl19