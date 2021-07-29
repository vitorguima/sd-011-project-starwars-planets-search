import { useState } from 'react';
import FetchPlanets from '../services';

// Font: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
const removeResidents = (planetsArr) => planetsArr.map((planets) => {
  delete planets.residents;
  return planets;
});

export default async function usePlanetsFilter(initialFilters) {
  const [filters, setFilters] = useState(initialFilters);
  const [planets, setPlanets] = useState();

  await FetchPlanets().then((result) => { setPlanets(result); });
  const setFilter = (objFilters) => {
    setFilters(objFilters);
  };

  // const { filterByName: { name } } = filters;
  setPlanets(removeResidents(planets));
  if (filters && filters.filterByName && filters.filterByName.name) {
    setPlanets(planets.filter(
      ({ planetName }) => planetName.match(filters.filterByName.name),
    ));
  }
  return [planets, setFilter];
}
