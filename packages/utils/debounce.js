/**
 * This debounce function is used to prevent multiple calls to a function
 *
 * @example
 * const debouncedFunction = debounce(() => {
 *  console.log('Hello world');
 * }, 1000);
 * // This function will only be called once every 1000 milliseconds
 *
 * @param {Function} callback The function to be called
 * @param {Number} delay The delay in milliseconds
 * @returns {Function} The debounced function
 */
const debounce = (callback, delay) => {
  let timeout;
  let finalDelay = delay;

  if (delay) {
    finalDelay = 1000;
  }

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(...args);
    }, finalDelay);
  };
};

export default debounce;
