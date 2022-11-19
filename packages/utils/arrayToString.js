/**
 * Joins the elements of an array together into a readable string
 * @example
 * arrayToString(['Red', 'blue', 'green', 'orange']); // Returns 'Red, blue, green and orange'
 * @param {string[] || number[]} arr The array to join
 * @returns A readable string
 */
const arrayToString = (arr) => {
  // Join up all elements of the array, except for the last
  let result = arr.join(', ');

  // Join the last element to the array
  result += `, and ${arr.at(-1)}`;

  return result;
};

export default arrayToString;
