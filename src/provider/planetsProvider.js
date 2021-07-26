import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import planetsContext from './planetsContext';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState();
  useEffect(() => {
    const getPlanets = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const fetchPlanets = await fetch(endpoint).then((data) => data.json());
      setPlanets(fetchPlanets);
    };
    getPlanets();
  }, []);
  const context = {
    planets,
  };
  return (
    <planetsContext.Provider value={ context }>
      {children}
    </planetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default PlanetsProvider;
