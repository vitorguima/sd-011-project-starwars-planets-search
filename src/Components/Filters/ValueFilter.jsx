import React, { useContext } from 'react';
import AppContext from '../../ContextAPI_Configs/AppContext';

function ValueFilter() {
  const filterName = 'value';
  const { numericFilter, setNumericFilter } = useContext(AppContext);
  return (
    <label htmlFor="comparison-filter">
      <input
        name="value"
        type="number"
        min="1"
        data-testid="value-filter"
        placeholder="Population"
        onChange={ (e) => setNumericFilter({
          ...numericFilter,
          [filterName]: e.target.value,
        }) }
      />
    </label>
  );
}

export default ValueFilter;
