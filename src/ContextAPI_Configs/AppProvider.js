import React from 'react';
import propTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  return (
    <AppContext.Provider>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: propTypes.node.isRequired,
};

export default Provider;
