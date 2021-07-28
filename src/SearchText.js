import React, { useContext } from 'react';
import MyContext from './context/MyContext';
import Select from './Select';

function SearchText() {
  const { handleChange, filters } = useContext(MyContext);
  const { filterByName } = filters;
  const { name } = filterByName;
  return (
    <div>
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
      <Select />
    </div>
  );
}
export default SearchText;
