import React, { useContext, useState } from 'react';
import Context from '../context/Context';

function Filters() {
  const { dataFilters, setDataFilters } = useContext(Context);
  const [selectedOptions, setSelectedOptions] = useState({
    column: '',
    comparison: '',
    value: '',
  });

  function handleNameFilter({ target }) {
    const { value } = target;
    setDataFilters({
      ...dataFilters,
      filters: {
        filterByName: {
          name: value,
        },
      },
    });
  }

  function handleSelectedOptions({ target }) {
    const { name, value } = target;
    setSelectedOptions({
      ...selectedOptions,
      [name]: value,
    });
  }

  function handleNumericFilters() {
    const { column, comparison, value } = selectedOptions;
    setDataFilters({
      ...dataFilters,
      filters: {
        ...dataFilters.filters,
        filterByNumericValues: [{
          column,
          comparison,
          value,
        }],
      },
    });
  }

  const numericFilterOptions = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  return (
    <form>
      <label htmlFor="name">
        Name:
        <input
          type="text"
          data-testid="name-filter"
          id="name"
          name="name"
          onChange={ handleNameFilter }
        />
      </label>
      <label htmlFor="column-filter">
        <select
          data-testid="column-filter"
          id="column-filter"
          name="column"
          onChange={ handleSelectedOptions }
        >
          {numericFilterOptions.map((option, index) => (
            <option key={ index } value={ option }>
              {option}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="comparison-filter">
        <select
          data-testid="comparison-filter"
          name="comparison"
          onChange={ handleSelectedOptions }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
      </label>
      <label htmlFor="value-filter">
        <input
          data-testid="value-filter"
          type="number"
          name="value"
          onChange={ handleSelectedOptions }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleNumericFilters }
      >
        Filtrar!
      </button>
    </form>

  );
}

export default Filters;
