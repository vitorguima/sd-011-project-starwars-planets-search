import React, { useContext } from 'react';
import Context from '../context/Context';

function FiltersList() {
  const { filters, removeFilter } = useContext(Context);
  const { filterByNumericValues } = filters;
  return (
    <div className="filter-list">
      {filterByNumericValues.map((filter) => {
        if (filter.column) {
          return (
            <div key={ filter.column } data-testid="filter">
              <span>{filter.column}</span>
              <span>{filter.comparison}</span>
              <span>{filter.value}</span>
              <span>
                <button type="button" onClick={ () => removeFilter(filter.column) }>
                  X
                </button>
              </span>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

export default FiltersList;
