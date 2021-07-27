import React, { useContext } from 'react';
import AppContext from './Context';

function InputNumber() {
  const { handleClickInput, filterPlanets, value } = useContext(AppContext);

  return (
    <div>
      <label htmlFor="name">
        <input
          id="name"
          data-testid="value-filter"
          onChange={ handleClickInput }
          value={ value }
          type="number"
        />
      </label>
      <button
        id="filter"
        type="button"
        data-testid="button-filter"
        onClick={ filterPlanets }
      >
        Filtrar
      </button>
    </div>
  );
}

export default InputNumber;
