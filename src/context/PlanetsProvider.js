import React, { useState } from 'react';
import PropTypes from 'prop-types';

import PlanetsContext from './PlanetsContext';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [name, setName] = useState('');
  const [filtersValues, setFiltersValues] = useState([]);

  const values = {
    planets,
    setPlanets,
    filters: {
      filterByName: { name },
      filterByNumericValues: filtersValues,
    },
    setName,
    setFiltersValues,
  };

  return (
    <PlanetsContext.Provider value={ values }>
      { children }
    </PlanetsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Provider;
