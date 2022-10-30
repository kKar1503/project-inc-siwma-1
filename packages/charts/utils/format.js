export function limit(text, length) {
  return text.length > length ? `${text.substr(0, length - 1)}...` : text;
}

const suffix = ['th', 'st', 'nd', 'rd'];

export function getNumberWithOrdinal(n) {
  const r = n % 100;
  return n + (suffix[(r - 20) % 10] || suffix[r] || suffix[0]);
}
