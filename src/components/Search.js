import React from 'react';
import PropTypes from 'prop-types';

function Search({ search, handleChange, handleChangeFilter, handleClick, columns }) {
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
        {columns.map((coluna) => <option key={ coluna }>{coluna}</option>)}
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
