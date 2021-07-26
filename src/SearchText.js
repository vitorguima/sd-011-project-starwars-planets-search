import React, { useContext } from 'react';
import MyContext from './context/MyContext';

function SearchText() {
  const { handleChange, filters } = useContext(MyContext);
  const { filterByName } = filters;
  const { name } = filterByName;
  return (
    <header>
      <label htmlFor="searchPlanet">
        Procure um planeta
        <input
          data-testid="name-filter"
          type="text"
          onChange={ handleChange }
          value={ name }
        />
      </label>
    </header>
  );
}
export default SearchText;
