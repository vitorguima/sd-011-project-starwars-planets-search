import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchApiStarWarsPlanets from '../services/FetchApiStarWarsPlanets';
import PlanetsContext from '../context/PlanetsContext';

export default function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);

  async function getFetchApiStarWarsPlanets() {
    const planets = await fetchApiStarWarsPlanets();
    setData(data.concat(planets));
  }

  useEffect(() => {
    getFetchApiStarWarsPlanets();
  }, []);

  return (
    <PlanetsContext.Provider value={ { data } }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
