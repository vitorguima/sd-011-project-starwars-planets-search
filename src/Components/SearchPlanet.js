import React, { useContext } from 'react';
import APIContext from '../Context/APIContext';

function SearchPlanet() {
  /*  const { searchPlanet, handleChange } = useContext(APIContext); */
  const { value, filterData } = useContext(APIContext);

  return (
    <div>
      <label htmlFor="name-filter">
        Search Planet
        <input
          data-testid="name-filter"
          type="text"
          name="name-filter"
          /*           value={ searchPlanet }
          onChange={ handleChange } */
          value={ value }
          onChange={ filterData }
        />
      </label>
    </div>
  );
}

export default SearchPlanet;
