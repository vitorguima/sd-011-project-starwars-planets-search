import React, { useContext } from 'react';
import AppContext from '../context/Context';

const SearchBar = () => {
  const { filterByName } = useContext(AppContext);
  const handleChange = ({ target: { value } }) => {
    filterByName(value);
  };

  return (
    <section>
      <input
        type="text"
        name="searchText"
        id="searchText"
        onChange={ handleChange }
        data-testid="name-filter"
        className="input"
      />
    </section>
  );
};

export default SearchBar;
