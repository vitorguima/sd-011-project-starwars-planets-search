import React from 'react';
import { useAuth } from '../providers/auth';

function SearchPlanet() {
  const { setFilters } = useAuth();

  const inputPlanetNameHandleChange = (event) => {
    setFilters({
      filterByName: {
        name: event.target.value,
      },
    });
  };

  return (
    <div>
      <form>
        <label htmlFor="planet-name">
          Planet name:
          <input
            type="text"
            id="planet-name"
            data-testid="name-filter"
            onChange={ inputPlanetNameHandleChange }
          />
        </label>
      </form>
    </div>
  );
}

export default SearchPlanet;
