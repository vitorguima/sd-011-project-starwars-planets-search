import React, { useContext } from 'react';
import AppContext from '../../ContextAPI_Configs/AppContext';

function ColumnFilter() {
  const filterName = 'column';

  const optionsForFilter = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water'];

  const { numericFilter, setNumericFilter } = useContext(AppContext);
  const { userFilter: { filters: { filterByNumericValues } } } = useContext(AppContext);
  const columnUseds = filterByNumericValues.map(({ column }) => column);

  return (
    <label htmlFor="column-filter">
      <select
        id="column-filter"
        data-testid="column-filter"
        onChange={ (e) => setNumericFilter({
          ...numericFilter,
          [filterName]: e.target.value,
        }) }
      >
        {optionsForFilter.filter((filterOption) => !columnUseds.includes(filterOption))
          .map((option) => (
            <option key={ option }>
              {option}
            </option>
          ))}
      </select>
    </label>
  );
}

export default ColumnFilter;
