export default `
  enum Type {
    SCHEDULED
    REGULAR
  }

  enum ScheduledType {
    WEEKLY
    MONTHLY
    DAILY
    MULTI_DAILY
  }

  type Task {
    id: ID!
    title: String!
    description: String
    type: Type!
    order: Int
    date: String
    scheduledType: ScheduledType
    scheduledValue: [String]
  }

  type Query {
    tasks: [Task]
    task(id: ID!): Task
  }

  type Mutation {
    createTask(
      title: String!
      type: Type!
      order: Int
      date: String
    ): Task
    updateTask(
      id: ID!
      title: String!
      type: Type!
      order: Int
      date: String
    ): Task
    deleteTask(
      id: ID!
    ): Task
  }
`;
