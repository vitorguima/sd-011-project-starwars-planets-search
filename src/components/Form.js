import React, { useContext, useState } from 'react';

import PlanetsContext from '../context/PlanetsContext';

function handleInput(setName) {
  return (
    <label htmlFor="inputSearch">
      { 'Buscar: ' }
      <input
        placeholder="Digite o nome do planeta"
        data-testid="name-filter"
        id="inputSearch"
        onChange={ (e) => setName(e.target.value) }
      />
    </label>
  );
}

function filtersListItems(list, setFilters) {
  return list.map((filter) => (
    <div data-testid="filter" key={ filter.column }>
      <p>{ `${filter.column} ${filter.comparison} ${filter.value}` }</p>
      <button
        type="button"
        onClick={ () => setFilters(list
          .filter((item) => item.column !== filter.column)) }
      >
        X
      </button>
    </div>
  ));
}

function handleFilters(setFiltersValues, filters, filtersInputs, setFiltersInputs) {
  const { column, comparison, value } = filtersInputs;
  const { filterByNumericValues } = filters;
  const listSelectColumn = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  return (
    <fieldset>

      <label htmlFor="select-column">
        { 'Coluna: ' }
        <select
          value={ column }
          onChange={ (e) => setFiltersInputs(
            { ...filtersInputs, column: e.target.value },
          ) }
          data-testid="column-filter"
          id="select-column"
        >
          { listSelectColumn
            .filter((item) => !(filterByNumericValues
              .some((filter) => filter.column === item)))
            .map((itemColumn) => <option key={ itemColumn }>{ itemColumn }</option>) }
        </select>
      </label>

      <label htmlFor="select-comparison">
        { 'Comparação: ' }
        <select
          value={ comparison }
          onChange={ (e) => setFiltersInputs(
            { ...filtersInputs, comparison: e.target.value },
          ) }
          data-testid="comparison-filter"
          id="select-comparison"
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
      </label>

      <label htmlFor="input-filter">
        { 'Valor: ' }
        <input
          type="number"
          value={ value }
          onChange={ (e) => setFiltersInputs(
            { ...filtersInputs, value: e.target.value },
          ) }
          data-testid="value-filter"
          id="input-filter"
        />
      </label>

      <button
        type="button"
        data-testid="button-filter"
        disabled={ (!column || !comparison || !value) }
        onClick={ () => {
          setFiltersValues([...filterByNumericValues, filtersInputs]);
          setFiltersInputs({ column: '', comparison: '', value: '' });
        } }
      >
        Filtrar
      </button>

      { filtersListItems(filterByNumericValues, setFiltersValues) }

    </fieldset>
  );
}

function Form() {
  const [filtersInputs, setFiltersInputs] = useState(
    {
      column: '',
      comparison: '',
      value: '',
    },
  );
  const { setName, setFiltersValues, filters } = useContext(PlanetsContext);

  return (
    <div>
      { handleInput(setName) }
      { handleFilters(setFiltersValues, filters, filtersInputs, setFiltersInputs) }
    </div>
  );
}

export default Form;
