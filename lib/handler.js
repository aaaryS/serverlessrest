import { graphqlLambda } from 'apollo-server-lambda';
import { makeExecutableSchema } from 'graphql-tools';
import { mergeResolvers, mergeTypes } from 'merge-graphql-schemas';

import generateType from './data/types/generateType';
import generateResolver from './data/resolvers/generateResolver';
import { normalizeConfig } from './utils/config';

import config from './../config';

const normalizedConfig = normalizeConfig(config);

const generateDefs = _config => mergeTypes(_config.map(generateType));
const generateResolvers = _config => mergeResolvers(_config.map(generateResolver));

const typeDefs = generateDefs(normalizedConfig);
const resolvers = generateResolvers(normalizedConfig);

console.log(typeDefs)

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

exports.graphql = function (event, context, callback) {
  const callbackFilter = function (error, output) {
    output.headers['Access-Control-Allow-Origin'] = '*';
    callback(error, output);
  };
  graphqlLambda({ schema })(event, context, callbackFilter);
};

// exports.record = (event, context, callback) => {
//   event.Records.forEach((record) => {
//     console.log('DynamoDB Record: %j', record.dynamodb);
//   });
//   callback(null, `Successfully processed ${event.Records.length} records.`);
// };
