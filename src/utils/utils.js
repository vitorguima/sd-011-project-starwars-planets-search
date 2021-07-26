const snakeCaseToCapitilized = (phrase) => phrase
  .split('_')
  .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
  .join(' ');

export default snakeCaseToCapitilized;
