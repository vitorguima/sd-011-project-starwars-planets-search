import React, { useContext, useState } from 'react';
import SWContext from '../context/SWContext';

function Form() {
  const { filters, setFilters } = useContext(SWContext);
  const [handlePlanetName, setHandlePlanetName] = useState('');

  const searchPlanetsByName = (value) => {
    setHandlePlanetName(value);
    setFilters({ ...filters, filterByName: { name: value } });
  };

  return (
    <form className="form">
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
    </form>
  );
}

export default Form;
