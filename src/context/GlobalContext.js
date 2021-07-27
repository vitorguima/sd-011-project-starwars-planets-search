import React from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';

export const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const { data, error, loading, request } = useFetch();
  return (
    <GlobalContext.Provider value={ { data, error, loading, request } }>
      { children }
    </GlobalContext.Provider>);
};

GlobalProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
