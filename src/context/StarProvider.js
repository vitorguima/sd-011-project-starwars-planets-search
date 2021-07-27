import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarContext from './StarContext';
import fetchPlanetsOnAPI from '../services/StarWarsPlanetAPI';

function StarProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchPlanets() {
      setLoading(true);
      const data = await fetchPlanetsOnAPI();
      setPlanets(data);
      setLoading(false);
    }
    fetchPlanets();
  }, []);

  return (
    <StarContext.Provider value={ { planets, loading } }>
      { children }
    </StarContext.Provider>
  );
}

StarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarProvider;
