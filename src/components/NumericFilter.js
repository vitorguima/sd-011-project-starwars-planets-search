import React, {} from 'react';
import { MyContext } from '../context/MyContext';

function NumericFilter() {
  return (
    <div>
      <select data-testid="column-filter">
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
    </div>
  );
}

export default NumericFilter;
