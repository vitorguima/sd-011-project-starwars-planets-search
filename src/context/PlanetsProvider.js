import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import getStarwarsPlanets from '../services/starwarsPlanetAPI';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [planetsFromApi, setPlanetsFromApi] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [planets, setPlanets] = useState([]);
  const [columnFilters, setColumnFilters] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);
  const [filters, setFilters] = useState({
    filterByName: { name: '' },
    filterByNumericValues: [],
  });

  function fetchPlanetsOnSuccess({ results }) {
    setPlanetsFromApi(results);
    setPlanets(results);
    setIsLoading(false);
  }

  async function fetchStarwarsPlanets() {
    setIsLoading(true);
    try {
      const response = await getStarwarsPlanets();
      fetchPlanetsOnSuccess(response);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  function filterAll() {
    const filteredPlanetsByName = planetsFromApi.filter(
      (planet) => planet.name.includes(filters.filterByName.name),
    );
    let filteredPlanetsByNumericValues = filteredPlanetsByName;
    if (filters.filterByNumericValues.length !== 0) {
      filters.filterByNumericValues.forEach((filter) => {
        switch (filter.comparison) {
        case 'maior que':
          filteredPlanetsByNumericValues = filteredPlanetsByNumericValues.filter(
            (planet) => parseInt(planet[filter.column], 10)
          > parseInt(filter.value, 10),
          );
          break;
        case 'menor que':
          filteredPlanetsByNumericValues = filteredPlanetsByNumericValues.filter(
            (planet) => parseInt(planet[filter.column], 10)
          < parseInt(filter.value, 10),
          );
          break;
        case 'igual a':
          filteredPlanetsByNumericValues = filteredPlanetsByNumericValues.filter(
            (planet) => parseInt(planet[filter.column], 10)
          === parseInt(filter.value, 10),
          );
          break;
        default:
        }
      });
    }
    setPlanets(filteredPlanetsByNumericValues);
  }

  useEffect(() => {
    filterAll();
  }, [filters]);

  return (
    <PlanetsContext.Provider
      value={ { planets,
        planetsFromApi,
        isLoading,
        filters,
        columnFilters,
        setColumnFilters,
        fetchStarwarsPlanets,
        setFilters,
        setPlanets } }
    >
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
