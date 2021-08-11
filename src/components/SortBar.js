import React from 'react';

function SortBar() {
  return (
    <forms>
      <select data-testid="column-sort">
        <option></option>
      </select>
      <input type="radio" data-testid="column-sort-input-asc" />
      <input type="radio" data-testid="column-sort-input-desc" />
      <button data-testid="column-sort-button"></button>
    </forms>

  );
}

export default SortBar;
