import { graphqlLambda } from 'apollo-server-lambda';
import { makeExecutableSchema } from 'graphql-tools';
import { mergeResolvers, mergeTypes } from 'merge-graphql-schemas';
import jwt from 'jsonwebtoken';

import generateType from './data/types/generateType';
import generateAuthTypes from './data/types/generateAuthTypes';
import generateResolver from './data/resolvers/generateResolver';
import generateAuthResolvers from './data/resolvers/generateAuthResolvers';
import { normalizeConfig } from './utils/config';

import config from './../config';

const normalizedConfig = normalizeConfig(config);

const generateDefs = _config => mergeTypes([..._config.map(generateType), generateAuthTypes(_config)]);
const generateResolvers = _config => mergeResolvers([..._config.map(generateResolver), generateAuthResolvers(_config)]);

const typeDefs = generateDefs(normalizedConfig);
const resolvers = generateResolvers(normalizedConfig);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

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
