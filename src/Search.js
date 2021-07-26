import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './context/PlanetContex';

function Search({ search }) {
  const { filters, handleValue } = useContext(PlanetContext);
  const { filterByNumericValues } = filters;
  const { column, comparison, value } = filterByNumericValues;

  const handleSubmit = () => {
    search();
  };

  return (
    <div>
      <select data-testid="column-filter">
        <option value={ column } name="population">population</option>
        <option value={ column } name="diameter">diameter</option>
        <option value={ column } name="climate">climate</option>
        <option value={ column } name="climate">orbital_period</option>
        <option value={ column } name="climate">rotation_period</option>
        <option value={ column } name="climate">surface_water</option>
      </select>
      <select data-testid="comparison-filter">
        <option>Comparison</option>
        <option value={ comparison } name="maior que">maior que</option>
        <option value={ comparison } name="menor que">menor que</option>
        <option value={ comparison } name="igual a">igual a</option>
      </select>
      <input
        data-testid="value-filter"
        type="number"
        placeholder="Enter the numeric value"
        value={ value }
        onChange={ handleValue }
      />
      <button
        data-testid="button-filter"
        type="submit"
        onClick={ () => handleSubmit() }
      >
        Search
      </button>
    </div>
  );
}

Search.propTypes = {
  search: PropTypes.func.isRequired,
};

export default Search;
