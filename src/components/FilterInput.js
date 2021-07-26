import React from 'react';
import usePlanets from '../hooks/usePlanets';

function FilterInput() {
  const { filters, setFilters } = usePlanets();

  const nameFilter = filters.filterByName.name;

  function handleInputChange(e) {
    setFilters({ ...filters, filterByName: { name: e.target.value } });
  }

  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        value={ nameFilter }
        onChange={ handleInputChange }
      />
    </div>
  );
}

export default FilterInput;
