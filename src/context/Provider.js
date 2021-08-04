import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ContextMain from './Context';
import getApi from '../services/api';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  useEffect(() => {
    getApi().then((response) => setData(response));
  }, []);

  useEffect(() => {
    getApi().then((response) => setFilteredPlanets(response));
  }, []);

  const filterPlanetsByName = (textName) => {
    const filtered = data.filter(
      ({ name }) => name.toLowerCase().includes(textName.toLowerCase()),
    );
    setFilteredPlanets(filtered);
  };

  const deleteFilter = (index) => {
    const delFilter = filters.filter((_, indexFilter) => index !== indexFilter);
    setFilters(delFilter);
  };

  const filterPlanetsByNumericValues = ({ column, comparison }) => {
    const newFilter = data.filter((planet) => {
      const infoPlanet = Number(planet[column]);
      if (comparison === 'menor que') {
        return infoPlanet < toCompare;
      }
      if (comparison === 'maior que') {
        return infoPlanet > toCompare;
      }
      return infoPlanet === toCompare;
    });
    setFilteredPlanets(newFilter);
  };

  const contextValue = {
    data,
    filteredPlanets,
    filters,
    deleteFilter,
    setFilters,
    filterByName: (textName) => filterPlanetsByName(textName),
    filterByNumericValues: (filtersLocal) => filterPlanetsByNumericValues(filtersLocal),
  };
  return (
    <ContextMain.Provider value={ contextValue }>
      {children}
    </ContextMain.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
