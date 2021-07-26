import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StarContext from './StarContext';
import { fetchPlanets } from '../services/StarWarsPlanetAPI';

function StarProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchPlanets() {
    setLoading(true);
    const planetsAPI = await fetchPlanets();
    setPlanets(planetsAPI);
    setLoading(false);
  }

  return (
    <div>
      <StarContext.Provider value={ { planets, loading, fetchPlanets } }>
        { children }
      </StarContext.Provider>
    </div>
  );
}

StarProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default StarContext;
