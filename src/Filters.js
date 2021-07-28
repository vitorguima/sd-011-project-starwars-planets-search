import React, { useContext, useEffect } from 'react';
import PlanetsContext from './PlanetsContext';

export default function Filters() {
  const {
    filters,
    setFilterByName,
    applyFilters,
    columnFilterOptions,
    newFilter,
    handleChangeNewFilter,
    setFilterByNumericValues,
    removeFilterByNumericValues,
  } = useContext(PlanetsContext);

  const { filterByName: { name }, filterByNumericValues } = filters;
  const { column, comparison, value } = newFilter;

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const renderColumnOptions = () => (
    columnFilterOptions.map((item) => <option key={ item }>{ item }</option>)
  );

  const renderFilters = () => filterByNumericValues.map((item) => (
    <div key={ item.column } data-testid="filter">
      <p>
        {item.column}
        {' '}
        {item.comparison}
        {' '}
        {item.value}
      </p>
      <button
        type="button"
        onClick={ () => removeFilterByNumericValues(item.column) }
      >
        X
      </button>
    </div>
  ));

  return (
    <div>

      <label htmlFor="search-input">
        Pesquisa:
        <input
          type="text"
          data-testid="name-filter"
          id="search-input"
          value={ name }
          onChange={ (event) => setFilterByName(event.target.value) }
        />
      </label>
      <label htmlFor="column-filter">
        <select
          data-testid="column-filter"
          name="column"
          id="column-filter"
          value={ column }
          onChange={ handleChangeNewFilter }
        >
          {renderColumnOptions()}
        </select>
      </label>
      <label htmlFor="comparison-filter">
        <select
          data-testid="comparison-filter"
          name="comparison"
          id="comparison-filter"
          value={ comparison }
          onChange={ handleChangeNewFilter }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
      </label>
      <label htmlFor="value-filter">
        valor:
        <input
          type="number"
          data-testid="value-filter"
          name="value"
          id="value-filter"
          value={ value }
          onChange={ handleChangeNewFilter }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ setFilterByNumericValues }
      >
        Adicionar filtro
      </button>
      {renderFilters()}
    </div>
  );
}
