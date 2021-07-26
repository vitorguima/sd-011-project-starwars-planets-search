import PropTypes from 'prop-types';
import React, { useState } from 'react';

export const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [data, setData] = useState(null);
  async function fetchApi() {
    const fetchStar = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const fetchResult = await fetchStar.json();
    setData(fetchResult);
  }
  return (
    <GlobalContext.Provider value={ { data, fetchApi } }>
      { children }
    </GlobalContext.Provider>);
};

GlobalProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
