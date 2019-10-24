/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNuQ3Jvc3NUYWJNZXNzYWdlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxzbm92YS9hbmd1bGFybW9kdWxlcy8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9sc24tY3Jvc3MtdGFiL21vZGVscy9sc25Dcm9zc1RhYk1lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLE1BQU0sT0FBTyxrQkFBa0I7Ozs7SUFNN0IsWUFBWSxFQUFDLE9BQU8sR0FBRyxJQUFJLEVBQUUsSUFBSSxHQUFHLElBQUksRUFBRSxLQUFLLEdBQUcsSUFBSSxFQUFFLEtBQUssR0FBRyxJQUFJLEtBQTJCLEVBQUU7UUFDL0YsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDckIsQ0FBQzs7Ozs7O0lBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFnQyxFQUFFLGFBQWlDO1FBQ2hGLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDbkMsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELElBQUksWUFBWSxDQUFDLE9BQU8sS0FBSyxhQUFhLENBQUMsT0FBTyxFQUFFO1lBQ2xELE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxJQUFJLFlBQVksQ0FBQyxJQUFJLEtBQUssYUFBYSxDQUFDLElBQUksRUFBRTtZQUM1QyxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsT0FBTyxZQUFZLENBQUMsS0FBSyxLQUFLLGFBQWEsQ0FBQyxLQUFLLENBQUM7SUFDcEQsQ0FBQztDQUNGOzs7SUF4QkMscUNBQWlCOztJQUNqQixrQ0FBYzs7SUFDZCxtQ0FBZTs7SUFDZixtQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBMc25Dcm9zc1RhYk1lc3NhZ2U8VCBleHRlbmRzIG9iamVjdCA9IGFueT4ge1xuICBjcmVhdGVkPzogbnVtYmVyO1xuICBjb2RlPzogc3RyaW5nO1xuICB0YWJJZD86IHN0cmluZztcbiAgYXR0cnM/OiBUO1xuXG4gIGNvbnN0cnVjdG9yKHtjcmVhdGVkID0gbnVsbCwgY29kZSA9IG51bGwsIHRhYklkID0gbnVsbCwgYXR0cnMgPSBudWxsfTogTHNuQ3Jvc3NUYWJNZXNzYWdlPFQ+ID0ge30pIHtcbiAgICB0aGlzLmNyZWF0ZWQgPSBjcmVhdGVkO1xuICAgIHRoaXMuY29kZSA9IGNvZGU7XG4gICAgdGhpcy50YWJJZCA9IHRhYklkO1xuICAgIHRoaXMuYXR0cnMgPSBhdHRycztcbiAgfVxuXG4gIHN0YXRpYyBjb21wYXJlKGZpcnN0TWVzc2FnZTogTHNuQ3Jvc3NUYWJNZXNzYWdlLCBzZWNvbmRNZXNzYWdlOiBMc25Dcm9zc1RhYk1lc3NhZ2UpIHtcbiAgICBpZiAoIWZpcnN0TWVzc2FnZSB8fCAhc2Vjb25kTWVzc2FnZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoZmlyc3RNZXNzYWdlLmNyZWF0ZWQgIT09IHNlY29uZE1lc3NhZ2UuY3JlYXRlZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoZmlyc3RNZXNzYWdlLmNvZGUgIT09IHNlY29uZE1lc3NhZ2UuY29kZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gZmlyc3RNZXNzYWdlLnRhYklkICE9PSBzZWNvbmRNZXNzYWdlLnRhYklkO1xuICB9XG59XG4iXX0=