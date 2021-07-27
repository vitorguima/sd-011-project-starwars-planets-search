import React from 'react';
import usePlanets from '../hooks/usePlanets';

export default function FilterButtons() {
  const { filters, removeFilters } = usePlanets();
  const { filterByNumericValues } = filters;
  const handleDeleteFilter = (index) => {
    removeFilters(index);
  };

  const getFilters = () => filterByNumericValues.length > 0 && filterByNumericValues.map((
    filter, index,
  ) => (
    <div key={ index } className="alert alert-primary mx-1" style={ { width: '150px' } }>
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
    <div className="col-2 mt-2 btn-group">
      {getFilters()}
    </div>
  );
}
