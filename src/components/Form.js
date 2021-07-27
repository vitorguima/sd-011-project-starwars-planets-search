import React, { useContext, useState } from 'react';

import PlanetsContext from '../context/PlanetsContext';

function handleInput(setName) {
  return (
    <label htmlFor="inputSearch">
      { 'Buscar: ' }
      <input
        data-testid="name-filter"
        id="inputSearch"
        onChange={ (e) => setName(e.target.value) }
        placeholder="Insert Planet"
      />
    </label>
  );
}

function filterValues(setFiltersValues, filters, setFilters) {
  return (
    <fieldset className="setfield-filter">
      <legend>Filtros</legend>
      <label htmlFor="select-column">
        { 'Coluna: ' }
        <select
          onChange={ (e) => setFilters(
            { ...filters, column: e.target.value },
          ) }
          data-testid="column-filter"
          id="select-column"
        >
          <option>{ null }</option>
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
        </select>
      </label>

      <label htmlFor="select-comparison">
        { 'Comparação: ' }
        <select
          onChange={ (e) => setFilters(
            { ...filters, comparison: e.target.value },
          ) }
          data-testid="comparison-filter"
          id="select-comparison"
        >
          <option>{ null }</option>
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
      </label>

      <label htmlFor="input-filter">
        { 'Valor: ' }
        <input
          onChange={ (e) => setFilters(
            { ...filters, value: e.target.value },
          ) }
          data-testid="value-filter"
          id="input-filter"
          type="number"
        />
      </label>

      <button
        data-testid="button-filter"
        onClick={ () => setFiltersValues(filters) }
        type="button"
      >
        Filtrar
      </button>

    </fieldset>
  );
}

function Form() {
  const [filters, setFilters] = useState(
    {
      column: '',
      comparison: '',
      value: '',
    },
  );
  const { setName, setFiltersValues } = useContext(PlanetsContext);

  return (
    <div className="container-filters">
      { handleInput(setName) }
      { filterValues(setFiltersValues, filters, setFilters) }
    </div>
  );
}

export default Form;
