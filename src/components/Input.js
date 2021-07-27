import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Input() {
  const { setFilters, filters } = useContext(PlanetsContext);

  return (
    <input
      value={ filters.inputText }
      data-testid="name-filter"
      onChange={ ({ target: { value } }) => {
        setFilters({ filters: { inputText: value } });
      } }
    />
  );
}

export default Input;
