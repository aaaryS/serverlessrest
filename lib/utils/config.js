const fs = require('fs')
const parseArgs = require('minimist')

const normalizeConfig = config => config.map(c => {
  if(!c.queries) c['queries'] = []
  if (!c.mutations) c['mutations'] = []
  if (!c.type) c['type'] = 'object'
  if (!c.auth) c['auth'] = false

  return c
})

const hasAuth = config => config.filter(table => table.auth).length > 0

const loadConfig = () => {
  const configPath = parseArgs(process.argv).config

  if (configPath) {
    const content = fs.readFileSync(process.cwd() + "/" + configPath).toString()
    global.eval(content.replace('module.exports = configExport', ''))
    return global.configExport
  }

  return require('../../main.config')
}

module.exports = {
  normalizeConfig,
  loadConfig,
  hasAuth
}
