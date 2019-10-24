/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
var /**
 * @template T
 */
LsnCrossTabMessage = /** @class */ (function () {
    function LsnCrossTabMessage(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.created, created = _c === void 0 ? null : _c, _d = _b.code, code = _d === void 0 ? null : _d, _e = _b.tabId, tabId = _e === void 0 ? null : _e, _f = _b.attrs, attrs = _f === void 0 ? null : _f;
        this.created = created;
        this.code = code;
        this.tabId = tabId;
        this.attrs = attrs;
    }
    /**
     * @param {?} firstMessage
     * @param {?} secondMessage
     * @return {?}
     */
    LsnCrossTabMessage.compare = /**
     * @param {?} firstMessage
     * @param {?} secondMessage
     * @return {?}
     */
    function (firstMessage, secondMessage) {
        if (!firstMessage || !secondMessage) {
            return false;
        }
        if (firstMessage.created !== secondMessage.created) {
            return false;
        }
        if (firstMessage.code !== secondMessage.code) {
            return false;
        }
        return firstMessage.tabId !== secondMessage.tabId;
    };
    return LsnCrossTabMessage;
}());
/**
 * @template T
 */
export { LsnCrossTabMessage };
if (false) {
    /** @type {?} */
    LsnCrossTabMessage.prototype.created;
    /** @type {?} */
    LsnCrossTabMessage.prototype.code;
    /** @type {?} */
    LsnCrossTabMessage.prototype.tabId;
    /** @type {?} */
    LsnCrossTabMessage.prototype.attrs;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNuQ3Jvc3NUYWJNZXNzYWdlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9sc24tY3Jvc3MtdGFiL21vZGVscy9sc25Dcm9zc1RhYk1lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0lBTUUsNEJBQVksRUFBcUY7WUFBckYsNEJBQXFGLEVBQXBGLGVBQWMsRUFBZCxtQ0FBYyxFQUFFLFlBQVcsRUFBWCxnQ0FBVyxFQUFFLGFBQVksRUFBWixpQ0FBWSxFQUFFLGFBQVksRUFBWixpQ0FBWTtRQUNsRSxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNyQixDQUFDOzs7Ozs7SUFFTSwwQkFBTzs7Ozs7SUFBZCxVQUFlLFlBQWdDLEVBQUUsYUFBaUM7UUFDaEYsSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNuQyxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsSUFBSSxZQUFZLENBQUMsT0FBTyxLQUFLLGFBQWEsQ0FBQyxPQUFPLEVBQUU7WUFDbEQsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELElBQUksWUFBWSxDQUFDLElBQUksS0FBSyxhQUFhLENBQUMsSUFBSSxFQUFFO1lBQzVDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxPQUFPLFlBQVksQ0FBQyxLQUFLLEtBQUssYUFBYSxDQUFDLEtBQUssQ0FBQztJQUNwRCxDQUFDO0lBQ0gseUJBQUM7QUFBRCxDQUFDLEFBekJELElBeUJDOzs7Ozs7O0lBeEJDLHFDQUFpQjs7SUFDakIsa0NBQWM7O0lBQ2QsbUNBQWU7O0lBQ2YsbUNBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgTHNuQ3Jvc3NUYWJNZXNzYWdlPFQgZXh0ZW5kcyBvYmplY3QgPSBhbnk+IHtcbiAgY3JlYXRlZD86IG51bWJlcjtcbiAgY29kZT86IHN0cmluZztcbiAgdGFiSWQ/OiBzdHJpbmc7XG4gIGF0dHJzPzogVDtcblxuICBjb25zdHJ1Y3Rvcih7Y3JlYXRlZCA9IG51bGwsIGNvZGUgPSBudWxsLCB0YWJJZCA9IG51bGwsIGF0dHJzID0gbnVsbH06IExzbkNyb3NzVGFiTWVzc2FnZTxUPiA9IHt9KSB7XG4gICAgdGhpcy5jcmVhdGVkID0gY3JlYXRlZDtcbiAgICB0aGlzLmNvZGUgPSBjb2RlO1xuICAgIHRoaXMudGFiSWQgPSB0YWJJZDtcbiAgICB0aGlzLmF0dHJzID0gYXR0cnM7XG4gIH1cblxuICBzdGF0aWMgY29tcGFyZShmaXJzdE1lc3NhZ2U6IExzbkNyb3NzVGFiTWVzc2FnZSwgc2Vjb25kTWVzc2FnZTogTHNuQ3Jvc3NUYWJNZXNzYWdlKSB7XG4gICAgaWYgKCFmaXJzdE1lc3NhZ2UgfHwgIXNlY29uZE1lc3NhZ2UpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGZpcnN0TWVzc2FnZS5jcmVhdGVkICE9PSBzZWNvbmRNZXNzYWdlLmNyZWF0ZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGZpcnN0TWVzc2FnZS5jb2RlICE9PSBzZWNvbmRNZXNzYWdlLmNvZGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGZpcnN0TWVzc2FnZS50YWJJZCAhPT0gc2Vjb25kTWVzc2FnZS50YWJJZDtcbiAgfVxufVxuIl19