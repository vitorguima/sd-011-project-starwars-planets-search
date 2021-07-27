import React, { useContext } from 'react';
import AppContext from '../ContextAPI_Configs/AppContext';

function SearchInput() {
  const { userFilter, setUserFilter } = useContext(AppContext);
  console.log(userFilter);
  return (
    <label htmlFor="user-input">
      <input
        placeholder="Type a excerpt of planet name"
        id="user-input"
        type="text"
        data-testid="name-filter"
        onChange={ (e) => setUserFilter({
          ...userFilter,
          filters: {
            ...userFilter.filters,
            filterByName: {
              name: e.target.value,
            },
          },
        }) }
      />
    </label>
  );
}

export default SearchInput;
