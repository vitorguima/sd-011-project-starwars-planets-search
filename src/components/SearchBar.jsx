import React, { useContext, useState } from 'react';
import MyContext from '../context/MyContext';

function SearchBar() {
  const { filters, setFilters } = useContext(MyContext);
  const [, setSearchText] = useState('');

  return (
    <input
      type="text"
      data-testid="name-filter"
      onChange={ ({ target }) => {
        setSearchText(target
          .value);
        setFilters({ ...filters,
          filterByName: { name: target.value } });
      } }
    />
  );
}

export default SearchBar;
