import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getPlanets from '../service/dataAPI';
import StarContext from './StarContext';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getDataFromAPI = async () => {
      const { results } = await getPlanets();
      return setData(results);
    };
    getDataFromAPI();
  }, []);

  return (
    <StarContext.Provider value={ { data } }>
      { children }
    </StarContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
