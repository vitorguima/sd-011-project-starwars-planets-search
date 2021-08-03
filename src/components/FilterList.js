import React, { useContext } from 'react';
import SWContext from '../context/SWContext';

// RETURN A LIST OF FILTERS THAT HAS BEEN APPLIED AT THE CURRENT MOMENT. EACH FILTER CAN BE REMOVED CLICKING IN THE X BUTTON
function FilterList() {
  const { filters, setFilters,
    columnsOptions, setColumnsOptions } = useContext(SWContext);
  const { filterByNumericValues } = filters;

  // REMOVE FILTER FROM FILTERS DATA LIST (filterByNumericValues)
  const removeFilter = (column) => {
    setColumnsOptions([...columnsOptions, column]);
    setFilters({ ...filters,
      filterByNumericValues: filterByNumericValues
        .filter((filter) => filter.column !== column) });
  };

  return (
    <div className="div-filter-list">
      Filtros:
      <div className="filter-list">
        {filterByNumericValues
          .map(({ column }, i) => (
            <div data-testid="filter" key={ i }>
              {/* { column } */}
              <button
                className="buttons-filters-list"
                type="button"
                onClick={ () => removeFilter(column) }
              >
                { column }
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default FilterList;
