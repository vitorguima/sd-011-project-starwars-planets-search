import React, { useState, useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function NumericFilter() {
  const [numericFilter, setNumericFilter] = useState({
    column: 'population',
    comparison: 'maiorQue',
    value: '0',
  });

  const { handleNumericFilter, filters } = useContext(PlanetsContext);

  function onColumnChange({ target: { value } }) {
    setNumericFilter({ ...numericFilter, column: value });
  }

  function onComparisonChange({ target: { value } }) {
    setNumericFilter({ ...numericFilter, comparison: value });
  }

  function onValueChange({ target: { value } }) {
    setNumericFilter({ ...numericFilter, value });
  }

  const initialColumns = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const [columns, setColumns] = useState(initialColumns);

  useEffect(() => {
    const { filterByNumericValues } = filters;
    let filteredColumns = [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ];

    if (filterByNumericValues.length > 0) {
      filterByNumericValues.forEach(({ column: col }) => {
        filteredColumns = (filteredColumns.filter((column) => (
          column !== col
        )));
      });
    }
    setColumns(filteredColumns);
    setNumericFilter({ column: filteredColumns[0], comparison: 'maiorQue', value: '0' });
  }, [filters]);

  return (
    <form>
      <select data-testid="column-filter" onChange={ (e) => onColumnChange(e) }>
        {columns.map((column) => (
          <option value={ column } key={ column }>{column}</option>))}
      </select>

      <select data-testid="comparison-filter" onChange={ (e) => onComparisonChange(e) }>
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        type="number"
        data-testid="value-filter"
        onChange={ (e) => onValueChange(e) }
      />

      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => handleNumericFilter(numericFilter) }
      >
        Filtrar
      </button>
    </form>
  );
}
