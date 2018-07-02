import { lowerFirstLetter, delimiter } from './../../utils/helpers';
import { buildAttributes } from './../../utils/build';

const buildQueryReturn = (item, type) => (
  type === 'collection' ? `[${item}]` : item
);

const buildQueries = (queries, item, spaces = 0) => queries.map((query) => {
  const itemLowerCase = lowerFirstLetter(item);
  switch (query.type) {
    case 'get':
      return `${itemLowerCase}s: [${item}]`;
    case 'index':
      return `${itemLowerCase}(id: ID!): ${item}`;
    case 'custom':
      return `${query.name}(${buildAttributes(query.attributes, ', ')}): ${buildQueryReturn(item, query.returnType)}`;
    default:
      return '';
  }
}).join(delimiter(spaces));

export default buildQueries;
