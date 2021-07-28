import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StarwarsPlanetsContext from './StarwarsPlanetsContext';
import fetchStarwarsAPI from '../services/fetchStarwarsAPI';

function StarwarsPlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function requestApiSuccess(response) {
    setData(response);
  }

  async function requestApi() {
    try {
      setIsLoading(true);
      const response = await fetchStarwarsAPI();
      requestApiSuccess(response);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <StarwarsPlanetsContext.Provider
      value={ { data, requestApi, isLoading } }
    >
      {children}
    </StarwarsPlanetsContext.Provider>
  );
}

StarwarsPlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarwarsPlanetsProvider;
