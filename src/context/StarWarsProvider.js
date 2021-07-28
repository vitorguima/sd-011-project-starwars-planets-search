import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

function PlanetProvider({ children }) {
  // meu estado;
  const [data, setData] = useState([]);

  useEffect(() => {
    const endpointPlanets = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const getPlanets = async () => {
      const results = await fetch(endpointPlanets);
      const dataPlanets = await results.json();
      setData(dataPlanets.results);
    };
    getPlanets();
  }, []);

  const context = { data };

  return (
    <StarWarsContext.Provider value={ context }>
      { children }
    </StarWarsContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetProvider;
