import * as db from './../../../../dynamo/dynamo'

import updateResolver, {
  buildParams,
  filterMutationAttributes,
} from './../updateResolver'

db.updateItem = jest.fn()

const sampleConfig = {
  tableName: 'testTable',
};

const sampleArgs = {
  id: '00000000-0000-0000-0000-000000000000',
  param1: 'newParam1',
  param2: 'newParam2',
};

const mutation = {
  attributes: [
    { name: 'param1' },
    { name: 'param2' },
  ]
}

const desiredParams = {
  TableName: 'testTable',
  ReturnValues: 'ALL_NEW',
  UpdateExpression: 'SET param1 = :param1, param2 = :param2',
  ExpressionAttributeValues: {
    ':param1': 'newParam1',
    ':param2': 'newParam2',
  },
  Key: {
    id: '00000000-0000-0000-0000-000000000000',
  },
}

describe('#filterMutationAttributes', () => {
  it('generates correct update resolver params', () => {
    expect(buildParams(sampleConfig, mutation.attributes, sampleArgs)).toEqual(desiredParams)
  })
})

describe('#filterMutationAttributes', () => {
  it('is filtering out attributes without value and not required', () => {
    const attributes = [
      { name: 'param1' },
      { name: 'paramToBeRemoved' },
    ]
    expect(filterMutationAttributes(attributes, sampleArgs)).toEqual([{ name: 'param1' }])
  })

  it('is not filtering out required attributes', () => {
    const attributes = [
      { name: 'param1' },
      { name: 'paramThatIsRequired', required: true },
    ]
    expect(filterMutationAttributes(attributes, sampleArgs)).toEqual(attributes)
  })
})

describe('#updateResolver', () => {
  it('is calling dynamodb with valid params and args', () => {
    updateResolver(mutation, sampleConfig)({}, sampleArgs)
    expect(db.updateItem).toBeCalledWith(desiredParams, sampleArgs);
  })
})
