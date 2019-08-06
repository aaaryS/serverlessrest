import { generateDefs } from '../lib/data/generateSchema';
import { normalizeConfig } from '../lib/utils/config';

import basicConfig from '../examples/basic/basic.config';
import authConfig from '../examples/auth/auth.config';
import complexConfig from '../examples/complex/complex.config';

it('should match snapshot for basic config', () => {
  const normalizedConfig = normalizeConfig(basicConfig);
  const def = generateDefs(normalizedConfig);

  expect(def).toMatchSnapshot();
});

it('should match snapshot for auth config', () => {
  const normalizedConfig = normalizeConfig(authConfig);
  const def = generateDefs(normalizedConfig);

  expect(def).toMatchSnapshot();
});

it('should match snapshot for complex config', () => {
  const normalizedConfig = normalizeConfig(complexConfig);
  const def = generateDefs(normalizedConfig);

  expect(def).toMatchSnapshot();
});
