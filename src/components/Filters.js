import React, { useContext } from 'react';
import Context from '../context/Context';

function Filters() {
  const { setNameFilter } = useContext(Context);
  return (
    <input
      data-testid="name-filter"
      onKeyUp={ ({ target }) => setNameFilter(target.value) }
      onChange={ ({ target }) => setNameFilter(target.value) }
    />
  );
}

export default Filters;
