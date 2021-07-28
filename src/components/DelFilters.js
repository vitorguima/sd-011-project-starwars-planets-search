import React, { useContext } from 'react';
import PlanetsContext from '../hooks/PlanetsContext';

function DelFilters() {
  const {
    initialFilters,
    setInitialFilters,
    renderOptions,
    setRenderOptions,
  } = useContext(PlanetsContext);
  const { filterByNumericValues } = initialFilters;

  const handleDeleteFilters = (column) => {
    setInitialFilters({
      ...initialFilters,
      filterByNumericValues: filterByNumericValues.filter((fil) => fil.column !== column),
    });
    setRenderOptions([
      ...renderOptions, column,
    ]);
  };

  return (
    <div>
      <p>Filters:</p>
      { initialFilters.filterByNumericValues.map((option, index) => (
        <span key={ index } data-testid="filter">
          <p>{ option.column }</p>
          <button
            type="button"
            onClick={ () => handleDeleteFilters(option.column) }
          >
            X
          </button>
        </span>
      )) }
    </div>
  );
}

export default DelFilters;
