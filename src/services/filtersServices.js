export const sortStrings = (array, column, sort) => {
  if (sort === 'ASC') {
    return array.sort((a, b) => (
      a[column] > b[column]) || (a[column] === b[column]) - 1);
  }
  return array.sort((a, b) => (
    a[column] < b[column]) || (a[column] === b[column]) - 1);
};

export const sortNumbers = (array, column, sort) => {
  if (sort === 'ASC') {
    return array.sort((a, b) => a[column] - b[column]);
  }
  return array.sort((a, b) => b[column] - a[column]);
};

export const filtrateName = (array, name) => array.filter((planet) => (
  planet.name.toLowerCase().includes(name.toLowerCase())
));

export const filtrateNumber = (comparison, array, column, value) => {
  switch (comparison) {
  case 'maior que':
    return array.filter((planet) => Number(planet[column]) > Number(value));
  case 'menor que':
    return array.filter((planet) => Number(planet[column]) < Number(value));
  case 'igual a':
    return array.filter((planet) => Number(planet[column]) === Number(value));
  default:
    break;
  }
};
