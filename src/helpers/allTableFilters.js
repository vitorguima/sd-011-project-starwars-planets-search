function filterByNameStep(data, nameToFilter) {
  const filteredPlanets = data.filter(({ name }) => (
    name.toLowerCase().includes(nameToFilter)
  ));

  return filteredPlanets;
}

function filterByNumericValuesStep(filterByNumericValues, filteredPlanets) {
  if (filterByNumericValues.length > 0) {
    let response = [];
    filterByNumericValues.forEach((filter) => {
      const { column, comparison, value } = filter;
      response = filteredPlanets.filter((planet) => {
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
    return response;
  }
  return filteredPlanets;
}

function sortByASC(orderColumn, filteredPlanets) {
  let response = [];
  const NEGATIVE_ONE = -1;
  const toNumberColumns = [
    'rotation_period', 'orbital_period', 'diameter', 'surface_water', 'population',
  ];

  response = filteredPlanets.sort((a, b) => {
    if (toNumberColumns.includes(orderColumn)) {
      if (parseFloat(a[orderColumn]) > parseFloat(b[orderColumn])) return 1;
      if (parseFloat(b[orderColumn]) > parseFloat(a[orderColumn])) return NEGATIVE_ONE;
      return 0;
    }
    if (a[orderColumn] > b[orderColumn]) return 1;
    if (b[orderColumn] > a[orderColumn]) return NEGATIVE_ONE;
    return 0;
  });
  return response;
}

function sortByDESC(orderColumn, filteredPlanets) {
  let response = [];
  const NEGATIVE_ONE = -1;
  const toNumberColumns = [
    'rotation_period', 'orbital_period', 'diameter', 'surface_water', 'population',
  ];

  response = filteredPlanets.sort((a, b) => {
    if (toNumberColumns.includes(orderColumn)) {
      if (parseFloat(a[orderColumn]) < parseFloat(b[orderColumn])) return 1;
      if (parseFloat(b[orderColumn]) < parseFloat(a[orderColumn])) return NEGATIVE_ONE;
      return 0;
    }
    if (a[orderColumn] < b[orderColumn]) return 1;
    if (b[orderColumn] < a[orderColumn]) return NEGATIVE_ONE;
    return 0;
  });
  return response;
}

function sortByFiltersStep(sort, orderColumn, filteredPlanets) {
  let response = [];

  if (sort === 'ASC') response = sortByASC(orderColumn, filteredPlanets);
  if (sort === 'DESC') response = sortByDESC(orderColumn, filteredPlanets);

  return response;
}

export default function allTableFilters(context) {
  const {
    data,
    filters: {
      filterByName: { name: nameToFilter },
      filterByNumericValues,
      order: { column: orderColumn, sort },
    },
  } = context;

  let filteredPlanets = filterByNameStep(data, nameToFilter);
  filteredPlanets = filterByNumericValuesStep(filterByNumericValues, filteredPlanets);
  filteredPlanets = sortByFiltersStep(sort, orderColumn, filteredPlanets);

  return filteredPlanets;
}
