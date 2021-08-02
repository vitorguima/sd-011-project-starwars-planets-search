function compareFilterValues([filterArray, planet]) {
  let planetFilterCount = 0;
  filterArray.forEach(({ column, comparison, value }) => {
    const planetValue = Number(planet[column]);
    const filterValue = Number(value);
    if (comparison === 'maior que' && (planetValue > filterValue)) {
      planetFilterCount += 1;
    }
    if (comparison === 'menor que' && (planetValue < filterValue)) {
      planetFilterCount += 1;
    }
    if (comparison === 'igual a' && (planetValue === filterValue)) {
      planetFilterCount += 1;
    }
  });
  return planetFilterCount;
}

function tableBodyFilter({ data, filters, keysFilter }) {
  const {
    filterByName: { name },
    filterByNumericValues,
  } = filters;

  return (data.filter((planet) => {
    const isOnFilterName = planet.name.includes(name);
    if (filterByNumericValues[0].column && isOnFilterName) {
      const thoughtFilters = compareFilterValues([filterByNumericValues, planet]);
      if (thoughtFilters === filterByNumericValues.length) {
        return true;
      } return false;
    }
    return (isOnFilterName);
  }).map((planet) => {
    keysFilter.forEach((filter) => delete planet[filter]);
    return Object.values(planet);
  }));
}

export default tableBodyFilter;
