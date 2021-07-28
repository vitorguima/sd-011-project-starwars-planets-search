import React from 'react';
import usePlanets from '../hooks/usePlanets';

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
      className="d-flex justify-content-center alert alert-primary m-2"
      style={ { maxWidth: '200px' } }
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
    <div className="row ">
      {getFilters()}
    </div>
  );
}
