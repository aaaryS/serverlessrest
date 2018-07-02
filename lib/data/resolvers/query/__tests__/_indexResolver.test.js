import {
  buildParams
} from './../indexResolver'

import * as db from './../../../dynamo/dynamo';

const sampleConfig = {
  tableName: 'testTable',
  attributes: [
    { name: 'param1' },
    { name: 'param2' }
  ]
};

describe('#buildParams', () => {
  it('generate correct index resolver params', () => {
    // db.scan = jest.fn()
    expect(buildParams(sampleConfig)).toEqual({
    // expect(buildParams(config)).toHaveBeenCalledWith({
      TableName: 'testTable',
      AttributesToGet: [
        'param1',
        'param2',
        'id',
      ]
    })
  })
})
