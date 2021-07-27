import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StarwarsPlanetsContext from './StarwarsPlanetsContext';
import fetchStarwarsAPI from '../services/fetchStarwarsAPI';

function StarwarsPlanetsProvider({ children }) {
  const [data, setData] = useState([]);

  function requestApiSuccess(response) {
    setData(response);
  }

  async function requestApi() {
    try {
      const response = await fetchStarwarsAPI();
      requestApiSuccess(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <StarwarsPlanetsContext.Provider value={ { data, requestApi } }>
      {children}
    </StarwarsPlanetsContext.Provider>
  );
}

StarwarsPlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarwarsPlanetsProvider;
