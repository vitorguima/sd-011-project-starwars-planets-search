import React, { useContext } from 'react';
import starWarsContext from '../myContext/StarWarsContext';

function SearchInput() {
  const { initialFilters, setInitialFilters } = useContext(starWarsContext);

  return (
    <label htmlFor="name-filter">
      Pesquisar
      <input
        data-testid="name-filter"
        onChange={ ({ target }) => setInitialFilters({
          ...initialFilters, filterByName: { name: target.value } }) }
      />
    </label>
  );
}

export default SearchInput;
