import React, { useContext } from 'react';
import AppContext from '../../ContextAPI_Configs/AppContext';

export default function UsedFilters() {
  const { userFilter, deleteFilter } = useContext(AppContext);
  const { filters: { filterByNumericValues } } = userFilter;
  const filters = filterByNumericValues.map(({ column }) => column);

  return (
    <div>
      { filters.map((filter, index) => (
        <div key={ `${filter}+${index}` } data-testid="filter">
          <p>{filter}</p>
          <button
            id={ filter }
            type="button"
            onClick={ (e) => deleteFilter(e.target.id) }
          >
            x
          </button>
        </div>
      ))}
    </div>
  );
}
