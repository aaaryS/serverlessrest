import { buildAttributes } from './../build';

const attributes = [
  { name: 'title', type: 'String', required: true },
  { name: 'description', type: 'String'}
];

describe('#buildAttributes', () => {
  test('with default values', () => {
    expect(buildAttributes(attributes)).toEqual('title: String!\ndescription: String');
  });

  test('with spaces equals 6', () => {
    expect(buildAttributes(attributes, 6)).toEqual('title: String!\n      description: String');
  });

  test('without new lines', () => {
    expect(buildAttributes(attributes, 3, false)).toEqual('title: String!   description: String');
  });
});
