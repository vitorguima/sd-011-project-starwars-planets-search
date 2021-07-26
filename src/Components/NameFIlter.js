import React, { useContext } from 'react';
import Context from '../Context/Context';

function NameFilter() {
  const { setFilters, filters: { filterByName: { name } } } = useContext(Context);
  console.log(setFilters);
  return (
    <input
      type="text"
      value={ name }
      data-testid="name-filter"
      onChange={ ({ target: { value } }) => {
        setFilters({ filterByName: { name: value } });
      } }
    />
  );
}

export default NameFilter;
