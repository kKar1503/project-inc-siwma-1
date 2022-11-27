/**
 * Joins the elements of an array together into a readable string
 * @example
 * arrayToString(['Red', 'blue', 'green', 'orange'], 'and'); // Returns 'Red, blue, green and orange'
 * @param {string[] || number[]} arr The array to join
 * @param {string} joinWord The word to be used while joining the last word
 * @returns A readable string
 */
const arrayToString = (arr, joinWord) => {
  // Remove the last element from the array
  const arrWithoutLast = [...arr];
  const poppedElement = arrWithoutLast.pop();

  // Join up all elements of the array (with the last element already removed)
  let result = arrWithoutLast.join(', ');

  // Join the last element to the array
  result += `, ${joinWord} ${poppedElement}`;

  return result;
};

export default arrayToString;
