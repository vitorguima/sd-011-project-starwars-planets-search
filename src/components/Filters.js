import React, { useContext } from 'react';
import PlanetsContext from '../Providers/PlanetsContext';

function Filters() {
  const { filters, setFilters } = useContext(PlanetsContext);
  return (
    <div>
      Pesquisar:
      <input
        data-testid="name-filter"
        onChange={ (e) => setFilters({
          ...filters,
          filterByName: { name: e.target.value } }) }
      />
    </div>
  );
}

export default Filters;
