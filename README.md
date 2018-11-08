#### mspg-pug

mspg pug transpiles pug to html,
then uses html-minifier on the result and returns it.

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
