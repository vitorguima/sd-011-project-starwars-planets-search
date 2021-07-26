import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Context from './Context';

export default function Provider({ children }) {
  const [data, setData] = useState([]);

  const [name, setNameFilter] = useState('');

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => {
        response.json()
          .then(({ results }) => setData(results));
      });
  }, []);

  const contextValue = {
    data,
    filters: {
      filterByName: {
        name,
      },
    },
    setNameFilter,
  };
  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.object,
}.isRequired;
