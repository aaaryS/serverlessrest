import * as db from './../../../dynamo/dynamo';
import withAuth from './../withAuth';

export const buildParams = ({ tableName }, { id }) => ({
  TableName: tableName,
  Key: {
    id,
  },
});

const getResolver = config => (_, args) => {
  const params = buildParams(config, args);

  return db.get(params);
};

export default withAuth(getResolver);
