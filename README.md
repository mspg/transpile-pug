#### mspg-pug

[![NPM version][npm-image]][npm-url]
[![Linux Build Status][travis-image]][travis-url]
[![Windows Build Status][appveyor-image]][appveyor-url]
[![Coverage Status][coveralls-image]][coveralls-url]

transpiles pug to html,
then uses html-minifier on the result and returns it.

##### Installation:
```javascript
npm install @mspg/transpile-pug
```

##### Usage:
First set up a [mspg](https://github.com/mspg/core) project.

then, in src/config.js
```javascript
  const HTML = require('@mspg/pug')

  module.exports = {
    TRANSPILERS: {
      HTML,
    },
  }
```

You should not have to rename the html files in the /src directory,
you can just use pug in them now.

You can also use the /includes/html directory to create *.pug files and include/extend them from the html files in /src.

Example app will be linked here soon

[npm-image]: https://img.shields.io/npm/v/@mspg/transpile-pug.svg
[npm-url]: https://www.npmjs.com/package/@mspg/transpile-pug
[travis-image]: https://travis-ci.org/mspg/transpile-pug.svg?branch=master
[travis-url]: https://travis-ci.org/mspg/transpile-pug
[appveyor-image]: https://ci.appveyor.com/api/projects/status/0cropq4gauy9lqf3?svg=true
[appveyor-url]: https://ci.appveyor.com/project/jaeh/transpile-pug/branch/master
[coveralls-image]: https://coveralls.io/repos/github/mspg/transpile-pug/badge.svg
[coveralls-url]: https://coveralls.io/github/mspg/transpile-pug
