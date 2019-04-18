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

| Feature          | Notes                                                                  | Default      |
|------------------|------------------------------------------------------------------------|--------------|
| `precision`      | Number of decimals allowed after a separator                           |   0          |
| `max`            | Allowed max value of input                                             |   undefined  |
| `min`            | Allowed min value of input                                             |   undefined  |
| `decimals`       | Wholes and decimals separator (allowed `.` and `,`)                    |   `.`        |
| `thousands`      | Thousands separator (allowed `.` and `,`) removed if same as decimals  |   undefine   |

## Global configuration
When importing the module you can set global default configuration:
```
@NgModule({
    imports: [
        ...
        LsnLibsModule.forRoot({
            numeric: {
                decimals: '.',
                precision: 4,
            }
        })
        ...
    ],
})
```

#### Custom configuration type
You can define custom configurations
```
@NgModule({
    imports: [
        ...
        LsnNumericModule.forRoot({
            default: {
                decimals: '.',
                precision: 4,
            },
            custom: {
                currency: {
                    decimals: ',',
                    thousands: ' ',
                    precision: 2,
                }
            }
        })
        ...
    ],
})
```

and make component use it:

`<input [lsnNumeric]="{config:'currency'}" [(ngModel)]="myValue" /> `
