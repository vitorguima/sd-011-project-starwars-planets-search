import React from 'react';
import usePlanets from '../hooks/usePlanets';

function OrderSelector() {
  const columns = [
    'name',
    'rotation_period',
    'orbital_period',
    'diameter',
    'climate',
    'gravity',
    'terrain',
    'surface_water',
    'population',
  ];

  const { order: { column, sort }, setOrder } = usePlanets();

  function handleOptionChange(e) {
    setOrder({
      column,
      sort: e.target.value,
    });
  }

  function handleColumnChange(e) {
    setOrder({
      column: e.target.value,
      sort,
    });
  }

  return (
    <form>
      <select data-testid="column-sort" value={ column } onChange={ handleColumnChange }>
        {columns.map((columnName) => (
          <option key={ columnName } value={ columnName }>{columnName}</option>
        ))}
      </select>
      <label htmlFor="ASC">
        <input
          id="ASC"
          data-testid="column-sort-input-asc"
          type="radio"
          value="ASC"
          checked={ sort === 'ASC' }
          onChange={ handleOptionChange }
        />
        ASC
      </label>
      <label htmlFor="DESC">
        <input
          id="DESC"
          type="radio"
          data-testid="column-sort-input-desc"
          value="DESC"
          checked={ sort === 'DESC' }
          onChange={ handleOptionChange }
        />
        DESC
      </label>
      <button type="button" data-testid="column-sort-button">Ordenar</button>
    </form>
  );
}

export default OrderSelector;
