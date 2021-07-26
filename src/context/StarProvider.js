import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StarContext from './StarContext';
import fetchPlanetsOnAPI from '../services/StarWarsPlanetAPI';

function StarProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchPlanets() {
    setLoading(true);
    const planetsAPI = await fetchPlanetsOnAPI();
    setPlanets(planetsAPI);
    setLoading(false);
  }

  return (
      <StarContext.Provider value={ { planets, loading, fetchPlanets } }>
        { children }
      </StarContext.Provider>
  );
}

StarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarContext;
