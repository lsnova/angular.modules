import { Injectable } from '@angular/core';
var NumericSeparator;
(function (NumericSeparator) {
    NumericSeparator["COMMA"] = ",";
    NumericSeparator["PERIOD"] = ".";
    NumericSeparator["SPACE"] = " ";
})(NumericSeparator || (NumericSeparator = {}));
export class DefaultNumericConfig {
    constructor(props = {}) {
        this.precision = 0;
        this.decimals = NumericSeparator.PERIOD;
        this.noScientificNotation = false;
        this.alwaysDisplayDecimals = false;
        Object.assign(this, props);
    }
}
export class CustomNumericConfig {
    constructor(props = {}) {
        Object.assign(this, props);
    }
}
export class NumericConfigService {
    constructor(config) {
        let moduleConfig = new CustomNumericConfig();
        if (config) {
            moduleConfig = Object.assign(moduleConfig, config);
        }
        const numericConfig = moduleConfig.default || {};
        const customConfig = moduleConfig.custom || {};
        this.config = new CustomNumericConfig({
            default: new DefaultNumericConfig(numericConfig),
            custom: customConfig,
        });
    }
    getDefaultConfig() {
        return this.config.default;
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtZXJpYy1jb25maWcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2xzbi1saWJzL3NyYy9saWIvZGlyZWN0aXZlcy9udW1lcmljL251bWVyaWMtY29uZmlnLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV6QyxJQUFLLGdCQUlKO0FBSkQsV0FBSyxnQkFBZ0I7SUFDbkIsK0JBQVcsQ0FBQTtJQUNYLGdDQUFZLENBQUE7SUFDWiwrQkFBVyxDQUFBO0FBQ2IsQ0FBQyxFQUpJLGdCQUFnQixLQUFoQixnQkFBZ0IsUUFJcEI7QUFlRCxNQUFNLE9BQU8sb0JBQW9CO0lBVy9CLFlBQVksS0FBSyxHQUFHLEVBQUU7UUFQdEIsY0FBUyxHQUFHLENBQUMsQ0FBQztRQUNkLGFBQVEsR0FBVyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUM7UUFHM0MseUJBQW9CLEdBQUcsS0FBSyxDQUFDO1FBQzdCLDBCQUFxQixHQUFHLEtBQUssQ0FBQztRQUc1QixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0NBQ0Y7QUFFRCxNQUFNLE9BQU8sbUJBQW1CO0lBSTlCLFlBQVksS0FBSyxHQUFHLEVBQUU7UUFDcEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztDQUNGO0FBR0QsTUFBTSxPQUFPLG9CQUFvQjtJQUcvQixZQUFZLE1BQTJCO1FBRXJDLElBQUksWUFBWSxHQUFHLElBQUksbUJBQW1CLEVBQUUsQ0FBQztRQUM3QyxJQUFJLE1BQU0sRUFBRTtZQUNWLFlBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztTQUNwRDtRQUVELE1BQU0sYUFBYSxHQUFHLFlBQVksQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO1FBQ2pELE1BQU0sWUFBWSxHQUFHLFlBQVksQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO1FBQy9DLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQztZQUNwQyxPQUFPLEVBQUUsSUFBSSxvQkFBb0IsQ0FBQyxhQUFhLENBQUM7WUFDaEQsTUFBTSxFQUFFLFlBQVk7U0FDckIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGdCQUFnQjtRQUNkLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDN0IsQ0FBQztJQUVELGVBQWUsQ0FBQyxHQUFHO1FBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUM1QixPQUFPLENBQUMsSUFBSSxDQUFDLDJDQUEyQyxDQUFDLENBQUM7U0FDM0Q7UUFDRCxPQUFPLGdDQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxHQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzdGLENBQUM7OztZQTVCRixVQUFVOzs7O1lBSVcsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZW51bSBOdW1lcmljU2VwYXJhdG9yIHtcbiAgQ09NTUEgPSAnLCcsXG4gIFBFUklPRCA9ICcuJyxcbiAgU1BBQ0UgPSAnICdcbn1cblxuZXhwb3J0IGludGVyZmFjZSBOdW1lcmljQ29uZmlnIHtcbiAgbWluPzogbnVtYmVyO1xuICBtYXg/OiBudW1iZXI7XG4gIG1heExlbmd0aD86IG51bWJlcjtcbiAgcHJlY2lzaW9uPzogbnVtYmVyO1xuICBkZWNpbWFscz86IHN0cmluZztcbiAgdGhvdXNhbmRzPzogc3RyaW5nO1xuICBjb25maWc/OiBzdHJpbmc7XG4gIHN0ZXA/OiBudW1iZXI7XG4gIG5vU2NpZW50aWZpY05vdGF0aW9uPzogYm9vbGVhbjtcbiAgYWx3YXlzRGlzcGxheURlY2ltYWxzPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNsYXNzIERlZmF1bHROdW1lcmljQ29uZmlnIGltcGxlbWVudHMgTnVtZXJpY0NvbmZpZyB7XG4gIG1pbjogbnVtYmVyO1xuICBtYXg6IG51bWJlcjtcbiAgbWF4TGVuZ3RoOiBudW1iZXI7XG4gIHByZWNpc2lvbiA9IDA7XG4gIGRlY2ltYWxzOiBzdHJpbmcgPSBOdW1lcmljU2VwYXJhdG9yLlBFUklPRDtcbiAgdGhvdXNhbmRzOiBzdHJpbmc7XG4gIHN0ZXA6IG51bWJlcjtcbiAgbm9TY2llbnRpZmljTm90YXRpb24gPSBmYWxzZTtcbiAgYWx3YXlzRGlzcGxheURlY2ltYWxzID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJvcHMgPSB7fSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgcHJvcHMpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDdXN0b21OdW1lcmljQ29uZmlnIHtcbiAgZGVmYXVsdD86IE51bWVyaWNDb25maWc7XG4gIGN1c3RvbT86IHsgW2tleTogc3RyaW5nXTogTnVtZXJpY0NvbmZpZyB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzID0ge30pIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHByb3BzKTtcbiAgfVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTnVtZXJpY0NvbmZpZ1NlcnZpY2Uge1xuICBwcml2YXRlIGNvbmZpZzogQ3VzdG9tTnVtZXJpY0NvbmZpZztcblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IEN1c3RvbU51bWVyaWNDb25maWcpIHtcblxuICAgIGxldCBtb2R1bGVDb25maWcgPSBuZXcgQ3VzdG9tTnVtZXJpY0NvbmZpZygpO1xuICAgIGlmIChjb25maWcpIHtcbiAgICAgIG1vZHVsZUNvbmZpZyA9IE9iamVjdC5hc3NpZ24obW9kdWxlQ29uZmlnLCBjb25maWcpO1xuICAgIH1cblxuICAgIGNvbnN0IG51bWVyaWNDb25maWcgPSBtb2R1bGVDb25maWcuZGVmYXVsdCB8fCB7fTtcbiAgICBjb25zdCBjdXN0b21Db25maWcgPSBtb2R1bGVDb25maWcuY3VzdG9tIHx8IHt9O1xuICAgIHRoaXMuY29uZmlnID0gbmV3IEN1c3RvbU51bWVyaWNDb25maWcoe1xuICAgICAgZGVmYXVsdDogbmV3IERlZmF1bHROdW1lcmljQ29uZmlnKG51bWVyaWNDb25maWcpLFxuICAgICAgY3VzdG9tOiBjdXN0b21Db25maWcsXG4gICAgfSk7XG4gIH1cblxuICBnZXREZWZhdWx0Q29uZmlnKCkge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5kZWZhdWx0O1xuICB9XG5cbiAgZ2V0Q3VzdG9tQ29uZmlnKGtleSkge1xuICAgIGlmICghdGhpcy5jb25maWcuY3VzdG9tW2tleV0pIHtcbiAgICAgIGNvbnNvbGUud2FybignW2xzbk51bWVyaWNdIEludmFsaWQgY29uZmlnIGtleSBwcm92aWRlZC4nKTtcbiAgICB9XG4gICAgcmV0dXJuIHsuLi50aGlzLmdldERlZmF1bHRDb25maWcoKSwgLi4udGhpcy5jb25maWcuY3VzdG9tW2tleV19IHx8IHRoaXMuZ2V0RGVmYXVsdENvbmZpZygpO1xuICB9XG59XG4iXX0=