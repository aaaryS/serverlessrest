import * as db from './../../../../dynamo/dynamo'

import generateQueryResolvers from './../generateQueryResolvers'

db.deleteItem = jest.fn()

jest.mock('./../indexResolver', () => () => 'indexResolver');
jest.mock('./../getResolver', () => () => 'getResolver');
jest.mock('./../customResolver', () => () => 'customResolver');

const sampleConfig = {
  tableName: 'testTable',
  item: 'Test',
  queries: [
    { type: 'get' },
    { type: 'index' },
    { type: 'custom', name: 'customName' },
    { type: 'custom', name: 'customNameNo2' },
    { type: 'WRONG' },
  ]
};

describe('#generateQueryResolvers', () => {
  it('generates correct queryResolvers', () => {
    const mutationResolvers = generateQueryResolvers(sampleConfig)

    expect(mutationResolvers).toHaveProperty('test')
    expect(mutationResolvers).toHaveProperty('tests')
    expect(mutationResolvers).toHaveProperty('customName')
    expect(mutationResolvers).toHaveProperty('customNameNo2')
  })
})
