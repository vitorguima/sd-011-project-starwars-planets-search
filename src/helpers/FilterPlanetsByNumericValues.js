export default function FilterPlanetsByNumericValues(planets, filters) {
  const COLUMN_FILTER = filters.filterByNumericValues[0].column;
  const COMPARISON_FILTER = filters.filterByNumericValues[0].comparison;
  const VALUE_FILTER = filters.filterByNumericValues[0].value;

  // console.log(COLUMN_FILTER, COMPARISON_FILTER, VALUE_FILTER);

  const filteredPlanets = [];
  if (!VALUE_FILTER) return planets;

  planets.forEach((planet) => {
    // console.log(planet[COLUMN_FILTER], VALUE_FILTER);

    if (COMPARISON_FILTER === 'maior_que'
      && Number(planet[COLUMN_FILTER]) > Number(VALUE_FILTER)) {
      filteredPlanets.push(planet);
    }

    if (COMPARISON_FILTER === 'igual'
      && Number(planet[COLUMN_FILTER]) === Number(VALUE_FILTER)) {
      filteredPlanets.push(planet);
    }

    if (COMPARISON_FILTER === 'menor_que'
      && Number(planet[COLUMN_FILTER]) < Number(VALUE_FILTER)) {
      filteredPlanets.push(planet);
    }
  });
  return filteredPlanets;
}
