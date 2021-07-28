import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getPlanets from '../services/api';
import PlanetContext from './PlanetContext';

function PlanetProvider({ children }) {
  const [dataPlanet, setPlanet] = useState([]);

  const contextValues = {
    dataPlanet,
  };
  useEffect(() => {
    getPlanets()
      .then(({ results }) => {
        results.forEach((obj) => delete obj.residents);
        setPlanet(results);
      });
  }, []);

  return (
    <PlanetContext.Provider value={ contextValues }>
      {children}
    </PlanetContext.Provider>
  );
}

export default PlanetProvider;

PlanetProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
