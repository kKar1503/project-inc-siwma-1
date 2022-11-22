/**
 * Joins the elements of an array together into a readable string
 * @example
 * arrayToString(['Red', 'blue', 'green', 'orange']); // Returns 'Red, blue, green and orange'
 * @param {string[] || number[]} arr The array to join
 * @returns A readable string
 */
const arrayToString = (arr) => {
  // Remove the last element from the array
  const arrWithoutLast = [...arr];
  const poppedElement = arrWithoutLast.pop();

  // Join up all elements of the array (with the last element already removed)
  let result = arrWithoutLast.join(', ');

  // Join the last element to the array
  result += `, and ${poppedElement}`;

  return result;
};

export default arrayToString;
