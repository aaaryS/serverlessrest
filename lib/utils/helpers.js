export const lowerFirstLetter = str => str.replace(/^\w/, c => c.toLowerCase());

export const captialize = str => str.replace(/^\w/, c => c.toUpperCase());

export const delimiter = spaces => `\n${Array(spaces).fill(' ').join('')}`;
