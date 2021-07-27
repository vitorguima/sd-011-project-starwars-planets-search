import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

function usePlanets() {
  const { data, filters, setFilters } = useContext(AppContext);

  const { filterByName, filterByNumericValues } = filters;

  const filterName = filterByName.name.trim().toLowerCase();
  const { column, comparison, value } = filterByNumericValues;

  function compareValues(value1, value2, comparisonName) {
    const compare = {
      'maior que': +value1 > +value2,
      'menor que': +value1 < +value2,
      'igual a': +value1 === +value2,
    };
    return compare[comparisonName];
  }

  let planets;

  if (data.results) {
    planets = data.results.filter(({ name }) => {
      if (filterName) {
        return name.toLowerCase().includes(filterName);
      }
      return true;
    });

    if (value) {
      planets = [...planets]
        .filter((planet) => compareValues(planet[column], value, comparison));
    }
  }

  return { planets, filters, setFilters };
}

export default usePlanets;
