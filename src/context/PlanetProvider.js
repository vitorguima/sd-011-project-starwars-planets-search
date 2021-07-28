import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getPlanets from '../services/fetchPlanets';
import MyContext from './MyContext';

const PlanetProvider = ({ children }) => {
  const [data, setData] = useState([]); // Resposta da API.
  const [filters, setFilters] = useState({ filterByName: { name: '' } });
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  function handleChange() {
    const filteredNameInput = data.filter(
      (planet) => planet.name.toLowerCase().includes(filters.filterByName.name),
    );
    setFilteredPlanets(filteredNameInput);
  }

  useEffect(() => {
    const fetchPlanets = async () => {
      const results = await getPlanets();
      setFilteredPlanets(results);
      setData(results);
    };
    fetchPlanets();
  }, []);

  useEffect(handleChange, [filters]);

  const context = {
    data,
    setData,
    filters,
    setFilters,
    filteredPlanets,
    // setFilteredPlanets,
    // setOnlyPlanets,
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
