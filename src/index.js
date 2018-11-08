const util = require('util')
const pug = require('pug')
const { minify } = require('html-minifier')

const log = require('@magic/log')

const render = util.promisify(pug.render)

const PUG = async ({ buffer, config }) => {
  const { ENV } = config
  const HTML_DIR = config.HTML_DIR ? config.HTML_DIR : '/'
  const WEB_ROOT = ENV !== 'development' && config.WEB_ROOT ? config.WEB_ROOT : '/'

  try {
    if (!buffer || typeof buffer !== 'string') {
      throw new Error('PUG: Missing argument: { buffer } missing in first argument')
    }

    const html = await render(buffer, { basedir: HTML_DIR, WEB_ROOT, ...config })
    const minified = await minify(html)
    return minified
  }
  catch(e) {
    throw e
  }
}

module.exports = PUG
