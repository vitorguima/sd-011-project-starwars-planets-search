import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function ActiveFilters() {
  const { filters, setFilters } = useContext(PlanetsContext);
  const { filterByNumericValues } = filters;

  const removeFilter = (filterName) => {
    const filter = filterByNumericValues.filter((item) => item.column !== filterName);
    setFilters({
      ...filters,
      filterByNumericValues: filter,
    });
  };

  const activeFiltersList = () => (
    <ul>
      { filterByNumericValues.map((filter, index) => (
        <li
          data-testid="filter"
          key={ index }
        >
          {`${filter.column} ${filter.comparison} ${filter.value}`}
          <button
            type="button"
            id="remove-filter-button"
            onClick={ () => removeFilter(filter.column) }
          >
            X
          </button>
        </li>
      )) }
    </ul>
  );

  return (
    <section>
      { filterByNumericValues.length > 0 && activeFiltersList() }
    </section>
  );
}

export default ActiveFilters;
