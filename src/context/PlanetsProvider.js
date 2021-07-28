import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import testData from '../testData';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filterByName, setName] = useState({ name: '' });
  const [filterByNumericValues, setNumericValues] = useState([]);
  const [columnFiltersAvailable, setColumnFilters] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [order, setOrder] = useState({ column: 'name', sort: 'ASC' });

  useEffect(() => {
    const FETCH_SUCCESS = 200;
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => (
        response.status === FETCH_SUCCESS ? response.json() : testData))
      .then((planets) => {
        const { results } = planets;
        results.forEach((planet) => { delete planet.residents; });
        setData(results);
      });
  });

  function handleNameFilterChange({ target: { value } }) {
    setName({ name: value });
  }

  function newNumericValuesFilter() {
    const column = document.querySelector('#column-filter').value;
    const comparison = document.querySelector('#comparison-filter').value;
    const Filtervalue = document.querySelector('#value-filter').value;
    setNumericValues([...filterByNumericValues, {
      column,
      comparison,
      value: Filtervalue,
    }]);
    setColumnFilters(
      columnFiltersAvailable.filter((columnFilter) => columnFilter !== column),
    );
  }

  function removeNumericValuesFilter({ target: { id } }) {
    setNumericValues(
      filterByNumericValues.filter(({ column }) => id !== column),
    );
    setColumnFilters([...columnFiltersAvailable, id]);
  }

  function newOrderSort(newColumn, newSort) {
    setOrder({ column: newColumn, sort: newSort });
  }

  const contextValue = {
    contextFunctions: {
      handleNameFilterChange,
      newNumericValuesFilter,
      removeNumericValuesFilter,
      newOrderSort,
    },
    data,
    filters: {
      filterByName,
      filterByNumericValues,
      columnFiltersAvailable,
      order,
    },
  };

  return (
    <PlanetsContext.Provider value={ contextValue }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default PlanetsProvider;
