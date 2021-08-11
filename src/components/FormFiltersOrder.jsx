import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function FormFiltersOrder() {
  const {
    addFilter,
    selectFilter,
    handleFilterName,
    handleFilterNumericValues,
  } = useContext(PlanetsContext);

  const { name } = selectFilter.filters.filterByName;

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
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
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
