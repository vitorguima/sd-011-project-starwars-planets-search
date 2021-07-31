import React, { useContext } from 'react';
import AppContext from '../utils/AppContext';

function FilterInUse() {
  const { filters, setFilters, setFiltersToUse, filtersToUse } = useContext(AppContext);

  const removeFilter = ({ target: { parentElement } }) => {
    setFilters({
      ...filters,
      filterByNumericValues:
        filters.filterByNumericValues.filter(
          (filter) => filter.column !== parentElement.id,
        ),
    });
    setFiltersToUse([...filtersToUse, parentElement.id]);
  };

  const renderLi = (filter, key) => (
    <li data-testid="filter" key={ key } id={ filter.column }>
      { filter.column }
      <button type="button" onClick={ removeFilter }>X</button>
    </li>
  );

  return (
    <div>
      Filtros em uso:
      <ul>
        { filters.filterByNumericValues.map((filter, index) => renderLi(filter, index)) }
      </ul>
    </div>
  );
}

export default FilterInUse;
