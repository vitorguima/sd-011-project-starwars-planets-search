import React, { useContext, useState } from 'react';
import Context from '../Context/Context';

function NumberFilter() {
  const { handleNumberFilter, filters: { filterByNumericValues } } = useContext(Context);
  const [numbers, setNumbers] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '100000',
  });
  const selectArr = ['population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water'];

  const handleSelect = () => selectArr
    .filter((string) => !filterByNumericValues.map((item) => item.column)
      .includes(string));
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
        { filterByNumericValues.length === 0
          ? selectArr.map((column, index) => (
            <option key={ index } value={ column }>{column}</option>
          ))

          : handleSelect().map((column) => (
            <option key={ column } value={ column }>
              {column}
            </option>
          ))}
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
