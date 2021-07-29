export function filteredPlanets(array, allFilters) {
  let filteredPlanetsByNumeric = array;
  allFilters.forEach((filter) => {
    switch (filter.comparison) {
    case 'maior que':
      filteredPlanetsByNumeric = filteredPlanetsByNumeric
        .filter((newArray) => Number(newArray[filter.column]) > Number(filter.value));
      break;
    case 'menor que':
      filteredPlanetsByNumeric = filteredPlanetsByNumeric
        .filter((newArray) => Number(newArray[filter.column]) < Number(filter.value));
      break;
    case 'igual a':
      filteredPlanetsByNumeric = filteredPlanetsByNumeric
        .filter((newArray) => Number(newArray[filter.column]) === Number(filter.value));
      break;
    default:
      return filteredPlanetsByNumeric;
    }
  });
  return filteredPlanetsByNumeric;
}

export function filteredPlanetsByName(array, object) {
  const { filterByName: { name } } = object;
  const filtered = array.filter((planets) => (planets.name).includes(name));
  return filtered;
}
