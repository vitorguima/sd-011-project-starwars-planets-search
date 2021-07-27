import React, { useState } from 'react';
import PropTypes from 'react-dom';
import Context from './Context';
import useFetchPlanets from '../hooks/fetchPlanets';

function Provider({ children }) {
  const [data, error] = useFetchPlanets();
  const [filters, setFilters] = useState({
    filterByName: { name: '' },
    filterByNumericValues: [{ column: '', comparison: '', value: null }],
  });

  const filterByName = (name) => {
    setFilters({ ...filters, filterByName: { name } });
  };

  const contextValue = {
    data,
    error,
    filters,
    filterByName,
  };

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.any,
}.isRequired;

export default Provider;
