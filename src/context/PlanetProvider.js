import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchPlanets from '../services/api';
import PlanetsContext from './PlanetsContext';

export default function PlanetsProvider({ children }) {
  const [planetsAPI, setPlanetsAPI] = useState([]);

  async function asyncFunc() {
    setPlanetsAPI(await fetchPlanets());
  }

  // useEffect(() => {
  //   const filtered = planets.filter((planet) => planet.name
  //     .toLowerCase().includes(name));
  //   setFilteredPlanets(filtered);
  // }, [filters, name, planets]);

  useEffect(() => {
    asyncFunc();
  }, []);

  return (
    <PlanetsContext.Provider value={ { planetsAPI } }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
