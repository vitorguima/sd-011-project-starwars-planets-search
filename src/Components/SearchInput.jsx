import React, { useContext } from 'react';
import AppContext from '../ContextAPI_Configs/AppContext';

function SearchInput() {
  const { userInputFilter, setUserFilter } = useContext(AppContext);
  return (
    <label htmlFor="user-input">
      <input
        placeholder="Type a excerpt of planet name"
        id="user-input"
        type="text"
        data-testid="name-filter"
        onChange={ (e) => setUserFilter({
          ...userInputFilter,
          filters: {
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
