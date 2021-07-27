import React, { useContext, useEffect } from 'react';
import PlanetsContext from './PlanetsContext';

export default function Filters() {
  const { filters, setFilterByName, filterByName, columnFilterOptions } = useContext(PlanetsContext);
  const { filterByName: { name } } = filters;

  useEffect(() => {
    filterByName();
  }, [name]);

  const renderColumnOptions = () => {
    return (
      columnFilterOptions.map((item) => <option key={ item }>{ item }</option>)
    );
  }

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
        <select data-testid='column-filter' id="column-filter">
          {renderColumnOptions()}
        </select>
      </label>
      <label htmlFor="comparison-filter">
        <select data-testid="comparison-filter" id="comparison-filter">
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
          id="value-filter"
        />
      </label>
      <button type="button" data-testid='button-filter'>Adicionar filtro</button>
    </div>
  );
}
