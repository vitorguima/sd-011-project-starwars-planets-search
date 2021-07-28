import { useEffect, useState } from 'react';
import usePlanets from './usePlanets';

const idsSorted = (array, col, direction) => {
  const magic = 1;
  if (col === 'name') {
    return array.sort((a, b) => (a.name < b.name ? -magic : magic));
  }

  if (direction === 'ASC') {
    return array.sort((a, b) => a[col] - b[col]);
  }
  return array.sort((a, b) => b[col] - a[col]);
};

const useFilteredData = () => {
  const [filteredData, setFilteredData] = useState([]);
  const { data, filters } = usePlanets();
  const { filterByName, filterByNumericValues, order } = filters;
  const { name } = filterByName;

  useEffect(() => {
    setFilteredData(data && data.filter((planet) => planet.name.includes(name)));
  }, [data, name, filters]);

  let ids = filteredData;

  if (filterByNumericValues.length > 0) {
    filterByNumericValues.forEach((filter) => {
      const { column, comparison, value } = filter;
      const string = String(value);
      const newData = ids.filter((planet) => {
        if (comparison === 'maior que') {
          return planet[column] > value;
        }
        if (comparison === 'menor que') {
          return planet[column] < value;
        }
        if (comparison === 'igual a') {
          return planet[column] === string;
        }
        return planet;
      });
      ids = newData;
    });
    return [[...new Set(ids)]];
  }

  if (ids) {
    const newArray = idsSorted(ids, order.column, order.sort);
    return [newArray];
  }

  return [ids];
};
export default useFilteredData;
