import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function FilterInput() {
  const { name, filterPlanets } = useContext(PlanetContext);

  return (
    <div>
      <label htmlFor="filter">
        Filter Planet:
        <input
          type="text"
          data-testid="name-filter"
          value={ name }
          onChange={ filterPlanets }
        />
      </label>
    </div>
  );
}

export default FilterInput;
