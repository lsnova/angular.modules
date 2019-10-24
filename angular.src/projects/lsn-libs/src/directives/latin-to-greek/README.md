# Capitalize Directive

TODO

## Installation
Either import whole LsnLibsModule or: 
```
import {LsnLatinToGreekModule} from '@lsnova/angularmodules';

@NgModule({
  ...
  imports: [
    ...,
    LsnLatinToGreekModule
  ],
  ...
})
export class AppModule {
}
```

## Usage
In your template file:

`<input lsnLatinToGreek [(ngModel)]="firstName" />`
