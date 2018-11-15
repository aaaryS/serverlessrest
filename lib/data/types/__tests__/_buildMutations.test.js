import buildMutations, {
  buildCreateMutation,
  buildUpdateMutation,
  buildDeleteMutation,
} from './../buildMutations'

const sampleItem = 'Test'
const sampleAttributes = [
  { name: 'param1', type: 'someType' },
  { name: 'param2', type: 'someRequiredType', required: true },
]

const desiredCreateMutation = `
    createTest(
      param1: someType
      param2: someRequiredType!
    ): Test
`

const desiredUpdateMutation = `
    updateTest(
      id: ID!
      param1: someType
      param2: someRequiredType!
    ): Test
`

const desiredDeleteMutation = `
    deleteTest(
      id: ID!
    ): Test
`

const desiredMutation = [desiredCreateMutation, desiredUpdateMutation, desiredDeleteMutation].join('')

const sampleMutations = [
  { type: 'create', attributes: sampleAttributes },
  { type: 'update', attributes: sampleAttributes },
  { type: 'delete' },
  { type: 'WRONG' },
]

describe('#buildCreateMutation', () => {
  it('is building valid mutation', () => {
    expect(buildCreateMutation(sampleItem, sampleAttributes)).toEqual(desiredCreateMutation);
  })
})


describe('#buildUpdateMutation', () => {
  it('is building valid mutation', () => {
    expect(buildUpdateMutation(sampleItem, sampleAttributes)).toEqual(desiredUpdateMutation);
  })
})

describe('#buildDeleteMutation', () => {
  it('is building valid mutation', () => {
    expect(buildDeleteMutation(sampleItem)).toEqual(desiredDeleteMutation);
  })
})

describe('#buildMutations', () => {
  it('builds mutations correctly', () => {
    expect(buildMutations(sampleMutations, sampleItem)).toEqual(desiredMutation)
  })
})
