import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function FilterHeader() {
  const { contextFunctions: {
    handleNameFilterChange,
    newNumericValuesFilter,
  } } = useContext(PlanetsContext);
  return (
    <header>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ handleNameFilterChange }
        placeholder="Filtrar pelo nome"
      />
      <select id="column-filter" data-testid="column-filter">
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      <select id="comparison-filter" data-testid="comparison-filter">
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        type="number"
        id="value-filter"
        data-testid="value-filter"
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ newNumericValuesFilter }
      >
        Adicionar Filtro
      </button>
    </header>
  );
}

export default FilterHeader;
