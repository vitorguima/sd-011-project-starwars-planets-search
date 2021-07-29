import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function HandleFilters() {
  const {
    setFilters,
    filters,
  } = useContext(MyContext);

  return (
    <form>
      <label htmlFor="filter-name" className="input">
        Filtro:
        <input
          id="filter-name"
          name="filter-name"
          type="text"
          data-testid="name-filter"
          onChange={ (e) => setFilters({ ...filters,
            filterByName: { name: e.target.value } }) }
        />
      </label>

      <select data-testid="column-filter">
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>

      <select data-testid="comparison-filter">
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>

      <input data-testid="value-filter" type="number" />

      <button
        type="button"
        data-testid="button-filter"
      >
        Filtrar
      </button>
    </form>
  );
}

export default HandleFilters;
