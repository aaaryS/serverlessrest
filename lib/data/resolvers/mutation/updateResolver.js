import * as db from './../../../dynamo/dynamo';

const generateExpressionAttributeValues = (mutationAttrs, args) => mutationAttrs.reduce(
  (acc, attribute) => Object.assign(acc, {
    [`:${attribute.name}`]: args[attribute.name],
  }), {});

const generateUpdateExpression = mutationAttrs => `SET ${mutationAttrs.map(m => `${m.name} = :${m.name}`).join(', ')}`

const updateResolver = (mutation, config) => (_, args) => {
  const filteredMutationAttributes = mutation.attributes.filter(attr => attr.required || args[attr.name]);
  const params = {
    TableName: config.tableName,
    Key: {
      id: args.id,
    },
    ExpressionAttributeValues: generateExpressionAttributeValues(filteredMutationAttributes, args),
    UpdateExpression: generateUpdateExpression(filteredMutationAttributes),
    ReturnValues: 'ALL_NEW',
  };

  return db.updateItem(params, args);
};

export default updateResolver;
