import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getPlanets from '../services/getPlanets';
import ContextPlanetsApi from './ContextPlanetsApi';

function ProviderPlanets({ children }) {
  const [planets, setPlanets] = useState([]);
  const contextValue = {
    planets,
  };

  useEffect(() => {
    getPlanets().then(({ results }) => {
      results.forEach((result) => delete result.residents);
      setPlanets(results);
    });
  }, []);

  return (
    <ContextPlanetsApi.Provider value={ contextValue }>
      {children}
    </ContextPlanetsApi.Provider>
  );
}

ProviderPlanets.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProviderPlanets;
