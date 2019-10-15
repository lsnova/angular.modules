/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class LsnCrossTabMessage {
    /**
     * @param {?=} __0
     */
    constructor({ created = null, code = null, tabId = null, attrs = null } = {}) {
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
    static compare(firstMessage, secondMessage) {
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
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNuQ3Jvc3NUYWJNZXNzYWdlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9sc24tY3Jvc3MtdGFiL21vZGVscy9sc25Dcm9zc1RhYk1lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU0sT0FBTyxrQkFBa0I7Ozs7SUFNN0IsWUFBWSxFQUFDLE9BQU8sR0FBRyxJQUFJLEVBQUUsSUFBSSxHQUFHLElBQUksRUFBRSxLQUFLLEdBQUcsSUFBSSxFQUFFLEtBQUssR0FBRyxJQUFJLEVBQUMsR0FBRyxFQUFFO1FBQ3hFLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLENBQUM7Ozs7OztJQUVELE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBZ0MsRUFBRSxhQUFpQztRQUNoRixJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ25DLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxJQUFJLFlBQVksQ0FBQyxPQUFPLEtBQUssYUFBYSxDQUFDLE9BQU8sRUFBRTtZQUNsRCxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsSUFBSSxZQUFZLENBQUMsSUFBSSxLQUFLLGFBQWEsQ0FBQyxJQUFJLEVBQUU7WUFDNUMsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELE9BQU8sWUFBWSxDQUFDLEtBQUssS0FBSyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBQ3BELENBQUM7Q0FDRjs7O0lBeEJDLHFDQUFpQjs7SUFDakIsa0NBQWM7O0lBQ2QsbUNBQWU7O0lBQ2YsbUNBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgTHNuQ3Jvc3NUYWJNZXNzYWdlIHtcbiAgY3JlYXRlZD86IG51bWJlcjtcbiAgY29kZT86IHN0cmluZztcbiAgdGFiSWQ/OiBzdHJpbmc7XG4gIGF0dHJzPzogb2JqZWN0O1xuXG4gIGNvbnN0cnVjdG9yKHtjcmVhdGVkID0gbnVsbCwgY29kZSA9IG51bGwsIHRhYklkID0gbnVsbCwgYXR0cnMgPSBudWxsfSA9IHt9KSB7XG4gICAgdGhpcy5jcmVhdGVkID0gY3JlYXRlZDtcbiAgICB0aGlzLmNvZGUgPSBjb2RlO1xuICAgIHRoaXMudGFiSWQgPSB0YWJJZDtcbiAgICB0aGlzLmF0dHJzID0gYXR0cnM7XG4gIH1cblxuICBzdGF0aWMgY29tcGFyZShmaXJzdE1lc3NhZ2U6IExzbkNyb3NzVGFiTWVzc2FnZSwgc2Vjb25kTWVzc2FnZTogTHNuQ3Jvc3NUYWJNZXNzYWdlKSB7XG4gICAgaWYgKCFmaXJzdE1lc3NhZ2UgfHwgIXNlY29uZE1lc3NhZ2UpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGZpcnN0TWVzc2FnZS5jcmVhdGVkICE9PSBzZWNvbmRNZXNzYWdlLmNyZWF0ZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGZpcnN0TWVzc2FnZS5jb2RlICE9PSBzZWNvbmRNZXNzYWdlLmNvZGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGZpcnN0TWVzc2FnZS50YWJJZCAhPT0gc2Vjb25kTWVzc2FnZS50YWJJZDtcbiAgfVxufVxuIl19