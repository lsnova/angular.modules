/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/lsn-cross-tab/models/lsnCrossTabMessage.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNuQ3Jvc3NUYWJNZXNzYWdlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9sc24tY3Jvc3MtdGFiL21vZGVscy9sc25Dcm9zc1RhYk1lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztJQU1FLDRCQUFZLEVBQXFGO1lBQXJGLDRCQUFxRixFQUFwRixlQUFjLEVBQWQsbUNBQWMsRUFBRSxZQUFXLEVBQVgsZ0NBQVcsRUFBRSxhQUFZLEVBQVosaUNBQVksRUFBRSxhQUFZLEVBQVosaUNBQVk7UUFDbEUsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDckIsQ0FBQzs7Ozs7O0lBRU0sMEJBQU87Ozs7O0lBQWQsVUFBZSxZQUFnQyxFQUFFLGFBQWlDO1FBQ2hGLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDbkMsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELElBQUksWUFBWSxDQUFDLE9BQU8sS0FBSyxhQUFhLENBQUMsT0FBTyxFQUFFO1lBQ2xELE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxJQUFJLFlBQVksQ0FBQyxJQUFJLEtBQUssYUFBYSxDQUFDLElBQUksRUFBRTtZQUM1QyxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsT0FBTyxZQUFZLENBQUMsS0FBSyxLQUFLLGFBQWEsQ0FBQyxLQUFLLENBQUM7SUFDcEQsQ0FBQztJQUNILHlCQUFDO0FBQUQsQ0FBQyxBQXpCRCxJQXlCQzs7Ozs7OztJQXhCQyxxQ0FBaUI7O0lBQ2pCLGtDQUFjOztJQUNkLG1DQUFlOztJQUNmLG1DQUFVIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIExzbkNyb3NzVGFiTWVzc2FnZTxUIGV4dGVuZHMgb2JqZWN0ID0gYW55PiB7XG4gIGNyZWF0ZWQ/OiBudW1iZXI7XG4gIGNvZGU/OiBzdHJpbmc7XG4gIHRhYklkPzogc3RyaW5nO1xuICBhdHRycz86IFQ7XG5cbiAgY29uc3RydWN0b3Ioe2NyZWF0ZWQgPSBudWxsLCBjb2RlID0gbnVsbCwgdGFiSWQgPSBudWxsLCBhdHRycyA9IG51bGx9OiBMc25Dcm9zc1RhYk1lc3NhZ2U8VD4gPSB7fSkge1xuICAgIHRoaXMuY3JlYXRlZCA9IGNyZWF0ZWQ7XG4gICAgdGhpcy5jb2RlID0gY29kZTtcbiAgICB0aGlzLnRhYklkID0gdGFiSWQ7XG4gICAgdGhpcy5hdHRycyA9IGF0dHJzO1xuICB9XG5cbiAgc3RhdGljIGNvbXBhcmUoZmlyc3RNZXNzYWdlOiBMc25Dcm9zc1RhYk1lc3NhZ2UsIHNlY29uZE1lc3NhZ2U6IExzbkNyb3NzVGFiTWVzc2FnZSkge1xuICAgIGlmICghZmlyc3RNZXNzYWdlIHx8ICFzZWNvbmRNZXNzYWdlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChmaXJzdE1lc3NhZ2UuY3JlYXRlZCAhPT0gc2Vjb25kTWVzc2FnZS5jcmVhdGVkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChmaXJzdE1lc3NhZ2UuY29kZSAhPT0gc2Vjb25kTWVzc2FnZS5jb2RlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBmaXJzdE1lc3NhZ2UudGFiSWQgIT09IHNlY29uZE1lc3NhZ2UudGFiSWQ7XG4gIH1cbn1cbiJdfQ==