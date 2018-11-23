# Numeric Directive

This directive controls the input's value and allows the user to only input numbers.

## Installation
Either import whole LsnLibsModule or: 

`import {NumericDirective} from '@lsnova/angularmodules';`

## Usage
In your template file:

`<input lsnNumeric [(ngModel)]="luckyNumber" />`

or

`<input [lsnNumeric]="numericConfig" [(ngModel)]="luckyNumber" />`

where for example: `const numericConfig = { precision:2 }`

#### Available config options

| Feature          | Notes                                                  | Default         |
|------------------|--------------------------------------------------------|--------------|
| `precision`      | Number of decimals allowed after a separator           |   0          |
| `max`            | Allowed max value of input                             |   undefined  |
| `min`            | Allowed min value of input                             |   undefined  |
| `separator`      | Wholes and decimals separator (allowed `.` and `,`)    |   `.`        |
