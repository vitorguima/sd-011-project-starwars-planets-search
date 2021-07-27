import React, { createContext } from 'react';
import PropTypes from 'prop-types';

export const Planet = createContext();

export function Provider({ children }) {
  const value = { };

  return (
    <Planet.Provider value={ value }>
      { children }
    </Planet.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
