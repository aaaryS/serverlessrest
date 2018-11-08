import * as db from './../../../../dynamo/dynamo'

import generateMutationResolvers from './../generateMutationResolvers'

db.deleteItem = jest.fn()

jest.mock('./../createResolver', () => () => 'createResolver');
jest.mock('./../updateResolver', () => () => 'updateResolver');
jest.mock('./../deleteResolver', () => () => 'deleteResolver');

const sampleConfig = {
  tableName: 'testTable',
  item: 'Test',
  mutations: [
    { type: 'create' },
    { type: 'update' },
    { type: 'delete' },
    { type: 'WRONG' },
  ]
};

describe('#generateMutationResolvers', () => {
  it('generates correct mutationResolvers', () => {
    const mutationResolvers = generateMutationResolvers(sampleConfig)

    expect(mutationResolvers).toHaveProperty('createTest')
    expect(mutationResolvers).toHaveProperty('updateTest')
    expect(mutationResolvers).toHaveProperty('deleteTest')
  })
})
