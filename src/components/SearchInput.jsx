import React, { useContext, useState } from 'react';
import SWContext from '../context/SWContext';

function SearchInput() {
  const { filters, setFilters } = useContext(SWContext);
  const [handlePlanetName, setHandlePlanetName] = useState('');
  const searchPlanetsByName = (value) => {
    setHandlePlanetName(value);
    setFilters({ ...filters, filterByName: { name: value } });
  };

  return (
    <div className="searchField">
      <label htmlFor="name">
        Planet:
        <input
          data-testid="name-filter"
          type="text"
          name="name"
          placeholder="Searh a planet"
          value={ handlePlanetName }
          onChange={ (e) => searchPlanetsByName(e.target.value) }
        />
      </label>
    </div>
  );
}

export default SearchInput;
