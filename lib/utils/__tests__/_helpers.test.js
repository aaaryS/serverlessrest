import { lowerFirstLetter, captialize, delimiter } from './../helpers';

describe('#lowerFirstLetter', () => {
  it('should lower first letter', () => {
    expect(lowerFirstLetter('Test')).toEqual('test');
  });

  it('should work with empty string', () => {
    expect(lowerFirstLetter('')).toEqual('');
  });
});

describe('#captialize', () => {
  it('should capitalize first letter', () => {
    expect(captialize('test')).toEqual('Test');
  });

  it('should work with empty string', () => {
    expect(captialize('')).toEqual('');
  });
});

describe('#delimiter', () => {
  it('should create proper delimiter with spaces', () => {
    expect(delimiter(6)).toEqual('\n      ');
  });

  it('should create proper delimiter without new line', () => {
    expect(delimiter(3, false)).toEqual('   ');
  });
});
