import React, { useContext } from 'react';
import Context from '../Context/Context';

function NameFilter() {
  const { setFilters, filters } = useContext(Context);
  console.log(filters);
  return (
    <input
      type="text"
      value={ filters.filterByName.name }
      data-testid="name-filter"
      onChange={ ({ target: { value } }) => {
        setFilters({ ...filters, filterByName: { name: value } });
      } }
    />
  );
}

export default NameFilter;
