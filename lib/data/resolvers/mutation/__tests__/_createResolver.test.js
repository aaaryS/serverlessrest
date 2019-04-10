import * as db from './../../../../dynamo/dynamo'

import createResolver, {
  buildParams
} from './../createResolver'

db.createItem = jest.fn()

jest.mock('uuid/v1', () => () => '00000000-0000-0000-0000-000000000000');

const sampleConfig = {
  tableName: 'testTable',
};

const sampleArgs = {
  param1: 'value1',
  param2: 'value2',
};

const mutation = {
  attributes: [
    { name: 'param1' },
    { name: 'param2' },
  ]
}


const desiredParams = {
  TableName: 'testTable',
  Item: {
    created_at: (new Date()).toLocaleDateString(),
    id: '00000000-0000-0000-0000-000000000000',
    param1: 'value1',
    param2: 'value2',
  },
}

describe('#buildParams', () => {
  it('generates correct create resolver params', () => {
    expect(buildParams(sampleConfig, mutation, sampleArgs)).toEqual(desiredParams)
  })
})

describe('#createResolver', () => {
  it('is calling dynamodb with valid params and args', () => {
    createResolver(sampleConfig, mutation)({}, sampleArgs)
    expect(db.createItem).toBeCalledWith(desiredParams);
  })
})
