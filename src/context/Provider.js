import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getPlanets } from '../services/PlanetsApi';
import PlanetsContext from './PlanetsContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filteredName, setFilteredName] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
  });

  async function fetchPlanets() {
    const planetsAPI = await getPlanets();
    planetsAPI.results.map((result) => delete result.residents);
    setFilteredName(planetsAPI.results);
    setData(planetsAPI.results);
  }

  useEffect(() => {
    fetchPlanets();
  }, []);

  function filterName() {
    const filteredData = data.filter(
      (planet) => planet.name.toLowerCase().includes(filters.filterByName.name),
    );
    setFilteredName(filteredData);
  }

  useEffect(filterName, [filters]);

  return (
    <PlanetsContext.Provider value={ { filteredName, data, setFilters, filters } }>
      { children }
    </PlanetsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
