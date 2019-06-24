import { graphqlLambda } from 'apollo-server-lambda';
import jwt from 'jsonwebtoken';

import generateSchema from './data/generateSchema';
import { loadConfig } from './utils/config';

const config = loadConfig();

const schema = generateSchema(config);

exports.graphql = (event, context, callback) => {
  const callbackFilter = (error, output) => {
    output.headers['Access-Control-Allow-Origin'] = '*';
    callback(error, output);
  };
  const authHeader = event.headers.authorization || event.headers.Authorization;
  const token = authHeader ? authHeader.split(' ')[1] : null;
  if (token) {
    jwt.verify(token, 'SOME_REALLY_SECRET', (err, payload) => {
      if (payload) {
        graphqlLambda({ schema, context: { user: payload } })(event, context, callbackFilter);
      } else {
        graphqlLambda({ schema, context: { user: null } })(event, context, callbackFilter);
      }
    });
  } else {
    graphqlLambda({ schema, context: { user: null } })(event, context, callbackFilter);
  }
};

// exports.record = (event, context, callback) => {
//   event.Records.forEach((record) => {
//     console.log('DynamoDB Record: %j', record.dynamodb);
//   });
//   callback(null, `Successfully processed ${event.Records.length} records.`);
// };
