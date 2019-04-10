export const normalizeConfig = config => config.map(c => {
  if(!c.queries) c['queries'] = []
  if (!c.mutations) c['mutations'] = []
  if (!c.type) c['type'] = 'object'
  if (!c.auth) c['auth'] = false

  return c
})
