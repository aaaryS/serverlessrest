# Serverlessrest
Serverless implementation of "REST" using DynamoDB and GraphQL. Easy to setup - create one config file, deploy and ready to use.

## Getting Started

### Prerequisites
* [Download node](https://nodejs.org/en/)
* [Install npm](https://www.npmjs.com/get-npm)
* [Setup Serverless:](https://serverless.com/framework/docs/getting-started/)
* [Setup yarn](https://yarnpkg.com/lang/en/docs/install)

### Installing
```
yarn install
sls dynamodb install
```


## Running the tests

```
  yarn test
```
or for e2e tests:
```
  yarn test:e2e
```

## Configuration
### Basic
To create simple CRUD (create, read, update and delete) for any resource you have to add config object similar to:
```
{
  tableName: 'objects',
  item: 'Object',
  attributes: [
    { name: 'text_attr_1', type: 'String', required: true },
    { name: 'num_attr_2', type: 'Int' },
    { name: 'text_arr_attr_3', type: '[String]' },
  ],
  queries: [
    { type: 'get' },
    { type: 'index' },
  ],
  mutations: [
    {
      type: 'create',
      attributes: [
        { name: 'text_attr_1', type: 'String!' },
        { name: 'text_arr_attr_3', type: '[String]' },
      ],
    },
    {
      type: 'update',
      attributes: [
        { name: 'text_attr_1', type: 'String!' },
      ],
    },
    {
      type: 'delete',
    },
  ],
}
```

It will generate GraphQL server for resource `Object` that has such attributes:
* Required `text_attr_1` that has to be String
* `num_attr_2` that has to be Integer
* `text_arr_attr_3` that is an array of String values
autogenerated:
* ID

also it will create GraphQL queries and mutations that should work like CRUD:
* get
* index (by ID )
* create (you have to pass `text_attr_1` and `text_arr_attr_3` - as specified in config)
* update (you have to pass `text_attr_1` - as specified in config)
* delete (by ID)

GraphQL schema that is generated from this configuration:
```
schema {
  query: Query
  mutation: Mutation
}

type Query {
  objects: [Object]
  object(id: ID!): Object
}

type Mutation {
  createObject(text_attr_1: String!, text_arr_attr_3: String!): Object
  updateObject(id: ID!, text_attr_1: String!): Object
  deleteObject(id: ID!): Object
}

type Object {
  id: ID!
  title: text_attr_1!
  num_attr_2: Int
  text_arr_attr_3: [String]
}
```

All resolvers are also auto generated.

### Enum
You can create `ENUM` type, add such object to config file:
```
{
  type: 'enum',
  name: 'ObjectType',
  values: ['SIMPLE', 'COMPLEX', 'EMPTY'],
}
```

then you can use it as attribute on object config:
```
{
  tableName: 'objects',
  item: 'Object',
  attributes: [
    ...
    { name: 'object_type', type: 'ObjectType' },
    ...
  ],
  ...
```

### Custom resolver
Not only you can resource by ID but also by custom value, for example by name. You have to create custom query, to do so, add something similar to queries in config file:
```
queries: [
    ...
    {
      type: 'custom',
      name: 'objectByName',
      attributes: [
        {
          name: 'name',
          type: 'String',
          required: true,
        },
      ],
      returnType: 'collection',
    },
  ],
```

It should return all object with name passed as argument.

### Auth
You can set authorization for every object in config, by default it is not set. If you want to add it you have to add `auth: true,` value to object config:

```
{
  tableName: 'objects',
  item: 'Object',
  auth: true,
  ...
```

it will add authorization to this resource, you can learn more about it in `Examples` [section](#AUTH).

## GraphQL Examples
All examples should work with Complex Config -> `examples/complex/complex.config.js`, to run it:
```
yarn run sls:offline --printOutput  -- --config='examples/complex/complex.config.js'
```
### CREATE
```
mutation {
  createEpic (description: "Some epic", sprint: "10", due_date: "20.02.2020") {
    id, description, sprint, due_date
  }
}
```

### READ
#### INDEX - get all records
```
query {
  epics {
    id, description, created_at, due_date
  }
}
```
#### GET - get single record by ID
```
query {
  epic (id: "__SPECIFY_ID_HERE__") {
    id, description, created_at, due_date
  }
}
```

#### CUSTOM - get single record by attribute
```
query {
  epicsBySprint (sprint: "10") {
    id, description, created_at, due_date
  }
}
```

### UPDATE
```
mutation {
  updateEpic (id: "__SPECIFY_ID_HERE__", description: "Some epic v2") {
    id, description
  }
}
```

### DELETE
```
mutation {
  deleteEpic (id: "22f2d3f0-b765-11e9-b389-e358651b1ef5") {
    id
  }
}
```

### AUTH
If resource is marked as authorized, then you have to login before you can perform any action on it, Otherwise you will get error:
```
You are not authenticated!
```

To create account you have to perform signup mutation:
```
mutation {
  signup(username: "uname", password: "password", email: "some@mail.com")
}
```
as response you will get `jsonwebtoken` that you can use to authorize all your future requests.

You can also login:
```
mutation {
  login (password: "password", email: "some@mail.com")
}
```

To authorize request, you have to add HTTP Header to request:
```
Authorization	Bearer __JSONWEBTOKEN__
```

## Deployment
### Local
```
yarn run sls:offline
```

You can visit http://localhost:8000/shell for `Dynamodb Local Shell`.
Serverless:Offline is listening on http://localhost:3000.

### AWS

[Setup an AWS Account for use with Serverless](https://github.com/serverless/enterprise/blob/master/docs/setup-aws-account.md)

You can create custom profile `serverlessrest`:

```
  serverless config credentials --provider aws --key ___AWS_KEY___ --secret ___AWS_SECRET_KEY___ --profile serverlessrest
```

To deploy you can run:

```
  serverless deploy --aws-profile serverlessrest

```

## Built With

* [Serverless](https://serverless.com/) - The easy, open way to build serverless applications
* [GraphQL](https://graphql.org/learn/) - A query language for your API
* [AWS](https://aws.amazon.com/) - Cloud Computing Services

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
