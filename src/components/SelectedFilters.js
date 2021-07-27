import React, { useContext } from 'react';
import Context from '../context/Context';

function RendersCurrentFilters() {
  const {
    setDataFilters,
    dataFilters } = useContext(Context);
  const { filters: { filterByNumericValues } } = dataFilters;

  function removeFilter(selectedColumn) {
    setDataFilters({
      ...dataFilters,
      filters: {
        ...dataFilters.filters,
        filterByNumericValues: dataFilters.filters
          .filterByNumericValues.filter(({ column }) => (
            column !== selectedColumn)),
      },
    });
  }

  return (
    filterByNumericValues.map(({ column, comparison, value }, index) => (
      <span key={ index }>
        <p data-testid="filter">
          { `${column} ${comparison} ${value}` }
          <button
            type="button"
            onClick={ () => removeFilter(column) }
          >
            x
          </button>
        </p>
      </span>
    ))
  );
}

export default RendersCurrentFilters;
