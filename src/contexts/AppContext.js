import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const AppContext = createContext({});

export function AppContextProvider({ children }) {
  const [data, setData] = useState({ results: [] });
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  });
  const [order, setOrder] = useState({
    column: 'name',
    sort: 'ASC',
  });

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((apiData) => setData(apiData));
  }, []);

  return (
    <AppContext.Provider value={ { data, filters, setFilters, order, setOrder } }>
      {children}
    </AppContext.Provider>
  );
}

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
