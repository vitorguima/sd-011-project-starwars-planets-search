import React, { useContext, useState } from 'react';
import Context from '../Context/Context';

function NumberFilter() {
  const { handleNumberFilter } = useContext(Context);
  const [numbers, setNumbers] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '100000',
  });
  return (
    <div>
      <select
        data-testid="column-filter"
        onChange={ ({ target: { value } }) => {
          setNumbers(
            { ...numbers, column: value },
          );
        } }
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ ({ target: { value } }) => {
          setNumbers(
            { ...numbers, comparison: value },
          );
        } }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        onChange={ ({ target: { value } }) => {
          setNumbers(
            { ...numbers, value },
          );
        } }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => { handleNumberFilter(numbers); } }
      >
        Filtrar
      </button>
    </div>
  );
}

export default NumberFilter;
