import * as db from './../../../dynamo/dynamo';

const deleteResolver = (config) => (_, args) => {
  const params = {
    TableName: config.tableName,
    Key: {
      id: args.id,
    },
  };

  return db.deleteItem(params, args);
};

export default deleteResolver;
