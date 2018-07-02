import {
  buildParams
} from './../getResolver'

import * as db from './../../../dynamo/dynamo';

const sampleConfig = {
  tableName: 'testTable',
};

const sampleArgs = {
  id: 1,
};

describe('#buildParams', () => {
  it('generate correct get resolver params', () => {
    // db.scan = jest.fn()
    expect(buildParams(sampleConfig, sampleArgs)).toEqual({
      // expect(buildParams(config)).toHaveBeenCalledWith({
      TableName: 'testTable',
      Key: {
        id: 1
      },
    })
  })
})
