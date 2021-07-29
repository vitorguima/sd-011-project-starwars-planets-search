import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState({
    filters: {
      filterByName: {
        name: 'Tatoo',
      },
    },
  });
  const contextValue = {
    planets,
    setPlanets,
    filters,
    setFilters,
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
