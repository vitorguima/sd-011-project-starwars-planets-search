import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

const SearchFieldName = () => {
  const { filterName, HandleInput } = useContext(PlanetsContext);

  return (
    <div>
      <label htmlFor="filterName">
        Planet name
        <input
          type="text"
          data-testid="name-filter"
          value={ filterName }
          onChange={ HandleInput }
        />
      </label>
    </div>
  );
};

export default SearchFieldName;
