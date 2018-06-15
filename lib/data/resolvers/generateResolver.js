import uuid from 'uuid/v1';
import * as db from './../../dynamo/dynamo';
import { lowerFirstLetter } from './../../utils/helpers';

const generateIndexResolver = (query, config) => () => {
  const params = {
    TableName: config.tableName,
    AttributesToGet: config.attributes.map(attr => attr.name).concat(['id']),
  };

  return db.scan(params);
};

const generateGetResolver = (config) => (_, args) => {
  const params = {
    TableName: config.tableName,
    Key: {
      id: args.id,
    },
  };

  return db.get(params);
};

const generateCustomResolverKeys = (attributes, args) => attributes.reduce(
  (acc, attribute) => Object.assign(acc, { [attribute.name]: args[attribute.name] })
  , {});

const generateCustomResolver = (query, config) => (_, args) => {
  const params = {
    TableName: config.tableName,
    Key: generateCustomResolverKeys(query.attributes, args),
  };

  return db.scan(params);
}

const generateQueryResolvers = config => config.queries.reduce((acc, query) => {
  const item = lowerFirstLetter(config.item)
  switch (query.type) {
    case 'get':
      acc[item] = generateGetResolver(config)
      break;
    case 'index':
      acc[`${item}s`] = generateIndexResolver(query, config)
      break;
    case 'custom':
      acc[query.name] = generateCustomResolver(query, config)
      break;
    default:
      break;
  }  
  return acc;
}, {})

const generateItemValueGetters = (mutation, args) => mutation.attributes.reduce(
  (acc, attribute) => Object.assign(acc, { [attribute.name]: args[attribute.name] })
  , {
    id: uuid(),
    created_at: (new Date()).toLocaleDateString(),
  });

const generateCreateResolver = (mutation, config) => (_, args) => {
  const params = {
    TableName: config.tableName,
    Item: generateItemValueGetters(mutation, args),
  };

  return db.createItem(params);
};

const generateExpressionAttributeValues = (mutation, args) => mutation.attributes.reduce(
  (acc, attribute) => Object.assign(acc, { [`:${attribute.name}`]: args[attribute.name] })
  , {});

const generateUpdateExpression = mutation => `SET ${mutation.attributes.map(m => `:${m.name} => ${m.name}`).join(', ')}`

const generateUpdateResolver = (mutation, config) => (_, args) => {
  const params = {
    TableName: config.tableName,
    Key: {
      id: args.id,
    },
    ExpressionAttributeValues: generateExpressionAttributeValues(mutation, args),
    UpdateExpression: generateUpdateExpression(mutation),
    ReturnValues: 'ALL_NEW',
  };

  return db.updateItem(params, args);
};

const generateDeleteResolver = (config) => (_, args) => {
  const params = {
    TableName: config.tableName,
    Key: {
      id: args.id,
    },
  };

  return db.deleteItem(params, args);
};

const generateMutationResolvers = config => config.mutations.reduce((acc, mutation) => {
  switch (mutation.type) {
    case 'create':
      acc[`create${config.item}`] = generateCreateResolver(mutation, config)
      break;
    case 'update':
      acc[`update${config.item}`] = generateUpdateResolver(mutation, config)
      break;
    case 'delete':
      acc[`delete${config.item}`] = generateDeleteResolver(config)
      break;
    default:
      break;
  } 

  return acc
}, {})

const generateResolver = config => {
  const Query = generateQueryResolvers(config)
  const Mutation = generateMutationResolvers(config)
  return ({ Query, Mutation });
}

export default generateResolver;
