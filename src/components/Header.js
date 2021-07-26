import React, { useContext } from 'react';
import MyContext from '../context/Mycontext';

function Header() {
  const { handleChange, searchValue } = useContext(MyContext);
  const { filterByName } = searchValue;
  const { name } = filterByName;
  return (
    <div>
      <h1>Stars Wars Planet</h1>
      <label htmlFor="search">
        <input
          name="search"
          type="text"
          data-testid="name-filter"
          placeholder="Enter the planet Name"
          value={ name }
          onChange={ handleChange }
        />
      </label>
    </div>
  );
}

export default Header;
