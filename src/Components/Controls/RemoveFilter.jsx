import React from 'react';
import PropTypes from 'prop-types';
import { usePlanets } from '../../hooks/usePlanet';

function RemoveFilter({ type }) {
  const { removeFilter } = usePlanets();

  return (
    <div
      data-testid="filter"
    >
      <p>{ type }</p>
      <button
        type="button"
        onClick={ () => removeFilter(type) }
      >
        Remover Filtro
      </button>
    </div>
  );
}

RemoveFilter.propTypes = {
  type: PropTypes.string.isRequired,
};

export default RemoveFilter;
