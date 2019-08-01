import AWS from 'aws-sdk'; // eslint-disable-line import/no-extraneous-dependencies
import slsLocalDynamoDB from 'serverless-dynamodb-client';

// TO-DO extract to dynamodb config
// change port for tests + pass inMemory flag
const isLocalConfig = (process.env.NODE_ENV === "test") || process.env.IS_OFFLINE
const dynamoDBConfig = isLocalConfig ? {
  region: 'us-east-1',
  endpoint: 'http://localhost:8000',
} : {};

const dynamoDb = process.env.NODE_ENV === "test" ? slsLocalDynamoDB.doc : new AWS.DynamoDB.DocumentClient(dynamoDBConfig);

export function scan(params) {
  return new Promise((resolve, reject) =>
    dynamoDb.scan(params).promise()
      .then(data => resolve(data.Items))
      .catch(err => reject(err)),
  );
}

export function get(params) {
  return new Promise((resolve, reject) =>
    dynamoDb.get(params).promise()
      .then(data => resolve(data.Item))
      .catch(err => reject(err)),
  );
}

export function createItem(params) {
  return new Promise((resolve, reject) =>
    dynamoDb.put(params).promise()
      .then(() => resolve(params.Item))
      .catch(err => reject(err)),
  );
}

export function updateItem(params, args) {
  return new Promise((resolve, reject) =>
    dynamoDb.update(params).promise()
      .then(() => resolve(args))
      .catch(err => reject(err)),
  );
}

export function deleteItem(params, args) {
  return new Promise((resolve, reject) =>
    dynamoDb.delete(params).promise()
      .then(() => resolve(args))
      .catch(err => reject(err)),
  );
}
