import React, { useState } from 'react';
import Hooks from '../Hooks';

export default function FilterValues() {
  const { filters, setFilters } = Hooks();
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('');

  function handleApplyFilter() {
    setFilters({ ...filters,
      filterByNumericValues: {
        column,
        comparison,
        value,
      },
    });
  }

  return (
    <center>
      <form>
        <select
          name="column"
          value={ column }
          onChange={ (e) => setColumn(e.target.value) }
          data-testid="column-filter"
          className="select-css2"
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
          className="select-css2"
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
          className="select-css2"
        />

        <button
          onClick={ handleApplyFilter }
          type="button"
          data-testid="button-filter"
        >
          Filtrar
        </button>
      </form>
    </center>
  );
}
