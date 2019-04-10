import createResolver from './createResolver';
import updateResolver from './updateResolver';
import deleteResolver from './deleteResolver';

const generateMutationResolvers = config => config.mutations.reduce((acc, mutation) => {
  switch (mutation.type) {
    case 'create':
      acc[`create${config.item}`] = createResolver(config, mutation)
      break;
    case 'update':
      acc[`update${config.item}`] = updateResolver(config, mutation)
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
