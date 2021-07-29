import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filters() {
  const { setFilters, filters } = useContext(PlanetsContext);

  function handleChangeName({ target }) {
    const { value } = target;
    setFilters({
      ...filters,
      filterByName: {
        name: value,
      },
    });
  }

  return (
    <input
      data-testid="name-filter"
      onChange={ handleChangeName }
    />
  );
}

export default Filters;
