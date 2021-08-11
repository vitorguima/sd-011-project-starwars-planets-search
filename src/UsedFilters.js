import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function UsedFilters({ onRemove }) {
  const { filters } = useContext(AppContext);
  const { filterByNumericValues } = filters;

  return (
    <ul>
      {filterByNumericValues.map(({ column, comparison, value }) => (
        <li key={ column } data-testid="filter">
          {`${column} ${comparison} ${value}`}
          <button type="button" onClick={ () => onRemove(column) }>
            x
          </button>
        </li>
      ))}
    </ul>
  );
}

UsedFilters.propTypes = {
  onRemove: PropTypes.func.isRequired,
};

export default UsedFilters;
