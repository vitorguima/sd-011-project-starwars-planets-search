import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import * as services from '../services/Services';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filteredColumn, setFilteredColumn] = useState([]);
  const [removedFilters, setRemovedFilters] = useState([]);
  const [order, setOrder] = useState('');

  const [filters, setFilters] = useState([]);

  useEffect(() => {
    const callbackFetchPlanets = async () => {
      const result = await services.fetchPlanets();
      result.sort((a, b) => (
        a.name > b.name || (a.name === b.name) - 1
      ));
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
  };

  useEffect(() => {
    const functionSort = () => {
      const { column, radio } = order;
      switch (radio) {
      case 'ASC':
        setFilteredPlanets(planets
          .sort((a, b) => Number(a[column]) - Number(b[column])));
        break;
      case 'DESC':
        setFilteredPlanets(planets
          .sort((a, b) => Number(b[column]) - Number(a[column])));
        break;
      default:
        return planets;
      }
    };
    functionSort();
  }, [order]);

  const objToProvide = {
    order,
    setOrder,
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
