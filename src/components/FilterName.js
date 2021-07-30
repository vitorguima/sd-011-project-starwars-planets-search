import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function FilterName() {
  const { name, filterPlanets } = useContext(StarWarsContext);

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
export default FilterName;
