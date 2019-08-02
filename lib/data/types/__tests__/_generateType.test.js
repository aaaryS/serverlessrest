import generateType, {
  buildObject,
  buildEnum,
} from './../generateType';

jest.mock('./../buildQueries', () => () => 'buildQueries');
jest.mock('./../buildMutations', () => () => 'buildMutations');

const sampleEnumConfig = {
  name: 'TestEnum',
  type: 'enum',
  values: ['val1', 'val2'],
};

const sampleObjectConfig = {
  item: 'TestObject',
  type: 'object',
  queries: {
    type: 'get',
  },
  mutations: {
    type: 'create',
  },
  attributes: [
    { name: 'param1', type: 'someType' },
  ],
};

const desiredObjectType = `
  type TestObject {
    id: ID!
    param1: someType
  }

  type Query {
    buildQueries
  }

  type Mutation {
    buildMutations
  }
`;

const desiredEnumType = `
  enum TestEnum {
    val1
    val2
  }
`;

describe('#buildObject', () => {
  it('is building valid graphql object', () => {
    expect(buildObject(sampleObjectConfig)).toEqual(desiredObjectType);
  });
});

describe('#buildEnum', () => {
  it('is building valid graphql enum', () => {
    expect(buildEnum(sampleEnumConfig)).toEqual(desiredEnumType);
  });
});

describe('#generateType', () => {
  test('is selecting object type', () => {
    expect(generateType(sampleObjectConfig)).toEqual(desiredObjectType);
  });

  test('is selecting enum type', () => {
    expect(generateType(sampleEnumConfig)).toEqual(desiredEnumType);
  });
});
