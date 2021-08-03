import React, { useContext } from 'react';
import { MyContext } from '../context/MyContext';

function Filters() {
  const { filter, setFilter } = useContext(MyContext);
  return (
    <form>
      <label htmlFor="filterInput">
        <input
          data-testid="name-filter"
          id="filterInput"
          type="text"
          onChange={ ({ target }) => setFilter(target.value) }
          value={ filter }
        />
      </label>
    </form>
  );
}

export default Filters;
