export const filterByName = (array, name) => array.filter((planet) => (
  planet.name.toLowerCase().includes(name.toLowerCase())
));

export const filterByNumber = (comparison, column, value, planets) => {
  if (comparison === 'maior que') {
    return planets.filter((planet) => (
      parseInt(planet[column], 10) > parseInt(value, 10)
    ));
  }
  if (comparison === 'menor que') {
    return planets.filter((planet) => (
      parseInt(planet[column], 10) < parseInt(value, 10)
    ));
  }
  if (comparison === 'igual a') {
    return planets.filter((planet) => (
      parseInt(planet[column], 10) === parseInt(value, 10)
    ));
  }
};
