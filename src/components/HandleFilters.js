import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function HandleFilters() {
  const {
    setFilters,
    filters,
  } = useContext(MyContext);

  const handlePlanetsByName = ({ target: { value } }) => {
    setFilters({ ...filters, filterByName: { name: value } });
  };

  const NumericFilters = () => {
    const comparison = document.getElementById('comparison-filter').value;
    const column = document.getElementById('column-filter').value;
    const total = document.getElementById('value-filter').value;
    setFilters({ ...filters,
      filterByNumericValues: [
        {
          column,
          comparison,
          value: total,
        },
      ] });
  };

  return (
    <form>
      <label htmlFor="filter-name" className="input">
        Filtro:
        <input
          id="filter-name"
          name="filter-name"
          type="text"
          data-testid="name-filter"
          onChange={ handlePlanetsByName }
        />
      </label>

      <select data-testid="column-filter" id="column-filter">
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>

      <select data-testid="comparison-filter" id="comparison-filter">
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>

      <input data-testid="value-filter" type="number" id="value-filter" />

      <button
        onClick={ NumericFilters }
        type="button"
        data-testid="button-filter"
      >
        Filtrar
      </button>
    </form>
  );
}

export default HandleFilters;
