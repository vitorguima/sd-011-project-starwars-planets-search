import React from 'react';
import PropTypes from 'prop-types';

function ItemFilter({ filterByNumericValues, initstate, setInitState }) {
  const { colunFilter } = initstate;
  function removeItemFilter(column) {
    setInitState({
      ...initstate,
      colunFilter: [...colunFilter, column],
      updateFilter: true,
      filterByNumericValues: [
        ...filterByNumericValues.filter((item) => item.column !== column),
      ],
    });
  }
  return (
    <div className="typefilter" data-testid="filter">
      { filterByNumericValues.map(({ column, comparison, numberValue }, index) => (
        <div key={ index }>
          <span>{ column }</span>
          <span>{ comparison }</span>
          <span>{ numberValue }</span>
          <button
            type="button"
            onClick={ () => removeItemFilter(column) }
          >
            X
          </button>
        </div>
      )) }
    </div>
  );
}

export default ItemFilter;

ItemFilter.propTypes = {
  initstate: PropTypes.shape().isRequired,
  setInitState: PropTypes.func.isRequired,
  filterByNumericValues: PropTypes.arrayOf(PropTypes.object).isRequired,
};
