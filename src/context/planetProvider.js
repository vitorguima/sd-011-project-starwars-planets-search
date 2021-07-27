import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './planetContext';

function PlanetProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [keys, setKeys] = useState([]);
  const [filters, setFilters] = useState({ filterByName: {
    name: '',
  } });

  async function fetchPlanets() {
    const request = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const response = await request.json();
    const data = response;
    const header = Object.keys(response.results[0]).filter((key) => key !== 'residents');
    setPlanets(data);
    setIsLoading(false);
    setKeys(header);
  }

  useEffect(() => {
    fetchPlanets();
  }, []);

  return (
    <PlanetContext.Provider
      value={ { planets, isLoading, keys, fetchPlanets, filters, setFilters } }
    >
      {children}
    </PlanetContext.Provider>
  );
}

export default PlanetProvider;

PlanetProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
