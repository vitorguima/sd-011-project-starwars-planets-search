import React from 'react';
import Context from '../../utils/Context';

function AppliedFilters() {
  const { filters, setFilters } = React.useContext(Context);

  const handleRemoveFilter = ({ target: { dataset } }) => {
    setFilters({
      ...filters,
      filterByNumericValues: filters.filterByNumericValues.filter(
        (_filter, index) => index !== Number(dataset.index),
      ),
    });
  };

  return (
    <section>
      {
        filters.filterByNumericValues.map((filter, index) => (
          <div key={ index } data-testid="filter">
            <span>{filter.column}</span>
            <span>{filter.comparison}</span>
            <span>{filter.value}</span>
            <button type="button" data-index={ index } onClick={ handleRemoveFilter }>
              X
            </button>
          </div>
        ))
      }
    </section>
  );
}

export default AppliedFilters;
