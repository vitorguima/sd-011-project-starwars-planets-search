import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

const columnDB = ['population', 'orbital_period',
  'diameter', 'rotation_period', 'surface_water'];
const comparisonDB = ['maior que', 'menor que', 'igual a'];

function SelectionFilter() {
  const [form, setForm] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '',
  });

  function handleEventChanges({ target }) {
    setForm({ ...form, [target.name]: target.value });
  }

  const { setFilters, filters } = useContext(PlanetsContext);

  function updateFilters() {
    setFilters({
      ...filters,
      filterByNumericValues: [...filters.filterByNumericValues, {
        column: form.column,
        comparison: form.comparison,
        value: form.value,
      }],
    });
  }

  return (
    <div>
      <select
        data-testid="column-filter"
        name="column"
        value={ form.column }
        onChange={ (event) => handleEventChanges(event) }
      >
        {columnDB.map((option, index) => <option key={ index }>{ option }</option>)}
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison"
        value={ form.comparison }
        onChange={ (event) => handleEventChanges(event) }
      >
        {comparisonDB.map((option, index) => <option key={ index }>{ option }</option>)}
      </select>
      <input
        data-testid="value-filter"
        type="number"
        name="value"
        value={ form.value }
        onChange={ (event) => handleEventChanges(event) }
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ updateFilters }
      >
        Filtrar
      </button>
    </div>
  );
}

export default SelectionFilter;
