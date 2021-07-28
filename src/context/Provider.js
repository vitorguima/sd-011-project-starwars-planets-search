import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getPlanets } from '../services/PlanetsApi';
import PlanetsContext from './PlanetsContext';

function Provider({ children }) {
  const [data, setData] = useState([]);

  async function fetchPlanets() {
    const planetsAPI = await getPlanets();
    planetsAPI.results.map((result) => delete result.residents);
    setData(planetsAPI.results);
  }

  return (
    <PlanetsContext.Provider value={ { data, fetchPlanets } }>
      { children }
    </PlanetsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
