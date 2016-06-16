export default (word, count) => (
  (word === 'is' && count !== 1 ? 'are' : (count !== 1 ? `${word}s` : word))
);