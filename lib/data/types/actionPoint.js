export default `
  type ActionPoint {
    id: ID!
    description: String!
    state: String!
    created_at: String
    archived_at: String
    due_date: String
    sprint: String
    team: String!
    actions_taken: String
    owners: [String]
  }

  type Query {
    actionPoints: [ActionPoint]
    actionPointsByTeam(team: String!): [ActionPoint]
  }

  type Mutation {
    createActionPoint(
      description: String!
      state: String!
      created_at: String
      archived_at: String
      due_date: String
      sprint: String
      team: String!
      actions_taken: String
      owners: [String]
    ): ActionPoint
    updateActionPoint(
      id: ID!
      state: String
      actions_taken: String
      archived_at: String
    ): ActionPoint
    deleteActionPoint(
      id: ID!
    ): ActionPoint
  }
`;
