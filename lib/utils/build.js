import { delimiter } from './helpers';

export const buildAttributes = (attributes, spaces = 0, withNewLines = true) => attributes.map(attr => (
  `${attr.name}: ${attr.type}${attr.required ? '!' : ''}`
)).join(delimiter(spaces, withNewLines));
