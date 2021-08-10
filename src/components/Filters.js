export const filteredNumericValues = (initialFilters, items) => {
  let getComparison = true;

  initialFilters.filterByNumericValues.forEach((item) => {
    const { column, comparison, value } = item;
    const planetValue = items[column];
    switch (true) {
    case comparison === 'igual a':
      getComparison = getComparison && Number(planetValue) === Number(value);
      break;
    case comparison === 'maior que':
      getComparison = getComparison && Number(planetValue) > Number(value);
      break;
    case comparison === 'menor que':
      getComparison = getComparison && Number(planetValue) < Number(value);
      break;
    default:
      getComparison = planetValue;
      break;
    }
  });

  return getComparison;
};

const isColumnTypeNumber = (column) => {
  switch (true) {
  case column === 'rotation_period':
    return true;
  case column === 'orbital_period':
    return true;
  case column === 'diameter':
    return true;
  case column === 'surface_water':
    return true;
  case column === 'population':
    return true;
  default:
    return false;
  }
};

export const sortColumns = (initialFilters, planets) => {
  const { order } = initialFilters;
  const NEGATIVE_ONE = -1;
  switch (true) {
  case order.sort === 'ASC' && !isColumnTypeNumber(order.column):
    return planets.sort((a, b) => (
      (a[order.column] > b[order.column]) ? 1 : NEGATIVE_ONE));
  case order.sort === 'DESC' && !isColumnTypeNumber(order.column):
    return planets.sort((a, b) => (
      (a[order.column] < b[order.column]) ? 1 : NEGATIVE_ONE));
  case order.sort === 'ASC' && isColumnTypeNumber(order.column):
    return planets.sort((a, b) => Number(a[order.column]) - Number(b[order.column]));
  case order.sort === 'DESC' && isColumnTypeNumber(order.column):
    return planets.sort((a, b) => Number(b[order.column]) - Number(a[order.column]));
  default:
    return initialFilters;
  }
};
