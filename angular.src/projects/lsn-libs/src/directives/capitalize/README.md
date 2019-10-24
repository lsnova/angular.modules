# Capitalize Directive

This directive capitalizes the input's ngModel's value.

## Installation
Either import whole LsnLibsModule or: 
```
import {LsnCapitalizeModule} from '@lsnova/angularmodules';

@NgModule({
  ...
  imports: [
    ...,
    LsnCapitalizeModule
  ],
  ...
})
export class AppModule {
}
```

## Usage
In your template file:

`<input lsnCapitalize [(ngModel)]="firstName" />`
