import React, { useContext } from 'react';
import MyContext from '../context/Mycontext';

function Header() {
  const { handleChange, searchValue } = useContext(MyContext);
  return (
    <div>
      <h1>Stars Wars Planet</h1>
      <label htmlFor="search">
        <input
          name="search"
          type="text"
          data-testid="name-filter"
          value={ searchValue }
          onChange={ handleChange }
        />
      </label>
    </div>
  );
}

export default Header;
