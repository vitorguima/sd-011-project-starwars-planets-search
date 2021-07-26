import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import fetchStarWarsPlanets from '../services/StarWarsAPI';

function StarWarsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState({ filterByName: { name: '' } });
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      const listPlanets = await fetchStarWarsPlanets();
      setPlanets(listPlanets);
    };
    getPlanets();
  }, []);

  // https://www.youtube.com/watch?v=Q8JyF3wpsHc
  useEffect(() => {
    const { filterByName: { name } } = filters;
    const listFilteredPlanets = planets.filter((planet) => (
      planet.name.toLowerCase().includes(name.toLowerCase())
    ));
    setFilteredPlanets(listFilteredPlanets);
  }, [filters, planets]);

  function handleFilterByName({ target: { value } }) {
    setFilters({ filterByName: { name: value } });
  }

  const contextValue = { filters, handleFilterByName, filteredPlanets };

  return (
    <StarWarsContext.Provider value={ contextValue }>
      { children }
    </StarWarsContext.Provider>
  );
}

export default StarWarsProvider;

StarWarsProvider.propTypes = {
  children: PropTypes.shape({ }).isRequired,
};
