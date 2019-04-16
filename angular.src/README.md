# @lsnova/angularmodules

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.3.

### First things first
All the subsequent instructions will assume you are in the `angular.src` dir so:
1. Clone the repo
1. `cd angular.src`

### Getting started
1. `npm install`
1. `ng serve`
1. Open http://localhost:4200 in browser. This is the **showcase app**.

### Showcase app development
Modify the sources in `./src` directory. If `ng serve` is running the app should be recompiled automatically.

**Important**

- Keep the showcase app up-to-date. 
- Include examples that might help the users to handle different kinds of feature's configurations (if any).

### Library development
To build the `lsn-libs` library project run:

`npm run libs:build`

or 

`npm run libs:build-watch`

to keep watching for changes.

#### Adding features
- Add the features in respective subdirectories in `./projects/lsn-libs/src/lib` (components | directives).
- Each feature should have its own module, readme file and unit tests.
- Export the features module in `./projects/lsn-libs/src/lib/public_api.ts`

#### Unit testing
To run the library's unit test run `npm run libs:test`

#### Building package
1. Set a proper *version* in `./projects/lsn-libs/package.json`.
1. Run `npm run package`. This will build the library and copy the compiled files to root directory.
1. Commit changed files to PR in repository.
1. Once the PR is merged, tag the proper commit with the same version number as in `./projects/lsn-libs/package.json`.
