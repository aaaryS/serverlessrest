import { makeExecutableSchema } from 'graphql-tools';
import { mergeResolvers, mergeTypes } from 'merge-graphql-schemas';

import generateType from './types/generateType';
import generateAuthTypes from './types/generateAuthTypes';
import generateResolver from './resolvers/generateResolver';
import generateAuthResolvers from './resolvers/generateAuthResolvers';

import { normalizeConfig } from './../utils/config';

const generateDefs = (_config) => {
  const authTypes = generateAuthTypes(_config);
  if (authTypes) {
    return mergeTypes([..._config.map(generateType), authTypes]);
  }

  return mergeTypes(_config.map(generateType));
};

const generateResolvers = (_config) => {
  const authResolvers = generateAuthResolvers(_config);
  if (authResolvers) {
    return mergeResolvers([..._config.map(generateResolver), authResolvers]);
  }

  return mergeResolvers(_config.map(generateResolver));
};

const generateSchema = (config) => {
  const normalizedConfig = normalizeConfig(config);

  const typeDefs = generateDefs(normalizedConfig);

  console.log(typeDefs)

  const resolvers = generateResolvers(normalizedConfig);

  return makeExecutableSchema({
    typeDefs,
    resolvers,
  });
};

export default generateSchema;
