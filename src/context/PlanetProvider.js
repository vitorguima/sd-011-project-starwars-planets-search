import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';

function PlanetProvider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilter] = useState({
    filterByName: {
      name: '',
    },
  });
  const [filterPlanets, SetFilterPlanets] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const resultsComplet = await fetch(endpoint).then((itens) => itens.json());
      setData(resultsComplet.results);
    };
    getData();
  }, []);

  // função que faz o filtro do nome
  function FilterName() {
    const namePlanets = data.filter(
      (planet) => planet.name.toLowerCase().includes(filters.filterByName.name),
    );
    SetFilterPlanets(namePlanets);
  }

  useEffect(FilterName, [filters]);

  const myPlanets = {
    data,
    filterPlanets,
    setFilter,
    filters,
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
