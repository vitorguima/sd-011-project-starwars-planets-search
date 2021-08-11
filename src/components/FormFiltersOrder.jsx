import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function FormFiltersOrder() {
  const {
    addFilter,
    selectFilter,
    handleFilterName,
    handleFilterNumericValues,
  } = useContext(PlanetsContext);

  const { filterByName: { name },
    filterByNumericValues } = selectFilter.filters;

  const columnsOptions = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const selectedColumns = filterByNumericValues.map(
    (numericFilter) => numericFilter.column,
  );

  const filteredColumns = columnsOptions.filter(
    (column) => !selectedColumns.includes(column),
  );

  return (
    <form>
      <label htmlFor="name-filter">
        <input
          type="text"
          id="name-filter"
          value={ name }
          onChange={ handleFilterName }
          data-testid="name-filter"
        />
      </label>

      <select
        data-testid="column-filter"
        name="column"
        onChange={ handleFilterNumericValues }
      >
        { filteredColumns.map((column) => (
          <option
            key={ column }
            value={ column }
          >
            { column }
          </option>
        )) }
      </select>

      <select
        data-testid="comparison-filter"
        name="comparison"
        onChange={ handleFilterNumericValues }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <label htmlFor="value-filter">
        <input
          type="number"
          id="value-filter"
          name="value"
          onChange={ handleFilterNumericValues }
          data-testid="value-filter"
        />
      </label>

      <button
        type="button"
        onClick={ addFilter }
        data-testid="button-filter"
      >
        Add filter
      </button>
    </form>
  );
}
