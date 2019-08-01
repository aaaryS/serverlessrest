import * as db from './../../../dynamo/dynamo';
import withAuth from './../withAuth';

export const buildParams = ({ tableName }, { id }) => ({
  TableName: tableName,
  Key: {
    id,
  },
});

const deleteResolver = config => (_, args) => {
  const params = buildParams(config, args);

  return db.deleteItem(params, args);
};

export default withAuth(deleteResolver);
