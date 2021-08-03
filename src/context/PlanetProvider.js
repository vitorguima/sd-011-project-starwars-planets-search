import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';

function PlanetProvider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const resultsComplet = await fetch(endpoint).then((itens) => itens.json());
      setData(resultsComplet.results);
    };
    getData();
  }, []);

  const myPlanets = {
    data,
  };

  return (
    <PlanetContext.Provider value={ myPlanets }>
      {children}
    </PlanetContext.Provider>
  );
}

PlanetProvider.propTypes = ({
  children: PropTypes.node,
}).isRequired;

export default PlanetProvider;
