import indexResolver from './indexResolver';
import getResolver from './getResolver';
import customResolver from './customResolver';

import {
  lowerFirstLetter,
} from './../../../utils/helpers';

const generateQueryResolvers = config => config.queries.reduce((acc, query) => {
  const item = lowerFirstLetter(config.item);
  switch (query.type) {
    case 'get':
      acc[item] = getResolver(config);
      break;
    case 'index':
      acc[`${item}s`] = indexResolver(config);
      break;
    case 'custom':
      acc[query.name] = customResolver(config, query);
      break;
    default:
      break;
  }
  return acc;
}, {});

export default generateQueryResolvers;
