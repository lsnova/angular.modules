import { InjectionToken } from '@angular/core';
export class LsnCookieConfig {
    constructor({ secureCookies = null, domainCookies = null } = {}) {
        this.secureCookies = secureCookies;
        this.domainCookies = domainCookies;
    }
}
export const LSN_COOKIE_CONFIG = new InjectionToken('LsnCookieConfig');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNuQ29va2llQ29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbHNuLWxpYnMvc3JjL2xpYi9zZXJ2aWNlcy9sc24tY29va2llL2xzbkNvb2tpZUNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRTdDLE1BQU0sT0FBTyxlQUFlO0lBSTFCLFlBQVksRUFDRSxhQUFhLEdBQUcsSUFBSSxFQUFFLGFBQWEsR0FBRyxJQUFJLEVBQzNDLEdBQUcsRUFBRTtRQUNoQixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztJQUNyQyxDQUFDO0NBQ0Y7QUFFRCxNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLGNBQWMsQ0FBa0IsaUJBQWlCLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0aW9uVG9rZW59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgY2xhc3MgTHNuQ29va2llQ29uZmlnIHtcbiAgc2VjdXJlQ29va2llczogYm9vbGVhbjtcbiAgZG9tYWluQ29va2llczogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3Rvcih7XG4gICAgICAgICAgICAgICAgc2VjdXJlQ29va2llcyA9IG51bGwsIGRvbWFpbkNvb2tpZXMgPSBudWxsXG4gICAgICAgICAgICAgIH0gPSB7fSkge1xuICAgIHRoaXMuc2VjdXJlQ29va2llcyA9IHNlY3VyZUNvb2tpZXM7XG4gICAgdGhpcy5kb21haW5Db29raWVzID0gZG9tYWluQ29va2llcztcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgTFNOX0NPT0tJRV9DT05GSUcgPSBuZXcgSW5qZWN0aW9uVG9rZW48THNuQ29va2llQ29uZmlnPignTHNuQ29va2llQ29uZmlnJyk7XG4iXX0=