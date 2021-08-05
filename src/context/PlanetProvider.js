import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchPlanets from '../services/api';
import PlanetsContext from './PlanetsContext';

export default function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({ filterByName: { name: '' } });

  async function asyncFunc() {
    setData(await fetchPlanets());
  }

  useEffect(() => {
    asyncFunc();
  }, []);

  const filteredPlanets = data
    .filter((planet) => planet.name.toLowerCase().includes(filters.filterByName.name));

  function handleInputPlanet(event) {
    setFilters({ filterByName: { name: event.target.value } });
  }

  // setar as funções para comparação, ajustar o filters e zás

  const valuesContext = { handleInputPlanet, data, filteredPlanets };

  return (
    <PlanetsContext.Provider value={ valuesContext }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
