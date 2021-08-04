import React, { useState, useContext, useEffect } from 'react';
import FilteredContext from '../context/FilteredContext';

function SelectFromTable() {
  const { filters, setFilters, planets, setPlanets } = useContext(FilteredContext);
  const [localValues, setLocalValues] = useState({
    column: '',
    comparison: '',
    value: 0,
  });

  const handleChange = (e) => {
    setLocalValues({
      ...localValues,
      [e.target.name]: e.target.value,
    });
  };

  function filteredForThreeValues() {
    if (filters.filterByNumericValues.length > 0) {
      filters.filterByNumericValues.forEach((v) => {
        if (v.comparison === 'maior que') {
          setPlanets(planets.filter((p) => Number(p[v.column]) > Number(v.value)));
          return planets;
        }
        if (v.comparison === 'menor que') {
          setPlanets(planets.filter((p) => Number(p[v.column]) < Number(v.value)));
          return planets;
        }
        if (v.comparison === 'igual a') {
          setPlanets(planets.filter((p) => Number(p[v.column]) === Number(v.value)));
          return planets;
        }
      });
    }
  }

  const handleClick = () => {
    setFilters({
      ...filters,
      filterByNumericValues: [...filters.filterByNumericValues, localValues],
    });
  };

  useEffect(() => {
    filteredForThreeValues();
  }, [filters]);

  const columnOptions = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const comparisonOptions = [
    'maior que',
    'menor que',
    'igual a',
  ];

  return (
    <>
      <select
        data-testid="column-filter"
        name="column"
        onChange={ handleChange }
      >
        { columnOptions
          .map((col, index) => <option value={ col } key={ index }>{ col }</option>) }
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison"
        onChange={ handleChange }
      >
        { comparisonOptions
          .map((com, index) => <option value={ com } key={ index }>{ com }</option>) }
      </select>
      <input
        data-testid="value-filter"
        name="value"
        onChange={ handleChange }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>
    </>
  );
}

export default SelectFromTable;
