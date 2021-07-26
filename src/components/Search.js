import React from 'react';
import PropTypes from 'prop-types';

function Search({ search, handleChange }) {
  return (
    <div>
      <input
        data-testid="name-filter"
        value={ search }
        onChange={ handleChange }
        placeholder="Buscar"
      />
    </div>
  );
}

Search.propTypes = {
  handleChange: PropTypes.any,
  search: PropTypes.any,
}.isRequired;

Search.propTypes = {
  handleChange: PropTypes.any,
  search: PropTypes.any,
}.isRequired;

export default Search;
