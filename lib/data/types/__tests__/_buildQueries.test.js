import buildQueries, {
  buildQueryReturn,
} from './../buildQueries'

const sampleItem = 'Test'

const sampleAttributes = [
  { name: 'param1', type: 'someType' },
  { name: 'param2', type: 'someRequiredType', required: true },
]

const sampleQueries = [
  { type: 'get' },
  { type: 'index' },
  { type: 'custom', name: 'customQuery', attributes: sampleAttributes },
  { type: 'custom', name: 'customCollectionQuery', returnType: 'collection', attributes: sampleAttributes },
  { type: 'WRONG' },
]

const desiredGetQuery = 'tests: [Test]'
const desiredIndexQuery = 'test(id: ID!): Test'
const desiredCustomQuery = 'customQuery(param1: someType param2: someRequiredType!): Test'
const desiredCustomCollectionQuery = 'customCollectionQuery(param1: someType param2: someRequiredType!): [Test]'

describe('#buildQueryReturn', () => {
  it('builds valid query for collection', () => {
    expect(buildQueryReturn(sampleItem, 'collection')).toEqual(`[${sampleItem}]`);
  })
  
  it('builds valid query for single item', () => {
    expect(buildQueryReturn(sampleItem, '')).toEqual(sampleItem);
  })
})

describe('#buildQueries', () => {
  it('builds valid query', () => {
    const buildedQuery = buildQueries(sampleQueries, sampleItem)
    expect(buildedQuery).toContain(desiredGetQuery);
    expect(buildedQuery).toContain(desiredIndexQuery);
    expect(buildedQuery).toContain(desiredCustomQuery);
    expect(buildedQuery).toContain(desiredCustomCollectionQuery);
  })
})
