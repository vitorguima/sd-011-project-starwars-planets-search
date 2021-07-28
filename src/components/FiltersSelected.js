import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import './FiltersSelected.css';

function FiltersSelected() {
  const {
    contextFunctions: { removeNumericValuesFilter },
    filters: { filterByNumericValues },
  } = useContext(PlanetsContext);

  return (
    <div className="filters-selected-container">
      <p>Filtros Aplicados</p>
      <div className="filters-container">
        {
          filterByNumericValues.map(({ column, comparison, value }, index) => (
            <div key={ index } data-testid="filter" className="filter-selected">
              <button
                id={ column }
                className="btn btn-dark btn-sm"
                type="button"
                onClick={ removeNumericValuesFilter }
              >
                X
              </button>
              <p>
                { `${column} ${comparison} ${value}` }
              </p>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default FiltersSelected;
