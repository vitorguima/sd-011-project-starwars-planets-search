import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function SearchInput() {
  const [handleSearcher, setHandleSearcher] = useState('');
  const { setFilters, filters } = useContext(PlanetsContext);

  function handleSearchingWhileFiltering({ target }) {
    setHandleSearcher(target.value);
    setFilters({ ...filters, filterByName: { name: target.value } });
  }

  return (
    <input
      type="text"
      data-testid="name-filter"
      onChange={ (event) => handleSearchingWhileFiltering(event) }
      value={ handleSearcher }
      placeholder="Search your planet..."
    />
  );
}

export default SearchInput;
