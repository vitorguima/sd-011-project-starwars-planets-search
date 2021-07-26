import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';

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

  // meu contexto com informações para passar pros próximos componentes
  const context = { data };

  // retornando meu contexto.provider e passando todas as infos para componentes filhos
  return (
    <PlanetContext.Provider value={ context }>
      { children }
    </PlanetContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetProvider;
