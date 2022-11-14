/**
 * References anything lazily (Useful for recursive references)
 * https://stackoverflow.com/a/32092829
 * @param {*} ref Reference
 * @returns A lazy reference
 */
function lazyReference(ref) {
  return (...args) => ref.apply(this, args);
}

export default lazyReference;
