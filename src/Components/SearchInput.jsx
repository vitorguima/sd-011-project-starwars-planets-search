import React, { useContext } from 'react';
import AppContext from '../ContextAPI_Configs/AppContext';

function SearchInput() {
  const { userInput, setUserInput } = useContext(AppContext);
  return (
    <label htmlFor="user-input">
      <input
        id="user-input"
        type="text"
        data-testid="name-filter"
        onChange={ (e) => setUserInput({
          ...userInput,
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
