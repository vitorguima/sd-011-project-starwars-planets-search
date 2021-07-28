import React, { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';

function SearchInput() {
  const { filters, setFilters } = useContext(GlobalContext);
  const { filterByName: { name } } = filters;

  const updateFilterByName = ({ target: { value } }) => {
    setFilters(
      { ...filters, filterByName: { name: value } },
    );
  };

  return (
    <input
      type="text"
      data-testid="name-filter"
      value={ name }
      placeholder="Busque um planeta:"
      onChange={ updateFilterByName }
    />
  );
}

export default SearchInput;
