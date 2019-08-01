import { readFileSync } from 'fs';
import parseArgs from 'minimist';

const normalizeConfig = config => config.map((_c) => {
  const c = { ..._c };
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
    const content = readFileSync(`${process.cwd()}/${configPath}`).toString();
    // eslint-disable-next-line no-eval
    global.eval(content.replace('module.exports = configExport', ''));
    return global.configExport;
  }

  // eslint-disable-next-line global-require
  return require('../../examples/complex/complex.config');
};

export default {
  normalizeConfig,
  loadConfig,
  hasAuth,
};
