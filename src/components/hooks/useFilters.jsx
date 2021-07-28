import { useEffect, useState } from 'react';
import useHookState from './useHookState';

const useFilters = () => {
  const { state } = useHookState();

  const { filterByNumericValues } = state.filters;

  const { dataAPI, filters: { filterByName: { name } } } = state;

  const [filterPlanets, setFilterPlanets] = useState([]);

  useEffect(() => {
    const planetFilters = dataAPI.filter((planet) => planet.name.includes(name));
    setFilterPlanets(planetFilters);
  }, [dataAPI, name]);

  if (filterByNumericValues.length > 0) {
    const { column, comparison, value } = filterByNumericValues[0];
    if (comparison === 'maior que') {
      return [filterPlanets.filter((planet) => planet[column] > Number(value))];
    }
    if (comparison === 'menor que') {
      return [filterPlanets.filter((planet) => planet[column] < Number(value))];
    }
    if (comparison === 'igual a') {
      return [filterPlanets.filter((planet) => planet[column] === value)];
    }
  }
  return [filterPlanets];
};

export default useFilters;
