# MatSelectComponent

This component is an extension to [MatSelect](https://material.angular.io/components/select/overview).
It provides a couple of features used in LSN projects.

## Installation
Either import whole LsnLibsModule or: 
```
import {LsnMatSelectModule} from '@lsnova/angularmodules';

@NgModule({
  ...
  imports: [
    ...,
    LsnMatSelectModule
  ],
  ...
})
export class AppModule {
}
```

## Usage
In your template file:

`<input lsnNumeric [(ngModel)]="luckyNumber" />`

or

`<input [lsnNumeric]="numericConfig" [(ngModel)]="luckyNumber" />`

where for example: `const numericConfig = { precision:2 }`

#### Available config options
Coming soon...ish
