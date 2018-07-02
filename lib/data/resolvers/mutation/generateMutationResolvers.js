import createResolver from './createResolver';
import updateResolver from './updateResolver';
import deleteResolver from './deleteResolver';

const generateMutationResolvers = config => config.mutations.reduce((acc, mutation) => {
  switch (mutation.type) {
    case 'create':
      acc[`create${config.item}`] = createResolver(mutation, config)
      break;
    case 'update':
      acc[`update${config.item}`] = updateResolver(mutation, config)
      break;
    case 'delete':
      acc[`delete${config.item}`] = deleteResolver(config)
      break;
    default:
      break;
  }

  return acc
}, {})

export default generateMutationResolvers;
