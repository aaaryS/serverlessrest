const config = require('./config');

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

const generateResources = () => config.reduce((acc, resource) => (
  Object.assign(acc, { [`${resource.item}sDynamoDbTable`]: generateAWSDynamoDBtable(resource.tableName) })
), {});


module.exports.Resources = () => {
  // Code that generates dynamic data
  return generateResources();
}
