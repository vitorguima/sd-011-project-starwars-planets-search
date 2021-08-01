import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from '../context/PlanetsContext';

export default function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [planets, setPlanets] = useState([]);

  const contextValue = {
    data,
    setData,
    planets,
    setPlanets,

  };

  return (
    <PlanetsContext.Provider value={ contextValue }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
