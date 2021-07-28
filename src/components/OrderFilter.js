import React, { useContext } from 'react';
import Context from '../context/Context';

export default function OrderFilter() {
  const {
    orderColumn: column,
    setOrderColumn,
    sort,
    setSort,
    setOrderFilter,
  } = useContext(Context);

  const filters = ['name',
    'rotation_period',
    'orbital_period',
    'diameter',
    'climate',
    'gravity',
    'terrain',
    'surface_water',
    'population',
    'created',
    'edited',
    'url'];

  return (
    <>
      <select
        onChange={ ({ target }) => setOrderColumn(target.value) }
        data-testid="column-sort"
      >
        { filters.map((actualFilter, i) => (
          <option key={ i } value={ actualFilter }>{actualFilter}</option>
        )) }
      </select>
      <div>
        <p>Type</p>
        <label htmlFor="ASC">
          Ascending
          <input
            data-testid="column-sort-input-asc"
            type="radio"
            name="sort"
            id="ASC"
            value="ASC"
            onChange={ () => setSort('ASC') }
          />
        </label>
        <label htmlFor="DESC">
          Descending
          <input
            data-testid="column-sort-input-desc"
            type="radio"
            name="sort"
            id="DESC"
            value="DESC"
            onChange={ () => setSort('DESC') }
          />
        </label>
      </div>
      <button
        data-testid="column-sort-button"
        type="button"
        onClick={ () => setOrderFilter({ column, sort }) }
      >
        Order
      </button>
    </>
  );
}
