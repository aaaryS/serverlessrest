import * as db from './../../../../dynamo/dynamo';

import getResolver, {
  buildParams,
} from './../getResolver';

db.get = jest.fn();

const sampleConfig = {
  tableName: 'testTable',
};

const sampleArgs = {
  id: 1,
};

const desiredParams = {
  TableName: 'testTable',
  Key: {
    id: 1,
  },
};


describe('#buildParams', () => {
  it('generate correct get resolver params', () => {
    expect(buildParams(sampleConfig, sampleArgs)).toEqual(desiredParams);
  });
});

describe('#getResolver', () => {
  it('is calling dynamodb with valid params and args', () => {
    getResolver(sampleConfig)({}, sampleArgs);
    expect(db.get).toBeCalledWith(desiredParams);
  });
});
