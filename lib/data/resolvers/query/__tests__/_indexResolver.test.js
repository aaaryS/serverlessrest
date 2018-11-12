import * as db from './../../../../dynamo/dynamo';

import indexResolver, {
  buildParams
} from './../indexResolver'

db.scan = jest.fn()

const sampleConfig = {
  tableName: 'testTable',
  attributes: [
    { name: 'param1' },
    { name: 'param2' }
  ]
};

const desiredParams = {
  TableName: 'testTable',
  AttributesToGet: [
    'param1',
    'param2',
    'id',
  ]
}

describe('#buildParams', () => {
  it('generate correct index resolver params', () => {
    expect(buildParams(sampleConfig)).toEqual(desiredParams)
  })
})

describe('#indexResolver', () => {
  it('is calling dynamodb with valid params and args', () => {
    indexResolver(sampleConfig)()
    expect(db.scan).toBeCalledWith(desiredParams);
  })
})
