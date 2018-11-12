import * as db from './../../../../dynamo/dynamo'

import generateCustomResolver, {
  buildParams
} from './../customResolver'

db.scan = jest.fn()

const sampleConfig = {
  tableName: 'testTable',
};

const sampleArgs = {
  param1: 'value1',
  param2: 'value2',
};

const sampleQuery = {
  attributes: [
    { name: 'param1' },
    { name: 'param2' },
  ]
}

const desiredParams = {
  TableName: 'testTable',
  Key: {
    param1: 'value1',
    param2: 'value2',
  },
}

describe('#buildParams', () => {
  it('generate correct custom resolver params', () => {
    expect(buildParams(sampleConfig, sampleQuery, sampleArgs)).toEqual(desiredParams)
  })
})

describe('#generateCustomResolver', () => {
  it('is calling dynamodb with valid params and args', () => {
    generateCustomResolver(sampleQuery, sampleConfig)({}, sampleArgs)
    expect(db.scan).toBeCalledWith(desiredParams);
  })
})
