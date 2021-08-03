import React, { useContext } from 'react';
import APIContext from '../Context/APIContext';

function SearchByDetails() {
  const { searchFilters, setSearchFilters, filters, setFilters } = useContext(APIContext);
  const { columnFilter, setColumnFilter } = useContext(APIContext);

  function handleSaveFilters({ target }) {
    const { name, value } = target;
    setSearchFilters({
      ...searchFilters,
      [name]: value,
    });
  }

  function handleSendFilters(valueFilters) {
    setFilters({
      ...filters,
      filterByNumericValues: [valueFilters],
    });
    setColumnFilter(columnFilter.filter((column) => column !== valueFilters.column));
  }

  return (
    <div>
      <label htmlFor="column-filter">
        <select
          data-testid="column-filter"
          name="column"
          onChange={ handleSaveFilters }
        >
          {columnFilter.map((column, index) => (
            <option key={ index } value={ column }>{ column }</option>
          ))}
        </select>
      </label>
      <label htmlFor="comparison-filter">
        <select
          data-testid="comparison-filter"
          name="comparison"
          onChange={ handleSaveFilters }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="value-filter">
        <input
          data-testid="value-filter"
          type="number"
          name="value"
          onChange={ handleSaveFilters }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => handleSendFilters(searchFilters) }
      >
        Filtrar
      </button>
    </div>
  );
}

export default SearchByDetails;
