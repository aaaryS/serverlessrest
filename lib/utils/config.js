export const normalizeConfig = config => config.map(c => {
  if(!c.queries) c['queries'] = []
  if (!c.mutations) c['mutations'] = []

  return c
})
