const { is, tryCatch } = require('@magic/test')
//
const PUG = require('../src/index.js')

const buffer = `
.content
  #id
    .class
      p Testing
`

const expect = '<div class="content"><div id="id"><div class="class"><p>Testing</p></div></div></div>'

const config = {
  dev: {
    ENV: 'development',
    VAR: 'dev',
  },
  prod: {
    ENV: 'production',
    VAR: 'prod',
  },
}

module.exports = [
  { fn: () => PUG, expect: is.fn, info: 'PUG is a function' },
  {
    fn: async () => await PUG({ buffer, config: config.dev }),
    expect,
    info: 'can render pug in development',
  },
  {
    fn: async () => await PUG({ buffer, config: config.prod }),
    expect,
    info: 'can render pug in production',
  },
  {
    fn: async () => await PUG({ buffer: '.w= VAR', config: config.dev }),
    expect: res => res.indexOf(`>${config.dev.VAR}<`) > -1
  },
  {
    fn: async () => await PUG({ buffer: '.w= VAR', config: config.prod }),
    expect: res => res.indexOf(`>${config.prod.VAR}<`) > -1
  },
  {
    fn: tryCatch(PUG, { config: config.dev }),
    expect: is.error,
    info: 'Calling PUG without a buffer errors',
  },
]
