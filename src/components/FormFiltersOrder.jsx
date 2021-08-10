import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function FormFiltersOrder() {
  const {
    handleFilterName,
    selectFilter,
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
    </form>
  );
}
