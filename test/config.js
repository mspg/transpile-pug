const { is } = require('@magic/test')
const conf = require('../config')

module.exports = [
    { fn: () => conf.TRANSPILERS.HTML, expect: is.fn, info: 'html transpile is a function' },
]