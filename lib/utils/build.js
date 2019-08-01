import { delimiter } from './helpers';

// eslint-disable-next-line import/prefer-default-export
export const buildAttributes = (attributes, spaces = 0, withNewLines = true) => (
  attributes.map(attr => (
    `${attr.name}: ${attr.type}${attr.required ? '!' : ''}`
  )).join(delimiter(spaces, withNewLines))
);
