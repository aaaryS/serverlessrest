import * as db from './../../../dynamo/dynamo';

const generateExpressionAttributeValues = (mutationAttrs, args) => mutationAttrs.reduce(
  (acc, attribute) => Object.assign(acc, {
    [`:${attribute.name}`]: args[attribute.name],
  }), {});

const generateUpdateExpression = mutationAttrs => `SET ${mutationAttrs.map(m => `${m.name} = :${m.name}`).join(', ')}`

export const filterMutationAttributes = (mutationAttrs, args) => mutationAttrs.filter(attr => attr.required || args[attr.name]);

export const buildParams = ({ tableName }, filteredMutationAttributes, args) => ({
  TableName: tableName,
  Key: {
    id: args.id,
  },
  ExpressionAttributeValues: generateExpressionAttributeValues(filteredMutationAttributes, args),
  UpdateExpression: generateUpdateExpression(filteredMutationAttributes),
  ReturnValues: 'ALL_NEW',
})

const updateResolver = (mutation, config) => (_, args) => {
  const filteredMutationAttributes = filterMutationAttributes(mutation.attributes, args)
  const params = buildParams(config, filteredMutationAttributes, args)
  return db.updateItem(params, args);
};

export default updateResolver;
