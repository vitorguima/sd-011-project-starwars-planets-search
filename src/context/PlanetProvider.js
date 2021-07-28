import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getPlanets from '../services/fetchPlanets';
import MyContext from './MyContext';

const PlanetProvider = ({ children }) => {
  const [planetsResult, setPlanetsResult] = useState([]);
  // const [filteredName, setFilteredName] = useState([]);
  const [filters, setFilters] = useState({ filterByName: { name: '' } });

  useEffect(() => {
    const fetchPlanets = async () => {
      const data = await getPlanets();
      setPlanetsResult(data);
    };
    fetchPlanets();
  }, []);

  const context = {
    planetsResult,
    setPlanetsResult,
    filters,
    setFilters,
    // filteredName,
    // setFilteredName,
  };

  return (
    <MyContext.Provider value={ context }>
      { children }
    </MyContext.Provider>
  );
};

PlanetProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetProvider;
