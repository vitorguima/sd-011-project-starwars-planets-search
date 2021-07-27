import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function HeaderFilter() {
  const { filterName, searchName } = useContext(PlanetsContext);
  const { filterByName } = searchName;
  const { name } = filterByName;
  return (
    <div>
      <label htmlFor="searchName">
        <input
          type="text"
          placeholder="Search a planet name"
          name="searchName"
          data-testid="name-filter"
          value={ name }
          onChange={ filterName }
        />
      </label>
    </div>
  );
}

export default HeaderFilter;
