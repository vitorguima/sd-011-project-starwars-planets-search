import React, { useContext, useEffect } from 'react';
import { MyContext } from '../context/MyContext';
// import { MyContext } from '../context/MyContext';

function NumericFilter() {
  const { searchPlanet, setSearchPlanet } = useContext(MyContext);

  
  return (
    <div>
      <select data-testid="column-filter">
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>

      <select data-testid="comparison-filter">
        <option value="menor que">menor que</option>
        <option value="maior que">maior que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        data-testid="value-filter"
        type="number"
      />

      <button
        data-testid="button-filter"
        type="submit"
      >
        Buscar
      </button>
    </div>
  );
}

export default NumericFilter;
