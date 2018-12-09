#### @mspg/transpile-pug

[![NPM version][npm-image]][npm-url]
[![Linux Build Status][travis-image]][travis-url]
[![Windows Build Status][appveyor-image]][appveyor-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![Greenkeeper badge](https://badges.greenkeeper.io/mspg/transpile-pug.svg)](https://greenkeeper.io/)

transpiles pug to html,
then uses html-minifier on the result and returns it.

##### Installation:
```javascript
npm install @mspg/transpile-pug
```

##### Usage:
First set up a [mspg][core-url] project.

then, in src/config.js
```javascript
  const HTML = require('@mspg/pug')

  module.exports = {
    TRANSPILERS: {
      HTML,
    },
  }
```

###### src directory stylus
you should not rename the html files in the /src directory,
you can just use pug in them now.

###### includes
You can also use the /includes/html directory to create \*.pug files
and include/extend them from the html files in /src.

###### example app
a minimal example app is in the [example][example-url] directory of this repository,
using [config.js][config-url] from the root directory

###### example app on github.io
the example app is published to the [gh-pages][gh-pages] branch.
it is hosted @ [https://mspg.github.io/transpile-pug][page-url]

[npm-image]: https://img.shields.io/npm/v/@mspg/transpile-pug.svg
[npm-url]: https://www.npmjs.com/package/@mspg/transpile-pug
[travis-image]: https://travis-ci.org/mspg/transpile-pug.svg?branch=master
[travis-url]: https://travis-ci.org/mspg/transpile-pug
[appveyor-image]: https://ci.appveyor.com/api/projects/status/0cropq4gauy9lqf3?svg=true
[appveyor-url]: https://ci.appveyor.com/project/jaeh/transpile-pug/branch/master
[coveralls-image]: https://coveralls.io/repos/github/mspg/transpile-pug/badge.svg
[coveralls-url]: https://coveralls.io/github/mspg/transpile-pug
[example-url]: https://github.com/mspg/transpile-pug/tree/master/example
[config-url]: https://github.com/mspg/transpile-pug/blob/master/config.js
[core-url]: https://github.com/mspg/core
[gh-pages]: https://github.com/mspg/transpile-pug/tree/gh-pages
[page-url]: https://mspg.github.io/transpile-pug
