// TO-DO move to helper
const shouldGenerateAuthResolver = config => config.filter(table => table.auth).length > 0

const authType = `
  type User {
    id: Int!
    username: String!
    email: String!
    password: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    signup (username: String!, email: String!, password: String!): String
    login (email: String!, password: String!): String
  }
`

const generateAuthTypes = config => (shouldGenerateAuthResolver(config) ? authType : '')

export default generateAuthTypes;
