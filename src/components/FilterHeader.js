import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function FilterHeader() {
  const { filters: { filterByName: { setName } } } = useContext(PlanetsContext);
  return (
    <header>
      <input
        data-testid="name-filter"
        onChange={ ({ target: { value } }) => setName(value.toLowerCase()) }
      />
    </header>
  );
}

export default FilterHeader;
