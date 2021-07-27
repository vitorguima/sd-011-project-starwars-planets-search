import React from 'react';
import PropTypes from 'prop-types';

function Search({ search, handleChange, handleChangeFilter, handleClick }) {
  return (
    <div>
      <input
        data-testid="name-filter"
        value={ search }
        onChange={ handleChange }
        placeholder="Buscar"
        name="name"
      />
      <select
        data-testid="column-filter"
        name="column"
        onChange={ handleChangeFilter }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison"
        onChange={ handleChangeFilter }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        data-testid="value-filter"
        name="value"
        type="number"
        onChange={ handleChangeFilter }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Search
      </button>
    </div>
  );
}

Search.propTypes = {
  handleChange: PropTypes.any,
  search: PropTypes.any,
}.isRequired;

export default Search;
