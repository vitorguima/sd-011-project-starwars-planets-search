import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarsContext from './StarsContext';

function StarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({ filterByName: { name: '' } });
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  async function fetchPlanets() {
    const results = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const json = await results.json();
    const dataWithoutResidents = json.results.filter((planet) => delete planet.residents);
    setData(dataWithoutResidents);
    setFilteredPlanets(dataWithoutResidents);
  }

  useEffect(() => {
    fetchPlanets();
  }, []);

  const contextValue = {
    data,
    setData,
    filters,
    setFilters,
    filteredPlanets,
    setFilteredPlanets,
  };

  return (
    <StarsContext.Provider value={ contextValue }>
      {children}
    </StarsContext.Provider>
  );
}

StarsProvider.propTypes = {
  children: PropTypes.func.isRequired,
};

export default StarsProvider;
