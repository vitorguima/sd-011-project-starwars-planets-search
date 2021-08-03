import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchPlanets from '../services/api';
import PlanetsContext from './PlanetsContext';

export default function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  async function asyncFunc() {
    setPlanets(await fetchPlanets());
  }

  useEffect(() => {
    asyncFunc();
  }, []);

  return (
    <PlanetsContext.Provider value={ planets }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
