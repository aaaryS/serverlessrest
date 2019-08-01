// TO-DO move to helper
import { configWithAuth } from './../../utils/helpers'

const authType = `
  scalar Object

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
    me: Object
  }
`

const generateAuthTypes = config => (configWithAuth(config) ? authType : null)

export default generateAuthTypes;
