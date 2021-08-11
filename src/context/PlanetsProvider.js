import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import * as services from '../services/Services';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filteredColumn, setFilteredColumn] = useState([]);
  const [removedFilters, setRemovedFilters] = useState([]);

  const [filters, setFilters] = useState([]);

  useEffect(() => {
    const callbackFetchPlanets = async () => {
      const result = await services.fetchPlanets();
      setPlanets(result);
      setFilteredColumn(result);
    };
    callbackFetchPlanets();
  }, []);

  const handleFilterByName = (param) => {
    setFilteredPlanets(filteredColumn
      .filter((planet) => planet.name.includes(param)));
  };

  const handleFilterByColumn = ({ fieldColumn, comparison, inputValue }) => {
    setRemovedFilters([...removedFilters, fieldColumn]);
    switch (comparison) {
    case 'maior que':
      setFilteredColumn(filteredColumn
        .filter((planet) => planet[fieldColumn] > parseInt(inputValue, 10)));
      break;
    case 'menor que':
      setFilteredColumn(filteredColumn
        .filter((planet) => planet[fieldColumn] < parseInt(inputValue, 10)));
      break;
    case 'igual a':
      setFilteredColumn(filteredColumn
        .filter((planet) => inputValue === planet[fieldColumn]));
      break;
    default:
    }
    // document.getElementById(fieldColumn).remove();
  };

  const objToProvide = {
    filters,
    setFilters,
    planets,
    setRemovedFilters,
    filteredPlanets,
    filteredColumn,
    setFilteredColumn,
    removedFilters,
    handleFilterByName,
    handleFilterByColumn,
  };

  return (
    <PlanetsContext.Provider value={ objToProvide }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.Props,
}.isRequired;

export default PlanetsProvider;
