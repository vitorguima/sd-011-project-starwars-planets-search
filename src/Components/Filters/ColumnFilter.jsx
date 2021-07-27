import React, { useContext } from 'react';
import AppContext from '../../ContextAPI_Configs/AppContext';

function ColumnFilter() {
  const filterName = 'column';

  const { numericFilter, setNumericFilter } = useContext(AppContext);

  const optionsForFilter = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water'];

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
        {optionsForFilter.map((option) => (
          <option key={ option }>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export default ColumnFilter;
