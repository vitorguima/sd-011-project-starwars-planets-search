const filteredNumericValues = (initialFilters, items) => {
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

export default filteredNumericValues;
