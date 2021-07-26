import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import getPlanetList from '../services/starwarsPlanetsApi';

const PlanetsProvider = ({ children }) => {
  const [data, setData] = useState();
  useEffect(() => {
    async function getAllPlanets() {
      const response = await getPlanetList();
      setData(response);
    }
    getAllPlanets();
  }, []);

  return (
    <PlanetsContext.Provider value={ data }>
      { children }
    </PlanetsContext.Provider>
  );
};

export default PlanetsProvider;

PlanetsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
