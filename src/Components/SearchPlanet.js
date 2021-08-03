import React, { useContext } from 'react';
import APIContext from '../Context/APIContext';

function SearchPlanet() {
  const { value, filterData } = useContext(APIContext);

  return (
    <div>
      <label htmlFor="name-filter">
        Search Planet
        <input
          data-testid="name-filter"
          type="text"
          name="name-filter"
          value={ value }
          onChange={ filterData }
        />
      </label>
    </div>
  );
}

export default SearchPlanet;
