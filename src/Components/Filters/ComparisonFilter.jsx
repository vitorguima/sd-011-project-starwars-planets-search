import React, { useContext } from 'react';
import AppContext from '../../ContextAPI_Configs/AppContext';

function ComparisonFilter() {
  const filterName = 'comparison';
  const optionsForFilter = ['maior que', 'menor que', 'igual a'];
  const { numericFilter, setNumericFilter } = useContext(AppContext);

  return (
    <label htmlFor="comparison-filter">
      <select
        id="comparison-filter"
        data-testid="comparison-filter"
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

export default ComparisonFilter;
