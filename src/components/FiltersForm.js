import React, { useContext, useState, useEffect } from 'react';
import PlanetsContext from '../contexts/PlanetsContext';

function FiltersForm() {
  const { filters, setFilters, choosenPlanets } = useContext(PlanetsContext);
  const { filterByName: { name } } = filters;

  function changeFilterName({ target }) { // Controla o campos de <FiltersForm /> com App.js via Contexto
    const { value } = target;
    setFilters({
      ...filters,
      filterByName: { name: value },
    });
  }

  return (
    <div>
      <form data-testid="search-bar-form">
        <label data-testid="text-input-label" htmlFor="text-input">
          Inclui o texto:
          <input
            type="text"
            data-testid="text-input"
            name="filterByName"
            id="text-input"
            value={ name }
            onChange={ (ev) => changeFilterName(ev) }
          />
        </label>
          {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <label data-testid="checkbox-input-label" htmlFor="checkbox-input">
          <input
            type="checkbox"
            data-testid="checkbox-input"
            name="bookmarkedOnly"
            id="checkbox-input"
            checked={ bookmarkedOnly }
            onChange={ onBookmarkedChange }
          />
          Mostrar somente favoritos
        </label>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <label data-testid="select-input-label" htmlFor="select-input">
          Filtrar por gênero
          <select
            data-testid="select-input"
            name="selectedGenre"
            value={ selectedGenre }
            onChange={ onSelectedGenreChange }
          >
            <option value="" data-testid="select-option">Todos</option>
            <option value="action" data-testid="select-option">Ação</option>
            <option value="comedy" data-testid="select-option">Comédia</option>
            <option value="thriller" data-testid="select-option">Suspense</option>
          </select>
        </label> */}
      </form>
    </div>
  );
}

export default FiltersForm;
