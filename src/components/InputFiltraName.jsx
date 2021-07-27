import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function InputFiltraName() {
  const { setname } = useContext(PlanetsContext);
  return (
    <label htmlFor="filter_name">
      Filtra por Nome:
      <input
        data-testid="name-filter"
        id="filter_name"
        onChange={ ({ target }) => setname(target.value) }
      />
    </label>
  );
}

export default InputFiltraName;
