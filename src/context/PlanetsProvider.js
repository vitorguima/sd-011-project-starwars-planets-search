import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getPlanets from '../services/starwarsPlanetsAPI';
import Context from './Context';

export default function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getDataFromAPI = async () => {
      const { results } = await getPlanets();
      return setData(results);
    };
    getDataFromAPI();
  }, []);

  const info = { data };

  return (
    <Context.Provider value={ info }>
      { children }
    </Context.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
