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
    // modificação significativa-
    column: '',
    comparison: '',
    value: 0,
  });

  function deleteFilter(string) {
    const { filters: { filterByNumericValues } } = userFilter;
    const removeFilter = filterByNumericValues.filter(({ column }) => column !== string);

    setUserFilter({
      ...userFilter,
      filters: {
        ...userFilter.filters,
        filterByNumericValues:
          removeFilter,
      },
    });
  }

  const context = {
    userFilter, setUserFilter, numericFilter, setNumericFilter, deleteFilter,
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
