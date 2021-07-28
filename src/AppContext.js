import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const AppContext = createContext({});

export function AppContextProvider({ children }) {
  const [data, setData] = useState({});
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: {},
  });

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((apiData) => setData(apiData));
  }, []);

  return (
    <AppContext.Provider value={ { data, filters, setFilters } }>
      {children}
    </AppContext.Provider>
  );
}

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
