import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import planetsContext from './PlanetsContext';

export default function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchStarWarsPlanets() {
    setIsLoading(true);
    try {
      const getPlanetsResponse = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const getPlanetsResult = await getPlanetsResponse.json();
      setData(getPlanetsResult.results);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchStarWarsPlanets();
  }, []);

  return (
    <planetsContext.Provider value={ { data, fetchStarWarsPlanets, isLoading } }>
      { children }
    </planetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
