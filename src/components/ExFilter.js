import React, { useContext } from 'react';
import PlanetsContext from '../context/Context';

function ExcludeFilters() {
  const { filters, setFilters } = useContext(PlanetsContext);
  const { filterByNumericValues } = filters;

  function handleDelete(filterParam) {
    const updatedFilters = filterByNumericValues
      .filter((filter) => filter !== filterParam);
    setFilters({
      ...filters,
      filterByNumericValues: updatedFilters,
    });
  }

  return (
    <div>
      {
        filterByNumericValues.length === 1
          ? ''
          : filterByNumericValues.map((filter, index) => {
            if (index === 0) return '';
            return (
              <span key={ filter.column } data-testid="filter">
                {`${filter.column} - ${filter.comparison} - ${filter.value}`}
                <button
                  type="button"
                  data-testid="filter"
                  onClick={ () => handleDelete(filter) }
                >
                  x
                </button>
              </span>
            );
          })
      }
    </div>
  );
}

export default ExcludeFilters;
