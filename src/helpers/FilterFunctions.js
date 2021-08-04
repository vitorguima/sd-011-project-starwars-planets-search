export const filterByName = (array, name) => array.filter((planet) => (
  planet.name.toLowerCase().includes(name.toLowerCase())
));

export const filterBYNumber = (comparison, column, value, planetArray) => {
  if (comparison === 'maior que') {
    return planetArray.filter((planet) => (
      parseInt(planet[column], 10) > parseInt(value, 10)));
  }
  if (comparison === 'menor que') {
    return planetArray.filter((planet) => (
      parseInt(planet[column], 10) < parseInt(value, 10)));
  }
  if (comparison === 'igual a') {
    return planetArray.filter((planet) => (
      parseInt(planet[column], 10) === parseInt(value, 10)));
  }
};
