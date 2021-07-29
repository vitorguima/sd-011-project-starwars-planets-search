import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import MyContext from './MyContext';
import StarWarsAPI from '../Services/StarWarsAPI';

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
  });

  useEffect(() => {
    async function api() {
      const { results } = await StarWarsAPI();
      results.map((object) => delete object.residents);
      setData(results);
      setLoading(false);
    }
    api();
  }, []);

  const store = {
    data,
    loading,
    filters,
    setFilters,
    // searchPlanet,
  };

  return (
    <MyContext.Provider value={ store }>
      { children }
    </MyContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsProvider;
