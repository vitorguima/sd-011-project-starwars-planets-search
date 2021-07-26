import React, { useState } from 'react';
import PropTypes from 'prop-types';
import getStarwarsPlanets from '../services/starwarsPlanetAPI';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [planetsFromApi, setPlanetsFromApi] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [planets, setPlanets] = useState([]);

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
  return (
    <PlanetsContext.Provider
      value={ { planets,
        planetsFromApi,
        isLoading,
        fetchStarwarsPlanets,
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
