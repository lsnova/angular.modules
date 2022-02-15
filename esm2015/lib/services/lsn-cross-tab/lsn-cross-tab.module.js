import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LsnCookieModule } from '../lsn-cookie/lsn-cookie.module';
export function lsnCrossTabServiceFactory(lsnCrossTabService) {
    return () => lsnCrossTabService.run();
}
export class LsnCrossTabModule {
}
LsnCrossTabModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    LsnCookieModule
                ],
                exports: [
                    LsnCookieModule
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNuLWNyb3NzLXRhYi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9sc24tbGlicy9zcmMvbGliL3NlcnZpY2VzL2xzbi1jcm9zcy10YWIvbHNuLWNyb3NzLXRhYi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBR2hFLE1BQU0sVUFBVSx5QkFBeUIsQ0FBQyxrQkFBc0M7SUFDOUUsT0FBTyxHQUFHLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUN4QyxDQUFDO0FBV0QsTUFBTSxPQUFPLGlCQUFpQjs7O1lBVDdCLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixlQUFlO2lCQUNoQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsZUFBZTtpQkFDaEI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0xzbkNvb2tpZU1vZHVsZX0gZnJvbSAnLi4vbHNuLWNvb2tpZS9sc24tY29va2llLm1vZHVsZSc7XG5pbXBvcnQge0xzbkNyb3NzVGFiU2VydmljZX0gZnJvbSAnLi9sc24tY3Jvc3MtdGFiLnNlcnZpY2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gbHNuQ3Jvc3NUYWJTZXJ2aWNlRmFjdG9yeShsc25Dcm9zc1RhYlNlcnZpY2U6IExzbkNyb3NzVGFiU2VydmljZSkge1xuICByZXR1cm4gKCkgPT4gbHNuQ3Jvc3NUYWJTZXJ2aWNlLnJ1bigpO1xufVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIExzbkNvb2tpZU1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTHNuQ29va2llTW9kdWxlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTHNuQ3Jvc3NUYWJNb2R1bGUge1xufVxuIl19