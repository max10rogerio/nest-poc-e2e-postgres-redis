/**
 * Cast a percent value to decimal value
 *
 * Ex:
 *
 * ```js
 * toDecimal(0.38)
 * // log: 1.0038
 *
 * toDecimal(7.50)
 * // log: 1.0738
 * ```
 */
export const toDecimal = (percentValue: number): number => {
  return percentValue / 100 + 1;
};
