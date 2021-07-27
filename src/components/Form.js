import React, { useContext } from 'react';
import PlanetsContext from '../hooks/PlanetsContext';

function Form() {
  const {
    initialFilters,
    setInitialFilters,
  } = useContext(PlanetsContext);

  return (
    <input
      data-testid="name-filter"
      onChange={ ({ target }) => setInitialFilters({
        ...initialFilters, filterByName: { name: target.value } }) }
    />
  );
}

export default Form;
