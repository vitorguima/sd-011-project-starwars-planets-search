import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function FiltersSelected() {
  const {
    contextFunctions: { removeNumericValuesFilter },
    filters: { filterByNumericValues },
  } = useContext(PlanetsContext);

  return (
    <>
      {
        filterByNumericValues.map(({ column, comparison, value }, index) => (
          <div key={ index } data-testid="filter">
            <p>
              { `${column}, ${comparison}, ${value}` }
            </p>
            <button
              id={ column }
              type="button"
              onClick={ removeNumericValuesFilter }
            >
              X
            </button>
          </div>
        ))
      }
    </>
  );
}

export default FiltersSelected;
