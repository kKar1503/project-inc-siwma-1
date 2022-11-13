/**
 * References anything lazily (Useful for recursive references)
 * https://stackoverflow.com/a/32092829
 * @param {*} ref Reference
 * @returns A lazy reference
 */
const lazyReference =
  (ref) =>
  (...args) =>
    ref.apply(this, args);

export default lazyReference;
