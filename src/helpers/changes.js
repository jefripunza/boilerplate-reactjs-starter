/**
 * @param {number} number
 */
export const fixZeros = (number) => {
  return number < 10 ? `0${number}` : `${number}`;
};
