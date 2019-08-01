import generateQueryResolvers from './query/generateQueryResolvers';
import generateMutationResolvers from './mutation/generateMutationResolvers';

const generateResolver = (config) => {
  const Query = generateQueryResolvers(config);
  const Mutation = generateMutationResolvers(config);
  return ({ Query, Mutation });
};

export default generateResolver;
