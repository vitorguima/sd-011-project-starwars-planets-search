import React, { useState } from 'react';
import propTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const [userInputFilter, setUserInputFilter] = useState({
    filters: {
      filterByName: {
        name: '',
      },
    },
  });

  const context = {
    userInputFilter, setUserInputFilter,
  };

  return (
    <AppContext.Provider value={ context }>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: propTypes.node.isRequired,
};

export default Provider;
