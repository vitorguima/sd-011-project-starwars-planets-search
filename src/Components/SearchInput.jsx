import React, { useContext } from 'react';
import AppContext from '../ContextAPI_Configs/AppContext';

function SearchInput() {
  const { userInputFilter, setUserInputFilter } = useContext(AppContext);
  return (
    <label htmlFor="user-input">
      <input
        placeholder="Type a excerpt of planet name"
        id="user-input"
        type="text"
        data-testid="name-filter"
        onChange={ (e) => setUserInputFilter({
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
