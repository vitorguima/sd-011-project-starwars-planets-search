import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getPlanets from '../services/getPlanets';
import ContextPlanetsApi from './ContextPlanetsApi';

function ProviderPlanets({ children }) {
  const [planets, setPlanets] = useState([]);
  const [namePlanets, setNamePlanets] = useState([]);

  useEffect(() => {
    getPlanets().then(({ results }) => {
      results.forEach((result) => delete result.residents);
      setPlanets(results);
      setNamePlanets(results);
    });
  }, []);

  const filterPlanets = ({ target: { value } }) => {
    const inputFindPlanet = planets.filter(({ name }) => (
      name.toLowerCase().includes(value.toLowerCase())
    ));
    setNamePlanets(inputFindPlanet);
  };

  const allContexts = {
    planets,
    namePlanets,
    filterPlanets,
  };

  return (
    <ContextPlanetsApi.Provider value={ allContexts }>
      {children}
    </ContextPlanetsApi.Provider>
  );
}

ProviderPlanets.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProviderPlanets;
