import * as db from './../../../dynamo/dynamo';
import withAuth from './../withAuth';

export const buildParams = config => ({
  TableName: config.tableName,
  AttributesToGet: config.attributes.map(attr => attr.name).concat(['id']),
});

const indexResolver = config => () => {
  const params = buildParams(config);
  return db.scan(params);
};

export default withAuth(indexResolver);
