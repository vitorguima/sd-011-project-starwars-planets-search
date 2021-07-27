import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import './FilterByText.css';

function FilterByText() {
  const { contextFunctions: { handleNameFilterChange } } = useContext(PlanetsContext);

  return (
    <div className="form-label filter-by-text-container">
      <label
        htmlFor="name-filter"
        className="form-label filter-by-text-label"
      >
        Filtrar pelo nome
        <input
          className="form-control"
          id="name-filter"
          type="text"
          data-testid="name-filter"
          onChange={ handleNameFilterChange }
          placeholder="Digite o nome do planeta"
        />
      </label>
    </div>
  );
}

export default FilterByText;
