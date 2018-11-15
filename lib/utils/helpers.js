export const lowerFirstLetter = str => str.replace(/^\w/, c => c.toLowerCase());

export const captialize = str => str.replace(/^\w/, c => c.toUpperCase());

export const delimiter = (spaces, newLine = true) => `${newLine ? '\n' : ''}${Array(spaces).fill(' ').join('')}`;
