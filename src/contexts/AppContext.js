import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const AppContext = createContext({});

export function AppContextProvider({ children }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const link = 'https://swapi-trybe.herokuapp.com/api/planets/';
    fetch(link)
      .then((response) => response.json())
      .then((apiData) => setData(apiData));
  }, []);

  return (
    <AppContext.Provider value={ { data } }>
      {children}
    </AppContext.Provider>
  );
}

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
