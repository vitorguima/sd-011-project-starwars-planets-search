import React, { useContext } from 'react';
import MyContext from './context/MyContext';

function Header() {
  const { setFilter } = useContext(MyContext);
  const handleSearch = ({ target }) => {
    setFilter((target.value).toLowerCase());
  };
  return (
    <header>
      <input
        data-testid="name-filter"
        type="text"
        name="searchBar"
        onChange={ handleSearch }
      />
    </header>
  );
}

export default Header;
