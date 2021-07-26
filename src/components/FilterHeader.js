import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function FilterHeader() {
  const {
    contextFunctions: {
      handleNameFilterChange,
      newNumericValuesFilter,
    },
    filters: {
      columnFiltersAvailable,
    },
  } = useContext(PlanetsContext);

  return (
    <header>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ handleNameFilterChange }
        placeholder="Filtrar pelo nome"
      />
      <select id="column-filter" data-testid="column-filter">
        { columnFiltersAvailable.map((column, index) => (
          <option key={ index }>{ column }</option>
        )) }
      </select>
      <select id="comparison-filter" data-testid="comparison-filter">
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
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
