import React from 'react';

import { useTable } from '../contexts/TableContext';

export default function Filter() {
  const {
    filters,
    column,
    comparison,
    value,
    setFilters,
    setColumn,
    setComparison,
    setValue,
  } = useTable();
  return (
    <div>
      <input
        type="text"
        onChange={ (event) => setFilters({
          type: 'NAME',
          payload: event.target.value,
        }) }
        value={ filters.filterByName.name }
        data-testid="name-filter"
        placeholder="Digite o nome do planeta"
      />
      {
        filters.filterByNumericValues.length !== 0
          ? (filters.filterByNumericValues.map((values, index) => (
            <button
              type="button"
              key={ index }
              onClick={ (event) => setFilters({
                type: 'VALUE_REMOVE',
                payload: event.target.value,
              }) }
              value={ values.column }
            >
              {values.column}
            </button>
          )))
          : (
            <p>sem filtros</p>
          )
      }
      <form
        onSubmit={ (event) => {
          event.preventDefault();
          setFilters({
            type: 'VALUE_ADD',
            payload: {
              column,
              comparison,
              value,
            },
          });
        } }
      >
        <label htmlFor="column">
          <select
            data-testid="column-filter"
            id="column"
            value={ column }
            onChange={ (event) => setColumn(event.target.value) }
          >
            {
              filters.filterColumns.map((item, index) => (
                <option key={ index } value={ item }>{ item }</option>
              ))
            }
          </select>
        </label>

        <label htmlFor="comparison">
          <select
            data-testid="comparison-filter"
            id="comparison"
            onChange={ (event) => setComparison(event.target.value) }
          >
            <option value="maior que">maior que</option>
            <option value="igual a">igual a</option>
            <option value="menor que">menor que</option>
          </select>
        </label>

        <label htmlFor="value">
          <input
            data-testid="value-filter"
            type="text"
            value={ value }
            onChange={ (event) => setValue(event.target.value) }
          />
        </label>
        <button type="submit" data-testid="button-filter">filtrar</button>
      </form>
    </div>
  );
}
