import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function SearchName() {
  const { setFilters } = useContext(PlanetContext);

  function handleName({ target: { value } }) {
    setFilters({
      filters: {
        filterByName: {
          name: value,
        },
      },
    });
  }

  return (
    <label
      htmlFor="search-name"
      data-testid="name-filter"
    >
      <input
        type="text"
        data-testid="name-filter"
        id="search"
        onChange={ handleName }
      />
    </label>
  );
}

export default SearchName;
