import React, { useContext } from 'react';
import context from '../Context';

function DropdownInput() {
  const { filterNumbers, filterOptions } = useContext(context);

  return (
    <div>
      <select
        data-testid="column-filter"
        name="collum"
        onChange={ filterOptions }
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison"
        onChange={ filterOptions }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        name="value"
        onChange={ filterOptions }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ filterNumbers }
      >
        Filtrar
      </button>
    </div>
  );
}

export default DropdownInput;
