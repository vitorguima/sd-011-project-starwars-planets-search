import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function FilterForm() {
  const { handleTextFilter } = useContext(PlanetsContext);
  return (
    <form>
      <input
        data-testid="name-filter"
        type="text"
        onChange={ (event) => handleTextFilter(event) }
      />
    </form>
  );
}
