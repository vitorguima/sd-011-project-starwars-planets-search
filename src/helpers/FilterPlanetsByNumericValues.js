export default function FilterPlanetsByNumericValues(planets, filters) {
  const HAS_FILTERS = filters.filterByNumericValues.length > 0;
  const FILTER = filters.filterByNumericValues;
  const filteredPlanets = [];

  if (!HAS_FILTERS) return planets;

  planets.forEach((planet) => {
    FILTER.forEach((filter) => {
      if (filter.comparison === 'maior que'
      && Number(planet[filter.column]) > Number(filter.value)) {
        filteredPlanets.push(planet);
      }

      if (filter.comparison === 'igual a'
        && Number(planet[filter.column]) === Number(filter.value)) {
        filteredPlanets.push(planet);
      }

      if (filter.comparison === 'menor que'
        && Number(planet[filter.column]) < Number(filter.value)) {
        filteredPlanets.push(planet);
      }
    });
  });
  return filteredPlanets;
}
