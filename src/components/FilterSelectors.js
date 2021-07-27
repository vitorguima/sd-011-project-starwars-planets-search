import React, { useState } from 'react';
import usePlanets from '../hooks/usePlanets';

function FilterSelectors() {
  const { filters, setFilters } = usePlanets();

  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('');

  function handleApplyFilter() {
    setFilters({
      ...filters,
      filterByNumericValues: {
        column,
        comparison,
        value,
      },
    });
  }

  return (
    <form>
      <select
        name="column"
        value={ column }
        onChange={ (e) => setColumn(e.target.value) }
        data-testid="column-filter"
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        name="comparison"
        value={ comparison }
        onChange={ (e) => setComparison(e.target.value) }
        data-testid="comparison-filter"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        name="value"
        value={ value }
        onChange={ (e) => setValue(e.target.value) }
        type="number"
        data-testid="value-filter"
      />
      <button
        onClick={ handleApplyFilter }
        type="button"
        data-testid="button-filter"
      >
        Filtrar
      </button>
    </form>
  );
}

export default FilterSelectors;
