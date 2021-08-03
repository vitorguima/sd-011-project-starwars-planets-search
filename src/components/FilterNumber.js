import React from 'react';

function FilterNumber() {
  return (
    <div>
      <select id="itens" data-testid="column-filter">
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select id="comparison" data-testid="comparison-filter">
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input data-testid="value-filter" placeholder="Digite o valor" />
      <button type="button" data-testid="button-filter">
        filtrar
      </button>
    </div>
  );
}

export default FilterNumber;
