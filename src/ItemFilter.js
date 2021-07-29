import React, { useContext } from 'react';
import MyContext from './MyContext';

function ItemFilter() {
  const { initstate, setInitState } = useContext(MyContext);
  const { colunFilter, filterByNumericValues } = initstate;

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
