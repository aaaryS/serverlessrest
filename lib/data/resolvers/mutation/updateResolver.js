import * as db from './../../../dynamo/dynamo';

const generateExpressionAttributeValues = (mutation, args) => mutation.attributes.reduce(
  (acc, attribute) => Object.assign(acc, {
    [`:${attribute.name}`]: args[attribute.name]
  }), {});

const generateUpdateExpression = mutation => `SET ${mutation.attributes.map(m => `${m.name} = :${m.name}`).join(', ')}`

const updateResolver = (mutation, config) => (_, args) => {
  console.log(generateExpressionAttributeValues(mutation, args))
  console.log(generateUpdateExpression(mutation))
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

export default updateResolver;
