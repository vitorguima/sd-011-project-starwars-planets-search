import React, { useContext } from 'react';
import MyContext from './context/MyContext';

function Select() {
  const { filters,
    setColumn,
    setComparison,
    setValue,
    handleClick } = useContext(MyContext);
  const { filterByNumericValues } = filters;
  const { value, comparison } = filterByNumericValues;
  const arrayOptions = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const filterArrayOf = arrayOptions.filter((arrayOption) => (
    !filterByNumericValues.map(({ column }) => column).includes(arrayOption)));

  return (
    <div>
      <select
        data-testid="column-filter"
        onChange={ ({ target }) => setColumn(target.value) }
      >
        {
          filterArrayOf
            .map((item, index) => (
              <option
                key={ index }
                name={ item }
              >
                { item }
              </option>
            ))
        }
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ ({ target }) => setComparison(target.value) }
      >
        <option value={ comparison }>maior que</option>
        <option value={ comparison }>menor que</option>
        <option value={ comparison }>igual a</option>
      </select>
      <label htmlFor="searchPlanet">
        <input
          data-testid="value-filter"
          type="number"
          onChange={ ({ target }) => setValue(target.value) }
          value={ value }
        />
      </label>
      <button
        data-testid="button-filter"
        type="button"
        onClick={ () => handleClick() }
      >
        Search
      </button>
    </div>
  );
}
export default Select;
