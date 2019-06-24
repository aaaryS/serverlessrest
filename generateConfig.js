const configUtils = require('./lib/utils/config');

const config = configUtils.loadConfig();

const generateAWSDynamoDBtable = tableName => ({
  "Type": "AWS::DynamoDB::Table",
  "DeletionPolicy": "Retain",
  "Properties": {
    "TableName": tableName,
    "AttributeDefinitions": [{
      "AttributeName": "id",
      "AttributeType": "S"
    }],
    "KeySchema": [{
      "AttributeName": "id",
      "KeyType": "HASH"
    }],
    "ProvisionedThroughput": {
      "ReadCapacityUnits": 1,
      "WriteCapacityUnits": 1
    },
    "StreamSpecification": {
      "StreamViewType": "NEW_AND_OLD_IMAGES"
    }
  }
});

const withAuthConfig = configUtils.hasAuth(config) ? [...config, {
  tableName: 'users',
  item: 'User',
}] : config

const generateResources = () => withAuthConfig.filter(resource => resource.tableName).reduce((acc, resource) => (
  Object.assign(acc, { [`${resource.item}sDynamoDbTable`]: generateAWSDynamoDBtable(resource.tableName) })
), {});

module.exports.Resources = () => {
  // Code that generates dynamic data
  return generateResources();
}
