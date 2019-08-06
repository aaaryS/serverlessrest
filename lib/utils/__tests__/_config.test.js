import config from './../config';

const { normalizeConfig, hasAuth } = config;

describe('#normalizeConfig', () => {
  it('is should add empty queries array to config', () => {
    expect(normalizeConfig([{}])[0]).toMatchObject({ queries: [] });
  });

  it('is should add empty mutations array to config', () => {
    expect(normalizeConfig([{}])[0]).toMatchObject({ mutations: [] });
  });

  it('is should set type to default one if not passed', () => {
    expect(normalizeConfig([{}])[0]).toMatchObject({ type: 'object' });
  });

  it('is should set auth to default one if not passed', () => {
    expect(normalizeConfig([{}])[0]).toMatchObject({ auth: false });
  });
});

describe('#hasAuth', () => {
  it('should return true if any config object has auth', () => {
    expect(hasAuth([{ auth: true }, { auth: true }])).toBeTruthy();
  });

  it('should return false if config is empty', () => {
    expect(hasAuth([])).toBeFalsy();
  });

  it('should return false if no  config has auth', () => {
    expect(hasAuth([{ auth: false }])).toBeFalsy();
  });
});
