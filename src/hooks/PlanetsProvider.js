import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

const { Provider } = PlanetsContext;

const INITIAL_FILTERS = {
  filterByName: {
    name: '',
  },
};

function PlanetsProvider({ children }) {
  const [initialFilters, setInitialFilters] = useState(INITIAL_FILTERS);
  const [filteredInfo, setFilteredInfo] = useState([]);

  const contextValue = {
    initialFilters,
    setInitialFilters,
    filteredInfo,
    setFilteredInfo,
  };

  return (
    <Provider value={ contextValue }>
      { children }
    </Provider>
  );
}

export default PlanetsProvider;

PlanetsProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
