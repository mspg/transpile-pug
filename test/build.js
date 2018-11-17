// integration test for the build system.
// builds the example/ directory and tests the resulting files

const util = require('util')
const path = require('path')
const { exec } = require('child_process')
const nfs = require('fs')

const xc = util.promisify(exec)
const fs = {
  readFile: util.promisify(nfs.readFile),
  exists: util.promisify(nfs.exists),
}

const beforeAll = async () => {
  try {
    const cmd = 'mspg clean build zip'
    await xc(cmd)
  } catch (e) {
    throw e
  }
}

const dir = path.join(__dirname, '..', 'example', 'public')
const exampleFile = path.join(dir, 'index.html')
const fileExists = async () => await fs.exists(exampleFile)
const fileContents = async () => await fs.readFile(exampleFile, 'utf8')

const doctypeExists = s => s.indexOf('<!DOCTYPE html>') === 0
const bodyHasId = s => s.indexOf('id="♥"') > -1
const blockContentExists = s => s.indexOf('<div>extending page.pug</div>') > -1

const zipFile = path.join(dir, 'index.html.gz')
const zipFileExists = async () => await fs.exists(zipFile)

module.exports = {
  beforeAll,
  tests: [
    { fn: fileExists, expect: true, info: 'public/index.html exists' },
    { fn: zipFileExists, expect: true, info: 'public/index.html.gz exists' },
    {
      fn: fileContents,
      expect: bodyHasId,
      info: 'public/index.html body id is set',
    },
    {
      fn: fileContents,
      expect: blockContentExists,
      info: 'public/index.html contains extended content block',
    },
    {
      fn: fileContents,
      expect: doctypeExists,
      info: 'public/index.html contains doctype',
    },
  ],
}
