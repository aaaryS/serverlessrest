import { buildAttributes } from './../../utils/build';

export const buildCreateMutation = (item, attributes) => `
    create${item}(
      ${buildAttributes(attributes, 6)}
    ): ${item}
`;

export const buildUpdateMutation = (item, attributes) => `
    update${item}(
      id: ID!
      ${buildAttributes(attributes, 6)}
    ): ${item}
`;

export const buildDeleteMutation = item => `
    delete${item}(
      id: ID!
    ): ${item}
`;

const buildMutations = (mutations, item) => mutations.map((mutation) => {
  switch (mutation.type) {
    case 'create':
      return buildCreateMutation(item, mutation.attributes);
    case 'update':
      return buildUpdateMutation(item, mutation.attributes);
    case 'delete':
      return buildDeleteMutation(item);
    default:
      return '';
  }
}).join('');

export default buildMutations;
