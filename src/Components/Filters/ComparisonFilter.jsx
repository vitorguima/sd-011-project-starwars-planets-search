import React from 'react';

function ComparisonFilter() {
  const optionsForFilter = ['maior que', 'menor que', 'igual a'];

  return (
    <label htmlFor="comparison-filter">
      <select id="comparison-filter" data-testid="comparison-filter">
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
