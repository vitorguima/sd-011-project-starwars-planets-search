import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getPlanets from '../services/fetchPlanets';
import MyContext from './MyContext';

const PlanetProvider = ({ children }) => {
  const [planetsResult, setPlanetsResult] = useState([]);

  // ComponentDidMount que traz conteúdo da tabela pela API.
  useEffect(() => {
    const fetchPlanets = async () => {
      const data = await getPlanets();
      setPlanetsResult(data);
    };
    fetchPlanets();
  }, []);

  const context = {
    planetsResult,
  };

  return (
    <MyContext.Provider value={ context }>
      { children }
    </MyContext.Provider>
  );
};

PlanetProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetProvider;
