import React, { useContext } from 'react';
import Context from '../context/Context';

export default function NameFilter() {
  const {
    setNameFilter,
    filters: { filterByName: { name } },
  } = useContext(Context);
  return (
    <input
      data-testid="name-filter"
      value={ name }
      onKeyUp={ ({ target }) => setNameFilter(target.value) }
      onChange={ ({ target }) => setNameFilter(target.value) }
    />
  );
}
