import React from 'react';
// import PropTypes from 'prop-types';

function ColumnFilter() {
  const optionsForFilter = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water'];

  return (
    <label htmlFor="column-filter">
      <select id="column-filter" data-testid="column-filter">
        {optionsForFilter.map((option) => (
          <option key={ option }>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export default ColumnFilter;
