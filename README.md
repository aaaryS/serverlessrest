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
```


## Running the tests

```
  yarn test
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
