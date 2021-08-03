import React, { useContext } from 'react';
import MyContext from './context/MyContext';

function Filters() {
  const { filter, setFilter } = useContext(MyContext);
  return (
    <form>
      <label>
        <input
        data-testid='name-filter'
        type="text"
        onChange={ ({ target }) => setFilter(target.value) }
        value={ filter }
        />
      </label>
    </form>
  )
};

export default Filters;
