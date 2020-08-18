/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/lsn-cross-tab/models/lsnCrossTabConfig.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { InjectionToken } from '@angular/core';
var LsnCrossTabConfig = /** @class */ (function () {
    function LsnCrossTabConfig(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.cookieCleanFreq, cookieCleanFreq = _c === void 0 ? null : _c, _d = _b.cookieReadFreq, cookieReadFreq = _d === void 0 ? null : _d, _e = _b.msgTtl, msgTtl = _e === void 0 ? null : _e, _f = _b.rootDomain, rootDomain = _f === void 0 ? null : _f, _g = _b.crossTabCookieName, crossTabCookieName = _g === void 0 ? null : _g;
        this.cookieCleanFreq = cookieCleanFreq;
        this.cookieReadFreq = cookieReadFreq;
        this.msgTtl = msgTtl;
        this.rootDomain = rootDomain;
        this.crossTabCookieName = crossTabCookieName;
    }
    return LsnCrossTabConfig;
}());
export { LsnCrossTabConfig };
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
export var LSN_CROSS_TAB_CONFIG = new InjectionToken('LsnCrossTabConfig');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNuQ3Jvc3NUYWJDb25maWcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbHNub3ZhL2FuZ3VsYXJtb2R1bGVzLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2xzbi1jcm9zcy10YWIvbW9kZWxzL2xzbkNyb3NzVGFiQ29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUU3QztJQU9FLDJCQUFZLEVBQWlIO1lBQWpILDRCQUFpSCxFQUFoSCx1QkFBc0IsRUFBdEIsMkNBQXNCLEVBQUUsc0JBQXFCLEVBQXJCLDBDQUFxQixFQUFFLGNBQWEsRUFBYixrQ0FBYSxFQUFFLGtCQUFpQixFQUFqQixzQ0FBaUIsRUFBRSwwQkFBeUIsRUFBekIsOENBQXlCO1FBQ3JILElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQztJQUMvQyxDQUFDO0lBQ0gsd0JBQUM7QUFBRCxDQUFDLEFBZEQsSUFjQzs7OztJQWJDLDRDQUF3Qjs7SUFDeEIsMkNBQXVCOztJQUN2QixtQ0FBZTs7SUFDZix1Q0FBbUI7O0lBQ25CLCtDQUEyQjs7O0FBVzdCLE1BQU0sS0FBTyxvQkFBb0IsR0FBRyxJQUFJLGNBQWMsQ0FBb0IsbUJBQW1CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGlvblRva2VufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGNsYXNzIExzbkNyb3NzVGFiQ29uZmlnIHtcbiAgY29va2llQ2xlYW5GcmVxOiBudW1iZXI7XG4gIGNvb2tpZVJlYWRGcmVxOiBudW1iZXI7XG4gIG1zZ1R0bDogbnVtYmVyOyAvLyByZXByZXNlbnRzIGR1cmF0aW9uIG9mIGV4aXN0ZW5jZSBvZiBnaXZlbiBjcm9zcyB0YWIgbWVzc2FnZSwgYWZ0ZXIgdGhpcyBwZXJpb2QgZnJvbSBtZXNzYWdlIGNyZWF0aW9uLCB0aGUgbWVzc2FnZSB3aWxsIGJlIGRlbGV0ZWQgZnJvbSBjb29raWVcbiAgcm9vdERvbWFpbjogc3RyaW5nO1xuICBjcm9zc1RhYkNvb2tpZU5hbWU6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcih7Y29va2llQ2xlYW5GcmVxID0gbnVsbCwgY29va2llUmVhZEZyZXEgPSBudWxsLCBtc2dUdGwgPSBudWxsLCByb290RG9tYWluID0gbnVsbCwgY3Jvc3NUYWJDb29raWVOYW1lID0gbnVsbH0gPSB7fSkge1xuICAgIHRoaXMuY29va2llQ2xlYW5GcmVxID0gY29va2llQ2xlYW5GcmVxO1xuICAgIHRoaXMuY29va2llUmVhZEZyZXEgPSBjb29raWVSZWFkRnJlcTtcbiAgICB0aGlzLm1zZ1R0bCA9IG1zZ1R0bDtcbiAgICB0aGlzLnJvb3REb21haW4gPSByb290RG9tYWluO1xuICAgIHRoaXMuY3Jvc3NUYWJDb29raWVOYW1lID0gY3Jvc3NUYWJDb29raWVOYW1lO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBMU05fQ1JPU1NfVEFCX0NPTkZJRyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxMc25Dcm9zc1RhYkNvbmZpZz4oJ0xzbkNyb3NzVGFiQ29uZmlnJyk7XG4iXX0=