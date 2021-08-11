import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function UsedFilters() {
  const { selectFilter: { filters }, removeFilter } = useContext(PlanetsContext);
  const { filterByNumericValues } = filters;
  return (
    <ul>
      { filterByNumericValues.map(({ column, comparison, value }, index) => (
        <li key={ column } data-testid="filter">
          { `${column} ${comparison} ${value}` }
          <button type="button" onClick={ () => removeFilter(index) }>X</button>
        </li>
      )) }
    </ul>
  );
}
