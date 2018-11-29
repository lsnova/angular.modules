# NumPad Directive

This directive controls the input's value and allows the user to only input digits.

## Installation
Either import whole LsnLibsModule or: 

`import {LatinToGreekDirective} from '@lsnova/angularmodules';`

## Usage
In your template file:

`<input lsnNumPad [(ngModel)]="pesel" />`

or

`<input [lsnNumPad]="numPadConfig" [(ngModel)]="pesel" />`

where for example: `const numPadConfig = { maxlength:2 }`

#### Available config options

| Feature             | Notes                                                         | Default      |
|---------------------|---------------------------------------------------------------|--------------|
| `maxlength`         | Maximum length of the input's value                           |   undefined  |
| `allowLeadingZeros` | Allow leading zeros (if false, leading zeros cleared on blur) |   false      |
