import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

const DeleteFiltersBtn = () => {
  const { filters, removeNumericFilter } = useContext(PlanetsContext);

  const {
    filters: {
      filterByNumericValues,
    },
  } = filters;

  return (
    <div>
      {
        filterByNumericValues.map((filterOption, index) => {
          if (filterOption.column) {
            return (
              <div key={ index } data-testid="filter">
                { `Delete filter by ${filterOption.column}` }
                <button
                  type="button"
                  onClick={ () => removeNumericFilter(filterOption.column) }
                >
                  X
                </button>
              </div>
            );
          }
          return null;
        })
      }
    </div>
  );
};

export default DeleteFiltersBtn;
