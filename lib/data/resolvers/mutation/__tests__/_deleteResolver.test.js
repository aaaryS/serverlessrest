import * as db from './../../../../dynamo/dynamo'

import deleteResolver, {
  buildParams
} from './../deleteResolver'

db.deleteItem = jest.fn()

const sampleConfig = {
  tableName: 'testTable',
};

const sampleArgs = {
  id: '00000000-0000-0000-0000-000000000000',
};

const desiredParams = {
  TableName: 'testTable',
  Key: {
    id: '00000000-0000-0000-0000-000000000000',
  },
}

describe('#buildParams', () => {
  it('generates correct delete resolver params', () => {
    expect(buildParams(sampleConfig, sampleArgs)).toEqual(desiredParams)
  })
})

describe('#deleteResolver', () => {
  it('is calling dynamodb with valid params and args', () => {
    deleteResolver(sampleConfig)({}, sampleArgs)
    expect(db.deleteItem).toBeCalledWith(desiredParams, sampleArgs);
  })
})
