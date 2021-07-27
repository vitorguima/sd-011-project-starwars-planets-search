import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import getPlanetsAPI from '../services/getPlanetsAPI';

function Provider({ children }) {
  const [data, setData] = useState([]);

  const [dataFilters, setDataFilters] = useState({
    filters: {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [
        {
          column: '',
          comparison: '',
          value: '',
        },
      ],
    },
  });

  async function fetchPlanets() {
    try {
      const response = await getPlanetsAPI();
      response.map((result) => delete result.residents); // remove chave 'residents' dos dados obtidos da API
      setData(response);
    } catch (error) {
      console.log('error');
    }
  }

  useEffect(() => {
    fetchPlanets();
  }, []);

  const contextValue = {
    data,
    fetchPlanets,
    dataFilters,
    setDataFilters,
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
