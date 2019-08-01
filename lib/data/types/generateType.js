import { buildAttributes } from './../../utils/build';
import buildQueries from './buildQueries';
import buildMutations from './buildMutations';

export const buildEnum = config => `
  enum ${config.name} {
    ${config.values.map(v => `${v}`).join('\n    ')}
  }
`;

export const buildObject = config => `
  type ${config.item} {
    id: ID!
    ${buildAttributes(config.attributes, 4)}
  }

  type Query {
    ${config.queries ? buildQueries(config.queries, config.item, 4) : ''}
  }

  type Mutation {
    ${config.mutations ? buildMutations(config.mutations, config.item, 4) : ''}
  }
`;

const generateType = (config) => {
  if (config.type === 'object') return buildObject(config);
  if (config.type === 'enum') return buildEnum(config);

  return '';
};

export default generateType;
