import React, { useContext } from 'react';
import PlanetsContext from '../contexts/PlanetsContext';

function FiltersForm() {
  const { filters, setFilters } = useContext(PlanetsContext);
  const { filterByName: { name } } = filters;

  function changeNameFilter({ target }) { // Controla o campos de <FiltersForm /> com App.js via Contexto
    const { value } = target;
    setFilters({
      ...filters,
      filterByName: { name: value },
    });
  }

  function changeColumnFilter({ target }) { // Controla o campos de <FiltersForm /> com App.js via Contexto
    const { value } = target;
    setFilters({
      ...filters,
      filterByName: { name: value },
    });
  }

  function changeComparisonFilter({ target }) { // Controla o campos de <FiltersForm /> com App.js via Contexto
    const { value } = target;
    setFilters({
      ...filters,
      filterByName: { name: value },
    });
  }

  function changeValueFilter({ target }) { // Controla o campos de <FiltersForm /> com App.js via Contexto
    const { value } = target;
    setFilters({
      ...filters,
      filterByName: { name: value },
    });
  }

  function clickNumberFilter({ target }) { // Controla o campos de <FiltersForm /> com App.js via Contexto
    const { value } = target;
    setFilters({
      ...filters,
      filterByName: { name: value },
    });
  }

  function renderNumberFilter() {
    return (
      <fieldset>
        <legend>
          <h4> By Others </h4>
        </legend>
        <select
          id="columnFilter"
          data-testid="column-filter"
          name="columns"
          // value={ selectedGenre }
          onChange={ (ev) => changeColumnFilter(ev) }
        >

          <option value="population">Population</option>
          <option value="orbital_period">Orbital Period</option>
          <option value="diameter">Diameter</option>
          <option value="rotation_period">Rotation Period</option>
          <option value="surface_water">Surface Water</option>
        </select>
        &nbsp;  &nbsp;
        <select
          id="comparisonFilter"
          data-testid="comparison-filter"
          name="comparison"
          // value={ selectedGenre }
          onChange={ (ev) => changeComparisonFilter(ev) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        &nbsp;  &nbsp;
        <input
          placeholder="value"
          type="number"
          data-testid="value-filter"
          name="value"
          id="valueFilter"
          value={ name }
          onChange={ (ev) => changeValueFilter(ev) }
        />
      &nbsp;  &nbsp;
        <button
          data-testid="button-filter"
          type="button"
          onClick={ () => clickNumberFilter() }
        >
          Adicionar Filter
        </button>
      </fieldset>
    );

    // {
    //   column: 'population',
    //   comparison: 'maior que',
    //   value: '100000',
    // },
  }

  return (
    <div>
      <form data-testid="search-bar-form">
        <fieldset>
          <legend><h2>Filtros de Busca</h2></legend>
          <label htmlFor="text-input">
            By Name: &nbsp;
            <input
              type="text"
              data-testid="name-filter"
              name="filterByName"
              id="text-input"
              value={ name }
              onChange={ (ev) => changeNameFilter(ev) }
            />
          </label>
          &nbsp;  &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp;
          {renderNumberFilter()}
        </fieldset>
      </form>
      <br />
    </div>
  );
}

export default FiltersForm;
