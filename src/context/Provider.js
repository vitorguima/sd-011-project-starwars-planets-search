import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import getPlanetsAPI from '../services/getPlanetsAPI';

function Provider({ children }) {
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  async function fetchPlanets() {
    setIsLoading(true);
    try {
      const response = await getPlanetsAPI();
      response.map((result) => delete result.residents); // remove chave 'residents' dos dados obtidos da API
      setData(response);
      setIsLoading(false);
    } catch (error) {
      console.log('error');
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPlanets();
  }, [])

  const contextValue = {
    data,
    isLoading,
    fetchPlanets,
  };
  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
}

export default Provider;

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
