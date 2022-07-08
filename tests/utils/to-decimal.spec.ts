import { toDecimal } from 'src/utils';

describe('toDecimal (Unit)', () => {
  it('should be convert a percent integer number to a decimal value', () => {
    const mock = 38; // this is a percent number like 38%
    const expected = 1.38;

    expect(toDecimal(mock)).toEqual(expected);
  });

  it('should be convert a percent float number to a decimal value', () => {
    const mock = 1.5; // this is a percent number like 38.55%
    const expected = 1.015;

    expect(toDecimal(mock)).toEqual(expected);
  });
});
