import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function FilterPlanets() {
  const { filters, handleFilterByName } = useContext(PlanetsContext);
  const { name } = filters.filterByName;

  return (
    <section>
      <input
        type="text"
        data-testid="name-filter"
        value={ name }
        onChange={ handleFilterByName }
      />
    </section>
  );
}

export default FilterPlanets;
