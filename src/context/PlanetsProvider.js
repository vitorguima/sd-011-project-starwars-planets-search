import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import services from '../services/Services';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const callbackFetchPlanets = async () => {
      const result = await services();
      setPlanets(result);
    };
    callbackFetchPlanets();
  }, []);

  return (
    <PlanetsContext.Provider value={ { planets } }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.Props,
}.isRequired;

export default PlanetsProvider;
