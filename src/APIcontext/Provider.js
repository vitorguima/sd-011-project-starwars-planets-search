import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
  });

  useEffect(() => {
    const filterPlanets = data.filter((planet) => planet.name
      .includes(filters.filterByName.name));
    setFilteredPlanets(filterPlanets);
  }, [data, filters]);

  useEffect(() => {
    const fetchPlanets = async () => {
      const fetchAPI = fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const response = await fetchAPI;
      const { results } = await response.json();
      setData(results);
    };
    fetchPlanets();
  }, []);

  return (
    <Context.Provider value={ { filteredPlanets, data, filters, setFilters } }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;
