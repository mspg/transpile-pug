const util = require('util')
const pug = require('pug')
const { minify } = require('html-minifier')

const is = require('@magic/types')
const log = require('@magic/log')

const render = util.promisify(pug.render)

const PUG = async ({ buffer, config }) => {
  const { ENV } = config
  config.HTML_DIR = config.HTML_DIR ? config.HTML_DIR : '/'

  config.WEB_ROOT = ENV === 'production' && config.WEB_ROOT ? config.WEB_ROOT : '/'

  try {
    if (is.empty(buffer)) {
      throw new Error('PUG: Missing argument: { buffer } missing in first argument')
    }

    if (!is.string(buffer)) {
      if (is.buffer(buffer)) {
        buffer = buffer.toString()
      } else {
        throw new Error('PUG: buffer has to be a string or buffer')
      }
    }

    const html = await render(buffer, { basedir: config.HTML_DIR, ...config })
    const minified = await minify(html)
    return minified
  } catch (e) {
    throw e
  }
}

module.exports = PUG
