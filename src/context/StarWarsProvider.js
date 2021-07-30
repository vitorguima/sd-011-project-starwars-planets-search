import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

function PlanetProvider({ children }) {
  const [data, setData] = useState([]);
  const [filters] = useState({ filterByName: { name: '' } });
  const [filterPlanet, setFilterPlanet] = useState([]);

  useEffect(() => {
    const endpointPlanets = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const getPlanets = async () => {
      const results = await fetch(endpointPlanets);
      const dataPlanets = await results.json();
      setData(dataPlanets.results);
      setFilterPlanet(dataPlanets.results);
    };
    getPlanets();
  }, []);

  const filterPlanets = ({ target }) => {
    const { value } = target;
    const planetsFiltereds = data.filter((planet) => planet.name
      .toLowerCase().includes(value));
    setFilterPlanet(planetsFiltereds);
  };

  // meu contexto com informações para passar pros próximos componentes
  const context = { data, filterPlanets, filters, filterPlanet };
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
