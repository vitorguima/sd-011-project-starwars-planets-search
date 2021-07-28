import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchPlanets from '../services/serviceAPI';
import StarWarsContext from './StarWarsContext';

export default function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  });

  useEffect(() => {
    const { allPlanets } = fetchPlanets().then((results) => {
      setData(results); setFilteredPlanets(results);
    });
    return allPlanets;
  }, []);

  const context = {
    data,
    filters,
    setFilters,
    filteredPlanets,
    setFilteredPlanets,
  };

  return (
    <StarWarsContext.Provider value={ context }>
      { children }
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = { children: PropTypes.node.isRequired };
