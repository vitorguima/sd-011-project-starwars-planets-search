import React, { useContext } from 'react';
import AppContext from './Context';

function InputFilter() {
  const { handleChange, name } = useContext(AppContext);
  return (
    <div>
      <label htmlFor="name">
        <input
          id="name"
          data-testid="name-filter"
          onChange={ handleChange }
          value={ name }
        />
      </label>
    </div>
  );
}

export default InputFilter;
