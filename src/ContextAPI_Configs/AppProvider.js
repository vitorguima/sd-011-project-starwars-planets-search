import React, { useState } from 'react';
import propTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const [state, setState] = useState('a');

  const hooks = {
    state, setState,
  };

  return (
    <AppContext.Provider value={ hooks }>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: propTypes.node.isRequired,
};

export default Provider;
