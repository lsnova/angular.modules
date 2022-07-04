import { InjectionToken } from '@angular/core';
export class LsnCrossTabConfig {
    constructor({ cookieCleanFreq = null, cookieReadFreq = null, msgTtl = null, rootDomain = null, crossTabCookieName = null } = {}) {
        this.cookieCleanFreq = cookieCleanFreq;
        this.cookieReadFreq = cookieReadFreq;
        this.msgTtl = msgTtl;
        this.rootDomain = rootDomain;
        this.crossTabCookieName = crossTabCookieName;
    }
}
export const LSN_CROSS_TAB_CONFIG = new InjectionToken('LsnCrossTabConfig');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNuQ3Jvc3NUYWJDb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9sc24tbGlicy9zcmMvbGliL3NlcnZpY2VzL2xzbi1jcm9zcy10YWIvbW9kZWxzL2xzbkNyb3NzVGFiQ29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFN0MsTUFBTSxPQUFPLGlCQUFpQjtJQU81QixZQUFZLEVBQUMsZUFBZSxHQUFHLElBQUksRUFBRSxjQUFjLEdBQUcsSUFBSSxFQUFFLE1BQU0sR0FBRyxJQUFJLEVBQUUsVUFBVSxHQUFHLElBQUksRUFBRSxrQkFBa0IsR0FBRyxJQUFJLEVBQUMsR0FBRyxFQUFFO1FBQzNILElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQztJQUMvQyxDQUFDO0NBQ0Y7QUFFRCxNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLGNBQWMsQ0FBb0IsbUJBQW1CLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0aW9uVG9rZW59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgY2xhc3MgTHNuQ3Jvc3NUYWJDb25maWcge1xuICBjb29raWVDbGVhbkZyZXE6IG51bWJlcjtcbiAgY29va2llUmVhZEZyZXE6IG51bWJlcjtcbiAgbXNnVHRsOiBudW1iZXI7IC8vIHJlcHJlc2VudHMgZHVyYXRpb24gb2YgZXhpc3RlbmNlIG9mIGdpdmVuIGNyb3NzIHRhYiBtZXNzYWdlLCBhZnRlciB0aGlzIHBlcmlvZCBmcm9tIG1lc3NhZ2UgY3JlYXRpb24sIHRoZSBtZXNzYWdlIHdpbGwgYmUgZGVsZXRlZCBmcm9tIGNvb2tpZVxuICByb290RG9tYWluOiBzdHJpbmc7XG4gIGNyb3NzVGFiQ29va2llTmFtZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHtjb29raWVDbGVhbkZyZXEgPSBudWxsLCBjb29raWVSZWFkRnJlcSA9IG51bGwsIG1zZ1R0bCA9IG51bGwsIHJvb3REb21haW4gPSBudWxsLCBjcm9zc1RhYkNvb2tpZU5hbWUgPSBudWxsfSA9IHt9KSB7XG4gICAgdGhpcy5jb29raWVDbGVhbkZyZXEgPSBjb29raWVDbGVhbkZyZXE7XG4gICAgdGhpcy5jb29raWVSZWFkRnJlcSA9IGNvb2tpZVJlYWRGcmVxO1xuICAgIHRoaXMubXNnVHRsID0gbXNnVHRsO1xuICAgIHRoaXMucm9vdERvbWFpbiA9IHJvb3REb21haW47XG4gICAgdGhpcy5jcm9zc1RhYkNvb2tpZU5hbWUgPSBjcm9zc1RhYkNvb2tpZU5hbWU7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IExTTl9DUk9TU19UQUJfQ09ORklHID0gbmV3IEluamVjdGlvblRva2VuPExzbkNyb3NzVGFiQ29uZmlnPignTHNuQ3Jvc3NUYWJDb25maWcnKTtcbiJdfQ==