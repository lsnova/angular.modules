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

| Feature               | Type      | Notes                                                       | Docs         |
|-----------------------|-----------|-------------------------------------------------------------|--------------|
| MatSelectComponent    | component | Extended MatSelect implementation with search input         |   [Docs][4]  |
| CapitalizeDirective   | directive | Capitalize input value                                      |   [Docs][2]  |
| LatinToGreekDirective | directive | Translate input characters from latin to greek              |   [Docs][3]  |
| NumericDirective      | directive | Input directive for number values                           |   [Docs][0]  |
| NumPadDirective       | directive | Input directive for digits only                             |   [Docs][1]  |
| ScrollSpyDirective    | directive | Detects element currently displayed inside the parent scrollable element |   [Docs][5]  |

 [0]: https://github.com/lsnova/angular.modules/tree/master/angular.src/projects/lsn-libs/src/lib/directives/numeric
 [1]: https://github.com/lsnova/angular.modules/tree/master/angular.src/projects/lsn-libs/src/lib/directives/numpad
 [2]: https://github.com/lsnova/angular.modules/tree/master/angular.src/projects/lsn-libs/src/lib/directives/capitalize
 [3]: https://github.com/lsnova/angular.modules/tree/master/angular.src/projects/lsn-libs/src/lib/directives/latin-to-greek
 [4]: https://github.com/lsnova/angular.modules/tree/master/angular.src/projects/lsn-libs/src/lib/components/mat-select
 [5]: https://github.com/lsnova/angular.modules/tree/master/angular.src/projects/lsn-libs/src/lib/directives/scroll-spy

## Contributing
If you are a contributor, you will be interested in the `angular.src` directory. It contains:
 - Angular application configured to build the lsn-libs project and also showcase LsnLibsModule usage (`/angular.src/src` dir)
 - Angular library project which contains the sources for the features (`/angular.src/projects/lsn-libs` dir)
 
 See the [angular.src/README](https://github.com/lsnova/angular.modules/tree/master/angular.src) to see how to build and develop `@lsnova/angularmodules` library.
 
**Other files in the root directory are generated automatically and should not be modified manually!**
