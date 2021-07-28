import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function FormSort() {
  const { onClickButtonSort } = useContext(StarWarsContext);

  const initialSortColumns = { columnSort: 'name', sort: 'ASC' };
  const [sortColumns, setSortColumns] = useState(initialSortColumns);

  function handleSortOnChange({ target: { name, value } }) {
    setSortColumns({ ...sortColumns, [name]: value });
  }

  const { columnSort, sort } = sortColumns;
  const listSort = [
    'name',
    'rotation_period',
    'orbital_period',
    'diameter',
    'climate',
    'terrain',
    'gravity',
    'surface_water',
    'population',
  ];

  return (
    <form>
      <label htmlFor="columnSort">
        <select
          name="columnSort"
          onChange={ handleSortOnChange }
          data-testid="column-sort"
          value={ columnSort }
        >
          { listSort.map((item) => (
            <option key={ item } value={ item }>{ item }</option>
          ))}
        </select>
      </label>
      <label htmlFor="sort">
        <input
          data-testid="column-sort-input-asc"
          type="radio"
          name="sort"
          value="ASC"
          onChange={ handleSortOnChange }
        />
        Crescente
        <input
          data-testid="column-sort-input-desc"
          type="radio"
          name="sort"
          value="DESC"
          onChange={ handleSortOnChange }
        />
        Decrescente
      </label>
      <button
        data-testid="column-sort-button"
        type="button"
        onClick={ () => onClickButtonSort(columnSort, sort) }
      >
        Ordenar
      </button>
    </form>
  );
}

export default FormSort;
