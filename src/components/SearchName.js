import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function SearchName() {
  const {
    setFilters,
    setSearchByName,
    setSearchByNumeric,
  } = useContext(PlanetContext);

  function handleName({ target: { value } }) {
    setFilters({
      filterByName: {
        name: value,
      },
      filterByNumericValues: [
        {
          column: '',
          comparision: '',
          value: '',
        },
      ],
    });
    setSearchByName(true);
    setSearchByNumeric(false);
  }

  return (
    <label
      htmlFor="search-name"
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
