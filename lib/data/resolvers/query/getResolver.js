import * as db from './../../../dynamo/dynamo';

export const buildParams = ({ tableName }, { id }) => ({
  TableName: tableName,
  Key: {
    id,
  },
})

const getResolver = config => (_, args) => {
  const params = buildParams(config, args);

  return db.get(params);
};

export default getResolver;
