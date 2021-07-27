import React from 'react';
import usePlanets from '../../hooks/usePlanets';

export default function PlanetInput() {
  const { setFilter } = usePlanets();
  return (
    <div className="form-group w-25 m-2">
      <input
        data-testid="name-filter"
        type="text"
        className="form-control"
        id="searchInput"
        placeholder="Search for your Planet"
        onChange={ ({ target }) => setFilter(target.value, 'filterByName') }
      />
    </div>
  );
}
