import React from 'react';
import Hooks from '../Hooks';

export default function FilterInput() {
  const { filters, setFilters } = Hooks();
  const nameFilter = filters.filterByName.name;

  function handleInputChange(e) {
    setFilters({ ...filters, filterByName: { name: e.target.value } });
  }

  return (
    <div>
      <center>
        <input
          data-testid="name-filter"
          type="text"
          value={ nameFilter }
          onChange={ handleInputChange }
          className="select-css2"
          size="52"
        />
      </center>
    </div>
  );
}
