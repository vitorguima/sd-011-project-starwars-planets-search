import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ContextApi from './ContextApi';
import apiPlanets, { residentFilter } from '../services/API';

export default function StarWarsProvider({ children }) {
  const [starWarsPlanets, setStarWarsPlanets] = useState([]);

  async function getPlanets() {
    const planets = await apiPlanets();
    const data = [...planets.results];
    console.log(data);
    residentFilter(data);
    setStarWarsPlanets(data);
  }

  useEffect(() => {
    getPlanets();
  }, []);

  const context = { data: starWarsPlanets };
  return (
    <ContextApi.Provider value={ context }>
      { children }
    </ContextApi.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
