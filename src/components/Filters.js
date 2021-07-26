import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/Context';

function Filters() {
  const { setFilters, filters, allColumns } = useContext(PlanetsContext);
  const { filterByNumericValues } = filters;
  const [numericFilters, setNumericFilters] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [orderFilters, setOrderFilters] = useState({
    column: 'name',
    sort: 'ASC',
  });
  const filterOptions = ['maior que', 'menor que', 'igual a'];
  const orderTypes = [
    'name',
    'rotation_period',
    'orbital_period',
    'diameter',
    'climate',
    'terrain',
    'surface_water',
    'population',
  ];

  function handleTextInput({ target }) {
    setFilters({
      ...filters,
      filterByName: {
        name: target.value,
      },
    });
  }

  function handleNumericFilters({ target }) {
    setNumericFilters({
      ...numericFilters,
      [target.name]: target.value,
    });
  }

  async function handleFilterButton() {
    await setFilters({
      ...filters,
      filterByNumericValues: [...filterByNumericValues, numericFilters],
    });
  }

  function handleOrderFilters({ target }) {
    setOrderFilters({
      ...orderFilters,
      [target.name]: target.value,
    });
  }

  function handleOrderButton() {
    setFilters({
      ...filters,
      order: orderFilters,
    });
  }

  return (
    <>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ (e) => handleTextInput(e) }
      />
      <select
        name="column"
        onChange={ (e) => handleNumericFilters(e) }
        data-testid="column-filter"
      >
        {
          allColumns.map((filter) => <option key={ filter }>{filter}</option>)
        }
      </select>
      <select
        name="comparison"
        onChange={ (e) => handleNumericFilters(e) }
        data-testid="comparison-filter"
      >
        {filterOptions
          .map((filter) => <option key={ filter }>{filter}</option>)}
      </select>
      <input
        data-testid="value-filter"
        type="number"
        name="value"
        onChange={ (e) => handleNumericFilters(e) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => handleFilterButton() }
      >
        Filtrar
      </button>
      <select
        name="column"
        onChange={ (e) => handleOrderFilters(e) }
        data-testid="column-sort"
      >
        {orderTypes
          .map((filter) => <option key={ `${filter}-order` }>{filter}</option>)}
      </select>
      <label htmlFor="ASC">
        Crescente
        <input
          type="radio"
          data-testid="column-sort-input-asc"
          value="ASC"
          id="ASC"
          name="sort"
          onChange={ (e) => handleOrderFilters(e) }
        />
      </label>
      <label htmlFor="DESC">
        Decrescente
        <input
          type="radio"
          data-testid="column-sort-input-desc"
          value="DESC"
          id="DESC"
          onChange={ (e) => handleOrderFilters(e) }
          name="sort"
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => handleOrderButton() }
      >
        Ordenar
      </button>
    </>
  );
}

export default Filters;
