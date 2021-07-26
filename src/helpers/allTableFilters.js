export default function allTableFilters(context) {
  const {
    data,
    filters: {
      filterByName: { name: nameToFilter },
      filterByNumericValues,
    },
  } = context;

  let filteredPlanets = data.filter(({ name }) => (
    name.toLowerCase().includes(nameToFilter)
  ));

  if (filterByNumericValues.length > 0) {
    filterByNumericValues.forEach((filter) => {
      const { column, comparison, value } = filter;
      filteredPlanets = filteredPlanets.filter((planet) => {
        switch (comparison) {
        case 'maior que':
          return parseFloat(planet[column]) > parseFloat(value);
        case 'menor que':
          return parseFloat(planet[column]) < parseFloat(value);
        case 'igual a':
          return parseFloat(planet[column]) === parseFloat(value);
        default:
          return planet;
        }
      });
    });
  }

  return filteredPlanets;
}
