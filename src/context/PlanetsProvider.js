import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import * as services from '../services/Services';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  useEffect(() => {
    const callbackFetchPlanets = async () => {
      const result = await services.fetchPlanets();
      setPlanets(result);
    };
    callbackFetchPlanets();
  }, []);

  const handleFilter = (param) => {
    setFilteredPlanets(planets
      .filter((planet) => planet.name.includes(param)));
  };

  return (
    <PlanetsContext.Provider value={ { planets, handleFilter, filteredPlanets } }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.Props,
}.isRequired;

export default PlanetsProvider;
