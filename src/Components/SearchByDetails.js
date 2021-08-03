import React, { useContext } from 'react';
import APIContext from '../Context/APIContext';

function SearchByDetails() {
  const { searchFilters, setSearchFilters, filters, setFilters } = useContext(APIContext);

  function handleSaveFilters({ target }) {
    const { name, value } = target;
    setSearchFilters({
      ...searchFilters,
      [name]: value,
    });
  }
  /*   console.log(searchFilters); */

  function handleSendFilters(valueFilters) {
    setFilters({
      ...filters,
      filterByNumericValues: [valueFilters],
    });
  }
  /*   console.log(filters); */

  return (
    <div>
      <label htmlFor="column-filter">
        <select
          data-testid="column-filter"
          name="column"
          onChange={ handleSaveFilters }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
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
