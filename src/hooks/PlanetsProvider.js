import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

const { Provider } = PlanetsContext;

const INITIAL_FILTERS = {
  filterByName: {
    name: '',
  },
  filterByNumericValues: [],
  order: {
    column: 'name',
    sort: 'ASC',
  },
};

function PlanetsProvider({ children }) {
  const [initialFilters, setInitialFilters] = useState(INITIAL_FILTERS);
  const [filteredInfo, setFilteredInfo] = useState([]);
  const [renderOptions, setRenderOptions] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);

  const contextValue = {
    initialFilters,
    setInitialFilters,
    filteredInfo,
    setFilteredInfo,
    setRenderOptions,
    renderOptions,
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
