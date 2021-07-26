import usePlanets from './usePlanets';

const useFilteredData = () => {
  const { data, filters } = usePlanets();
  const { filterByName, filterByNumericValues } = filters;
  const { column, comparison, value } = filterByNumericValues[0];
  const { name } = filterByName;
  let filteredData = data && data.filter((planet) => planet.name.includes(name));
  if (value) {
    const string = String(value);
    filteredData = data && data.filter((planet) => {
      if (comparison === 'maior que') { return planet[column] > value; }
      if (comparison === 'menor que') { return planet[column] < value; }
      if (comparison === 'igual a') { return planet[column] === string; }
      return planet;
    });
  }

  return { filteredData };
};

export default useFilteredData;
