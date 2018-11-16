const fs = require('fs')
const path = require('path')
const { is, tryCatch } = require('@magic/test')
//
const PUG = require('../src/index.js')

const templateString = `
.c
  #id.class(data-wr= WEB_ROOT)= HTML_DIR
`

const templateBuffer = fs.readFileSync(path.join(__dirname, 'includes', 'test.pug'))

const expect = '<div class="c"><div class="class" id="id" data-wr="/">/testing</div></div>'
const expectRooted =
  '<div class="c"><div class="class" id="id" data-wr="/root">/testing</div></div>'

const config = {
  dev: {
    ENV: 'development',
    HTML_DIR: '/testing',
  },
  prod: {
    ENV: 'production',
    HTML_DIR: '/testing',
  },
  rooted: {
    dev: {
      ENV: 'development',
      HTML_DIR: '/testing',
      WEB_ROOT: '/root',
    },
    prod: {
      ENV: 'production',
      HTML_DIR: '/testing',
      WEB_ROOT: '/root',
    },
  },
}

module.exports = [
  { fn: () => PUG, expect: is.fn, info: 'PUG is a function' },
  {
    fn: async () => await PUG({ buffer: templateString, config: config.dev }),
    expect,
    info: 'can render pug in development',
  },
  {
    fn: async () => await PUG({ buffer: templateString, config: config.prod }),
    expect,
    info: 'can render pug in production',
  },
  {
    fn: async () => await PUG({ buffer: templateString, config: config.rooted.dev }),
    expect,
    info: 'WEB_ROOT does not get applied in development mode',
  },
  {
    fn: async () => await PUG({ buffer: templateString, config: config.rooted.prod }),
    expect: expectRooted,
    info: 'WEB_ROOT gets applied in production mode',
  },
  {
    fn: async () => await PUG({ buffer: '.t= HTML_DIR', config: { ENV: 'development' } }),
    expect: '<div class="t">/</div>',
    info: 'HTML_DIR fallback is "/"',
  },
  {
    fn: async () => await PUG({ buffer: templateString, config: config.dev }),
    expect: res => res.indexOf(`>${config.dev.HTML_DIR}<`) > -1,
    info: 'Can handle global pug variables in dev',
  },
  {
    fn: async () => await PUG({ buffer: templateString, config: config.prod }),
    expect: res => res.indexOf(`>${config.prod.HTML_DIR}<`) > -1,
    info: 'Can handle global pug variables in prod',
  },
  {
    fn: async () => await PUG({ buffer: templateBuffer, config: config.dev }),
    expect: '<div class="tostring">tostring</div>',
    info: 'Function can handle buffers',
  },
  {
    fn: tryCatch(PUG, { buffer: {}, config: config.dev }),
    expect: is.error,
    info: 'Passing empty objects errors',
  },
  {
    fn: tryCatch(PUG, { buffer: [], config: config.dev }),
    expect: is.error,
    info: 'Passing empty arrays errors',
  },
  {
    fn: tryCatch(PUG, { buffer: { toString: () => {} }, config: config.dev }),
    expect: is.error,
    info: 'Passing non buffer objects errors even if they have a toString function',
  },
  {
    fn: tryCatch(PUG, { config: config.dev }),
    expect: is.error,
    info: 'Calling PUG without a buffer errors',
  },
]
