import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

export const selectsColuns = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
    order: {
      column: 'name',
      sort: 'ASC',
    },
  });
  const [filtersToUse, setFiltersToUse] = useState(selectsColuns);
  const contextValue = {
    planets,
    setPlanets,
    filters,
    setFilters,
    filtersToUse,
    setFiltersToUse,
  };

  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
}

export default Provider;

Provider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};
