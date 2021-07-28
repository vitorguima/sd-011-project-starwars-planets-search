import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from './GlobalContext';
import getPlanets from '../services/StarWarsAPI';

const PlanetsProvider = ({ children }) => {
  const filterDefault = {
    filterByName: {
      name: '',
    },
    filterByNumericValues: [
      {
        column: '',
        comparison: '',
        value: '',
      },
    ],
  };

  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState(filterDefault);

  async function fetchPlanets() {
    setLoading(true);

    try {
      const response = await getPlanets();
      const { results } = response;
      setPlanets(results);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  const context = {
    planets,
    setPlanets,
    loading,
    fetchPlanets,
    filters,
    setFilters,
  };

  return (
    <GlobalContext.Provider value={ context }>
      { children }
    </GlobalContext.Provider>
  );
};

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
