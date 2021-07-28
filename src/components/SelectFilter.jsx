import React, { useContext, useState } from 'react';
import { Planet } from '../context/Planet';

export default function SelectFilter() {
  const { filterByNumericValues } = useContext(Planet);

  const [filter, setFilter] = useState(
    {
      column: 'rotation_period',
      comparison: 'maior que',
      value: '0',
    },
  );

  function handleChange(event) {
    const { name, value } = event.target;
    setFilter({ ...filter, [name]: value });
  }

  return (
    <>
      <select
        data-testid="column-filter"
        name="column"
        onChange={ handleChange }
        value={ filter.column }
      >
        <option checked>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison"
        onChange={ handleChange }
        value={ filter.comparison }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        data-testid="value-filter"
        type="number"
        name="value"
        placeholder="Digite um número para filtrar"
        onChange={ handleChange }
        value={ filter.value }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={
          () => filterByNumericValues(filter.column, filter.comparison, filter.value)
        }
      >
        Filtrar
      </button>
    </>
  );
}
