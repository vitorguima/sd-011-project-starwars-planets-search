import React, { useState } from 'react';
import { useAuth } from '../providers/auth';

function FilterNumericNumbers() {
  const { filters, setFilters } = useAuth();
  const [colFilters, setColFilters] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const defaultFilters = {
    column: 'population',
    comparison: 'maior que',
    value: '0',
  };

  const [localFilters, setLocalFilters] = useState(defaultFilters);

  const handleColumnFilters = ({ target: { value } }) => {
    setLocalFilters({
      ...localFilters,
      column: value,
    });
  };

  const handleComparisonFilters = ({ target: { value } }) => {
    setLocalFilters({
      ...localFilters,
      comparison: value,
    });
  };

  const handleValueFilters = ({ target: { value } }) => {
    setLocalFilters({
      ...localFilters,
      value,
    });
  };

  const addFiltersToGlobalStateAndRemoveLocal = () => {
    setFilters({
      ...filters,
      filterByNumericValues: [...filters.filterByNumericValues, localFilters],
    });

    const newColumn = [];
    colFilters.filter((column) => column !== localFilters.column)
      .forEach((col) => {
        newColumn.push(col);
        setColFilters(newColumn);
      });

    const event = {
      target: { value: newColumn[0] },
    };
    handleColumnFilters(event);
  };

  return (
    <div>
      <select data-testid="column-filter" onChange={ handleColumnFilters }>
        {colFilters.map((colFil, index) => (
          <option key={ index }>
            {colFil}
          </option>
        ))}
      </select>
      <select data-testid="comparison-filter" onChange={ handleComparisonFilters }>
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input type="number" data-testid="value-filter" onChange={ handleValueFilters } />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ addFiltersToGlobalStateAndRemoveLocal }
      >
        search
      </button>
    </div>
  );
}

export default FilterNumericNumbers;
