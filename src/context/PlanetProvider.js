import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchPlanets from '../services/api';
import PlanetsContext from './PlanetsContext';

export default function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: { name: '' },
  });

  function handleInputPlanet({ value }) {
    setFilters({ filterByName: { name: value } });
  }

  async function asyncFunc() {
    setPlanets(await fetchPlanets());
  }

  useEffect(() => {
    const { filterByName: { name } } = filters;
    const filtered = planets.filter((planet) => planet.name
      .toLowerCase().includes(name));
    setFilteredPlanets(filtered);
  }, [filters, planets]);

  useEffect(() => {
    asyncFunc();
  }, []);

  return (
    <PlanetsContext.Provider value={ { planets, handleInputPlanet } }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
