import React from 'react';
import Hooks from '../Hooks';

export default function FilterInput() {
  const { filters, setFilters } = Hooks();
  const nameFilter = filters.filterByName.name;

  function handleInputChange(e) {
    setFilters({ ...filters, filterByName: { name: e.target.value } });
  }

  return (
    <center>
      <div>
        <input
          data-testid="name-filter"
          type="text"
          value={ nameFilter }
          onChange={ handleInputChange }
        />
      </div>
    </center>
  );
}
