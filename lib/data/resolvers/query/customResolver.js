import * as db from './../../../dynamo/dynamo';
import withAuth from './../withAuth';

const generateCustomResolverKeys = (attributes, args) => attributes.reduce(
  (acc, attribute) => Object.assign(acc, {
    [attribute.name]: args[attribute.name]
  }), {});

export const buildParams = ({ tableName }, { attributes }, args) => ({
  TableName: tableName,
  Key: generateCustomResolverKeys(attributes, args),
})

const generateCustomResolver = (config, query) => (_, args) => {
  const params = buildParams(config, query, args);

  return db.scan(params);
}

export default withAuth(generateCustomResolver);
