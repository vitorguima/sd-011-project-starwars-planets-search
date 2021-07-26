import React, { useContext } from 'react';
import Context from '../context/Context';

function Filters() {
  const { dataFilters, setDataFilters } = useContext(Context);

  function handleNameFilter({ target }) {
    const { value } = target;
    setDataFilters({
      ...dataFilters,
      filters: {
        filterByName: {
          name: value,
        },
      },
    });
  }

  return (
    <div>
      <label htmlFor="name">
        Name:
        <input
          type="text"
          data-testid="name-filter"
          name="name"
          onChange={ handleNameFilter }
        />
      </label>
    </div>
  );
}

export default Filters;
