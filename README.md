# @lsnova/angularmodules

This project contains a set of Angular components and directives to be used among @lsnova's applications.

## Installation and usage
Install the package with: 

`npm install -S git+ssh://git@github.com:lsnova/angular.modules.git`

Now, in your Angular application import the whole module:

`import {LsnLibsModule} from '@lsnova/angularmodules';`

or a single feature:

`import {NumericDirective} from '@lsnova/angularmodules';`

#### Available features

| Feature               | Notes                                                  | Docs         |
|-----------------------|--------------------------------------------------------|--------------|
| CapitalizeDirective   | Capitalize input value                                 |   [Docs][2]  |
| LatinToGreekDirective | Translate input characters from latin to greek         |   [Docs][3]  |
| NumericDirective      | Input directive for number values                      |   [Docs][0]  |
| NumPadDirective       | Input directive for digits only                        |   [Docs][1]  |

 [0]: https://github.com/lsnova/angular.modules/tree/master/angular.src/projects/lsn-libs/src/lib/directives/numeric
 [1]: https://github.com/lsnova/angular.modules/tree/master/angular.src/projects/lsn-libs/src/lib/directives/numpad
 [2]: https://github.com/lsnova/angular.modules/tree/master/angular.src/projects/lsn-libs/src/lib/directives/capitalize
 [3]: https://github.com/lsnova/angular.modules/tree/master/angular.src/projects/lsn-libs/src/lib/directives/latin-to-greek

## Contributing

This project is still evolving to a stable version. Contributing rules coming soon. Be patient!
