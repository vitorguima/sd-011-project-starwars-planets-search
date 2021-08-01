import React, { useContext } from 'react';
import APIContext from '../Context/APIContext';

function SearchByDetails() {
  const { searchFilters, setSearchFilters } = useContext(APIContext);

  function handleFilters({ target }) {
    const { name, value } = target;
    setSearchFilters({
      ...searchFilters,
      [name]: value,
    });
  }
  console.log(searchFilters);

  return (
    <div>
      <label htmlFor="column-filter">
        <select
          data-testid="column-filter"
          name="column"
          onChange={ handleFilters }
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
          onChange={ handleFilters }
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
          onChange={ handleFilters }
        />
      </label>
      <button type="button" data-testid="button-filter">Filtrar</button>
    </div>
  );
}

export default SearchByDetails;
