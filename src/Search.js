import React, { useContext } from 'react';
import PlanetContext from './context/PlanetContex';

function Search() {
  const {
    filters,
    handleClick,
    handleResetClick,
    setColumn,
    setComparison,
    setValue,
  } = useContext(PlanetContext);

  const { filterByNumericValues } = filters;
  const { comparison, value } = filterByNumericValues;

  const columnOption = [
    'population',
    'diameter',
    'orbital_period',
    'rotation_period',
    'surface_water',
  ];

  const ColumnFiltered = columnOption
    .filter((item) => !filterByNumericValues
      .map(({ column }) => column).includes(item));

  return (
    <div className="search">
      <select
        data-testid="column-filter"
        onChange={ ({ target }) => setColumn(target.value) }
      >
        {
          ColumnFiltered.map((item, index) => (
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
        <option value={ comparison } name="maior que">maior que</option>
        <option value={ comparison } name="menor que">menor que</option>
        <option value={ comparison } name="igual a">igual a</option>
      </select>
      <input
        data-testid="value-filter"
        type="number"
        placeholder="Enter the numeric value"
        value={ value }
        onChange={ ({ target }) => setValue(target.value) }
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ () => handleClick() }
      >
        Search
      </button>
      {/* <button
        type="button"
        data-testid="button-filter"
        onClick={ () => handleClick() }
      >
        Filtrar
      </button> */}
      <button
        type="button"
        data-testid="filter"
        onClick={ () => handleResetClick() }
      >
        X
      </button>
    </div>
  );
}

export default Search;
