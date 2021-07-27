import React from 'react';
import Planets from '../hooks/Planets';

export default function FilterInput() {
  const { filters, setFilters } = Planets();
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
