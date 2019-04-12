# @lsnova/angularmodules

This project contains a set of Angular components and directives to be used among @lsnova's applications.

## Installation and usage
Install the package with: 

`npm install -S git+ssh://git@github.com:lsnova/angular.modules.git`

or e.g.

`npm install -S git+ssh://git@github.com:lsnova/angular.modules.git#0.4.1`

for specific version number (check the repo's tags).

Since this is not a public npm package (yet?), **it is recommended to use a specific version number**.

Now, in your Angular application import the whole module:
```
import {LsnLibsModule} from '@lsnova/angularmodules';

@NgModule({
  ...
  imports: [
    ...,
    LsnLibsModule
  ],
  ...
})
export class AppModule {
}
```

For importing a single feature see its docs for details.

#### Available features

| Feature               | Type      | Notes                                                  | Docs         |
|-----------------------|-----------|--------------------------------------------------------|--------------|
| CapitalizeDirective   | directive | Capitalize input value                                 |   [Docs][2]  |
| LatinToGreekDirective | directive | Translate input characters from latin to greek         |   [Docs][3]  |
| NumericDirective      | directive | Input directive for number values                      |   [Docs][0]  |
| NumPadDirective       | directive | Input directive for digits only                        |   [Docs][1]  |

 [0]: https://github.com/lsnova/angular.modules/tree/master/angular.src/projects/lsn-libs/src/lib/directives/numeric
 [1]: https://github.com/lsnova/angular.modules/tree/master/angular.src/projects/lsn-libs/src/lib/directives/numpad
 [2]: https://github.com/lsnova/angular.modules/tree/master/angular.src/projects/lsn-libs/src/lib/directives/capitalize
 [3]: https://github.com/lsnova/angular.modules/tree/master/angular.src/projects/lsn-libs/src/lib/directives/latin-to-greek

## Contributing

This project is still evolving to a stable version. Contributing rules coming soon. Be patient!
