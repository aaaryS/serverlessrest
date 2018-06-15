import { lowerFirstLetter } from './../../utils/helpers';

const buildAttributes = (attributes, joinBy = '\n') => attributes.map(attr => (
  `${attr.name}: ${attr.type}${attr.required ? '!' : ''}`
)).join(joinBy);

const buildQueryReturn = (item, type) => type === 'collection' ? `[${item}]` : item;

const buildQueries = (queries, item, joinBy = '\n') => queries.map((query) => {
  const itemLowerCase = lowerFirstLetter(item)
  switch (query.type){
    case 'get':
      return `${itemLowerCase}s: [${item}]`
    case 'index':
      return `${itemLowerCase}(id: ID!): ${item}`
    case 'custom':
      return `${query.name}(${buildAttributes(query.attributes, ', ')}): ${buildQueryReturn(item, query.returnType)}`
    default:
      return ''
  }
}).join(joinBy);

const buildCreateMutation = (item, attributes) => `
    create${item}(
      ${buildAttributes(attributes, '\n      ')}
    ): ${item}
`

const buildUpdateMutation = (item, attributes) => `
    update${item}(
      id: ID!
      ${buildAttributes(attributes, '\n      ')}
    ): ${item}
`

const buildDeleteMutation = (item) => `
    delete${item}(
      id: ID!
    ): ${item}
`

const buildMutations = (mutations, item) => mutations.map((mutation) => {
  switch (mutation.type) {
    case 'create':
      return buildCreateMutation(item, mutation.attributes)
    case 'update':
      return buildUpdateMutation(item, mutation.attributes)
    case 'delete':
      return buildDeleteMutation(item)
    default:
      return ''
  }
}).join('')

const boilerplate = config => `
  type ${config.item} {
    id: ID!
    ${buildAttributes(config.attributes, '\n    ')}
  }

  type Query {
    ${buildQueries(config.queries, config.item, '\n    ')}
  }

  type Mutation {
    ${buildMutations(config.mutations, config.item, '\n    ')}
  }
`

const generateDef = item => {
  return boilerplate(item);
}

export default generateDef;
