import React from 'react';
import usePlanets from '../hooks/usePlanets';
import OrderFilter from './Input/OrderFilter';

export default function FilterButtons() {
  const { filters, removeFilters } = usePlanets();
  const { filterByNumericValues } = filters;
  const handleDeleteFilter = (index) => {
    removeFilters(index);
  };

  const getFilters = () => filterByNumericValues.map((
    filter, index,
  ) => (
    <div
      key={ index }
      data-testid="filter"
      className="alert alert-primary mx-1"
      style={ { width: '150px' } }
    >
      { filter.column}
      <button
        type="button"
        className="mx-1 btn btn-danger"
        onClick={ () => handleDeleteFilter(filter.column) }
      >
        X
      </button>
    </div>

  ));

  return (
    <div className="col-2">
      {getFilters()}
    </div>
  );
}
