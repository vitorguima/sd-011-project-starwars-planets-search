import React from 'react';
import usePlanets from '../../hooks/usePlanets';
import RemoveFilterButtons from '../RemoveFilterButtons';

export default function PlanetInput() {
  const { setFilter } = usePlanets();
  return (
    <div className="col-7 form-group m-2 ">
      <input
        data-testid="name-filter"
        type="text"
        className="form-control"
        id="searchInput"
        placeholder="Search for your Planet"
        onChange={ ({ target }) => setFilter(target.value, 'filterByName') }
      />
      <RemoveFilterButtons />
    </div>
  );
}
