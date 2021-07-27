import React from 'react';
import Context from '../../utils/Context';
import snakeCaseToCapitilized from '../../utils/utils';
import style from './style.module.css';

function AppliedFilters() {
  const { filters, setFilters } = React.useContext(Context);

  const handleRemoveFilter = ({ target: { dataset } }) => {
    setFilters({
      ...filters,
      filterByNumericValues: filters.filterByNumericValues.filter(
        (_filter, index) => index !== Number(dataset.index),
      ),
    });
  };

  return (
    <table>
      <tbody>
        {
          filters.filterByNumericValues.map((filter, index) => (
            <tr className={ style.row } key={ index } data-testid="filter">
              <td>{snakeCaseToCapitilized(filter.column)}</td>
              <td>{filter.comparison}</td>
              <td>{filter.value}</td>
              <td>
                <button
                  className={ style.button }
                  type="button"
                  data-index={ index }
                  onClick={ handleRemoveFilter }
                >
                  X
                </button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default AppliedFilters;
