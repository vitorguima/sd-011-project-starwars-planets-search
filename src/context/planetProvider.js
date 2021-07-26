import React, { useState } from 'react';
import { object } from 'prop-types';

import fetchPlanets from '../services/fetchPlanets';

import PlanetContext from './planetContext';

function PlanetProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  async function getPlanetsApi() {
    const result = await fetchPlanets();
    setPlanets(result);
  }

  return (
    <PlanetContext.Provider value={ { planets, setPlanets, getPlanetsApi } }>
      { children }
    </PlanetContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: object,
}.isRequired;

export default PlanetProvider;
