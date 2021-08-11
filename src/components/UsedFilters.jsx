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
// Diego Figuerêdo e Pedro Piquini, ambos da turma 11, me ajudaram com o requisito 5 e 6.
// Muitissimo obrigado galera vocês são feras demais.
