import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function HeaderFilter() {
  const {
    filter,
    search,
    filterClick,
    setColumn,
    setComparison,
    setValue,
  } = useContext(PlanetsContext);

  const { filterByName, filterByNumericValues } = search;
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
      <label htmlFor="searchName">
        <input
          type="text"
          placeholder="Search a planet name"
          name="searchName"
          data-testid="name-filter"
          value={ name }
          onChange={ filter }
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
        placeholder="Numeric search"
        value={ value }
        onChange={ ({ target }) => setValue(target.value) }
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ () => filterClick() }
      >
        Filter
      </button>
    </div>
  );
}

export default HeaderFilter;
