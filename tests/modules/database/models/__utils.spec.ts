import { ColumnNumericTransformer, CurrentTimestamp } from 'src/modules/database/models/__utils';

describe('Utils (Modules > Database > Models )', () => {
  it('should be receive a float number and return the same float number', () => {
    const expected = 10;
    const transformer = new ColumnNumericTransformer();

    expect(transformer.to(expected)).toEqual(expected);
  });

  it('should be receive a float string number and cast to float type', () => {
    const expected = 25.66;
    const transformer = new ColumnNumericTransformer();

    expect(transformer.from(String(expected))).toEqual(expected);
  });

  it('should be receive a CURRENT_TIMESTAMP text', () => {
    expect(CurrentTimestamp()).toBe('CURRENT_TIMESTAMP');
  });
});
