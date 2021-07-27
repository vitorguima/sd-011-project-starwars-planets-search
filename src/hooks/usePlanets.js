import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

function usePlanets() {
  const columnLabels = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const { data, filters, setFilters } = useContext(AppContext);
  const { filterByName, filterByNumericValues } = filters;

  let planets = [...data.results];
  const filterName = filterByName.name.trim().toLowerCase();

  planets = planets.filter(({ name }) => name.toLowerCase().includes(filterName));

  function compareValues(value1, value2, comparisonName) {
    const compare = {
      'maior que': +value1 > +value2,
      'menor que': +value1 < +value2,
      'igual a': +value1 === +value2,
    };
    return compare[comparisonName];
  }

  filterByNumericValues.forEach(({ column, comparison, value }) => {
    planets = planets
      .filter((planet) => compareValues(planet[column], value, comparison));
  });

  function addFilterByNumericValues(filter) {
    const newFilters = [...filterByNumericValues, filter];
    setFilters({
      ...filters,
      filterByNumericValues: newFilters,
    });
  }

  function removeFilter(columnName) {
    const newFilters = filterByNumericValues
      .filter(({ column }) => column !== columnName);
    setFilters({
      ...filters,
      filterByNumericValues: newFilters,
    });
  }

  const usedFilterColumns = filterByNumericValues.map(({ column }) => column);
  const availableFilterColumns = columnLabels
    .filter((label) => !usedFilterColumns.includes(label));

  return {
    planets,
    filters,
    setFilters,
    addFilterByNumericValues,
    removeFilter,
    availableFilterColumns };
}

export default usePlanets;
