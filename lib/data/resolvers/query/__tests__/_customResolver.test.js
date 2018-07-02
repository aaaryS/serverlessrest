import {
  buildParams
} from './../customResolver'

import * as db from './../../../dynamo/dynamo';

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

describe('#buildParams', () => {
  it('generate correct custom resolver params', () => {
    expect(buildParams(sampleConfig, sampleQuery, sampleArgs)).toEqual({
      TableName: 'testTable',
      Key: {
        param1: 'value1',
        param2: 'value2',
      },
    })
  })
})
