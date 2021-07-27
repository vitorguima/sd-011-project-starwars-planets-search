import { useEffect, useState } from 'react';
import usePlanets from './usePlanets';

const useFilteredData = () => {
  const [filteredData, setFilteredData] = useState([]);
  const { data, filters } = usePlanets();
  const { filterByName, filterByNumericValues } = filters;
  const { name } = filterByName;
  useEffect(() => {
    setFilteredData(data && data.filter((planet) => planet.name.includes(name)));
  }, [data, name]);

  let ids = filteredData;
  if (filterByNumericValues.length > 0) {
    filterByNumericValues.forEach((filter) => {
      const { column, comparison, value } = filter;
      const string = String(value);
      const newData = ids.filter((planet) => {
        if (comparison === 'maior que') { return planet[column] > value; }
        if (comparison === 'menor que') { return planet[column] < value; }
        if (comparison === 'igual a') { return planet[column] === string; }
        return planet;
      });
      ids = newData;
    });
    return [[...new Set(ids)]];
  }

  return [filteredData];
};

export default useFilteredData;
