import React from 'react';

function FilterBar() {
  return (
    <div>
      <label htmlFor="search-name">
        <input
          type="text"
          name="search-name"
          placeholder="Pesquise pelo nome"
        />
      </label>
    </div>

  );
}

export default FilterBar;
