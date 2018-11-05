import { buildAttributes } from './../../utils/build';
import buildQueries from './buildQueries';
import buildMutations from './buildMutations';

const buildType = config => `
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

const generateType = config => buildType(config);

export default generateType;
