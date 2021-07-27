import React, { useContext, useState } from 'react';
import Context from '../context/Context';
import SelectedFilters from './SelectedFilters';

function Filters() {
  const { dataFilters, setDataFilters } = useContext(Context);
  const [selectedOptions, setSelectedOptions] = useState({
    column: '',
    comparison: '',
    value: '',
  });

  const [availableColumnOptions, setAvailableColumnOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  function handleNameFilter({ target }) {
    const { value } = target;
    setDataFilters({
      ...dataFilters,
      filters: {
        ...dataFilters.filters,
        filterByName: {
          name: value,
        },
      },
    });
  }

  function handleNumericFilters() {
    const { column, comparison, value } = selectedOptions;
    setDataFilters({
      ...dataFilters,
      filters: {
        ...dataFilters.filters,
        filterByNumericValues: [
          ...dataFilters.filters.filterByNumericValues,
          {
            column,
            comparison,
            value,
          }],
      },
    });
    const filteredOptions = availableColumnOptions.filter((option) => option !== column);
    setAvailableColumnOptions(filteredOptions);
  }

  function handleSelectedOptions({ target }) {
    const { name, value } = target;
    setSelectedOptions({
      ...selectedOptions,
      [name]: value,
    });
  }

  return (
    <div>
      <SelectedFilters />
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
            required
          >
            {availableColumnOptions.map((option, index) => (
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
            required
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
            required
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
    </div>

  );
}

export default Filters;
