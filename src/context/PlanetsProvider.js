import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import getStarwarsPlanets from '../services/starwarsPlanetAPI';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [planetsFromApi, setPlanetsFromApi] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [planets, setPlanets] = useState([]);
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
      switch (filters.filterByNumericValues[0].comparison) {
      case 'maior que':
        filteredPlanetsByNumericValues = filteredPlanetsByName.filter(
          (planet) => parseInt(planet[filters.filterByNumericValues[0].column], 10)
          > parseInt(filters.filterByNumericValues[0].value, 10),
        );
        break;
      case 'menor que':
        filteredPlanetsByNumericValues = filteredPlanetsByName.filter(
          (planet) => parseInt(planet[filters.filterByNumericValues[0].column], 10)
          < parseInt(filters.filterByNumericValues[0].value, 10),
        );
        break;
      case 'igual a':
        filteredPlanetsByNumericValues = filteredPlanetsByName.filter(
          (planet) => parseInt(planet[filters.filterByNumericValues[0].column], 10)
          === parseInt(filters.filterByNumericValues[0].value, 10),
        );
        break;
      default:
      }
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
