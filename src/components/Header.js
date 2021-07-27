import React, { useContext } from 'react';
import MyContext from '../context/Mycontext';

function Header() {
  const {
    searchValue,
    handleChange,
    handleClick,
    setColumn,
    setComparison,
    setValue,
  } = useContext(MyContext);
  const { filterByName, filterByNumericValues } = searchValue;
  const { name } = filterByName;
  const { column, comparison, value } = filterByNumericValues;

  const columnOption = [
    'population',
    'diameter',
    'orbital_period',
    'rotation_period',
    'surface_water',
  ];

  return (
    <div>
      <h1>Stars Wars Planet</h1>
      <label htmlFor="search">
        <input
          name="search"
          type="text"
          data-testid="name-filter"
          placeholder="Enter the planet Name"
          value={ name }
          onChange={ handleChange }
        />
      </label>
      <select
        data-testid="column-filter"
        onChange={ ({ target }) => setColumn(target.value) }
      >
        {
          columnOption
            .map((item, index) => (
              <option
                key={ index }
                value={ column }
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
      <input
        type="number"
        data-testid="value-filter"
        placeholder="Enter the numeric value"
        value={ value }
        onChange={ ({ target }) => setValue(target.value) }
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ () => handleClick() }
      >
        Add Filter
      </button>
    </div>
  );
}

export default Header;
