import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

export default function Planets() {
  const { data, filters, setFilters } = useContext(AppContext);
  const { filterByName, filterByNumericValues } = filters;

  // String trim() method: https://www.techonthenet.com/js/string_trim.php
  const filterName = filterByName.name.trim().toLowerCase();
  const { column, comparison, value } = filterByNumericValues;

  function compareValues(valueX, valueY, comparisonName) {
    const compare = {
      'maior que': +valueX > +valueY,
      'menor que': +valueX < +valueY,
      'igual a': +valueX === +valueY,
    };

    return compare[comparisonName];
  }

  let planets;

  if (data.results) {
    planets = data.results.filter(({ name }) => {
      if (filterName) return name.toLowerCase().includes(filterName);
      return true;
    });

    if (value) {
      planets = [...planets].filter((planet) => compareValues(
        planet[column],
        value,
        comparison,
      ));
    }
  }

  return { planets, filters, setFilters };
}
