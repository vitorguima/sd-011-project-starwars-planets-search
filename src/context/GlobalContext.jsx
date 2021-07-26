import React from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';

export const Context = React.createContext();

const GlobalContext = ({ children }) => {
  const { data, error, loading, request } = useFetch();
  return (
    <Context.Provider value={ { data, error, loading, request } }>
      {children}
    </Context.Provider>
  );
};

GlobalContext.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default GlobalContext;
