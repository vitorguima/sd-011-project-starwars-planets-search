import React, { useState } from 'react';
import PropTypes from 'prop-types';
import starwarsPlanetsContext from './starwarsPlanetsContext';

function StarwarsPlanetsProvider({ children }) {
  const INICIAL_STATE = {
    filterByName: { name: '' },
    filterByNumericValues: [{ column: '', comparison: '', value: 0 }],
  };

  const [data, setData] = useState([{}]);
  const [filters, setFilters] = useState(INICIAL_STATE);
  const [savePlanets, setSavePlanets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const valueState = {
    data,
    setData,
    filters,
    setFilters,
    savePlanets,
    setSavePlanets,
    isLoading,
    setIsLoading,
  };

  return (
    <starwarsPlanetsContext.Provider value={ valueState }>
      { children }
    </starwarsPlanetsContext.Provider>
  );
}

StarwarsPlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarwarsPlanetsProvider;
