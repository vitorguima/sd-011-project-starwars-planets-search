import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import PlanetsContext from './PlanetsContext';
import fetchAllPlanetsInAPI from '../services/fetchAllPlanetsInAPI';

export default function Provider({ children }) {
  const INITIAL_STATE_FILTERS = {
    filterByName: {
      name: '',
    },
    filterByNumericValues: [{
      column: '',
      comparison: '',
      value: '',
    }],
    order: {
      column: 'Name',
      sort: 'ASC',
    },
  };

  // # Criar um estado para os planets;
  const [data, setData] = useState([]);

  // # Criar um estado para os filtros;
  const [filters, setFilters] = useState(INITIAL_STATE_FILTERS);
  // # didMount - fazer a requisição API dos planetas;
  useEffect(() => {
    const fetchPlanets = async () => {
      const planets = await fetchAllPlanetsInAPI();
      setData(planets.results);
    };
    fetchPlanets();
  }, []);

  const contextValue = {
    data,
    filters,
    setFilters,
  };

  return (
    <PlanetsContext.Provider value={ contextValue }>
      { children }
    </PlanetsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};
