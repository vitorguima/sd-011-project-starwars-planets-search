import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function OrderColumns() {
  const { sortColumn, sort, setSortColumn, setSort, sortColumns, theRender } = useContext(PlanetsContext);
  const allColumns = ['name', 'population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  console.log(sortColumn, sort);
  return (
    <div className="container">
      <label htmlFor="column-selector">
        <select
          onClick={ ({ currentTarget }) => setSortColumn(currentTarget.value) }
          data-testid="column-sort"
        >
          {allColumns.map((item, index) => (
            <option key={ index } value={ item }>
              { item }
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="ASC">
        ASC
        <input
          type="radio"
          name="sort"
          value="asc"
          onClick={ ({ target }) => setSort(target.value) }
          data-testid="column-sort-input-asc"
        />
      </label>
      <label htmlFor="DESC">
        DESC
        <input
          type="radio"
          name="sort"
          value="desc"
          onClick={ ({ target }) => setSort(target.value) }
          data-testid="column-sort-input-desc"
        />
      </label>
      <button
        type="button"
        onClick={ () => sortColumns(sortColumn, sort, theRender) }
        data-testid="column-sort-button"
      >
        Sort
      </button>
    </div>
  );
}
