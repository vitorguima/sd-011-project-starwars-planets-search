import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filterByName, setName] = useState({ name: '' });
  const [filterByNumericValues, setNumericValues] = useState([]);

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((planets) => {
        const { results } = planets;
        results.forEach((planet) => { delete planet.residents; });
        setData(results);
      });
  }, []);

  function handleNameFilterChange({ target: { value } }) {
    setName({ name: value });
  }

  function newNumericValuesFilter() {
    const column = document.querySelector('#column-filter');
    const { value } = column;
    const comparison = document.querySelector('#comparison-filter').value;
    const Filtervalue = document.querySelector('#value-filter').value;
    setNumericValues([...filterByNumericValues, {
      column: value,
      comparison,
      value: Filtervalue,
    }]);

    const optionToRemove = document.querySelector(`#${value}`);
    column.removeChild(optionToRemove);
  }

  const contextValue = {
    contextFunctions: {
      handleNameFilterChange,
      newNumericValuesFilter,
    },
    data,
    filters: {
      filterByName,
      filterByNumericValues,
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
