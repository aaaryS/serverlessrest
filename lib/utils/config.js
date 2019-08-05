/* eslint-disable no-param-reassign */
const fs = require('fs');
const parseArgs = require('minimist');

const normalizeConfig = config => config.map((c) => {
  if (!c.queries) c.queries = [];
  if (!c.mutations) c.mutations = [];
  if (!c.type) c.type = 'object';
  if (!c.auth) c.auth = false;

  return c;
});

const hasAuth = config => config.filter(table => table.auth).length > 0;

const loadConfig = () => {
  const configPath = parseArgs(process.argv).config;

  if (configPath) {
    const content = fs.readFileSync(`${process.cwd()}/${configPath}`).toString();
    // eslint-disable-next-line no-eval
    global.eval(content.replace('module.exports = configExport', ''));
    return global.configExport;
  }

  // eslint-disable-next-line global-require
  return require('../../examples/complex/complex.config');
};

module.exports = {
  normalizeConfig,
  loadConfig,
  hasAuth,
};
