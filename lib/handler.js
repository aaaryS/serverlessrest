import { graphqlLambda } from 'apollo-server-lambda';
import { makeExecutableSchema } from 'graphql-tools';
import { mergeResolvers, mergeTypes } from 'merge-graphql-schemas';

import generateType from './data/types/generateType';
import generateResolver from './data/resolvers/generateResolver';

import config from './../config';

const generateDefs = _config => mergeTypes(_config.map(generateType));
const generateResolvers = _config => mergeResolvers(_config.map(generateResolver));

const typeDefs = generateDefs(config);
const resolvers = generateResolvers(config);

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

exports.record = (event, context, callback) => {
  event.Records.forEach((record) => {
    console.log(record.eventID);
    console.log(record.eventName);
    console.log('DynamoDB Record: %j', record.dynamodb);
  });
  callback(null, `Successfully processed ${event.Records.length} records.`);
};
