import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import * as services from '../services/Services';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filteredColumn, setFilteredColumn] = useState([]);

  useEffect(() => {
    const callbackFetchPlanets = async () => {
      const result = await services.fetchPlanets();
      setPlanets(result);
    };
    callbackFetchPlanets();
  }, []);

  const handleFilterByName = (param) => {
    setFilteredPlanets(planets
      .filter((planet) => planet.name.includes(param)));
  };

  const handleFilterByColumn = ({ fieldColumn, fieldComparison, fieldInputValue }) => {
    switch (fieldComparison) {
    case 'maior que':
      setFilteredColumn(planets
        .filter((planet) => planet[fieldColumn] > parseInt(fieldInputValue, 10)));
      console.log('maior', filteredColumn);
      break;
    case 'menor que':
      setFilteredColumn(planets
        .filter((planet) => planet[fieldColumn] < parseInt(fieldInputValue, 10)));
      console.log('menor');
      break;
    case 'igual a':
      setFilteredColumn(planets
        .filter((planet) => fieldInputValue === planet[fieldColumn]));
      console.log('=');
      break;
    default:
    }
  };
  const objToProvide = {
    planets,
    filteredPlanets,
    filteredColumn,
    handleFilterByName,
    handleFilterByColumn,
  };

  return (
    <PlanetsContext.Provider value={ objToProvide }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.Props,
}.isRequired;

export default PlanetsProvider;
