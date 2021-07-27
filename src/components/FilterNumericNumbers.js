import React, { useState } from 'react';
import { useAuth } from '../providers/auth';

function FilterNumericNumbers() {
  const { filters, setFilters } = useAuth();
  const [colFilters, setColFilters] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const defaultFilters = {
    column: 'population',
    comparison: 'maior que',
    value: '0',
  };

  const addFiltersToGlobalStateAndRemoveLocal = (event) => {
    console.log(event.target.value);
    setColFilters([
      colFilters.filter((person) => person !== event.target.value),
    ]);
  };

  return (
    <div>
      <select testid="column-filter" onChange={ addFiltersToGlobalStateAndRemoveLocal }>
        {colFilters.map((colFil, index) => (
          <option key={ index }>
            {colFil}
          </option>
        ))}
      </select>
      <select data-testid="comparison-filter">
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input type="number" data-testid="value-filter" />
      <button type="button" data-testid="button-filter">
        search
      </button>
    </div>
  );
}

export default FilterNumericNumbers;
