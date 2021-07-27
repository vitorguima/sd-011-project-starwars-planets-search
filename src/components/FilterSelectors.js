import React, { useState } from 'react';
import usePlanets from '../hooks/usePlanets';

function FilterSelectors() {
  const {
    addFilterByNumericValues,
    availableFilterColumns,
    filters,
    removeFilter,
  } = usePlanets();

  const [column, setColumn] = useState(availableFilterColumns[0]);
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('');

  const { filterByNumericValues } = filters;

  function handleApplyFilter() {
    addFilterByNumericValues({
      column,
      comparison,
      value,
    });
    setValue('');
    setColumn(
      availableFilterColumns[0] === column
        ? availableFilterColumns[1]
        : availableFilterColumns[0],
    );
  }

  return (
    <>
      { filterByNumericValues.map((filter) => (
        <p key={ filter.column } data-testid="filter">
          <span>{filter.column}</span>
          <span>{filter.comparison}</span>
          <span>{filter.value}</span>
          <button type="button" onClick={ () => removeFilter(filter.column) }>X</button>
        </p>

      ))}
      <form>
        <select
          name="column"
          value={ column }
          onChange={ (e) => setColumn(e.target.value) }
          data-testid="column-filter"
        >
          {availableFilterColumns.map((filterColumn) => (
            <option key={ filterColumn } value={ filterColumn }>{filterColumn}</option>
          ))}
        </select>
        <select
          name="comparison"
          value={ comparison }
          onChange={ (e) => setComparison(e.target.value) }
          data-testid="comparison-filter"
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          name="value"
          value={ value }
          onChange={ (e) => setValue(e.target.value) }
          type="number"
          data-testid="value-filter"
        />
        <button
          onClick={ handleApplyFilter }
          type="button"
          data-testid="button-filter"
        >
          Filtrar
        </button>
      </form>
    </>
  );
}

export default FilterSelectors;
