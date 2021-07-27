import React, { useState } from 'react';
import propTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const [userFilter, setUserFilter] = useState({
    filters:
    {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [],
    },
  });

  const [numericFilter, setNumericFilter] = useState({
    column: '',
    comparison: '',
    value: 0,
  });

  const context = {
    userFilter, setUserFilter, numericFilter, setNumericFilter,
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
