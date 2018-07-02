import uuid from 'uuid/v1';

import * as db from './../../../dynamo/dynamo';

const generateItemValueGetters = (mutation, args) => mutation.attributes.reduce(
  (acc, attribute) => Object.assign(acc, {
    [attribute.name]: args[attribute.name]
  }), {
    id: uuid(),
    created_at: (new Date()).toLocaleDateString(),
  });

const createResolver = (mutation, config) => (_, args) => {
  const params = {
    TableName: config.tableName,
    Item: generateItemValueGetters(mutation, args),
  };

  return db.createItem(params);
};

export default createResolver;
