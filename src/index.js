const util = require('util')
const pug = require('pug')
const { minify } = require('html-minifier')

const log = require('@magic/log')

const render = util.promisify(pug.render)

const PUG = async ({ buffer, config }) => {
  const { ENV } = config
  const HTML_DIR = config.HTML_DIR ? config.HTML_DIR : '/'
  const WEB_ROOT = ENV === 'production' && config.WEB_ROOT ? config.WEB_ROOT : '/'

  try {
    if (!buffer) {
      throw new Error('PUG: Missing argument: { buffer } missing in first argument')
    }

    if (typeof buffer !== 'string' && typeof buffer.toString === 'function') {
      buffer = buffer.toString()
    } else {
      throw new Error('PUG: buffer has to be a string or be an object with a .toString function')
    }

    const html = await render(buffer, { basedir: HTML_DIR, ...config, WEB_ROOT })
    const minified = await minify(html)
    return minified
  }
  catch(e) {
    throw e
  }
}

module.exports = PUG
