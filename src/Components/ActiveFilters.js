import React, { useContext } from 'react';
import ContextPlanets from '../Context/PlanetContext';

const ActiveFilters = () => {
  const { filters, changeNameFilter, deleteFilter } = useContext(ContextPlanets);
  const { filterByNumericValues } = filters;
  const activeFilterList = filters.name === ''
    ? []
    : ([
      <li key="namefilter">
        {filters.name}
        <button
          type="button"
          onClick={ () => changeNameFilter('') }
        >
          X
        </button>
      </li>,
    ]);
  filterByNumericValues.forEach((filter, index) => {
    const { comparator, column, value } = filter;
    activeFilterList.push(
      <li key={ index } data-testid="filter">
        {`${column} ${comparator} ${value}`}
        <button
          type="button"
          onClick={ () => deleteFilter(column) }
        >
          X
        </button>
      </li>,
    );
  });
  return (
    <ul>
      {activeFilterList}
    </ul>
  );
};

export default ActiveFilters;
