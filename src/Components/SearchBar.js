import React, { useContext } from 'react';
import AppContext from '../Context/AppContext';

function SearchBar() {
  const { setFilter } = useContext(AppContext);

  const handleSerachBar = ({ target: { value } }) => {
    setFilter((value));
  };

  return (
    <div>
      <h3>Barra de busca:</h3>
      <input
        data-testid="name-filter"
        type="text"
        name="SearchBar"
        onChange={ handleSerachBar }
      />
    </div>
  );
}

export default SearchBar;
