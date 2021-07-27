import React, { useState } from 'react';
import { PlanetContext } from '../context/PlanetProvider';

export default function Order() {
  const { data, filters, setFilters } = React.useContext(PlanetContext);

  const [column, setColumn] = useState('');
  const [sort, setSort] = useState('');

  const columns = Object.keys(data[0] || {});

  const handleSetFilter = () => {
    const newFilter = {
      ...filters,
      order: {
        ...filters.order,
        column,
        sort,
      },
    };
    console.log(newFilter);
    setFilters(newFilter);
  };

  return (
    <div>
      <select
        data-testid="column-sort"
        onChange={ ({ target }) => setColumn(target.value) }
      >
        <option>selection</option>
        {columns.map((col) => (
          <option key={ col }>{col}</option>
        ))}
      </select>

      <div>
        <label htmlFor="ASC">
          ASC
          <input
            data-testid="column-sort-input-asc"
            type="radio"
            id="ASC"
            name="sort"
            value="ASC"
            onChange={ ({ target }) => setSort(target.value) }
          />
        </label>

        <label htmlFor="DSC">
          DSC
          <input
            data-testid="column-sort-input-desc"
            type="radio"
            id="DSC"
            name="sort"
            value="DSC"
            onChange={ ({ target }) => setSort(target.value) }
          />
        </label>
      </div>

      <button
        data-testid="column-sort-button"
        type="button"
        onClick={ handleSetFilter }
      >
        Definir ordenação
      </button>
    </div>
  );
}
