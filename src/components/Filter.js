function filterPlanet(filters, allPlanets) {
  return allPlanets.filter((value) => {
    if (filters.filters.filterByNumericValues.length > 0) {
      const values = filters.filters
        .filterByNumericValues[filters.filters.filterByNumericValues.length - 1];
      switch (values.comparison) {
      case 'maior que':
        return value[values.column] > Number(values.value);
      case 'menor que':
        return value[values.column] < Number(values.value);
      case 'igual a':
        return value[values.column] === values.value;
      default:
        return true;
      }
    } return true;
  });
}

export default filterPlanet;
