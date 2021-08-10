import React, { useState, useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import '../styles/filterBar.css';

function FilterBar() {
  const { handleFilterByName, handleFilterByColumn } = useContext(PlanetsContext);

  const handleChange = ({ target: { value } }) => {
    handleFilterByName(value);
  };

  const [filterByValue, setFilterByValue] = useState({
    fieldColumn: 'population', fieldComparison: 'maior que', fieldInputValue: 0 });

  return (
    <div className="bar-container">
      <label htmlFor="search-name">
        <input
          type="text"
          name="search-name"
          data-testid="name-filter"
          placeholder="Pesquise pelo nome"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="filter-by-column">
        <select
          data-testid="column-filter"
          name="filter-by-column"
          onChange={ ({ target: { value } }) => setFilterByValue(
            { ...filterByValue, fieldColumn: value },
          ) }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="filter-by-camparation">
        <select
          data-testid="comparison-filter"
          name="filter-by-comparation"
          onChange={ ({ target: { value } }) => setFilterByValue(
            { ...filterByValue, fieldComparison: value },
          ) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="filter-input">
        <input
          type="number"
          data-testid="value-filter"
          name="filter-input"
          onChange={ ({ target: { value } }) => setFilterByValue(
            { ...filterByValue, fieldInputValue: value },
          ) }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => handleFilterByColumn(filterByValue) }
      >
        Filtrar
      </button>
    </div>

  );
}

export default FilterBar;
